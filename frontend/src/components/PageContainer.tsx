import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import BlockStyleToolbar, {
  getBlockStyle,
} from './blockStyles/BlockStyleToolbar';
import '../App.css';

interface Props {}

interface State {
  editorState: EditorState;
}

class PageContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  toggleBlockTypeFunc = (blockType: string) => {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  onChange = (editorState: EditorState) => {
    this.setState({
      editorState,
    });
  };

  handleKeyCommand = (command: string) => {
    const { editorState } = this.state;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  onUnderlineClick = () => {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleInlineStyle(editorState, 'UNDERLINE'));
  };

  onBoldClick = () => {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  };

  onItalicClick = () => {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  };

  toggleBlockType = (blockType: string) => {
    const { editorState } = this.state;
    this.onChange(RichUtils.toggleBlockType(editorState, blockType));
  };

  render() {
    const { editorState } = this.state;
    return (
      <div className="editorContainer">
        <div className="toolbar">
          <BlockStyleToolbar
            editorState={editorState}
            onToggle={this.toggleBlockType}
          />
          <button
            type="button"
            className="styleButton"
            onClick={this.onUnderlineClick}
          >
            U
          </button>
          <button
            type="button"
            className="styleButton"
            onClick={this.onBoldClick}
          >
            <b>B</b>
          </button>
          <button
            type="button"
            className="styleButton"
            onClick={this.onItalicClick}
          >
            <em>I</em>
          </button>
        </div>

        <div className="editors">
          <Editor
            blockStyleFn={getBlockStyle}
            editorState={editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
          />
        </div>
      </div>
    );
  }
}

export default PageContainer;
