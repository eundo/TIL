# Case Studies

현업에서 마주친 문제를 어떻게 분석하고, 어떤 기술적 판단으로 해결했는지 정리합니다.
채용/협업 관점에서 역할, 구현 방식, 운영 리스크를 빠르게 확인할 수 있도록 사례 중심으로 묶었습니다.

<!-- truncate -->

---

## 대표 실무 사례

<div className="case-study-list">
  <a href="/blog/dev-story/실시간%20로그적재%20배치개발">
    <span>Spring Batch · Multi-thread</span>
    <strong>실시간 로그적재 배치 개발</strong>
    <p>대용량 로그 파일을 주기적으로 읽어 DB에 적재하고, 이어 읽기와 후처리로 중복 처리 리스크를 낮춘 사례입니다.</p>
  </a>
  <a href="/blog/dev-story/API%20비동기호출%20데이터처리%20개발">
    <span>Async API · Retry · State</span>
    <strong>API 비동기호출 데이터처리 개발</strong>
    <p>여러 API 호출 결과를 안정적으로 종합하기 위해 완료 상태 확인, 빈 데이터 처리, 재시도 흐름을 설계한 사례입니다.</p>
  </a>
</div>

## 정리 기준

- **문제:** 운영이나 사용자 흐름에서 어떤 병목이 있었는지
- **역할:** 직접 설계하고 구현한 범위
- **판단:** 안정성, 성능, 일관성 중 무엇을 우선했는지
- **결과:** 수작업 감소, 운영 리스크 완화, 사용자 경험 개선처럼 남은 효과

---

[//]: # (## Categories)

[//]: # ()
[//]: # (### Frontend Development)

[//]: # (- [React와 Angular를 활용한 SPA 개발]&#40;/dev-story/react-angular-spa-개발&#41;)

[//]: # (- [웹 성능 최적화 기법]&#40;/dev-story/웹-성능-최적화-기법&#41;)

[//]: # ()
[//]: # (### Backend Development)

[//]: # (- [Spring Boot와 Microservices]&#40;/dev-story/spring-boot-microservices&#41;)

[//]: # (- [REST API 디자인 및 구현]&#40;/dev-story/rest-api-디자인-구현&#41;)

[//]: # ()
[//]: # (### Data Processing)

[//]: # (- [실시간 데이터 처리 아키텍처]&#40;/dev-story/실시간-데이터-처리-아키텍처&#41;)

[//]: # (- [대용량 데이터베이스 최적화]&#40;/dev-story/대용량-데이터베이스-최적화&#41;)


