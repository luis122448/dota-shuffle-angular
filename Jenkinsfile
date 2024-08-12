pipeline {
    agent any

    triggers {
        pollSCM('* * * * *')
        githubPush()
    }

    environment {
        DOCKER_IMAGE = 'dota-shuffle-angular-app'
        API_URL = credentials('dota-shuffle-angular')
        WS_URL = credentials('dota-shuffle-angular')
        PORT = credentials('dota-shuffle-angular')
    }

    stages {

        stage('Clean Workspace') {
            steps {
                deleteDir()
            }
        }

        stage('Checkout') {
            steps {
                git branch: 'developer', url: 'git@github.com:luis122448/dota-shuffle-angular.git'
            }
        }

        stage('Create .env file') {
            steps {
                sh '''
                [ -f .env ] && rm .env

                echo "API_URL=${API_URL}" > .env
                echo "WS_URL=${WS_URL}" >> .env
                echo "PORT=${PORT}" >> .env

                cat .env
                '''
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
