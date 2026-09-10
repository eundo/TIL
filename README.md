# eundo.today

박은도의 포트폴리오와 개발 기록. Astro, React, MDX를 사용하며 main 브랜치에 push하면 기존 Netlify 사이트에 배포됩니다.

## 개발

Node.js 22.12 이상이 필요합니다. Netlify는 Node 22를 사용합니다.

```sh
corepack yarn install
corepack yarn dev
```

로컬 주소는 http://localhost:3000 입니다. 방명록과 통계를 함께 확인하려면 Netlify CLI에서 `netlify dev`를 실행합니다. 로컬 개발용 Blobs와 운영 데이터를 구분하며, 운영 도메인에서만 방문수를 기록합니다.

## 검증

```sh
corepack yarn typecheck
corepack yarn test
corepack yarn build
```

빌드는 `dist`에 출력됩니다. 마지막 단계에서 내부 링크, 캡처 파일, 제목 앵커, Docusaurus의 기존 공개 주소, 프로젝트 목록 누락을 검사합니다.

## 콘텐츠

- `docs/project/*.mdx`: 프로젝트 메타데이터와 본문. 홈, 목록, 상세, 검색에서 함께 사용합니다.
- `blog/dev-story/*.mdx`: 개발 글. title과 description이 필요하고 tags, date, published를 지정할 수 있습니다.
- `docs/aboutMe/PARK EUNDO.mdx`: 경력. 백업 파일은 공개하지 않습니다.
- `docs/til`, `docs/book`: 메모와 독서 기록.
- `static/img`: 실제 화면 캡처와 브랜드 자산.

프로젝트를 추가할 때 기존 MDX의 메타데이터를 참고합니다. `published: false`는 모든 목록과 상세 빌드에서 제외합니다. `featured: true`이고 cover가 있는 프로젝트는 홈 3D 화면에도 나타납니다. 고정 개수 제한은 없습니다. `order`는 기본 표시 순서, `updated`는 실제 프로젝트의 확인된 갱신일입니다. 파일명은 공개 주소가 되므로 이미 발행한 파일명을 바꿀 때는 리디렉션을 추가합니다.

`gallery`에는 화면별 label, caption, mobile/desktop 이미지 경로와 실제 픽셀 크기를 지정합니다. Shorts Pipeline은 PC와 모바일 화면을 함께 사용하고, 나머지는 모바일 중심입니다. 캡처가 없는 프로젝트는 임의 화면을 만들지 않고 텍스트 소개로 표시합니다.

## 구성

- `src/layouts/BaseLayout.astro`: 공통 메뉴, 메타데이터, 푸터.
- `src/content.config.ts`: 콘텐츠 로딩과 스키마 검증.
- `src/lib/content.ts`: 프로젝트 및 글 조회.
- `src/components/ProjectStage.tsx`, `src/lib/project-scene.ts`: 실제 화면을 사용하는 3D 홈. WebGL이 없어도 캡처와 링크를 제공합니다.
- `src/components/ScreenGallery.tsx`: 키보드로 선택 가능한 화면 탭과 확대 보기.
- `src/components/Guestbook.tsx`: 방명록 UI.
- `netlify/functions`: 기존 방문 통계와 방명록 API. 저장소 이름과 경로를 유지합니다.
- `src/lib/legacy-markdown.mjs`: 기존 알림 상자와 제목 앵커 호환.

## 배포와 주소

기존 Netlify 프로젝트와 eundo.today 도메인을 그대로 사용합니다. build command는 `yarn build`, publish directory는 `dist`입니다. 별도 유료 템플릿, CMS, 서버는 필요하지 않습니다.

기존 `/docs/project/*`, `/docs/aboutMe/PARK%20EUNDO`, `/blog/dev-story/*` 주소를 유지합니다. 내부 페이지 링크와 리디렉션 목적지는 `/docs/project/`처럼 끝에 `/`를 붙입니다. Netlify의 디렉터리 주소와 맞춰 추가 301 이동을 피하며, 빌드에서 링크·메타데이터·피드·사이트맵의 주소를 검사합니다. 파일 주소와 피드의 영구 식별자는 바꾸지 않습니다.

목록과 템플릿 주소 변경은 `static/_redirects`에 기록합니다. RSS는 `/blog/rss.xml`, JSON Feed는 `/blog/feed.json`, 사이트맵은 `/sitemap-index.xml`에서 제공됩니다. 내부 링크는 hover/focus 시, 프로젝트·글·메모 목록은 화면에 보일 때 HTML을 미리 받습니다. Astro 기본 prefetch를 사용하며 데이터 절약 모드와 느린 연결에서는 tap 방식으로 전환합니다.

내용 해시가 파일명에 포함된 `/_astro/*` 빌드 파일에만 브라우저 장기 캐시를 적용합니다. HTML, 피드, `static/img` 캡처와 API에는 이 규칙을 적용하지 않습니다.

GitHub private 프로젝트의 업데이트를 자동 공개하는 기능은 없습니다. 공개 가능한 설명과 캡처만 검토 후 등록합니다.
