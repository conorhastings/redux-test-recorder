import React from 'react';

const makeCircle = (radius, color) => {
 return {
    width: `${radius}px`,
    height: `${radius}px`,
    backgroundColor: color,
    borderRadius: `${(radius / 2)}px`,
    cursor: 'pointer',
    position: 'absolute',
    bottom: `${(radius / 2)}px`,
    right: `${(radius / 2)}px`
  }; 
};

const Record = ({ recordingStatus, onClick, onMouseOver, onMouseOut, hovered, includeShowTestsButton }) => {
  let style = makeCircle(50, 'gainsboro');
  style.boxShadow = '2px 2px 5px #888888';
  style.zIndex = 99;
  if (includeShowTestsButton) {
    style.right = '100px';
  }
  let innerCirlcleStyle = makeCircle(25, 'red');
  if (!hovered) {
    innerCirlcleStyle.opacity = 0.3;
  }
  return (
    <div 
      className='redux-test-recorder-record-button'
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut} 
      style={style} 
      onClick={() => onClick(recordingStatus)}
    >
      <div className='redux-test-recorder-record-button' style={innerCirlcleStyle} />
    </div>
  );
}

export default Record;
