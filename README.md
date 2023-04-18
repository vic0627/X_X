# X_X 前端框架實驗
 
開發模式
`$ npm run dev`
 
## 實作項目
 
- Virtual DOM
- 生命週期
- 資料監聽、雙向綁定
- 動態路由



## 基本使用
### index.html
```html
<body>
  <div id="X_X"></div>
  <script src="./index.js" type="module"></script>
</body>
```
### index.js
```javascript 
import { x_x } from "./modules/X_X.js";
x_x.linkCSS("@/style.css").mount("X_X");
``` 
### 建立第一個元素
```javascript 
const titleNode = {
  tag: "h1",
  attrs: {
    class: "title-h1"
  },
  innerText: "Hello X_X"
};

const title = x_x.createNode(titleNode).addTo(x_x);
``` 
