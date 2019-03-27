'use strict'
import style from '../../css.css'
import CopyItem from './copy'
class Copy extends React.Component {
  ref = React.createRef()
  componentDidMount () {
    const copyItem = new CopyItem(this.ref.current)
    window.Qapp.copy = copyItem.setCopy
  }
  render () {
    return (
      <div ref={this.ref} className={style.copy}></div>
    )
  }
}

export default Copy
