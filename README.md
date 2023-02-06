# [Webpack](https://webpack.kr/)

## 왜 사용해야하는가?
IE의 ES6 지원율은 약 11%이다. 이에 따라 구형 브라우저에서 문제 없이 동작시키기 위한 개발 환경을 구축하는 것이 필요하다. 또한 대부분의 프로젝트가 모듈을 사용하므로 모듈 로더가 필요하다. ESM에서 대부분 지원하나 구형 브라우저는 지원하지 않으며 ESM을 사용해도 트랜스파일링이나 번들링이 필요하기 때문에 아직은 별도의 모듈 로더를 사용한다. 

<br/>

## Webpack
의존 관게에 있는 자바스크립트, css, 이미지 등의 리소스를 하나의 파일로 번들링하는 모듈 번들러이다. 별도의 모듈 로더가 필요없기 때문에 여러 개의 자바스크립트 파일을 로드해야 하는 번거로움이 사라진다.

- 매우 꼼꼼한 구성으로 중/대형 프로젝트에 적합하다.

### 설치 및 실행방법

#### 1-1. 설치하기
`npm i -D webpack webpack-cli webpack-dev-server@next`
> cli는 명령어를 의미하며 마지막 패키지는 개발 특화 페이지로 즉각적으로 새로고침이 가능하게 해준다.

#### 1-2. js/main.js 파일 생성하기

#### 1-3. package.json에 dev와 build 경로 설정하기
```json
  "scripts": {
    "dev":"webpack-dev-server --mode development",
    "bulid": "webpack --mode production"
  }
```

> `npm run dev`와 `npm run build`시 webpack을 실행할 수 있다.

<br/>


### entry, output

#### 2-1. webpack.config.js 파일을 생성 후 다음 입력하기

```js
// webpack.config.js 
const path = require('path')

module.exports = {
  // 파일을 읽기 위한 진입점 설정
  entry:'./js/main.js',

  // 번들을 반환하는 설정
  output: {
    path: path.resolve(__dirname,'dist'), // 절대경로여야 한다. 그에 따라 require('path') 모듈을 가져와서 사용한다. __dirname은 현재 경로를 의미한다. 그리고 'dist'(기본설정)라는 폴더에서
    filename:'main.js', // // 해당 파일로 내어준다.
    clean: true // 루트 변경 시 기존 파일 삭제 여부
  }
}
```

> `npm run build`시 main.js파일의 내용이 'dist'폴더에 번들러되어 추가된다.

<br/>

### plugins
#### 3-1. 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설치한다.
`npm i -D html-webpack-plugin`

#### 3-2. index.html 파일 생성하기

#### 3-3. webpack.config.js 생성 후 다음 내용 작성하기
```js
// webpack.config.js
const HtmlPlugin = require('html-webpack-plugin')

  plugins: [ // enrty에서 output하는 과정에서 plugin을 사용한다.
    new HtmlPlugin({
      template: './index.html' // 템플릿으로 해당 파일을 사용한다.
    })
  ]
```

#### 3-4. webpack.config.js에 devServer 추가하기
```js
  devServer:{
    host: 'localhost'
  }
```


> `npm run dev`시 index.html파일을 dev 경로로 해서 오픈할 수 있다.



### 정적 파일 연결

#### 4-1. static 파일 생성 후 정적 파일(이미지 등) 넣고 html에 연결하기

```html
<!--index.html 폴더에 연결한다. 이때 html파일과 static 폴더안에 파일 역시 dist 폴더에 추가되므로 static 경로를 생략하여 작성할 수가 있다.-->
 <img src="./logo.png">
```

#### 4-2. static 파일을 dist 폴더에 자동으로 추가되도록 세팅하는 플러그인 설치하기
`npm i -D copy-webpack-plugin`

#### 4-3. webpack.config.js에 copyplugin 추가하기
```js
const CopyPlugin = require('copy-webpack-plugin')

  plugins: [ 
    new CopyPlugin({
      patterns: [
        { from : 'static'}
      ]
    })
  ]
```

> `npm run dev`시 static 폴더 안에 요소들이 run dev시 자동으로 dist 폴더로 연결된다.


### module


- css/main.css 생성

```js
// js/main.js 
import '../css/main.css'
```

// webpack은 css 파일을 읽을 수가 없음. 그저 dist 폴더로 내어주는 역할만 함. 따라서 css를 읽을 수 있는 외부의 패키지를 설치해야 함.

`npm i -D css-loader style-loader`

```js
  module: {
    rules:[
      {
        test: /\.css$/, // css로 끝나는 확장자를 가진 파일
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
```
// webpack.config.js에서 module 추가하기

`npm run dev`
> commit : 여기까지 하면 css 파일을 연결할 수 있음.


### 6. scss
- css폴더와 파일을 scss로 이름변경하기

```js
// js/main.js
import '../scss/main.scss';
```

`npm i -D sass-loader sass`
// scss 파일을 읽을 수 있도록 해주는 패키지

```js
  module: {
    rules:[
      {
        test: /\.s?css$/, // css로 끝나는 확장자를 가진 파일
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
```
// webpack.config.js에서 module 추가하기


`npm run dev`
> 여기까지 하면 scss 파일을 실시간으로 적용할 수 있음

### 7. autoprefixer

`npm i -D postcss autoprefixer postcss-loader`
// 공급업체 접두사를 자동으로 붙여주는 패키지
// postcss는 후처리를 도와주는 패키지이다.

```js
  module: {
    rules:[
      {
        test: /\.s?css$/, // css로 끝나는 확장자를 가진 파일
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader', // 순서가 중요하다.
          'sass-loader'
        ]
      }
    ]
  }
```
// webpack.config.js에서 module 추가하기

```json
"browserslist": [
  "> 1%", // 1% 이상의 브라우저에서
  "last 2 version" // 마지막 2개의 버전 지원
]
```

- .postcssrc.js 파일 생성

```js
// .postcssrc.js
module.exports = {
  plugins:[
    require('autoprefixer')
  ]
}
```

`npm run dev`
> 여기까지 하면 자동으로 브라우저 접두사가 붙는다.



### 8. babel

`npm i @babel/core @babel/preset-env @babel/plugin-transform-runtime`

// 최신 사양의 소스코드를 구형 브라우저에서도 동작하는 ES5 사양의 소스코드로 변환(트랜스파일링)을 할 수 있다.

- .babelrc.js 파일 생성

```js
// .babelrc.js
module.exports = {
  presets : ['@babel/preset-env'],
  plugins : [
    ['@babel/plugin-transform-runtime']
  ]
}
```

`npm i -D babel-loader`

```js
  module: {
    rules:[
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  }
```

// webpack.config.js에서 module 추가하기

> babel 설치완료


