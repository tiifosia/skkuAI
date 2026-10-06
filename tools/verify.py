"""콘텐츠 검증기.

- 배우기 카드의 code 를 실제 파이썬으로 실행해 output 과 비교한다 (noRun 제외).
- 문제(quiz)의 출력 예측(output)과 출력형 객관식(out: true)의 정답을 실제 실행 결과와 비교한다.
- 문제 구조(정답 인덱스, 빈칸 수, 보기 포함 여부 등)를 점검한다.

같은 스테이지의 코드는 하나의 임시 폴더에서 순서대로 실행한다 (파일·DB 예제가 앞 카드의 결과를 이어 쓰기 때문).
사용: python3 tools/verify.py   (numpy, pandas 필요)
"""
import json
import os
import re
import subprocess
import sys
import tempfile

HERE = os.path.dirname(os.path.abspath(__file__))


def load():
    out = subprocess.run(['node', os.path.join(HERE, 'export_content.js')], capture_output=True, text=True, check=True)
    return json.loads(out.stdout)


def run(code, cwd):
    p = subprocess.run([sys.executable, '-c', code], cwd=cwd, capture_output=True, text=True, timeout=60,
                       env={**os.environ, 'PYTHONIOENCODING': 'utf-8'})
    return p.stdout, p.stderr, p.returncode


def exact(s):
    lines = [l.rstrip() for l in s.replace('\r', '').split('\n')]
    while lines and not lines[-1]:
        lines.pop()
    return '\n'.join(lines)


def loose(s):
    # 앱의 normalizeOut 과 같은 규칙
    lines = [re.sub(r'\s+', ' ', l.strip()) for l in s.replace('\r', '').split('\n')]
    return '\n'.join(lines).strip('\n').strip()


def strip_ticks(s):
    s = s.strip()
    if s.startswith('`') and s.endswith('`'):
        s = s[1:-1]
    return s


def main():
    worlds = load()
    errors, warns, checked = [], [], 0
    nq = 0
    for w in worlds:
        for st in w['stages']:
            sid = st['id']
            with tempfile.TemporaryDirectory() as tmp:
                for i, c in enumerate(st.get('lessons', [])):
                    where = f'{sid} 배우기 {i + 1} "{c["title"]}"'
                    code = c.get('code')
                    if not code:
                        continue
                    if c.get('file') and c['file'] != 'main.py':
                        with open(os.path.join(tmp, c['file']), 'w', encoding='utf-8') as f:
                            f.write(code)
                    if c.get('noRun') or 'output' not in c:
                        continue
                    out, err, rc = run(code, tmp)
                    checked += 1
                    if rc != 0:
                        errors.append(f'{where}: 실행 에러\n{err.strip().splitlines()[-1] if err.strip() else err}')
                        continue
                    if exact(out) != exact(c['output']):
                        errors.append(f'{where}: 출력 불일치\n--- 기대\n{c["output"]}\n--- 실제\n{out}')
                for qi, q in enumerate(st.get('quiz', [])):
                    nq += 1
                    where = f'{sid} 문제 {qi + 1} ({q["type"]})'
                    t = q['type']
                    if t == 'mc':
                        if not (0 <= q['answer'] < len(q['choices'])):
                            errors.append(f'{where}: 정답 인덱스 범위 밖')
                        if len(set(q['choices'])) != len(q['choices']):
                            errors.append(f'{where}: 보기 중복')
                    if t == 'ox' and not isinstance(q['answer'], bool):
                        errors.append(f'{where}: OX 정답은 true/false')
                    if t == 'blank':
                        n = q['code'].count('___')
                        if n != len(q['answer']):
                            errors.append(f'{where}: 빈칸 {n}개, 정답 {len(q["answer"])}개')
                        for a in q['answer']:
                            if a not in q['options']:
                                errors.append(f'{where}: 정답 "{a}"가 보기에 없음')
                        filled = q['code']
                        for a in q['answer']:
                            filled = filled.replace('___', a, 1)
                        if 'print' in filled or 'def ' in filled:
                            try:
                                compile(filled, '<blank>', 'exec')
                            except SyntaxError as e:
                                errors.append(f'{where}: 채운 코드 문법 오류 {e}')
                    if t == 'order':
                        if len(set(q['lines'])) != len(q['lines']):
                            warns.append(f'{where}: 같은 줄이 중복됨')
                        if not q.get('text'):
                            try:
                                compile('\n'.join(q['lines']), '<order>', 'exec')
                            except SyntaxError as e:
                                errors.append(f'{where}: 정답 순서 코드가 문법 오류 {e}')
                    if t == 'match':
                        rights = [p[1] for p in q['pairs']]
                        if len(set(rights)) != len(rights):
                            errors.append(f'{where}: 오른쪽 항목 중복')
                    if t == 'output' or (t == 'mc' and q.get('out')):
                        if q.get('noRun'):
                            continue
                        out, err, rc = run(q['code'], tmp)
                        checked += 1
                        if rc != 0:
                            errors.append(f'{where}: 실행 에러\n{q["code"]}\n{err.strip()}')
                            continue
                        if t == 'output':
                            if loose(out) != loose(q['answer']):
                                errors.append(f'{where}: 정답 불일치\n{q["code"]}\n--- 정답\n{q["answer"]}\n--- 실제\n{out}')
                            elif exact(out) != exact(q['answer']):
                                warns.append(f'{where}: 공백만 다름 → 실제 "{exact(out)}"')
                        else:
                            want = strip_ticks(q['choices'][q['answer']])
                            if exact(out) != exact(want):
                                errors.append(f'{where}: 출력형 객관식 정답 불일치\n--- 정답 보기\n{want}\n--- 실제\n{out}')
                            for k, ch in enumerate(q['choices']):
                                if k != q['answer'] and exact(strip_ticks(ch)) == exact(out):
                                    errors.append(f'{where}: 오답 보기 {k + 1}도 실제 출력과 같음')
    total_stages = sum(len(w['stages']) for w in worlds)
    print(f'스테이지 {total_stages}개 · 문제 {nq}개 · 실행 검증 {checked}건')
    for wmsg in warns:
        print('경고:', wmsg)
    if errors:
        print(f'\n오류 {len(errors)}건')
        for e in errors:
            print('\n✗', e)
        sys.exit(1)
    print('모든 검증 통과')


if __name__ == '__main__':
    main()
