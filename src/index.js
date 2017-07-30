import React from './React';

// const newComponent = new React();

function hello(){
  alert('hello')
}

// DOM组件测试
const ele = React.createElement(
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

const ele2 = React.createClass({
  getInitialState: function() {
    return {type: 'say:'};
  },
  componentWillMount: function() {
    console.log('我就要开始渲染了。。。')
  },
  componentDidMount: function() {
    console.log('我已经渲染好了。。。')
  },
  render: function() {
    return React.createElement("div", null, this.state.type, "Hello ", this.props.name);
  }
});

// console.log(ele2);

const Hello = React.createElement(
  ele2,
  { name: 'Sakura', id: 'component' },
);

React.renderDOM(
  Hello,
  document.querySelector('#root')
);
