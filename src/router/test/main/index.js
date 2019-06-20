'use strict'
import { observer, inject } from 'mobx-react'
import style from './style.css'
import { View } from '../../../components'

@inject('store') @observer class Main extends React.Component {
  static propTypes = {
    // 传入值类型
    // optionalArray: PropTypes.array,
    // optionalBool: PropTypes.bool,
    // optionalFunc: PropTypes.func,
    // optionalNumber: PropTypes.number,
    // optionalObject: PropTypes.object,
    // optionalString: PropTypes.string
  }
  static defaultProps = {
    // 传入的默认值
  }
  componentDidMount () {
    // 生命周期
  }
  state = {
    // 状态码
  }
  render () {
    return (
      <View className={style.test}>
        131
      </View>
    )
  }
}

export default Main
