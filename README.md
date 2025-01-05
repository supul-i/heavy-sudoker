# Heavy Sudoker

<p align="center">
  <img width="180px" src="src/assets/readme/logo.png" />
</p>

<p align="center">Heavy Sudoker는 3D 큐브 형태로 클래식 스도쿠 퍼즐을 즐길 수 있는 게임입니다.</p>

<p align="center">
  <a href="https://heavy-sudoker.netlify.app/">Deployed website</a>
  <span> | </span>
  <a href="https://github.com/supul-i/heavy-sudoker">Frontend Repository</a>
</p>

<br>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-round&logo=JavaScript&logoColor=white">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-round&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-round&logo=tailwindCSS&logoColor=white">
  <br>
  <img src="https://img.shields.io/badge/Zustand-8d6d40?style=flat-round&logo=Zustand&logoColor=white">
  <img src="https://img.shields.io/badge/Three.js-333333?style=flat-round&logo=Three.js&logoColor=white">
  <img src="https://img.shields.io/badge/R3F-3B66BC?style=flat-round&logo=R3F&logoColor=white">
  <img src="https://img.shields.io/badge/Git-FC6D26?style=flat-round&logo=Git&logoColor=white">
</p>

<br>


# 목차

- [게임 규칙](#%EA%B2%8C%EC%9E%84-%EA%B7%9C%EC%B9%99)
- [기능](#%EA%B8%B0%EB%8A%A5)
  * [단순하게 생성되는 스도쿠 로직 개선하기](#%EB%8B%A8%EC%88%9C%ED%95%98%EA%B2%8C-%EC%83%9D%EC%84%B1%EB%90%98%EB%8A%94-%EC%8A%A4%EB%8F%84%EC%BF%A0-%EB%A1%9C%EC%A7%81-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0)


<br>


# 게임 규칙

일반적인 스도쿠 규칙과 거의 동일합니다. 처음 주어진 퍼즐(9x9, 총 81칸의 정사각형)엔 숫자가 일부 채워져 있고 나머지 빈 칸을 다음 규칙에 맞게 넣어야 합니다. 3D 큐브의 각 면마다 스도쿠 문제가 있으며 전체 9개의 스도쿠를 모두 완성하면 게임이 종료됩니다.

<p align="center">
  <img width="200px" src="src/assets/readme/rule.png" />
</p>

* 1부터 9까지의 숫자가 중복되지 않도록 한 번만 넣어 각각의 가로 줄과 세로 줄을 채워야 합니다.

* 1부터 9까지의 숫자가 중복되지 않도록 한 번만 넣어 3x3 블록을 채워야 합니다.

* 같은 줄이나 블록에서 하나 이상의 숫자가 같다면 틀린 풀이가 됩니다.

<br>


# 기능

| 메인 페이지                                                    | 스도쿠 페이지 (3D)                                                                                                                    | 스도쿠 페이지 (2D)                                                   |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| ![main](src/assets/readme/main.png)                      | ![3D](src/assets/readme/3D-View.png)                                                                                            | ![2D](src/assets/readme/2D-View.png)                           |
| ● 스도쿠의 난이도를 선택할 수 있습니다<br>● 어려운 난이도일수록 주어진 숫자의 개수가 적어집니다. | ● 메인 페이지에서 난이도 선택 후 처음 보여지는 화면입니다.<br>● 뷰 전환: 하이라이트되어있는 부분의 스도쿠를 풀 수 있는 2D 보드로 전환됩니다.<br>● 펼쳐보기: 각각 분리된 9개의 스도쿠 보드를 확인할 수 있습니다. | ● 좌측의 숫자로 스도쿠의 빈 칸을 채울 수 있습니다.<br>● 3D <-> 2D 보드 간의 전환이 가능합니다. |
---

* 총 9개의 스도쿠 풀이에 성공한다면 게임이 종료됩니다.
* 3D 스도쿠 보드에서는 마우스 좌클릭으로 보드 회전, 마우스 휠을 통해 확대/축소를 할 수 있습니다.

<br>


## 단순하게 생성되는 스도쿠 로직 개선하기

스도쿠 문제 생성 후 가로 방향으로 이동하며 채워진 숫자를 살펴봤을 때 2,3,4,5 또는 6,7,8,9 처럼 순차적으로 숫자가 채워져있는 경우가 나타났습니다. 난이도가 쉬울수록 사용자가 풀이해야 하는 빈 칸이 적기 때문에 단조로운 답으로 스도쿠가 생성된다면 너무 쉽게 게임이 끝날 가능성이 있었습니다.

기존 9x9 정사각형 크기의 스도쿠 문제는 아래와 같은 과정을 거쳐 생성되었습니다.
<p align="center">
  <img width="200px" src="src/assets/readme/diagonal-block.png" />
</p>

1. 대각선 3x3 블록부터 1부터 9까지의 숫자가 중복되지 않도록 채운다.
2. 첫 번째 줄부터 가로 방향으로 이동하며 나머지 빈 셀을 채운다.
3. 셀이 채워질 때마다 해당 셀이 포함되는 가로 줄, 세로 줄, 3x3 블록 각각 같은 숫자가 있는지 확인한다.
4. 모든 셀이 채워지면 스도쿠 문제를 담은 배열을 반환한다.

처음엔 보드의 셀이 모두 빈 칸이므로 스도쿠 규칙을 확인하는 제약 조건없이 채울 수 있는 곳은 대각선 방향의 블록이었습니다. 따라서 특별한 확인 절차없이 1 ~ 9의 숫자가 한 번만 들어가는 조건만을 고려하여 우선적으로 채워주었습니다. 그 뒤로는 순차적으로 위 과정과 같이 2번 ~ 4번 절차를 진행했습니다.

순차적인 숫자 배치의 원인은 2번 과정에서 일어났습니다. 빈 셀을 채울 때 1부터 9까지 순차적으로 넣으며 해당 셀에 적합한지 확인하는 절차를 가졌습니다. 예를 들어 1번째 줄의 4번째 빈 셀에 들어갈 수 있는 후보가 `[1,2,3,5,8,9]` 라고 한다면 해당 셀을 채울 때 배열의 첫 번째 인덱스부터 차례대로 넣으며 확인했습니다. 따라서 해당 셀에는 1이 채워지고 후보 배열에서 1이 삭제된 후 다음 셀에는 순차적으로 첫 번째 인덱스인 2가 채워질 수 있었습니다.

```js
// 빈 셀에서 확인할 후보 숫자 배열
let validNumbers = Array.from({ length: 9 }, (_, i) => i + 1);

  for (let numberOfAttempt = 9; numberOfAttempt > 0; numberOfAttempt--) {
   // validNumbers에서 무작위로 숫자 추출
    const randomIndex = getRandomNum(validNumbers.length);
    const randomNumber = validNumbers[randomIndex];

    if (isValid(sudoku, rowIndex, colIndex, randomNumber)) {

      sudoku[rowIndex][colIndex] = randomNumber;

      if (fillRemainCells(sudoku, rowIndex, colIndex + 1)) {
        return true;
      }

      sudoku[rowIndex][colIndex] = 0;
    } else {
      validNumbers.splice(randomIndex, 1);
    }
  }
```
이를 해결하기 위해서 빈 셀에 채워질 수 있는 후보 숫자들을 넣는 방식을 변경해야 했습니다. 후보 숫자가 담긴 배열의 인덱스를 랜덤으로 선택하게 하여 빈 셀에 넣게 로직을 변경했고 그 결과 배열 안의 요소가 무작위로 선정되어 단조로운 정답 패턴을 해결할 수 있었습니다.

<br>
