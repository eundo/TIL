# Eundo's Today

Docusaurus 기반의 TIL, 개발 회고, 프로젝트 기록 블로그입니다. `main` 브랜치에
푸시하면 GitHub 연동을 통해 Netlify에서 정적 사이트로 빌드/배포됩니다.

## 로컬 실행

```bash
corepack enable
corepack yarn install
corepack yarn start
```

개발 서버 기본 주소는 `http://localhost:3000`입니다.

## 빌드 검증

```bash
corepack yarn build
```

정적 결과물은 `build` 디렉터리에 생성됩니다.

## 콘텐츠 구조

- `docs/aboutMe`: 소개와 경력
- `docs/til`: TIL 기록
- `docs/project`: 프로젝트 기록
- `docs/book`: 독서/학습 기록
- `blog/dev-story`: 개발 회고형 블로그 글
- `static/img`: 이미지와 CMS 업로드 대상

## 배포

Netlify 설정은 `netlify.toml`에 고정되어 있습니다.

- production URL: `https://eundo.today`
- build command: `yarn build`
- publish directory: `build`
- node version: `20`
- yarn version: `1.22.22`

Netlify 대시보드에서 이 레포의 `main` 브랜치가 연결되어 있으면 별도 GitHub
Actions 없이 push 트리거로 배포됩니다.
