import PureComponent from './PureComponent';
import instantiateReactComponent from './instantiateReactComponent';
import $ from 'jquery';

export default class ReactCompositeComponent  {
  constructor(ele) {
    this._currentElement = ele;
    this._rootNodeID = null;
    this._instance = null;
  }

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
}
