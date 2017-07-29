import ReactDOMTextComponent from './ReactDOMTextComponent';
import ReactDOMComponent from './ReactDOMComponent';
import ReactCompositeComponent from './ReactCompositeComponent';

export default function instantiateReactComponent (node) {
  if (typeof node === 'string' || typeof node === 'number') {
    return new ReactDOMTextComponent(node);
  }
  
  if (typeof node === 'object' && typeof node.type === 'string') {
    return new ReactDOMComponent(node);
  }

  if (typeof node === 'object' && typeof node.type === 'function') {
    return new ReactCompositeComponent(node);
  }
}
