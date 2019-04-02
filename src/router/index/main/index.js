'use strict'
import { observer, inject } from 'mobx-react'
import style from './style.css'
import { View, ScrollView } from '../../../components/src'

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
  copy () {
    window.Qapp.showToast({
      content: '123'
    })
  }
  render () {
    return (
      <ScrollView className={style.test}>
        <View>1</View>
        <View>1</View>
        <View>1</View>
        <View>1</View>
        <View tap={this.copy}>1345</View>
      </ScrollView>
    )
  }
}

export default Main
