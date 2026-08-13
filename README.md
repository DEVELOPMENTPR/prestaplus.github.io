# Presta+ — Landing de préstamos personales

Landing page de una sola página para un servicio de préstamos personales de hasta **S/ 2000**, con simulador de cuotas interactivo y contacto directo por WhatsApp.

## Estructura de archivos

```
├── index.html    # Marcado de la página (estructura y contenido)
├── styles.css    # Estilos (colores, tipografías, animaciones, responsive)
├── script.js     # Lógica interactiva (simulador, contador, WhatsApp, animaciones)
└── README.md     # Este archivo
```

Los tres archivos deben estar **en la misma carpeta**: `index.html` los referencia con rutas relativas (`href="styles.css"`, `src="script.js"`).

## Cómo verlo localmente

No necesita instalación ni servidor. Basta con abrir `index.html` directamente en el navegador (doble clic, o clic derecho → "Abrir con" → tu navegador).

Si prefieres levantarlo con un servidor local (opcional, útil si luego agregas más páginas):

```bash
# Con Python ya instalado
python3 -m http.server 8000
# Luego abre http://localhost:8000 en el navegador
```

## Cómo publicarlo (hosting)

Sirve en cualquier hosting de archivos estáticos. Opciones simples y gratuitas:

- **Netlify / Vercel**: arrastra la carpeta completa (los 3 archivos) a su panel de "deploy".
- **GitHub Pages**: sube los archivos a un repositorio y activa Pages en la configuración.
- **Hosting tradicional (cPanel, etc.)**: sube los 3 archivos por FTP a la carpeta pública (`public_html` o similar).

No requiere backend, base de datos ni build process — es HTML/CSS/JS puro.

## Secciones de la página

1. **Hero** — Presentación, monto máximo animado, tarjeta flotante estilo app bancaria y CTA principal a WhatsApp.
2. **Simulador** (`#simulador`) — Calculadora de cuota con dos plazos:
   - 30 días → interés 20%
   - 45 días → interés 25%
   
   Incluye botón para solicitar el monto simulado por WhatsApp, y un botón aparte para clientes que ya tienen un préstamo y quieren **ampliar el plazo 1 mes más** (mensaje predeterminado fijo).
3. **Contacto** (`#contacto`) — Datos de contacto, requisitos básicos y resumen de "cómo funciona" el proceso.

## Cosas que puedes personalizar fácilmente

| Qué cambiar | Dónde |
|---|---|
| Número de WhatsApp | `script.js` → constante `PHONE` (arriba del todo) |
| Mensajes predeterminados de WhatsApp | `script.js` → funciones `loanMsg()` y el texto dentro del listener de `extendWsp` |
| Tasas de interés / plazos | `index.html` → atributos `data-dias` y `data-tasa` de los botones `.plazo-btn`, sección `#simulador` |
| Monto mínimo/máximo del slider | `index.html` → `<input type="range" id="simAmount" min="100" max="2000" step="50">` |
| Nombre de la marca / logo de texto | `index.html` → clases `.brand` (header y footer) |
| Colores | `styles.css` → variables dentro de `:root` (`--navy`, `--blue`, `--sky`, etc.) |
| Tipografías | `index.html` → link de Google Fonts en el `<head>`, y `styles.css` → `font-family` en `h1,h2,h3` y `body` |
| Horario de atención / requisitos | `index.html` → sección `#contacto` |

## Notas

- El sitio usa **Google Fonts** (Sora, Inter, IBM Plex Mono) cargadas por CDN — se necesita conexión a internet para que se vean con la tipografía correcta (si no hay internet, cae a una fuente del sistema).
- Todo el cálculo del simulador es **referencial**; el texto de la propia página ya lo aclara para evitar malentendidos con los usuarios.
- Las animaciones respetan la preferencia de accesibilidad `prefers-reduced-motion` del sistema operativo del visitante (se desactivan automáticamente si el usuario así lo configuró).
- No se recolecta ni almacena ningún dato del usuario; todo el contacto se resuelve redirigiendo a WhatsApp.
