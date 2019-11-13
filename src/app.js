import Slider from './js/slider';

import './scss/slider.scss';
import './scss/animations/horizontal-shift.scss';

const slider = new Slider({
  slider: '.slider',
  animationName: 'horizontal-shift',
  animationDuration: 0.7,
  useDots: true,
  useAutoPlay: true,
  autoPlayInterval: 5,
});

slider.sliderInit();
