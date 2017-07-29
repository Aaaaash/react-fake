import React from './React';

// const newComponent = new React();

function hello(){
  alert('hello')
}
const ele = React.component(
  'button',
  {
    id: 'btn',
    onclick: hello,
    style: {
      width: '80px',
      height: '35px',
      backgroundColor: '#FF004F',
      border: '1px solid #CCC',
      borderRadius: '3px',
      display: 'inline-block',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#333'
    }
  },
  'react按钮',
);

React.renderDOM(
  ele,
  document.querySelector('#root')
);
