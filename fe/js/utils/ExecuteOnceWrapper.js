export default class ExecuteOnceWrapper {
  constructor(callback) {
    this.didExecute = false
  }

  executeOnce(callback) {
    if (this.didExecute) {
      return
    }
    this.didExecute = true
    callback()
  }

  reset() {
    this.didExecute = false
  }
}