pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'dota-shuffle-angular-app'
        API_URL = credentials('dota-shuffle-angular')
        WS_URL = credentials('dota-shuffle-angular')
        PORT = credentials('dota-shuffle-angular')
    }

    stages {

        stage('Create .env file') {
            steps {
                writeFile file: '.env', text: """\
API_URL=${env.API_URL}
WS_URL=${env.WS_URL}
PORT=${env.PORT}
"""
                sh 'cat .env'
            }
        }

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
                sh 'docker compose ps'
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f'
        }
    }
}
