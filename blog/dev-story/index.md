# Stories

실무에서 직접 다룬 문제를 정리합니다. 기술 스택보다 문제, 판단, 운영 리스크를 먼저 봅니다.

<div className="case-proof-strip">
  <div>
    <strong>운영에서 나온 주제</strong>
    <span>배치, 비동기 API, 재처리처럼 실제 운영 질문으로 이어지는 내용을 모읍니다.</span>
  </div>
  <div>
    <strong>구현 판단 중심</strong>
    <span>어떤 방식으로 처리했고, 어떤 리스크를 줄였는지에 초점을 둡니다.</span>
  </div>
  <div>
    <strong>짧게 읽히는 구조</strong>
    <span>문제, 역할, 접근, 결과 순서로 빠르게 확인할 수 있게 정리합니다.</span>
  </div>
</div>

<!-- truncate -->

## 주요 글

<div className="case-study-list">
  <a href="/blog/dev-story/실시간%20로그적재%20배치개발">
    <span>Spring Batch · Multi-thread</span>
    <strong>실시간 로그적재 배치 개발</strong>
    <p>대용량 로그 파일을 주기적으로 읽어 DB에 적재하고, 이어 읽기와 전처리로 중복 처리 리스크를 줄인 기록입니다.</p>
  </a>
  <a href="/blog/dev-story/API%20비동기호출%20데이터처리%20개발">
    <span>Async API · Retry · State</span>
    <strong>API 비동기 호출 데이터 처리</strong>
    <p>여러 API 호출 결과를 안정적으로 종합하기 위해 완료 상태 확인, 빈 데이터 처리, 재시도 흐름을 설계한 기록입니다.</p>
  </a>
</div>

## 정리 기준

- **문제:** 운영 또는 사용자 흐름에서 어떤 병목이 있었는지
- **역할:** 직접 설계하고 구현한 범위
- **판단:** 안정성, 성능, 일관성 중 무엇을 우선했는지
- **결과:** 운영 리스크 감소, 재처리 단순화, 화면 전환 개선처럼 남은 효과
