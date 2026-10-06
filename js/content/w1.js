/* 1강 · 파이썬 기초 (수업 자료 1: 파이썬 개요 · 구조와 데이터 처리 · 연산자 · 조건문 · 반복문)
   code 는 템플릿 리터럴이므로 파이썬의 역슬래시는 \\ 로 두 번 쓴다. */
window.PQ = window.PQ || { worlds: [], traces: {} };
PQ.worlds.push({
  id: 'w1',
  lecture: '1강',
  short: '파이썬 기초',
  title: '파이썬 기초 마을',
  desc: '개요 · 입출력 · 변수 · 문자열 · 연산자 · 조건문 · 반복문',
  bossTitle: '1강 보스: 들여쓰기 골렘',
  stages: [
    /* ───────────────────────── 0. 프롤로그 ───────────────────────── */
    {
      id: 's00', num: '0', tutorial: true,
      title: '프롤로그: 코딩이 처음이라면',
      sub: '프로그램이란? · 코드 읽는 법 · 문제 푸는 법',
      goal: '코드를 위에서 아래로 읽고, `print`가 무엇을 출력하는지 예측할 수 있다',
      lessons: [
        {
          title: '프로그램이 뭐예요?',
          body: [
            '컴퓨터는 아주 성실하지만 스스로 생각하지는 못하는 로봇이에요. **시키는 일만, 시킨 순서대로** 정확하게 해요.',
            '',
            '- **프로그램**: 컴퓨터에게 시킬 일을 순서대로 적어 둔 명령 목록',
            '- **코딩(프로그래밍)**: 그 명령을 적는 일',
            '- **프로그래밍 언어**: 명령을 적을 때 쓰는 약속된 말. 우리가 배울 언어는 **파이썬(Python)**이에요.',
            '',
            '라면 끓이는 법을 떠올려 보세요. "물을 끓인다 → 면을 넣는다 → 3분 기다린다"처럼 순서대로 적힌 지시문이 바로 프로그램이에요.',
          ],
          tip: '파이썬은 영어 문장처럼 읽혀서, 처음 프로그래밍을 배우는 사람에게 가장 많이 추천되는 언어 중 하나예요.',
        },
        {
          title: '코드는 위에서 아래로 한 줄씩',
          body: [
            '아래 코드는 두 줄짜리 프로그램이에요. 컴퓨터는 **첫 줄부터 차례대로** 실행해요.',
            '',
            '`print( )`는 괄호 안의 내용을 화면에 보여 주라는 명령이에요. 이렇게 화면에 나타난 결과를 **출력**이라고 불러요.',
          ],
          code: `print("안녕하세요")
print("파이썬 퀘스트에 온 걸 환영해요!")`,
          output: '안녕하세요\n파이썬 퀘스트에 온 걸 환영해요!',
          trace: true,
          after: '코드 상자 오른쪽 위의 **▶ 실행**을 눌러 결과를 보고, **한 줄씩 실행**을 눌러 컴퓨터가 어떤 순서로 읽는지도 확인해 보세요.',
        },
        {
          title: '따옴표가 있을 때와 없을 때',
          body: [
            '따옴표(`"`) 안에 쓴 것은 **글자 그대로** 출력돼요.',
            '따옴표가 없으면 파이썬이 **계산한 결과**를 출력해요. 따옴표 자체는 출력되지 않아요.',
          ],
          code: `print("1 + 2")
print(1 + 2)`,
          output: '1 + 2\n3',
          check: { q: '`print(10 * 2)`의 출력은? (`*`는 곱하기)', choices: ['`10 * 2`', '`20`', '`102`'], answer: 1, explain: '따옴표가 없으니 계산한 결과 20이 출력돼요.' },
        },
        {
          title: '문제는 이렇게 풀어요',
          body: '배우기가 끝나면 문제가 나와요. 문제 유형은 6가지예요.',
          table: [
            ['유형', '하는 일'],
            ['객관식', '보기 중 정답 하나 고르기 (숫자키 1~4)'],
            ['O / X', '맞으면 O, 틀리면 X'],
            ['출력 예측', '코드를 보고 화면에 나올 결과를 직접 입력'],
            ['빈칸 채우기', '아래 조각을 눌러 코드의 빈칸 채우기'],
            ['코드 순서 맞추기', '섞인 줄을 올바른 순서대로 눌러 쌓기'],
            ['짝 맞추기', '왼쪽 항목을 누르고 짝이 되는 오른쪽 항목 누르기'],
          ],
          tip: '출력 예측 문제는 띄어쓰기가 여러 칸이어도 한 칸으로 봐 줘요. 대신 대소문자와 기호는 정확해야 해요. 막히면 **힌트**(출력이 몇 줄인지)나 **정답 보기**를 눌러도 괜찮아요.',
        },
      ],
      quiz: [
        { type: 'mc', q: '`print("1 + 2")`를 실행하면 화면에 무엇이 나올까요?', choices: ['`3`', '`1 + 2`', '`"1 + 2"`', '아무것도 안 나온다'], answer: 1, explain: '따옴표 안은 글자 그대로 출력돼요. 따옴표 자체는 출력되지 않아요.' },
        { type: 'ox', q: '컴퓨터는 코드를 위에서 아래로 한 줄씩 차례대로 실행한다.', answer: true, explain: '맞아요. 순서가 바뀌면 결과도 바뀌어요.' },
        { type: 'output', code: `print(3 + 4)`, answer: '7', explain: '따옴표가 없으니 3 + 4를 계산한 7이 출력돼요.' },
        { type: 'output', code: `print("2 * 3")`, answer: '2 * 3', explain: '따옴표 안은 계산하지 않고 글자 그대로 출력해요.' },
        { type: 'blank', q: '화면에 Hello를 출력하려면 빈칸에 무엇을 써야 할까요?', code: `___("Hello")`, options: ['print', 'show', 'input', 'say'], answer: ['print'], explain: '화면에 출력하는 명령은 `print`예요.' },
        { type: 'order', q: '"하나 → 둘 → 셋" 순서로 출력되도록 줄을 쌓으세요.', lines: ['print("하나")', 'print("둘")', 'print("셋")'], explain: '코드는 위에서 아래로 실행되니까 출력하고 싶은 순서대로 쓰면 돼요.' },
        { type: 'match', pairs: [['프로그램', '컴퓨터에게 시킬 일을 순서대로 적은 것'], ['코딩', '명령을 작성하는 일'], ['출력', '결과를 화면에 보여 주는 것'], ['파이썬', '우리가 배울 프로그래밍 언어']], explain: '이 네 낱말은 앞으로 계속 나와요.' },
      ],
      summary: [
        '**프로그램** = 컴퓨터에게 시킬 명령을 순서대로 적은 것, **코딩** = 그 명령을 적는 일',
        '코드는 **위에서 아래로 한 줄씩** 실행된다',
        '`print()`는 괄호 안의 내용을 화면에 **출력**한다',
        '따옴표 안은 글자 그대로, 따옴표 밖의 수식은 **계산 결과**가 출력된다',
      ],
      traps: ['`print("1 + 2")`는 3이 아니라 1 + 2를 출력'],
    },

    /* ───────────────────────── 1. 파이썬 개요와 개발환경 ───────────────────────── */
    {
      id: 's01', num: '1',
      title: '파이썬 개요와 개발환경',
      sub: '컴파일 vs 인터프리터 · 파이썬의 특징 · 활용 분야 · Colab · CPU와 GPU',
      goal: '파이썬이 어떤 언어이고 어디서 실행하는지 설명할 수 있다',
      lessons: [
        {
          title: '프로그래밍 언어와 번역',
          body: [
            '**프로그래밍 언어**는 프로그램을 작성하는 도구의 일종이에요.',
            '',
            '그런데 컴퓨터가 진짜로 알아듣는 말은 0과 1로 된 **기계어**뿐이에요. 그래서 우리가 쓴 코드를 기계어로 **번역**하는 과정이 꼭 필요해요.',
            '',
            '번역하는 방식에 따라 프로그래밍 언어는 **컴파일 언어**와 **인터프리터 언어**로 나뉘어요.',
          ],
          tip: '사람의 말(코드) → 번역 → 기계어 → 실행. 이 흐름만 기억하면 다음 카드가 쉬워요.',
        },
        {
          title: '컴파일 언어 vs 인터프리터 언어',
          body: '비유하면 컴파일 언어는 **책 한 권을 통째로 번역해서 출판**하는 것, 인터프리터 언어는 **동시통역사가 한 문장씩 바로바로 통역**하는 것과 같아요.',
          table: [
            ['구분', '컴파일 언어', '인터프리터 언어'],
            ['번역 방식', '**모든 명령을 일괄 번역**한 뒤 실행', '**명령어를 만날 때마다 즉시** 번역하여 실행'],
            ['단계', '코딩 → 컴파일 → 실행 → 디버깅', '한 줄 번역하고 바로 실행'],
            ['장점', '속도가 빠르다', '단순하고 쉽다'],
            ['단점', '구조가 복잡하다', '속도가 느리다'],
            ['예', 'C, C++', '**파이썬**'],
          ],
          after: '**디버깅(debugging)**은 프로그램의 오류(버그)를 찾아 고치는 일이에요. 디버깅이 끝나면 다시 코딩 단계로 돌아가요.',
          warn: '"컴파일 = 일괄 번역, 빠름, 구조 복잡" / "인터프리터 = 즉시 번역, 느림, 단순하고 쉬움". 이 둘을 서로 바꿔 놓은 보기가 자주 나와요.',
        },
        {
          title: '파이썬은 어떤 언어일까?',
          body: [
            '- **1990년 귀도 반 로섬(Guido van Rossum)**이 개발한 프로그래밍 언어',
            '- 초보자가 처음 프로그래밍을 배울 때 **추천되는 언어** 중 하나',
            '- **문법 체계가 매우 쉽게** 구성되어 있는 것이 특징',
            '- **오픈 소스(Open Source)**: 누구나 무료로 쓰고 소스를 볼 수 있어요',
            '- 인터프리터 언어라서 한 줄 쓰고 바로 결과를 확인할 수 있어요',
          ],
          check: { q: '파이썬을 만든 사람은?', choices: ['빌 게이츠', '귀도 반 로섬', '리누스 토르발스', '앨런 튜링'], answer: 1, explain: '1990년 귀도 반 로섬이 개발했어요.' },
        },
        {
          title: '파이썬 활용 분야',
          table: [
            ['분야', '설명'],
            ['GUI 프로그래밍', '윈도우 창처럼 화면을 보며 아이콘 등을 마우스·키보드로 조작하는 프로그램. 파이썬 기본 모듈 **tkinter** 이용'],
            ['웹 프로그래밍', '파이썬은 웹 프로그램을 만들기에 적합한 도구'],
            ['수치 연산 프로그래밍', '**numpy**(Numeric Python)라는 수치 연산 모듈 제공'],
            ['데이터베이스 프로그래밍', '오라클, MySQL 같은 데이터베이스에 접근하는 도구 제공. **피클(pickle)** 모듈로 자료를 변형 없이 그대로 파일에 저장하고 불러오기 가능'],
            ['데이터 분석', '빅데이터 분석에 파이썬을 쓰는 경우가 점차 증가. 분석 결과를 다양한 그래프로 시각화'],
          ],
          after: 'GUI는 **Graphic User Interface**의 줄임말이에요.',
        },
        {
          title: '개발환경: 직접 설치 vs 구글 코랩',
          body: [
            '파이썬을 쓰는 방법은 크게 두 가지예요.',
            '',
            '**① 내 컴퓨터에 설치** · `http://www.python.org`에서 내려받아 설치해요.',
            '',
            '**② 구글 코랩(Colab)** · 설치 없이 바로 써요.',
            '- 구글에서 colab을 검색해 Google Colab 클릭 (주소 `https://colab.research.google.com`)',
            '- 작성한 노트는 **구글 드라이브에 저장**되고 **웹브라우저에서 실행**돼요',
            '- 데이터 분석에 쓰이는 **TensorFlow, Keras, matplotlib, scikit-learn, pandas** 같은 패키지가 **기본으로 설치**되어 있어요',
          ],
          tip: '코랩에서 "새 노트"를 만들고 코드 칸에 `print("Hi, there!")`를 쓴 다음 ▶ 버튼(또는 Shift+Enter)을 누르면 바로 실행돼요.',
        },
        {
          title: 'CPU vs GPU, 그리고 ALU',
          body: [
            '**ALU(Arithmetic Logic Unit, 산술 논리 연산 장치)**는 덧셈·비교 같은 계산을 실제로 하는 부품이에요.',
            '',
            '- **CPU**: ALU가 몇 개뿐이지만 하나하나가 똑똑해서, 복잡한 일을 순서대로 잘 처리해요.',
            '- **GPU**: 단순한 ALU가 **아주 많이** 들어 있어서, 간단한 계산을 **동시에 대량으로** 처리해요. 그래서 인공지능·딥러닝 계산에 유리해요.',
            '',
            '코랩에서는 GPU를 빌려 쓸 수 있어서 AI 실습에 많이 쓰여요.',
          ],
          tip: 'CPU는 천재 수학자 몇 명, GPU는 계산기를 든 학생 수천 명이라고 생각하면 쉬워요.',
        },
      ],
      quiz: [
        { type: 'mc', q: '모든 명령을 **일괄 번역**한 뒤 실행하는 언어는?', choices: ['컴파일 언어', '인터프리터 언어', '기계어', '마크업 언어'], answer: 0, explain: '컴파일 언어는 전체를 한꺼번에 번역(컴파일)한 다음 실행해요. 빠르지만 구조가 복잡해요.' },
        { type: 'mc', q: '인터프리터 언어에 대한 설명으로 옳은 것은?', choices: ['모든 명령을 한꺼번에 번역한다', '명령어를 만날 때마다 즉시 번역하여 실행한다', '속도가 빠른 대신 구조가 복잡하다', '코딩 → 컴파일 → 실행 → 디버깅 단계를 거친다'], answer: 1, explain: '인터프리터 언어는 즉시 번역·실행해요. 나머지 보기는 모두 컴파일 언어의 설명이에요.' },
        { type: 'ox', q: '일반적으로 컴파일 언어는 인터프리터 언어보다 실행 속도가 느리다.', answer: false, explain: '반대예요. 컴파일 언어가 빠르고, 인터프리터 언어는 느리지만 단순하고 쉬워요.' },
        { type: 'order', text: true, q: '컴파일 언어의 개발 단계를 순서대로 쌓으세요.', lines: ['코딩', '컴파일', '실행', '디버깅'], explain: '코드 작성(코딩) → 기계어로 번역(컴파일) → 실행 → 오류 수정(디버깅) 순서예요.' },
        { type: 'mc', q: '파이썬에 대한 설명으로 **틀린** 것은?', choices: ['1990년 귀도 반 로섬이 개발했다', '문법 체계가 쉬워 초보자에게 추천된다', '오픈 소스이다', '유료로 구매해야 사용할 수 있다'], answer: 3, explain: '파이썬은 오픈 소스라서 누구나 무료로 쓸 수 있어요.' },
        { type: 'ox', q: '파이썬은 인터프리터 언어이다.', answer: true, explain: '명령을 만날 때마다 즉시 번역해서 실행하는 인터프리터 언어예요.' },
        { type: 'match', pairs: [['`tkinter`', 'GUI 프로그래밍'], ['`numpy`', '수치 연산'], ['`pickle`', '자료를 변형 없이 파일에 저장·불러오기'], ['오라클, MySQL', '데이터베이스']], explain: '활용 분야와 대표 도구를 짝지어 외워 두세요.' },
        { type: 'mc', q: '구글 코랩(Colab)의 특징이 **아닌** 것은?', choices: ['웹브라우저에서 실행한다', '구글 드라이브에 저장한다', 'pandas, matplotlib 등이 기본 설치되어 있다', '반드시 내 컴퓨터에 파이썬을 먼저 설치해야 한다'], answer: 3, explain: '코랩은 설치 없이 웹브라우저에서 바로 실행해요.' },
        { type: 'mc', q: 'ALU의 뜻으로 알맞은 것은?', choices: ['Arithmetic Logic Unit', 'Array List Unit', 'Advanced Learning Utility', 'Automatic Loop Unit'], answer: 0, explain: '산술 논리 연산 장치(Arithmetic Logic Unit)예요.' },
        { type: 'ox', q: 'GPU는 CPU보다 ALU가 훨씬 많아서, 단순한 계산을 동시에 대량으로 처리하는 데 유리하다.', answer: true, explain: '그래서 딥러닝처럼 단순 계산이 엄청 많은 작업에 GPU를 써요.' },
        { type: 'mc', q: '파이썬을 내 컴퓨터에 설치할 때 이용하는 공식 사이트는?', choices: ['www.python.org', 'colab.research.google.com', 'www.sqlite.org', 'pandas.pydata.org'], answer: 0, explain: 'python.org에서 내려받아요. colab 주소는 설치 없이 쓰는 웹 서비스예요.' },
        { type: 'mc', q: 'GUI의 뜻은?', choices: ['Graphic User Interface', 'General Use Internet', 'Global Unit Index', 'Graph Utility Interface'], answer: 0, explain: '윈도우 창처럼 화면을 보며 마우스·키보드로 조작하는 프로그램이에요. 파이썬은 tkinter로 만들어요.' },
        { type: 'mc', q: '파이썬 활용 분야 중 "분석 결과를 다양한 그래프로 시각화해서 보여주는" 분야는?', choices: ['데이터 분석', 'GUI 프로그래밍', '웹 프로그래밍', '데이터베이스 프로그래밍'], answer: 0, explain: '빅데이터 분석에 파이썬을 쓰는 경우가 점차 늘고 있고, 분석 결과를 그래프로 시각화해요.' },
        { type: 'ox', q: '파이썬은 웹 프로그래밍(웹 프로그램 만들기)에도 적합한 도구이다.', answer: true, explain: '수업 자료의 활용 분야: GUI, 웹, 수치 연산, 데이터베이스, 데이터 분석.' },
        { type: 'mc', q: 'Colab에 기본으로 설치되어 있다고 소개된 패키지 묶음은?', choices: ['TensorFlow, Keras, matplotlib, scikit-learn, pandas', 'tkinter, pickle, MySQL', 'Word, Excel, PowerPoint', 'Java, C++, HTML'], answer: 0, explain: '데이터 분석에 쓰이는 패키지들이 기본 설치되어 있어서 바로 import 할 수 있어요.' },
      ],
      summary: [
        '**컴파일 언어**: 모든 명령을 일괄 번역 후 실행 · 코딩→컴파일→실행→디버깅 · 빠르지만 구조 복잡',
        '**인터프리터 언어**: 명령어를 만날 때마다 즉시 번역·실행 · 느리지만 단순하고 쉬움 → 파이썬',
        '파이썬: **1990년 귀도 반 로섬** 개발 · 쉬운 문법 · 초보자 추천 · **오픈 소스**',
        '활용: GUI(**tkinter**) · 웹 · 수치 연산(**numpy**) · DB(오라클·MySQL, **pickle**) · 데이터 분석과 시각화',
        '설치: `python.org` / **Colab**: 웹브라우저 실행, 구글 드라이브 저장, TensorFlow·Keras·matplotlib·scikit-learn·pandas 기본 설치',
        '**ALU** = Arithmetic Logic Unit · GPU는 ALU가 매우 많아 단순 계산을 동시에 대량 처리',
      ],
      traps: ['컴파일/인터프리터의 장단점을 서로 바꾼 보기', 'Colab은 설치가 필요 없다 (웹브라우저에서 실행)'],
    },

    /* ───────────────────────── 2. 파이썬 구조와 입출력 ───────────────────────── */
    {
      id: 's02', num: '2',
      title: '파이썬 구조와 입출력',
      sub: '한 줄 한 명령 · 대소문자 · 들여쓰기 · 주석 · print · input',
      goal: '파이썬 코드의 기본 형식을 지키고, `print`와 `input`을 쓸 수 있다',
      lessons: [
        {
          title: '소스의 형식: 한 줄에 하나의 명령',
          body: [
            '파이썬은 **한 줄에 하나의 명령**을 쓰는 게 원칙이에요.',
            '',
            '세미콜론(`;`)을 쓰면 여러 명령을 한 줄에 모두 쓸 수도 있지만, 읽기 어려워서 **지양**해요.',
          ],
          code: `a = 10
b = 20
print(a + b)

c = 1; d = 2; print(c + d)   # 가능하지만 비추천`,
          output: '30\n3',
        },
        {
          title: '대문자와 소문자를 구분해요',
          body: [
            '파이썬은 **대문자와 소문자를 다른 글자로** 봐요.',
            '',
            '- `print`는 출력 명령이지만 `Print`나 `PRINT`는 파이썬이 모르는 이름이라 에러가 나요.',
            '- `score`와 `Score`는 서로 **다른 변수**예요.',
          ],
          code: `score = 90
Score = 50
print(score)
print(Score)`,
          output: '90\n50',
          warn: '`Print("hi")` → `NameError: name \'Print\' is not defined`. 대소문자 하나만 틀려도 에러예요.',
        },
        {
          title: '들여쓰기(Indent)와 콜론(:)',
          body: [
            '파이썬에서 **들여쓰기는 문법**이에요. 마음대로 띄우면 안 돼요.',
            '',
            '- 들여쓰기는 **[Tab] 키** 또는 **공백 4개**',
            '- 일반적으로 `>>>` 프롬프트의 **첫 칸부터** 명령을 입력해요 (앞에 괜히 공백을 넣으면 에러)',
            '- 조건문, 반복문, 함수 정의처럼 여러 문장이 **블록**을 이루는 경우, 줄 끝의 **콜론(`:`)**과 **들여쓰기**로 "여기부터 같은 블록"이라고 지정해요.',
          ],
          code: `age = 20
if age > 19:
    print("성인입니다")

for a in range(5):
    print(a)`,
          output: '성인입니다\n0\n1\n2\n3\n4',
          tip: '`if age > 19:` 아래 줄이 4칸 들어가 있죠? "이 줄은 if 블록에 속해요"라는 뜻이에요. if와 for는 뒤 스테이지에서 자세히 배워요.',
        },
        {
          title: '# 주석: 사람을 위한 메모',
          body: '`#` 뒤에 쓴 내용은 **주석**이에요. 명령어가 아니라 **사용자(사람)를 위한 설명 문장**이라서 컴퓨터는 무시해요.',
          code: `# 이 줄 전체가 주석이에요
print("주석은 실행되지 않아요")   # 줄 끝에도 쓸 수 있어요
# print("이 줄은 출력되지 않아요")`,
          output: '주석은 실행되지 않아요',
        },
        {
          title: 'print: 출력하기',
          body: [
            '형식: `print(출력 내용 [, sep=구분자] [, end=끝 문자])`  (대괄호 [ ]는 "생략 가능"이라는 뜻)',
            '',
            '- 괄호 안에 상수, 변수, 수식 등 출력할 내용을 넣어요.',
            '- 출력할 내용이 여러 개면 **콤마(,)로 나열**해요. 기본적으로 사이에 **공백 한 칸**이 들어가요.',
            '- `sep=`으로 사이에 넣을 **구분자**를 바꿀 수 있어요.',
          ],
          code: `a = 10
b = 20
c = 30
print(a, b, c)
print(a, b, c, sep=" <= ")
print(a, b, c, sep="")`,
          output: '10 20 30\n10 <= 20 <= 30\n102030',
        },
        {
          title: 'end: 줄바꿈 대신 다른 끝 문자',
          body: [
            'print는 출력이 끝나면 자동으로 **줄을 바꿔요**. 기본 끝 문자가 줄바꿈(`\\n`)이기 때문이에요.',
            '',
            '`end=`로 끝 문자를 바꾸면 다음 출력이 **같은 줄에 이어서** 나와요.',
          ],
          code: `print("A")
print("B")
print("C", end="")
print("D", end=" / ")
print("E")`,
          output: 'A\nB\nCD / E',
          trace: true,
        },
        {
          title: 'input: 사용자에게 값 입력받기',
          body: [
            '형식: `변수 = input("질문 내용")`',
            '',
            '질문을 화면에 보여 주고, 사용자가 키보드로 입력한 값을 변수에 저장해요.',
            '',
            '중요! **input으로 받은 값은 항상 문자열(글자)**이에요. 2021을 입력해도 글자 `"2021"`로 저장돼요. 그래서 계산하려면 바꿔 줘야 해요.',
            '- `int( )` : 문자열 → **정수**로 바꿈',
            '- `str( )` : 정수 → **문자열**로 바꿈 (int의 반대)',
          ],
          code: `year = input("지금이 몇년이죠? ")
print("내년 : " + str(int(year) + 1))`,
          output: '지금이 몇년이죠? 2021\n내년 : 2022',
          noRun: true,
          after: '실행 순서: ① `int(year)` → 2021(숫자) ② `+ 1` → 2022 ③ `str(...)` → "2022"(글자) ④ `"내년 : " + "2022"` → 글자끼리 이어 붙이기',
          tip: '수업 자료에는 `print("내년 : " + str(int(year)+1)`처럼 닫는 괄호가 하나 빠져 있어요. 여는 괄호와 닫는 괄호의 개수는 항상 같아야 해요!',
        },
      ],
      quiz: [
        { type: 'output', code: `a = 10
b = 20
c = 30
print(a, b, c, sep=" <= ")`, answer: '10 <= 20 <= 30', explain: '`sep`으로 지정한 " <= "가 값 사이사이에 들어가요.' },
        { type: 'output', code: `print(1, 2, 3)`, answer: '1 2 3', explain: '콤마로 나열하면 기본 구분자인 공백 한 칸이 사이에 들어가요.' },
        { type: 'output', code: `print("A", end="")
print("B")`, answer: 'AB', explain: '`end=""`라서 A 뒤에 줄이 바뀌지 않고 B가 바로 이어져요.' },
        { type: 'output', code: `print("x", "y", "z", sep="-")`, answer: 'x-y-z', explain: '구분자가 "-"로 바뀌었어요.' },
        { type: 'mc', q: '파이썬의 들여쓰기 규칙으로 옳은 것은?', choices: ['[Tab] 또는 공백 4개', '공백 1개', '중괄호 `{ }`로 블록 표시', '아무렇게나 해도 된다'], answer: 0, explain: '블록은 콜론과 들여쓰기([Tab] 또는 공백 4개)로 표시해요.' },
        { type: 'ox', q: '파이썬은 대문자와 소문자를 구분한다.', answer: true, explain: '`print`와 `Print`는 다른 이름이에요.' },
        { type: 'ox', q: '세미콜론(;)으로 여러 명령을 한 줄에 쓰는 것이 권장되는 방식이다.', answer: false, explain: '가능은 하지만 지양해요. 한 줄에 하나의 명령이 원칙이에요.' },
        { type: 'mc', q: '`#` 뒤에 쓴 내용은 무엇일까요?', choices: ['주석: 실행되지 않는 설명', '출력할 내용', '변수 이름', '에러 메시지'], answer: 0, explain: '주석은 사람을 위한 설명이라 컴퓨터가 무시해요.' },
        { type: 'mc', q: '`input()`으로 입력받은 값의 자료형은?', choices: ['정수(int)', '실수(float)', '문자열(str)', '입력한 값에 따라 자동 결정'], answer: 2, explain: '숫자를 입력해도 문자열이에요. 계산하려면 `int()`로 바꿔야 해요.' },
        { type: 'blank', q: '입력받은 연도에 1을 더해 출력하도록 빈칸을 채우세요.', code: `year = input("지금이 몇년이죠? ")
print("내년 : " + ___(___(year) + 1))`, options: ['str', 'int', 'print', 'input'], answer: ['str', 'int'], explain: '먼저 `int(year)`로 숫자로 바꿔 1을 더하고, `str()`로 다시 문자열로 바꿔야 "내년 : "과 이어 붙일 수 있어요.' },
        { type: 'mc', q: '조건문·반복문의 블록을 시작하는 줄 끝에 붙이는 기호는?', choices: ['콜론 `:`', '세미콜론 `;`', '마침표 `.`', '쉼표 `,`'], answer: 0, explain: '`if age > 19:`처럼 콜론을 붙이고 다음 줄을 들여써요.' },
        { type: 'order', q: '20살이면 "성인입니다"를 출력하는 코드를 완성하세요.', lines: ['age = 20', 'if age > 19:', '    print("성인입니다")'], explain: '변수를 먼저 만들고, if 줄 끝에 콜론, 실행할 명령은 들여쓰기.' },
        { type: 'output', code: `print("1+1 =", 1 + 1)`, answer: '1+1 = 2', explain: '따옴표 안 "1+1 ="은 글자 그대로, 1 + 1은 계산해서 2. 사이에 공백 한 칸.' },
        { type: 'mc', q: '`Print("hi")`를 실행하면?', choices: ['`hi`', '`Print("hi")`', '에러가 난다', '`hi`가 두 번 출력된다'], answer: 2, explain: '대소문자를 구분하므로 `Print`는 없는 이름 → NameError.' },
        { type: 'output', code: `print("가", "나", sep="")
print("다", end="!")
print("라")`, answer: '가나\n다!라', explain: '첫 줄은 구분자가 없어 "가나". 둘째 줄은 끝 문자가 "!"라서 줄이 안 바뀌고 "라"가 이어져요.' },
        { type: 'ox', q: '`>>>` 프롬프트에서 명령을 입력할 때는 일반적으로 첫 칸부터 입력한다.', answer: true, explain: '블록이 아닌데 앞에 공백을 넣으면 IndentationError가 나요.' },
        { type: 'output', code: `year = "2021"
print("내년 : " + str(int(year) + 1))`, answer: '내년 : 2022', explain: 'int로 숫자로 바꿔 1을 더하고, str로 다시 문자열로 바꿔 이어 붙여요.' },
      ],
      summary: [
        '**한 줄에 하나의 명령** (세미콜론 `;`으로 여러 명령 가능하지만 지양)',
        '**대소문자 구분**: `print` ≠ `Print`, `score` ≠ `Score`',
        '들여쓰기 = **[Tab] 또는 공백 4개** · 블록은 **콜론(`:`) + 들여쓰기**로 지정 · `>>>` 프롬프트에선 첫 칸부터 입력',
        '`#` 뒤는 **주석** (사람을 위한 설명, 실행 안 됨)',
        '`print(내용 [, sep=구분자] [, end=끝 문자])` · 콤마로 나열하면 기본 구분자는 공백 한 칸, 기본 끝 문자는 줄바꿈',
        '`input("질문")`의 결과는 **항상 문자열** → 계산하려면 `int()`, 다시 문자열과 붙이려면 `str()`',
      ],
      traps: ['`sep=""`이면 값이 붙어서 출력', '`end=""`이면 다음 print가 같은 줄에 이어서 출력', 'input 값에 바로 `+ 1` 하면 에러 (문자열 + 숫자)'],
    },

    /* ───────────────────────── 3. 변수와 숫자 ───────────────────────── */
    {
      id: 's03', num: '3',
      title: '변수와 숫자 자료형',
      sub: '변수 · 이름 규칙 · 동적 타입 · del · 정수/실수/복소수 · 진법',
      goal: '변수에 값을 저장하고, 숫자 자료형과 진법 표기를 읽을 수 있다',
      lessons: [
        {
          title: '변수: 이름표 붙은 상자',
          body: [
            '**변수**는 메모리에 **이름을 붙이고 값을 저장**하는 것이에요. 값을 담는 상자에 이름표를 붙였다고 생각하세요.',
            '',
            '`score = 98`은 "98을 score라는 상자에 넣어라"라는 뜻이에요. 여기서 `=`는 수학의 "같다"가 아니라 **오른쪽 값을 왼쪽 이름에 저장(대입)**하라는 기호예요.',
          ],
          code: `score = 98
print(score)
score = 100
print(score)`,
          output: '98\n100',
          trace: true,
          after: '새 값을 넣으면 예전 값은 사라지고 **새 값으로 바뀌어요**. 한 줄씩 실행하면서 변수 상태를 확인해 보세요.',
        },
        {
          title: '변수 이름(명칭) 짓는 규칙',
          body: [
            '**명칭(Identifier)**은 변수가 다른 것과 구분되도록 붙인 이름이에요. 규칙이 있어요.',
            '',
            '- **키워드**(`if`, `for`, `while` 등), **내장 함수**(`print` 등), **표준 모듈명**은 쓸 수 없어요',
            '- 모든 명칭은 **대소문자를 구분**해요',
            '- **알파벳, 밑줄(`_`), 숫자** 등으로 구성해요 (단, **숫자로 시작할 수는 없어요**)',
            '- **공백, `+`, `-`** 같은 기호는 쓸 수 없어요',
          ],
          table: [
            ['이름', '가능?', '이유'],
            ['`my_score`', 'O', '알파벳과 밑줄'],
            ['`_count`', 'O', '밑줄로 시작 가능'],
            ['`score2`', 'O', '숫자가 뒤에 오면 OK'],
            ['`2score`', 'X', '숫자로 시작'],
            ['`my score`', 'X', '공백 포함'],
            ['`my-score`', 'X', '`-` 기호 포함'],
            ['`for`', 'X', '키워드'],
          ],
          tip: '내장 함수 이름(`print`, `list` 등)에 값을 넣으면 에러는 안 나도 그 함수를 못 쓰게 돼요. 그래서 "사용할 수 없다"고 외워 두세요.',
        },
        {
          title: '동적 타입: 값이 타입을 정해요',
          body: [
            '파이썬 변수는 **별도로 타입(자료형)을 지정하지 않아요**. **처음 대입하는 값**에 따라 타입이 정해져요.',
            '',
            '그리고 실행 중에 다른 종류의 값을 넣으면 **타입이 바뀔 수 있어요**. 이것을 **동적 타입(Dynamic Type)**이라고 해요. `type()`으로 지금 타입을 확인할 수 있어요.',
          ],
          code: `score = 98
print(score, type(score))
score = "high"
print(score, type(score))`,
          output: "98 <class 'int'>\nhigh <class 'str'>",
          after: '`int`는 정수, `str`은 문자열(string), `float`는 실수, `complex`는 복소수예요.',
        },
        {
          title: 'del: 변수 삭제',
          body: '변수는 한 번 만들어지면 **계속 존재하며 값을 유지**해요. 필요 없으면 **`del`** 명령으로 삭제해요. 삭제한 뒤에 그 변수를 쓰면 NameError가 나요.',
          code: `x = 5
print(x)
del x
print(x)   # 에러!`,
          output: "5\nNameError: name 'x' is not defined",
          noRun: true,
        },
        {
          title: '정수형(int)과 진법',
          body: [
            '**정수형**은 가장 간단한 수치형이에요. **소수점 이하 값은 표현할 수 없어요**.',
            '',
            '10진수가 아닌 정수는 앞에 **접두사**를 붙여 진법을 지정해요. print는 항상 10진수로 바꿔서 보여줘요.',
          ],
          table: [
            ['진법', '접두', '사용 가능한 숫자', '예', '10진수 값'],
            ['16진법 (hexadecimal)', '`0x`', '0~9, a~f', '`0x2f`', '47'],
            ['8진법 (octal)', '`0o`', '0~7', '`0o17`', '15'],
            ['2진법 (binary)', '`0b`', '0, 1', '`0b1101`', '13'],
          ],
          code: `a = 1234567890
print(a)
b = 0x1a
print(b)`,
          output: '1234567890\n26',
          after: '`0x1a` = 1×16 + 10(a) = **26**. `0o`의 o는 숫자 0이 아니라 **영어 소문자 o**예요.',
          check: { q: '`print(0b101)`의 출력은?', choices: ['`101`', '`5`', '`0b101`', '`3`'], answer: 1, explain: '2진수 101 = 4 + 0 + 1 = 5' },
        },
        {
          title: '실수형(float)과 복소수형(complex)',
          body: [
            '**실수형**은 소수점 이하의 정밀한 값을 표현해요. 아주 크거나 작은 값은 **부동 소수점 방식**으로 써요.',
            '- 형식: **가수E지수** (= 가수 × 10의 지수 제곱)',
            '- 예: 9조 4600억 = `9.46e12` → 숫자가 짧아지고 비교하기도 쉬워요',
            '',
            '**복소수형**은 `실수부+허수부j` 형태예요. 알파벳 **j 접미사**가 복소수임을 나타내요.',
          ],
          code: `big = 9.46e12
print(big)
a = 1 + 2j
b = 3 + 4j
print(a + b)`,
          output: '9460000000000.0\n(4+6j)',
        },
      ],
      quiz: [
        { type: 'mc', q: '변수 이름으로 **사용할 수 있는** 것은?', choices: ['`my_score`', '`2score`', '`my-score`', '`my score`'], answer: 0, explain: '알파벳·밑줄·숫자로 구성하고 숫자로 시작하면 안 돼요. 공백과 `-`는 불가.' },
        { type: 'mc', q: '변수 이름으로 **사용할 수 없는** 것은?', choices: ['`_total`', '`total2`', '`Total`', '`for`'], answer: 3, explain: '`for`는 반복문 키워드라 이름으로 쓸 수 없어요.' },
        { type: 'output', code: `a = 0x1a
print(a)`, answer: '26', explain: '16진수 1a = 1×16 + 10 = 26' },
        { type: 'output', code: `print(0b1101)`, answer: '13', explain: '2진수 1101 = 8 + 4 + 0 + 1 = 13' },
        { type: 'output', code: `print(0o17)`, answer: '15', explain: '8진수 17 = 1×8 + 7 = 15' },
        { type: 'match', pairs: [['`0x`', '16진법'], ['`0o`', '8진법'], ['`0b`', '2진법'], ['`j`', '복소수의 허수부']], explain: 'x는 heXadecimal, o는 Octal, b는 Binary의 첫 글자예요.' },
        { type: 'mc', q: '`9.46e12`가 뜻하는 값은?', choices: ['9.46 × 10¹²', '9.46 × 12', '9.46의 12제곱', '946 × 10¹²'], answer: 0, explain: '가수E지수 = 가수 × 10^지수. 9.46 × 10¹² = 9조 4600억.' },
        { type: 'output', code: `a = 1 + 2j
b = 3 + 4j
print(a + b)`, answer: '(4+6j)', explain: '실수부끼리(1+3), 허수부끼리(2+4) 더해요. 복소수는 괄호와 함께 출력돼요.' },
        { type: 'ox', q: '파이썬 변수는 만들 때 int, str 같은 타입을 반드시 지정해야 한다.', answer: false, explain: '동적 타입이라 처음 대입하는 값으로 타입이 정해져요.' },
        { type: 'output', code: `score = 98
score = "high"
print(score)`, answer: 'high', explain: '실행 중에 타입이 정수에서 문자열로 바뀌었어요 (동적 타입).' },
        { type: 'mc', q: '변수를 삭제하는 명령은?', choices: ['`del`', '`remove`', '`delete`', '`clear`'], answer: 0, explain: '`del 변수명`으로 삭제해요.' },
        { type: 'ox', q: '`Score`와 `score`는 같은 변수이다.', answer: false, explain: '대소문자를 구분하니까 서로 다른 변수예요.' },
        { type: 'mc', q: '`print(type(3.14))`의 결과에 나오는 타입 이름은?', choices: ['int', 'float', 'str', 'complex'], answer: 1, explain: "소수점이 있으니 실수형 float → `<class 'float'>`" },
        { type: 'output', code: `print(0x2f)`, answer: '47', explain: '2×16 + 15(f) = 47' },
        { type: 'mc', q: '정수형(int)에 대한 설명으로 옳은 것은?', choices: ['소수점 이하 값을 표현할 수 없다', '소수점 이하를 정밀하게 표현한다', '끝에 j를 붙여 표현한다', '따옴표로 감싸서 표현한다'], answer: 0, explain: '소수점 이하는 실수형(float)이 담당해요.' },
        { type: 'mc', q: '변수에 대한 설명으로 옳은 것은?', choices: ['메모리에 이름을 붙이고 값을 저장하는 것', '한 번 저장하면 값을 바꿀 수 없는 것', '반드시 숫자만 저장할 수 있는 것', '프로그램이 끝나도 남아 있는 파일'], answer: 0, explain: '변수 = 메모리에 이름 붙이고 값을 저장하는 것. 값은 언제든 바꿀 수 있어요.' },
      ],
      summary: [
        '**변수**: 메모리에 이름을 붙이고 값을 저장 · `=`는 오른쪽 값을 왼쪽에 **대입**',
        '이름 규칙: 키워드·내장 함수·표준 모듈명 X · **대소문자 구분** · 알파벳·밑줄·숫자로 구성(숫자로 시작 X) · 공백·`+`·`-` X',
        '**동적 타입**: 타입을 지정하지 않고 처음 대입한 값으로 결정, 실행 중 바뀔 수 있음 · `type()`으로 확인',
        '변수는 계속 존재하며 값 유지 → **`del`**로 삭제',
        '정수: 소수점 X · 진법 접두 `0x`(16진) `0o`(8진) `0b`(2진)',
        '실수: 부동 소수점 **가수E지수** (9조 4600억 = `9.46e12`) · 복소수: `실수부+허수부j`',
      ],
      traps: ['`0o`의 o는 영문자 (숫자 0 아님)', '`print(0x1a)`는 10진수 26으로 출력', '`2score`처럼 숫자로 시작하는 이름은 불가'],
    },

    /* ───────────────────────── 4. 문자열 ───────────────────────── */
    {
      id: 's04', num: '4',
      title: '문자열 다루기',
      sub: '따옴표 · 확장열 · 긴 문자열 · 인덱싱 · 슬라이싱 · 문자열 함수',
      goal: '문자열을 만들고, 원하는 글자를 꺼내고 자를 수 있다',
      lessons: [
        {
          title: '문자열(String)이란',
          body: [
            '**문자열**은 일련의 문자를 **따옴표로 감싸** 나열한 것이에요. 각종 문자, 기호, 숫자 등 무엇이든 담을 수 있어요.',
            '',
            '- 큰따옴표 `"..."`와 작은따옴표 `\'...\'` 모두 OK',
            '- 단, **한 문자열에 두 따옴표를 섞어 쓸 수 없어요**. `"string\'`처럼 시작과 끝이 다르면 에러',
          ],
          code: `a = "Korea 서울 1234"
print(a)
b = '작은따옴표도 OK'
print(b)`,
          output: 'Korea 서울 1234\n작은따옴표도 OK',
        },
        {
          title: '따옴표 안에 따옴표 넣기',
          body: [
            '따옴표는 **같은 따옴표 안에 그냥 적을 수 없어요**. 파이썬이 문자열이 거기서 끝난 걸로 보거든요.',
            '',
            '- 방법 1: 큰따옴표를 넣고 싶으면 문자열을 **작은따옴표로 감싸기**',
            '- 방법 2: **확장열** `\\"` 사용 (다음 카드)',
          ],
          code: `print('I Say "Help" to you')`,
          output: 'I Say "Help" to you',
        },
        {
          title: '확장열(Escape Sequence)',
          body: '따옴표 안에 오기 힘든 다양한 문자들은 **`\\` 문자 뒤에 특별한 기호**를 붙여서 표기해요. 이것을 **확장열**이라고 해요.',
          table: [
            ['확장열', '의미'],
            ['`\\n`', '개행 (줄바꿈)'],
            ['`\\t`', '탭'],
            ['`\\"`', '큰따옴표'],
            ["`\\'`", '작은따옴표'],
            ['`\\\\`', '`\\` 문자 자체'],
          ],
          code: `print("I Say \\"Help\\" to you")
a = "first\\nsecond"
print(a)
print("이름\\t점수")`,
          output: 'I Say "Help" to you\nfirst\nsecond\n이름\t점수',
          tip: '한글 키보드에서는 `\\`가 `₩`(원화 기호)로 보이기도 해요. 같은 키예요.',
        },
        {
          title: '긴 문자열: 따옴표 3개',
          body: '여러 줄짜리 문자열은 **따옴표 3개**(`"""` 또는 `\'\'\'`)로 감싸요. 쓴 그대로 **줄바꿈까지** 저장돼요.',
          code: `s = """강나루 건너서 밀밭 길을
구름에 달 가듯이 가는 나그네"""
print(s)`,
          output: '강나루 건너서 밀밭 길을\n구름에 달 가듯이 가는 나그네',
          after: '반대로 줄 끝에 **계속문자 `\\`**를 쓰면 다음 줄과 **한 줄로 이어져요**. 이때는 줄바꿈이 생기지 않아서, 줄을 바꾸려면 `\\n`을 써야 해요.',
        },
        {
          title: '계속문자 \\ 와 괄호로 이어 쓰기',
          body: [
            '계속문자 `\\`는 문자열뿐 아니라 **코드에서도** 쓸 수 있어요. 이어지는 다음 줄의 **들여쓰기는 상관없어요**.',
            '',
            '또, **전체를 괄호로 묶으면** 여러 줄에 나눠 쓴 문자열들이 **하나의 긴 문자열로 붙어요**.',
          ],
          code: `totalsec = 365 * 24 * \\
           60 * 60
print(totalsec)

s = ("korea"
     "japan"
     "2002")
print(s)`,
          output: '31536000\nkoreajapan2002',
          after: '`koreajapan2002`처럼 사이에 공백이나 줄바꿈 없이 붙어요. 줄을 바꾸고 싶으면 문자열 안에 `\\n`을 넣어야 해요.',
        },
        {
          title: '인덱싱: 글자 하나 꺼내기',
          body: [
            '문자열의 각 글자에는 **위치 번호(첨자, 인덱스)**가 있어요. **0부터 시작**해요!',
            '',
            '- `s[2]` → 앞에서 0, 1, **2**번째 글자',
            '- `s[-2]` → **뒤에서 2번째** 글자 (음수는 뒤에서부터 세고, -1이 마지막 글자)',
          ],
          table: [
            ['글자', 'p', 'y', 't', 'h', 'o', 'n', '␣', 'p', 'r', 'o', 'g', 'r', 'a', 'm', 'm', 'i', 'n', 'g'],
            ['앞 번호', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'],
            ['뒤 번호', '-18', '-17', '-16', '-15', '-14', '-13', '-12', '-11', '-10', '-9', '-8', '-7', '-6', '-5', '-4', '-3', '-2', '-1'],
          ],
          code: `s = "python programming"
print(s[2])
print(s[-2])
print(s[0], s[-1])`,
          output: 't\nn\np g',
        },
        {
          title: '슬라이스: [begin:end:step]',
          body: [
            '`s[begin:end]`는 begin부터 **end 직전까지** 잘라요. **end 위치의 글자는 포함하지 않아요!**',
            '',
            '- begin 생략 → 처음부터, end 생략 → 끝까지',
            '- step → 몇 칸씩 건너뛸지 (`s[0:6:2]`는 0, 2, 4번 글자)',
          ],
          code: `s = "python programming"
print(s[2:5])
print(s[3:])
print(s[:4])
print(s[2:-2])
print(s[0:6:2])`,
          output: 'tho\nhon programming\npyth\nthon programmi\npto',
          warn: '`s[2:5]`는 2, 3, 4번 글자만! 5번은 빠져요. "끝은 포함하지 않는다"는 규칙은 반복문의 range에서도 똑같이 나와요.',
        },
        {
          title: '문자열 함수 모음',
          body: '`s = "python programming"` 일 때:',
          table: [
            ['하는 일', '코드', '결과'],
            ['길이', '`len(s)`', '18'],
            ['빈도수', '`s.count("n")`', '2'],
            ['위치 찾기', '`s.find("o")`', '4'],
            ['뒤에서부터 찾기', '`s.rfind("o")`', '9'],
            ['6번째부터 찾기', '`s.index("n", 6)`', '16'],
            ['포함 여부', '`"pro" in s`', 'True'],
            ['미포함 여부', '`"x" not in s`', 'True'],
            ['공백 제거', '`s.lstrip()` / `s.rstrip()` / `s.strip()`', '왼쪽 / 오른쪽 / 양쪽'],
            ['분할', '`s.split()`', "`['python', 'programming']`"],
            ['구분자로 분할', '`s.split("pro")`', "`['python ', 'gramming']`"],
          ],
          code: `s = "python programming"
print(len(s), s.count("n"))
print(s.find("o"), s.rfind("o"), s.index("n", 6))
print("pro" in s, "x" not in s)
print(s.split())
print("  hi  ".strip() + "!")`,
          output: "18 2\n4 9 16\nTrue True\n['python', 'programming']\nhi!",
          warn: '찾는 글자가 없을 때 `find()`는 **-1**을 돌려주고, `index()`는 **에러**가 나요.',
        },
      ],
      quiz: [
        { type: 'output', code: `s = "python programming"
print(s[2])`, answer: 't', explain: 'p(0) y(1) t(2) → t' },
        { type: 'output', code: `s = "python programming"
print(s[-2])`, answer: 'n', explain: '뒤에서 g(-1), n(-2) → n' },
        { type: 'output', code: `s = "python programming"
print(s[2:5])`, answer: 'tho', explain: '2, 3, 4번 글자 t, h, o. 5번은 포함하지 않아요.' },
        { type: 'output', code: `s = "python programming"
print(s[:4])`, answer: 'pyth', explain: '처음부터 3번 글자까지 → pyth' },
        { type: 'output', code: `s = "python programming"
print(len(s))`, answer: '18', explain: 'python(6) + 공백(1) + programming(11) = 18. 공백도 한 글자예요.' },
        { type: 'output', code: `s = "python programming"
print(s.find("o"))`, answer: '4', explain: '처음 나오는 o는 4번 위치예요.' },
        { type: 'mc', q: '출력 결과는?', out: true, code: `s = "python programming"
print(s.rfind("o"))`, choices: ['`4`', '`9`', '`-1`', '`10`'], answer: 1, explain: 'rfind는 뒤에서부터 찾지만, 위치 번호는 앞에서부터 센 값(9)을 돌려줘요.' },
        { type: 'mc', q: '찾는 문자가 없을 때 `find()`의 결과는?', choices: ['`-1`', '`0`', '에러가 난다', '`None`'], answer: 0, explain: 'find는 -1, index는 에러. 이 차이가 시험에 잘 나와요.' },
        { type: 'output', code: `s = "python programming"
print("pro" in s)`, answer: 'True', explain: 'programming 안에 pro가 있어요.' },
        { type: 'output', code: `a = "first\\nsecond"
print(a)`, answer: 'first\nsecond', explain: '`\\n`은 줄바꿈 확장열이라 두 줄로 출력돼요.' },
        { type: 'mc', q: '문자열 안에 큰따옴표를 넣는 방법으로 **틀린** 것은?', choices: ['`\'I Say "Help" to you\'`', '`"I Say \\"Help\\" to you"`', '`"I Say "Help" to you"`', '`"""I Say "Help" to you"""`'], answer: 2, explain: '큰따옴표 안에 큰따옴표를 그냥 쓰면 문자열이 중간에 끝나 버려서 에러예요.' },
        { type: 'match', pairs: [['`\\n`', '줄바꿈'], ['`\\t`', '탭'], ['`\\\\`', '`\\` 문자 자체'], ['`\\"`', '큰따옴표']], explain: '확장열은 `\\` 뒤에 특별한 기호를 붙여요.' },
        { type: 'output', code: `totalsec = 365 * 24 * \\
           60 * 60
print(totalsec)`, answer: '31536000', explain: '계속문자 `\\`로 두 줄이 한 줄로 이어져 365×24×60×60 = 31536000.' },
        { type: 'output', code: `s = ("korea"
     "japan"
     "2002")
print(s)`, answer: 'koreajapan2002', explain: '괄호로 묶은 문자열들은 사이 공백 없이 하나로 붙어요.' },
        { type: 'mc', q: '출력 결과는?', out: true, code: `print("a,b,c".split(","))`, choices: ["`['a', 'b', 'c']`", '`a b c`', '`abc`', "`('a', 'b', 'c')`"], answer: 0, explain: 'split은 구분자로 잘라서 **리스트**로 돌려줘요.' },
        { type: 'output', code: `print("  hi  ".strip())`, answer: 'hi', explain: 'strip은 양쪽 공백을 제거해요.' },
        { type: 'ox', q: '`"string\'`처럼 큰따옴표로 시작해서 작은따옴표로 끝낼 수 있다.', answer: false, explain: '한 문자열에 두 따옴표를 섞어 쓸 수 없어요. 시작과 끝은 같은 따옴표!' },
        { type: 'blank', q: '`tho`가 출력되도록 빈칸을 채우세요.', code: `s = "python programming"
print(s[___:___])`, options: ['2', '5', '1', '4', '6'], answer: ['2', '5'], explain: 't는 2번, o는 4번. 끝 번호는 포함하지 않으니 4 + 1 = 5를 써요.' },
        { type: 'output', code: `s = "python programming"
print(s.count("m"))`, answer: '2', explain: 'programming에 m이 2개 있어요.' },
        { type: 'output', code: `s = "python programming"
print(s[3:])`, answer: 'hon programming', explain: '3번(h)부터 끝까지.' },
        { type: 'output', code: `s = "python programming"
print(s[2:-2])`, answer: 'thon programmi', explain: '2번부터 뒤에서 2번째(-2) 직전까지. 끝의 n, g가 빠져요.' },
        { type: 'output', code: `s = "python programming"
print(s.index("n", 6))`, answer: '16', explain: '6번 위치부터 찾기 시작하니 앞의 n(5번)은 건너뛰고 16번을 찾아요.' },
        { type: 'output', code: `s = "python programming"
print("x" not in s)`, answer: 'True', explain: 'x가 없으니 "없다"는 말이 참.' },
        { type: 'mc', q: '출력 결과는?', out: true, code: `print("[" + "  hi  ".lstrip() + "]")`, choices: ['`[hi  ]`', '`[  hi]`', '`[hi]`', '`[  hi  ]`'], answer: 0, explain: 'lstrip은 왼쪽 공백만 제거. 오른쪽 공백은 남아요.' },
        { type: 'mc', q: '`rstrip()`이 제거하는 공백은?', choices: ['오른쪽 공백', '왼쪽 공백', '양쪽 공백', '가운데 공백'], answer: 0, explain: 'l = left(왼쪽), r = right(오른쪽), strip은 양쪽.' },
        { type: 'mc', q: '출력 결과는?', out: true, code: `s = "python programming"
print(s.split())`, choices: ["`['python', 'programming']`", "`['python programming']`", '`python programming`', "`('python', 'programming')`"], answer: 0, explain: '인수 없는 split()은 공백을 기준으로 잘라 리스트로 돌려줘요.' },
        { type: 'mc', q: '출력 결과는?', out: true, code: `s = "python programming"
print(s.split("pro"))`, choices: ["`['python ', 'gramming']`", "`['python', 'gramming']`", "`['python ', 'pro', 'gramming']`", "`['gramming']`"], answer: 0, explain: '"pro"를 기준으로 자르고 "pro" 자체는 사라져요. 앞부분의 공백은 남아요.' },
      ],
      summary: [
        '문자열 = 문자를 **따옴표로 감싸** 나열 · 큰/작은따옴표 모두 가능하지만 **섞어 쓸 수 없음**',
        '큰따옴표를 넣으려면 작은따옴표로 감싸거나 확장열 `\\"` 사용',
        '확장열: `\\n` 개행 · `\\t` 탭 · `\\"` · `\\\'` · `\\\\`',
        '긴 문자열: **따옴표 3개**(줄바꿈 유지) / 계속문자 `\\`(한 줄로 이어짐, 코드에도 사용, 들여쓰기 무관) / **괄호로 묶기**(문자열이 붙음)',
        '인덱스는 **0부터**, 음수는 뒤에서 (-1이 마지막) · 슬라이스 `[begin:end:step]`은 **end 미포함**',
        '`len` 길이 · `count` 빈도 · `find`/`rfind`/`index` 위치 · `in`/`not in` 포함 · `strip` 공백 제거 · `split` 분할(리스트)',
      ],
      traps: ['`s[2:5]`는 5번 글자를 포함하지 않음', '없는 글자: `find` → -1, `index` → 에러', '`rfind`의 결과도 앞에서부터 센 위치', '`len("python programming")`은 공백 포함 18'],
    },

    /* ───────────────────────── 5. 연산자와 타입 변환 ───────────────────────── */
    {
      id: 's05', num: '5',
      title: '연산자와 타입 변환',
      sub: '대입 · 산술 · 복합 대입 · 문자열 연산 · int / str / float / round',
      goal: '산술 연산의 결과를 정확히 예측하고, 자료형을 바꿀 수 있다',
      lessons: [
        {
          title: '대입 연산자 =',
          body: [
            '**대입 연산자** `=`는 변수에 값을 저장해요. 형식: `변수 = 수식`',
            '',
            '오른쪽을 **먼저 계산**한 다음 그 결과를 왼쪽 변수에 넣어요. **대입되는 값에 따라 변수 타입이 결정**돼요.',
          ],
          code: `a = 3
s = "korea"
f = 3.1415
a = (1 + 2) * 3
print(a, s, f)`,
          output: '9 korea 3.1415',
        },
        {
          title: '산술 연산자',
          table: [
            ['연산자', '설명', '예', '결과'],
            ['`+`', '더하기', '`7 + 2`', '9'],
            ['`-`', '빼기', '`7 - 2`', '5'],
            ['`*`', '곱하기', '`7 * 2`', '14'],
            ['`/`', '나누기 (결과는 항상 실수)', '`7 / 2`', '3.5'],
            ['`**`', '거듭제곱', '`2 ** 3`', '8'],
            ['`//`', '정수 나누기 (몫)', '`7 // 2`', '3'],
            ['`%`', '나머지', '`7 % 2`', '1'],
          ],
          code: `print(5 / 2)
print(5 // 2)
print(7 % 2, 8 % 3, 9 % 3)
print(4 / 2)`,
          output: '2.5\n2\n1 2 0\n2.0',
          warn: '`/`는 나누어떨어져도 결과가 **실수**예요. `4 / 2`는 `2`가 아니라 `2.0`!',
          tip: '`%` 나머지는 "배수인지" 확인할 때 많이 써요. `x % 2 == 0`이면 짝수, `x % 10 == 0`이면 10의 배수예요.',
        },
        {
          title: '복합 대입 연산자',
          body: [
            '`a = a + 1`은 "a에 1을 더한 값을 다시 a에 넣어라"예요. 우변을 계산해서 좌변에 대입하죠. 이걸 줄여서 `a += 1`로 써요.',
            '',
            '- `+=` : 좌변의 값에 우변의 값을 더함',
            '- `-=` : 원래 값에서 일정 값을 뺌',
            '- `*=` : 원래 값의 일정 배수를 만듦',
          ],
          code: `a = 5
a += 1
print(a)
a -= 2
print(a)
a *= 3
print(a)`,
          output: '6\n4\n12',
          trace: true,
        },
        {
          title: '문자열 연산: + 와 *',
          body: [
            '`+`와 `*` 연산자는 **문자열에도** 쓸 수 있어요.',
            '',
            '- `+` : 문자열을 **연결**',
            '- `*` : 문자열을 **정수 횟수만큼 반복**',
          ],
          code: `s1 = "대한민국"
s2 = "만세"
print(s1 + s2)
print("싫어 " * 3)
print("=" * 10)`,
          output: '대한민국만세\n싫어 싫어 싫어 \n==========',
        },
        {
          title: '정수와 문자열은 섞어 더할 수 없어요',
          body: [
            '`+`는 **피연산자의 타입을 보고** 숫자면 덧셈, 문자열이면 연결을 해요. 그래서 **문자열과 숫자를 섞어 더하면 에러(TypeError)**가 나요.',
            '',
            '- 숫자 → 문자열: `str(2002)` → `"2002"`',
            '- 문자열 → 숫자: `int("22")` → `22`',
          ],
          code: `print("korea" + str(2002))
print(10 + int("22"))
# print("korea" + 2002)   ← 에러!`,
          output: 'korea2002\n32',
        },
        {
          title: '실수 변환과 반올림',
          body: [
            '- `float("22.5")` : 실수가 저장된 문자열을 **실수**로 변환',
            '- 문자열에 저장된 **실수를 정수로** 바꾸려면 두 단계: `float`로 실수로 바꾼 다음 `int`로 정수로 (`int`는 소수점 이하를 **버려요**)',
            '- `round(실수)` : 소수점 첫째 자리에서 **반올림**하여 정수 반환',
          ],
          code: `print(10 + float("22.5"))
print(10 + float("314e-2"))
print(int(float("3.7")))
print(round(3.7))`,
          output: '32.5\n13.14\n3\n4',
          warn: '`int("3.5")`는 **에러**예요 (ValueError). 반드시 `int(float("3.5"))`처럼 두 단계로!',
          tip: '파이썬의 round는 정확히 .5일 때 가장 가까운 짝수로 가요. `round(2.5)`는 2, `round(3.5)`는 4. 시험에선 보통 3.7처럼 확실한 값이 나와요.',
        },
      ],
      quiz: [
        { type: 'output', code: `print(5 / 2)`, answer: '2.5', explain: '`/`는 실수 나눗셈이에요.' },
        { type: 'output', code: `print(5 // 2)`, answer: '2', explain: '`//`는 몫만 구하는 정수 나누기예요.' },
        { type: 'output', code: `print(8 % 3)`, answer: '2', explain: '8 ÷ 3 = 2 … 나머지 2' },
        { type: 'output', code: `print(2 ** 3)`, answer: '8', explain: '2의 3제곱 = 8' },
        { type: 'output', code: `a = 5
a += 1
print(a)`, answer: '6', explain: '`a += 1`은 `a = a + 1`과 같아요.' },
        { type: 'output', code: `a = 10
a -= 3
a *= 2
print(a)`, answer: '14', explain: '10 - 3 = 7, 7 × 2 = 14' },
        { type: 'output', code: `print("싫어 " * 3)`, answer: '싫어 싫어 싫어', explain: '문자열 × 정수 = 그 횟수만큼 반복' },
        { type: 'mc', q: '`print("korea" + 2002)`를 실행하면?', choices: ['`korea2002`', '`korea 2002`', '에러(TypeError)가 난다', '`2002korea`'], answer: 2, explain: '문자열과 숫자는 섞어 더할 수 없어요. `str(2002)`로 바꿔야 해요.' },
        { type: 'output', code: `print(10 + int("22"))`, answer: '32', explain: '"22"를 정수 22로 바꾼 뒤 더해요.' },
        { type: 'output', code: `print(10 + float("22.5"))`, answer: '32.5', explain: '"22.5"를 실수 22.5로 바꾼 뒤 더해요.' },
        { type: 'mc', q: '`int("3.5")`를 실행하면?', choices: ['`3`', '`4`', '`3.5`', '에러가 난다'], answer: 3, explain: '소수점이 있는 문자열은 int가 바로 못 바꿔요. `int(float("3.5"))`로!' },
        { type: 'output', code: `print(int(float("3.5")))`, answer: '3', explain: 'float로 3.5 → int로 소수점 이하를 버려서 3' },
        { type: 'output', code: `print(round(3.7))`, answer: '4', explain: '소수점 첫째 자리에서 반올림해 정수 4' },
        { type: 'match', pairs: [['`//`', '정수 나누기(몫)'], ['`%`', '나머지'], ['`**`', '거듭제곱'], ['`/`', '나누기(실수 결과)']], explain: '시험에 표로 자주 나와요.' },
        { type: 'output', code: `print(4 / 2)`, answer: '2.0', explain: '나누어떨어져도 `/`의 결과는 실수예요.' },
        { type: 'mc', q: '정수 x가 **짝수**인지 확인하는 식은?', choices: ['`x % 2 == 0`', '`x / 2 == 0`', '`x // 2 == 1`', '`x ** 2 == 0`'], answer: 0, explain: '2로 나눈 나머지가 0이면 짝수예요.' },
        { type: 'output', code: `s1 = "대한민국"
s2 = "만세"
print(s1 + s2)`, answer: '대한민국만세', explain: '문자열 + 문자열 = 연결 (사이에 공백 없음)' },
        { type: 'blank', q: '`korea2002`가 출력되도록 빈칸을 채우세요.', code: `print("korea" + ___(2002))`, options: ['str', 'int', 'float', 'print'], answer: ['str'], explain: '숫자 2002를 문자열 "2002"로 바꿔야 연결할 수 있어요.' },
        { type: 'mc', q: '대입 연산자 `=`에 대한 설명으로 옳은 것은?', choices: ['`변수 = 수식` 형태로, 오른쪽을 계산해 왼쪽 변수에 저장한다', '양쪽 값이 같은지 비교한다', '변수의 타입을 미리 정해야 쓸 수 있다', '왼쪽 값을 오른쪽 변수에 넣는다'], answer: 0, explain: '대입되는 값에 따라 변수 타입이 결정돼요. 비교는 ==.' },
        { type: 'output', code: `print(10 + float("314e-2"))`, answer: '13.14', explain: '"314e-2" = 314 × 10⁻² = 3.14 → 10 + 3.14' },
      ],
      summary: [
        '`변수 = 수식`: 오른쪽을 계산해서 왼쪽에 대입, 값에 따라 타입 결정',
        '`+ - * /` · `**` 거듭제곱 · `//` 정수 나누기(몫) · `%` 나머지 · `/`의 결과는 **항상 실수**',
        '복합 대입: `a += 1` (= `a = a + 1`), `-=`, `*=`',
        '문자열 `+` 연결, `*` 정수 횟수만큼 반복',
        '문자열 + 숫자는 **에러** → `str()` / `int()`로 변환',
        '`float("22.5")` 실수 변환 · 실수 문자열 → 정수는 `int(float(...))` · `round()` 반올림하여 정수',
      ],
      traps: ['`4 / 2`는 `2.0`', '`int("3.5")`는 에러', '`"korea" + 2002`는 TypeError', '`int(3.7)`은 반올림이 아니라 버림 → 3'],
    },

    /* ───────────────────────── 6. 조건문 ───────────────────────── */
    {
      id: 's06', num: '6',
      title: '조건문 if',
      sub: 'if · 비교 연산자 · 참과 거짓 · and/or/not · 블록 · else · elif',
      goal: '조건에 따라 실행할 블록을 고르는 코드를 읽고 쓸 수 있다',
      lessons: [
        {
          title: 'if: 조건이 참일 때만',
          body: [
            '**조건문**은 조건의 진위(참/거짓) 여부에 따라 명령을 실행할지 결정해요. `if` 키워드로 써요.',
            '',
            '- 조건이 **참**이면 → 아래에 들여쓴 명령 실행',
            '- 조건이 **거짓**이면 → 무시하고 지나감',
            '- 형식 규칙: **조건 뒤에 반드시 콜론(`:`)**, 명령문은 **다음 줄에 들여써서**',
          ],
          code: `age = int(input("너 몇살이니? "))
if age < 19:
    print("애들은 가라")`,
          output: '너 몇살이니? 15\n애들은 가라',
          noRun: true,
          after: '`input`은 문자열을 주니까 `int()`로 감싸서 숫자로 바꾼 다음 비교해요.',
        },
        {
          title: '비교 연산자',
          body: '두 값의 **같음 여부나 크기 관계**를 비교해서 **참(`True`) 또는 거짓(`False`)**을 돌려줘요. if문은 이 결과로 실행 여부를 정해요.',
          table: [
            ['연산자', '의미'],
            ['`==`', '같다'],
            ['`!=`', '다르다'],
            ['`<`', '좌변이 우변보다 작다'],
            ['`>`', '좌변이 우변보다 크다'],
            ['`<=`', '좌변이 우변보다 작거나 같다'],
            ['`>=`', '좌변이 우변보다 크거나 같다'],
          ],
          code: `a = 5
print(a == 5)
print(a != 5)
print(a >= 3)`,
          output: 'True\nFalse\nTrue',
          warn: '`=`는 **대입**, `==`는 **같은지 비교**예요. `if a = 5:`는 에러!',
        },
        {
          title: '문자열 비교는 사전 순서로',
          body: [
            '문자열끼리 비교하면 **숫자 크기가 아니라 앞 글자부터 하나씩** 비교해요 (사전에서 앞에 오는 쪽이 작아요).',
            '',
            '`"39" > "59 "` → 첫 글자 `"3"`과 `"5"`를 비교 → `"3"`이 더 작으니 **거짓** → else로!',
          ],
          code: `if "39" > "59 ":
    print("왼쪽")
else:
    print("오른쪽")
print("10" < "9")`,
          output: '오른쪽\nTrue',
          after: '`"10" < "9"`가 참인 이유: 첫 글자 `"1"`이 `"9"`보다 앞이기 때문이에요. 숫자로 비교하려면 `int()`로 바꿔야 해요.',
        },
        {
          title: '조건 자리에 값을 바로 쓰기',
          body: '조건에 비교식 대신 **변수를 바로** 쓸 수도 있어요. 이때 참/거짓은 이렇게 정해져요.',
          table: [
            ['타입', '참', '거짓'],
            ['숫자', '0이 아닌 숫자 (음수도 참!)', '`0`'],
            ['문자열', '비어 있지 않은 상태', '`""` (빈 문자열)'],
            ['리스트, 튜플, 딕셔너리', '비어 있지 않은 상태', '빈 상태 `[]` `()` `{}`'],
          ],
          code: `value = -1
if value:
    print("참입니다.")
if "":
    print("이 줄은 출력되지 않아요")`,
          output: '참입니다.',
        },
        {
          title: '논리 연산자: and, or, not',
          body: '두 개 이상의 조건을 한꺼번에 점검할 때 써요.',
          table: [
            ['연산자', '의미', '예 (a=3, b=5)', '결과'],
            ['`and`', '두 조건이 **모두** 참', '`a == 3 and b == 4`', 'False'],
            ['`or`', '두 조건 중 **하나라도** 참', '`a == 3 or b == 4`', 'True'],
            ['`not`', '조건을 **반대로** 뒤집음', '`not a == 3`', 'False'],
          ],
          code: `a = 3
b = 5
if a == 3 and b == 4:
    print("and OK")
if a == 3 or b == 4:
    print("or OK")`,
          output: 'or OK',
        },
        {
          title: '블록 구조: 들여쓰기가 범위를 정해요',
          body: [
            '**블록**은 한꺼번에 실행되는 명령 묶음이에요. 같은 만큼 들여쓴 줄들이 **하나의 조건에 함께** 영향을 받아요.',
            '',
            '들여쓰기를 틀리면 블록이 달라져서 **일부만 조건에 걸려요**.',
          ],
          code: `age = 22
if age < 19:
    print("애들은 가라")
print("공부 열심히 해야지")`,
          output: '공부 열심히 해야지',
          trace: true,
          after: '마지막 print는 들여쓰지 않았으니 **if 블록 밖**이에요. 그래서 조건과 상관없이 항상 실행돼요. 두 print를 모두 들여썼다면 age가 22일 때 아무것도 출력되지 않아요.',
        },
        {
          title: 'else: 거짓일 때 실행할 블록',
          body: '`else:`는 조건이 **거짓일 때** 실행할 블록이에요. 같이 실행할 명령은 들여쓰기를 맞춰 블록을 구성해야 해요.',
          code: `age = 25
if age < 19:
    print("애들은 가라")
    print("공부 열심히 해야지")
else:
    print("어서 옵쇼")
    print("즐거운 시간 되세요")`,
          output: '어서 옵쇼\n즐거운 시간 되세요',
          trace: true,
        },
        {
          title: 'elif: 조건을 더 세부적으로',
          body: [
            '`elif`는 **else if**의 줄임말이에요. if 조건을 만족하지 않을 때 **세부 조건을 추가로** 점검해요.',
            '',
            '- 위에서부터 차례로 검사해서 **처음으로 참인 블록 하나만** 실행해요',
            '- 살펴볼 조건에 따라 elif는 **얼마든지** 넣을 수 있어요',
          ],
          code: `age = 23
if age < 19:
    print("애들은 가라")
elif age < 25:
    print("대학생입니다")
else:
    print("어서 옵쇼")`,
          output: '대학생입니다',
          trace: true,
        },
      ],
      quiz: [
        { type: 'output', code: `age = 16
if age < 19:
    print("애들은 가라")
    print("공부 열심히 해야지")`, answer: '애들은 가라\n공부 열심히 해야지', explain: '조건이 참이고 두 print 모두 if 블록 안이라 둘 다 실행돼요.' },
        { type: 'output', code: `age = 22
if age < 19:
    print("애들은 가라")
print("공부 열심히 해야지")`, answer: '공부 열심히 해야지', explain: '조건은 거짓이지만 마지막 print는 블록 밖이라 항상 실행돼요.' },
        { type: 'output', code: `age = 23
if age < 19:
    print("애들은 가라")
elif age < 25:
    print("대학생입니다")
else:
    print("어서 옵쇼")`, answer: '대학생입니다', explain: '23 < 19는 거짓, 23 < 25는 참 → elif 블록 실행.' },
        { type: 'output', code: `if "39" > "59 ":
    print("왼쪽")
else:
    print("오른쪽")`, answer: '오른쪽', explain: '문자열 비교: "3" < "5"이므로 조건이 거짓 → else.' },
        { type: 'mc', q: '다음 중 if 조건으로 썼을 때 **참**이 되는 값은?', choices: ['`0`', '`""`', '`[]`', '`-1`'], answer: 3, explain: '0이 아닌 숫자는 음수라도 참이에요. 0, 빈 문자열, 빈 리스트는 거짓.' },
        { type: 'output', code: `value = -1
if value:
    print("참입니다.")`, answer: '참입니다.', explain: '-1은 0이 아니니까 참이에요.' },
        { type: 'output', code: `a = 3
b = 5
print(a == 3 and b == 4)`, answer: 'False', explain: 'and는 둘 다 참이어야 해요. b == 4가 거짓.' },
        { type: 'output', code: `a = 3
b = 5
print(a == 3 or b == 4)`, answer: 'True', explain: 'or는 하나만 참이어도 참이에요.' },
        { type: 'output', code: `print(not True)`, answer: 'False', explain: 'not은 참/거짓을 뒤집어요.' },
        { type: 'mc', q: '"같다"를 비교하는 연산자는?', choices: ['`=`', '`==`', '`===`', '`!=`'], answer: 1, explain: '`=`는 대입, `==`가 비교예요.' },
        { type: 'ox', q: 'elif는 하나의 if문 안에 여러 번 쓸 수 있다.', answer: true, explain: '살펴볼 조건에 따라 얼마든지 넣을 수 있어요.' },
        { type: 'order', q: 'score가 90 이상이면 A, 80 이상이면 B, 아니면 C를 출력하는 코드를 완성하세요.', lines: ['score = 85', 'if score >= 90:', '    print("A")', 'elif score >= 80:', '    print("B")', 'else:', '    print("C")'], explain: 'if → elif → else 순서. 각 조건 아래에 실행할 줄을 들여써요.' },
        { type: 'blank', q: 'if 문을 올바르게 완성하세요.', code: `age = 15
if age < 19___
    print("애들은 가라")`, options: [':', ';', ',', '.'], answer: [':'], explain: '조건 뒤에는 반드시 콜론!' },
        { type: 'output', code: `x = 7
if x > 5:
    print("A")
elif x > 3:
    print("B")
else:
    print("C")`, answer: 'A', explain: 'x > 3도 참이지만, 처음으로 참인 블록(A) 하나만 실행해요.' },
        { type: 'output', code: `print("10" < "9")`, answer: 'True', explain: '문자열은 앞 글자부터 비교. "1" < "9"이므로 참.' },
        { type: 'mc', q: '`if a = 5:`를 실행하면?', choices: ['a가 5이면 실행된다', '에러가 난다 (`=`는 대입)', '항상 실행된다', '항상 무시된다'], answer: 1, explain: '비교는 `==`. 조건 자리에 대입 `=`을 쓰면 문법 에러예요.' },
        { type: 'match', pairs: [['`and`', '두 조건이 모두 참'], ['`or`', '하나라도 참'], ['`not`', '참/거짓을 뒤집기'], ['`!=`', '다르다']], explain: '논리 연산자와 비교 연산자를 정리해 두세요.' },
      ],
      summary: [
        '`if 조건:` → 참일 때만 들여쓴 블록 실행, 거짓이면 무시 · **콜론 + 들여쓰기** 필수',
        '비교 연산자 `==` `!=` `<` `>` `<=` `>=` → 결과는 `True`/`False` · `=`(대입)과 `==`(비교) 구분',
        '문자열 비교는 **앞 글자부터 사전 순** (`"39" > "59 "`는 거짓, `"10" < "9"`는 참)',
        '조건에 값을 바로 쓰면: 0·`""`·빈 리스트/튜플/딕셔너리는 거짓, 나머지는 참 (음수도 참)',
        '`and` 모두 참 · `or` 하나라도 참 · `not` 뒤집기',
        '블록 = 같은 들여쓰기의 명령 묶음 · `else:` 거짓일 때 · `elif` = else if, 여러 개 가능, **처음 참인 블록 하나만** 실행',
      ],
      traps: ['들여쓰기 안 된 줄은 조건과 상관없이 실행', 'elif가 여러 개 참이어도 첫 번째만 실행', '-1은 참'],
    },

    /* ───────────────────────── 7. 반복문 ───────────────────────── */
    {
      id: 's07', num: '7',
      title: '반복문 while · for',
      sub: 'while · for · range · % 활용 · break · continue · 이중 루프 · 범위의 원칙',
      goal: '반복문이 몇 번 돌고 무엇을 출력하는지 정확히 따라갈 수 있다',
      lessons: [
        {
          title: 'while: 조건이 참인 동안 반복',
          body: '`while`은 **조건이 만족하는 동안** 명령을 계속 실행해요. 반복적으로 처리하는 명령을 **루프(Loop)**라고 해요.',
          code: `student = 1
while student <= 5:
    print(student, "번 학생의 성적을 처리한다.")
    student += 1`,
          output: '1 번 학생의 성적을 처리한다.\n2 번 학생의 성적을 처리한다.\n3 번 학생의 성적을 처리한다.\n4 번 학생의 성적을 처리한다.\n5 번 학생의 성적을 처리한다.',
          trace: true,
          warn: '`student += 1`을 빼먹으면 student가 영원히 1이라 조건이 계속 참 → **무한 루프**! 조건을 바꾸는 문장이 꼭 있어야 해요.',
        },
        {
          title: 'while로 1~100 합 구하기',
          body: '합을 담을 변수 `sum`을 0으로 시작해서, num을 1부터 100까지 늘려 가며 계속 더해요.',
          code: `num = 1
sum = 0
while num <= 100:
    sum += num
    num += 1
print("sum =", sum)`,
          output: 'sum = 5050',
          tip: '`sum`은 사실 파이썬 내장 함수 이름이라 실무에선 `total` 같은 이름이 더 좋아요. 여기선 수업 예제를 그대로 따라 썼어요.',
        },
        {
          title: 'for: 컬렉션 요소를 하나씩',
          body: [
            '`for`는 **컬렉션(리스트 등)의 요소를 순서대로** 하나씩 꺼내면서 루프 명령을 실행해요.',
            '',
            '형식: `for 변수 in 컬렉션:`',
          ],
          code: `for student in [1, 2, 3]:
    print(student, "번 학생의 성적을 처리한다.")`,
          output: '1 번 학생의 성적을 처리한다.\n2 번 학생의 성적을 처리한다.\n3 번 학생의 성적을 처리한다.',
          trace: true,
        },
        {
          title: 'range: 범위 만들기',
          body: [
            '`range`는 **일정 범위의 수**를 만들고 그 요소를 반복하게 해 줘요. for와 짝꿍이에요.',
            '',
            '- `range(5)` → 0, 1, 2, 3, 4 (0부터 시작)',
            '- `range(1, 101)` → 1 ~ 100',
            '- `range(1, 10, 3)` → 1, 4, 7 (3씩 증가)',
            '',
            '**끝 숫자는 포함하지 않아요!**',
          ],
          code: `sum = 0
for num in range(1, 101):
    sum += num
print("sum =", sum)
for i in range(1, 10, 3):
    print(i, end=" ")`,
          output: 'sum = 5050\n1 4 7 ',
        },
        {
          title: '범위의 원칙과 오프셋',
          body: [
            '컴퓨터에서 범위를 정할 때는 **끝 요소를 제외하고 직전까지만** 포함해요. `range(1, 10)`은 1~9예요.',
            '',
            '왜 그럴까요? **범위를 구간으로 나눠 반복 처리할 때 편하기** 때문이에요. 앞 구간의 끝이 다음 구간의 시작과 같아도 겹치지 않거든요.',
          ],
          table: [['일상생활에서의 범위', '컴퓨터에서의 범위'], ['1~10', '0~10'], ['11~20', '10~20'], ['21~30', '20~30'], ['31~40', '30~40'], ['41~50', '40~50']],
          after: '**오프셋**은 기준(base)에서의 **상대적인 거리**예요. 기준 자신은 거리가 0이니까 **0부터 시작**해요. 문자열 인덱스가 0부터인 것도 같은 이유예요.',
          check: { q: '`range(2, 6)`에 들어 있는 수는?', choices: ['2, 3, 4, 5', '2, 3, 4, 5, 6', '3, 4, 5, 6', '2와 6'], answer: 0, explain: '끝(6)은 포함하지 않아요.' },
        },
        {
          title: '% 연산자로 반복 제어하기',
          body: [
            '**제어 변수**는 루프의 반복 횟수와 끝낼 시점을 결정해요. `%`(나머지)로 **배수(나머지가 0)**를 판별하면 재미있는 걸 만들 수 있어요.',
            '',
            '`x % 10 == 0` → x가 10의 배수일 때 참. 10으로 나누어떨어지는 자리에 `+`를, 나머지 자리에는 `-`를 출력해서 자(ruler)를 그려요.',
          ],
          code: `for x in range(1, 51):
    if (x % 10 == 0):
        print("+", end="")
    else:
        print("-", end="")`,
          output: '---------+---------+---------+---------+---------+',
          after: 'while 버전에서는 `if (x % 10):`처럼 쓰기도 해요. 나머지가 0이 아니면(=참) `-`를, 0이면(=거짓) else로 가서 `+`를 출력해요.',
        },
        {
          title: 'break: 루프 끝내기',
          body: [
            '- **break**: 특정 조건에 따라 **루프를 끝내고** 루프 다음 명령으로 이동',
            '- **continue**: 현재 실행 블록의 **나머지를 건너뛰고**, 루프 선두로 돌아가 **다음 반복을 계속**',
          ],
          code: `score = [92, 86, 68, 120, 56]
for s in score:
    if (s < 0 or s > 100):
        break
    print(s)
print("성적 처리 끝")`,
          output: '92\n86\n68\n성적 처리 끝',
          trace: true,
          after: '120을 만나는 순간 루프가 끝나서 그 뒤의 56은 출력되지 않아요.',
        },
        {
          title: 'continue: 이번 반복만 건너뛰기',
          body: '같은 자리에 `continue`를 쓰면 잘못된 값만 건너뛰고 나머지는 계속 처리해요.',
          code: `score = [92, 86, 68, -1, 56]
for s in score:
    if (s == -1):
        continue
    print(s)
print("성적 처리 끝")`,
          output: '92\n86\n68\n56\n성적 처리 끝',
          trace: true,
        },
        {
          title: '이중 루프: 구구단',
          body: [
            '루프 안 명령 자리에 또 다른 루프가 들어간 것을 **이중 루프**라고 해요. 바깥 루프가 한 번 돌 때 안쪽 루프는 **처음부터 끝까지** 다 돌아요.',
            '',
            '이중 루프를 쓸 때도 **들여쓰기에 주의**하세요.',
          ],
          code: `for dan in range(2, 4):
    print(dan, "단")
    for hang in range(2, 4):
        print(dan, "*", hang, "=", dan * hang)
    print()`,
          output: '2 단\n2 * 2 = 4\n2 * 3 = 6\n\n3 단\n3 * 2 = 6\n3 * 3 = 9\n',
          trace: true,
          after: '수업 예제는 `range(2, 10)`으로 2단~9단을 모두 출력해요. 여기선 짧게 2~3단만 보여줬어요. while로 만들 때는 바깥 루프 안에서 `hang = 2`로 **매번 다시 초기화**해야 해요.',
        },
      ],
      quiz: [
        { type: 'output', code: `for i in range(3):
    print(i)`, answer: '0\n1\n2', explain: 'range(3)은 0, 1, 2. 3은 포함하지 않아요.' },
        { type: 'mc', q: '출력 결과는?', out: true, code: `print(list(range(1, 10, 3)))`, choices: ['`[1, 4, 7]`', '`[1, 4, 7, 10]`', '`[3, 6, 9]`', '`[1, 3, 5, 7, 9]`'], answer: 0, explain: '1부터 3씩 증가, 10은 포함하지 않아요.' },
        { type: 'mc', q: '`range(1, 10)`이 만드는 수의 범위는?', choices: ['1 ~ 9', '1 ~ 10', '0 ~ 10', '0 ~ 9'], answer: 0, explain: '끝 요소(10)를 제외하고 직전까지만 포함해요.' },
        { type: 'output', code: `total = 0
for n in range(1, 11):
    total += n
print(total)`, answer: '55', explain: '1 + 2 + … + 10 = 55' },
        { type: 'output', code: `score = [92, 86, 68, 120, 56]
for s in score:
    if (s < 0 or s > 100):
        break
    print(s)
print("성적 처리 끝")`, answer: '92\n86\n68\n성적 처리 끝', explain: '120에서 break → 루프 종료. 56은 출력되지 않아요.' },
        { type: 'output', code: `score = [92, 86, 68, -1, 56]
for s in score:
    if (s == -1):
        continue
    print(s)
print("성적 처리 끝")`, answer: '92\n86\n68\n56\n성적 처리 끝', explain: '-1일 때만 건너뛰고 루프는 계속돼요.' },
        { type: 'output', code: `for x in range(1, 21):
    if x % 5 == 0:
        print("+", end="")
    else:
        print("-", end="")`, answer: '----+----+----+----+', explain: '5의 배수(5, 10, 15, 20)에서만 +, 나머지는 -. end=""라서 한 줄로.' },
        { type: 'output', code: `i = 1
while i <= 3:
    print(i * 2)
    i += 1`, answer: '2\n4\n6', explain: 'i가 1, 2, 3일 때 각각 2배를 출력해요.' },
        { type: 'output', code: `for i in range(1, 3):
    for j in range(1, 3):
        print(i * j)`, answer: '1\n2\n2\n4', explain: 'i=1일 때 j=1,2 → 1, 2 / i=2일 때 j=1,2 → 2, 4' },
        { type: 'mc', q: 'while문에서 **무한 루프**가 생기는 가장 흔한 원인은?', choices: ['조건을 바꾸는 문장(예: `i += 1`)을 빠뜨림', 'for문에 range를 씀', 'print를 너무 많이 씀', 'break를 씀'], answer: 0, explain: '조건이 계속 참으로 남으면 영원히 반복돼요.' },
        { type: 'order', q: '1부터 100까지의 합을 for로 구하는 코드를 완성하세요.', lines: ['sum = 0', 'for num in range(1, 101):', '    sum += num', 'print("sum =", sum)'], explain: '합 변수 초기화 → 반복하며 누적 → 반복이 끝난 뒤(들여쓰기 없이) 출력.' },
        { type: 'blank', q: '1~100을 반복하도록 빈칸을 채우세요.', code: `sum = 0
for num in ___(1, 101):
    sum += num
print(sum)`, options: ['range', 'list', 'len', 'print'], answer: ['range'], explain: '일정 범위의 수를 만드는 건 range예요.' },
        { type: 'ox', q: '`break`는 현재 반복의 나머지만 건너뛰고 다음 반복을 계속한다.', answer: false, explain: '그건 continue예요. break는 루프 자체를 끝내요.' },
        { type: 'mc', q: '오프셋(offset)은 몇부터 시작할까요?', choices: ['0', '1', '-1', '10'], answer: 0, explain: '기준에서의 상대적 거리라서 기준 자신은 0이에요.' },
        { type: 'output', code: `cnt = 0
for dan in range(2, 10):
    cnt += 1
print(cnt)`, answer: '8', explain: '2, 3, …, 9 → 8번 반복 (10은 미포함)' },
        { type: 'output', code: `for s in [92, 86, 68, 120, 56]:
    if s > 100:
        continue
    print(s, end=" ")`, answer: '92 86 68 56', explain: '120만 continue로 건너뛰고 나머지는 같은 줄에 출력.' },
        { type: 'match', pairs: [['`break`', '루프를 완전히 끝냄'], ['`continue`', '이번 반복만 건너뜀'], ['`while`', '조건이 참인 동안 반복'], ['`for`', '컬렉션 요소를 하나씩 꺼내며 반복']], explain: '반복문 4총사예요.' },
        { type: 'output', code: `dan = 2
while dan <= 3:
    hang = 2
    while hang <= 3:
        print(dan * hang, end=" ")
        hang += 1
    dan += 1`, answer: '4 6 6 9', explain: 'while 이중 루프는 바깥 루프 안에서 hang = 2로 매번 다시 초기화해야 해요. 2×2, 2×3, 3×2, 3×3.' },
        { type: 'mc', q: '범위의 원칙에 따르면, 일상생활의 "11~20" 구간을 컴퓨터에서는 어떻게 나타낼까요?', choices: ['10~20 (20은 제외)', '11~20 (20 포함)', '11~21 (21 포함)', '10~19 (19 포함)'], answer: 0, explain: '범위의 원칙: 끝 요소는 제외하고 직전까지만 포함. 그래서 구간이 0~10, 10~20, 20~30처럼 깔끔하게 이어져요.' },
      ],
      summary: [
        '`while 조건:` 조건이 참인 동안 반복 · 조건을 바꾸는 문장이 없으면 **무한 루프**',
        '`for 변수 in 컬렉션:` 요소를 순서대로 꺼내며 반복',
        '`range(끝)` 0부터 · `range(시작, 끝)` · `range(시작, 끝, 증가)` → **끝은 미포함** (`range(1, 10)` = 1~9)',
        '`%`로 배수 판별 (`x % 10 == 0`) · `print(..., end="")`로 한 줄 출력',
        '`break` 루프 종료 후 다음 명령으로 · `continue` 나머지 건너뛰고 다음 반복',
        '이중 루프: 바깥 1회당 안쪽 전체 반복 · 들여쓰기 주의 · while 이중 루프는 안쪽 변수를 매번 다시 초기화',
        '범위의 원칙: 끝 요소 제외 (구간 나누기 편의) · **오프셋**은 기준에서의 상대 거리, 0부터',
      ],
      traps: ['`range(1, 10, 3)`은 1, 4, 7 (10 미포함)', 'break와 continue를 바꿔 묻는 문제', 'for문 안/밖 print의 들여쓰기 차이'],
    },
  ],
});
