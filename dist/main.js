/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {

;// CONCATENATED MODULE: ./src/js/util.js
const slideToggle = (el, duration = 200) => {
  setTransition(el, {
    target: 'height',
    duration,
    type: 'linear'
  });
  el.style.overflowY = 'hidden';

  if (el.style.display !== 'block') {
    el.style.display = 'block';
    el.style.height = 'auto';
    const height = el.clientHeight + 'px';
    el.style.height = '0px';
    setTimeout(() => {
      el.style.height = height;
    }, 0);
    setTimeout(() => {
      el.style.height = 'auto';
    }, duration);
  } else {
    el.style.height = '0px';
    setTimeout(() => {
      el.style.display = 'none';
    }, duration);
  }
};
const showHide = (el, property = 'block') => {
  if (el.style.display !== 'none') {
    el.style.display = 'none';
  } else {
    el.style.display = property;
  }
};
const setTransition = (el, options) => {
  const {
    target,
    duration,
    type
  } = options;
  el.style.transition = `${target} ${duration}ms ${type}`;
  el.style.MozTransition = `${target} ${duration} ${type}`;
  el.style.WebkitTransition = `${target} ${duration} ${type}`;
  el.style.willChange = target;
};
;// CONCATENATED MODULE: ./src/js/class-cookiebot-popup.js

class CookiebotPopup {
  constructor() {
    this.cookiebanner = document.getElementById('cookiebanner');
    this.detailsModal = document.getElementById('cookiebannerDetails');
    this.showDetailsLink = document.getElementById('HuddlyCookiebotListToggle');
  }

  init = () => {
    const _this = this;

    this.setModalHeight();
    window.addEventListener('resize', () => {
      this.setModalHeight();
    });
    document.addEventListener('click', e => {
      const {
        target
      } = e;
      if (!target) return; // Toggle detail modal

      if (target.hasAttribute('data-toggle-details-modal')) {
        showHide(this.detailsModal, 'flex');

        _this.setModifierClass(this.cookiebanner, 'details-open');

        const modifierClass = _this.setModifierClass(this.showDetailsLink);

        _this.setDetailsText(this.showDetailsLink, modifierClass);

        _this.setAriaState(this.showDetailsLink, modifierClass);
      } // Toggle detail accordions


      if (target.hasAttribute('data-accordion-toggle')) {
        _this.toggleAccordion(target);

        const modifierClass = _this.setModifierClass(target);

        _this.setAriaState(target, modifierClass);
      }
    });
  };
  setModalHeight = () => {
    const winWidth = window.innerWidth;

    if (winWidth < 1000) {
      this.detailsModal.style.height = 'auto';
      return;
    }

    const winHeight = window.innerHeight;
    const cookiebannerHeight = this.cookiebanner.clientHeight;
    const margin = 48;
    const modalHeight = winHeight - cookiebannerHeight - margin * 2;
    this.detailsModal.style.top = `${margin}px`;
    this.detailsModal.style.height = `${modalHeight}px`;
  };
  toggleAccordion = el => {
    const id = el.getAttribute('data-accordion-toggle');
    const accordionContent = document.querySelector(`[data-accordion="${id}"]`);
    return slideToggle(accordionContent);
  };
  setModifierClass = (el, modifier = 'active') => {
    const [mainClass] = el.className.split(' ');
    const activeClass = `${mainClass}--${modifier}`;

    if (el.classList.contains(activeClass)) {
      el.classList.remove(activeClass);
    } else {
      el.classList.add(activeClass);
    }

    return activeClass;
  };
  setDetailsText = (el, activeClass) => {
    if (el.classList.contains(activeClass)) {
      el.innerHTML = CookiebotDialog.hideDetailsText;
    } else {
      el.innerHTML = CookiebotDialog.showDetailsText;
    }
  };
  setAriaState = (el, activeClass) => {
    if (el.classList.contains(activeClass)) {
      el.setAttribute('aria-hidden', false);
      el.setAttribute('aria-expanded', true);
    } else {
      el.setAttribute('aria-hidden', true);
      el.setAttribute('aria-expanded', false);
    }
  };
}
;// CONCATENATED MODULE: ./src/js/app.js


function showCookieBanner() {
  // cookiebanner.style.display = 'block';
  console.log('showCookieBanner');
}

function hideCookieBanner() {
  // cookiebanner.style.display = 'none';
  console.log('hideCookieBanner');
}

window.addEventListener('CookiebotOnDialogInit', () => {
  new CookiebotPopup().init();
});
})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
// extracted by mini-css-extract-plugin

})();

/******/ })()
;