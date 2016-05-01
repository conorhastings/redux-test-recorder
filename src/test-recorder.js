import React from 'react';
import Record from './record-component';
import DisplayTest from './display-test';
import ShowTests from "./show-tests";

class TestRecorder extends React.Component {
  constructor() {
    super();
    this.state = {
      hovered: false
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
    if (!this.props.getRecordingStatus()) {
      this.props.emptyActions();
    }
    this.setState({ testIndex: undefined });
  }

  onKeyPress() {
    if (this.props.shouldShowTest()) {
      this.hideTest();
    }
  }

  render() {
    let showTests;
    if (this.props.includeShowTestsButton) {
      showTests = (
        <ShowTests 
          onClick={() => {
            if (this.props.shouldShowTest()) {
              this.hideTest();
            }
            else {
              this.props.showTest();
              this.forceUpdate();
            }
          }}
        />
      );
    }
    return (
      <div>
        <Record 
          onClick={recordingStatus => this.onClick(recordingStatus)} 
          hovered={this.state.hovered} 
          onMouseOver={() => this.setState({hovered: true})}
          onMouseOut={() => this.setState({hovered: false})}
          getRecordingStatus={this.props.getRecordingStatus}
          includeShowTestsButton={this.props.includeShowTestsButton}
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
        {showTests}
      </div>
    );
  }
}

export default TestRecorder;