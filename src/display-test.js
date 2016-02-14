import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

const onXClick = (e, close) => {
  e.preventDefault();
  close();
};

const DisplayTest = ({ getTest, shouldShowTest, onKeyPress, hideTest }) => {
  if (!shouldShowTest()) {
    return <noscript />;
  }
  const style = {
    position: 'absolute',
    width: 500,
    height: 600,
    right: 25,
    bottom: 80,
    backgroundColor: '#f8f8ff',
    color: 'black',
    boxShadow: '2px 2px 5px #888888',
    overflowY: 'auto',
    zIndex: 99
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
        <pre>
          <code>
            <SyntaxHighlighter language='javascript' stylesheet='docco'>
              {getTest()}
            </SyntaxHighlighter>
          </code>
        </pre>
      </div>
    </div>
  );
}

export default DisplayTest;