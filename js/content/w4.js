/* 4강 · 데이터 분석 라이브러리 (수업 자료 4: NumPy · pandas · matplotlib) */
window.PQ = window.PQ || { worlds: [], traces: {} };
PQ.worlds.push({
  id: 'w4',
  lecture: '4강',
  short: 'NumPy·pandas·matplotlib',
  title: '데이터 연구소',
  desc: 'NumPy 배열 · pandas 시리즈와 데이터프레임 · matplotlib 그래프',
  bossTitle: '4강 보스: 데이터 드래곤',
  stages: [
    /* ───────────────────────── 18. NumPy ───────────────────────── */
    {
      id: 's18', num: '18',
      title: 'NumPy 배열',
      sub: 'import numpy as np · ndarray · ndim/shape/size · arange · zeros · ones · random · reshape',
      goal: 'NumPy 배열을 만들고 차원·형태·크기를 읽고 바꿀 수 있다',
      lessons: [
        {
          title: 'NumPy란?',
          body: [
            '**NumPy**는 **Numerical Python**의 줄임말이에요.',
            '',
            '- **벡터 및 행렬 연산**에 매우 편리한 기능을 제공해요',
            '- 데이터 분석 라이브러리인 **pandas와 matplotlib의 기반**으로 쓰여요',
            '- 기본적으로 **array(행렬 개념)**라는 단위로 데이터를 관리해요',
            '',
            '**설치**: `pip install numpy` (구글 코랩에는 기본으로 설치되어 있어요)',
            '',
            '**사용**: `import numpy as np` → numpy 라이브러리를 **np라는 이름으로** 불러요',
          ],
          tip: '`as`는 별명을 붙이는 문법이에요. 매번 `numpy.array`라고 쓰는 대신 `np.array`로 짧게 써요. 거의 모든 사람이 np라는 별명을 써요.',
        },
        {
          title: '1차원 배열과 ndim · shape · size',
          body: [
            '`np.array(리스트)`로 배열(ndarray, 다차원 배열)을 만들어요.',
            '',
            '- **ndim** : 몇 **차원**인지',
            '- **shape** : 각 차원의 크기(형태). 1차원은 `(원소 수,)`, 2차원은 `(행, 열)`',
            '- **size** : **전체 원소의 개수**',
          ],
          code: `import numpy as np

a = np.array([0, 1, 2, 3])
print(a)
print((a.ndim, a.shape, a.size))`,
          output: '[0 1 2 3]\n(1, (4,), 4)',
          after: '배열은 print하면 리스트와 달리 **콤마 없이** `[0 1 2 3]`으로 나와요. `(4,)`에 콤마가 붙는 건 원소 하나짜리 튜플 표기예요.',
        },
        {
          title: '2차원 배열',
          body: '리스트 안에 리스트를 넣으면 2차원 배열(행렬)이 돼요. 3행 4열이니까 shape은 **(3, 4)**, 원소는 3 × 4 = **12**개예요.',
          table: [['', '열 0', '열 1', '열 2', '열 3'], ['행 0', '0', '1', '2', '3'], ['행 1', '4', '5', '6', '7'], ['행 2', '8', '9', '10', '11']],
          code: `import numpy as np

a = np.array([[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]])
print(a)
print((a.ndim, a.shape, a.size))`,
          output: '[[ 0  1  2  3]\n [ 4  5  6  7]\n [ 8  9 10 11]]\n(2, (3, 4), 12)',
        },
        {
          title: '3차원 배열',
          body: '2차원 배열을 여러 장 겹치면 3차원이에요. 아래는 3×4 행렬 **2장** → shape **(2, 3, 4)**, size 2 × 3 × 4 = **24**.',
          code: `import numpy as np

b1 = np.array([[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]])
b2 = np.array([[12, 13, 14, 15], [16, 17, 18, 19], [20, 21, 22, 23]])
b = np.array([b1, b2])
print((b.ndim, b.shape, b.size))`,
          output: '(3, (2, 3, 4), 24)',
          after: '리스트를 3겹으로 써서 `np.array([[[0,1,2,3], …], [[12,13,14,15], …]])`로 한 번에 만든 배열과 똑같은 구조예요.',
        },
        {
          title: '배열 만드는 함수들',
          table: [
            ['함수', '만드는 것', '예'],
            ['`np.arange(시작, 끝, 증감분)`', '범위의 수 (끝 미포함, 실수 간격 가능)', '`np.arange(0, 1, 0.1)` → 0.0 ~ 0.9'],
            ['`np.zeros(형태)`', '0으로 채운 배열 (실수)', '`np.zeros((2, 3))`'],
            ['`np.ones(형태)`', '1로 채운 배열 (실수)', '`np.ones((2, 3))`'],
            ['`np.random.rand(개수)`', '0과 1 사이 무작위 수로 채운 1차원 배열', '`np.random.rand(3)`'],
            ['`np.random.normal(평균, 표준편차, 개수)`', '정규분포를 따르는 무작위 수', '`np.random.normal(1, 2, 10)`'],
            ['`np.random.randint(시작, 끝, 개수)`', '시작 이상 **끝 미만** 무작위 정수', '`np.random.randint(0, 10, 2)`'],
          ],
          code: `import numpy as np

print(np.arange(0, 1, 0.1))
print(np.zeros((2, 3)))
print(np.ones((2, 3)))`,
          output: '[0.  0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9]\n[[0. 0. 0.]\n [0. 0. 0.]]\n[[1. 1. 1.]\n [1. 1. 1.]]',
          warn: '`np.random.randint(0, 10, 2)`의 10은 **포함되지 않아요** (0~9). 표준 모듈 `random.randint(1, 10)`은 10을 **포함**해요. 둘이 달라요!',
          tip: 'zeros와 ones에 형태를 줄 때는 괄호가 두 겹이에요: `np.zeros((2, 3))`. 안쪽 `(2, 3)`이 형태 튜플이에요.',
        },
        {
          title: 'reshape: 배열 형태 바꾸기',
          body: '`reshape()`은 원소는 그대로 두고 **배열의 형태만** 바꿔요. 단, **전체 원소 개수(size)가 같아야** 해요. 6개짜리는 (2, 3), (3, 2), (6,)은 되지만 (4, 2)는 안 돼요.',
          code: `import numpy as np

a = np.array([0, 1, 2, 3, 4, 5])
b = a.reshape(2, 3)
print(b)
print((b.ndim, b.shape, b.size))
c = b.reshape(3, 2)
print(c)
d = c.reshape(6,)
print(d, d.shape)`,
          output: '[[0 1 2]\n [3 4 5]]\n(2, (2, 3), 6)\n[[0 1]\n [2 3]\n [4 5]]\n[0 1 2 3 4 5] (6,)',
        },
      ],
      quiz: [
        { type: 'mc', q: '`import numpy as np`의 의미는?', choices: ['numpy를 np라는 이름으로 불러온다', 'np라는 새 모듈을 만든다', 'numpy를 설치한다', 'numpy에서 np 함수만 가져온다'], answer: 0, explain: 'as로 별명을 붙여요.' },
        { type: 'mc', q: '출력 결과는?', out: true, code: `import numpy as np
a = np.array([[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11]])
print(a.shape)`, choices: ['`(3, 4)`', '`(4, 3)`', '`12`', '`(2, 12)`'], answer: 0, explain: '3행 4열 → (행, 열) = (3, 4)' },
        { type: 'output', code: `import numpy as np
a = np.array([0, 1, 2, 3])
print(a.ndim)`, answer: '1', explain: '1차원 배열.' },
        { type: 'output', code: `import numpy as np
a = np.array([0, 1, 2, 3])
print(a.size)`, answer: '4', explain: '원소 4개.' },
        { type: 'mc', q: 'shape이 (2, 3, 4)인 배열의 size는?', choices: ['24', '9', '3', '(2, 3, 4)'], answer: 0, explain: '2 × 3 × 4 = 24' },
        { type: 'match', pairs: [['`ndim`', '차원 수'], ['`shape`', '각 차원의 크기(형태)'], ['`size`', '전체 원소 개수'], ['`reshape`', '배열의 형태 변경']], explain: 'NumPy 배열의 기본 속성.' },
        { type: 'mc', q: '`np.zeros((2, 3))`가 만드는 것은?', choices: ['0으로 채운 2행 3열 배열', '0부터 3까지의 배열', '2와 3으로 채운 배열', '길이 6인 빈 리스트'], answer: 0, explain: '형태 (2, 3), 값은 0.(실수)' },
        { type: 'mc', q: '`np.arange(0, 1, 0.1)`의 마지막 원소는?', choices: ['0.9', '1.0', '0.1', '1.1'], answer: 0, explain: '끝(1)은 포함하지 않아요.' },
        { type: 'mc', q: '`np.random.randint(0, 10, 2)`의 결과로 알맞은 것은?', choices: ['0 이상 10 미만 정수 2개', '0 이상 10 이하 정수 2개', '0~1 사이 실수 2개', '정수 10개'], answer: 0, explain: '(시작, 끝, 개수), 끝 미포함.' },
        { type: 'mc', q: '`np.random.normal(1, 2, 10)`의 의미는?', choices: ['평균 1, 표준편차 2인 정규분포 수 10개', '1부터 10까지 2씩 증가', '1과 2 사이 무작위 수 10개', '평균 2, 표준편차 1인 수 10개'], answer: 0, explain: '(평균, 표준편차, 개수)' },
        { type: 'output', code: `import numpy as np
a = np.array([0, 1, 2, 3, 4, 5])
print(a.reshape(2, 3).shape)`, answer: '(2, 3)', explain: '6개를 2행 3열로.' },
        { type: 'mc', q: '원소가 6개인 배열에 쓸 수 **없는** reshape은?', choices: ['`reshape(4, 2)`', '`reshape(2, 3)`', '`reshape(3, 2)`', '`reshape(6,)`'], answer: 0, explain: '4 × 2 = 8 ≠ 6' },
        { type: 'ox', q: '`np.ones((2, 3))`은 1로 채워진 2행 3열 배열을 만든다.', answer: true, explain: '값은 1.(실수)' },
        { type: 'output', code: `import numpy as np
print(np.arange(5))`, answer: '[0 1 2 3 4]', explain: '배열은 콤마 없이 출력돼요.' },
        { type: 'output', code: `import numpy as np
print(np.array([[1, 2], [3, 4]]).size)`, answer: '4', explain: '2 × 2 = 4' },
        { type: 'mc', q: 'NumPy에 대한 설명으로 **틀린** 것은?', choices: ['Numerical Python의 줄임말이다', 'pandas와 matplotlib의 기반이 된다', 'array 단위로 데이터를 관리한다', '그래프를 그리는 것이 주된 목적이다'], answer: 3, explain: '그래프는 matplotlib의 역할.' },
        { type: 'output', code: `import numpy as np
b = np.array([[0, 1, 2], [3, 4, 5]])
print(b.ndim, b.size)`, answer: '2 6', explain: '2차원, 원소 6개.' },
        { type: 'blank', q: 'numpy를 np라는 이름으로 불러오세요.', code: `___ numpy ___ np
a = np.array([1, 2, 3])`, options: ['import', 'as', 'from', 'in'], answer: ['import', 'as'], explain: 'import 모듈 as 별명' },
      ],
      summary: [
        '**NumPy** = Numerical Python · 벡터·행렬 연산 · pandas·matplotlib의 기반 · **array** 단위 관리',
        '설치 `pip install numpy` (Colab 기본) · `import numpy as np`',
        '`np.array(리스트)` · **ndim** 차원 수 · **shape** 형태 (1차원 `(4,)`, 2차원 `(행, 열)`) · **size** 전체 원소 수',
        '`np.arange(시작, 끝, 증감)` 끝 미포함 · `np.zeros((2, 3))` · `np.ones((2, 3))` (실수)',
        '`np.random.rand(n)` 0~1 · `np.random.normal(평균, 표준편차, n)` · `np.random.randint(시작, 끝, n)` **끝 미포함**',
        '`reshape(행, 열)`: 형태만 변경, **size가 같아야** 함',
      ],
      traps: ['`np.random.randint`는 끝 미포함 (random.randint는 포함)', 'zeros/ones는 괄호 두 겹', '3차원 shape (2, 3, 4) → size 24'],
    },

    /* ───────────────────────── 19. pandas ───────────────────────── */
    {
      id: 's19', num: '19',
      title: 'pandas 데이터 분석',
      sub: 'Series · DataFrame · rename · drop · loc/iloc · 행·열 추가 · 분석 함수 · axis · CSV',
      goal: '시리즈와 데이터프레임을 만들고, 원하는 행·열을 골라 계산할 수 있다',
      lessons: [
        {
          title: 'pandas란?',
          body: [
            '**pandas**는 **데이터 조작 및 분석**을 위한 라이브러리예요 (`https://pandas.pydata.org/`). 통계 언어 **R을 모티브**로 만들었어요.',
            '',
            '두 가지 자료구조를 지원해요.',
            '- **시리즈(Series)**: **1차원** 배열',
            '- **데이터프레임(DataFrame)**: **2차원** 배열 (표)',
            '',
            '**설치**: `pip install pandas` (코랩에는 기본 설치) · **사용**: `import pandas as pd`',
          ],
        },
        {
          title: '시리즈: 딕셔너리로 만들기',
          body: [
            '`pd.Series(데이터)`로 만들어요. **딕셔너리**를 넣으면 **키가 인덱스**, 값이 데이터가 돼요.',
            '',
            '마지막 줄의 `dtype`은 데이터의 자료형이에요 (`int64` = 정수).',
          ],
          code: `import pandas as pd

a = {"key1": 10, "key2": 20, "key3": 30, "key4": 40}
s = pd.Series(a)
print(s)`,
          output: 'key1    10\nkey2    20\nkey3    30\nkey4    40\ndtype: int64',
          after: '수업 예제처럼 `plt.plot(s)`, `plt.show()`를 하면 시리즈를 바로 그래프로 그릴 수도 있어요.',
        },
        {
          title: '시리즈: 리스트·튜플로 만들기',
          body: [
            '리스트나 튜플을 넣으면 인덱스가 **0, 1, 2…로 자동** 붙어요. `index=`로 인덱스 이름을 직접 정할 수도 있어요.',
            '',
            '여러 타입이 섞이면 dtype은 **object**가 돼요.',
          ],
          code: `import pandas as pd

a = ["string", 100, True]
s = pd.Series(a)
print(s)
s = pd.Series(a, index=["문자열", "정수값", "참거짓"])
print(s)`,
          output: '0    string\n1       100\n2      True\ndtype: object\n문자열    string\n정수값       100\n참거짓      True\ndtype: object',
        },
        {
          title: '데이터프레임 만들기',
          body: [
            '**데이터프레임**은 **2차원 배열(표)**이에요. **여러 개의 시리즈를 모아 놓은 형태**로, 엑셀이나 관계형 데이터베이스의 표와 비슷해요.',
            '',
            '- 딕셔너리로 만들면 **키가 열 이름(columns)**',
            '- 리스트의 리스트로 만들 땐 `index=`(행 이름), `columns=`(열 이름)을 지정할 수 있어요',
          ],
          code: `import pandas as pd

a = {"col0": [0, 1, 2], "col1": [3, 4, 5], "col2": [6, 7, 8]}
df = pd.DataFrame(a)
print(df)

df = pd.DataFrame([[1, 100, "A"], [2, 200, "B"]],
                  index=["ABC", "DEF"], columns=["번호", "점수", "반"])
print(df)`,
          output: '   col0  col1  col2\n0     0     3     6\n1     1     4     7\n2     2     5     8\n     번호   점수  반\nABC   1  100  A\nDEF   2  200  B',
        },
        {
          title: 'rename과 drop',
          body: [
            '- `rename(columns={"옛이름": "새이름"})` : 열 이름 바꾸기 · `rename(index={...})` : 행 이름 바꾸기',
            '- `drop([이름], axis=0)` : **행(row)** 삭제 · `drop([이름], axis=1)` : **열(column)** 삭제',
            '- `inplace=True` : 결과를 새로 만들지 않고 **원본 df를 직접 수정**',
          ],
          code: `import pandas as pd

df = pd.DataFrame([[1, 100, "A"], [2, 200, "B"]],
                  index=["ABC", "DEF"], columns=["번호", "점수", "반"])
df.rename(columns={"점수": "신청"}, inplace=True)
df.rename(index={"ABC": "가나다", "DEF": "라마바"}, inplace=True)
print(df)
df.drop(["가나다"], axis=0, inplace=True)
df.drop(["신청", "반"], axis=1, inplace=True)
print(df)`,
          output: '     번호   신청  반\n가나다   1  100  A\n라마바   2  200  B\n     번호\n라마바   2',
          tip: 'axis=0은 **행**, axis=1은 **열**. "0은 세로로 쌓인 행, 1은 가로로 늘어선 열"로 기억하세요.',
        },
        {
          title: 'loc과 iloc: 행 선택',
          table: [
            ['구분', 'loc', 'iloc'],
            ['대상', '인덱스 **이름** (index label)', '**정수형 위치** 인덱스 (integer position)'],
            ['범위', '범위의 **끝을 포함**', '범위의 **끝을 제외**'],
          ],
          code: `import pandas as pd

a = {"타입A": [90, 89, 93], "타입B": [83, 74, 85], "타입C": [86, 97, 74]}
df = pd.DataFrame(a, index=["P1", "P2", "P3"])
print(df)
print(df.loc["P1"])
print(df.iloc[1:3])
print(df.iloc[1, 2])`,
          output: '    타입A  타입B  타입C\nP1   90   83   86\nP2   89   74   97\nP3   93   85   74\n타입A    90\n타입B    83\n타입C    86\nName: P1, dtype: int64\n    타입A  타입B  타입C\nP2   89   74   97\nP3   93   85   74\n97',
          after: '`df.iloc[1:3]`은 1, 2번째 행(P2, P3)만 — 3은 제외. `df.iloc[1, 2]`는 1번째 행, 2번째 열의 값 97. `df.loc["P1":"P2"]`라면 P2까지 **포함**해요.',
        },
        {
          title: '열 선택, 행·열 추가, 값 변경',
          body: [
            '- `df["타입A"]` : 열 하나 선택 (시리즈로 나와요)',
            '- `df.iloc[[0, 2], [0, 1]]` : 0·2번째 행과 0·1번째 열',
            '- `df["타입D"] = 0` : 열 **추가** (모든 행에 0)',
            '- `df.loc["P4"] = [81, 91, 95, 84]` : 행 **추가**',
            '- `df.loc["P4", "타입A"] = 100` : 값 **변경**',
          ],
          code: `import pandas as pd

a = {"타입A": [90, 89, 93], "타입B": [83, 74, 85], "타입C": [86, 97, 74]}
df = pd.DataFrame(a, index=["P1", "P2", "P3"])
print(df["타입A"])
print(df.iloc[[0, 2], [0, 1]])
df["타입D"] = 0
df.loc["P4"] = [81, 91, 95, 84]
df.loc["P4", "타입A"] = 100
print(df)`,
          output: 'P1    90\nP2    89\nP3    93\nName: 타입A, dtype: int64\n    타입A  타입B\nP1   90   83\nP3   93   85\n    타입A  타입B  타입C  타입D\nP1   90   83   86    0\nP2   89   74   97    0\nP3   93   85   74    0\nP4  100   91   95   84',
        },
        {
          title: '데이터 분석용 함수',
          table: [
            ['함수', '기능'],
            ['`count`', '전체 성분 중 NaN(빈 값)이 아닌 값의 개수'],
            ['`min`, `max`', '최솟값, 최댓값'],
            ['`argmin`, `argmax`', '최솟값, 최댓값이 위치한 **정수** 인덱스'],
            ['`idxmin`, `idxmax`', '최솟값, 최댓값이 있는 **인덱스 이름**'],
            ['`quantile`', '특정 사분위수에 해당하는 값 (0~1 사이)'],
            ['`sum`', '합'],
            ['`mean`', '평균'],
            ['`median`', '중간값'],
            ['`mad`', '평균값과의 절대 편차(absolute deviation)의 평균 (pandas 2.0부터 삭제됨)'],
            ['`std`, `var`', '표준편차, 분산'],
            ['`+ - * /`', '사칙연산'],
          ],
          code: `import pandas as pd

a = {"타입A": [90, 89, 93, 100], "타입B": [83, 74, 85, 91], "타입C": [86, 97, 74, 95]}
df = pd.DataFrame(a, index=["P1", "P2", "P3", "P4"])
print(df.sum(axis=1))
print(df.sum(axis=0))
print(df.mean())`,
          output: 'P1    259\nP2    260\nP3    252\nP4    286\ndtype: int64\n타입A    372\n타입B    333\n타입C    352\ndtype: int64\n타입A    93.00\n타입B    83.25\n타입C    88.00\ndtype: float64',
          after: [
            '- `sum(axis=1)` → **행 방향 합**: 각 행(P1, P2…)마다 가로로 더한 값',
            '- `sum(axis=0)` → **열 방향 합**: 각 열(타입A…)마다 세로로 더한 값. `df.sum()`과 같아요',
          ],
          warn: 'axis가 헷갈리면: axis=1이면 결과가 **행마다** 하나(P1~P4), axis=0이면 결과가 **열마다** 하나(타입A~C).',
        },
        {
          title: '열끼리 계산하기',
          body: '열 전체끼리 사칙연산을 하면 **같은 행끼리** 계산돼서 새 열이 만들어져요.',
          code: `import pandas as pd

a = {"타입A": [90, 89, 93, 100], "타입B": [83, 74, 85, 91], "타입C": [86, 97, 74, 95]}
df = pd.DataFrame(a, index=["P1", "P2", "P3", "P4"])
df["A-B"] = df["타입A"] - df["타입B"]
df["A*B"] = df["타입A"] * df["타입B"]
print(df)`,
          output: '    타입A  타입B  타입C  A-B   A*B\nP1   90   83   86    7  7470\nP2   89   74   97   15  6586\nP3   93   85   74    8  7905\nP4  100   91   95    9  9100',
        },
        {
          title: 'CSV 파일 읽고 쓰기',
          body: [
            '**CSV**는 쉼표로 값을 구분한 텍스트 파일이에요. 엑셀에서 CSV로 저장할 수 있어요.',
            '',
            '- `pd.read_csv("파일.csv", index_col=0, header=0, encoding="euc-kr")` : CSV를 데이터프레임으로 읽기',
            '- `index_col=0` : **0번째 열**을 행 인덱스로 사용',
            '- `header=0` : **0번째 행**을 열 이름으로 사용',
            '- `encoding="euc-kr"` : 한글 윈도우 엑셀에서 만든 파일의 **한글 인코딩**',
            '- `df.to_csv("파일.csv", mode="w", encoding="euc-kr")` : 데이터프레임을 CSV로 저장',
          ],
          code: `import pandas as pd

cs = pd.read_csv("E:\\\\엑셀csv자료.csv", index_col=0, header=0, encoding="euc-kr")
cs["A/B"] = cs["타입A"] / cs["타입B"]
print(cs)
cs.to_csv("E:\\\\엑셀csv자료수정.csv", mode="w", encoding="euc-kr")`,
          output: '    타입A  타입B  타입C  A-B   A*B       A/B\nP1   90   83   86    7  7470  1.084337\nP2   89   74   97   15  6586  1.202703\nP3   93   85   74    8  7905  1.094118\nP4  100   91   95    9  9100  1.098901',
          noRun: true,
          tip: '경로의 `\\\\`는 윈도우 경로의 `\\`를 문자열에 쓰기 위한 확장열이에요. 코랩에서는 왼쪽 폴더 창에 파일을 올린 뒤 `pd.read_csv("파일.csv")`처럼 이름만 써요.',
        },
      ],
      quiz: [
        { type: 'mc', q: 'pandas의 Series와 DataFrame은 각각 몇 차원일까요?', choices: ['Series 1차원, DataFrame 2차원', 'Series 2차원, DataFrame 1차원', '둘 다 1차원', '둘 다 2차원'], answer: 0, explain: '시리즈 = 1차원, 데이터프레임 = 2차원(표).' },
        { type: 'mc', q: '`pd.Series({"key1": 10, "key2": 20})`의 인덱스는?', choices: ['key1, key2', '0, 1', '10, 20', '인덱스가 없다'], answer: 0, explain: '딕셔너리의 키가 인덱스가 돼요.' },
        { type: 'mc', q: 'loc과 iloc의 차이로 옳은 것은?', choices: ['loc은 인덱스 이름으로 끝 포함, iloc은 정수 위치로 끝 제외', 'loc은 정수 위치, iloc은 이름', '둘 다 끝을 포함', '둘 다 끝을 제외'], answer: 0, explain: '시험 단골! loc = label(이름, 끝 포함), iloc = integer(위치, 끝 제외).' },
        { type: 'output', code: `import pandas as pd
a = {"타입A": [90, 89, 93], "타입B": [83, 74, 85], "타입C": [86, 97, 74]}
df = pd.DataFrame(a, index=["P1", "P2", "P3"])
print(df.iloc[1, 2])`, answer: '97', explain: '1번째 행(P2), 2번째 열(타입C) → 97' },
        { type: 'mc', q: 'P1, P2, P3 행이 있는 df에서 `df.iloc[1:3]`이 선택하는 행은?', choices: ['P2, P3', 'P1, P2', 'P1, P2, P3', 'P2만'], answer: 0, explain: '위치 1, 2 (3은 제외).' },
        { type: 'mc', q: '같은 df에서 `df.loc["P1":"P2"]`가 선택하는 행은?', choices: ['P1, P2', 'P1만', 'P2, P3', 'P1, P2, P3'], answer: 0, explain: 'loc은 끝(P2)을 포함해요.' },
        { type: 'mc', q: '`df.drop(["반"], axis=1)`이 삭제하는 것은?', choices: ['"반" 열', '"반" 행', '첫 번째 행', '모든 열'], answer: 0, explain: 'axis=1 → 열.' },
        { type: 'mc', q: '`inplace=True`의 의미는?', choices: ['원본 데이터프레임을 직접 수정', '새 데이터프레임을 만들어 반환', '변경을 취소', '파일로 저장'], answer: 0, explain: 'inplace = 제자리에서.' },
        { type: 'mc', q: '`df.sum(axis=1)`이 계산하는 것은?', choices: ['각 행의 합 (행 방향 합)', '각 열의 합', '전체 합 하나', '행의 개수'], answer: 0, explain: 'axis=1 → P1, P2…마다 가로로 더한 합.' },
        { type: 'output', code: `import pandas as pd
df = pd.DataFrame({"타입A": [90, 89, 93, 100]})
print(df["타입A"].mean())`, answer: '93.0', explain: '(90 + 89 + 93 + 100) / 4 = 372 / 4 = 93.0' },
        { type: 'mc', q: '`idxmax`와 `argmax`의 차이는?', choices: ['idxmax는 최댓값의 인덱스 이름, argmax는 정수 위치', '둘은 같다', 'idxmax는 최댓값 자체', 'argmax는 최솟값'], answer: 0, explain: 'idx = 인덱스 이름, arg = 정수 위치.' },
        { type: 'match', pairs: [['`count`', 'NaN이 아닌 값의 개수'], ['`mean`', '평균'], ['`median`', '중간값'], ['`std`', '표준편차']], explain: '분석 함수.' },
        { type: 'mc', q: '모든 행에 0을 넣은 "타입D" 열을 추가하는 코드는?', choices: ['`df["타입D"] = 0`', '`df.loc["타입D"] = 0`', '`df.add("타입D")`', '`df.append("타입D")`'], answer: 0, explain: '열은 df["이름"] = 값' },
        { type: 'mc', q: '"P4" 행을 추가하는 코드는?', choices: ['`df.loc["P4"] = [81, 91, 95, 84]`', '`df["P4"] = [81, 91, 95, 84]`', '`df.iloc["P4"] = [81, 91, 95, 84]`', '`df.add_row("P4")`'], answer: 0, explain: '행은 df.loc["이름"] = [...]' },
        { type: 'mc', q: '`pd.read_csv("a.csv", index_col=0)`에서 `index_col=0`의 의미는?', choices: ['0번째 열을 행 인덱스로 사용', '0번째 행을 열 이름으로 사용', '인덱스를 만들지 않음', '0행부터 읽기'], answer: 0, explain: '열 이름은 header=0.' },
        { type: 'mc', q: '한글 윈도우 엑셀에서 만든 CSV를 읽을 때 수업에서 사용한 encoding은?', choices: ['`"euc-kr"`', '`"ascii"`', '`"latin-1"`', '`"hex"`'], answer: 0, explain: '한글 인코딩 euc-kr.' },
        { type: 'output', code: `import pandas as pd
s = pd.Series([10, 20, 30])
print(s.sum())`, answer: '60', explain: '10 + 20 + 30' },
        { type: 'output', code: `import pandas as pd
df = pd.DataFrame({"A": [5, 9, 7]}, index=["x", "y", "z"])
print(df["A"].idxmax())`, answer: 'y', explain: '최댓값 9가 있는 인덱스 이름 y.' },
        { type: 'output', code: `import pandas as pd
a = {"타입A": [90, 89, 93, 100], "타입B": [83, 74, 85, 91]}
df = pd.DataFrame(a, index=["P1", "P2", "P3", "P4"])
print(df.sum(axis=1)["P1"])`, answer: '173', explain: 'P1 행의 합: 90 + 83 = 173' },
        { type: 'blank', q: 'pandas를 불러와 데이터프레임을 만드세요.', code: `___ pandas as pd
df = pd.___({"A": [1, 2]})`, options: ['import', 'DataFrame', 'Series', 'from', 'array'], answer: ['import', 'DataFrame'], explain: '2차원 표는 DataFrame.' },
      ],
      summary: [
        '**pandas**: 데이터 조작·분석, R 모티브 · `import pandas as pd` · **Series**(1차원), **DataFrame**(2차원, 여러 시리즈 모음)',
        'Series: 딕셔너리 → 키가 인덱스 · 리스트/튜플 → 0, 1, 2… 자동 · `index=[...]`로 지정 · 섞인 타입은 dtype object',
        'DataFrame: 딕셔너리 → 키가 열 이름 · `pd.DataFrame(리스트, index=[...], columns=[...])`',
        '`rename(columns={...})` / `rename(index={...})` · `drop([...], axis=0)` 행 삭제 / `axis=1` 열 삭제 · `inplace=True` 원본 수정',
        '**loc** = 인덱스 이름, 끝 **포함** · **iloc** = 정수 위치, 끝 **제외** · `df["열"]` 열 선택 · `df.iloc[1, 2]` 값',
        '열 추가 `df["타입D"] = 0` · 행 추가 `df.loc["P4"] = [...]` · 값 변경 `df.loc["P4", "타입A"] = 100`',
        '분석: count · min/max · argmin/argmax(정수 위치) · idxmin/idxmax(인덱스 이름) · quantile · sum · mean · median · mad · std/var',
        '`sum(axis=1)` 행 방향 합(행마다) · `sum(axis=0)` = `sum()` 열 방향 합(열마다) · 열끼리 사칙연산 → 새 열',
        '`pd.read_csv(파일, index_col=0, header=0, encoding="euc-kr")` · `df.to_csv(파일, mode="w", encoding="euc-kr")`',
      ],
      traps: ['loc은 끝 포함, iloc은 끝 제외', 'axis=0 행 / axis=1 열 (drop 기준)', 'idxmax(이름) vs argmax(위치)'],
    },

    /* ───────────────────────── 20. matplotlib ───────────────────────── */
    {
      id: 's20', num: '20',
      title: 'matplotlib 그래프',
      sub: 'import matplotlib.pyplot as plt · plot · show · title · label · legend · 포맷 문자열',
      goal: '데이터로 선 그래프를 그리고 제목, 범례, 색과 선 모양을 지정할 수 있다',
      lessons: [
        {
          title: 'matplotlib이란?',
          body: [
            '**matplotlib**은 데이터를 **시각화**할 때 쓰는 라이브러리예요 (`https://matplotlib.org`). 2D 형태의 그래프, 이미지 등을 그려요.',
            '',
            '**설치**: `python -m pip install -U matplotlib` (코랩에는 기본 설치)',
            '',
            '**사용**: `import matplotlib.pyplot as plt` → **plt라는 이름으로** 불러요',
          ],
          tip: '여기 그래프들은 이해를 돕는 미리보기예요. 실제 그래프는 코랩에서 같은 코드를 실행해 확인해 보세요.',
        },
        {
          title: 'plot(데이터): 1차원 데이터 그래프',
          body: [
            '`plt.plot([10, 20, 30, 40])`처럼 데이터를 하나만 주면 그 값들이 **y축**이 되고, **x축은 자동으로 0, 1, 2, 3**(인덱스)이 돼요.',
            '',
            '`plt.show()`를 호출해야 그래프가 화면에 나타나요.',
          ],
          code: `import matplotlib.pyplot as plt

plt.plot([10, 20, 30, 40])
plt.show()`,
          noRun: true,
          chart: { series: [{ y: [10, 20, 30, 40] }] },
        },
        {
          title: 'plot(x, y): x축과 y축 데이터',
          body: '데이터를 두 개 주면 `plt.plot(x축 데이터 셋, y축 데이터 셋)`으로 쓰여요.',
          code: `import matplotlib.pyplot as plt

plt.plot([10, 20, 30, 40], [10, 20, 30, 40])
plt.show()`,
          noRun: true,
          chart: { series: [{ x: [10, 20, 30, 40], y: [10, 20, 30, 40] }] },
        },
        {
          title: '제목과 범례',
          body: [
            '- `plt.title("제목")` : 그래프 제목',
            '- `plt.plot(x, y, label="이름")` : 선마다 범례에 표시할 이름',
            '- `plt.legend()` : **범례 표시하기** (label만 줘서는 안 보이고 legend를 불러야 보여요)',
          ],
          code: `import matplotlib.pyplot as plt

plt.title("Can you see the title?")
plt.plot([15, 20, 25, 30], [10, 20, 30, 40], label="First Group")
plt.plot([15, 20, 25, 30], [40, 30, 20, 10], label="Second Group")
plt.legend()
plt.show()`,
          noRun: true,
          chart: { title: 'Can you see the title?', legend: true, series: [{ x: [15, 20, 25, 30], y: [10, 20, 30, 40], label: 'First Group' }, { x: [15, 20, 25, 30], y: [40, 30, 20, 10], label: 'Second Group' }] },
        },
        {
          title: '색상과 선 모양 바꾸기',
          body: [
            'plot에 **포맷 문자열**을 주면 색·마커·선 모양을 한 번에 정해요. 보통 **색 + 마커 + 선** 순서로 써요.',
            '',
            '- `"bo:"` → **b**(파란색) + **o**(원 마커) + **:**(점선)',
            '- `"rv--"` → **r**(빨간색) + **v**(아래 삼각형 마커) + **--**(대시선)',
          ],
          table: [
            ['종류', '기호'],
            ['색', '`b` 파랑 · `g` 초록 · `r` 빨강 · `c` 청록 · `m` 자홍 · `y` 노랑 · `k` 검정 · `w` 흰색'],
            ['마커', '`o` 원 · `v` 아래 삼각형 · `^` 위 삼각형 · `s` 사각형 · `*` 별 · `.` 점'],
            ['선', '`-` 실선 · `--` 대시선(파선) · `:` 점선 · `-.` 대시-점선'],
          ],
          code: `import matplotlib.pyplot as plt

plt.title("Can you see the title?")
plt.plot([10, 20, 30, 40], "bo:", label="First Group")
plt.plot([40, 30, 20, 10], "rv--", label="Second Group")
plt.legend()
plt.show()`,
          noRun: true,
          chart: { title: 'Can you see the title?', legend: true, series: [{ y: [10, 20, 30, 40], color: 'b', marker: 'o', dash: ':', label: 'First Group' }, { y: [40, 30, 20, 10], color: 'r', marker: 'v', dash: '--', label: 'Second Group' }] },
        },
      ],
      quiz: [
        { type: 'mc', q: 'matplotlib을 plt라는 이름으로 불러오는 코드는?', choices: ['`import matplotlib.pyplot as plt`', '`import plt`', '`from matplotlib import plt`', '`import matplotlib as pyplot`'], answer: 0, explain: 'pyplot 모듈을 plt라는 별명으로.' },
        { type: 'mc', q: '`plt.plot([10, 20, 30, 40])`에서 x축 값은?', choices: ['0, 1, 2, 3', '10, 20, 30, 40', '1, 2, 3, 4', 'x축이 없다'], answer: 0, explain: '데이터가 하나면 y축이 되고 x축은 인덱스(0부터).' },
        { type: 'mc', q: '그래프를 화면에 표시하는 함수는?', choices: ['`plt.show()`', '`plt.plot()`', '`plt.draw_all()`', '`plt.print()`'], answer: 0, explain: 'plot은 그리기, show는 보여주기.' },
        { type: 'mc', q: '범례를 표시하는 함수는?', choices: ['`plt.legend()`', '`plt.label()`', '`plt.title()`', '`plt.show()`'], answer: 0, explain: 'label은 plot의 인수, 표시는 legend().' },
        { type: 'mc', q: '그래프 제목을 붙이는 함수는?', choices: ['`plt.title()`', '`plt.name()`', '`plt.legend()`', '`plt.head()`'], answer: 0, explain: 'plt.title("...")' },
        { type: 'match', pairs: [['`b`', '파란색'], ['`r`', '빨간색'], ['`o`', '원 마커'], ['`--`', '대시선(파선)']], explain: '포맷 문자열 기호.' },
        { type: 'mc', q: '포맷 문자열 `"bo:"`의 의미는?', choices: ['파란색, 원 마커, 점선', '검은색, 원 마커, 실선', '파란색, 사각형, 대시선', '빨간색, 원 마커, 점선'], answer: 0, explain: 'b 파랑 + o 원 + : 점선' },
        { type: 'mc', q: '포맷 문자열 `"rv--"`의 의미는?', choices: ['빨간색, 아래 삼각형 마커, 대시선', '빨간색, 위 삼각형, 점선', '초록색, 아래 삼각형, 실선', '빨간색, 원 마커, 대시선'], answer: 0, explain: 'r 빨강 + v 아래 삼각형 + -- 대시선' },
        { type: 'order', q: '범례가 있는 그래프를 그리는 코드를 완성하세요.', lines: ['import matplotlib.pyplot as plt', 'plt.plot([1, 2, 3], label="A")', 'plt.legend()', 'plt.show()'], explain: '임포트 → 이름 붙여 그리기 → 범례 → 표시.' },
        { type: 'blank', q: '범례에 표시할 이름을 지정하세요.', code: `plt.plot([10, 20, 30], ___="First Group")
plt.legend()`, options: ['label', 'title', 'name', 'legend'], answer: ['label'], explain: 'plot(..., label="이름")' },
        { type: 'ox', q: '`label`을 지정하더라도 `plt.legend()`를 호출해야 범례가 보인다.', answer: true, explain: 'legend()가 범례를 표시해요.' },
        { type: 'mc', q: 'matplotlib의 주된 용도는?', choices: ['데이터 시각화(그래프 그리기)', '데이터베이스 관리', '웹 서버 만들기', '난수 생성'], answer: 0, explain: '2D 그래프, 이미지.' },
        { type: 'mc', q: '`plt.plot(x, y)`에서 첫 번째 인수는?', choices: ['x축 데이터', 'y축 데이터', '그래프 제목', '선 색상'], answer: 0, explain: 'plot(x축 데이터 셋, y축 데이터 셋)' },
        { type: 'mc', q: '수업에서 소개한 matplotlib 설치 명령은?', choices: ['`python -m pip install -U matplotlib`', '`pip remove matplotlib`', '`import install matplotlib`', '`python matplotlib.py`'], answer: 0, explain: '-U는 최신 버전으로 업그레이드 설치.' },
      ],
      summary: [
        '**matplotlib**: 데이터 시각화, 2D 그래프·이미지 · 설치 `python -m pip install -U matplotlib` · `import matplotlib.pyplot as plt`',
        '`plt.plot(데이터)` → 값이 y축, x축은 0, 1, 2… · `plt.plot(x, y)` · `plt.show()`로 표시',
        '`plt.title("제목")` · `plt.plot(..., label="이름")` + `plt.legend()` 범례 표시',
        '포맷 문자열 = 색 + 마커 + 선: `"bo:"` 파랑·원·점선 · `"rv--"` 빨강·아래삼각형·대시선',
        '색 b g r c m y k w · 마커 o v ^ s * . · 선 `-` `--` `:` `-.`',
      ],
      traps: ['데이터 하나면 x축은 인덱스(0부터)', 'label만으로는 범례가 안 보임 (legend 필요)', '":"는 점선, "--"는 대시선'],
    },
  ],
});
