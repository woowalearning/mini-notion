import React, { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { createEditor, Transforms, Editor, Text, Element, BaseEditor, Descendant, Range, Node } from "slate";
import { Slate, Editable, withReact, ReactEditor, RenderLeafProps, RenderElementProps, useSlate } from "slate-react";
import { withHistory } from 'slate-history';

import { Button, Icon, Menu, Portal } from '../components'

import { css } from '@emotion/css';

type CustomElement = { type: string; children: CustomText[]; };
type CustomText = { text: string; bold?: boolean; italic?: boolean; underlined?: boolean; };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const CodeElement = (props: RenderElementProps) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const BulletElement = (props: RenderElementProps) => {
  return (
    <ul {...props.attributes}>
      <li>{props.children}</li>
    </ul>
  );
};

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>;
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underlined) {
    children = <u>{children}</u>
  }

  return (
    <span {...attributes}>{children}</span>
  );
};

const Utils = (props: any) => {
  let buttons = '';

  if (props.isSelect) {
    buttons = '굴게 기울게 밑줄';
  }

  return (
    <div>
      {buttons}
    </div>
  )
}

const MyEditor: React.FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);

  const renderElement = useCallback((props: RenderElementProps) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      case "bullet":
        return <BulletElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    return <Leaf {...props} />;
  }, []);

  const toBold = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Transforms.setNodes(
      editor,
      { bold: true },
      { match: n => Text.isText(n), split: true }
    );
  }

  return (
    <>
      <button onClick={toBold}>굵게</button>

      <Slate
        editor={editor}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Toolbar />
        <Editable
          style={{
            width: "50%",
            border: "1px solid #DDD",
            margin: "0 auto",
            height: "50vh"
          }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={(event: any) => {
            if (!event.ctrlKey) {
              return;
            }
            switch (event.key) {
              case "`":
                event.preventDefault();
                const [match]: any = Editor.nodes(editor, {
                  match: (n) => Element.isElement(n) && n.type === "code"
                });
                Transforms.setNodes(
                  editor,
                  { type: match ? "paragraph" : "code" },
                  { match: (n) => Editor.isBlock(editor, n) }
                );
                break;
              case "*":
                event.preventDefault();
                const [bullet]: any = Editor.nodes(editor, {
                  match: (n) => Element.isElement(n) && n.type === "bullet"
                });
                Transforms.setNodes(
                  editor,
                  { type: bullet ? "paragraph" : "bullet" },
                  { match: (n) => Editor.isBlock(editor, n) }
                );
                break;
              case "b":
                event.preventDefault();
                Transforms.setNodes(
                  editor,
                  { bold: true },
                  { match: (n) => Text.isText(n), split: true }
                );
                break;
            }
          }}
          onDOMBeforeInput={(event: InputEvent) => {
            event.preventDefault();
            switch (event.inputType) {
              case 'formatBold':
                return toggleFormat(editor, 'bold');
              case 'formatItalic':
                return toggleFormat(editor, 'italic');
              case 'formatUnderline':
                return toggleFormat(editor, 'underlined')
            }
          }}
        />
      </Slate>
    </>
  );
};

const toggleFormat = (editor: Editor, format: string) => {
  const isActive = isFormatActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  )
}

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

const Toolbar = () => {
  const ref = useRef<any>();
  const editor = useSlate();

  useEffect(() => {
    const element = ref.current;
    const { selection } = editor;

    if (!element) {
      return;
    }

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
          background-color: #222;
          border-radius: 4px;
          transition: opacity 0.75s;
        `}
      >
        <FormatButton format="bold" icon="format_bold" />
        <FormatButton format="italic" icon="format_italic" />
        <FormatButton format="underlined" icon="format_underlined" />
      </Menu>
    </Portal>
  )
}

const FormatButton = ({ format, icon }: any) => {
  const editor = useSlate();
  return (
    <Button
      reversed
      active={isFormatActive(editor, format)}
      onMouseDown={(event: any) => {
        event.preventDefault();
        toggleFormat(editor, format);
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

export default MyEditor;
