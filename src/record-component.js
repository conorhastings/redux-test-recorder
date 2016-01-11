import React from 'react';

export default class Record extends React.Component {

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
    const { getRecordingStatus, onClick, onMouseOver, onMouseOut, hovered } = this.props;
    let style = this.makeCircle(50, 'gainsboro');
    style.boxShadow = '2px 2px 5px #888888';
    let innerCirlcleStyle = this.makeCircle(25, 'red');
    if (!hovered) {
      innerCirlcleStyle.opacity = 0.3;
    }
    return (
      <div 
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut} 
        style={style} 
        onClick={() => this.props.onClick(getRecordingStatus())}
      >
        <div style={innerCirlcleStyle}></div>
      </div>
    );
  }
}
