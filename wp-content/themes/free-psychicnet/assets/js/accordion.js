/**
 * Accordion - Accessible FAQ accordion
 *
 * @package Free_Psychicnet
 */

(function () {
	'use strict';

	function initAccordion(container) {
		const triggers = container.querySelectorAll('.accordion__trigger');

		triggers.forEach(function (trigger) {
			trigger.addEventListener('click', function () {
				const item = this.closest('.accordion__item');
				const panel = item.querySelector('.accordion__panel');
				const content = panel.querySelector('.accordion__content');
				const isOpen = item.getAttribute('data-open') === 'true';

				// Close all other items in same accordion
				const accordion = item.closest('.accordion');
				accordion.querySelectorAll('.accordion__item').forEach(function (other) {
					if (other !== item && other.getAttribute('data-open') === 'true') {
						other.setAttribute('data-open', 'false');
						other.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
						other.querySelector('.accordion__panel').style.maxHeight = '0';
					}
				});

				// Toggle current item
				if (isOpen) {
					item.setAttribute('data-open', 'false');
					this.setAttribute('aria-expanded', 'false');
					panel.style.maxHeight = '0';
				} else {
					item.setAttribute('data-open', 'true');
					this.setAttribute('aria-expanded', 'true');
					panel.style.maxHeight = content.scrollHeight + 'px';
				}
			});

			// Keyboard support
			trigger.addEventListener('keydown', function (e) {
				const accordion = this.closest('.accordion');
				const allTriggers = Array.from(accordion.querySelectorAll('.accordion__trigger'));
				const index = allTriggers.indexOf(this);

				switch (e.key) {
					case 'ArrowDown':
						e.preventDefault();
						if (index < allTriggers.length - 1) {
							allTriggers[index + 1].focus();
						}
						break;
					case 'ArrowUp':
						e.preventDefault();
						if (index > 0) {
							allTriggers[index - 1].focus();
						}
						break;
					case 'Home':
						e.preventDefault();
						allTriggers[0].focus();
						break;
					case 'End':
						e.preventDefault();
						allTriggers[allTriggers.length - 1].focus();
						break;
				}
			});
		});
	}

	// Initialize all accordions on the page
	document.querySelectorAll('.accordion').forEach(initAccordion);

	// FAQ category tab switching
	const faqTabs = document.querySelectorAll('[data-faq-tab]');
	if (faqTabs.length) {
		faqTabs.forEach(function (tab) {
			tab.addEventListener('click', function () {
				const targetSlug = this.getAttribute('data-faq-tab');

				// Update active tab
				faqTabs.forEach(function (t) {
					t.classList.remove('is-active');
					t.setAttribute('aria-selected', 'false');
				});
				this.classList.add('is-active');
				this.setAttribute('aria-selected', 'true');

				// Show/hide categories
				document.querySelectorAll('.faq-category').forEach(function (cat) {
					if (cat.id === 'faq-cat-' + targetSlug) {
						cat.classList.remove('hidden');
					} else {
						cat.classList.add('hidden');
					}
				});
			});
		});
	}
})();
