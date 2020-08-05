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
