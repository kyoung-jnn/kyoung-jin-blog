---
title: Command PhaseScriptExecution failed with a nonzero exit code, rsync link_stat "~" failed No such file or directory 해결법
date: 2023-04-26
summary: 지상 최악의 IDE, Xcode
publish: true
---

**Xcode 14** 업데이트 후 앱을 아카이빙하려는데 위와 같은 오류가 터졌다. 정확히는 **Xcode 14.3**...
분명히 문제가 생길게 뻔해서 업데이트하기 싫었는데 **iOS 16.2** 실제 기기 디버깅 연결이 안돼서 어쩔 수 없이 해버렸다. (당해버렸다.) 😇

> 왜 **Xcode**는 업데이트마다 우릴 괴롭힐까?

# 해결하기

### AS-IS

```sh
source="$(readlink "${source}")"
```

### TO-BE

```sh
source="$(readlink -f "${source}")"
```

- Xcode를 키고 에러가 발생한 프로젝트들 연다.
- `CMD + Shift + F`로 프로젝트 **Workspace**에서 **위 코드 (AS-IS)** 를 검색을 한다. `Pods/Target Support Files/Pods-App/Pods-App-frameworks.sh` 경로에서 찾을 수 있다.
- 아마 테스트 어플과 본 어플에 파일들이 존재할텐데, 2개 다 수정해준다.
- 다시 아카이빙 혹은 빌드하면 끝

**Xcode 14.3** 부터는 `-f` 옵션이 없을 경우 **심링크(symbolic link)** 대상 파일이 존재하지 않아도 해당 파일을 가르키게 된다고 한다. 따라서 존재하지 않는 파일을 가르키므로 문제가 발생했던 것. `-f` 옵션을 줌으로써 **심링크 대상이 존재하지 않을 경우는 아무 반환을 하지 않아서 파일을 찾을 때 오류가 발생하지 않는다.**
