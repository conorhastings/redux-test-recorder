import React from 'react';
import Record from './record-component';
import DisplayTest from './display-test';

class TestRecorder extends React.Component {
  constructor() {
    super();
    this.state = {
      hovered: false
    };
    this.hideTest = this.hideTest.bind(this);
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

  hideTest() {
    this.props.hideTest();
    this.forceUpdate();
  }

  onKeyPress(e) {
    if (this.props.shouldShowTest && e.keyCode === 27) {
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
          shouldShowTest={this.props.shouldShowTest}
          onKeyPress={(e) => this.onKeyPress(e)}
          hideTest={this.hideTest}
        />
      </div>
    );
  }
}

export default TestRecorder;