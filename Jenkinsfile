pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'dota-shuffle-angular-app'
        API_URL = credentials('dota-shuffle-angular')
        WS_URL = credentials('dota-shuffle-angular')
        PORT = credentials('dota-shuffle-angular')
    }

    stages {

        stage('Debug Variables') {
          steps {
              writeFile file: 'env-debug.txt', text: "API_URL=${env.API_URL}\nWS_URL=${env.WS_URL}\nPORT=${env.PORT}"
              sh 'cat env-debug.txt'
          }
        }

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'git@github.com:luis122448/dota-shuffle-angular.git'
            }
        }

        stage('Build') {
            steps {
                echo "Building with API_URL=${env.API_URL}, WS_URL=${env.WS_URL}, PORT=${env.PORT}"
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }

        stage('Deploy') {
            steps {
                echo "Running application on PORT=${env.PORT}"
                sh 'docker compose down'
                sh 'docker compose up -d'
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f'
        }
    }
}
