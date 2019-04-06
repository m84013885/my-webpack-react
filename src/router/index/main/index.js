'use strict'
import { observer, inject } from 'mobx-react'
import style from './style.css'
import { View, ScrollView, Circle,Swiper,SwiperItem } from '../../../components/src'

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
    const config = {
      percent: 80,
      lineWidth: 10
    }
    return (
      <View>
        <ScrollView className={style.test}>
          <View>1</View>
          <View>%</View>
          <View>1</View>
          <View>1</View>
          <View tap={this.copy}>1345</View>
          <View className={style.canvasBox}>
            <Circle className={style.canvas} percent={config.percent} lineWidth={config.lineWidth}/>
          </View>
        </ScrollView>
        <Swiper className={style.swiper} autoplay={true}>
          <SwiperItem>1</SwiperItem>
          <SwiperItem>2</SwiperItem>
        </Swiper>
      </View>
    )
  }
}

export default Main
