# Frontend - TicoAutos

Este proyecto corresponde al frontend de **TicoAutos**, una plataforma web para publicación y consulta de vehículos.  
El sistema permite a los usuarios explorar vehículos, registrarse, iniciar sesión, publicar vehículos y comunicarse mediante un sistema de preguntas y respuestas.

El frontend consume el API desarrollado en el backend y se encarga de la interacción visual con el usuario.

---

## Tecnologías utilizadas

- HTML5  
- CSS3  
- TailwindCSS  
- JavaScript (Vanilla)  
- Fetch API  
- Session Storage  

---

## Funcionalidades principales

### Autenticación
- Registro de usuarios  
- Inicio de sesión  
- Almacenamiento del token en sessionStorage  
- Redirección automática según autenticación  

### Navegación
- Página principal con acceso a:  
  - Ver vehículos  
  - Publicar vehículo  
  - Iniciar sesión  
- Redirección al login si el usuario no está autenticado  

### Vehículos
- Visualización de todos los vehículos  
- Filtros por:  
  - marca  
  - modelo  
  - año  
  - precio  
  - estado  
- Paginación simple  
- Visualización en tarjetas  
- Acceso al detalle del vehículo  
- Publicación de vehículos con imagen  

### Detalle de vehículo
- Consulta completa del vehículo  
- Visualización de datos del propietario  
  - Usuario autenticado: ve más información  
  - Usuario no autenticado: ve solo datos básicos  
- Botón para compartir enlace del vehículo  
- Generación de URL pública para compartir  

### Preguntas y respuestas
- Usuario autenticado puede hacer preguntas  
- Propietario puede responder preguntas  
- Visualización de conversaciones por vehículo  

---

## Instalación

1. Clonar el repositorio  
2. Abrir la carpeta del proyecto en el navegador o con Live Server  

(No requiere instalación de dependencias)

---

## Configuración

El frontend se conecta al backend mediante una URL base definida en los archivos JavaScript.  
Asegúrate de que el backend esté corriendo correctamente en el puerto configurado.

---

## Ejecución del proyecto

Abrir la página principal desde el navegador.

Se recomienda utilizar Live Server para evitar problemas de rutas.

---

## Consumo de API

El frontend consume las siguientes rutas del backend:

### Autenticación
- POST /auth/token  

### Usuarios
- GET /api/auth/user  

### Vehículos
- POST /api/vehicle  
- GET /api/vehicle  
- PUT /api/vehicle  
- DELETE /api/vehicle  

### Preguntas
- POST /api/question  
- GET /api/question  

### Respuestas
- POST /api/answer  
- GET /api/answer  

---

## Manejo de imágenes

Las imágenes de los vehículos se cargan desde el backend mediante rutas públicas.  

En caso de error al cargar una imagen, el sistema puede mostrar una imagen local por defecto.

---

## Manejo de autenticación

- El token JWT se guarda en sessionStorage  
- Se utiliza para acceder a rutas protegidas y mostrar contenido condicional  
- El token no se muestra al usuario en ningún momento  

---

## Reglas del sistema

- Un usuario no autenticado puede:
  - ver vehículos  
  - ver detalles  

- Un usuario autenticado puede:
  - publicar vehículos  
  - hacer preguntas  

- Solo el propietario puede responder  
- El acceso a ciertas funciones depende del token  

---

## Autor

Proyecto desarrollado como parte del curso de Web II.

- Dylan Jiménez Alfaro  
- Emily Zúñiga Solano  