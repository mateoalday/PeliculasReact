# 🎬 CineTrack - Gestor de Películas y Series

**Trabajo Práctico: Programación Web Avanzada - Facultad de Informática**

---

## 👥 Miembros del Equipo
* **[MATTEO ALDAY]** - (PM / Scrum Master & Desarrollador) -
* **[JOAQUIN VULCANO]** - (Desarrollador) - 
* **[FIDEL PIZARRO]** - (Desarrollador)
* 
**Docentes Invitados al Tablero:**
* Agustin: guillermo.chiarotto@est.fi.uncoma.edu.ar
* Lucas: lucas.margni@est.fi.uncoma.edu.ar

---

## 📝 Descripción Básica de la Aplicación
**CineTrack** es una aplicación Web (SPA) desarrollada en React que funciona como un completo gestor personal de entretenimiento. Permite a los usuarios tener un control total sobre las películas y series que quieren ver, o que ya han visto. 
Cuenta con un catálogo inicial personalizable y da la posibilidad de añadir nuevas obras con sus respectivos detalles (título, director, año, género, rating y categoría). 

Entre sus funcionalidades principales destacan: búsquedas en tiempo real, múltiples filtros (por género y tipo), ordenamiento multidimensional (ascendente/descendente por año o rating), y un panel de estadísticas con el progreso del usuario. Todo el progreso se persiste automáticamente en el navegador usando `localStorage`.

---

## ⚙️ Funciones de los Archivos Iniciales

Al iniciar este proyecto se crearon y configuraron una serie de archivos vitales para el ecosistema de React (y Vite en nuestro caso):

* **`main.jsx` (Equivalente a `index.js`)**: Es el punto de entrada principal (Entry Point) de nuestra aplicación en React. Su función es tomar nuestro componente raíz (`App`) e incrustarlo en el DOM del navegador (en el div con id `root`).
* **`App.jsx`**: Es el componente principal y punto de partida de nuestra interfaz de usuario. Funciona como el contenedor que engloba a todas las páginas (como `Home.jsx`) y determina la estructura a alto nivel.
* **`index.css`**: Contiene los estilos globales de la aplicación. Aquí definimos reglas que afectan a toda la página, el reseteo del navegador (margin y padding cero) y variables de CSS importantes que luego utilizamos en nuestros Componentes.
* **`package.json`**: Es el documento de identidad de nuestro proyecto en el ecosistema Node y NPM. Contiene la lista de dependencias que instalamos, los scripts que usamos para levantar el entorno de desarrollo (como `npm run dev`) y metadata del repositorio.

---

## 🚀 Guía de Instalación (Paso a Paso)

Sigue estos pasos para correr el proyecto localmente en tu máquina:

1. **Clonar el repositorio:**
   Abre una terminal y ejecuta el siguiente comando:
   ```bash
   git clone https://github.com/mateoalday/PeliculasReact.git
   ```

2. **Ingresar a la carpeta del proyecto:**
   ```bash
   cd PeliculasReact
   ```

3. **Instalar las dependencias:**
   Usamos NPM para descargar todas las librerías necesarias especificadas en el `package.json`:
   ```bash
   npm install
   ```

4. **Correr la aplicación:**
   Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

5. **Abrir en el navegador:**
   La terminal mostrará un enlace (generalmente `http://localhost:5173`). ¡Hacé clic o pegalo en tu navegador para empezar a usar CineTrack!

---



## 🧩 Componentes de la Aplicación

Nuestra aplicación separa la interfaz en componentes reutilizables para mantener el código simple y ordenado:

* **`Catalogo`**: Muestra la cuadrícula principal con todas las películas y series filtradas.
* **`MediaCard`**: Tarjeta individual que muestra la información de una obra y sus botones de acción (editar, borrar, marcar visto).
* **`MediaList`**: Panel que divide las obras en las listas separadas de "Por Ver" y "Vistos".
* **`MediaForm`**: Formulario que usamos tanto para agregar nuevas obras como para editar las que ya existen.
* **`Filters`**: Agrupa el input de búsqueda interactivo y los filtros de género, tipo y ordenamiento.
* **`StatsPanel` y `Counter`**: Calculan y muestran en pantalla las estadísticas y el progreso (cantidades por género, etc.).
* **`Titulo`**: Componente visual reutilizable para los encabezados.
