---
title: JavaScript Object를 HashMap 처럼 쓰지 말자, 맵 객체 (Map Object)
date: 2023-04-23
summary: 맵 객체 (Map Object) 한번 써보면 헤어나오지 못해 🥹
publish: true
---

```js showLineNumbers
❌: const hashMap = {};
✅: const hashMap = new Map();
```

# HashMap, Map

**Java**에서는 key-value 형식의 데이터를 저장할 때, `HashMap`을 이용한다. 해시 함수를 통해서 value의 저장 위치가 결정되므로 **탐색**에서 탁월한 시간 복잡도(`O(1)`)를 보인다.
**JavaScript**에서는 key-value 형식의 데이터를 저장할때 일반 **Plain Object**를 사용하곤 한다.

```js showLineNumbers
const map = {};

// 1. key-value 넣기
map['key1'] = 'value1';
map['key2'] = 'value2';
map['key3'] = 'value3';

// 2. 특정 key를 가지고 있는지 확인
if (map.hasOwnProperty('key1')) {
  console.log('Map contains key1');
  console.log(map['key1']);
}

// 3. 특정 key의 value 확인
```

**하지만**, HashMap과 같이 key-value 자료형 저장에 특화된 객체가 존재하는데 그것이 바로 `Map` 이다!
JavaScript, `Map`의 특징들을 알아보자.

# Map 기본 함수

```js showLineNumbers
// 생성자를 통해서 생성
const map = new Map();
map.set('latest', '최신순');

// 이중 배열로 한번에 생성도 가능
const map = new Map([
  ['latest', '최신순'],
  ['view', '조회순'],
]);

// 맵 size 반환
map.size; // size: 2

// key-value 넣기
map.set(key, value);
map.set('oldest', '오래된순');

// 특정 key로 value 구하기
map.get(key);
map.get('view'); // '조회순'

// 특정 key를 가지고 있는지 확인하기
map.has(key); // boolean
map.has('view'); // true

// 특정 key의 value 지우기
map.delete(key);

// 모든 key-value 지우기
map.clear();

// 맵 이터레이터 확인
map.entries(); // MapIterator
```

# Map 특징

## Key로 다양한 형식(타입)이 올 수 있다.

**Plain Object의** 경우 **문자열**(String), **심볼**(Symbol)만 객체의 프로퍼티로 올 수 있다.

**Map**의 경우 **숫자**(Number), **객체**(Object) 심지어 **함수**(Function)도 올 수가 있다. (모든 자료형)

```js showLineNumbers
const map = new Map();

const profileObject = { name: 'jin' };
map.set(profileObject, 'is Me');
map.set(200, 'Success');

console.log(map.get(profileObject)); // is Me
console.log(map.get(200)); // Success
```

## 순회가 쉽다.

**Plain Object**는 순회를 위해 Key들을 가져오고 해당 Key들을 통해서 다시 Value로 접근하면서 순회를 진행해야 했다. Map의 경우 내부적으로 **Iterator**를 제공하기 때문에 해당 **Iterator**를 통해서 **깔끔한 순회**가 가능해진다.

```js showLineNumbers
const plainObject = {
  item: '신발',
  brand: '나이키',
  price: '99000',
}
​
for (const key of Object.keys(plainObject)) {
  console.log(key, object[key]);
}
// or
for (const [key, value] of Object.entries(plainObject)) {
  console.log(key, value);
}
```

```js showLineNumbers
const map = new Map([
  ['item', '신발'],
  ['brand', '나이키'],
  ['price', '99000'],
]);
​
// MapIterator {'item' => '신발', 'brand' => '나이키', 'price' => '99000'}
map.entries();
​
for (const [key, value] of map) {
  console.log(key, value); // item 신발, brand 나이키, price 99000
}
```

## 크기 측정이 쉽다.

기존의 Object의 크기(size)를 구하기 위해 `Object.keys(...).length`를 이용했다.
`Object.keys(...)`를 이용해서 크기 탐색을 하므로 `O(n)`의 시간 복잡도를 가지게 된다.

반면 Map의 경우 **내부 프로퍼티로 size**를 제공하는데, 이를 이용할 경우 `O(1)`로 크기 탐색을 가능하게 한다.
맥북 프로를 기준으로 1000만개의 값을 탐색해서 크기를 구하는 경우 확연한 속도 차이가 있다고 한다.

> - Plain Object: ~1600ms
> - Map: < 1ms

```js showLineNumbers
const plainObject = {};
plainObject['key1'] = 1;
plainObject['key2'] = 1;
...
plainObject['key100'] = 1;

console.log(Object.keys(plainObject).length) // O(100), O(n)
```

```js showLineNumbers
const map = new Map();
map.set('key1', 1);
map.set('key2', 1);
...
map.set('key100', 1);

console.log(map.size) // O(1)
```

> 참고 [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Map) [포스팅](https://betterprogramming.pub/stop-using-objects-as-hash-maps-in-javascript-9a272e85f6a8)
