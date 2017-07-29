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
  },
  'click me!',
);

React.render(
  ele,
  document.querySelector('#root')
);
