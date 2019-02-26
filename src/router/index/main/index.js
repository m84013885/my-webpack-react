'use strict'
import { observer, inject } from 'mobx-react'
import style from './style.css'

@inject('store') @observer class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  componentWillMount () {

  }
  render () {
    return (
      <div className={style.test}>
        131
      </div>
    )
  }
}

export default Main
