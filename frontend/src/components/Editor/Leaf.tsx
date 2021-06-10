import React from 'react';
import { RenderLeafProps } from 'slate-react';

// 리프 노드를 bold, italic, underlined로 변경시킴
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

export default Leaf;