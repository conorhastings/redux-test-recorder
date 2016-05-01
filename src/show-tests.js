import React from 'react';

const style = {
  position: 'absolute',
  zIndex: 99,
  bottom: '25px',
  right: '25px',
  cursor: 'pointer'
};

export default function ShowTests({ onClick }) {
  return (
    <div style={style} onClick={onClick} className="redux-test-recorder-show-tests"> 
      <svg className="redux-test-recorder-show-tests-svg" width="50" height="50" viewBox="0 0 50 50"><path d="M25 9c-.14 0-.275.034-.406.094l-22 10C2.237 19.256 2 19.608 2 20v6c0 .34.183.66.47.844.285.183.627.204.936.062L25 17.094l21.594 9.812c.132.06.265.094.406.094.19 0 .367-.05.53-.156.287-.185.47-.504.47-.844v-6c0-.392-.236-.744-.594-.906l-22-10C25.276 9.034 25.14 9 25 9zm0 14c-.14 0-.275.034-.406.094l-22 10C2.237 33.256 2 33.607 2 34v6c0 .34.183.66.47.844.285.183.627.205.936.062L25 31.094l21.594 9.812c.132.06.265.094.406.094.19 0 .367-.05.53-.156.287-.185.47-.504.47-.844v-6c0-.393-.236-.744-.594-.906l-22-10c-.13-.06-.265-.094-.406-.094z"/></svg>
    </div>
  );
}