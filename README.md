![Project Logo](./resources/logo.png)

# Dota 2 Shuffler MMR

Application to register 10 players and balance them into two teams based on MMR, minimizing the difference between teams.

## Features
- UI built with HTML, CSS and TailwindCSS.
- Routing and navigation with Angular Router.
- Nginx reverse proxy for dynamic backend routing at runtime.
- Automated build and deployment with Docker and GitLab CI/CD.
- Dark mode support.

## Environment Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/luis122448/dota-shuffle-angular.git
    cd dota-shuffle-angular
    ```

2. **Run the bootstrap script**
    ```bash
    ./dev-install.sh
    ```

3. **Start the development server**
    ```bash
    ./dev-init.sh
    ```

## Production Deployment

The project uses Docker with Nginx to serve the Angular build and proxy API requests at runtime.

1. **Copy and configure environment variables**
    ```bash
    cp .env.example .env
    # Fill in API_URL_METRICS and WS_URL_METRICS
    ```

2. **Run with Docker Compose**
    ```bash
    docker-compose up -d
    ```

## Local Docker Testing

To build and test the Docker image locally using a local registry:

```bash
./dev-deploy.sh
```

## Contributing
Contributions are welcome. Feel free to improve this project, add new features or fix identified issues. To contribute, create a Pull Request or open an Issue.

## License
This project is licensed under the MIT License.
