import React from './React';

// const newComponent = new React();

function hello(){
  alert('hello')
}
const ele = React.component(
  'div',
  {
    id: 'test',
    onclick: hello,
    style: {
      width: '100px',
      height: '200px',
      backgroundColor: '#FF004F',
    }
  },
  'click me!',
);

React.renderDOM(
  ele,
  document.querySelector('#root')
);
