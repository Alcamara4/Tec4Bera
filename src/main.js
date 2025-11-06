// Configuración de Tailwind CSS
if (typeof tailwind !== 'undefined') {
	tailwind.config = {
		theme: {
			extend: {
				fontFamily: {
					'sans': ['Encode Sans', 'sans-serif'],
				}
			}
		}
	}
}

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

// Función para animar el timeline al hacer scroll de la pagina de la institucion 
function initTimelineScrollAnimation() {
	const timeline = document.getElementById('timeline');
	if (!timeline) return;
	
	// Obtener elementos del timeline
	const timelineItems = timeline.querySelectorAll('.relative .flex');
	const verticalLine = timeline.querySelector('.absolute');
	
	// Estado del scroll
	let isScrollingDown = false;
	let lastScrollY = window.scrollY;
	let hasAnimated = false;
	
	function handleScroll() {
		const currentScrollY = window.scrollY;
		const timelineRect = timeline.getBoundingClientRect();
		const windowHeight = window.innerHeight;
		
		// Detectar dirección del scroll
		isScrollingDown = currentScrollY > lastScrollY;
		
		// Calcular si el timeline está visible en la pantalla
		const isTimelineVisible = timelineRect.top < windowHeight && timelineRect.bottom > 0;
		
		if (isTimelineVisible && !hasAnimated) {
			// Solo animar una vez cuando aparece
			if (isScrollingDown) {
				// Animar elementos del timeline uno por uno
				timelineItems.forEach((item, index) => {
					setTimeout(() => {
						item.style.opacity = '1';
						item.style.transform = 'translateX(0)';
						item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
					}, index * 200); // Delay escalonado de 200ms
				});
				
				// Animar línea vertical
				setTimeout(() => {
					verticalLine.style.opacity = '1';
					verticalLine.style.transform = 'scaleY(1)';
					verticalLine.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
				}, 100);
				
				hasAnimated = true;
			}
		} else if (!isTimelineVisible && hasAnimated) {
			// Resetear cuando sale de vista
			timelineItems.forEach(item => {
				item.style.opacity = '0';
				item.style.transform = 'translateX(-30px)';
				item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
			});
			
			verticalLine.style.opacity = '0';
			verticalLine.style.transform = 'scaleY(0)';
			verticalLine.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
			
			hasAnimated = false;
		}
		
		lastScrollY = currentScrollY;
	}
	
	// Estado inicial - oculto
	timelineItems.forEach(item => {
		item.style.opacity = '0';
		item.style.transform = 'translateX(-30px)';
		item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
	});
	
	verticalLine.style.opacity = '0';
	verticalLine.style.transform = 'scaleY(0)';
	verticalLine.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
	
	// Agregar event listener para scroll
	window.addEventListener('scroll', handleScroll, { passive: true });
	
	// Verificar estado inicial
	handleScroll();
}

// Inicializar animación del timeline cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
	initTimelineScrollAnimation();
	initAccordion();
	initPracticasAccordion();
	
	// Inicializar el cambio de color de fondo en la página de Prácticas
	const mainBody = document.getElementById('main-body');
	if (mainBody) {
		// Detectar el scroll y actualizar el color del fondo
		window.addEventListener('scroll', updateBackgroundColor);
		
		// Actualizar al cargar la página
		window.addEventListener('load', updateBackgroundColor);
		updateBackgroundColor(); // Llamar inmediatamente también
	}
});

