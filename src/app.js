import Slider from './js/slider';

import './scss/slider.scss';
import './scss/animations/fade-shift.scss';

const slider = new Slider({
  slider: '.slider',
  animationName: 'fade-shift',
  animationDuration: 1,
  useDots: true,
  useAutoPlay: true,
  autoPlayInterval: 5,
});

slider.sliderInit();
