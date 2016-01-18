import React from 'react';

const onXClick = (e, close) => {
  e.preventDefault();
  close();
};

class DisplayTest extends React.Component {
  render() {
    const { getTest, shouldShowTest, onKeyPress, hideTest } = this.props;
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
    };
    const xStyle = {
      float: 'right',
      fontSize: 22,
      fontWeight: 700,
      marginRight: 5,
      cursor: 'pointer'
    };
    return (
      <div style={style}>
        <span style={xStyle} onClick={e => onXClick(e, hideTest)}>X</span>
        <div contentEditable={true} onKeyUp={onKeyPress} style={{outline: 'none'}}>
          <pre><code>
            <span>{getTest()}</span>
          </code></pre>
        </div>
      </div>
    );
  }
}

export default DisplayTest;