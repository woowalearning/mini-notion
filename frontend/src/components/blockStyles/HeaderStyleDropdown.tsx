import React from 'react';

interface Props {
  onToggle: any
  active: any
  headerOptions: any
}

class HeaderStyleDropdown extends React.Component<Props> {
  onToggle = (event: any) => {
    const { onToggle } = this.props;
    const { value } = event.target;
    onToggle(value);
  };

  render() {
    const { active, headerOptions } = this.props;
    return (
      <select value={active} onChange={this.onToggle}>
        <option value="">Header Levels</option>
        {headerOptions.map(
          (heading: any) => <option value={heading.style}>{heading.label}</option>,
        )}
      </select>
    );
  }
}

export default HeaderStyleDropdown;
