import CookiebotPopup from './class-cookiebot-popup';

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
