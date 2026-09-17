/**
 * Main JavaScript - General functionality
 *
 * @package Free_Psychicnet
 */

(function () {
	'use strict';

	/**
	 * Smooth scroll for anchor links
	 */
	document.querySelectorAll('a[href^="#"]').forEach(function (link) {
		link.addEventListener('click', function (e) {
			var targetId = this.getAttribute('href');
			if (targetId === '#') return;

			var target = document.querySelector(targetId);
			if (target) {
				e.preventDefault();
				var headerHeight = document.querySelector('.site-header')
					? document.querySelector('.site-header').offsetHeight
					: 0;

				window.scrollTo({
					top: target.offsetTop - headerHeight - 20,
					behavior: 'smooth',
				});

				// Set focus for accessibility
				target.setAttribute('tabindex', '-1');
				target.focus({ preventScroll: true });
			}
		});
	});

	/**
	 * Lazy load images using native loading attribute
	 * Add loading="lazy" to images below the fold
	 */
	document.querySelectorAll('img:not([loading])').forEach(function (img) {
		// Skip images in the first viewport
		var rect = img.getBoundingClientRect();
		if (rect.top > window.innerHeight) {
			img.setAttribute('loading', 'lazy');
		}
	});

	/**
	 * Filter bar functionality (Psychic Directory page)
	 */
	var filterTags = document.querySelectorAll('.filter-bar [data-filter]');
	if (filterTags.length) {
		filterTags.forEach(function (tag) {
			tag.addEventListener('click', function () {
				// Update active state
				filterTags.forEach(function (t) {
					t.classList.remove('is-active');
				});
				this.classList.add('is-active');

				// Filter logic placeholder - in production this would filter cards
				// For now just toggles active state for visual feedback
			});
		});
	}

	/**
	 * Scroll-based header shadow
	 */
	var header = document.querySelector('.site-header');
	if (header) {
		var lastScroll = 0;
		window.addEventListener(
			'scroll',
			function () {
				var currentScroll = window.pageYOffset;
				if (currentScroll > 10) {
					header.style.boxShadow =
						'0 4px 12px rgba(45, 42, 50, 0.08), 0 2px 4px rgba(45, 42, 50, 0.04)';
				} else {
					header.style.boxShadow = '';
				}
				lastScroll = currentScroll;
			},
			{ passive: true }
		);
	}

	/**
	 * Form validation enhancement
	 */
	var contactForm = document.querySelector('.contact-form');
	if (contactForm) {
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault();

			// Basic validation
			var isValid = true;
			this.querySelectorAll('[required]').forEach(function (field) {
				if (!field.value.trim()) {
					isValid = false;
					field.style.borderColor = 'var(--color-error)';
				} else {
					field.style.borderColor = '';
				}
			});

			if (isValid) {
				// Show success message (placeholder - would submit via AJAX in production)
				var btn = this.querySelector('button[type="submit"]');
				var originalText = btn.textContent;
				btn.textContent = 'Message Sent!';
				btn.disabled = true;
				btn.style.background = 'var(--color-success)';

				setTimeout(function () {
					btn.textContent = originalText;
					btn.disabled = false;
					btn.style.background = '';
					contactForm.reset();
				}, 3000);
			}
		});

		// Clear error state on input
		contactForm.querySelectorAll('[required]').forEach(function (field) {
			field.addEventListener('input', function () {
				this.style.borderColor = '';
			});
		});
	}
})();
