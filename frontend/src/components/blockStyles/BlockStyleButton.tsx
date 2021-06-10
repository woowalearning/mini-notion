import React from 'react';

interface Props {
  style: any
  onToggle: any
  active: any
  label: string
  type?: any
}

class BlockStyleButton extends React.Component<Props> {
  onToggle = (e: any) => {
    const { style, onToggle } = this.props;
    e.preventDefault();
    onToggle(style);
  };

  render() {
    const { active, label } = this.props;
    let className = 'RichEditor-styleButton';
    if (active) {
      className += ' RichEditor-activeButton';
    }

    return (
      <button type="button" className={className} onClick={this.onToggle}>
        {label}
      </button>
    );
  }
}

export default BlockStyleButton;
