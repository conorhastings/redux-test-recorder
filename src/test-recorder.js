import React from 'react';
import Record from './record-component';
import DisplayTest from './display-test';

class TestRecorder extends React.Component {
  constructor() {
    super();
    this.state = {
      hovered: false,
      testIndex: null
    };
    this.hideTest = this.hideTest.bind(this);
    this.onTabClick = this.onTabClick.bind(this);
  }

  onClick(recordingStatus) {
    const click = recordingStatus ? this.props.stopRecord : this.props.startRecord;
    if (!recordingStatus) {
      this.interval = setInterval(() => {
        this.setState({
          hovered: !this.state.hovered
        });
      }, 500);
    }
    else {
      clearInterval(this.interval);
    }
    click();
    this.forceUpdate();
  }

  onTabClick(testIndex) {
    this.setState({ testIndex });
  }

  hideTest() {
    this.props.hideTest();
    this.setState({ testIndex: null });
  }

  onKeyPress() {
    if (this.props.shouldShowTest()) {
      this.hideTest();
    }
  }

  render() {
    return (
      <div>
        <Record 
          onClick={(recordingStatus) => this.onClick(recordingStatus)} 
          hovered={this.state.hovered} 
          onMouseOver={() => this.setState({hovered: true})}
          onMouseOut={() => this.setState({hovered: false})}
          getRecordingStatus={this.props.getRecordingStatus}
        />
        <DisplayTest 
          getTest={this.props.getTest}
          testIndex={this.state.testIndex}
          shouldShowTest={this.props.shouldShowTest}
          onKeyPress={(e) => this.onKeyPress(e)}
          hideTest={this.hideTest}
          onTabClick={this.onTabClick}
          getNumTests={this.props.getNumTests}
        />
      </div>
    );
  }
}

export default TestRecorder;