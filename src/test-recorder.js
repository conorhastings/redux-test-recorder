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

  componentDidMount() {
    this.props.listen(testState => {
      this.setState({...this.state, ...testState});
    });
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
      this.props.createNewTest();
    }
    click();
  }

  onTabClick(testIndex) {
    this.props.updateTestIndex(testIndex);
  }

  hideTest() {
    this.props.hideTest();
    if (!this.state.recording) {
      this.props.emptyActions();
    }
  }

  onKeyPress() {
    if (this.state.showingTest) {
      this.hideTest();
    }
  }

  render() {
    let showTests;
    if (this.props.includeShowTestsButton) {
      showTests = (
        <ShowTests 
          onClick={() => {
            if (this.state.showingTest) {
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
          recordingStatus={this.state.recording}
          includeShowTestsButton={this.props.includeShowTestsButton}
        />
        <DisplayTest 
          tests={this.state.tests}
          testIndex={this.state.testIndex}
          showingTest={this.state.showingTest}
          onKeyPress={(e) => this.onKeyPress(e)}
          hideTest={this.hideTest}
          onTabClick={this.onTabClick}
          numTests={this.state.tests ? this.state.tests.length : 0}
        />
        {showTests}
      </div>
    );
  }
}

export default TestRecorder;