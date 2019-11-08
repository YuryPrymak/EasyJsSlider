export default class Slider {
  constructor({ slider, animation, animationDuration, useDots }) {
    this.animation = animation;
    this.slider = slider;
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
  }

  sliderInit() {
    this.btnPrevSlide.addEventListener('click', () => {
      if(this.currentSlide > 0) {
        this.changeSlide(this.currentSlide - 1, this.prev);
      } else {
        this.changeSlide(this.quantitySlides - 1, this.prev);
      }
    });

    this.btnNextSlide.addEventListener('click', () => {
      if(this.currentSlide < this.quantitySlides - 1) {
        this.changeSlide(this.currentSlide + 1, this.next);
      } else {
        this.changeSlide(0, this.next);
      }
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

      const sliderEl = document.querySelector(this.slider);
      sliderEl.appendChild(dotsWrapper);
      this.dotsWrapper = document.querySelector(`${this.slider} .dots`);
      this.dots = document.querySelectorAll(`${this.slider} .dot`);

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

    for(let i = 0; i < this.slides.length; i++) {
      if(i !== 0) {
        this.slides[i].classList.add('hidden-slide');
      }
      this.slides[i].style.animationDuration = `${this.animationDuration}s`;
    }
  }

  changeSlide(index, direction) {
    if(!this.isAnimating) {
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
