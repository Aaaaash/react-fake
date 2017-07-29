import React from './React';

const newComponent = new React();

function hello(){
  alert('hello')
}
const ele = newComponent.component(
  'div',
  {
    id: 'test',
    onclick: hello,
  },
  'click me!',
);

newComponent.render(
  ele,
  document.querySelector('#root')
);
