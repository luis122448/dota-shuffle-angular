pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'dota-shuffle-angular-app'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'git@github.com:luis122448/dota-shuffle-angular.git'
            }
        }

        stage('Build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE} ."
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
