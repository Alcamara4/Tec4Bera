document.addEventListener('DOMContentLoaded', function () {
	// Función para hacer el mapa responsive
	initResponsiveMap();
	
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


// Función para hacer el mapa de Google Maps responsive
function initResponsiveMap() {
	const mapContainer = document.getElementById('map-container');
	const googleMap = document.getElementById('google-map');
	
	if (!mapContainer || !googleMap) return;
	
	// Función para ajustar el tamaño del mapa
	function adjustMapSize() {
		const screenWidth = window.innerWidth;
		
		if (screenWidth < 768) {
			// En móvil: hacer el mapa más pequeño y centrado
			googleMap.style.width = '100%';
			googleMap.style.maxWidth = '100%';
			googleMap.style.height = '300px';
			mapContainer.style.padding = '0 16px';
		} else if (screenWidth < 1024) {
			// En tablet: tamaño medio
			googleMap.style.width = '100%';
			googleMap.style.maxWidth = '500px';
			googleMap.style.height = '400px';
			mapContainer.style.padding = '0';
		} else {
			// En desktop: tamaño completo
			googleMap.style.width = '100%';
			googleMap.style.maxWidth = '600px';
			googleMap.style.height = '450px';
			mapContainer.style.padding = '0';
		}
	}
	
	// Ajustar el tamaño inicial
	adjustMapSize();
	
	// Ajustar el tamaño cuando cambie el tamaño de la ventana
	window.addEventListener('resize', function() {
		adjustMapSize();
	});
	
	// Ajustar el tamaño cuando cambie la orientación del dispositivo
	window.addEventListener('orientationchange', function() {
		// Pequeño delay para que el navegador actualice las dimensiones
		setTimeout(adjustMapSize, 100);
	});
}
