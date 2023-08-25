README para Prueba Técnica Proyecto Frontend en React
Proyecto Creado por: Carlos Yepes
Este README proporciona instrucciones detalladas para configurar, instalar y ejecutar el proyecto frontend en React de la prueba técnica.

Pasos de Configuración
Clonar el Repositorio:

bash
Copy code
git clone <>
cd nombre_del_proyecto
Instalar Dependencias:

Desde la raíz del proyecto, ejecuta el siguiente comando para instalar las dependencias necesarias:

Copy code
npm install
Ejecución del Proyecto
Iniciar el Proyecto:

Para iniciar la aplicación en modo de desarrollo, ejecuta:

arduino
Copy code
npm run start
Manejo de Errores y Versiones
Instalación de Dependencias Específicas:

Si encuentras errores relacionados con dependencias, intenta instalar la dependencia problemática con el siguiente comando:

mathematica
Copy code
npm install <nombre_de_la_dependencia> -D
Gestión de Versiones de Node:

Si tienes problemas de compatibilidad, puedes cambiar a una versión específica de Node usando:

perl
Copy code
npm use node <versión_correspondiente>
Backend y Conexión con APIs
Este proyecto se conecta con dos APIs: una creada por el autor y otra proporcionada. La API backend está implementada utilizando Nest.js, un framework basado en Node.js para microservicios.

Configuración del Backend
Instalar Nest.js:

Asegúrate de tener instalado el paquete global de Nest.js con el siguiente comando:

bash
Copy code
npm install -g @nestjs/cli
Instalar Dependencias del Backend:

Desde la carpeta del backend, ejecuta:

Copy code
npm install
Iniciar el Servidor Backend:

arduino
Copy code
npm run start:dev
Variables de Entorno:

Crea un archivo .env en la carpeta del backend y define las siguientes variables:

makefile
Copy code
APP_PORT=3001
DB_URI='mongodb://localhost:27017/recetasDB'
CONNECTION_NAME= "users"
SECRET='passwordtoken'
Nota: No es una buena práctica incluir información sensible en un archivo README, considera manejar las variables de entorno de manera más segura.

Uso de la Base de Datos
Para usar la base de datos en un entorno local, se requiere MongoDB. Descarga MongoDB Shell y sigue las instrucciones de instalación. Luego, ejecuta el programa y sigue los pasos para crear documentos, encriptar contraseñas y autenticarse con la base de datos.

¡Listo! Con estas instrucciones organizadas, los usuarios podrán seguir fácilmente los pasos para configurar y ejecutar el proyecto frontend en React, así como el backend implementado con Nest.js.