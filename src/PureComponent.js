export default class PureComponent {
  render () {}
  setState (newState) {
    this._reactinternalInstance.receiveComponent(null, newState);
  }
}
