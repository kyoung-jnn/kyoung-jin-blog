---
title: M1 맥북 Xcode 시뮬레이터 빌드 오류 해결법
date: 2023-05-28
summary: iOS arm64, x84_64 Architecture 프로세서 빌드 오류
publish: true
---

기존의 USE 연결을 통한 실제 기기 테스트를 하다가 **Xcode에서 iPhone 시뮬레이터를 실행**시키려는데 빌드 오류가 발생했다.

# 원인

`Xcode 12` 이후, `애플 실리콘 (ARM) 프로세서`를 지원하면서 Xcode에 **ARM 아키텍쳐**가 추가되었다. 따러서 기존의 `인텔 (x86_64) 프로세서`를 포함하여 **ARM**, **x86_64** 아키텍쳐 2개가 Xcode에서 공존하게 되었다.

Xcode의 시뮬레이터는 사용자의 맥의 프로세서를 따르므로 만약 **애플 실리콘 (ARM)** 을 사용하고 있다면 **인텔 칩을 위한 x86_64 아키텍쳐를 제외시켜줘야 한다.** 인텔 칩을 사용한다면 반대로 생각!

> 팀단위 프로젝트를 진행한다면 팀원 중 **Intel 맥 (x86_64)** 을 사용하는 팀원이 있는지 알아봐야 한다.

# 해결하기

- Xcode로 프로젝트 `xcworkspace` 열기
- `Build Settings` > `Targets` 에서 자신의 프로젝트 클릭
- `Excluded Architectures`의 `Debug`에 **x86_64** 추가

> `Release` 같은 경우 실제 사용자의 기기가 어떤 아키텍쳐를 쓸지 모르기 때문에 건드리지 않는다.

<Image auto={true} src="/posts/2023/05/xcode-architecture-build-error/xcode.png" />

본인 같은 경우는 실제 기기에 연결해서 디버깅할 경우가 잦아서 **iOS SDK**에서는 따로 지정을 하지 않고 **iOS Simulator SDK**에만 추가를 했다. 🤭
