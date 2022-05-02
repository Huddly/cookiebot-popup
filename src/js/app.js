import CookiebotPopup from './class-cookiebot-popup';

function showCookieBanner() {
	new CookiebotPopup().init();
	cookiebanner.style.display = 'block';
}
function hideCookieBanner() {
	cookiebanner.style.display = 'none';
}

window.addEventListener('CookiebotOnDialogInit', () => {
	if ((process.env.NODE_ENV || '').trim() !== 'development') {
		showCookieBanner();
	}
});

window.showCookieBanner = showCookieBanner;
window.hideCookieBanner = hideCookieBanner;
