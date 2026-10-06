/* 3강 · 모듈 · 파일 · 클래스 (수업 자료 3: 표준 모듈 · 파일 · 클래스 · 모듈과 패키지) */
window.PQ = window.PQ || { worlds: [], traces: {} };
PQ.worlds.push({
  id: 'w3',
  lecture: '3강',
  short: '모듈·파일·클래스',
  title: '모듈의 성채',
  desc: 'math·time·random · 파일 입출력 · SQLite · 클래스 · 모듈과 패키지',
  bossTitle: '3강 보스: 클래스 기사단장',
  stages: [
    /* ───────────────────────── 13. 표준 모듈 ───────────────────────── */
    {
      id: 's13', num: '13',
      title: '표준 모듈',
      sub: 'import · math · from import · time · calendar · random',
      goal: '표준 모듈을 가져와서 수학·시간·난수 기능을 쓸 수 있다',
      lessons: [
        {
          title: 'import: 모듈 가져오기',
          body: [
            '**모듈**은 미리 만들어 둔 기능 묶음이에요. `import` 명령으로 외부의 모듈을 가져와서 필요한 기능을 골라 써요.',
            '',
            '파이썬에는 자주 쓰는 기능이 **표준 모듈**로 함께 설치되어 있어요. `import math`는 **math 모듈에 작성된 모든 상수와 함수**를 가져와요. 쓸 때는 `모듈.함수()` 형태예요.',
          ],
          code: `import math

print(math.sqrt(2))`,
          output: '1.4142135623730951',
        },
        {
          title: 'math 모듈의 상수와 함수',
          table: [
            ['이름', '설명', '예 → 결과'],
            ['`pi` / `tau` / `e`', '원주율 / 2×pi / 자연 대수', '`math.pi` → 3.14159…'],
            ['`inf` / `nan`', '무한대 / 숫자 아님', ''],
            ['`sqrt(x)`', '제곱근', '`sqrt(16)` → 4.0'],
            ['`pow(x, y)`', 'x의 y승 (`**`와 같지만 인수를 **실수로 바꿔** 계산)', '`pow(2, 3)` → 8.0'],
            ['`hypot(x, y)`', '피타고라스 정리: √(x² + y²)', '`hypot(3, 4)` → 5.0'],
            ['`factorial(x)`', '계승 (양의 정수만)', '`factorial(5)` → 120'],
            ['`sin` `cos` `tan`', '삼각함수 (인수는 라디안)', ''],
            ['`degrees(x)` / `radians(x)`', '라디안 → 각도 / 각도 → 라디안', ''],
            ['`ceil(x)`', '올림 (수직선 오른쪽의 정수)', '`ceil(3.2)` → 4'],
            ['`floor(x)`', '내림 (수직선 왼쪽의 정수)', '`floor(3.8)` → 3'],
            ['`fabs(x)`', '절댓값 (실수로)', '`fabs(-3)` → 3.0'],
            ['`trunc(x)`', '소수점 이하 버림', '`trunc(-3.7)` → -3'],
            ['`log(x, base)`', '로그 (base 생략 시 자연 로그)', '`log(100, 10)` → 2.0'],
            ['`log10(x)`', '상용 로그 (`log(x, 10)`과 같음)', '`log10(1000)` → 3.0'],
            ['`gcd(a, b)`', '최대공약수', '`gcd(12, 18)` → 6'],
          ],
          code: `import math
print(math.pi)
print(math.factorial(5), math.gcd(12, 18))
print(math.ceil(3.2), math.floor(3.8), math.trunc(-3.7))
print(math.pow(2, 3), math.fabs(-3))`,
          output: '3.141592653589793\n120 6\n4 3 -3\n8.0 3.0',
          warn: '음수에서 차이가 나요: `floor(-2.5)` → -3 (내림), `ceil(-2.5)` → -2 (올림), `trunc(-2.5)` → -2 (버림).',
        },
        {
          title: 'from 모듈 import 함수',
          body: [
            '- `from math import sqrt` → 모듈 이름 없이 `sqrt(2)`로 바로 호출해요. 단, 이 경우 **sqrt 외에 math의 다른 함수는 쓸 수 없어요** (`math`라는 이름 자체를 가져오지 않았으니까요).',
            '- `from math import *` → math의 **모든 함수**를 이름만으로 편하게 쓸 수 있어요.',
          ],
          code: `from math import sqrt
print(sqrt(2))

from math import *
print(floor(2.7), pi)`,
          output: '1.4142135623730951\n2 3.141592653589793',
        },
        {
          title: 'time 모듈',
          body: [
            '날짜와 시간 관련 기능을 제공해요.',
            '',
            '- `time.time()` : **에폭(Epoch, 1970년 1월 1일 0시)** 이후 흐른 **초**를 돌려줘요. 이걸 **유닉스 시간**이라고 해요.',
            '- `time.ctime(t)` : 유닉스 시간을 사람이 읽는 **일상 시간 문자열**로 변환',
            '- 시작과 끝의 `time.time()`을 빼면 **두 지점 간의 경과 시간**을 잴 수 있어요',
            '- `time.localtime()` : 현재 시각을 연·월·일·시·분으로 나눠 줘요 (`tm_hour`, `tm_min` 등)',
          ],
          code: `import time

print(time.time())
t = time.time()
print(time.ctime(t))

start = time.time()
for a in range(1000):
    print(a)
end = time.time()
print(end - start)`,
          output: '1515549457.5692239\nWed Jan 10 10:58:24 2018\n0\n1\n…\n999\n0.0123291015625',
          noRun: true,
          after: '실행할 때마다 결과가 달라지는 예제라서, 위 결과는 예시예요.',
        },
        {
          title: 'calendar 모듈',
          body: [
            '달력 기능을 제공해요.',
            '',
            '- `calendar.calendar(연도)` : 인수로 받은 연도의 달력',
            '- `calendar.month(연도, 월)` : 해당 월의 달력',
            '- `calendar.weekday(연도, 월, 일)` : 특정 날짜의 요일을 숫자로 → **0 = 월요일**, 1 = 화요일, … 6 = 일요일',
          ],
          code: `import calendar

print(calendar.month(2019, 1))
print(calendar.weekday(2024, 1, 1))`,
          output: '    January 2019\nMo Tu We Th Fr Sa Su\n    1  2  3  4  5  6\n 7  8  9 10 11 12 13\n14 15 16 17 18 19 20\n21 22 23 24 25 26 27\n28 29 30 31\n\n0',
          after: '2024년 1월 1일은 월요일이라 0이 나와요.',
        },
        {
          title: 'random 모듈',
          body: [
            '난수(무작위 수)를 만들어요.',
            '',
            '- `random.random()` : **0 이상 1 미만**의 실수',
            '- `random.randint(begin, end)` : begin **이상** end **이하**의 정수 (**끝 포함!**)',
            '- `random.shuffle(리스트)` : 리스트의 요소를 무작위로 섞음 (리스트 자체가 바뀜)',
          ],
          code: `import random

for i in range(3):
    print(random.random())
for i in range(3):
    print(random.randint(1, 10))

food = ["짜장면", "짬뽕", "탕수육", "군만두"]
random.shuffle(food)
print(food)`,
          output: "0.05560178175601582\n0.7483996952798034\n0.054579188940304335\n1\n4\n10\n['군만두', '짬뽕', '짜장면', '탕수육']",
          noRun: true,
          warn: '`random.randint(1, 10)`은 10도 나와요 (끝 포함). range나 4강의 `np.random.randint`는 끝을 **포함하지 않아요**. 헷갈리기 쉬운 함정!',
        },
      ],
      quiz: [
        { type: 'output', code: `import math
print(math.sqrt(16))`, answer: '4.0', explain: 'sqrt의 결과는 실수예요.' },
        { type: 'output', code: `import math
print(math.factorial(5))`, answer: '120', explain: '5! = 5 × 4 × 3 × 2 × 1 = 120' },
        { type: 'output', code: `import math
print(math.ceil(3.2))`, answer: '4', explain: 'ceil은 올림.' },
        { type: 'output', code: `import math
print(math.floor(3.8))`, answer: '3', explain: 'floor는 내림.' },
        { type: 'output', code: `import math
print(math.gcd(12, 18))`, answer: '6', explain: '12와 18의 최대공약수는 6.' },
        { type: 'output', code: `import math
print(math.pow(2, 3))`, answer: '8.0', explain: 'math.pow는 실수로 바꿔 계산해서 8.0 (2 ** 3은 8).' },
        { type: 'mc', q: '`from math import sqrt`만 실행한 뒤 `print(math.pi)`를 실행하면?', choices: ['3.141592…', '에러(NameError)가 난다', 'None', '0'], answer: 1, explain: 'math라는 이름을 가져오지 않았으니 math.pi를 쓸 수 없어요.' },
        { type: 'mc', q: '`random.randint(1, 10)`이 만들 수 있는 값의 범위는?', choices: ['1 이상 10 이하 정수', '1 이상 10 미만 정수', '0 이상 1 미만 실수', '0 이상 10 이하 정수'], answer: 0, explain: 'random.randint는 끝(10)을 포함해요.' },
        { type: 'mc', q: '`random.random()`의 결과 범위는?', choices: ['0 이상 1 미만 실수', '0 이상 1 이하 정수', '1 이상 10 이하 정수', '-1 이상 1 이하 실수'], answer: 0, explain: '0.0 ≤ 값 < 1.0인 실수.' },
        { type: 'mc', q: '`time.time()`이 돌려주는 값은?', choices: ['에폭(1970년 1월 1일) 이후 흐른 초', '오늘 날짜 문자열', '현재 시각의 시(hour)', '프로그램이 실행된 횟수'], answer: 0, explain: '유닉스 시간. 사람이 읽으려면 ctime으로 변환.' },
        { type: 'mc', q: '`calendar.weekday(연, 월, 일)`의 결과가 0이면 무슨 요일?', choices: ['월요일', '일요일', '토요일', '오류'], answer: 0, explain: '0 = 월요일, 6 = 일요일.' },
        { type: 'output', code: `import math
print(math.trunc(-3.7))`, answer: '-3', explain: 'trunc는 소수점 이하를 버려요 (0 쪽으로).' },
        { type: 'match', pairs: [['`ceil`', '올림'], ['`floor`', '내림'], ['`trunc`', '소수점 이하 버림'], ['`fabs`', '절댓값']], explain: 'math의 정수화·절댓값 함수.' },
        { type: 'mc', q: '`random.shuffle(food)`의 역할은?', choices: ['리스트 요소를 무작위로 섞는다', '무작위 요소 하나를 돌려준다', '리스트를 정렬한다', '리스트를 복사한다'], answer: 0, explain: 'shuffle은 리스트 자체를 섞어요.' },
        { type: 'output', code: `import math
print(math.tau == 2 * math.pi)`, answer: 'True', explain: 'tau는 2 × pi.' },
        { type: 'output', code: `import calendar
print(calendar.weekday(2024, 1, 1))`, answer: '0', explain: '2024년 1월 1일은 월요일 → 0.' },
        { type: 'output', code: `from math import *
print(floor(-2.5), ceil(-2.5))`, answer: '-3 -2', explain: '-2.5를 내리면 -3, 올리면 -2. import *로 이름만 써도 돼요.' },
        { type: 'blank', q: 'math 모듈을 가져오세요.', code: `___ math
print(math.sqrt(9))`, options: ['import', 'from', 'include', 'use'], answer: ['import'], explain: '`import 모듈명`' },
        { type: 'mc', q: '두 지점 사이의 경과 시간을 재는 방법은?', choices: ['시작과 끝에서 time.time()을 구해 뺀다', 'time.ctime()을 두 번 출력한다', 'calendar.month()를 쓴다', 'random.random()을 쓴다'], answer: 0, explain: 'end - start = 걸린 초.' },
      ],
      summary: [
        '`import 모듈` → `모듈.함수()` · 자주 쓰는 기능은 **표준 모듈**로 함께 설치됨',
        'math: `pi` `tau`(2pi) `e` `inf` `nan` · `sqrt` `pow`(실수 결과) `hypot` `factorial` `ceil`(올림) `floor`(내림) `trunc`(버림) `fabs` `log` `log10` `gcd`',
        '`from math import sqrt` → `sqrt()`만 이름으로 사용 (math.다른함수 불가) · `from math import *` → 모든 함수',
        'time: `time()` 에폭 이후 초(유닉스 시간) · `ctime(t)` 날짜 문자열 · 두 time() 차이로 경과 시간',
        'calendar: `calendar(연)` · `month(연, 월)` · `weekday(연, 월, 일)` 0=월요일',
        'random: `random()` 0 이상 1 미만 · `randint(a, b)` a 이상 **b 이하** · `shuffle(리스트)` 섞기',
      ],
      traps: ['`random.randint`는 끝 포함, `np.random.randint`와 `range`는 끝 미포함', '`math.pow(2, 3)`은 8.0 (실수)', '`from math import sqrt` 후 `math.pi`는 NameError'],
    },

    /* ───────────────────────── 14. 파일 입출력 ───────────────────────── */
    {
      id: 's14', num: '14',
      title: '파일 입출력',
      sub: 'open과 모드 · write · read · 예외 처리 · readline · shutil · os · os.path',
      goal: '파일에 쓰고 읽을 수 있고, 파일·디렉토리 관리 함수를 구분할 수 있다',
      lessons: [
        {
          title: '파일과 open',
          body: [
            '**파일**은 정보를 저장하는 기본 단위예요. 문서, 이미지, 멀티미디어 자료 등을 모두 보관해요.',
            '',
            '`open(파일명, 모드)`는 파일 입출력을 준비하고 **파일 객체**를 돌려줘요. 파일을 다 쓴 뒤에는 **`close()`** 메서드로 닫아요.',
          ],
          table: [
            ['모드', '설명'],
            ['`r`', '파일을 **읽는다**. 파일이 없으면 **예외**가 발생한다.'],
            ['`w`', '파일에 **기록**한다. 파일이 이미 있으면 **덮어쓴다**.'],
            ['`a`', '파일에 데이터를 **추가**한다 (기존 내용 뒤에).'],
            ['`x`', '파일에 기록하되 파일이 **이미 있으면 실패**한다.'],
            ['`t`', '**텍스트** 모드로 열기 (`"wt"`, `"rt"`처럼 다른 모드와 함께 써요)'],
          ],
        },
        {
          title: 'write: 파일에 쓰기',
          body: '`"wt"` = 쓰기(w) + 텍스트(t) 모드. live.txt가 없으면 새로 만들고, 있으면 내용을 **덮어써요**.',
          code: `f = open("live.txt", "wt")
f.write("""삶이 그대를 속일지라도
슬퍼하거나 노하지 말라!
우울한 날들을 견디면
믿으라, 기쁨의 날이 오리니""")
f.close()
print("저장 완료")`,
          output: '저장 완료',
        },
        {
          title: 'read와 예외 처리',
          body: [
            '`read()`는 파일 내용 **전체**를 문자열로 읽어요.',
            '',
            '파일이 없을 수도 있으니 **예외 처리**를 함께 써요.',
            '- `try:` 일단 실행해 보고',
            '- `except FileNotFoundError:` 그 에러가 나면 이 블록을 실행',
            '- `finally:` 에러가 나든 안 나든 **마지막에 항상** 실행',
          ],
          code: `try:
    f = open("live.txt", "rt")
    text = f.read()
    print(text)
except FileNotFoundError:
    print("파일이 없습니다.")
finally:
    f.close()`,
          output: '삶이 그대를 속일지라도\n슬퍼하거나 노하지 말라!\n우울한 날들을 견디면\n믿으라, 기쁨의 날이 오리니',
          after: '앞 카드에서 만든 live.txt를 읽은 결과예요. 실습실에서 실행하려면 먼저 앞 카드의 쓰기 코드를 실행해서 파일을 만들어야 해요.',
        },
        {
          title: 'readline: 한 줄씩 읽기',
          body: '`readline()`은 **한 줄씩** 읽어요. 파일 끝에 다다르면 **빈 문자열 `""`**을 돌려주기 때문에, `if not row: break`로 반복을 끝내요.',
          code: `f = open("live.txt", "rt")
text = ""
line = 1
while True:
    row = f.readline()
    if not row: break
    text += str(line) + " : " + row
    line += 1
f.close()
print(text)`,
          output: '1 : 삶이 그대를 속일지라도\n2 : 슬퍼하거나 노하지 말라!\n3 : 우울한 날들을 견디면\n4 : 믿으라, 기쁨의 날이 오리니',
          trace: true,
        },
        {
          title: 'a 모드: 뒤에 이어 쓰기',
          body: '`"w"`는 덮어쓰기, `"a"`는 기존 내용 **뒤에 이어 쓰기**예요.',
          code: `f = open("memo.txt", "w")
f.write("hello")
f.close()

f = open("memo.txt", "a")
f.write(" world")
f.close()

f = open("memo.txt", "r")
print(f.read())
f.close()`,
          output: 'hello world',
        },
        {
          title: '파일 관리 함수 (shutil, os)',
          table: [
            ['함수', '설명'],
            ['`shutil.copy(a, b)`', '파일을 복사한다'],
            ['`shutil.copytree(a, b)`', '디렉토리를 복사한다. 서브 디렉토리까지 전부 복사한다'],
            ['`shutil.move(a, b)`', '파일을 이동한다'],
            ['`shutil.rmtree(path)`', '**디렉토리**를 삭제한다'],
            ['`os.rename(a, b)`', '파일 이름을 변경한다'],
            ['`os.remove(f)`', '**파일**을 삭제한다'],
            ['`os.chmod(f, m)`', '파일의 퍼미션(권한)을 변경한다'],
            ['`shutil.chown(f, u, g)`', '파일의 소유권을 변경한다'],
            ['`os.link(a, b)`', '하드 링크를 생성한다'],
            ['`os.symlink(a, b)`', '심볼릭 링크를 생성한다'],
          ],
          code: `import shutil

shutil.copy("live.txt", "live2.txt")`,
          noRun: true,
        },
        {
          title: '디렉토리 관리 함수 (os, glob, os.path)',
          table: [
            ['함수', '설명'],
            ['`os.chdir(d)`', '현재 디렉토리를 변경한다'],
            ['`os.mkdir(d)`', '디렉토리를 생성한다'],
            ['`os.rmdir(d)`', '디렉토리를 제거한다'],
            ['`os.getcwd()`', '현재 디렉토리를 조사한다'],
            ['`os.listdir(d)`', '디렉토리의 내용을 나열한다'],
            ['`glob.glob(p)`', '패턴과 일치하는 파일의 목록을 나열한다'],
            ['`os.path.isabs(f)`', '절대 경로인지 조사한다'],
            ['`os.path.abspath(f)`', '파일의 절대 경로를 구한다'],
            ['`os.path.realpath(f)`', '원본 파일의 경로를 구한다'],
            ['`os.path.exists(f)`', '파일의 존재 여부를 조사한다'],
            ['`os.path.isfile(f)`', '파일인지 조사한다'],
            ['`os.path.isdir(f)`', '디렉토리인지 조사한다'],
          ],
          tip: '이름에 뜻이 있어요. cwd = current working directory(현재 작업 디렉토리), mkdir = make directory, rmdir = remove directory, listdir = list directory.',
        },
      ],
      quiz: [
        { type: 'match', pairs: [['`r`', '읽기 (없으면 예외)'], ['`w`', '쓰기 (있으면 덮어씀)'], ['`a`', '뒤에 추가'], ['`x`', '이미 있으면 실패']], explain: '파일 모드 4종.' },
        { type: 'mc', q: '이미 있는 파일을 `"w"` 모드로 열어 쓰면?', choices: ['기존 내용을 덮어쓴다', '기존 내용 뒤에 추가된다', '에러가 난다', '읽기 전용으로 열린다'], answer: 0, explain: '뒤에 추가하려면 "a" 모드.' },
        { type: 'mc', q: '없는 파일을 `"r"` 모드로 열면?', choices: ['예외(FileNotFoundError)가 발생한다', '빈 파일이 만들어진다', 'None이 반환된다', '자동으로 w 모드가 된다'], answer: 0, explain: '그래서 try/except로 감싸요.' },
        { type: 'mc', q: '`readline()`이 파일 끝에 도달하면 돌려주는 값은?', choices: ['빈 문자열 `""`', '`None`', '`-1`', '에러'], answer: 0, explain: '빈 문자열은 거짓이라 `if not row: break`로 끝내요.' },
        { type: 'mc', q: '파일 사용이 끝난 뒤 호출해야 하는 메서드는?', choices: ['`close()`', '`end()`', '`stop()`', '`exit()`'], answer: 0, explain: 'f.close()' },
        { type: 'match', pairs: [['`shutil.copy`', '파일 복사'], ['`os.remove`', '파일 삭제'], ['`os.rename`', '이름 변경'], ['`os.mkdir`', '디렉토리 생성']], explain: '파일·디렉토리 관리 함수.' },
        { type: 'mc', q: '현재 디렉토리를 조사하는 함수는?', choices: ['`os.getcwd()`', '`os.chdir()`', '`os.listdir()`', '`os.mkdir()`'], answer: 0, explain: 'get current working directory.' },
        { type: 'mc', q: '파일의 존재 여부를 조사하는 함수는?', choices: ['`os.path.exists(f)`', '`os.path.isabs(f)`', '`os.path.abspath(f)`', '`glob.glob(f)`'], answer: 0, explain: 'exists = 존재하다.' },
        { type: 'mc', q: '패턴과 일치하는 파일 목록을 나열하는 함수는?', choices: ['`glob.glob(p)`', '`os.listdir(p)`', '`os.path.isfile(p)`', '`shutil.move(p)`'], answer: 0, explain: '예: `glob.glob("*.txt")`' },
        { type: 'order', q: '파일에 "안녕"을 쓰는 코드를 순서대로 쌓으세요.', lines: ['f = open("hello.txt", "wt")', 'f.write("안녕")', 'f.close()'], explain: '열기 → 쓰기 → 닫기.' },
        { type: 'blank', q: '텍스트 읽기 모드로 열도록 빈칸을 채우세요.', code: `f = open("live.txt", "___")
print(f.read())
f.close()`, options: ['rt', 'wt', 'at', 'xt'], answer: ['rt'], explain: '읽기(r) + 텍스트(t).' },
        { type: 'mc', q: '`try` / `except` / `finally` 중 에러 여부와 상관없이 **항상** 실행되는 블록은?', choices: ['`finally`', '`try`', '`except`', '없다'], answer: 0, explain: 'finally는 마지막에 항상 실행돼요.' },
        { type: 'output', code: `f = open("memo.txt", "w")
f.write("hello")
f.close()
f = open("memo.txt", "a")
f.write(" world")
f.close()
f = open("memo.txt", "r")
print(f.read())
f.close()`, answer: 'hello world', explain: 'w로 hello를 쓰고, a로 " world"를 이어 붙였어요.' },
        { type: 'ox', q: '`shutil.rmtree(path)`는 파일 하나를 삭제하는 함수이다.', answer: false, explain: 'rmtree는 디렉토리를 삭제해요. 파일 하나는 os.remove.' },
        { type: 'output', code: `f = open("t.txt", "w")
f.write("A\\nB\\nC\\n")
f.close()
f = open("t.txt", "r")
print(f.readline(), end="")
print(f.readline(), end="")
f.close()`, answer: 'A\nB', explain: 'readline을 두 번 → 첫 두 줄만 읽어요.' },
        { type: 'mc', q: '`"x"` 모드의 특징은?', choices: ['파일이 이미 있으면 실패한다', '파일 끝에 추가한다', '읽기 전용이다', '항상 덮어쓴다'], answer: 0, explain: '실수로 덮어쓰는 걸 막을 때 써요.' },
        { type: 'output', code: `f = open("m.txt", "w")
f.write("abc")
f.close()
f = open("m.txt", "w")
f.write("Z")
f.close()
print(open("m.txt").read())`, answer: 'Z', explain: '두 번째 w가 기존 abc를 덮어써서 Z만 남아요.' },
      ],
      summary: [
        '`f = open(파일명, 모드)` → 파일 객체 · 사용 후 `f.close()`',
        '모드: `r` 읽기(없으면 예외) · `w` 쓰기(덮어씀) · `a` 추가 · `x` 이미 있으면 실패 · `t` 텍스트 (`"wt"`, `"rt"`)',
        '`write(문자열)` 쓰기 · `read()` 전체 읽기 · `readline()` 한 줄씩, 끝이면 **빈 문자열**',
        '`try` / `except FileNotFoundError` / `finally`(항상 실행)',
        '`shutil.copy` 복사 · `copytree` 디렉토리 복사 · `move` 이동 · `rmtree` 디렉토리 삭제 · `os.rename` · `os.remove` 파일 삭제 · `chmod` · `chown` · `link` · `symlink`',
        '`os.chdir` `mkdir` `rmdir` `getcwd` `listdir` · `glob.glob(패턴)` · `os.path.isabs` `abspath` `realpath` `exists` `isfile` `isdir`',
      ],
      traps: ['w는 덮어쓰기, a는 이어 쓰기', 'readline의 끝 신호는 None이 아니라 ""', 'rmtree(디렉토리) vs remove(파일)'],
    },

    /* ───────────────────────── 15. 데이터베이스 ───────────────────────── */
    {
      id: 's15', num: '15',
      title: '데이터베이스 SQLite',
      sub: 'connect · cursor · execute · commit · SELECT · fetchall · fetchone · UPDATE · DELETE',
      goal: 'sqlite3로 테이블을 만들고 조회·수정·삭제하는 흐름을 설명할 수 있다',
      lessons: [
        {
          title: 'SQLite와 기본 틀',
          body: [
            '**SQLite**는 **데이터베이스 관리 시스템(DBMS)**이에요. **무료**로 이용할 수 있고(`http://www.sqlite.org`), 파이썬에는 `sqlite3` 모듈이 기본으로 들어 있어요.',
            '',
            '데이터베이스는 데이터를 **표(테이블)**로 저장해요. 행(row) 하나가 레코드 하나, 열(column)이 필드예요.',
            '',
            '모든 작업은 아래 틀 안에서 해요.',
          ],
          code: `import sqlite3

con = sqlite3.connect("addr.db")
cursor = con.cursor()

# 여기서 SQL 명령을 실행한다.

cursor.close()
con.close()`,
          noRun: true,
          table: [
            ['메서드', '역할'],
            ['`connect`', 'DB 파일과 연결하여 데이터베이스 열기 (없으면 새로 만듦)'],
            ['`cursor`', '커서 객체를 구함 (SQL을 실행하는 손)'],
            ['`execute`', 'SQL 명령 수행'],
            ['`commit`', '변경 내용을 확정해서 저장'],
            ['`close`', '커서·연결 닫기'],
          ],
        },
        {
          title: '테이블 생성과 데이터 삽입',
          body: [
            '스크립트로 DB를 만들어요. SQL 명령은 문자열로 `execute()`에 넘겨요.',
            '',
            '- `DROP TABLE IF EXISTS 이름` : 같은 이름의 테이블이 있으면 지우기',
            '- `CREATE TABLE 이름 (필드 타입, ...)` : 테이블 만들기 (`PRIMARY KEY` = 중복될 수 없는 대표 필드)',
            '- `INSERT INTO 테이블 VALUES (...)` : 레코드 추가',
            '- 마지막에 `con.commit()`으로 **확정**해야 파일에 저장돼요',
          ],
          code: `import sqlite3

con = sqlite3.connect("addr.db")
cursor = con.cursor()

cursor.execute("DROP TABLE IF EXISTS tblAddr")
cursor.execute("""CREATE TABLE tblAddr
    (name CHAR(16) PRIMARY KEY, phone CHAR(16), addr TEXT)""")

cursor.execute("INSERT INTO tblAddr VALUES ('김상형', '123-4567', '오산')")
cursor.execute("INSERT INTO tblAddr VALUES ('한경은', '555-1004', '수원')")
cursor.execute("INSERT INTO tblAddr VALUES ('한주완', '444-1092', '대전')")

con.commit()
cursor.close()
con.close()
print("DB 생성 완료")`,
          output: 'DB 생성 완료',
        },
        {
          title: '조회: SELECT와 fetchall',
          body: [
            '데이터가 제대로 저장됐는지 **SELECT** 명령으로 확인해요. `SELECT * FROM 테이블`의 `*`는 **모든 필드(열)**라는 뜻이에요.',
            '',
            '**fetchall()**은 결과를 **한꺼번에 모두** 가져와요. 레코드 하나하나는 튜플이고, 전체는 튜플의 리스트예요.',
          ],
          code: `import sqlite3

con = sqlite3.connect("addr.db")
cursor = con.cursor()

cursor.execute("SELECT * FROM tblAddr")
table = cursor.fetchall()
for record in table:
    print("이름 : %s, 전화 : %s, 주소 : %s" % record)

cursor.close()
con.close()`,
          output: '이름 : 김상형, 전화 : 123-4567, 주소 : 오산\n이름 : 한경은, 전화 : 555-1004, 주소 : 수원\n이름 : 한주완, 전화 : 444-1092, 주소 : 대전',
        },
        {
          title: 'fetchone: 한 줄씩 가져오기',
          body: '**fetchone()**은 한 번 호출에 **레코드(row) 한 개**를 가져와요. 더 가져올 게 없으면 **None**을 돌려줘요.',
          code: `import sqlite3

con = sqlite3.connect("addr.db")
cursor = con.cursor()

cursor.execute("SELECT * FROM tblAddr")
while True:
    record = cursor.fetchone()
    if record == None:
        break
    print("이름 : %s, 전화 : %s, 주소 : %s" % record)

cursor.close()
con.close()`,
          output: '이름 : 김상형, 전화 : 123-4567, 주소 : 오산\n이름 : 한경은, 전화 : 555-1004, 주소 : 수원\n이름 : 한주완, 전화 : 444-1092, 주소 : 대전',
        },
        {
          title: '수정과 삭제: UPDATE, DELETE',
          body: [
            '- **UPDATE**: 특정 필드값 수정. **WHERE 절**과 함께 써서 어떤 레코드를 바꿀지 정해요.',
            '- **DELETE**: 레코드 삭제. 역시 WHERE로 대상을 정해요.',
            '',
            '변경한 뒤에는 꼭 `commit()`!',
          ],
          code: `import sqlite3

con = sqlite3.connect("addr.db")
cursor = con.cursor()

cursor.execute("UPDATE tblAddr SET addr = '제주도' WHERE name = '김상형'")
cursor.execute("DELETE FROM tblAddr WHERE name = '한주완'")
con.commit()

cursor.execute("SELECT * FROM tblAddr")
print(cursor.fetchall())
cursor.close()
con.close()`,
          output: "[('김상형', '123-4567', '제주도'), ('한경은', '555-1004', '수원')]",
          warn: 'WHERE 절을 빼먹으면 **모든 레코드**가 수정되거나 삭제돼요!',
        },
      ],
      quiz: [
        { type: 'match', pairs: [['`connect`', 'DB 파일과 연결'], ['`cursor`', '커서 객체를 구함'], ['`execute`', 'SQL 명령 수행'], ['`commit`', '변경 내용 확정']], explain: 'sqlite3의 기본 메서드.' },
        { type: 'mc', q: '조회 결과를 한꺼번에 모두 가져오는 메서드는?', choices: ['`fetchall()`', '`fetchone()`', '`execute()`', '`commit()`'], answer: 0, explain: 'fetchall = 모두, fetchone = 하나.' },
        { type: 'mc', q: '`fetchone()`이 더 가져올 레코드가 없을 때 돌려주는 값은?', choices: ['`None`', '`""`', '`0`', '에러'], answer: 0, explain: '그래서 `if record == None: break`로 반복을 끝내요.' },
        { type: 'mc', q: '특정 필드값을 수정하는 SQL 명령은?', choices: ['UPDATE', 'SELECT', 'INSERT', 'CREATE'], answer: 0, explain: 'UPDATE 테이블 SET 필드 = 값 WHERE 조건' },
        { type: 'mc', q: '레코드를 삭제하는 SQL 명령은?', choices: ['DELETE', 'DROP', 'REMOVE', 'CLEAR'], answer: 0, explain: 'DELETE는 레코드, DROP TABLE은 테이블 자체를 지워요.' },
        { type: 'mc', q: 'UPDATE에서 수정할 대상을 지정하는 절은?', choices: ['WHERE', 'FROM', 'INTO', 'TABLE'], answer: 0, explain: "예: WHERE name = '김상형'" },
        { type: 'order', q: 'addr.db의 tblAddr 전체를 조회하는 코드를 완성하세요.', lines: ['import sqlite3', 'con = sqlite3.connect("addr.db")', 'cursor = con.cursor()', 'cursor.execute("SELECT * FROM tblAddr")', 'table = cursor.fetchall()', 'con.close()'], explain: '연결 → 커서 → 실행 → 가져오기 → 닫기.' },
        { type: 'ox', q: 'INSERT나 UPDATE 후에는 `con.commit()`을 호출해야 변경 내용이 저장된다.', answer: true, explain: 'commit으로 확정해야 해요.' },
        { type: 'output', code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE t (name TEXT, age INTEGER)")
cur.execute("INSERT INTO t VALUES ('kim', 20)")
cur.execute("INSERT INTO t VALUES ('lee', 30)")
cur.execute("SELECT * FROM t")
print(cur.fetchall())`, answer: "[('kim', 20), ('lee', 30)]", explain: 'fetchall은 레코드 튜플들의 리스트를 돌려줘요. (":memory:"는 파일 대신 메모리에 만드는 임시 DB)' },
        { type: 'mc', q: '`SELECT * FROM tblAddr`에서 `*`의 의미는?', choices: ['모든 필드(열)', '곱하기', '모든 데이터베이스', '첫 번째 레코드'], answer: 0, explain: '모든 열을 가져오라는 뜻.' },
        { type: 'mc', q: 'SQLite에 대한 설명으로 옳은 것은?', choices: ['무료로 이용할 수 있는 DBMS', '파이썬 전용 그래프 도구', '유료 스프레드시트 프로그램', '웹 브라우저'], answer: 0, explain: '데이터베이스 관리 시스템, 무료.' },
        { type: 'output', code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE t (name TEXT, addr TEXT)")
cur.execute("INSERT INTO t VALUES ('kim', '오산')")
cur.execute("UPDATE t SET addr = '제주도' WHERE name = 'kim'")
cur.execute("SELECT * FROM t")
print(cur.fetchone())`, answer: "('kim', '제주도')", explain: 'UPDATE로 addr가 바뀌었고, fetchone은 레코드 하나(튜플)를 돌려줘요.' },
        { type: 'output', code: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE t (name TEXT)")
cur.execute("INSERT INTO t VALUES ('a')")
cur.execute("INSERT INTO t VALUES ('b')")
cur.execute("INSERT INTO t VALUES ('c')")
cur.execute("DELETE FROM t WHERE name = 'b'")
cur.execute("SELECT * FROM t")
print(len(cur.fetchall()))`, answer: '2', explain: '3개 넣고 b를 삭제했으니 2개.' },
        { type: 'blank', q: '조회 결과를 모두 가져오도록 빈칸을 채우세요.', code: `cursor.execute("SELECT * FROM tblAddr")
table = cursor.___()
for record in table:
    print(record)`, options: ['fetchall', 'commit', 'close', 'connect'], answer: ['fetchall'], explain: '모든 레코드를 리스트로.' },
        { type: 'ox', q: 'WHERE 절 없이 `DELETE FROM tblAddr`를 실행하면 모든 레코드가 삭제된다.', answer: true, explain: '대상 조건이 없으니 전부 삭제돼요.' },
      ],
      summary: [
        '**SQLite**: 무료 **DBMS** (sqlite.org) · 파이썬 `import sqlite3`',
        '`con = sqlite3.connect("파일.db")` → `cursor = con.cursor()` → `cursor.execute("SQL")` → `con.commit()` → `close()`',
        '`CREATE TABLE` 테이블 생성 · `INSERT INTO ... VALUES` 삽입 · `DROP TABLE IF EXISTS` 테이블 삭제',
        '`SELECT * FROM 테이블` 조회 (`*` = 모든 필드) · `fetchall()` 모두 한꺼번에 · `fetchone()` 한 row씩, 없으면 None',
        '`UPDATE 테이블 SET 필드 = 값 WHERE 조건` 수정 · `DELETE FROM 테이블 WHERE 조건` 삭제',
      ],
      traps: ['변경 후 commit을 안 하면 저장 안 됨', 'WHERE가 없으면 전체 레코드가 대상', 'DELETE(레코드) vs DROP(테이블)'],
    },

    /* ───────────────────────── 16. 클래스 ───────────────────────── */
    {
      id: 's16', num: '16',
      title: '클래스와 객체',
      sub: '모델링 · 캡슐화 · __init__ · self · 상속 · super() · 연산자 메서드 · __str__ · Fraction',
      goal: '클래스를 정의해 객체를 만들고, 상속과 특수 메서드를 이해할 수 있다',
      lessons: [
        {
          title: '클래스란?',
          body: [
            '**클래스**는 객체지향의 가장 기본적인 개념이에요. 관련된 **속성(데이터)과 동작(함수)을 하나의 범주로 묶어** 실세계의 사물을 흉내 내요.',
            '',
            '- **모델링**: 사물을 분석해서 필요한 속성과 동작을 추출하는 것',
            '- **캡슐화**: 모델링 결과를 클래스로 포장하는 것',
            '- **멤버**: 클래스를 구성하는 변수와 함수',
            '- **메서드**: 클래스에 소속된 함수',
          ],
          tip: '클래스는 붕어빵 **틀**, 객체는 그 틀로 찍어 낸 **붕어빵**이에요. 틀 하나로 붕어빵을 여러 개 만들 수 있고, 붕어빵마다 속(팥, 슈크림)은 다를 수 있죠.',
        },
        {
          title: '생성자 __init__',
          body: [
            '**`__init__`**은 객체를 만들 때 자동으로 호출되는 **생성자**예요. 전달받은 초기값으로 **멤버 변수를 초기화**해요. (init 앞뒤로 밑줄 **두 개**씩!)',
            '',
            '형식: `class 이름:` → 그 안에 `def __init__(self, 초기값):` 멤버 초기화 → 그 밖의 메서드 정의',
          ],
          code: `class Human:
    def __init__(self, age, name):
        self.age = age
        self.name = name
    def intro(self):
        print(str(self.age) + "살 " + self.name + "입니다.")`,
          output: '',
          after: '클래스를 **정의만** 했으니 아직 아무 일도 일어나지 않아요. 다음 카드에서 이 틀로 객체를 찍어 낼게요.',
        },
        {
          title: '객체 생성과 self',
          body: [
            '`kim = Human(29, "김상형")`처럼 클래스 이름을 함수처럼 부르면 **객체**가 만들어져요.',
            '',
            '- `__init__`의 **첫 번째 인수 `self`**에는 지금 만들어지는 **객체 자신**이 자동으로 전달돼요',
            '- 생성문에서 전달한 인수(29, "김상형")는 **두 번째 이후의 인수**(age, name)로 전달돼요',
            '- `self.age = age` → 이 객체의 age 멤버에 저장',
          ],
          code: `class Human:
    def __init__(self, age, name):
        self.age = age
        self.name = name
    def intro(self):
        print(str(self.age) + "살 " + self.name + "입니다.")

kim = Human(29, "김상형")
kim.intro()
lee = Human(45, "이승우")
lee.intro()`,
          output: '29살 김상형입니다.\n45살 이승우입니다.',
          trace: true,
        },
        {
          title: '상속',
          body: [
            '**상속**은 기존 클래스를 확장해서 **멤버를 추가하거나 동작을 변경**하는 거예요. 클래스 이름 다음 **괄호 안에 부모 클래스 이름**을 써요: `class 이름(부모):`',
            '',
            '자식 클래스는 부모의 멤버를 그대로 물려받고, 필요한 것만 새로 만들거나 바꿔요.',
          ],
          code: `class Human:
    def __init__(self, age, name):
        self.age = age
        self.name = name

    def intro(self):
        print(str(self.age) + "살 " + self.name + "입니다")


class Student(Human):
    def __init__(self, age, name, stunum):
        super().__init__(age, name)
        self.stunum = stunum

    def intro(self):
        super().intro()
        print("학번 : " + str(self.stunum))

    def study(self):
        print("하늘천 따지 검을현 누를황")


kim = Human(29, "김상형")
kim.intro()
lee = Student(34, "이승우", 930011)
lee.intro()
lee.study()`,
          output: '29살 김상형입니다\n34살 이승우입니다\n학번 : 930011\n하늘천 따지 검을현 누를황',
        },
        {
          title: 'super(): 부모의 메서드 부르기',
          body: [
            '**`super()`**는 **부모 클래스의 메서드를 불러와 쓸 수 있게** 해 줘요.',
            '',
            '- `super().__init__(age, name)` → 부모의 생성자에 age, name 초기화를 맡기고, 자식은 stunum만 추가로 저장',
            '- `super().intro()` → 부모의 intro를 먼저 실행한 뒤 학번을 덧붙여 출력 (메서드를 **재정의**하면서 부모 기능도 활용)',
          ],
          check: { q: 'Student 클래스에서 `super().__init__(age, name)`의 역할은?', choices: ['부모(Human)의 생성자를 호출해 age, name을 초기화', 'Student 객체를 삭제', '새로운 Human 객체를 따로 만든다', '에러를 막는다'], answer: 0, explain: '공통 부분의 초기화를 부모 생성자에게 맡겨요.' },
        },
        {
          title: '연산자 메서드 (연산자 오버로딩)',
          body: '연산자를 사용해 **객체끼리 연산**할 수 있어요. 클래스별로 연산자의 동작을 고유하게 정의하는 것을 **연산자 오버로딩**이라고 해요. 정해진 이름의 메서드를 만들면 돼요.',
          table: [
            ['연산자', '메서드', '연산자', '메서드'],
            ['`==`', '`__eq__`', '`+`', '`__add__`'],
            ['`!=`', '`__ne__`', '`-`', '`__sub__`'],
            ['`<`', '`__lt__`', '`*`', '`__mul__`'],
            ['`>`', '`__gt__`', '`/`', '`__truediv__` (수업 표: `__div__`)'],
            ['`<=`', '`__le__`', '`//`', '`__floordiv__` (우변: `__rfloordiv__`)'],
            ['`>=`', '`__ge__`', '`%`', '`__mod__` (우변: `__rmod__`)'],
            ['`**`', '`__pow__` (우변: `__rpow__`)', '`<<` / `>>`', '`__lshift__` / `__rshift__`'],
          ],
          code: `class Human:
    def __init__(self, age, name):
        self.age = age
        self.name = name
    def __eq__(self, other):
        return self.age == other.age and self.name == other.name

kim = Human(29, "김상형")
sang = Human(29, "김상형")
moon = Human(44, "문종민")
print(kim == sang)
print(kim == moon)`,
          output: 'True\nFalse',
          after: '`kim == sang`이라고 쓰면 파이썬이 `kim.__eq__(sang)`을 대신 호출해요. 객체가 연산자의 **오른쪽(우변)**에 올 때는 `__radd__`, `__rmod__`처럼 앞에 r이 붙은 메서드가 쓰여요.',
          tip: '`/`의 메서드는 파이썬 3에서 `__truediv__`예요. 수업 표의 `__div__`는 옛 파이썬 2의 이름이에요. 또 수업 표에 `>>`의 우변 메서드가 `__lshift__`로 적혀 있는데 올바른 이름은 `__rrshift__`예요.',
        },
        {
          title: '특수 메서드',
          body: '특정한 구문에 객체가 쓰일 때 **미리 약속된 작업**을 수행하는 메서드예요.',
          table: [
            ['메서드', '설명'],
            ['`__str__`', '`str(객체)` 형식으로 객체를 문자열화 한다 (print할 때도 사용)'],
            ['`__repr__`', '`repr(객체)` 형식으로 객체의 표현식을 만든다'],
            ['`__len__`', '`len(객체)` 형식으로 객체의 길이를 조사한다'],
          ],
          code: `class Human:
    def __init__(self, age, name):
        self.age = age
        self.name = name
    def __str__(self):
        return "이름 %s, 나이 %d" % (self.name, self.age)

kim = Human(29, "김상형")
print(kim)`,
          output: '이름 김상형, 나이 29',
        },
        {
          title: '유틸리티 클래스 Fraction',
          body: [
            '`fractions` 모듈의 **Fraction**은 **유리수(분수)**를 표현해요. 분자와 분모를 따로 전달해요: `Fraction([부호] 분자, 분모)`',
            '',
            '자동으로 **약분**해서 기약분수로 만들어 주고, 분수끼리 계산도 정확해요.',
          ],
          code: `from fractions import *

a = Fraction(1, 3)
print(a)
b = Fraction(8, 14)
print(b)
print(a + Fraction(1, 6))`,
          output: '1/3\n4/7\n1/2',
        },
      ],
      quiz: [
        { type: 'output', code: `class Human:
    def __init__(self, age, name):
        self.age = age
        self.name = name
    def intro(self):
        print(str(self.age) + "살 " + self.name + "입니다.")

kim = Human(29, "김상형")
kim.intro()`, answer: '29살 김상형입니다.', explain: '생성자에서 저장한 age와 name을 intro가 출력해요.' },
        { type: 'mc', q: '`__init__` 메서드의 역할은?', choices: ['객체를 만들 때 멤버를 초기화하는 생성자', '객체를 삭제한다', '객체를 문자열로 바꾼다', '두 객체를 비교한다'], answer: 0, explain: '생성 시 자동 호출되는 생성자.' },
        { type: 'mc', q: '`kim = Human(29, "김상형")`일 때 `__init__(self, age, name)`의 self에 전달되는 것은?', choices: ['새로 만들어지는 객체 자신', '29', '"김상형"', 'Human이라는 문자열'], answer: 0, explain: '29와 "김상형"은 두 번째 이후의 인수(age, name)로 가요.' },
        { type: 'output', code: `class Human:
    def __init__(self, age, name):
        self.age = age
        self.name = name
    def intro(self):
        print(str(self.age) + "살 " + self.name + "입니다")

class Student(Human):
    def __init__(self, age, name, stunum):
        super().__init__(age, name)
        self.stunum = stunum
    def intro(self):
        super().intro()
        print("학번 : " + str(self.stunum))

lee = Student(34, "이승우", 930011)
lee.intro()`, answer: '34살 이승우입니다\n학번 : 930011', explain: 'super().intro()로 부모의 intro를 먼저 실행한 뒤 학번을 출력해요.' },
        { type: 'mc', q: 'Human을 상속받는 Student 클래스 정의로 옳은 것은?', choices: ['`class Student(Human):`', '`class Human(Student):`', '`class Student extends Human:`', '`class Student: Human`'], answer: 0, explain: '괄호 안에 부모 클래스 이름.' },
        { type: 'mc', q: '`super()`의 역할은?', choices: ['부모 클래스의 메서드를 불러와 사용', '자식 클래스를 새로 만든다', '객체를 복사한다', '메서드를 삭제한다'], answer: 0, explain: '예: super().__init__(...), super().intro()' },
        { type: 'output', code: `class Human:
    def __init__(self, age, name):
        self.age = age
        self.name = name
    def __eq__(self, other):
        return self.age == other.age and self.name == other.name

kim = Human(29, "김상형")
sang = Human(29, "김상형")
moon = Human(44, "문종민")
print(kim == sang)
print(kim == moon)`, answer: 'True\nFalse', explain: '__eq__를 정의해서 나이와 이름이 같으면 == 가 True가 돼요.' },
        { type: 'match', pairs: [['`__eq__`', '`==`'], ['`__add__`', '`+`'], ['`__lt__`', '`<`'], ['`__len__`', '`len(객체)`']], explain: '연산자·함수와 특수 메서드 이름.' },
        { type: 'output', code: `from fractions import Fraction
print(Fraction(8, 14))`, answer: '4/7', explain: '8/14를 약분하면 4/7.' },
        { type: 'output', code: `from fractions import Fraction
print(Fraction(1, 3) + Fraction(1, 6))`, answer: '1/2', explain: '2/6 + 1/6 = 3/6 = 1/2' },
        { type: 'match', pairs: [['모델링', '사물을 분석해 필요한 속성과 동작을 추출'], ['캡슐화', '모델링 결과를 클래스로 포장'], ['멤버', '클래스를 구성하는 변수와 함수'], ['메서드', '클래스에 소속된 함수']], explain: '클래스 용어 4종.' },
        { type: 'blank', q: 'Human을 상속하고 부모의 생성자를 부르도록 빈칸을 채우세요.', code: `class Student(___):
    def __init__(self, age, name, stunum):
        super().___(age, name)
        self.stunum = stunum`, options: ['Human', '__init__', 'self', '__str__', 'object'], answer: ['Human', '__init__'], explain: '괄호 안에 부모 이름, super()로 부모의 __init__ 호출.' },
        { type: 'output', code: `class Box:
    def __init__(self):
        self.items = [1, 2, 3]
    def __len__(self):
        return len(self.items)

print(len(Box()))`, answer: '3', explain: 'len(객체)를 하면 __len__이 호출돼요.' },
        { type: 'output', code: `class Human:
    def __init__(self, age, name):
        self.age = age
        self.name = name
    def __str__(self):
        return "이름 %s, 나이 %d" % (self.name, self.age)

kim = Human(29, "김상형")
print(kim)`, answer: '이름 김상형, 나이 29', explain: 'print(객체)를 하면 __str__이 돌려준 문자열이 출력돼요.' },
        { type: 'order', q: 'Dog 클래스를 만들고 객체로 짖게 하는 코드를 완성하세요.', lines: ['class Dog:', '    def __init__(self, name):', '        self.name = name', '    def bark(self):', '        print(self.name + ": 멍멍")', 'd = Dog("초코")', 'd.bark()'], explain: '클래스 정의(생성자 → 메서드) 후 객체 생성, 메서드 호출.' },
        { type: 'ox', q: '`__str__`를 정의하면 `print(객체)`를 할 때 그 메서드가 돌려준 문자열이 출력된다.', answer: true, explain: 'str(객체) 형식으로 문자열화할 때 쓰여요.' },
        { type: 'mc', q: '연산자 오버로딩이란?', choices: ['클래스별로 연산자의 동작을 고유하게 정의하는 것', '연산자를 너무 많이 쓰는 것', '연산자 우선순위를 바꾸는 것', '연산자를 삭제하는 것'], answer: 0, explain: '__eq__, __add__ 같은 메서드로 정의해요.' },
      ],
      summary: [
        '**클래스**: 속성과 동작을 묶어 사물을 흉내 · **모델링**(속성·동작 추출) · **캡슐화**(클래스로 포장) · **멤버**(변수+함수) · **메서드**(소속 함수)',
        '`__init__(self, ...)` **생성자**: 초기값으로 멤버 초기화 · `self` = 생성되는 객체 자신 (자동 전달)',
        '`kim = Human(29, "김상형")` → 29, "김상형"은 두 번째 이후 인수로 · `kim.intro()` 메서드 호출',
        '**상속** `class 자식(부모):` 멤버 추가·동작 변경 · `super()` 부모의 메서드 호출',
        '연산자 오버로딩: `==` `__eq__` · `!=` `__ne__` · `<` `__lt__` · `>` `__gt__` · `<=` `__le__` · `>=` `__ge__` · `+` `__add__` · `-` `__sub__` · `*` `__mul__` · 우변일 때 `__r...__`',
        '특수 메서드: `__str__` str()·print · `__repr__` repr() · `__len__` len()',
        '`from fractions import *` · `Fraction(분자, 분모)` 유리수, 자동 약분',
      ],
      traps: ['self는 호출할 때 직접 넣지 않음', '__init__은 밑줄 두 개씩', 'super()는 부모 클래스의 메서드를 부름'],
    },

    /* ───────────────────────── 17. 모듈과 패키지 ───────────────────────── */
    {
      id: 's17', num: '17',
      title: '모듈과 패키지',
      sub: '모듈 작성 · import · sys.path · 패키지 · __init__.py · __all__ · dir · pip',
      goal: '직접 만든 모듈과 패키지를 가져오고, pip로 외부 모듈을 관리할 수 있다',
      lessons: [
        {
          title: '모듈 만들기',
          body: [
            '**모듈**은 파이썬 코드를 저장하는 기본 단위예요. 편의상 스크립트를 **여러 개의 파일로 나눈 것 하나**가 모듈이에요.',
            '',
            '- 파이썬에서 자주 쓰는 기능은 **표준 모듈**로 제공돼요 (math, time, random…)',
            '- 모듈은 **직접 만들 수도** 있어요. .py 파일을 만들면 끝!',
            '- 가져올 때는 **.py를 빼고 파일명으로만** 불러요: `import util`',
          ],
          file: 'util.py',
          code: `INCH = 2.54

def calcsum(n):
    sum = 0
    for num in range(n + 1):
        sum += num
    return sum`,
          noRun: true,
        },
        {
          title: '모듈 가져다 쓰기',
          body: '같은 폴더에 util.py가 있으면 `import util`로 가져와서 `util.INCH`, `util.calcsum(10)`처럼 **모듈이름.이름**으로 써요.',
          file: 'utiltest.py',
          code: `import util

print("1inch =", util.INCH)
print("~10 =", util.calcsum(10))`,
          output: '1inch = 2.54\n~10 = 55',
        },
        {
          title: '모듈 경로',
          body: [
            '모듈은 기본적으로 **임포트하는 파일과 같은 디렉토리**에 있어야 해요. 못 찾으면 이런 에러가 나요:',
            '',
            "`ModuleNotFoundError: No module named 'util2'`",
            '',
            '모듈을 다른 폴더에 두려면 그 폴더를 **임포트 패스(`sys.path`)에 추가**해요. `sys.path`는 파이썬이 모듈을 찾아보는 폴더 목록이에요.',
          ],
          code: `import sys
print(sys.path)          # 모듈을 찾는 폴더 목록
sys.path.append("C:\\\\Temp")
import util2
print(util2.calcsum(10))`,
          output: "['C:\\\\PyStudy', 'C:\\\\Python\\\\Lib', …]\n55",
          noRun: true,
        },
        {
          title: '패키지: 모듈을 담는 디렉토리',
          body: [
            '**패키지**는 **모듈을 담는 디렉토리**예요. 디렉토리로 계층을 구성하면 모듈을 기능 등에 따라 분류할 수 있어요.',
            '',
            '모듈 이름을 **점(.)으로 이어서** 경로를 나타내요: `import mypack.calc.add`',
          ],
          table: [
            ['경로', '내용'],
            ['`PyStudy/mypack/calc/add.py`', '`def outadd(a, b): print(a + b)`'],
            ['`PyStudy/mypack/calc/multi.py`', '`def outmulti(a, b): print(a * b)`'],
            ['`PyStudy/mypack/report/table.py`', '`def printreport():` 줄 긋고 "report" 출력'],
          ],
          code: `import sys
sys.path.append("C:/PyStudy")

import mypack.calc.add
mypack.calc.add.outadd(1, 2)

from mypack.calc import add
add.outadd(1, 2)`,
          output: '3\n3',
          noRun: true,
          after: '`from 패키지 import 모듈` 형식을 쓰면 긴 경로 없이 `add.outadd(1, 2)`처럼 짧게 쓸 수 있어요.',
        },
        {
          title: '__init__.py와 __all__',
          body: [
            '패키지 디렉토리에 두는 **`__init__.py`** 파일은',
            '- 패키지 안에 포함된 **모듈들의 정보를 제공**하고',
            '- 패키지가 **로드될 때의 초기화 코드**를 작성해 둬요.',
            '',
            "`from mypack.calc import *`를 해도 `__init__.py`에 목록이 없으면 모듈을 자동으로 읽어 오지 않아서 `NameError: name 'add' is not defined`가 나요.",
            '',
            '`__init__.py`에 **`__all__`** 리스트를 적어 두면 `import *` 할 때 add와 multi 모듈을 모두 읽어 오고, `__init__.py`의 초기화 코드도 실행돼요.',
          ],
          file: '__init__.py',
          code: `__all__ = ["add", "multi"]

print("add module imported")`,
          noRun: true,
        },
        {
          title: '서드 파티 모듈: dir과 pip',
          body: [
            '각 모듈은 기능별로 나뉘어 많은 함수를 담고 있어요. **`dir()`** 내장 함수로 모듈에 있는 **함수나 변수 목록**을 조사할 수 있어요.',
            '',
            '파이썬이 기본 제공하지 않는 외부(서드 파티) 모듈은 **pip**로 관리해요. 형식: `pip 명령 패키지명`',
          ],
          table: [
            ['명령', '설명'],
            ['`install`', '패키지를 설치한다'],
            ['`uninstall`', '설치한 패키지를 삭제한다'],
            ['`freeze`', '설치한 패키지의 목록을 보여준다'],
            ['`show`', '패키지의 정보를 보여준다'],
            ['`search`', 'PyPI에서 패키지를 검색한다'],
          ],
          code: `import math
print("sqrt" in dir(math))
print(len(dir(math)) > 30)`,
          output: 'True\nTrue',
          tip: '터미널에서 `pip install numpy`처럼 써요. 코랩에서는 코드 칸에 느낌표를 붙여 `!pip install 패키지명`으로 실행해요.',
        },
      ],
      quiz: [
        { type: 'mc', q: 'util.py 파일을 모듈로 가져오는 올바른 문장은?', choices: ['`import util`', '`import util.py`', '`include util`', '`from util.py import *`'], answer: 0, explain: '.py를 빼고 파일명만.' },
        { type: 'mc', q: '`import util` 후 util.py 안의 `INCH` 값을 출력하는 코드는?', choices: ['`print(util.INCH)`', '`print(INCH)`', '`print(util[INCH])`', '`print(util.py.INCH)`'], answer: 0, explain: '모듈이름.이름' },
        { type: 'mc', q: '임포트할 모듈을 찾지 못했을 때 나는 에러는?', choices: ['ModuleNotFoundError', 'NameError', 'TypeError', 'KeyError'], answer: 0, explain: "No module named '...'" },
        { type: 'mc', q: '다른 폴더의 모듈을 쓰려고 임포트 경로를 추가하는 코드는?', choices: ['`sys.path.append("C:\\\\Temp")`', '`sys.add("C:\\\\Temp")`', '`import C:\\\\Temp`', '`path.import("C:\\\\Temp")`'], answer: 0, explain: 'sys.path 리스트에 폴더를 append.' },
        { type: 'mc', q: '패키지란?', choices: ['모듈을 담는 디렉토리', '함수 하나', '변수의 모음', '파이썬 설치 파일'], answer: 0, explain: '디렉토리로 모듈을 계층 분류해요.' },
        { type: 'mc', q: '`from mypack.calc import *`로 add, multi 모듈을 모두 불러오려면 `__init__.py`에 무엇을 써야 할까요?', choices: ['`__all__ = ["add", "multi"]`', '`import *`', '`__main__ = ["add", "multi"]`', '아무것도 안 써도 된다'], answer: 0, explain: '__all__에 import * 대상 모듈을 적어요.' },
        { type: 'match', pairs: [['`install`', '패키지 설치'], ['`uninstall`', '패키지 삭제'], ['`freeze`', '설치된 패키지 목록'], ['`show`', '패키지 정보 보기']], explain: 'pip 명령.' },
        { type: 'mc', q: '모듈 안에 있는 함수나 변수 목록을 조사하는 내장 함수는?', choices: ['`dir()`', '`len()`', '`type()`', '`range()`'], answer: 0, explain: 'dir(math)' },
        { type: 'blank', q: 'mypack.calc 패키지에서 add 모듈만 가져오세요.', code: `from mypack.calc ___ add
add.outadd(1, 2)`, options: ['import', 'from', 'as', 'in'], answer: ['import'], explain: 'from 패키지 import 모듈' },
        { type: 'ox', q: '모듈을 임포트할 때는 `import util.py`처럼 확장자를 붙여야 한다.', answer: false, explain: '.py는 빼요.' },
        { type: 'order', q: 'C:/PyStudy의 mypack 패키지에서 add 모듈을 써서 1+2를 출력하세요.', lines: ['import sys', 'sys.path.append("C:/PyStudy")', 'import mypack.calc.add', 'mypack.calc.add.outadd(1, 2)'], explain: '경로 추가 → 임포트 → 사용.' },
        { type: 'mc', q: '`__init__.py`의 역할로 옳은 것은?', choices: ['패키지 정보 제공과 로드 시 초기화 코드', '클래스의 생성자', '파일을 삭제하는 함수', 'pip 설정 파일'], answer: 0, explain: '클래스의 __init__ 메서드와 헷갈리지 마세요.' },
        { type: 'mc', q: '`__all__`이 없는 상태에서 `from mypack.calc import *` 후 `add.outadd(1, 2)`를 실행하면?', choices: ["NameError: name 'add' is not defined", '3', 'None', 'ModuleNotFoundError'], answer: 0, explain: 'import *로 모듈이 자동으로 읽히지 않았어요.' },
        { type: 'output', code: `import math
print("sqrt" in dir(math))`, answer: 'True', explain: 'dir(math) 목록에 sqrt가 있어요.' },
        { type: 'mc', q: '외부(서드 파티) 모듈을 설치하는 명령은?', choices: ['`pip install 패키지명`', '`import install 패키지명`', '`python get 패키지명`', '`pip freeze 패키지명`'], answer: 0, explain: 'pip install numpy 처럼.' },
        { type: 'output', q: '같은 폴더의 util.py가 배우기 카드의 내용(`INCH = 2.54`, `calcsum(n)` 정의)일 때 출력은?', code: `import util
print(util.calcsum(10))`, answer: '55', explain: 'util 모듈의 calcsum(10) = 0 + 1 + … + 10 = 55' },
      ],
      summary: [
        '**모듈** = 코드 저장 기본 단위(.py 파일 하나) · 표준 모듈 + 직접 제작 · `import util` (.py 빼고)',
        '모듈은 임포트하는 파일과 **같은 디렉토리**에 · 못 찾으면 `ModuleNotFoundError` · `sys.path.append(폴더)`로 경로 추가',
        '**패키지** = 모듈을 담는 디렉토리 · `import mypack.calc.add` · `from mypack.calc import add`',
        '`__init__.py`: 패키지 모듈 정보 제공, 로드 시 초기화 코드 · `__all__ = ["add", "multi"]` → `import *` 대상',
        '`dir(모듈)` 함수·변수 목록 · pip: `install` `uninstall` `freeze`(목록) `show`(정보) `search`',
      ],
      traps: ['`import util.py` (X)', '__all__이 없으면 import *로 모듈이 안 읽힘', '패키지의 __init__.py ≠ 클래스의 __init__ 메서드'],
    },
  ],
});
