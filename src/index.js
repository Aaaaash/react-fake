import React from './React';

// const newComponent = new React();

function hello(){
  alert('hello')
}

// DOM组件测试
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

const ele2 = React.createClass({
  getInitialState: () => {
    return { type: 'say:' };
  },
  componentWillMount: () => {
    console.log('我就要开始渲染了。。。');
  },
  componentDidMount: () => {
    console.log('渲染完了');
  },
  render: () => React.component(
    "div", null, this.state.type, "Hello ", this.props.name
  )
});

const Hello = React.component(
  ele2,
  { name: 'Sakura' },
);

React.renderDOM(
  Hello,
  document.querySelector('#root')
);
