import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

// TODO STOP USING WEBPACK / CREATE BETTER SEPERATION BETWEEN FILES TO MAKE TESTING EASIER
let saveAs;
try {
  if (window) {
    saveAs = require('filesaver.js').saveAs
  }
}
catch (e) {
  // ignore error 
}

const onXClick = (e, close) => {
  e.preventDefault();
  close();
};

export default class DisplayTest extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.onClick);
    document.addEventListener('keydown', this.onKeyPress);
    if (this.code) {
      this.code.setAttribute('contentEditable', true);
    }
  }

  componentDidUpdate() {
    // will be string true when getting attribute from native dom element
    if (this.code && this.code.getAttribute('contentEditable') !== 'true') {
      this.code.setAttribute('contentEditable', true);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick);
    document.removeEventListener('keydown', this.onKeyPress);
  }

  onKeyPress({ keyCode }) {
    if (keyCode === 27) {
      this.props.hideTest();
    }
  }

  onClick({ target }) {
    if (this.container && 
        !this.container.contains(target) && 
        this.props.shouldShowTest() &&
        target.className !== 'redux-test-recorder-record-button') {
      this.props.hideTest();
    }
  }

  saveFile(e) {
    e.preventDefault();
    const file = new Blob([this.props.getTest()], {type: 'text/plain;charset=utf-8'});
    saveAs(file, 'test.js');
  }

  render() {
    const { getTest, shouldShowTest, onKeyPress, hideTest } = this.props;
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
      cursor: 'pointer',
      color: '#888888'
    };

    const saveStyle = {
      color: '#888888', 
      fontSize: 22, 
      fontWeight: 600, 
      cursor: 'pointer'
    };

    return (
      <div style={style} ref={container => this.container = container} onClick={this.onClick}>
        <span style={saveStyle} onClick={e => this.saveFile(e)}>Save As File</span>
        <span style={xStyle} onClick={e => onXClick(e, hideTest)}>X</span>
        <div ref={code => this.code = code} onKeyUp={onKeyPress} style={{outline: 'none'}}>
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
}