// Función para inicializar los acordeones
function initAccordion() {
	const accordionBtns = document.querySelectorAll('.accordion-btn');
	
	accordionBtns.forEach(btn => {
		btn.addEventListener('click', function() {
			const accordionContent = this.nextElementSibling;
			const accordionIcon = this.querySelector('.accordion-icon');
			const isOpen = accordionContent.classList.contains('accordion-open');
			
			// Cerrar todos los otros acordeones
			accordionBtns.forEach(otherBtn => {
				if (otherBtn !== this) {
					const otherContent = otherBtn.nextElementSibling;
					const otherIcon = otherBtn.querySelector('.accordion-icon');
					
					otherContent.classList.remove('accordion-open');
					otherContent.style.maxHeight = '0px';
					otherIcon.classList.remove('rotate-180');
					otherBtn.classList.remove('bg-blue-800', 'text-white');
					otherBtn.classList.add('text-blue-800');
					
					// Restaurar texto "Saber más" en otros botones
					const otherBtnText = otherBtn.childNodes[0];
					if (otherBtnText && otherBtnText.textContent) {
						otherBtnText.textContent = otherBtnText.textContent.replace('Mostrar menos', 'Saber más');
					}
				}
			});
			
			// Toggle del acordeón actual
			if (isOpen) {
				// Cerrar
				accordionContent.classList.remove('accordion-open');
				accordionContent.style.maxHeight = '0px';
				accordionIcon.classList.remove('rotate-180');
				this.classList.remove('bg-blue-800', 'text-white');
				this.classList.add('text-blue-800');
				
				// Cambiar texto a "Saber más"
				const btnText = this.childNodes[0];
				if (btnText && btnText.textContent) {
					btnText.textContent = btnText.textContent.replace('Mostrar menos', 'Saber más');
				}
			} else {
				// Abrir
				accordionContent.classList.add('accordion-open');
				accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
				accordionIcon.classList.add('rotate-180');
				this.classList.remove('text-blue-800');
				this.classList.add('bg-blue-800', 'text-white');
				
				// Cambiar texto a "Mostrar menos"
				const btnText = this.childNodes[0];
				if (btnText && btnText.textContent) {
					btnText.textContent = btnText.textContent.replace('Saber más', 'Mostrar menos');
				}
			}
		});
	});
}

// Función para inicializar los acordeones de la página de Prácticas
function initPracticasAccordion() {
	// Función para el acordeón de contenido
	window.toggleContent = function(cardNumber) {
		const content = document.getElementById(`content-${cardNumber}`);
		const button = event.target;
		
		if (content.classList.contains('max-h-0')) {
			content.classList.remove('max-h-0');
			button.textContent = 'Ver menos';
		} else {
			content.classList.remove('max-h-screen');
			content.classList.add('max-h-0');
			button.textContent = 'Ver más';
		}
	};
}

// Funciones para la página de Prácticas Profesionalizantes
// Paleta de colores de oscuro a claro
const colorPalette = [
	'#4A5568', // Más oscuro
	'#556275', // Medio-oscuro
	'#6C7A89', // Medio
	'#8B95A5', // Medio-claro
	'#A8B3C4'  // Más claro
];

function updateBackgroundColor() {
	const body = document.getElementById('main-body');
	if (!body) return;
	
	const windowHeight = window.innerHeight;
	const documentHeight = document.documentElement.scrollHeight - windowHeight;
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	
	// Calcular el porcentaje de scroll (0 a 1)
	const scrollPercent = Math.min(scrollTop / documentHeight, 1);
	
	// Calcular el índice en la paleta de colores
	const colorIndex = scrollPercent * (colorPalette.length - 1);
	const lowerIndex = Math.floor(colorIndex);
	const upperIndex = Math.min(Math.ceil(colorIndex), colorPalette.length - 1);
	const ratio = colorIndex - lowerIndex;
	
	// Interpolar entre dos colores
	const lowerColor = colorPalette[lowerIndex];
	const upperColor = colorPalette[upperIndex];
	const interpolatedColor = interpolateColor(lowerColor, upperColor, ratio);
	
	// Aplicar el color al fondo
	body.style.backgroundColor = interpolatedColor;
}

