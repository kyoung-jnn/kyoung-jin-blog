---
title: 프로그래머스 | 자바스크립트(JavaScript) - 표 편집 (연결리스트) (카카오 기출)
date: '2022-05-04'
tags: ['javascript', 'algorithm']
summary: 프로그래머스 카카오 기출 문제
publish: true
---

# 문제 설명 📝

[링크](https://programmers.co.kr/learn/courses/30/lessons/81303)

# 문제 풀이 ✍

단순히 인덱스를 이용한 배열 제거, 추가로 문제를 풀면 효율성에서 오답처리가 됩니다.
삭제, 추가의 효율성을 위해 **`연결리스트`** 방식을 통해 문제를 해결해야합니다.

---

```javascript
function solution(n, k, cmd) {
  let answer = Array.from({ length: n }, () => 'O');
  let cursor = Number(k);

  const nodes = { 0: [n - 1, 1] };
  const trash = [];

  // 연결 리스트 노드 생성
  for (let i = 1; i < n; i++) {
    nodes[i] = i === n - 1 ? [i - 1, 0] : [i - 1, i + 1];
  }

  cmd.forEach((commands) => {
    const command = commands.split(' ');

    let count = 0;
    if (command[0] === 'U') {
      // 위
      while (count < Number(command[1])) {
        cursor = nodes[cursor][0];
        count += 1;
      }
    } else if (command[0] === 'D') {
      // 아래
      while (count < Number(command[1])) {
        cursor = nodes[cursor][1];
        count += 1;
      }
    } else if (command[0] === 'C') {
      // 삭제
      const temp = nodes[cursor];
      nodes[nodes[cursor][0]][1] = nodes[cursor][1];
      nodes[nodes[cursor][1]][0] = nodes[cursor][0];

      trash.push([cursor, nodes[cursor]]);
      delete nodes[cursor];

      // 마지막 행 여부 확인
      cursor = temp[1] === 0 ? temp[0] : temp[1];
    } else if (command[0] === 'Z') {
      // 되돌리기
      const [index, [prev, next]] = trash.pop();

      nodes[index] = [prev, next];
      nodes[prev][1] = index;
      nodes[next][0] = index;
    }
  });

  answer = answer.map((_, index) => {
    if (!nodes[index]) {
      return 'X';
    } else {
      return 'O';
    }
  });

  return answer.join('');
}
```
