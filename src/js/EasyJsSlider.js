export default class EasyJsSlider {
  constructor({ slider, animationName, animationDuration = 1, useDots = false, useAutoPlay = false, autoPlayInterval = 5 }) {
    this.slider = document.querySelector(slider);
    this.slides = this.slider.querySelectorAll('.slide');
    this.btnPrevSlide = this.slider.querySelector('.btnPrevSlide');
    this.btnNextSlide = this.slider.querySelector('.btnNextSlide');
    this.animationName = animationName;
    this.animationDuration = animationDuration;
    this.isAnimating = null;
    this.currentSlide = 0;
    this.quantitySlides = this.slides.length;
    this.prev = 'prev';
    this.next = 'next';
    this.useDots = useDots;
    this.dotsWrapper = null;
    this.dots = null;
    this.useAutoPlay = useAutoPlay;
    this.autoPlayInterval = autoPlayInterval;
    this.interval = null;
    this.firstTouchX = null;
    this.firstTouchY = null;
    this.touchEndX = null;
    this.touchEndY = null;
    this.diffX = null;
    this.diffY = null;
  }

  sliderInit() {
    this.btnPrevSlide.addEventListener('click', () => this.prevSlide());
    this.btnNextSlide.addEventListener('click', () => this.nextSlide());
    this.slider.addEventListener('touchstart', e => this.touchStart(e));
    this.slider.addEventListener('touchmove', e => this.touchMove(e));
    this.slider.addEventListener('touchend', () => this.touchEnd());

    if(this.useDots) {
      this.createDots();
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

  touchStart(e) {
    this.firstTouchX = Math.floor(e.touches[0].clientX);
    this.firstTouchY = Math.floor(e.touches[0].clientY);
  }

  touchMove(e) {
    this.touchEndX = Math.floor(e.touches[0].clientX);
    this.touchEndY = Math.floor(e.touches[0].clientY);
    this.diffX = Math.abs(this.firstTouchX - this.touchEndX);
    this.diffY = Math.abs(this.firstTouchY - this.touchEndY);
  }

  touchEnd() {
    if(this.touchEndX < this.firstTouchX && this.diffX > this.diffY) {
      this.nextSlide();
    } else if(this.touchEndX > this.firstTouchX && this.diffX > this.diffY) {
      this.prevSlide();
    }
    this.diffX = 0;
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
      this.slides[this.currentSlide].classList.add(`${this.animationName}-${direction}-slide-hide`);
      this.currentSlide = index;
      this.deleteClasses();
      this.slides[this.currentSlide].classList.add(`${this.animationName}-${direction}-slide-show`);

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

  deleteClasses() {
    const classes = [
      'hidden-slide',
      `${this.animationName}-next-slide-show`,
      `${this.animationName}-next-slide-hide`,
      `${this.animationName}-prev-slide-show`,
      `${this.animationName}-prev-slide-hide`,
    ];
    this.slides[this.currentSlide].classList.remove(...classes);
  }

  createDots() {
    const dotsWrapper = document.createElement('ul');
    dotsWrapper.classList.add('dots-wrapper');

    for(let i = 0; i < this.slides.length; i++) {
      const dot = document.createElement('li');
      dot.classList.add('dot');
      if(i === 0) {
        dot.classList.add('active-dot');
      }
      dotsWrapper.appendChild(dot);
    }

    this.slider.appendChild(dotsWrapper);
    this.dotsWrapper = this.slider.querySelector('.dots-wrapper');
    this.dots = this.slider.querySelectorAll('.dot');

    this.dotsWrapper.addEventListener('click', e => {
      if(e.target && e.target.nodeName === 'LI' && e.target.className === 'dot') {
        const index = [...e.target.parentElement.children].indexOf(e.target);
        this.currentSlide > index ? this.changeSlide(index, this.prev) : this.changeSlide(index, this.next);
      }
    });
  }

  changeDot(index) {
    for(let i = 0; i < this.dots.length; i++) {
      this.dots[i].classList.remove('active-dot');
    }
    this.dots[index].classList.add('active-dot');
  }
}