function interpolateColor(color1, color2, ratio) {
	// Convertir hex a RGB
	const hex1 = color1.replace('#', '');
	const hex2 = color2.replace('#', '');
	
	const r1 = parseInt(hex1.substring(0, 2), 16);
	const g1 = parseInt(hex1.substring(2, 4), 16);
	const b1 = parseInt(hex1.substring(4, 6), 16);
	
	const r2 = parseInt(hex2.substring(0, 2), 16);
	const g2 = parseInt(hex2.substring(2, 4), 16);
	const b2 = parseInt(hex2.substring(4, 6), 16);
	
	// Interpolar
	const r = Math.round(r1 + (r2 - r1) * ratio);
	const g = Math.round(g1 + (g2 - g1) * ratio);
	const b = Math.round(b1 + (b2 - b1) * ratio);
	
	// Convertir de vuelta a hex
	return '#' + [r, g, b].map(x => {
		const hex = x.toString(16);
		return hex.length === 1 ? '0' + hex : hex;
	}).join('');
}

// Función para hacer scroll al contenido
window.scrollToContent = function() {
	const contentSection = document.getElementById('content-section');
	if (contentSection) {
		// Mostrar el contenido
		contentSection.classList.remove('hidden');
		// Pequeño delay para que la transición se vea
		setTimeout(() => {
			contentSection.classList.remove('opacity-0');
			contentSection.classList.add('opacity-100');
		}, 10);
		
		// Hacer scroll suave hacia el contenido
		setTimeout(() => {
			contentSection.scrollIntoView({ 
				behavior: 'smooth',
				block: 'start'
			});
		}, 100);
	}
};

// Función para toggle de información
window.toggleInfo = function(tipo, button) {
	const infoElement = document.getElementById('info-' + tipo);
	const span = button.querySelector('span');
	const svg = button.querySelector('svg');
	const imagesPrivadas = tipo === 'privadas' ? document.getElementById('images-privadas') : null;
	
	if (infoElement) {
		// Verificar si está expandido
		const isExpanded = infoElement.style.maxHeight && infoElement.style.maxHeight !== '0px';
		
		if (isExpanded) {
			// Ocultar
			infoElement.style.maxHeight = '0px';
			if (span) span.textContent = 'Ver más';
			if (svg) svg.style.transform = 'rotate(0deg)';
			
			// Ocultar imágenes si es la sección de privadas
			if (imagesPrivadas) {
				imagesPrivadas.classList.remove('opacity-100');
				imagesPrivadas.classList.add('opacity-0');
				setTimeout(() => {
					imagesPrivadas.classList.add('hidden');
				}, 300);
			}
		} else {
			// Mostrar
			infoElement.style.maxHeight = infoElement.scrollHeight + 'px';
			if (span) span.textContent = 'Ver menos';
			if (svg) svg.style.transform = 'rotate(180deg)';
			
			// Mostrar imágenes si es la sección de privadas
			if (imagesPrivadas) {
				imagesPrivadas.classList.remove('hidden');
				setTimeout(() => {
					imagesPrivadas.classList.remove('opacity-0');
					imagesPrivadas.classList.add('opacity-100');
				}, 10);
			}
		}
	}
};

// Función para toggle de información municipal
window.toggleMunicipalInfo = function(button) {
	const subSections = document.getElementById('municipal-sub-sections');
	const span = button.querySelector('span');
	const svg = button.querySelector('svg');
	
	if (subSections) {
		// Verificar si está visible
		const isVisible = !subSections.classList.contains('hidden');
		
		if (isVisible) {
			// Ocultar
			subSections.classList.add('hidden');
			subSections.classList.remove('opacity-100');
			subSections.classList.add('opacity-0');
			if (span) span.textContent = 'Ver más';
			if (svg) svg.style.transform = 'rotate(0deg)';
		} else {
			// Mostrar
			subSections.classList.remove('hidden');
			setTimeout(() => {
				subSections.classList.remove('opacity-0');
				subSections.classList.add('opacity-100');
			}, 10);
			if (span) span.textContent = 'Ver menos';
			if (svg) svg.style.transform = 'rotate(180deg)';
		}
	}
};



