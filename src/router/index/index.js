/* eslint-disable */
'use strict'

import 'whatwg-fetch'
import '../../utils/resize'
import Enter from './enter'

if (module.hot) {
  module.hot.accept()
}
/** 点击浏览器刷新页面 **/  
window.onpageshow = function(evt){
  if(evt.persisted){ 
     document.body.style.display ="none"
     location.reload()
  }
}
const main = function () {
  ReactDom.render(<Enter/>, document.getElementById('main'))
}
window.onload = function () {
  main()
}

