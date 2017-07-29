import instantiateReactComponent from './instantiateReactComponent';
import ReactElement from './ReactElement';

class React {
  constructor () {
    this.nextReactRootIndex = 0
  }
  render (ele, container) {
    const componentInstance = instantiateReactComponent(ele);
    const markup = componentInstance.mountComponent(this.nextReactRootIndex++);
    container.innerHTML = markup;
  }

  cleateClass (spec) {
    const Constructor = (props) => {
      this.props = props;
      this.state = this.getInitialState ? this.getInitialState() : null;
    }
    Constructor.prototype = new PureComponent();
    Constructor.prototype.constructor = Constructor;
    Object.assign(Constructor.prototype, spec);
    return Constructor;
  }
  component (type, config = {}, children) {
    const props = {};
    let propName;
    let key = config.key || null;

    // 复制config里的内容到props对象
    for (propName in config) {
      if (config.hasOwnProperty(propName) && propName !== 'key') {
        props[propName] = config[propName];
      }
    }

    // 将children挂载到props的children属性上
    const childrenLength = arguments.length - 2;
    if (childrenLength === 1) {
      props.children = Array.isArray(children) ? children : [children];
    } else if (childrenLength > 1) {
      const childArray = Array(childrenLength);
      for (let i = 0; i < childrenLength; i++) {
        childArray[i] = arguments[i + 2];
      }
      props.children = childArray;
    }
    return new ReactElement(type, key, props);
  }
}

export default new React();
