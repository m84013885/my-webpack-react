# 多(单)页面webpack+react+mobx

#### 所有包都是目前最新的

### 从单页面现在变为可多页面同时打包
### 注意：现在问题就在于压缩,目前压缩还要继续，应该还会有优化的空间
### 增加了eslint

## 2019-3-27
### 增加自定义组件与自定义方法（自定义组件：View,App,ScrollView。自定义方法：window.Qapp.showToast,window.Qapp.copy)

### 组件

## App组件
----
整个 ```App``` 组件是覆盖我们浏览器的可视窗口并且是不可滚动的，该组件是整个页面的 ```root``` ，使用这个组件会对浏览器作出一些限制和帮助。    
为了统一所有浏览器下的滚动以及避免一些浏览器下原生滚动的一些缺陷，我们舍弃了浏览器原生的滚动，这意味着你需要引入我们提供的  ```ScrollView``` ： 舍去原生的滚动功能，引入用一个相对耗费性能的组件来取代，这样我们能更好的滚动以及更好的控制滚动。  

### Prop
----
| 参数名字 | 值类型 | 默认值  | 说明 |  是否必需 |
|---------|---------|--------- |---------|---------|
| noSysScroll| bool | true | 是否禁止系统的滚动 | 否 |

## ScrollView组件
----
该组件是为了更好的滚动而存在的，在使用它之前请确认根组件是 ```noSysScroll:true``` 的 ```App``` 组件。  
需要注意的是该组件，必须设定宽高（横向滚动需要设置宽度，纵向滚动需要设置高度）。  
由于 ```ScrollView``` 继承 ```View``` 所以```View```组件的属性，它都可以使用，以下列举的是它自身独有的属性。

### Prop
----
| 参数名字 | 值类型 | 默认值  | 说明 |  是否必需 |
|---------|---------|--------- |---------|---------|
| scrollbars| bool |  true | 是否出现滚动条 | 否 |
| direction| string |  'column' | 滚动方向(row/column) | 否 |
| bounce| bool |  true | 滚动到边界回弹 | 否 |
| beforeScrollStart | func | null | 滚动开始前执行事件 | 否 |
| scrollStart | func | null | 滚动开始执行事件 | 否 |
| scroll | func | null | 滚动中执行事件 | 否 |
| scrollEnd | func | null | 滚动结束执行事件 | 否 |
| scrollCancel | func | null | 滚动取消执行事件 | 否 |
| getScrollControl | func | null | 返回一个可控制滚动的函数 | 否
| mustScroll | bool | false | 和bounce配合使用，在子元素不满一页的情况下是否还能启用滚动 | 否

## View组件
----
整个框架的基础，所有元素都可以用它来替代。  
在CSS上对它进行了一些设置，这些设置都是移动端上不需要的：禁止了选择，使用合理的盒子模型以及取消了点击高亮的情况。  
```css
  user-select: none;
  box-sizing: border-box;
  position: relative;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
```
在JS上也进行了一些封装。使用它的时候很简单只需要传入以下属性去使用即可  

### Prop
----
| 参数名字 | 值类型 | 默认值  | 说明 |  是否必需 |
|---------|---------|--------- |---------|---------|
| className| string |  null | 该组件的样式类名 | 否 |
| id | string | null | 节点ID属性 | 否 |
| style| object |  null | 该组件的样式属性 | 否 |
| tap| func |  null | 点击事件 | 否 |
| touchStart| func |  null | 触摸开始事件 | 否 |
| touchMove| func |  null | 触摸移动事件 | 否 |
| touchEnd| func |  null | 触摸结束事件 | 否 |
| touchCancel| func |  null | 触摸取消事件 | 否 |
| transitionEnd| func |  null | 过渡动画结束事件 | 否 |
| animationStart| func |  null |  CSS 动画开始事件 |否 |
| animationIteration | func |  null | CSS 动画重复播放事件 |否 |
| animationEnd| func |  null |  CSS 动画结束事件 |否 |
| getRef | func | null | 获取DOM节点 | 否 |
| contextMenu | func | null | 上下文菜单事件 |否 |
| tapStopPropagation | bool | false | 防止tap事件穿透(当处于ScrollView内是不需要设置该值) | 否 |

### 方法

#### 1. toast 遮罩（toast mask）
由 ``` window.Qapp.showToast(object)``` 来控制出现，在指定时间之后消失。

```object``` 参数  

| 名字 | 值类型 | 默认值  | 说明 |  是否必需 |
|---------|---------|--------- |---------|---------|
| content | string  | null | 提示文字 | 是 |
| theme | number | 0 | 主体（黑底白字 0/白底黑字 1）| 否 |
| time | number | 2000 | 指定xx毫秒消失时间| 否 |
| zIndex | number | auto | 层级关系 | 否 |

#### 2. copy 函数（copy function)
由 ``` window.Qapp.copy.setCopy(object)``` 来把指定的字符设置进剪切板中。

```object``` 参数  

| 名字 | 值类型 | 默认值  | 说明 |  是否必需 |
|---------|---------|--------- |---------|---------|
| text | string  | "" | 需要复制的文字 | 是 |
| success | func  | null | 成功回调，第一个参数是当前需要复制字符串 | 否 |
| error | func  | null | 失败回调，第一个参数是当前需要复制字符串 | 否 |
