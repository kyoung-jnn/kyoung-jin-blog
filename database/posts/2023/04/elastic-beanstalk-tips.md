---
title: AWS Elastic Beanstalk, Docker ECS 배포 이슈
date: 2023-04-30
summary: AWS Elastic Beanstalk 배포 삽질기
publish: true
---

최근 회사 프로젝트의 배포 방식을 [AWS Elastic BeanStalk](https://docs.aws.amazon.com/ko_kr/elasticbeanstalk/latest/dg/Welcome.html)의 **Docker ECS 플랫폼**을 이용하도록 전환하고 있다.
당연히 몇가지 이슈를 격었는데 이번 포스팅은 해당 몇가지 이슈들에 대한 해결법과 고찰을 담았다. 🥹

# 왜 Elastic Beanstalk 인가

현재 업무 특성상 빠르게 가설을 검증해야 한다. 프로덕트를 빠르게 만들고 시장의 반응과 방향성을 판단하는 시간도 부족한데 배포 아키텍쳐의 큰 투자를 할 수가 없었다. 당연히 배포 아키텍쳐가 중요한 것은 인지하고 있으나 현실적으로 Devops 엔지니어가 따로 없고 리소스가 부족했다.

위와 같은 이유로 **Elastic Beanstalk**을 선택했다. **EB**가 인스턴스 유형, 무중단 배포, 로드 밸런싱 등등 배포 및 관리에 대한 리소스를 줄여주고 프로덕트 개발자는 프로덕트(웹, 앱)에 자신의 리소스를 더 사용하기 위함이 컸다.

# 로그는 정답을 알고 있다.

**Elastic Beanstalk (EB)** 은 로그를 기록해준다. 환경에서 로그 탭에 들어가면 현재 애플리케이션 실행에 관련된 로그들을 전부 볼 수 있다. 그 중 나는 아래 파일들을 주로 확인하며 이슈를 해결했다.

- eb-engine: EB의 진행 상태를 알 수 있다.
- eb-ecs-mgr: ECS의 task 실행 상태를 알 수 있다.

> 로그들에서 **Fail, Failed, Failure**을 검색해서 배포 이슈를 해결하면 수월하다.

# EC2 메모리 이슈

**EB**도 결국 [EC2](https://aws.amazon.com/ko/ec2/)를 기반으로 동작한다. **EB**는 환경을 구성할때 플랫폼을 선택하지만 해당 플랫폼을 구동시키기 최적화된 **EC2**를 생성주는 것. 내가 선택한 플랫폼인 **Docker ECS 플랫폼**은 **ECS**에서 Docker Host를 **EC2**로 띄워두고 우리가 `Dockerrun.aws.json`에 작성한 Docker 컨테이너들을 해당 **EC2** 환경에서 관리해준다.

알다시피 **EC2**는 수많은 인스턴스 유형이 있다. ➡️ [AWS EC2 인스턴스 유형 참고표](https://aws.amazon.com/ko/ec2/instance-types/)

**내가 했던 실수**는 작은 메모리(micro)를 갖고 있던 EC2를 선택했던 것.

```json
{
  "AWSEBDockerrunVersion": "2",
  "containerDefinitions": [
    {
      "name": "~",
      "image": "~",
      "memory": 1024,
      ...
    },
    {
      "name": "~",
      "image": "~",
      "memory": 1024,
      ...
    }
  ]
}
```

`Dockerrun.aws.json`을 보면 '각각의 컨테이너가 메모리를 얼마나 사용할 것이냐' 를 지정할 수 있다. 각각의 컨테이너가 **1GiB**를 사용하게 했다. 총 합은 **2GiB**

- t3.micro의 메모리는 **1GiB** < 기술한 컨테이너들 **2GiB**

> **오, 이렇게 되면 당연히 돌아갈 일 없다. 🤯** `t3a.medium`으로 유형을 변경하고 해당 이슈를 해결했다.

EB 환경에서 애플리케이션을 구성할 때 **다수의 인스턴스 유형**을 선택할 수 있는데 EB가 애플리케이션의 상태를 판단하여 자동으로 인스턴스 유형을 낮추거나 높이는 **스케일링** 역할을 해준다고 한다. 따라서 **애플리케이션의 인스턴스의 최소 유형 판단이 반드시 필요하다.**

# Dockerrun.aws.json의 컨테이너 이름 이슈

```json
{
  "AWSEBDockerrunVersion": "2",
  "containerDefinitions": [
    {
      "name": "web-project-container",
      ...
    },
    {
      "name": "nginx",
      ...
    }
  ]
}
```

`Dockerrun.aws.json`의 **name**은 **docker 컨테이너 이름**을 의미한다. 해당 파일이 **docker compose** 역할을 해준다고 보면 된다.

```nginx
http {
    upstream web {
        server web-project-container:3000;
    }
}
```

> 따라서 **nginx**에서 정의한 컨테이너 이름을 사용할 때 `Dockerrun.aws.json`에서 설정한 **name**과 동일한 값을 사용해야 한다.

# 결국 EB는 대부분을 알아서 해주지만...

결국 `Elastic Beanstalk`를 이용하기 위해 내부적으로 사용하는 **AWS**의 주요 기능들의 개념을 익혀야했다...😔

역시 쉽게되는 건 없다는 것을 또 배웠다. 그래도 **VPC, EC2, 로드밸런서, ECS, ECR, Route53, S3** 등등 **AWS**의 주요 기능들의 역할과 개념, 작동시키는 법을 확실히 알았다.

이러한 개념없이 나중에 배포 과정에서 문제가 생기면 그게 더 끔찍하다. 이러한 삽질은 오히려 좋아
