document.addEventListener('DOMContentLoaded', function () {
	const navToggle = document.getElementById('nav-toggle');
	const navMenu = document.getElementById('nav-menu');
	const iconOpen = document.getElementById('icon-open');
	const iconClose = document.getElementById('icon-close');

	if (!navToggle || !navMenu) return;

	// Helper to set state based on viewport width
	function updateMenuForWidth() {
		const isDesktop = window.innerWidth >= 768; // Tailwind md breakpoint
		if (isDesktop) {
			// Ensure menu is visible on desktop
				// remove any inline styles we use for animation and ensure visible
				navMenu.style.maxHeight = '';
				navMenu.style.opacity = '';
				if (iconOpen) iconOpen.classList.add('hidden');
				if (iconClose) iconClose.classList.add('hidden');
				navToggle.setAttribute('aria-expanded', 'false');
			// hide the toggle button visually on desktop (if you prefer)
			// navToggle.style.display = 'none';
		} else {
			// On mobile, respect aria-expanded
			const expanded = navToggle.getAttribute('aria-expanded') === 'true';
			if (expanded) {
					// animate open
					navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
					navMenu.style.opacity = '1';
					if (iconOpen) iconOpen.classList.add('hidden');
					if (iconClose) iconClose.classList.remove('hidden');
			} else {
					// animate close
					navMenu.style.maxHeight = '0';
					navMenu.style.opacity = '0';
					if (iconOpen) iconOpen.classList.remove('hidden');
					if (iconClose) iconClose.classList.add('hidden');
			}
			// navToggle.style.display = '';
		}
	}

	// Initial sync
	updateMenuForWidth();

	// Keep in sync on resize
	window.addEventListener('resize', function () {
		updateMenuForWidth();
	});

	// Toggle on click (mobile)
	navToggle.addEventListener('click', function () {
		const expanded = navToggle.getAttribute('aria-expanded') === 'true';
		navToggle.setAttribute('aria-expanded', String(!expanded));
			if (expanded) {
				// currently open -> close
				navMenu.style.maxHeight = '0';
				navMenu.style.opacity = '0';
			} else {
				// currently closed -> open
				navMenu.style.maxHeight = navMenu.scrollHeight + 'px';
				navMenu.style.opacity = '1';
			}
			if (iconOpen && iconClose) {
				iconOpen.classList.toggle('hidden');
				iconClose.classList.toggle('hidden');
			}
	});

		// Close menu when a link inside it is clicked (mobile)
		const menuLinks = navMenu.querySelectorAll('a');
		if (menuLinks && menuLinks.length) {
			menuLinks.forEach(function (link) {
				link.addEventListener('click', function () {
					// only close if on mobile
					if (window.innerWidth < 768) {
						navToggle.setAttribute('aria-expanded', 'false');
						navMenu.style.maxHeight = '0';
						navMenu.style.opacity = '0';
						if (iconOpen && iconClose) {
							iconOpen.classList.remove('hidden');
							iconClose.classList.add('hidden');
						}
					}
				});
			});
		}
});
