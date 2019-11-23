import EasyJsSlider from './js/EasyJsSlider';

import './scss/EasyJsSlider.scss';
import './scss/animations/fade-shift.scss';

const slider = new EasyJsSlider({
  slider: '.easy-js-slider',
  animationName: 'fade-shift',
  animationDuration: 1,
  useDots: true,
  useAutoPlay: true,
  autoPlayInterval: 5,
});

slider.sliderInit();
