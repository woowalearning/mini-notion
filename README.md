# Woowahan Tech Learning 2021, mini-notion

우아한테크러닝 4기를 참여하면서 활용한 저장소입니다.
미니노션을 구현해봅니다.

## setting

프론트엔드

- Eslint
  - 협업시 코드를 일관되게 관리하기 위해 사용합니다.
- Babel
- Webpack
- React, Typescript

## run this project

```git
cd frontend
npm install
npm start
```

## 제안 library

Markdown parser

- [Toast UI 라이브러리](https://github.com/nhn/tui.editor)

  - star 13k
  - [차트 작성](https://github.com/nhn/tui.editor/tree/master/plugins/chart)
  - [글자 색상 변화](https://github.com/nhn/tui.editor/tree/master/plugins/color-syntax)
  - [코드 구문 강조](https://github.com/nhn/tui.editor/tree/master/plugins/code-syntax-highlight)
  - [uml작성](https://github.com/nhn/tui.editor/tree/master/plugins/uml)
  - 이미지와 사용 예제가 있어서 이해 및 적용하기 편리합니다.
  - [문서페이지](https://ui.toast.com/)가 있어서 참고하기 편리합니다

- [react-markdown](https://www.npmjs.com/package/react-markdown)

## 제안의 문제점

Toast UI

- 리액트가 일부 있지만 기본 코드가 vanilla js로 되어있어서 기술 스택이 맞지 않습니다.

- 올인원 에디터로 다양한 커스터마징을 위한 인터페이스를 제공하지 않습니다.

## 다른 제안

Draft js

- rich text editor framework for React
- 다양한 커스터마이징이 가능합니다.
- 기본 컨셉에 대한 충분한 이해가 필요합니다.
- [UL구현](https://codesandbox.io/s/floral-frog-lgdo7?file=/src/App.tsx)

![image](https://user-images.githubusercontent.com/58525009/121153105-be5bfa00-c880-11eb-99e6-28a334ae0d37.png)
