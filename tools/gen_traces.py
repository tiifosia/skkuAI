"""'한 줄씩 실행' 데이터 생성기.

배우기 카드 중 trace: true 인 코드를 실제로 실행하면서 sys.settrace 로
(방금 실행한 줄, 변수 상태, 그때까지의 출력)을 기록해 js/content/traces.js 로 저장한다.
사용: python3 tools/gen_traces.py
"""
import json
import os
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, '..', 'js', 'content', 'traces.js')

RUNNER = r'''
import sys, io, json, types, inspect
code = sys.stdin.read()
FN = '<card>'
MAX = 220
steps = []
buf = io.StringIO()
pending = {}

class Stop(Exception):
    pass

def show(v):
    if isinstance(v, types.FunctionType):
        return 'def ' + v.__name__ + '(…)'
    if isinstance(v, type):
        return 'class ' + v.__name__
    mod = type(v).__module__
    if mod == '__main__' or (hasattr(v, '__dict__') and mod not in ('builtins',) and type(v).__name__ not in ('module',) and not isinstance(v, (int, float, str, list, tuple, dict, set))):
        try:
            attrs = ', '.join(k + '=' + repr(x) for k, x in vars(v).items())
            r = type(v).__name__ + ' 객체(' + attrs + ')'
        except TypeError:
            r = repr(v)
    else:
        r = repr(v)
    return r if len(r) <= 70 else r[:67] + '…'

def snap(frame):
    names = frame.f_globals if frame.f_code.co_name == '<module>' else frame.f_locals
    out = []
    for k, v in list(names.items()):
        if k.startswith('__') or isinstance(v, types.ModuleType):
            continue
        out.append([k, show(v)])
    return out

def is_func(frame):
    return bool(frame.f_code.co_flags & inspect.CO_OPTIMIZED) and not frame.f_code.co_name.startswith('<')

def record(frame, line, note=None):
    s = {'l': line, 'v': snap(frame), 'o': buf.getvalue(), 'f': frame.f_code.co_name}
    if note:
        s['n'] = note
    steps.append(s)
    if len(steps) >= MAX:
        raise Stop()

def local(frame, event, arg):
    k = id(frame)
    if event == 'line':
        if k in pending:
            record(frame, pending[k])
        pending[k] = frame.f_lineno
    elif event == 'return':
        if k in pending:
            note = None
            if frame.f_code.co_name != '<module>':
                note = '`' + frame.f_code.co_name + '` 함수가 끝나고 ' + ('`' + repr(arg) + '`을(를) 돌려줘요' if arg is not None else '돌려주는 값은 없어요 (None)')
            record(frame, pending.pop(k), note)
    return local

def glob(frame, event, arg):
    if frame.f_code.co_filename != FN:
        return None
    name = frame.f_code.co_name
    if name == '<module>':
        return local
    if not is_func(frame):
        return None   # 클래스 본문, 컴프리헨션 등은 건너뜀
    args = ', '.join(repr(frame.f_locals[a]) for a in frame.f_code.co_varnames[:frame.f_code.co_argcount] if a in frame.f_locals and a != 'self')
    steps.append({'l': frame.f_code.co_firstlineno, 'v': snap(frame), 'o': buf.getvalue(), 'f': name, 'n': '`' + name + '(' + args + ')` 호출 → 함수 안으로 들어가요'})
    return local

g = {'__name__': '__main__'}
real = sys.stdout
sys.stdout = buf
try:
    sys.settrace(glob)
    exec(compile(code, FN, 'exec'), g)
except Stop:
    pass
finally:
    sys.settrace(None)
    sys.stdout = real
print(json.dumps({'code': code, 'steps': steps}, ensure_ascii=False))
'''


def main():
    worlds = json.loads(subprocess.run(['node', os.path.join(HERE, 'export_content.js')], capture_output=True, text=True, check=True).stdout)
    traces = {}
    for w in worlds:
        for st in w['stages']:
            with tempfile.TemporaryDirectory() as tmp:
                for i, c in enumerate(st.get('lessons', [])):
                    code = c.get('code')
                    if not code:
                        continue
                    if c.get('file') and c['file'] != 'main.py':
                        with open(os.path.join(tmp, c['file']), 'w', encoding='utf-8') as f:
                            f.write(code)
                    if c.get('noRun'):
                        continue
                    if c.get('trace'):
                        p = subprocess.run([sys.executable, '-c', RUNNER], input=code, cwd=tmp, capture_output=True, text=True, timeout=60)
                        if p.returncode != 0:
                            print('실패', st['id'], i, p.stderr)
                            sys.exit(1)
                        data = json.loads(p.stdout)
                        traces[st['id'] + ':' + str(i)] = data
                        print(f"{st['id']}:{i} {c['title']} — {len(data['steps'])}단계")
                    else:
                        subprocess.run([sys.executable, '-c', code], cwd=tmp, capture_output=True, text=True, timeout=60)
    js = '/* 자동 생성 파일 — tools/gen_traces.py 로 다시 만드세요. 직접 고치지 마세요. */\n'
    js += 'window.PQ = window.PQ || { worlds: [], traces: {} };\n'
    js += 'window.PQ.traces = ' + json.dumps(traces, ensure_ascii=False, separators=(',', ':')) + ';\n'
    with open(OUT, 'w', encoding='utf-8') as f:
        f.write(js)
    print(f'{len(traces)}개 저장 → {os.path.relpath(OUT)}')


if __name__ == '__main__':
    main()
