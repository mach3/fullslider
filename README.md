
# FullSlider version 1.0

1. これはなに
1. 使い方
1. オプション
1. スタイルシートについて

## これはなに

画面幅全体に広がるタイプのオーソドックスなスライダーです。
各スライドにダイアログを下から出現させ、表示させます。

## 動作に必要なもの

- [jQuery](http://jquery.com)
- [jQuery.easing](http://gsgd.co.uk/sandbox/jquery/easing/) ※イージングをカスタマイズする場合のみ

- fullslider.js (assets/js/fullslider/fullslider.js)
- fullslider.css (assets/csss/fullslider.css)


## 環境

JavaScript自体は下記の環境で検証しました。

- Firefox 最新版
- Chrome 最新版
- IE7+

スタイルシートについてはそれぞれ最新版にて検証、また、Mac版Webkitに最適化されています。
頑張ってCSSにて調整をしてください。


## 使い方

必要なリソースをロードします。

```html
<link rel="stylesheet" href="the/path/to/fullslider.css" />
<script type="text/javascript" src="the/path/to/jquery.min.js"></script>
<script type="text/javascript" src="the/path/to/jquery.easing.min.js"></script>
<script type="text/javascript" src="the/path/to/fullslider.js"></script>
```

マークアップします。  
※HTMLの実装例についてはデモ (demo/index.html) をご参照ください。  
また、id は後からJavaScriptで使用する為の物なので、任意の物で結構です。

```html
<div id="my-full-slider" class="my-full-slider">
	...
</div>
```

実装します。これでスライダーが動作すると思います。

```js
$("#my-full-slider").fullSlider();
```

あるいは、引数でオプション（後述）を渡して動作を変更する事ができます。

```js
$("#my-full-slider").fullSlider({
	slideDuration : 800,
	slideEasing : "easeOutBounce"
});
```

## オプション

※ オプション名 : 型 (初期値)

### slideDuration : Integer (500)

左右にスライドするアニメーションの速度（ミリ秒）  

### slideEasing : String (swing)

左右にスライドするアニメーションのイージング関数

### imageDuration : Integer (300)

イメージ画像のフェードインアニメーションの速度（ミリ秒）

### imageEasing : String (linear)

イメージ画像のフェードインアニメーションのイージング関数

### dialogDuration : Integer (300)

下から出現するダイアログのスライドアニメーションの速度（ミリ秒）

### dialogEasing : String (swing)

下から出現するダイアログのスライドアニメーションのイージング関数

### inactiveImageAlpha : Number (0.3)

非アクティブの画像のアルファ値（スタイルシートと合わせる事）




## 制作者

mach3ss

- [Blog](http://blog.mach3.jp)
- [Website](http://www.mach3.jp)
- [Twitter](http://twitter.com/mach3ss)



