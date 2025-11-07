# Tec4Bera

Sitio web oficial de la Escuela de Educación Secundaria Técnica N°4 "Prof. Ricardo Alberto López" de Berazategui. Portal institucional diseñado para informar a estudiantes, docentes y la comunidad educativa sobre las actividades, servicios y recursos de la institución.

## 📋 Descripción

Tec4Bera es un sitio web moderno y responsivo que presenta información sobre la institución educativa, incluyendo:

- Información institucional e historia
- Noticias y eventos
- Proceso de inscripciones
- Tecnicaturas disponibles (Informática y Programación)
- Prácticas profesionales
- Recursos internos (Campus, Mensajería, Pañol, Proyecto)

## 🚀 Características

- **Diseño Responsive**: Optimizado para dispositivos móviles, tablets y escritorio
- **Navegación Intuitiva**: Menú de escritorio y móvil con submenús interactivos
- **Animaciones Suaves**: Transiciones y efectos visuales para mejorar la experiencia de usuario
- **Video de Fondo**: Página principal con video hero atractivo
- **Mapa Interactivo**: Integración con Google Maps para mostrar la ubicación de la escuela
- **Acordeones Dinámicos**: Secciones expandibles para organizar información
- **Timeline Animado**: Línea de tiempo interactiva en la página de institución

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica del sitio
- **Tailwind CSS 4**: Framework CSS utility-first (vía CDN)
- **JavaScript (Vanilla)**: Interactividad y animaciones
- **Google Fonts**: Fuente Encode Sans
- **Google Maps API**: Mapa embebido para ubicación

## 📁 Estructura del Proyecto

```
src/
├── assets/              # Recursos multimedia (imágenes, videos, iconos)
│   ├── *.jpg, *.png    # Imágenes del sitio
│   ├── *.mp4           # Videos de fondo
│   └── *.ico, *.png    # Favicons
├── index.html          # Página principal
├── institucion.html    # Información institucional
├── Noticias.html       # Portal de noticias
├── Inscripciones.html  # Proceso de inscripciones
├── Tecnicaturas.html   # Información sobre tecnicaturas
├── Practicas.html      # Prácticas profesionales
├── Campus.html         # Acceso a Campus Virtual
├── Mensajeria.html     # Sistema de mensajería interna
├── pañol.html          # Información sobre pañol
├── proyecto.html       # Proyectos estudiantiles
├── main.js             # Script principal con funcionalidades
├── tailwind.config.js  # Configuración de Tailwind CSS
└── README.md           # Este archivo
```

## 🎯 Páginas del Sitio

### Página Principal (`index.html`)
- Hero section con video de fondo
- Información de bienvenida
- Ubicación de la escuela con mapa
- Enlace a InformaTec (portal de noticias)

### Institución (`institucion.html`)
- Historia de la escuela
- Timeline animado de hitos importantes
- Información sobre la institución

### Noticias (`Noticias.html`)
- Portal de noticias de la institución
- Enlaces a InformaTec

### Inscripciones (`Inscripciones.html`)
- Información sobre el proceso de inscripción
- Requisitos y documentación necesaria

### Tecnicaturas (`Tecnicaturas.html`)
- Información sobre las tecnicaturas disponibles
- Planes de estudio (Informática y Programación)

### Prácticas (`Practicas.html`)
- Información sobre prácticas profesionales
- Empresas oferentes
- Requisitos y procesos

### Recursos Internos
- **Campus** (`Campus.html`): Acceso al campus virtual
- **Mensajería** (`Mensajeria.html`): Sistema Mattermost
- **Pañol** (`pañol.html`): Información sobre el servicio de pañol
- **Proyectos** (`proyecto.html`): Proyectos estudiantiles

## 🚀 Instalación y Uso

### Requisitos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local (opcional, para desarrollo)

### Instalación

1. Clonar o descargar el repositorio:
```bash
git clone <url-del-repositorio>
cd Tec4Bera-main/src
```

2. Abrir el sitio:
   - **Opción 1**: Abrir `index.html` directamente en el navegador
   - **Opción 2**: Usar un servidor web local:
     ```bash
     # Con Python 3
     python -m http.server 8000
     
     # Con Node.js (http-server)
     npx http-server
     
     # Con PHP
     php -S localhost:8000
     ```

3. Acceder al sitio:
   - Navegador: `http://localhost:8000` (si usas servidor local)
   - O simplemente abrir `index.html` en el navegador

## ⚙️ Configuración

### Tailwind CSS
El proyecto utiliza Tailwind CSS vía CDN. La configuración personalizada se encuentra en `tailwind.config.js`:

```javascript
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Encode Sans', 'sans-serif'],
            }
        }
    }
}
```

### JavaScript
El archivo `main.js` contiene todas las funcionalidades interactivas:

- Menú móvil responsive
- Submenús (móvil y escritorio)
- Animaciones de timeline
- Acordeones
- Mapa responsive
- Transiciones y efectos

## 🎨 Personalización

### Fuentes
La fuente Encode Sans está configurada en `tailwind.config.js` y se carga desde Google Fonts en el `<head>` de cada página.

### Imágenes y Videos
Los recursos multimedia se encuentran en la carpeta `assets/`. Para agregar nuevas imágenes o videos, simplemente colócalos en esta carpeta y actualiza las referencias en los archivos HTML.

## 📱 Compatibilidad

El sitio es compatible con:
- ✅ Chrome (últimas versiones)
- ✅ Firefox (últimas versiones)
- ✅ Safari (últimas versiones)
- ✅ Edge (últimas versiones)
- ✅ Dispositivos móviles (iOS y Android)

## 🔗 Enlaces Externos

- **InformaTec**: https://informatec4.vercel.app/
- **Ubicación**: Calle 111 esquina 19, Berazategui
- **Teléfono**: 011 4261-4796

## 👥 Contribuciones

Este proyecto fue desarrollado por estudiantes de la Técnica 4. Las contribuciones son bienvenidas siguiendo las mejores prácticas de desarrollo web.

## 📄 Licencia

© 2025 Derechos Reservados a Estudiantes de la Técnica 4.

## 🐛 Problemas Conocidos

Si encuentras algún problema o tienes sugerencias de mejora, por favor abre un issue en el repositorio.

## 📞 Contacto

Para más información sobre la escuela:
- **Teléfono**: 011 4261-4796
- **Dirección**: Calle 111 esquina 19, Berazategui

---

**Desarrollado con ❤️ por estudiantes de la EEST N°4 "Prof. Ricardo Alberto López"**
