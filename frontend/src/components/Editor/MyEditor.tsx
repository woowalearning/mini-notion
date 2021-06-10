import React, { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { createEditor, Transforms, Editor, Text, Element, BaseEditor, Descendant, Range, Node } from "slate";
import { Slate, Editable, withReact, ReactEditor, RenderLeafProps, RenderElementProps, useSlate } from "slate-react";
import { withHistory } from 'slate-history';

import { Button, Icon, Menu, Portal } from './EditorUtils'

import { css } from '@emotion/css';

import Block from './Block';
import Leaf from './Leaf';

// 타입 정의
type CustomElement = { type: string; children: CustomText[]; };
type CustomText = { text: string; bold?: boolean; italic?: boolean; underlined?: boolean; };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const MyEditor: React.FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);

  // Block 단위의 변화가 있을 때 기존에 만든 구문으로 변환시켜줌
  const renderElement = useCallback((props: RenderElementProps) => {
    return <Block {...props} />
  }, []);

  // Leaf 내에서 변화가 있을 때 기존에 만든 구문으로 변환시켜줌
  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  // 키다운 이벤트
  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!event.ctrlKey) {
      return;
    }
    switch (event.key) {
      case '`':
        event.preventDefault();
        const [code]: any = Editor.nodes(editor, {
          match: (n) => {
            return Element.isElement(n) && n.type === 'code'
          }
        });
        Transforms.setNodes(
          editor,
          { type: code ? 'paragraph' : 'code' },
          { match: (n) => Editor.isBlock(editor, n) }
        );
        break;
      case '*':
        event.preventDefault();
        const [bullet]: any = Editor.nodes(editor, {
          match: (n) => Element.isElement(n) && n.type === 'bullet'
        });
        Transforms.setNodes(
          editor,
          { type: bullet ? 'paragraph' : 'bullet' },
          { match: (n) => Editor.isBlock(editor, n) }
        );
        break;
      case 'h':
        event.preventDefault();
        const [head]: any = Editor.nodes(editor, {
          match: (n) => Element.isElement(n) && n.type === 'h1'
        });
        Transforms.setNodes(
          editor,
          { type: head ? 'paragraph' : 'h1' },
          { match: (n) => Editor.isBlock(editor, n) }
        );
        break;
    }
  }

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    >
      <Toolbar />
      <Editable
        style={{
          width: '50%',
          border: '1px solid #DDD',
          margin: '0 auto',
          height: '50vh'
        }}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={onKeyDownHandler}
      />
    </Slate>
  );
};

// 에디터의 노드 구조를 변경
const toggleFormat = (editor: Editor, format: string) => {
  const isActive = isFormatActive(editor, format);
  
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  )
}

// Node 객체에 string key 값으로 접근하기 위해 타입 선언
type INode = {
  [index: string]: any
} & Node

const isFormatActive = (editor: Editor, format: string) => {
  const [match]: any = Editor.nodes(editor, {
    match: (n: INode) => n[format] === true,
    mode: 'all'
  });
  return !!match
}

// 에디터 초기 값
const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: '미니 노션을 사용해봅시다.'
      }
    ]
  }
];

// 블록 선택시 화면에 보여질 툴바
const Toolbar = () => {
  const ref = useRef<any>();
  const editor = useSlate();

  useEffect(() => {
    const element = ref.current;
    const { selection } = editor;

    if (!element) {
      return;
    }

    // 블록 선택 되지 않았을 경우 || Editor가 포커스되지 않앗을 경우 || ?? Range.isCollapsed 이 부분을 잘 모르겠음 || 블록 선택된 구간이 비어있을 경우
    if (!selection || !ReactEditor.isFocused(editor) || Range.isCollapsed(selection) || Editor.string(editor, selection) === '') {
      element.removeAttribute('style');
      return;
    }
    
    const domSelection = window.getSelection();
    const domRange = domSelection?.getRangeAt(0);
    const rect = domRange?.getBoundingClientRect();
    element.style.opacity = '1';;
    element.style.top = `${(rect as DOMRect).top + window.pageYOffset - element.offsetHeight}px`;
    element.style.left = `${(rect as DOMRect).left + window.pageXOffset - element.offsetWidth / 2 + (rect as DOMRect).width / 2}px`;
  });

  return (
    <Portal>
      <Menu
        ref={ref}
        className={css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 1;
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #555;
          border-radius: 4px;
          transition: opacity 0.75s;
        `}
      >
        <FormatButton format="bold" icon="format_bold" />
        <FormatButton format="italic" icon="format_italic" />
        <FormatButton format="underlined" icon="format_underlined" />
      </Menu>
    </Portal>
  );
}

interface IButtonFormat {
  format: string;
  icon: string;
}

const FormatButton = ({ format, icon }: IButtonFormat) => {
  const editor = useSlate();
  return (
    <Button
      reversed
      active={isFormatActive(editor, format)}
      onMouseDown={(event: MouseEvent) => {
        event.preventDefault();
        toggleFormat(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
}

export default MyEditor;
