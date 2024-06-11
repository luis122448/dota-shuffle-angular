![Logo del Projecto](./resources/logo.png)

# Despliegue del Dota 2 Shuffler

Aplicación para registrar 10 jugadores y equilibrarlos en dos equipos según el MMR, buscando que la diferencia entre los equipos sea la menor posible.

## Características
- Modelado e implemantacion de interfaces con HTML, CSS y TailwindCSS.
- Routing y Navegación con Angular Router.
- Configuracion con Nginx para el despliegue en producción.
- Automatización del despliegue con Docker y Docker-Compose.
- Aplicacion con soporte para modo oscuro.

## Configuración del Entorno

1. **Clonar el Repositorio**
    ```bash
        git clone https://github.com/luis122448/dota-shuffle.git
    ```

2. **Ingresar al directorio del proyecto**

    ```bash
        cd dota-shuffle
    ```

3. **Ejecutar el script de instalación**
  
    ```bash
        sudo bash dev-install.sh
    ```

## Despliegue en Producción

Para el despliegue en producción se ha utilizado Docker y Docker Compose, puede revisar el archivo docker-compose.yml para conocer los detalles de la configuración.
Asimismo no se olvide de modificar las variables de entono, en asi archivo .env

1. **Ejecutar el script de despliegue**
  
    ```bash
        sudo bash deploy.sh
    ```

## Contribuciones
Las contribuciones son bienvenidas. Siéntete libre de mejorar este proyecto, agregar nuevas características o corregir problemas identificados. Para contribuir, crea un Pull Request o abre un Issue.

## Licencia
Este proyecto está bajo la licencia MIT License.
