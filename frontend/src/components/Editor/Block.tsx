import React from 'react';
import {RenderElementProps} from 'slate-react';

// Block(기본적으로 한 줄)의 구조를 변경
const Block = ({attributes, children, element}: RenderElementProps) => {
    switch(element.type) {
        case 'code':
            return <pre {...attributes}>{children}</pre>;
        case 'bullet':
            return <ul><li {...attributes}>{children}</li></ul>;
        case 'h1':
            return <h1 {...attributes}>{children}</h1>;
        case 'h2':
            return <h2 {...attributes}>{children}</h2>;
        case 'h3':
            return <h3 {...attributes}>{children}</h3>;
        default:
            return <p {...attributes}>{children}</p>
    }
}

export default Block;