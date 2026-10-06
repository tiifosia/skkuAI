/* 2강 · 함수와 자료구조 (수업 자료 2: 함수 · 리스트와 튜플 · 사전과 집합 · 컬렉션 관리) */
window.PQ = window.PQ || { worlds: [], traces: {} };
PQ.worlds.push({
  id: 'w2',
  lecture: '2강',
  short: '함수와 자료구조',
  title: '자료구조의 숲',
  desc: '함수 · 리스트 · 튜플 · 사전 · 집합 · zip/filter/map/lambda · 사본',
  bossTitle: '2강 보스: 리스트 히드라',
  stages: [
    /* ───────────────────────── 8. 함수 ───────────────────────── */
    {
      id: 's08', num: '8',
      title: '함수 만들기',
      sub: 'def · return · 인수와 매개변수 · 가변 인수 · 기본값 · 키워드 인수 · 지역/전역 변수',
      goal: '함수를 정의하고 호출하며, 인수가 어떻게 전달되는지 설명할 수 있다',
      lessons: [
        {
          title: '함수란?',
          body: [
            '**함수**는 일련의 코드 블록에 **이름을 붙여 정의**한 것이에요.',
            '',
            '- 자주 반복되는 코드를 한 번만 만들어 두고 **이름만 불러서** 쓸 수 있어요',
            '- **호출문**으로 실행해요: `함수(인수 목록)`',
            '',
            '사실 우리는 이미 함수를 써 왔어요. `print()`, `input()`, `len()`, `range()` 모두 파이썬이 미리 만들어 둔 **내장 함수**예요.',
          ],
          tip: '함수는 자판기와 같아요. 돈과 버튼(인수)을 넣으면 음료(리턴값)가 나와요. 안에서 어떻게 만드는지 몰라도 쓸 수 있죠.',
        },
        {
          title: 'def로 함수 만들기',
          body: '`def 함수이름(매개변수):` 다음 줄부터 들여써서 함수의 몸체를 써요. `return`은 결과를 호출한 곳으로 **돌려줘요**.',
          code: `def calcSum(n):
    sum = 0
    for num in range(n + 1):
        sum += num
    return sum

print("~ 4 =", calcSum(4))
print("~ 10 =", calcSum(10))`,
          output: '~ 4 = 10\n~ 10 = 55',
          trace: true,
          after: '`def`로 **정의만** 해서는 아무 일도 일어나지 않아요. 아래에서 `calcSum(4)`처럼 **호출**해야 그때 함수 안의 코드가 실행돼요. 한 줄씩 실행으로 확인해 보세요.',
        },
        {
          title: '내장 함수 range 다시 보기',
          body: 'range는 **인수 개수**에 따라 다르게 동작해요. 파이썬 3에서는 `list()`로 감싸야 내용이 보여요.',
          table: [
            ['호출', '의미', '결과'],
            ['`range(5)`', '인수 1개: 0부터 시작, 5 직전까지', '`[0, 1, 2, 3, 4]`'],
            ['`range(5, 10)`', '인수 2개: 시작 숫자와 끝 숫자 (끝은 미포함)', '`[5, 6, 7, 8, 9]`'],
            ['`range(1, 10, 3)`', '인수 3개: 세 번째는 숫자 사이의 거리', '`[1, 4, 7]`'],
          ],
          code: `print(list(range(5)))
print(list(range(5, 10)))
print(list(range(1, 10, 3)))
print(range(1, 10, 3))`,
          output: '[0, 1, 2, 3, 4]\n[5, 6, 7, 8, 9]\n[1, 4, 7]\nrange(1, 10, 3)',
          tip: '수업 자료에는 `>>> range(1, 10, 3)`의 결과가 `[1, 4, 7]`로 적혀 있지만, 파이썬 3에서 그대로 출력하면 `range(1, 10, 3)`이 나와요. 내용을 보려면 `list()`로 감싸세요.',
        },
        {
          title: '인수, 매개변수, 리턴값',
          body: [
            '- **인수(argument)**: 호출원에서 함수로 **전달되는 값**. 함수의 동작에 변화를 줘서 활용성을 높여요.',
            '- **매개변수(parameter)**: 함수 정의에서 그 값을 **받는 변수**',
            '- **리턴값**: 실행 결과를 호출원으로 **돌려주는 값**. 없어도 돼요 (없으면 `None`).',
          ],
          code: `def calcrange(begin, end):
    sum = 0
    for num in range(begin, end + 1):
        sum += num
    return sum

print("3 ~ 7 =", calcrange(3, 7))`,
          output: '3 ~ 7 = 25',
          after: '`calcrange(3, 7)`에서 3과 7이 **인수**, 정의의 `begin`, `end`가 **매개변수**, 돌려받은 25가 **리턴값**이에요.',
          check: { q: '리턴값이 없는 함수 `def hi(): print("hi")`에 대해 `print(hi())`를 실행하면?', choices: ['`hi`만 출력', '`hi` 다음 줄에 `None` 출력', '에러', '아무것도 출력 안 됨'], answer: 1, explain: '함수 안의 print가 hi를 출력하고, 리턴값이 없으니 바깥 print는 None을 출력해요.' },
        },
        {
          title: '가변 인수 *',
          body: [
            '**가변 인수**는 고정되지 않은 **임의 개수의 인수**를 받아요. 인수 이름 앞에 **`*`**를 붙이면 들어온 값들이 **튜플**로 묶여요.',
            '',
            '가변 인수는 **인수 목록의 마지막**에 와야 해요.',
          ],
          code: `def intsum(*ints):
    sum = 0
    for num in ints:
        sum += num
    return sum

print(intsum(1, 2, 3))
print(intsum(5, 7, 9, 11, 13))
print(intsum(8, 9, 6, 2, 9, 7, 5, 8))`,
          output: '6\n45\n54',
          table: [
            ['정의', '수업 기준'],
            ['`intsum(s, *ints)`', '가능'],
            ['`intsum(*ints, s)`', '에러'],
            ['`intsum(*ints, *nums)`', '에러 (가변 인수는 하나만)'],
          ],
          tip: '엄밀히 말하면 최신 파이썬은 `def f(*ints, s)`를 허용하지만, 그때 s는 `f(1, 2, s=3)`처럼 이름을 붙여서만 줄 수 있어요. 시험에서는 수업대로 "가변 인수는 마지막에"로 기억하세요.',
        },
        {
          title: '인수의 기본값',
          body: [
            '잘 바뀌지 않는 인수는 **기본값**을 지정할 수 있어요. 호출할 때 그 인수(실인수)를 **생략하면 기본값**이 전달돼요.',
            '',
            '기본값이 있는 인수는 **뒤쪽**에 둬야 해요.',
          ],
          code: `def calcStep(begin, end, step=1):
    sum = 0
    for num in range(begin, end + 1, step):
        sum += num
    return sum

print("1 ~ 10 =", calcStep(1, 10, 2))
print("1 ~ 100 =", calcStep(1, 100))`,
          output: '1 ~ 10 = 25\n1 ~ 100 = 5050',
          after: '첫 호출은 step=2라서 1+3+5+7+9 = 25, 두 번째는 step을 생략해서 기본값 1로 1~100의 합 5050이에요. (수업 자료의 실행결과 표시는 "1~10 = 25, 2~10 = 5050"으로 오타가 있어요.)',
        },
        {
          title: '키워드 인수',
          body: [
            '**키워드 인수**는 인수 이름을 지정해서 `이름=값` 대입 형태로 전달하는 방식이에요. 이름을 쓰면 **순서를 바꿔도** 돼요.',
            '',
            '위치로 주는 인수와 섞을 때는 **위치 인수가 먼저, 키워드 인수가 뒤에** 와야 해요.',
          ],
          code: `def calcstep(begin, end, step=1):
    sum = 0
    for num in range(begin, end + 1, step):
        sum += num
    return sum

print("3 ~ 5 =", calcstep(3, 5, 1))
print("3 ~ 5 =", calcstep(begin=3, end=5, step=1))
print("3 ~ 5 =", calcstep(step=1, end=5, begin=3))
print("3 ~ 5 =", calcstep(3, 5, step=1))
print("3 ~ 5 =", calcstep(3, step=1, end=5))`,
          output: '3 ~ 5 = 12\n3 ~ 5 = 12\n3 ~ 5 = 12\n3 ~ 5 = 12\n3 ~ 5 = 12',
          warn: '`calcstep(begin=3, 5)`처럼 키워드 인수 **뒤에** 위치 인수를 쓰면 에러예요.',
        },
        {
          title: '지역 변수와 전역 변수',
          body: [
            '- **지역 변수**: 함수 **내부**에서 선언한 변수. 함수 안에서만 쓰이고 밖으로는 알려지지 않아요.',
            '- **전역 변수**: 함수 **바깥**에서 선언한 변수. 어디에서나 참조할 수 있어요.',
          ],
          code: `salerate = 0.9

def kim():
    print("오늘의 할인율 :", salerate)

def lee():
    price = 1000
    print("가격 :", price * salerate)

kim()
salerate = 1.1
lee()`,
          output: '오늘의 할인율 : 0.9\n가격 : 1100.0',
          trace: true,
          after: 'lee()를 부를 때는 salerate가 이미 1.1로 바뀌어서 1000 × 1.1 = 1100.0이 나와요. `price`는 lee 안의 지역 변수라 함수 밖에서 `print(price)`를 하면 NameError예요.',
          tip: '함수 안에서 전역 변수의 값을 **바꾸려면** `global salerate`처럼 선언해야 해요. 읽기만 할 때는 필요 없어요.',
        },
      ],
      quiz: [
        { type: 'output', code: `def calcSum(n):
    sum = 0
    for num in range(n + 1):
        sum += num
    return sum

print(calcSum(4))`, answer: '10', explain: '0 + 1 + 2 + 3 + 4 = 10. `range(n + 1)`이라 n까지 포함해요.' },
        { type: 'output', code: `def calcrange(begin, end):
    sum = 0
    for num in range(begin, end + 1):
        sum += num
    return sum

print(calcrange(3, 7))`, answer: '25', explain: '3 + 4 + 5 + 6 + 7 = 25' },
        { type: 'output', code: `def intsum(*ints):
    sum = 0
    for num in ints:
        sum += num
    return sum

print(intsum(5, 7, 9, 11, 13))`, answer: '45', explain: '가변 인수로 받은 다섯 수를 모두 더해요.' },
        { type: 'output', code: `def calcStep(begin, end, step=1):
    sum = 0
    for num in range(begin, end + 1, step):
        sum += num
    return sum

print(calcStep(1, 10, 2))`, answer: '25', explain: 'step=2라서 1 + 3 + 5 + 7 + 9 = 25' },
        { type: 'mc', q: '`def calcStep(begin, end, step=1):`일 때 `calcStep(1, 100)`의 결과는?', choices: ['5050', '100', '에러가 난다', '50'], answer: 0, explain: 'step을 생략했으니 기본값 1이 쓰여 1~100의 합 5050.' },
        { type: 'output', code: `def f(a, b=2):
    return a * b

print(f(3))`, answer: '6', explain: 'b를 생략했으니 기본값 2 → 3 × 2' },
        { type: 'output', code: `def f(a, b=2):
    return a * b

print(f(3, 4))`, answer: '12', explain: 'b에 4를 줬으니 기본값 대신 4 → 3 × 4' },
        { type: 'match', pairs: [['인수', '호출할 때 함수로 전달하는 값'], ['매개변수', '함수 정의에서 값을 받는 변수'], ['리턴값', '결과를 호출한 곳으로 돌려주는 값'], ['가변 인수', '`*`를 붙여 개수 제한 없이 받는 인수']], explain: '용어 정의 문제가 자주 나와요.' },
        { type: 'mc', q: '가변 인수를 쓰는 정의 중 수업에서 **올바르다고** 한 것은?', choices: ['`def intsum(s, *ints):`', '`def intsum(*ints, s):`', '`def intsum(*ints, *nums):`', '`def intsum(*):`'], answer: 0, explain: '가변 인수는 인수 목록의 마지막에, 하나만.' },
        { type: 'ox', q: '리턴값이 없는 함수도 만들 수 있다.', answer: true, explain: '리턴값은 없어도 돼요. 그때 호출 결과는 None이에요.' },
        { type: 'output', code: `salerate = 0.9

def kim():
    print("오늘의 할인율 :", salerate)

def lee():
    price = 1000
    print("가격 :", price * salerate)

kim()
salerate = 1.1
lee()`, answer: '오늘의 할인율 : 0.9\n가격 : 1100.0', explain: '전역 변수 salerate는 kim() 때는 0.9, lee() 때는 1.1이에요.' },
        { type: 'mc', q: '지역 변수에 대한 설명으로 옳은 것은?', choices: ['함수 내부에서 선언되고 함수 안에서만 쓰인다', '함수 밖에서 선언되어 어디서나 쓰인다', '프로그램이 끝나도 계속 남아 있다', '반드시 global로 선언해야 한다'], answer: 0, explain: '함수 밖에서는 지역 변수를 알 수 없어요.' },
        { type: 'output', code: `def calcstep(begin, end, step=1):
    sum = 0
    for num in range(begin, end + 1, step):
        sum += num
    return sum

print(calcstep(step=1, end=5, begin=3))`, answer: '12', explain: '키워드 인수는 순서를 바꿔도 이름으로 찾아가요. 3 + 4 + 5 = 12' },
        { type: 'blank', q: '함수 정의와 결과 반환에 필요한 키워드를 채우세요.', code: `___ calcSum(n):
    sum = 0
    for num in range(n + 1):
        sum += num
    ___ sum`, options: ['def', 'return', 'print', 'for', 'class'], answer: ['def', 'return'], explain: '정의는 `def`, 결과를 돌려줄 땐 `return`.' },
        { type: 'order', q: 'n까지의 합을 돌려주는 함수를 완성하세요.', lines: ['def calcSum(n):', '    sum = 0', '    for num in range(n + 1):', '        sum += num', '    return sum'], explain: 'return은 for 블록이 끝난 뒤(for와 같은 들여쓰기)에 와야 해요.' },
        { type: 'output', code: `def hello():
    print("hi")

print(hello())`, answer: 'hi\nNone', explain: '함수 안에서 hi를 출력하고, 리턴값이 없으니 바깥 print는 None을 출력해요.' },
        { type: 'output', code: `print(list(range(5, 10)))`, answer: '[5, 6, 7, 8, 9]', explain: '시작 5, 끝 10은 미포함.' },
        { type: 'mc', q: '`def calcstep(begin, end, step=1)` 호출 중 **에러**가 나는 것은?', choices: ['`calcstep(3, 5, step=1)`', '`calcstep(3, step=1, end=5)`', '`calcstep(begin=3, end=5)`', '`calcstep(begin=3, 5)`'], answer: 3, explain: '키워드 인수 뒤에 위치 인수를 쓸 수 없어요.' },
        { type: 'output', code: `def intsum(*ints):
    return len(ints)

print(intsum(4, 5, 6))`, answer: '3', explain: '가변 인수 ints는 (4, 5, 6) 튜플이라 길이 3.' },
        { type: 'output', code: `print(list(range(5)))`, answer: '[0, 1, 2, 3, 4]', explain: '인수 1개: 0부터 시작, 5는 포함하지 않아요.' },
        { type: 'output', code: `print(list(range(1, 10, 3)))`, answer: '[1, 4, 7]', explain: '인수 3개: 세 번째 인수 3은 숫자 사이의 거리.' },
      ],
      summary: [
        '**함수**: 코드 블록에 이름을 붙여 정의 · `def 이름(매개변수):` + 들여쓴 몸체 · 호출문 `함수(인수)`로 실행',
        '`return`으로 결과를 호출원에 돌려줌 · 리턴값은 없어도 됨 (없으면 `None`)',
        '**인수** = 호출원에서 함수로 전달되는 값, **매개변수** = 정의에서 받는 변수',
        '`range(5)` 0~4 · `range(5, 10)` 5~9 · `range(1, 10, 3)` 1,4,7 (파이썬 3은 `list()`로 감싸야 보임)',
        '**가변 인수** `*ints`: 임의 개수를 튜플로 받음, 인수 목록 **마지막**에',
        '**기본값** `step=1`: 생략하면 기본값 전달 · **키워드 인수** `end=5`: 이름 지정, 순서 무관, 위치 인수 뒤에',
        '**지역 변수**: 함수 안에서 선언, 안에서만 사용 · **전역 변수**: 함수 밖에서 선언, 어디서나 참조',
      ],
      traps: ['정의만 하고 호출하지 않으면 아무것도 실행 안 됨', 'return 없는 함수를 print하면 None', '키워드 인수 뒤에 위치 인수 불가', 'n까지 포함하려면 `range(n + 1)`'],
    },

    /* ───────────────────────── 9. 리스트 ───────────────────────── */
    {
      id: 's09', num: '9',
      title: '리스트',
      sub: '요소 · 인덱싱 · 슬라이싱 · 이중 리스트 · 삽입 · 삭제 · 검색 · 정렬',
      goal: '리스트를 만들고 요소를 넣고, 빼고, 찾고, 정렬할 수 있다',
      lessons: [
        {
          title: '리스트: 자료의 집합',
          body: [
            '**리스트**는 여러 개의 값을 **집합적으로 저장**해요. 대괄호 `[ ]` 안에 콤마로 나열해요.',
            '',
            '- **요소(Element)**: 리스트에 소속되는 각각의 값',
            '- 리스트에는 주로 **같은 타입** 요소를 모아요',
          ],
          code: `score = [88, 95, 70, 100, 99]
sum = 0
for s in score:
    sum += s
print("총점 : ", sum)
print("평균 : ", sum / len(score))`,
          output: '총점 :  452\n평균 :  90.4',
          after: '`len(score)`는 요소 개수 5예요. "총점 : " 뒤의 공백과 print의 구분자 공백이 겹쳐서 두 칸이 보여요.',
        },
        {
          title: '요소 읽기와 슬라이싱',
          body: [
            '- **개별 요소 읽기**: 대괄호 안에 읽고자 하는 요소의 순서값을 적어요. 문자열처럼 **0부터**, 음수는 뒤에서부터.',
            '- **요소 분리**: 범위를 `[begin:end:step]`으로 지정해요 (end 미포함)',
          ],
          code: `score = [88, 95, 70, 100, 99]
print(score[0], score[2], score[-1])

nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(nums[2:5])
print(nums[:4])
print(nums[6:])
print(nums[1:7:2])`,
          output: '88 70 99\n[2, 3, 4]\n[0, 1, 2, 3]\n[6, 7, 8, 9]\n[1, 3, 5]',
        },
        {
          title: '이중 리스트',
          body: [
            '리스트의 요소로 **리스트를 넣어 중첩**할 수 있어요. `lol[2][1]`은 "2번 리스트의 1번 요소"예요.',
            '',
            '이중 리스트를 순회해서 최종값을 읽으려면 **루프도 이중**으로 해야 해요.',
          ],
          code: `lol = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
print(lol[0])
print(lol[2][1])

for sub in lol:
    for item in sub:
        print(item, end=" ")
    print()`,
          output: '[1, 2, 3]\n7\n1 2 3 \n4 5 \n6 7 8 9 ',
        },
        {
          title: '삽입: append와 insert',
          body: [
            '- **append(값)**: 인수로 전달한 요소를 리스트 **끝에** 추가',
            '- **insert(위치, 값)**: 삽입할 위치와 요소값을 전달받아 리스트 **중간에** 삽입',
          ],
          code: `nums = [1, 2, 3, 4]
nums.append(5)
nums.insert(2, 99)
print(nums)`,
          output: '[1, 2, 99, 3, 4, 5]',
          trace: true,
        },
        {
          title: '범위에 리스트 대입하기',
          body: '범위(슬라이스)에 리스트를 대입하면 **여러 요소를 한꺼번에 삽입**할 수 있어요. 하지만 인덱스 하나에 대입하면 **그 요소가 리스트로 대체**돼요.',
          code: `nums = [1, 2, 3, 4]
nums[2:2] = [90, 91, 92]
print(nums)

nums = [1, 2, 3, 4]
nums[2] = [90, 91, 92]
print(nums)`,
          output: '[1, 2, 90, 91, 92, 3, 4]\n[1, 2, [90, 91, 92], 4]',
          table: [
            ['코드', '동작', '결과'],
            ['`nums[2:2] = [90, 91, 92]`', '**삽입**: 2번 자리에 세 요소가 끼어듦', '`[1, 2, 90, 91, 92, 3, 4]`'],
            ['`nums[2] = [90, 91, 92]`', '**대체**: 2번 요소(3)가 리스트 하나로 바뀜', '`[1, 2, [90, 91, 92], 4]`'],
          ],
        },
        {
          title: '삭제: remove, del, clear, 빈 리스트',
          body: [
            '대상을 고르는 방법에 따라 다른 방법을 써요.',
            '',
            '- **remove(값)**: 인수로 받은 **요소값을 찾아** 삭제',
            '- **del 리스트[위치]**: **순서값(인덱스)**을 지정해 삭제',
            '- **clear()**: 리스트의 **모든 요소** 삭제',
            '- **빈 리스트 대입** `리스트[범위] = []`: 일정 범위의 요소 다수 삭제',
          ],
          code: `score = [88, 95, 70, 100, 99, 80, 78, 50]
score.remove(100)
print(score)
del(score[2])
print(score)
score[1:4] = []
print(score)`,
          output: '[88, 95, 70, 99, 80, 78, 50]\n[88, 95, 99, 80, 78, 50]\n[88, 78, 50]',
          trace: true,
        },
        {
          title: '검색: index, count, min/max, in',
          body: [
            '- **index(값)**: 특정 요소의 **위치**를 찾음',
            '- **count(값)**: 특정 요소값의 **개수**를 조사',
            '- **min / max**: 리스트 요소 중 **최솟값 / 최댓값**',
            '- **in / not in**: 특정 요소가 있는지 여부를 검사',
          ],
          code: `score = [88, 95, 70, 100, 99, 80, 78, 50]
perfect = score.index(100)
print("만점 받은 학생은 " + str(perfect) + "번입니다.")
pernum = score.count(100)
print("만점자 수는 " + str(pernum) + "명입니다")
print(min(score), max(score), 95 in score)`,
          output: '만점 받은 학생은 3번입니다.\n만점자 수는 1명입니다\n50 100 True',
        },
        {
          title: '정렬: sort와 reverse',
          body: [
            '- **sort()**: 요소를 크기순(오름차순)으로 재배열. **리스트 자체를 수정**해요',
            '- **reverse()**: 요소 순서를 **반대로** 뒤집어요',
          ],
          code: `score = [88, 95, 70, 100, 99]
score.sort()
print(score)
score.reverse()
print(score)`,
          output: '[70, 88, 95, 99, 100]\n[100, 99, 95, 88, 70]',
          tip: '`score.sort(reverse=True)`로 한 번에 내림차순 정렬도 돼요. 원본은 두고 정렬된 새 리스트가 필요하면 `sorted(score)`를 써요.',
          warn: '`print(score.sort())`는 `None`이 출력돼요. sort는 리스트를 직접 바꿀 뿐 결과를 돌려주지 않아요.',
        },
      ],
      quiz: [
        { type: 'output', code: `score = [88, 95, 70, 100, 99]
print(score[-1])`, answer: '99', explain: '-1은 마지막 요소.' },
        { type: 'output', code: `nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(nums[1:7:2])`, answer: '[1, 3, 5]', explain: '1부터 7 직전까지 2칸씩: 1, 3, 5' },
        { type: 'output', code: `lol = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
print(lol[2][1])`, answer: '7', explain: 'lol[2]는 [6, 7, 8, 9], 그 안의 1번 요소는 7.' },
        { type: 'output', code: `nums = [1, 2, 3, 4]
nums.append(5)
nums.insert(2, 99)
print(nums)`, answer: '[1, 2, 99, 3, 4, 5]', explain: '끝에 5 추가 → 2번 위치에 99 삽입.' },
        { type: 'mc', q: '출력 결과는?', out: true, code: `nums = [1, 2, 3, 4]
nums[2:2] = [90, 91, 92]
print(nums)`, choices: ['`[1, 2, 90, 91, 92, 3, 4]`', '`[1, 2, [90, 91, 92], 4]`', '`[1, 2, 90, 91, 92]`', '`[90, 91, 92, 1, 2, 3, 4]`'], answer: 0, explain: '범위에 대입 → 여러 요소가 한꺼번에 삽입돼요.' },
        { type: 'mc', q: '출력 결과는?', out: true, code: `nums = [1, 2, 3, 4]
nums[2] = [90, 91, 92]
print(nums)`, choices: ['`[1, 2, 90, 91, 92, 3, 4]`', '`[1, 2, [90, 91, 92], 4]`', '`[1, 2, 90, 91, 92]`', '`[90, 91, 92, 1, 2, 3, 4]`'], answer: 1, explain: '인덱스 하나에 대입 → 그 요소(3)가 리스트로 대체돼요.' },
        { type: 'output', code: `score = [88, 95, 70, 100, 99, 80, 78, 50]
score.remove(100)
del(score[2])
score[1:4] = []
print(score)`, answer: '[88, 78, 50]', explain: '100 삭제 → 2번(70) 삭제 → 1~3번(95, 99, 80) 삭제.' },
        { type: 'output', code: `score = [88, 95, 70, 100, 99, 80, 78, 50]
print(score.index(100))`, answer: '3', explain: '100은 0, 1, 2, 3 → 3번 위치.' },
        { type: 'output', code: `score = [88, 95, 70, 100, 99]
score.sort()
score.reverse()
print(score)`, answer: '[100, 99, 95, 88, 70]', explain: '오름차순 정렬 후 뒤집으면 내림차순.' },
        { type: 'match', pairs: [['`append`', '끝에 추가'], ['`insert`', '지정한 위치에 삽입'], ['`remove`', '값을 찾아 삭제'], ['`clear`', '모든 요소 삭제']], explain: '리스트 메서드 기본 4종.' },
        { type: 'mc', q: '`del score[2]`의 의미는?', choices: ['인덱스 2의 요소를 삭제', '값이 2인 요소를 삭제', '앞에서 2개를 삭제', '리스트 전체를 삭제'], answer: 0, explain: 'del은 순서값(인덱스)으로, remove는 값으로 삭제해요.' },
        { type: 'output', code: `print(max([3, 9, 2]))`, answer: '9', explain: '최댓값 9.' },
        { type: 'output', code: `print(5 in [1, 2, 3])`, answer: 'False', explain: '5는 리스트에 없어요.' },
        { type: 'output', code: `nums = [1, 2, 3]
nums.append([4, 5])
print(len(nums))`, answer: '4', explain: '[4, 5]가 통째로 요소 하나로 들어가요 → [1, 2, 3, [4, 5]]' },
        { type: 'output', code: `score = [88, 95, 70, 100, 99]
sum = 0
for s in score:
    sum += s
print(sum)`, answer: '452', explain: '88 + 95 + 70 + 100 + 99 = 452' },
        { type: 'ox', q: '`sort()`는 원래 리스트는 그대로 두고 정렬된 새 리스트를 돌려준다.', answer: false, explain: 'sort는 리스트 자체를 수정하고 None을 돌려줘요. 새 리스트가 필요하면 sorted().' },
        { type: 'blank', q: '리스트 끝에 6을 추가하세요.', code: `nums = [1, 2, 3]
nums.___(6)
print(nums)`, options: ['append', 'insert', 'add', 'push'], answer: ['append'], explain: '끝에 추가는 append. (add는 집합의 메서드예요.)' },
        { type: 'output', code: `nums = [10, 20, 30, 40]
nums.clear()
print(nums)`, answer: '[]', explain: 'clear는 모든 요소를 지워 빈 리스트로 만들어요.' },
        { type: 'mc', q: '`score.count(100)`이 돌려주는 것은?', choices: ['100이 리스트에 몇 개 있는지', '100의 위치', '리스트의 길이', '100보다 큰 요소의 수'], answer: 0, explain: 'count는 특정 요소값의 개수를 조사해요.' },
      ],
      summary: [
        '리스트 `[ ]`: 여러 값을 집합적으로 저장 · 각 값 = **요소** · 주로 같은 타입',
        '`리스트[i]` 0부터, 음수는 뒤에서 · 슬라이스 `[begin:end:step]` end 미포함',
        '**이중 리스트** `lol[2][1]` · 전부 순회하려면 이중 루프',
        '`append(값)` 끝에 추가 · `insert(위치, 값)` 중간에 삽입',
        '`nums[2:2] = [...]` **삽입** vs `nums[2] = [...]` 요소가 리스트로 **대체**',
        '`remove(값)` 값으로 삭제 · `del 리스트[i]` 위치로 삭제 · `clear()` 전부 · `리스트[범위] = []` 범위 삭제',
        '`index(값)` 위치 · `count(값)` 개수 · `min`/`max` · `in`/`not in`',
        '`sort()` 오름차순, **리스트 자체 수정** · `reverse()` 순서 반대로',
      ],
      traps: ['remove는 값, del은 위치', '`nums[2] = [...]`는 삽입이 아니라 대체 (중첩 리스트)', '`append([4, 5])`는 요소 1개 추가', '`sort()`의 반환값은 None'],
    },

    /* ───────────────────────── 10. 튜플 ───────────────────────── */
    {
      id: 's10', num: '10',
      title: '튜플',
      sub: '불변 자료 집합 · 콤마 규칙 · 연결과 반복 · 언패킹 · 여러 값 반환',
      goal: '튜플과 리스트의 차이를 알고, 언패킹과 여러 값 반환을 쓸 수 있다',
      lessons: [
        {
          title: '튜플: 바꿀 수 없는 자료 집합',
          body: [
            '**튜플**은 리스트처럼 여러 값을 모으지만, **초기화한 후에는 편집할 수 없다**는 점이 리스트와 달라요 (불변 자료 집합).',
            '',
            '- **소괄호 `( )`**를 사용해 정의',
            '- print로 출력하면 **소괄호와 함께** 출력돼서 리스트가 아님을 나타내요',
          ],
          code: `score = (88, 95, 70, 100, 99)
sum = 0
for s in score:
    sum += s
print("총점 : ", sum)
print("평균 : ", sum / len(score))
print(score)`,
          output: '총점 :  452\n평균 :  90.4\n(88, 95, 70, 100, 99)',
        },
        {
          title: '튜플 정의의 규칙',
          body: [
            '- 정의할 때 **소괄호 없이 값만 나열해도** 튜플이 돼요: `tu = 1, 2, 3`',
            '- **요소가 하나뿐**이면 값 다음에 **콤마**를 꼭 찍어야 튜플이에요: `(5,)`',
            '- `(5)`는 그냥 괄호로 감싼 숫자 5예요',
          ],
          code: `tu = 1, 2, 3
print(tu)
one = (5,)
not_tuple = (5)
print(type(one), type(not_tuple))`,
          output: "(1, 2, 3)\n<class 'tuple'> <class 'int'>",
        },
        {
          title: '튜플로 가능한 일 / 불가능한 일',
          body: '읽기, 슬라이스, `+`(연결), `*`(반복)는 **가능**해요. 하지만 요소를 **변경하거나 삭제할 수는 없어요**.',
          code: `tu = 1, 2, 3, 4, 5
print(tu[3])
print(tu[1:4])
print(tu + (6, 7))
print(tu * 2)
tu[1] = 100   # 불가능!`,
          output: "4\n(2, 3, 4)\n(1, 2, 3, 4, 5, 6, 7)\n(1, 2, 3, 4, 5, 1, 2, 3, 4, 5)\nTypeError: 'tuple' object does not support item assignment",
          noRun: true,
          warn: '`tu[1] = 100`, `del tu[1]` 모두 에러예요. 튜플은 한 번 만들면 끝!',
        },
        {
          title: '언패킹: 여러 변수에 한꺼번에 대입',
          body: '**좌변에 변수 목록, 우변에 튜플**을 두면 여러 변수에 값을 한꺼번에 대입할 수 있어요. 개수가 맞아야 해요.',
          code: `tu = "이순신", "김유신", "강감찬"
lee, kim, kang = tu
print(lee)
print(kim)
print(kang)`,
          output: '이순신\n김유신\n강감찬',
          tip: '`a, b = b, a` 한 줄이면 두 변수의 값을 맞바꿀 수 있어요. 오른쪽이 튜플로 묶였다가 풀리는 원리예요.',
        },
        {
          title: '두 개 이상의 값 반환하기',
          body: '함수는 원래 값 하나를 돌려주지만, **튜플**을 쓰면 여러 값을 한 번에 돌려줄 수 있어요. `return a, b`라고 쓰면 `(a, b)` 튜플이 반환돼요.',
          code: `import time

def gettime():
    now = time.localtime()
    return now.tm_hour, now.tm_min

result = gettime()
print("지금은 %d시 %d분입니다" % (result[0], result[1]))`,
          output: '지금은 5시 26분입니다',
          noRun: true,
          after: '`"%d시 %d분" % (값1, 값2)`는 **문자열 포맷팅**이에요. `%d` 자리에 정수가, `%s` 자리에 문자열이 차례대로 들어가요. 실행 시각에 따라 결과가 달라요.',
        },
      ],
      quiz: [
        { type: 'ox', q: '튜플은 초기화한 뒤에도 요소를 변경할 수 있다.', answer: false, explain: '튜플은 불변이에요. 변경·삭제는 에러.' },
        { type: 'output', code: `tu = 1, 2, 3, 4, 5
print(tu[3])`, answer: '4', explain: '0, 1, 2, 3 → 3번 요소는 4.' },
        { type: 'output', code: `tu = 1, 2, 3, 4, 5
print(tu[1:4])`, answer: '(2, 3, 4)', explain: '슬라이스 결과도 튜플이라 소괄호로 출력돼요.' },
        { type: 'output', code: `tu = 1, 2, 3, 4, 5
print(tu + (6, 7))`, answer: '(1, 2, 3, 4, 5, 6, 7)', explain: '+로 연결한 새 튜플이 만들어져요.' },
        { type: 'mc', q: '`tu = (1, 2, 3)`일 때 `tu[1] = 100`을 실행하면?', choices: ['`(1, 100, 3)`이 된다', '에러(TypeError)가 난다', '`(100, 2, 3)`이 된다', '아무 변화 없이 넘어간다'], answer: 1, explain: "TypeError: 'tuple' object does not support item assignment" },
        { type: 'mc', q: '요소가 1개인 튜플을 바르게 만든 것은?', choices: ['`(5,)`', '`(5)`', '`[5]`', '`{5}`'], answer: 0, explain: '요소가 하나면 콤마 필수. `(5)`는 그냥 숫자 5.' },
        { type: 'output', code: `one = (5)
print(one * 2)`, answer: '10', explain: '`(5)`는 튜플이 아니라 숫자 5라서 5 × 2 = 10.' },
        { type: 'output', code: `tu = "이순신", "김유신", "강감찬"
lee, kim, kang = tu
print(kim)`, answer: '김유신', explain: '언패킹으로 두 번째 값이 kim에 들어가요.' },
        { type: 'output', code: `a, b = 1, 2
a, b = b, a
print(a, b)`, answer: '2 1', explain: '오른쪽 (2, 1) 튜플이 a, b로 풀려서 값이 맞바뀌어요.' },
        { type: 'output', code: `print("%d시 %d분" % (5, 26))`, answer: '5시 26분', explain: '%d 자리에 5와 26이 차례대로 들어가요.' },
        { type: 'mc', q: '리스트와 튜플의 차이로 옳은 것은?', choices: ['튜플은 초기화 후 편집할 수 없다', '튜플은 인덱스로 읽을 수 없다', '리스트는 소괄호로 정의한다', '튜플은 + 연산을 할 수 없다'], answer: 0, explain: '튜플도 인덱싱·슬라이스·+·*는 돼요. 편집만 안 돼요.' },
        { type: 'output', code: `tu = (1, 2)
print(tu * 2)`, answer: '(1, 2, 1, 2)', explain: '* 는 반복이에요.' },
        { type: 'output', code: `def f():
    return 3, 4

r = f()
print(r)`, answer: '(3, 4)', explain: 'return 3, 4는 튜플 (3, 4)를 돌려줘요.' },
        { type: 'output', code: `tu = 10, 20, 30
print(tu)`, answer: '(10, 20, 30)', explain: '괄호 없이 나열해도 튜플이고, 출력은 소괄호와 함께.' },
        { type: 'ox', q: '`del tu[1]`로 튜플의 요소를 삭제할 수 있다.', answer: false, explain: '튜플 요소의 삭제도 불가능해요.' },
        { type: 'output', code: `def minmax(a, b):
    return min(a, b), max(a, b)

lo, hi = minmax(7, 3)
print(lo, hi)`, answer: '3 7', explain: '두 값을 튜플로 돌려받아 lo, hi로 언패킹.' },
      ],
      summary: [
        '**튜플**: 초기화 후 **편집 불가** (불변) · **소괄호**로 정의 · print 시 소괄호와 함께 출력',
        '소괄호 없이 `tu = 1, 2, 3`도 튜플 · 요소 하나면 `(5,)` 콤마 필수 (`(5)`는 정수)',
        '가능: 인덱싱, 슬라이스, `+` 연결, `*` 반복 · 불가: `tu[1] = 100`, `del tu[1]` → TypeError',
        '**언패킹**: `lee, kim, kang = tu` (좌변 변수 목록 ← 우변 튜플)',
        '`return a, b` → 두 개 이상의 값을 튜플로 반환',
        '포맷팅 `"%d시 %d분" % (5, 26)`: `%d` 정수, `%s` 문자열',
      ],
      traps: ['`(5)`는 튜플이 아님', '튜플 요소 변경·삭제는 에러', '`a, b = b, a`로 값 교환'],
    },

    /* ───────────────────────── 11. 사전과 집합 ───────────────────────── */
    {
      id: 's11', num: '11',
      title: '사전과 집합',
      sub: '키:값 · get · 수정/추가/삭제 · keys/values/items · set · 집합 연산',
      goal: '사전으로 값을 찾고 편집하며, 집합 연산의 결과를 구할 수 있다',
      lessons: [
        {
          title: '사전(Dictionary)',
          body: [
            '**사전**은 **키(key)와 값(value)의 쌍**을 저장하는 대용량 자료구조예요. 진짜 사전에서 단어(키)로 뜻(값)을 찾는 것과 같아요.',
            '',
            '중괄호 `{ }` 안에 `키:값` 형태로, 콤마로 구분해서 나열해요.',
          ],
          code: `dic = {'boy':'소년', 'school':'학교', 'book':'책'}
print(dic)`,
          output: "{'boy': '소년', 'school': '학교', 'book': '책'}",
          tip: '수업 자료의 실행결과는 순서가 섞여 있지만(옛날 파이썬), 파이썬 3.7부터는 **넣은 순서대로** 출력돼요.',
        },
        {
          title: '키로 빠르게 검색하기',
          body: [
            '`사전[키]`로 값을 바로 찾아요. 아주 빨라요.',
            '',
            '단, **찾는 키가 없으면 예외(KeyError)**가 발생해요. 그럴 땐 예외 처리 구문을 쓰거나 **get 메서드**를 써요.',
            '- `dic.get(키)` → 없으면 에러 대신 **None**',
            '- `dic.get(키, 기본값)` → 없으면 **기본값**',
          ],
          code: `dic = {'boy':'소년', 'school':'학교', 'book':'책'}
print(dic['boy'])
print(dic['book'])
print(dic.get('student'))
print(dic.get('student', '사전에 없는 단어입니다.'))`,
          output: '소년\n책\nNone\n사전에 없는 단어입니다.',
        },
        {
          title: '사전 관리: 수정, 추가, 삭제',
          body: [
            '사전은 실행 중에 삽입, 삭제, 수정 등 **편집이 가능**해요.',
            '',
            '`사전[키] = 값`은 **키의 존재 여부에 따라 동작이 달라요**.',
            '- 키가 **있으면** → 기존 값을 **변경**',
            '- 키가 **없으면** → 키를 **추가**',
            '',
            '`del 사전[키]`는 해당 키를 찾아 **값과 함께 삭제**해요.',
          ],
          code: `dic = {'boy':'소년', 'school':'학교', 'book':'책'}
dic['boy'] = '남자애'
dic['girl'] = '소녀'
del dic['book']
print(dic)`,
          output: "{'boy': '남자애', 'school': '학교', 'girl': '소녀'}",
          trace: true,
        },
        {
          title: 'keys, values, items',
          body: [
            '- `keys()` : 사전의 **키만** 모은 목록',
            '- `values()` : **값만** 모은 목록',
            '- `items()` : (키, 값) **둘 다** 쌍으로 모은 목록',
          ],
          code: `dic = {'boy':'소년', 'school':'학교', 'book':'책'}
print(dic.keys())
print(dic.values())
print(dic.items())
for k, v in dic.items():
    print(k, '=', v)`,
          output: "dict_keys(['boy', 'school', 'book'])\ndict_values(['소년', '학교', '책'])\ndict_items([('boy', '소년'), ('school', '학교'), ('book', '책')])\nboy = 소년\nschool = 학교\nbook = 책",
        },
        {
          title: '집합(set)',
          body: [
            '**집합**은 여러 가지 값의 모임이에요. 수학의 집합처럼 **중복을 허용하지 않고 순서가 없어요**.',
            '',
            '중괄호 `{ }` 안에 값만 나열해요 (사전은 `키:값`, 집합은 `값`).',
          ],
          code: `asia = {'korea', 'china', 'japan', 'korea'}
print(len(asia))
print('korea' in asia)`,
          output: '3\nTrue',
          after: "`print(asia)`를 하면 `{'korea', 'china', 'japan'}`처럼 중복된 korea가 하나만 남아요. 집합은 순서가 없어서 출력 순서는 실행할 때마다 달라질 수 있어요.",
        },
        {
          title: 'set() 함수',
          body: [
            '`set()` 함수는 **빈 집합**을 만들거나, 다른 컬렉션을 **집합형으로 변환**해요.',
            '',
            '- 문자열 → 글자들의 집합 (중복 제거)',
            '- 리스트, 튜플 → 요소들의 집합',
            '- 사전 → **키**들의 집합',
            '- 인수 없이 `set()` → **공집합**',
          ],
          code: `print(sorted(set("sanghyung")))
print(sorted(set([12, 34, 56, 78])))
print(set({'boy':'소년', 'book':'책'}) == {'boy', 'book'})
print(set())`,
          output: "['a', 'g', 'h', 'n', 's', 'u', 'y']\n[12, 34, 56, 78]\nTrue\nset()",
          after: '여기선 출력 순서를 고정하려고 `sorted()`로 정렬해서 보여줬어요.',
          warn: '빈 중괄호 `{}`는 **빈 사전**이에요! 빈 집합은 반드시 `set()`으로 만들어요.',
        },
        {
          title: 'add와 update',
          body: [
            '- **add(값)**: 집합에 원소 하나 추가',
            '- **update(다른 집합)**: 집합끼리 결합해서 **합집합** 만들기',
            '',
            '어느 쪽이든 **중복은 허용되지 않아요**. 이미 있는 값은 하나만 남아요.',
          ],
          code: `s = {1, 2}
s.add(2)
s.add(3)
print(s)
s.update({3, 4, 5})
print(s)`,
          output: '{1, 2, 3}\n{1, 2, 3, 4, 5}',
        },
        {
          title: '집합 연산',
          table: [
            ['연산', '기호', '메서드', '설명'],
            ['합집합', '`|`', '`union`', '두 집합의 모든 원소'],
            ['교집합', '`&`', '`intersection`', '두 집합 모두에 있는 원소'],
            ['차집합', '`-`', '`difference`', '왼쪽 집합의 원소 중 오른쪽 집합의 원소를 뺀 것'],
            ['배타적 차집합', '`^`', '`symmetric_difference`', '한쪽 집합에만 있는 원소의 합'],
            ['부분집합', '`<=`', '`issubset`', '왼쪽이 오른쪽의 부분집합인지 조사'],
            ['진성 부분집합', '`<`', '', '부분집합이면서 오른쪽에 원소가 더 있음'],
            ['포함집합', '`>=`', '`issuperset`', '왼쪽이 오른쪽 집합을 포함하는지 조사'],
            ['진성 포함집합', '`>`', '', '포함집합이면서 왼쪽에 원소가 더 있음'],
          ],
          code: `twox = {2, 4, 6, 8, 10, 12}
threex = {3, 6, 9, 12, 15}
print("교집합", sorted(twox & threex))
print("합집합", sorted(twox | threex))
print("차집합", sorted(twox - threex))
print("차집합", sorted(threex - twox))
print("배타적 차집합", sorted(twox ^ threex))`,
          output: '교집합 [6, 12]\n합집합 [2, 3, 4, 6, 8, 9, 10, 12, 15]\n차집합 [2, 4, 8, 10]\n차집합 [3, 9, 15]\n배타적 차집합 [2, 3, 4, 8, 9, 10, 15]',
          after: '수업 예제는 `sorted` 없이 집합을 그대로 출력해서 `{12, 6}`처럼 순서가 뒤섞여 보여요. 집합은 순서가 없으니 원소만 같으면 같은 결과예요.',
        },
      ],
      quiz: [
        { type: 'output', code: `dic = {'boy':'소년', 'school':'학교', 'book':'책'}
print(dic['boy'])`, answer: '소년', explain: '키 boy의 값.' },
        { type: 'mc', q: "`dic = {'boy':'소년'}`에서 `dic['student']`를 실행하면?", choices: ['`None`', '에러(KeyError)가 난다', '빈 문자열', '`student`'], answer: 1, explain: '없는 키를 [ ]로 찾으면 예외. get을 쓰면 None.' },
        { type: 'output', code: `dic = {'boy':'소년', 'school':'학교', 'book':'책'}
print(dic.get('student'))`, answer: 'None', explain: 'get은 키가 없으면 None을 돌려줘요.' },
        { type: 'output', code: `dic = {'boy':'소년', 'school':'학교', 'book':'책'}
print(dic.get('student', '없음'))`, answer: '없음', explain: '두 번째 인수가 기본값이에요.' },
        { type: 'mc', q: '출력 결과는?', out: true, code: `dic = {'boy':'소년', 'school':'학교', 'book':'책'}
dic['boy'] = '남자애'
dic['girl'] = '소녀'
del dic['book']
print(dic)`, choices: ["`{'boy': '남자애', 'school': '학교', 'girl': '소녀'}`", "`{'boy': '소년', 'school': '학교', 'book': '책', 'girl': '소녀'}`", "`{'boy': '남자애', 'school': '학교', 'book': '책'}`", '에러가 난다'], answer: 0, explain: 'boy는 있던 키라 수정, girl은 없던 키라 추가, book은 삭제.' },
        { type: 'mc', q: '`dic.keys()`가 돌려주는 것은?', choices: ['키만 모은 목록', '값만 모은 목록', '(키, 값) 쌍 목록', '사전의 길이'], answer: 0, explain: 'keys 키, values 값, items 쌍.' },
        { type: 'output', code: `print(len({'korea', 'china', 'japan', 'korea'}))`, answer: '3', explain: '집합은 중복을 허용하지 않아 korea가 하나만 남아요.' },
        { type: 'mc', q: '빈 집합을 만드는 올바른 방법은?', choices: ['`set()`', '`{}`', '`[]`', '`()`'], answer: 0, explain: '`{}`는 빈 사전이에요.' },
        { type: 'mc', q: '`twox = {2, 4, 6, 8, 10, 12}`, `threex = {3, 6, 9, 12, 15}`일 때 `twox & threex`는?', choices: ['`{6, 12}`', '`{2, 4, 8, 10}`', '`{3, 9, 15}`', '`{2, 3, 4, 6, 8, 9, 10, 12, 15}`'], answer: 0, explain: '& 는 교집합: 둘 다 있는 6, 12.' },
        { type: 'mc', q: '같은 조건에서 `twox - threex`는?', choices: ['`{2, 4, 8, 10}`', '`{3, 9, 15}`', '`{6, 12}`', '`{2, 3, 4, 8, 9, 10, 15}`'], answer: 0, explain: '차집합: twox에서 threex에 있는 6, 12를 뺀 것.' },
        { type: 'match', pairs: [['`|`', '합집합'], ['`&`', '교집합'], ['`-`', '차집합'], ['`^`', '배타적 차집합']], explain: '기호와 연산 이름을 짝지어 외워 두세요.' },
        { type: 'output', code: `print({1, 2} <= {1, 2, 3})`, answer: 'True', explain: '{1, 2}는 {1, 2, 3}의 부분집합.' },
        { type: 'output', code: `s = {1, 2}
s.add(2)
s.add(3)
print(len(s))`, answer: '3', explain: '2는 이미 있어서 무시, 3만 추가 → {1, 2, 3}' },
        { type: 'ox', q: '집합은 중복된 원소를 허용하지 않는다.', answer: true, explain: '같은 값은 하나만 남아요.' },
        { type: 'mc', q: "`set({'boy':'소년', 'book':'책'})`의 결과는?", choices: ["키만 모은 집합 `{'boy', 'book'}`", "값만 모은 집합 `{'소년', '책'}`", '(키, 값) 튜플의 집합', '에러'], answer: 0, explain: '사전을 집합으로 바꾸면 키만 남아요.' },
        { type: 'output', code: `dic = {'a': 1}
dic['a'] = 5
dic['b'] = 7
print(dic)`, answer: "{'a': 5, 'b': 7}", explain: 'a는 수정, b는 추가.' },
        { type: 'blank', q: '사전에 없는 키도 에러 없이 찾도록 빈칸을 채우세요.', code: `dic = {'boy':'소년'}
print(dic.___('girl', '없는 단어'))`, options: ['get', 'find', 'index', 'keys'], answer: ['get'], explain: 'get(키, 기본값).' },
        { type: 'output', code: `print({1, 2, 3} > {1, 2})`, answer: 'True', explain: '왼쪽이 오른쪽을 포함하면서 원소가 더 있으니 진성 포함집합.' },
        { type: 'mc', q: '`issubset` 메서드와 같은 기호는?', choices: ['`<=`', '`>=`', '`&`', '`^`'], answer: 0, explain: '부분집합 <=, 포함집합 >=.' },
        { type: 'mc', q: '출력 결과는?', out: true, code: `dic = {'boy':'소년', 'school':'학교'}
print(list(dic.values()))`, choices: ["`['소년', '학교']`", "`['boy', 'school']`", "`[('boy', '소년'), ('school', '학교')]`", "`{'소년', '학교'}`"], answer: 0, explain: 'values()는 값만 모은 목록이에요.' },
        { type: 'output', code: `dic = {'a': 1, 'b': 2}
for k, v in dic.items():
    print(k, v)`, answer: 'a 1\nb 2', explain: 'items()는 (키, 값) 쌍을 돌려줘서 k, v로 나눠 받을 수 있어요.' },
        { type: 'output', code: `s = {1, 2}
s.update({2, 3, 4})
print(len(s))`, answer: '4', explain: 'update는 합집합. 중복 2는 하나만 남아 {1, 2, 3, 4}.' },
        { type: 'output', code: `print({1, 2} < {1, 2})`, answer: 'False', explain: '진성 부분집합(<)은 "부분집합이면서 오른쪽에 원소가 더 있어야" 해요. 같은 집합이면 False. (<= 이었다면 True)' },
        { type: 'output', code: `print({1, 2, 3}.issuperset({1, 2}))`, answer: 'True', explain: 'issuperset = 포함집합(>=). 왼쪽이 오른쪽을 포함하나요?' },
        { type: 'output', code: `print(sorted({1, 2, 3}.intersection({2, 3, 4})))`, answer: '[2, 3]', explain: 'intersection 메서드는 & 와 같은 교집합. (union은 |, difference는 -)' },
      ],
      summary: [
        '**사전**: `{키:값, ...}` 키와 값의 쌍 · `dic[키]`로 빠른 검색 · 없는 키는 **KeyError**',
        '`get(키)` 없으면 None · `get(키, 기본값)` 없으면 기본값',
        '`dic[키] = 값`: 키가 있으면 **수정**, 없으면 **추가** · `del dic[키]` 삭제',
        '`keys()` 키 · `values()` 값 · `items()` (키, 값) 쌍',
        '**집합**: 값의 모임, **중복 X, 순서 X** · `set()` 빈 집합/변환 (사전 → 키) · `{}`는 빈 **사전**',
        '`add` 원소 추가 · `update` 집합 결합(합집합)',
        '`|` 합집합 · `&` 교집합 · `-` 차집합 · `^` 배타적 차집합 · `<=` 부분집합 · `<` 진성 부분집합 · `>=` 포함집합 · `>` 진성 포함집합',
      ],
      traps: ['없는 키: `[]`는 에러, `get`은 None', '`{}`는 빈 사전 (빈 집합은 `set()`)', '집합의 출력 순서는 정해져 있지 않음', '`A - B`와 `B - A`는 다름'],
    },

    /* ───────────────────────── 12. 컬렉션 관리 ───────────────────────── */
    {
      id: 's12', num: '12',
      title: '컬렉션 관리',
      sub: 'zip · filter · map · lambda · 대입과 사본 · copy · deepcopy · is',
      goal: 'zip/filter/map/lambda로 컬렉션을 다루고, 대입과 복사의 차이를 설명할 수 있다',
      lessons: [
        {
          title: 'zip: 여러 컬렉션 짝짓기',
          body: [
            '`zip`은 여러 개의 컬렉션을 합쳐 하나로 만들어요. 두 리스트의 **대응되는 요소끼리 짝지어 튜플**을 만들어요.',
            '',
            '- 합쳐지는 두 리스트의 **길이는 달라도 돼요**. 이때 **짧은 쪽에 맞춰** 끝나요',
            '- 생성되는 튜플의 순서는 **원본 리스트의 순서와 같아요**',
          ],
          code: `yoil = ["월", "화", "수", "목", "금", "토", "일"]
food = ["갈비탕", "순대국", "칼국수", "삼겹살"]
menu = zip(yoil, food)
for y, f in menu:
    print("%s요일 메뉴 : %s" % (y, f))`,
          output: '월요일 메뉴 : 갈비탕\n화요일 메뉴 : 순대국\n수요일 메뉴 : 칼국수\n목요일 메뉴 : 삼겹살',
        },
        {
          title: 'filter: 조건에 맞는 것만 골라내기',
          body: [
            '`filter(조건함수, 리스트)`는 리스트 요소 중 **조건에 맞는 것만** 골라내요.',
            '',
            '- 첫 번째 인수: 조건을 지정하는 함수 (True/False를 돌려줌)',
            '- 두 번째 인수: 대상 리스트',
          ],
          code: `def flunk(s):
    return s < 60

score = [45, 89, 72, 53, 94]
for s in filter(flunk, score):
    print(s)`,
          output: '45\n53',
        },
        {
          title: 'map: 모든 요소를 변환하기',
          body: [
            '`map(변환함수, 리스트)`는 **모든 요소**에 변환 함수를 호출해서 **새 요소값**으로 이루어진 결과를 만들어요. 인수 구조는 filter와 같아요.',
            '',
            '아래의 `half`는 직접 정의한 함수로, 인수로 받은 s를 절반으로 나누어 리턴해요.',
          ],
          code: `def half(s):
    return s / 2

score = [45, 89, 72, 53, 94]
for s in map(half, score):
    print(s, end=", ")`,
          output: '22.5, 44.5, 36.0, 26.5, 47.0, ',
          tip: 'filter와 map의 결과를 한 번에 보려면 `list(map(half, score))`처럼 list로 감싸요.',
        },
        {
          title: '람다 함수',
          body: [
            '**람다 함수**는 이름 없이 **입력과 출력만으로** 함수를 정의하는 축약된 방법이에요.',
            '',
            '형식: `lambda 인수: 식`  (예: `lambda x: x + 1` → x를 받아 x + 1을 돌려줌)',
            '',
            '인수는 여러 개 가질 수 있어요: `lambda a, b: a + b`. filter나 map에 잠깐 쓸 함수를 넣을 때 편해요.',
          ],
          code: `score = [45, 89, 72, 53, 94]
for s in filter(lambda x: x < 60, score):
    print(s)
add = lambda a, b: a + b
print(add(3, 4))`,
          output: '45\n53\n7',
          tip: '수업 자료에 `lamda`라고 적힌 곳이 있는데, 올바른 철자는 `lambda`예요.',
        },
        {
          title: '대입은 복사가 아니에요',
          body: [
            '`list2 = list1`은 리스트를 복사하는 게 아니라, **같은 리스트에 이름표를 하나 더** 붙이는 거예요.',
            '',
            '컬렉션은 두 변수가 **같은 리스트를 가리키기** 때문에, list2를 바꾸면 list1도 함께 바뀌어요.',
          ],
          code: `list1 = [1, 2, 3]
list2 = list1

list2[1] = 100
print(list1)
print(list2)`,
          output: '[1, 100, 3]\n[1, 100, 3]',
          trace: true,
        },
        {
          title: 'copy: 독립된 사본 만들기',
          body: '`copy()` 메서드로 두 리스트를 **독립된 사본**으로 만들 수 있어요. `list1[:]`처럼 **전체 범위를 슬라이스**해도 사본이 만들어져요.',
          code: `list1 = [1, 2, 3]
list2 = list1.copy()
list3 = list1[:]

list2[1] = 100
print(list1)
print(list2)
print(list3)`,
          output: '[1, 2, 3]\n[1, 100, 3]\n[1, 2, 3]',
        },
        {
          title: 'deepcopy: 중첩 리스트까지 완전히',
          body: [
            '리스트 안에 리스트가 있으면 `copy()`는 **겉 리스트만** 복사해요(얕은 복사). 안쪽 리스트는 여전히 공유돼요.',
            '',
            '안쪽까지 완전히 독립시키려면 `copy` 모듈의 **`copy.deepcopy()`**를 써요.',
          ],
          code: `import copy

list0 = ["a", "b"]
list1 = [list0, 1, 2]
list2 = list1.copy()
list2[0][1] = "c"
print(list1)

list0 = ["a", "b"]
list1 = [list0, 1, 2]
list3 = copy.deepcopy(list1)
list3[0][1] = "c"
print(list1)
print(list3)`,
          output: "[['a', 'c'], 1, 2]\n[['a', 'b'], 1, 2]\n[['a', 'c'], 1, 2]",
        },
        {
          title: 'is 연산자',
          body: '`is`는 두 변수가 **같은 객체를 가리키는지** 조사해요. 값이 같은지 보는 `==`와 달라요.',
          code: `list1 = [1, 2, 3]
list2 = list1
list3 = list1.copy()

print("1 == 2", list1 is list2)
print("1 == 3", list1 is list3)
print("2 == 3", list2 is list3)
print(list1 == list3)`,
          output: '1 == 2 True\n1 == 3 False\n2 == 3 False\nTrue',
          after: 'list1과 list2는 **대입에 의한 같은 변수**(같은 객체), list3은 **copy에 의한 독립적인 사본**이에요. 값은 같으니 `list1 == list3`은 True지만 `is`는 False예요.',
        },
      ],
      quiz: [
        { type: 'mc', q: 'yoil 리스트에 7개, food 리스트에 4개가 있을 때 `for y, f in zip(yoil, food):`는 몇 번 반복할까요?', choices: ['4번', '7번', '11번', '에러가 난다'], answer: 0, explain: 'zip은 짧은 쪽 길이에 맞춰요.' },
        { type: 'output', code: `print(list(zip([1, 2, 3], ["a", "b"])))`, answer: "[(1, 'a'), (2, 'b')]", explain: '대응되는 요소끼리 튜플로 짝지어요. 3은 짝이 없어 빠져요.' },
        { type: 'output', code: `print(list(filter(lambda x: x < 60, [45, 89, 72, 53, 94])))`, answer: '[45, 53]', explain: '60 미만만 남아요.' },
        { type: 'output', code: `print(list(map(lambda x: x * 2, [1, 2, 3])))`, answer: '[2, 4, 6]', explain: '모든 요소를 2배로 변환.' },
        { type: 'output', code: `def half(s):
    return s / 2

print(list(map(half, [45, 89])))`, answer: '[22.5, 44.5]', explain: '각 요소를 절반으로.' },
        { type: 'mc', q: '`lambda x: x + 1`이 뜻하는 것은?', choices: ['x를 받아 x + 1을 돌려주는 이름 없는 함수', 'x에 1을 저장하는 변수', 'x가 1인지 검사하는 조건', '에러'], answer: 0, explain: 'lambda 인수: 식' },
        { type: 'output', code: `f = lambda a, b: a + b
print(f(3, 4))`, answer: '7', explain: '람다도 인수를 여러 개 가질 수 있어요.' },
        { type: 'output', code: `list1 = [1, 2, 3]
list2 = list1
list2[1] = 100
print(list1)`, answer: '[1, 100, 3]', explain: '대입은 같은 리스트를 가리키게 할 뿐이라 list1도 바뀌어요.' },
        { type: 'output', code: `list1 = [1, 2, 3]
list2 = list1.copy()
list2[1] = 100
print(list1)`, answer: '[1, 2, 3]', explain: 'copy로 만든 독립 사본이라 list1은 그대로.' },
        { type: 'mc', q: '출력 결과는?', out: true, code: `list0 = ["a", "b"]
list1 = [list0, 1, 2]
list2 = list1.copy()
list2[0][1] = "c"
print(list1)`, choices: ["`[['a', 'c'], 1, 2]`", "`[['a', 'b'], 1, 2]`", "`['a', 'c', 1, 2]`", '에러'], answer: 0, explain: 'copy는 얕은 복사라 안쪽 리스트는 공유돼요. 완전히 독립시키려면 deepcopy.' },
        { type: 'output', code: `list1 = [1, 2, 3]
list2 = list1
list3 = list1.copy()
print(list1 is list2, list1 is list3)`, answer: 'True False', explain: 'list2는 같은 객체, list3은 다른 객체.' },
        { type: 'output', code: `a = [1, 2]
b = a[:]
print(a == b, a is b)`, answer: 'True False', explain: '[:]로 만든 사본: 값은 같지만(==) 다른 객체(is).' },
        { type: 'match', pairs: [['`zip`', '여러 컬렉션을 짝지어 묶기'], ['`filter`', '조건에 맞는 요소만 골라내기'], ['`map`', '모든 요소를 변환하기'], ['`lambda`', '이름 없는 한 줄 함수']], explain: '컬렉션 관리 4종 세트.' },
        { type: 'blank', q: 'list1이 바뀌지 않도록 독립된 사본을 만드세요.', code: `list1 = [1, 2, 3]
list2 = list1.___()
list2[0] = 9
print(list1)`, options: ['copy', 'sort', 'clear', 'append'], answer: ['copy'], explain: 'copy() 또는 list1[:]로 사본을 만들어요.' },
        { type: 'ox', q: '`list2 = list1` 후 list2를 수정해도 list1은 바뀌지 않는다.', answer: false, explain: '둘이 같은 리스트를 가리켜서 함께 바뀌어요.' },
        { type: 'mc', q: '중첩 리스트의 안쪽 리스트까지 완전히 독립된 사본을 만드는 함수는?', choices: ['`copy.deepcopy()`', '`list.copy()`', '`list[:]`', '`is`'], answer: 0, explain: 'copy()와 [:]는 얕은 복사예요.' },
        { type: 'output', code: `for s in map(lambda x: x // 10, [45, 89, 72]):
    print(s, end=" ")`, answer: '4 8 7', explain: '각 요소를 10으로 나눈 몫.' },
      ],
      summary: [
        '`zip(a, b)`: 대응 요소끼리 튜플로 짝지음 · 길이가 달라도 됨(짧은 쪽에 맞춤) · 원본 순서 유지',
        '`filter(조건함수, 리스트)`: 조건이 참인 요소만 · `map(변환함수, 리스트)`: 모든 요소 변환',
        '`lambda 인수: 식` 이름 없는 축약 함수 · 인수 여러 개 가능',
        '`list2 = list1`은 **같은 리스트**를 가리킴 → 한쪽을 바꾸면 둘 다 바뀜',
        '`copy()` 또는 `list[:]` → 독립된 사본 (얕은 복사) · 중첩까지는 `copy.deepcopy()`',
        '`is`: 같은 객체인지 · `==`: 값이 같은지',
      ],
      traps: ['zip은 짧은 쪽 길이만큼만', 'copy()는 안쪽 리스트를 공유 (얕은 복사)', '`==`는 True여도 `is`는 False일 수 있음'],
    },
  ],
});
