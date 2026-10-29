import React from 'react';
import './styles.scss';

export const Toast = (props) => {
  return <div className={`toast ${props.visible ? 'show' : ''}`}>{props.message}</div>;
};
