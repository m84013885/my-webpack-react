'use strict'
import stores from './stores'
import { Provider } from 'mobx-react' // 供应stores
import { App } from '../../components'

import Main from './main'
class Enter extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount () {

  }
  render () {
    return (
      <Provider {...stores}>
        <App noSysScroll={true}>
          <Main/>
        </App>
      </Provider>
    )
  }
}

export default Enter
