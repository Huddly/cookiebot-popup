import CookiebotPopup from './class-cookiebot-popup';

function showCookieBanner() {
	new CookiebotPopup().init();
	cookiebanner.style.display = 'block';
}
function hideCookieBanner() {
	cookiebanner.style.display = 'none';
}

window.addEventListener('CookiebotOnDialogInit', () => {
	if ((process.env.NODE_ENV || '').trim() !== 'development') return;
	showCookieBanner();

	const hideProdBanner = function (mutationsList, observer) {
		for (const mutation of mutationsList) {
			if (mutation.type !== 'childList') continue;
			const cookiebanner = document.querySelector('#cookiebanner:not([data-development="true"])');
			if (!cookiebanner) continue;
			cookiebanner.remove();
			observer.disconnect();
		}
	};

	const observer = new MutationObserver(hideProdBanner);
	observer.observe(document.body, { childList: true });
});

window.showCookieBanner = showCookieBanner;
window.hideCookieBanner = hideCookieBanner;
