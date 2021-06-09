import React, { useMemo, useState } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

const CustomEditor: React.FC = () => {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'a line of text' },
        { text: 'sdfsdf' }],
    },
    {
      type: 'h1',
      children: [{ text: 'a line of text' },
        { text: 'sdfsdf' }],
    },
  ]);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={(newValue) => {
        console.log(newValue);
        setValue(newValue);
      }}
    >
      <Editable />
    </Slate>
  );
};

export default CustomEditor;
