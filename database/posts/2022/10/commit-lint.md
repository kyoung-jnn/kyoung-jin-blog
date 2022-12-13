---
title: lint-staged로 commit시 ESlint 자동으로 검사하기
date: '2022-10-01'
summary: git hooks과 lint-staged 사용하기
publish: true
---

# commit시 ESlint 자동화를 시켜보자

**협업을 할 때 우리는 결국 하나의 코드를 일정하게 유지해야 합니다.**

이를 위해서 주로 `컨벤션`을 정하거나 `ESlint` 설정을 통해 코드에 규칙을 부여하곤 하는데,
매번 코드를 저장소에서 올리기전 `lint` 검사를 하기가 쉽지는 않습니다..(귀찮기도)

> `git hooks`를 이용하여 **commit**시 **lint** 스크립트가 자동으로 실행되게 구성해봅시다.

### git hooks 🪝

**git**에서는 **commit**이 올라가기전 특정 스크립트를 수행할 수 있게 해주는 `git hooks`이라는 기능을 제공합니다.

> **commit**이 올라가기전, **갈고리를 걸어서 못 올라가게 하고** 스크립트 먼저 실행시키기~

## simple-git-hooks 설치 (git hooks 설정)

간단히 `git hooks` 추가를 위해 `simple-git-hooks` 패키지를 설치합니다.

```json
yarn add -D simple-git-hooks
```

```json
"scripts": {
    ...,
    "simple-git-hooks": "simple-git-hooks",
    "prepare": "yarn simple-git-hooks"
},
"simple-git-hooks": {
    "pre-commit": "yarn lint-staged"
}
```

**lint 자동 검사**는 `lint-staged` 패키지을 사용할 것이기 때문에, 위와 같이 `package.json`에 설정을 작성하고 `yarn simple-git-hooks`을 실행시킵니다.

그리고, `.git/hooks/pre-commit` 경로를 확인해보면 아래와 같은 **hooks** 파일이 설정되어 있습니다.

> `prepare 명령어`를 지정한 이유는 추후 프로젝트 레포를 **clone**할 때 **git hooks** 설정을 다시 자동으로 해주기 위함입니다.

```
#!/bin/sh
yarn lint-staged
```

이제 커밋이 **올라가기전(pre-commit)** 해당 스크립트(**yarn lint-staged**)를 실행시킬 것 입니다.

> `.git/hooks` 폴더에는 다양한 hooks들이 존재합니다. 😎

## lint-staged 설치

만약에 **git staging 상태**가 아닌 모든 파일들을 **lint** 검사하면 시간이 많이 걸리게 됩니다.
때문에, **git staging 상태** 파일들에 대해서만 **lint** 를 해줘야 합니다.

이를 위해 `lint-staged` 패키지를 설치해줍니다! 해당 패키지는 **staging** 파일들에게만 **lint** 검사를 실행합니다.

```json
yarn add -D lint-staged
```

```json
"scripts": {
   ...,
  "lint-staged": "lint-staged",
},
"lint-staged": {
    "**/*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
}
```

프로젝트의 **package.json**에 위와 같은 스크립트를 추가합니다. 저는 **.js, .ts** 파일 모두 **lint**를 원하고 `prettier` 설정 또한 자동으로 포멧팅되길 원하기 때문에 위와 같이 설정을 주었습니다.

## 테스트!

```
✔ Preparing lint-staged...
✔ Hiding unstaged changes to partially staged files...
❯ Running tasks for staged files...
  ❯ package.json — 2 files
    ❯ **/*.{js,jsx,ts,tsx} — 1 file
      ✖ eslint --fix [FAILED]
      ◼ prettier --write
↓ Skipped because of errors from tasks. [SKIPPED]
↓ Skipped because of errors from tasks. [SKIPPED]
✔ Reverting to original state because of errors...
✔ Cleaning up temporary files...

✖ eslint --fix:

- ESlint 틀린 부분 설명

✖ 1 problem (1 error, 0 warnings)

error Command failed with exit code 1.
```

이제 **ESlint 규칙이 고쳐지지 않은 파일**을 **commit**을 해보면 **commit**이 진행되지 않고 `고쳐야하는 ESlint 부분 설명과 함께 경고`를 나타내줍니다!
