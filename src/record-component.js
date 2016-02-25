import React from 'react';

const makeCircle = (radius, color) => {
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
};

const Record = ({ getRecordingStatus, onClick, onMouseOver, onMouseOut, hovered }) => {
  let style = makeCircle(50, 'gainsboro');
  style.boxShadow = '2px 2px 5px #888888';
  style.zIndex = 99;
  let innerCirlcleStyle = makeCircle(25, 'red');
  if (!hovered) {
    innerCirlcleStyle.opacity = 0.3;
  }
  return (
    <div 
      id='redux-test-recorder-record-button'
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut} 
      style={style} 
      onClick={() => onClick(getRecordingStatus())}
    >
      <div style={innerCirlcleStyle}></div>
    </div>
  );
}

export default Record;
