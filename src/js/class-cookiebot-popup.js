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

		document.addEventListener('click', (e) => {
			const { target } = e;
			if (!target) return;

			// Handle views
			if (target.hasAttribute('data-hcb-view-anchor')) {
				const view = target.getAttribute('data-hcb-view-anchor');
				const viewElements = document.querySelectorAll('[data-hcb-view]');

				viewElements.forEach((el) => {
					if (el.getAttribute('data-hcb-view') === view) {
						el.style.display = 'block';
						el.setAttribute('aria-hidden', 'false');
					} else {
						el.style.display = 'none';
						el.setAttribute('aria-hidden', 'true');
					}
				});
			}

			// Handle triggers, these are buttons that clicks the id of the attribute
			if (target.hasAttribute('data-hcb-trigger')) {
				const id = target.getAttribute('data-hcb-trigger');
				const el = document.getElementById(id);
				if (el) el.click();
			}

			// Toggle detail accordions
			if (target.hasAttribute('data-hcb-accordion-toggle')) {
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

	toggleAccordion = (el) => {
		const id = el.getAttribute('data-hcb-accordion-toggle');
		const accordionContent = document.querySelector(`[data-hcb-accordion="${id}"]`);
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
