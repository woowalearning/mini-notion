// TypeScript Users only add this code
import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

type ElementTypes = 'paragraph' | 'h1'
type CustomText = { text: string }
type CustomElement = { type: ElementTypes; children: CustomText[] }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}
