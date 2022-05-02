import { showHide, slideToggle } from './util';

export default class CookiebotPopup {
	constructor() {
		this.cookiebanner = document.getElementById('cookiebanner');
		this.detailsModal = document.getElementById('cookiebannerDetails');
		this.showDetailsLink = document.getElementById('HuddlyCookiebotListToggle');
	}

	init = () => {
		const _this = this;

		this.handleMissingHideDetailsLabel();
		this.setModalHeight();

		window.addEventListener('resize', () => {
			this.setModalHeight();
		});

		document.addEventListener('click', (e) => {
			const { target } = e;
			if (!target) return;

			// Toggle detail modal
			if (target.hasAttribute('data-toggle-details-modal')) {
				showHide(this.detailsModal, 'flex');
				_this.setModifierClass(this.cookiebanner, 'details-open');
				const modifierClass = _this.setModifierClass(this.showDetailsLink);
				_this.setDetailsText(this.showDetailsLink, modifierClass);
				_this.setAriaState(this.showDetailsLink, modifierClass);
			}

			// Toggle detail accordions
			if (target.hasAttribute('data-accordion-toggle')) {
				_this.toggleAccordion(target);
				const modifierClass = _this.setModifierClass(target);
				_this.setAriaState(target, modifierClass);
			}
		});
	};

	handleMissingHideDetailsLabel = () => {
		const needle = '[#HIDE_DETAILS#]';
		const replacement = CookiebotDialog.hideDetailsText;
		this.cookiebanner.querySelectorAll('button').forEach((button) => {
			if (button.innerHTML.indexOf(needle) < 0) return;
			button.innerText = button.innerText.replace(needle, replacement);
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

	toggleAccordion = (el) => {
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
