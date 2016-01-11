import React from 'react';

class DisplayTest extends React.Component {
  render() {
    const { getTest, shouldShowTest, onKeyPress } = this.props;
    if (!shouldShowTest()) {
      return null;
    }
    const style = {
      position: 'absolute',
      width: 500,
      height: 600,
      right: 25,
      bottom: 80,
      backgroundColor: 'gainsboro',
      color: 'black',
      boxShadow: '2px 2px 5px #888888',
      overflowY: 'auto'
    }
    return (
      <pre><code>
        <div contentEditable={true} onKeyUp={onKeyPress} style={style}>{getTest()}</div>
      </code></pre>
    );
  }
}

export default DisplayTest;