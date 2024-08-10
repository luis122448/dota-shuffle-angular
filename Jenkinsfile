pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'dota-shuffle-angular-app'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'git@github.com:luis122448/dota-shuffle.git'
            }
        }

        stage('Build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE} ."
            }
        }

        stage('Test') {
            steps {
                sh 'docker compose run --rm dota-shuffle-angular npm test'
            }
        }

        stage('Deploy') {
            steps {
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
