export default class ReactDOMTextComponent {
  constructor (text) {
    this._currentElement = '' + text;
    this._rootNodeID = null;
  }

  mountComponent (rootID) {
    this._rootNodeID = rootID;
    return `<span data-reactid="${rootID}">${this._currentElement}</span>`;
  }
}
