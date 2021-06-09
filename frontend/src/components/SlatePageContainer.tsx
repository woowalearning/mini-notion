import React, { PropsWithChildren, Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { BaseEditor, createEditor, Editor, Element, Text, Transforms } from 'slate';
import { Editable, ReactEditor, Slate, useSlate, withReact } from 'slate-react';
import { cx, css } from '@emotion/css';

type CustomElement = { type: string; children: CustomText[] };
type CustomText = { text: string };

declare module 'slate' {
  // eslint-disable-next-line no-unused-vars
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const CodeElement = ({ attributes, children }: any) => (
  <pre {...attributes}>
    <code>{children}</code>
  </pre>
);

const BulletElement = ({ attributes, children }: any) => (
  <ul {...attributes}>
    <li>{children}</li>
  </ul>
);

const DefaultElement = ({ attributes, children }: any) => <p {...attributes}>{children}</p>;

const Leaf = ({ attributes, children, leaf, style }: any) => (
  <span {...attributes} style={{ ...style, fontWeight: leaf.bold ? 'bold' : 'normal' }}>
    {children}
  </span>
);

const SlatePageContainer: React.FC = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  const [value, setValue] = useState<any[]>([{ type: 'paragraph', children: [{ text: '' }] }]);

  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      case 'bullet':
        return <BulletElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback(
    (props: any) => (
      <Leaf
        style={{
          fontWeight: props.leaf.bold ? 'bold' : '',
          textDecoration: props.leaf.underline ? 'underline' : '',
          fontStyle: props.leaf.italic ? 'italic' : '',
        }}
        {...props}
      />
    ),
    [],
  );

  return (
    <Slate editor={editor} value={value} onChange={(newValue) => setValue(newValue)}>
      <HoveringToolbar />
      <Editable
        style={{
          width: '50%',
          border: '1px solid #DDD',
          margin: '0 auto',
          height: '50vh',
        }}
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        onKeyDown={(event: any) => {
          if (!event.ctrlKey) {
            return;
          }
          switch (event.key) {
            case '`': {
              event.preventDefault();
              const [match]: any = Editor.nodes(editor, {
                match: (n) => Element.isElement(n) && n.type === 'code',
              });
              Transforms.setNodes(
                editor,
                { type: match ? 'paragraph' : 'code' },
                { match: (n) => Editor.isBlock(editor, n) },
              );
              break;
            }
            case '*': {
              event.preventDefault();
              const [bullet]: any = Editor.nodes(editor, {
                match: (n) => Element.isElement(n) && n.type === 'bullet',
              });
              Transforms.setNodes(
                editor,
                { type: bullet ? 'paragraph' : 'bullet' },
                { match: (n) => Editor.isBlock(editor, n) },
              );
              break;
            }
            case 'b': {
              event.preventDefault();
              Transforms.setNodes(editor, { bold: true } as any, {
                match: (n) => Text.isText(n),
                split: true,
              });
              break;
            }
            default: {
              console.log('default');
            }
          }
        }}
      />
    </Slate>
  );
};

export default SlatePageContainer;

const isFormatActive = (editor: any, format: any) => {
  const [match] = Editor.nodes(editor, {
    match: (n: any) => n[format] === true,
    mode: 'all',
  }) as any;
  return !!match;
};

const Portal = ({ children }: any) =>
  // Portal은 부모 컴포넌트의 DOM 계층 구조 바깥에 있는 DOM 노드로 자식을 렌더링하는 최고의 방법을 제공합니다.
  //  첫 번째 인자(child)는 엘리먼트, 문자열, 혹은 fragment와 같은 어떤 종류이든 렌더링할 수 있는 React 자식입니다. 두 번째 인자(container)는 DOM 엘리먼트입니다.
  typeof document === 'object' ? ReactDOM.createPortal(children, document.body) : null;

interface BaseProps {
  className: string;
  [key: string]: unknown;
}
type OrNull<T> = T | null;

// 스타일을 위한 코드입니다.
const Menu = React.forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: Ref<OrNull<HTMLDivElement>>) => (
    <div
      {...props}
      ref={ref as any}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }
          & > * + * {
            margin-left: 15px;
          }
        `,
      )}
    />
  ),
);

const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement | null>();
  const editor = useSlate();

  useEffect(() => {
    const el = ref.current;
    const { selection } = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      (Range as any)?.isCollapsed?.(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style');
      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection!.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();
    el.style.opacity = '1';
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
  });

  return (
    <Portal>
      <Menu
        ref={ref as any}
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
        <FormatButton format="bold" />
        <FormatButton format="italic" />
        <FormatButton format="underline" />
      </Menu>
    </Portal>
  );
};

const toggleFormat = (editor: any, format: any) => {
  const isActive = isFormatActive(editor, format);
  console.log('isActive', isActive, editor);

  Transforms.setNodes(editor, { [format]: isActive ? null : true }, { match: Text.isText, split: true });
};

const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>,
  ) => (
    <span
      {...props}
      ref={ref as any}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed ? (active ? 'white' : '#aaa') : active ? 'black' : '#ccc'};
        `,
      )}
    />
  ),
);

const FormatButton = ({ format }: { format: string }) => {
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
      {format}
    </Button>
  );
};
