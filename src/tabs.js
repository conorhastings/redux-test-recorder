import React from 'react';

const tabsStyle = {
  position: 'absolute',
  bottom: '30px',
  right: '270px',
  boxShadow: '2px 2px 5px #888888',
  zIndex: 9999
};

const tabStyle = {
  width: '50px',
  height: '50px',
  display: 'inline-block',
  backgroundColor: '#f8f8ff',
  color: '#888888',
  marginRight: '1px',
  fontSize: '35px',
  textAlign: 'center',
  cursor: 'pointer',
  lineHeight: 'normal'
};

const Tab = ({ index, onClick, isActive }) => (
  <div 
    onClick={() => onClick(index)}
    className='redux-test-recorder-tab'
    style={isActive ? {...tabStyle, backgroundColor: '#9ACBDB'} : tabStyle}
  >
    {index + 1}
  </div>
);

const Tabs = ({ numTests, onTabClick, testIndex = numTests - 1 }) => {
  const range = Array.from({length: numTests}).map((x, i) => i);
  return(
    <div style={tabsStyle} className='redux-test-recorder-tabs'>
      {range.map(n => <Tab key={n} index={n} onClick={onTabClick} isActive={testIndex === n} />)}
    </div>
  );
};

export default Tabs;