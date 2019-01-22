'use strict'
import React from 'react'
import { observer, inject } from 'mobx-react'
import style from './style.css'
@inject('store') @observer class Main extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }
  componentWillMount () {
    console.log(style)
  }
  render () {
    return (
      <div className={style.test}>
     123
      </div>
    )
  }
}

export default Main
