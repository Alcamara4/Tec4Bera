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
	initMobileSubmenus();
	initDesktopSubmenus();
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


// Submenús del menú móvil
function initMobileSubmenus() {
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    if (!submenuToggles || !submenuToggles.length) return;

    const navMenu = document.getElementById('nav-menu');

    // Función para actualizar la altura del menú móvil
    function updateNavMenuHeight() {
        if (window.innerWidth < 768 && navMenu) {
            // Obtener el contenedor interno del menú
            const innerContainer = navMenu.querySelector('.flex.justify-center');
            if (!innerContainer) return;
            
            // Calcular la altura real del contenido incluyendo márgenes
            const innerHeight = innerContainer.offsetHeight;
            const computedStyle = window.getComputedStyle(navMenu);
            const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
            const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
            
            // Calcular altura total
            const totalHeight = innerHeight + paddingTop + paddingBottom;
            
            // Aplicar la nueva altura
            navMenu.style.maxHeight = totalHeight + 'px';
        }
    }

    submenuToggles.forEach(function (toggleBtn) {
        toggleBtn.addEventListener('click', function () {
            const targetSelector = toggleBtn.getAttribute('data-target');
            if (!targetSelector) return;
            const submenu = document.querySelector(targetSelector);
            if (!submenu) return;

            const chevron = toggleBtn.querySelector('svg');
            const isOpen = submenu.style.maxHeight && submenu.style.maxHeight !== '0px';

            if (isOpen) {
                submenu.style.maxHeight = '0px';
                submenu.style.opacity = '0';
                if (chevron) chevron.classList.remove('rotate-180');
            } else {
                submenu.style.maxHeight = submenu.scrollHeight + 'px';
                submenu.style.opacity = '1';
                if (chevron) chevron.classList.add('rotate-180');
            }

            // Ajustar la altura del contenedor del menú móvil
            // Esperar múltiples frames y usar timeout para asegurar que el DOM se actualice
            // El submenú tiene una transición de 300ms, así que esperamos un poco más
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        updateNavMenuHeight();
                    }, 100); // Delay para que el submenú comience a expandirse
                    // También actualizar después de que termine la transición
                    setTimeout(() => {
                        updateNavMenuHeight();
                    }, 350); // Después de que termine la transición de 300ms
                });
            });
        });
    });
}

// Submenús del menú de escritorio
function initDesktopSubmenus() {
    // Solo ejecutar en escritorio (pantallas >= 768px)
    if (window.innerWidth < 768) {
        // Ocultar todos los submenús de escritorio en móvil
        const desktopSubmenus = document.querySelectorAll('ul[id^="desktop-submenu"]');
        desktopSubmenus.forEach(function(submenu) {
            submenu.style.opacity = '0';
            submenu.style.transform = 'translateY(-10px)';
            submenu.style.pointerEvents = 'none';
        });
        return;
    }

    const submenuContainers = document.querySelectorAll('.desktop-submenu-container');
    if (!submenuContainers || !submenuContainers.length) return;

    // Evitar duplicar event listeners usando una marca
    submenuContainers.forEach(function (container) {
        // Si ya tiene event listeners, no agregar más
        if (container.dataset.submenuInitialized === 'true') return;

        const trigger = container.querySelector('.desktop-submenu-trigger');
        const submenu = container.querySelector('ul[id^="desktop-submenu"]');
        
        if (!trigger || !submenu) return;

        // Marcar como inicializado
        container.dataset.submenuInitialized = 'true';

        let hideTimeout = null;
        let isMouseOverSubmenu = false;

        // Función para mostrar el submenú
        function showSubmenu() {
            if (hideTimeout) {
                clearTimeout(hideTimeout);
                hideTimeout = null;
            }
            submenu.style.opacity = '1';
            submenu.style.transform = 'translateY(0)';
            submenu.style.pointerEvents = 'auto';
            submenu.style.zIndex = '9999';
            isMouseOverSubmenu = true;
        }

        // Función para ocultar el submenú
        function hideSubmenu() {
            // No ocultar si el mouse todavía está sobre el submenú
            if (isMouseOverSubmenu) {
                return;
            }
            hideTimeout = setTimeout(function() {
                // Verificar nuevamente antes de ocultar
                if (!isMouseOverSubmenu) {
                    submenu.style.opacity = '0';
                    submenu.style.transform = 'translateY(-10px)';
                    submenu.style.pointerEvents = 'none';
                }
            }, 300); // Delay para dar tiempo suficiente
        }

        // Event listener para cuando el mouse entra al contenedor
        container.addEventListener('mouseenter', function() {
            showSubmenu();
        });

        // Event listener para cuando el mouse sale del contenedor
        container.addEventListener('mouseleave', function(e) {
            // Verificar si el mouse se está moviendo hacia el submenú
            const relatedTarget = e.relatedTarget;
            if (relatedTarget && (submenu.contains(relatedTarget) || submenu === relatedTarget)) {
                isMouseOverSubmenu = true;
                return; // No ocultar si el mouse va hacia el submenú
            }
            isMouseOverSubmenu = false;
            hideSubmenu();
        });

        // Event listeners específicos para el submenú - mantenerlo abierto
        submenu.addEventListener('mouseenter', function() {
            isMouseOverSubmenu = true;
            showSubmenu();
        });

        submenu.addEventListener('mouseleave', function(e) {
            const relatedTarget = e.relatedTarget;
            // Si el mouse no va hacia el trigger o el contenedor, ocultar
            if (!relatedTarget || (!container.contains(relatedTarget) && relatedTarget !== trigger)) {
                isMouseOverSubmenu = false;
                hideSubmenu();
            } else {
                isMouseOverSubmenu = true;
            }
        });

        // Asegurar que los enlaces sean clickeables y mantengan el submenú abierto
        const submenuLinks = submenu.querySelectorAll('a');
        submenuLinks.forEach(function(link) {
            link.addEventListener('mouseenter', function() {
                isMouseOverSubmenu = true;
                showSubmenu();
            });
            link.addEventListener('mouseover', function() {
                isMouseOverSubmenu = true;
                showSubmenu();
            });
            // Prevenir que el submenú se cierre al hacer clic
            link.addEventListener('mousedown', function(e) {
                isMouseOverSubmenu = true;
                showSubmenu();
            });
            link.addEventListener('click', function(e) {
                // Permitir que el enlace funcione normalmente
                isMouseOverSubmenu = true;
            });
        });
    });
}

// Manejar el resize de la ventana para submenús de escritorio
let desktopSubmenuResizeTimeout;
if (!window.desktopSubmenuResizeHandler) {
    window.desktopSubmenuResizeHandler = function() {
        clearTimeout(desktopSubmenuResizeTimeout);
        desktopSubmenuResizeTimeout = setTimeout(function() {
            // Resetear la marca de inicialización para permitir reinicialización
            const submenuContainers = document.querySelectorAll('.desktop-submenu-container');
            submenuContainers.forEach(function(container) {
                container.dataset.submenuInitialized = 'false';
            });
            // Reinicializar
            initDesktopSubmenus();
        }, 250);
    };
    window.addEventListener('resize', window.desktopSubmenuResizeHandler);
}


