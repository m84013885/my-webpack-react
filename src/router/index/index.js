/* eslint-disable */
'use strict'

import 'whatwg-fetch'
import '../../utils/resize'
import Enter from './enter'

if (module.hot) {
  module.hot.accept()
}
const main = function () {
  ReactDom.render(<Enter/>, document.getElementById('main'))
}
window.onload = function () {
  main()
}

