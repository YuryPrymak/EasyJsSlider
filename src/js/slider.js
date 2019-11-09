export default class Slider {
  constructor({ slider, animation, animationDuration, useDots, useAutoPlay, autoPlayInterval }) {
    this.animation = animation;
    this.sliderId = slider;
    this.slider = document.querySelector(this.sliderId);
    this.slides = document.querySelectorAll(`${slider} .slide`);
    this.btnPrevSlide = document.querySelector(`${slider} .btnPrevSlide`);
    this.btnNextSlide = document.querySelector(`${slider} .btnNextSlide`);
    this.dotsWrapper;
    this.dots;
    this.currentSlide = 0;
    this.quantitySlides = this.slides.length;
    this.isAnimating = false;
    this.prev = 'prev';
    this.next = 'next';
    this.animationDuration = animationDuration;
    this.useDots = useDots;
    this.useAutoPlay = useAutoPlay;
    this.autoPlayInterval = autoPlayInterval;
    this.interval;
    this.firstTouchX;
    this.firstTouchY;
    this.diffX;
    this.diffY;
    this.touchEndX;
    this.touchEndY;
  }

  sliderInit() {
    this.btnPrevSlide.addEventListener('click', () => this.prevSlide());
    this.btnNextSlide.addEventListener('click', () => this.nextSlide());

    this.slider.addEventListener('touchstart', e => {
      this.firstTouchX = Math.floor(e.touches[0].clientX);
      this.firstTouchY = Math.floor(e.touches[0].clientY);
    });

    this.slider.addEventListener('touchmove', e => {
      this.touchEndX = Math.floor(e.touches[0].clientX);
      this.touchEndY = Math.floor(e.touches[0].clientY);

      this.diffX = Math.abs(this.firstTouchX - this.touchEndX);
      this.diffY = Math.abs(this.firstTouchY - this.touchEndY);
    });

    this.slider.addEventListener('touchend', () => {
      if(this.touchEndX < this.firstTouchX && this.diffX > this.diffY) {
        this.nextSlide();
      } else if(this.touchEndX > this.firstTouchX && this.diffX > this.diffY) {
        this.prevSlide();
      }
      this.diffX = 0;
    });

    if(this.useDots) {
      const dotsWrapper = document.createElement('ul');
      dotsWrapper.classList.add('dots');

      for(let i = 0; i < this.slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        if(i === 0) {
          dot.classList.add('active-dot');
        }
        dotsWrapper.appendChild(dot);
      }

      const sliderEl = document.querySelector(this.sliderId);
      sliderEl.appendChild(dotsWrapper);
      this.dotsWrapper = document.querySelector(`${this.sliderId} .dots`);
      this.dots = document.querySelectorAll(`${this.sliderId} .dot`);

      this.dotsWrapper.addEventListener('click', e => {
        if(e.target && e.target.nodeName === 'LI' && e.target.className === 'dot') {
          const index = [...e.target.parentElement.children].indexOf(e.target);
          if(this.currentSlide > index) {
            this.changeSlide(index, this.prev);
          } else {
            this.changeSlide(index, this.next);
          }
        }
      });
    }

    if(this.useAutoPlay) {
      this.startSlider();
    }

    for(let i = 0; i < this.slides.length; i++) {
      if(i !== 0) {
        this.slides[i].classList.add('hidden-slide');
      }
      this.slides[i].style.animationDuration = `${this.animationDuration}s`;
    }
  }

  prevSlide() {
    if(this.currentSlide > 0) {
      this.changeSlide(this.currentSlide - 1, this.prev);
    } else {
      this.changeSlide(this.quantitySlides - 1, this.prev);
    }
  }

  nextSlide() {
    if(this.currentSlide < this.quantitySlides - 1) {
      this.changeSlide(this.currentSlide + 1, this.next);
    } else {
      this.changeSlide(0, this.next);
    }
  }

  startSlider() {
    clearTimeout(this.interval);
    this.interval = setTimeout(() => {
      if(this.currentSlide < this.quantitySlides - 1) {
        this.changeSlide(this.currentSlide + 1, this.next);
      } else {
        this.changeSlide(0, this.next);
      }
    }, this.autoPlayInterval * 1000);
  }

  changeSlide(index, direction) {
    if(!this.isAnimating && !document.hidden) {
      this.isAnimating = !this.isAnimating;
      this.deleteClasses();
      this.slides[this.currentSlide].classList.add(`${this.animation}-${direction}-slide-hide`);
      this.currentSlide = index;
      this.deleteClasses();
      this.slides[this.currentSlide].classList.add(`${this.animation}-${direction}-slide-show`);
      if(this.useDots) {
        this.changeDot(index);
      }

      setTimeout(() => {
        this.isAnimating = !this.isAnimating;
      }, this.animationDuration * 1000);
    }

    if(this.useAutoPlay) {
      this.startSlider();
    }
  }

  changeDot(index) {
    for(let i = 0; i < this.dots.length; i++) {
      this.dots[i].classList.remove('active-dot');
    }
    this.dots[index].classList.add('active-dot');
  }

  deleteClasses() {
    const classes = [
      'hidden-slide',
      `${this.animation}-next-slide-show`,
      `${this.animation}-next-slide-hide`,
      `${this.animation}-prev-slide-show`,
      `${this.animation}-prev-slide-hide`,
    ];
    this.slides[this.currentSlide].classList.remove(...classes);
  }
}
