/**
 * Navigation - Mobile menu toggle and keyboard support
 *
 * @package Free_Psychicnet
 */

(function () {
	'use strict';

	const toggle = document.querySelector('.nav-toggle');
	const nav = document.querySelector('.site-header__nav');

	if (!toggle || !nav) return;

	// Toggle mobile menu
	toggle.addEventListener('click', function () {
		const expanded = this.getAttribute('aria-expanded') === 'true';
		this.setAttribute('aria-expanded', String(!expanded));
		nav.classList.toggle('is-open');

		if (!expanded) {
			// Focus first link when opening
			const firstLink = nav.querySelector('a');
			if (firstLink) firstLink.focus();
		}
	});

	// Close menu on Escape key
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && nav.classList.contains('is-open')) {
			toggle.setAttribute('aria-expanded', 'false');
			nav.classList.remove('is-open');
			toggle.focus();
		}
	});

	// Close menu when clicking outside
	document.addEventListener('click', function (e) {
		if (
			nav.classList.contains('is-open') &&
			!nav.contains(e.target) &&
			!toggle.contains(e.target)
		) {
			toggle.setAttribute('aria-expanded', 'false');
			nav.classList.remove('is-open');
		}
	});

	// Close menu on resize to desktop
	let resizeTimer;
	window.addEventListener('resize', function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function () {
			if (window.innerWidth > 1023 && nav.classList.contains('is-open')) {
				toggle.setAttribute('aria-expanded', 'false');
				nav.classList.remove('is-open');
			}
		}, 150);
	});
})();
