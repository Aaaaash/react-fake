import $ from 'jquery';
import instantiateReactComponent from './instantiateReactComponent';

export default class ReactDOMComponent {
  constructor (ele) {
    this._currentElement = ele;
    this._rootNodeID = null;
  }

  mountComponent (rootID) {
    this._rootNodeID = rootID;
    const props = this._currentElement.props;
    let tagOpen = `<${this._currentElement.type}`;
    const tagClose = `</${this._currentElement.type}>`;

    tagOpen += ` data-reactid=${this._rootNodeID}`;

    // 遍历取出属性
    for (let propKey in props) {
      // 从属性props中拿出on开头的事件属性进行事件监听
      if (/^on[A-Za-z]/.test(propKey)) {
        let eventType = propKey.replace('on', '');

        // 事件委托 将所有事件绑定到document上
        $(document).delegate('[data-reactid="' + this._rootNodeID + '"]', eventType + '.' + this._rootNodeID, props[propKey]);
      }

      if (props[propKey] && propKey !== 'children' && !/^on[A-Za-z]/.test(propKey)) {
        tagOpen += ` ${propKey}=${props[propKey]}`;
      }
    }

    let content = '';
    let children = props.children || [];

    // 保存所有子节点的component实例
    let childrenInstances = [];
    children.forEach((child, key) => {
      let childComponentInstance = instantiateReactComponent(child);
      childComponentInstance._mountIndex = key;
      childrenInstances.push(childComponentInstance);

      // 子节点的rootID是父节点的rootID加上新的key
      const curRootId = `${this._rootNodeID}.${key}`;
      const childMarkup =childComponentInstance.mountComponent(curRootId);
      content += `${childMarkup}`;
    });

    this._renderedChildren = childrenInstances;
    return `${tagOpen}>${content}${tagClose}`;
  }
}
