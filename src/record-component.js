import React from 'react';

export default class Record extends React.Component {
  onClick(recordingStatus) {
    const click = recordingStatus ? this.props.stopRecord : this.props.startRecord;
    click();
    this.forceUpdate();
  }

  makeCircle(radius, color) {
   return {
      width: radius,
      height: radius,
      backgroundColor: color,
      borderRadius: radius / 2,
      cursor: 'pointer',
      position: 'absolute',
      bottom: radius / 2,
      right: radius / 2
    }; 
  }
  render() {
    const { getRecordingStatus } = this.props;
    const style = this.makeCircle(50, 'gainsboro');
    let innerCirlcleStyle = this.makeCircle(25, 'red');
    if (!getRecordingStatus()) {
      innerCirlcleStyle.opacity = 0.5;
    }
    return (
      <div style={style} onClick={() => this.onClick(getRecordingStatus())}>
        <div style={innerCirlcleStyle}></div>
      </div>
    );
  }
}
