import React from 'react';

export default class Record extends React.Component {
  onClick(recordingStatus) {
    const click = recordingStatus ? this.props.stopRecord : this.props.startRecord;
    click();
    this.forceUpdate();
  }

  render() {
    const { getRecordingStatus } = this.props;
    const style = {
      width: 100,
      height: 100,
      backgroundColor: 'blue',
      color: 'white',
      borderRadius: 50,
      cursor: 'pointer',
      position: 'absolute',
      bottom: 50,
      right: 50
    };
    const symbol = getRecordingStatus() ? '../images/pause.png' : '../images/play.png';
    return <div style={style} onClick={() => this.onClick(getRecordingStatus())}><img src={symbol} /></div>;
  }
}
