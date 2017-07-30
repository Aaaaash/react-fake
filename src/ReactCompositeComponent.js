import PureComponent from './PureComponent';
import instantiateReactComponent from './instantiateReactComponent';
import $ from 'jquery';

export default class ReactCompositeComponent  {
  constructor(ele) {
    this._currentElement = ele;
    this._rootNodeID = null;
    this._instance = null;
  }


  // 递归渲染组件
  mountComponent (rootID) {
    this._rootNodeID = rootID;
    const publicProps = this._currentElement.props;
    const ReactClass = this._currentElement.type;
    const inst = new ReactClass(publicProps);
    this._instance = inst;

    inst._reactInternalInstance = this;
    if (inst.componentWillMount) {
      inst.componentWillMount();
    }

    const renderedElement = this._instance.render();
    const renderedComponentInstance = instantiateReactComponent(renderedElement);
    this._renderedComponent = renderedComponentInstance;

    const renderedMarkup = renderedComponentInstance.mountComponent(this._rootNodeID);

    $(document).on('mountReady', function() {
      //调用inst.componentDidMount
      inst.componentDidMount && inst.componentDidMount();
    });

    return renderedMarkup;
  }

  // 更新组件
  receiveComponent (nextElement, newState) {
    // 如果接收到新的ele就使用
    this._currentElement = nextElement || this._currentElement;

    let inst = this._instance;

    // 合并state
    const nextState = Object.assign(inst.state, newState);
    const nextProps = this._currentElement.props;

    // 改写state
    inst.state = nextState;

    // 如果组件中有shouldComponentUpdate并且返回false   说明组件自身判断不需要更新
    if (inst.shouldComponentUpdate && (inst.shouldComponentUpdate(nextProps, nextState) === false)) return;

    // 如果生命周期中有componentWillUpdate 就直接调用，表示开始更新
    if (inst.componentWillUpdate) inst.componentWillUpdate(nextProps, nextState);

    // 拿到更新前的组件示例以及需要渲染的元素
    const prevComponentInstance = this._renderedComponent;
    const prevRenderedElement = prevComponentInstance._currentElement;

    // 重新执行render 拿到新的element
    const nextRenderedElement = this._instance.render();


    // 判断是否需要更新   与生命周期方法不同  为react自身实现的方法
    if (_shouldUpdateReactComponent(prevRenderedElement, nextRenderedElement)) {
      // 对比更新前后的两个组件实例以及element
      // 需要更新就窜入新的element更新子节点
      prevComponentInstance.receiveComponent(nextRenderedElement);
      
      // 调用生命周期函数componentDidUpdate 表示更新完成
      inst.componentDidUpdate && inst.componentDidUpdate();
    } else {
      // 如果判断结果是两个不同的element， 则直接重新渲染
      const thisID = this._rootNodeID;
      // 重新生成一个新的component
      this._renderedComponent = instantiateReactComponent(nextRenderedElement);
      // 重新生成对应的严肃内容
      const nextMarkup = _renderedComponent.mountComponent(thisID);

      // 替换整个节点
      $(`[data-reactid=${this._rootNodeID}]`).replaceWith(nextMarkup);
    }
  }
}


function _shouldUpdateReactComponent (prevElement, nextElement) {
  if (prevElement != null && nextElement != null) {
    const prevType = typeof prevElement;
    const nextType = typeof nextElement;
    if (prevType === 'string' || prevType === 'number') {
      return nextType === 'string' || nextType === 'number';
    } else {
      return nextType === 'object' && prevElement.type === nextElement.type && prevElement.key === nextElement.key;
    }
  }

  return false;
}