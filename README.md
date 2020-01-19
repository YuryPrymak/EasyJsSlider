# EasyJsSlider

EasyJsSlider is a fully responsive slider written in pure js (es6) and using css animation to change slides. It has many beautiful animations and flexible settings.

# Demo
[Demo](https://yuryprymak.github.io/demos/EasyJsSlider/)

# Features

- Has 10 different animations
- Responsive
- Support touch events
- Written in pure js without frameworks
- Easy to install and configure
- Has many settings
- Autoplay
- Accessible

# Usage

Download folder **EasyJsSlider** from **production** branch and put it on your **src** folder.

HTML structure:

```html
<div class="easy-js-slider">
  <ul class="slides">
    <li class="slide"><img src="" alt=""></li>
    <li class="slide"><img src="" alt=""></li>
  </ul>
  <button class="btn btnPrevSlide">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="6 3 12 17">
      <path d="M15.422 16.594l-1.406 1.406-6-6 6-6 1.406 1.406-4.594 4.594z"></path>
    </svg>
  </button>
  <button class="btn btnNextSlide">
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="6 3 12 17">
      <path d="M8.578 16.594l4.594-4.594-4.594-4.594 1.406-1.406 6 6-6 6z"></path>
    </svg> 
  </button>
</div>
```

Import js

`import EasyJsSlider from './EasyJsSlider/js/EasyJsSlider';`

Import scss

`import './EasyJsSlider/scss/EasyJsSlider.scss';`

Choose the animation you want to use and import scss file

`import './EasyJsSlider/scss/animations/fade-shift.scss';`

Set the slider parameters (not required parameters can be deleted) and call the method **.sliderInit()**

```js
const slider = new EasyJsSlider({
  slider: '.easy-js-slider',   // required, id or class your slider
  animationName: 'fade-shift', // required, the value must match the name of the scss file to be imported
  animationDuration: 1,        // time in sec (default 1)
  useDots: true,               // true / false (default false)
  useAutoPlay: true,           // true / false (default false)
  autoPlayInterval: 5,         // time in sec (default 5)
});

slider.sliderInit();
```

Summary file **src/app.js**

```js
import EasyJsSlider from './EasyJsSlider/js/EasyJsSlider';
import './EasyJsSlider/scss/EasyJsSlider.scss';
import './EasyJsSlider/scss/animations/fade-shift.scss';

const slider = new EasyJsSlider({
  slider: '.easy-js-slider',
  animationName: 'fade-shift',
  animationDuration: 1,
  useDots: true,
  useAutoPlay: true,
  autoPlayInterval: 5,
});

slider.sliderInit();
```

In the configuration file **src/EasyJsSlider/scss/partials/_config.scss** you can change the max-width and max-height. Also you can change colors.

You can set max-height:
- fixed in the pixels (px)
- relative height from width in the percent (%)
- use **vh** units.

```
$sliderMaxWidth: 900px;
$sliderMaxHeight: 60%; // 60% from width
$btnBgColor: #fff;
$btnBgColorHover: #ed3833;
$dotsBgColor: rgba(255, 255, 255, .4);
$dotsBgColorHover: rgba(255, 255, 255, .8);
$activeDotBgColor: rgba(255, 255, 255, .8);
$btnFocusColor: #fff;
```

# Available methods

Method | Description
--- | ---
.prevSlide() | Show previous slide
.nextSlide() | Show next slide
.startSlider() | Start autoplaying (works if **useAutoPlay: true**)
.stopSlider() | Stop autoplaying (works if **useAutoPlay: true**)

# License

MIT License (MIT) - (c) 2019 Yury Prymak