import React from 'react';
import Tabs from './tabs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles';
import CloseOnEscape from 'react-close-on-escape';
let saveAs;
if (typeof window !== 'undefined') {
  saveAs = require('filesaver.js').saveAs
}

const style = {
  position: 'absolute',
  width: '500px',
  height: '600px',
  right: '25px',
  bottom: '80px',
  backgroundColor: '#f8f8ff',
  color: 'black',
  boxShadow: '2px 2px 5px #888888',
  overflowY: 'auto',
  zIndex: 99
};

const xStyle = {
  float: 'right',
  fontSize: '22px',
  fontWeight: 700,
  marginRight: '5px',
  cursor: 'pointer',
  color: '#888888'
};

const saveStyle = {
  color: '#888888', 
  fontSize: '22px', 
  fontWeight: 600, 
  cursor: 'pointer'
};

const onXClick = (e, close) => {
  e.preventDefault();
  close();
};

export default class DisplayTest extends React.Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.onClick);
    if (this.code) {
      this.code.setAttribute('contentEditable', true);
    }
  }

  shouldComponentUpdate(nextProps) {
    return !!(
        (
          this.props.testIndex !== nextProps.testIndex && 
          nextProps.tests[nextProps.testIndex] !== undefined &&
          nextProps.showingTest
        ) ||
        this.props.showingTest && !nextProps.showingTest
    );
  }

  componentDidUpdate() {
    // will be string true when getting attribute from native dom element
    if (this.code && this.code.getAttribute('contentEditable') !== 'true') {
      this.code.setAttribute('contentEditable', true);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick);
  }


  onClick({ target }) {
    if (this.container && 
        !this.container.contains(target) && 
        this.props.showingTest &&
        target.className !== 'redux-test-recorder-record-button' &&
        target.className !== 'redux-test-recorder-tabs' &&
        target.className !== 'redux-test-recorder-tab' &&
        target.className !== 'redux-test-recorder-show-tests' &&
        target.className.baseVal !== 'redux-test-recorder-show-tests-svg' &&
        target.parentNode.className.baseVal !== 'redux-test-recorder-show-tests-svg') {
      this.props.hideTest();
    }
  }

  saveFile(e) {
    e.preventDefault();
    const hasTestIndex = this.props.testIndex !== null && this.props.testIndex !== undefined;
    const suffix = hasTestIndex ? `-${this.props.testIndex + 1}` : '';
    const file = new Blob([this.props.getTest(this.props.testIndex)], {type: 'text/plain;charset=utf-8'});
    saveAs(file, `test${suffix}.js`);
  }

  render() {
    const { tests, showingTest, onKeyPress, hideTest, numTests, testIndex, onTabClick } = this.props;
    if (!showingTest) {
      return null;
    }
    return (
      <CloseOnEscape onEscape={onKeyPress}>
        <div>
          <div style={style} ref={container => this.container = container} onClick={this.onClick}>
            <span style={saveStyle} onClick={e => this.saveFile(e)}>Save As File</span>
            <span style={xStyle} onClick={e => onXClick(e, hideTest)}>X</span>
            <div ref={code => this.code = code} style={{outline: 'none'}}>
              <pre>
                <code>
                  <SyntaxHighlighter language='javascript' style={docco}>
                    {tests[testIndex]}
                  </SyntaxHighlighter>
                </code>
              </pre>
            </div>
          </div>
          <Tabs numTests={numTests} onTabClick={onTabClick} testIndex={testIndex} />
        </div>
      </CloseOnEscape>
    );
  }
}
