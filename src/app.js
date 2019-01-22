'use strict'
import React from 'react'
import stores from './stores'
import { Provider } from 'mobx-react' // 供应stores

import Main from './router/main'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <Provider {...stores}>
        <Main/>
      </Provider>
    )
  }
}

export default App
