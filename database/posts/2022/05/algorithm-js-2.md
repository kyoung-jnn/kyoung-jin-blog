---
title: 프로그래머스 | 자바스크립트(JavaScript) - 거리두기 확인하기 (BFS) (카카오 기출)
date: '2022-05-02'
tags: ['javascript', 'algorithm']
summary: 프로그래머스 카카오 기출 문제
publish: true
---

# 문제 설명 📝

[링크](https://programmers.co.kr/learn/courses/30/lessons/81302)

# 문제 풀이 ✍

맨해튼 거리를 기준으로 2 이하를 안된다는 조건이 있기 때문에
다른 알고리즘 없이 단순한 Brute force로 배열의 정점을 돌으며 2 이하만 탐색해줘도 됩니다.

하지만 BFS를 사용하고 싶어서 BFS를 활용했습니다.
P 인 배열의 값 기준으로 BFS를 시작하여 맨해튼 거리를 계산하며 2를 초과하지 않도록 탐색합니다.

```
// 맨해튼 거리 계산
const isManhattan = (x1, y1, x2, y2) => {
return Math.abs(x1 - x2) + Math.abs(y1 - y2) <= 2 ? true : false;
};
```

위 함수를 이용하여 맨해튼 거리를 계산했습니다.

---

```javascript
// 동 서 남 북
const dX = [1, -1, 0, 0];
const dY = [0, 0, 1, -1];

const inRange = (x, y) => {
  return 0 <= x && x < 5 && 0 <= y && y < 5;
};

const isManhattan = (x1, y1, x2, y2) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2) <= 2 ? true : false;
};

const BFS = (place, visited) => {
  const queue = [];

  // 1. 모든 좌표 하나씩 탐색
  for (let startX = 0; startX < 5; startX++) {
    for (let startY = 0; startY < 5; startY++) {
      if (place[startY][startX] === 'P') {
        queue.push([startY, startX]);

        // BFS는 반복문!
        while (queue.length) {
          let [y, x] = queue.shift();
          visited[y][x] = true;

          // 2. 동서남북 탐색
          for (let i = 0; i < 4; i++) {
            const nextX = x + dX[i];
            const nextY = y + dY[i];

            if (
              inRange(nextX, nextY) &&
              isManhattan(startX, startY, nextX, nextY) &&
              !visited[nextY][nextX]
            ) {
              if (place[nextY][nextX] === 'P') {
                // 3-1. 거리내에 사람존재
                return 0;
              } else if (place[nextY][nextX] === 'O') {
                queue.push([nextY, nextX]);
              }
            }
          }
        }
      }
    }
  }

  // 3-2. 모든 조건 만족
  return 1;
};

function solution(places) {
  const answer = [];

  places
    .map((place) => place.map((temp) => temp.split('')))
    .forEach((place) => {
      let visited = Array.from({ length: 5 }, () => Array(5).fill(false)); // 방문을 확인하기 위한 이중 배열 생성
      answer.push(BFS(place, visited));
    });

  return answer;
}
```
