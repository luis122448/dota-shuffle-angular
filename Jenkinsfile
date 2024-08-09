pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'dota-shuffle-angular-app'
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/luis122448/dota-shuffle-angular.git'
            }
        }

        stage('Build') {
            steps {
                script {
                    def app = docker.build(DOCKER_IMAGE)
                }
            }
        }

        stage('Test') {
            steps {
                sh 'docker-compose run app npm test'
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        always {
            sh 'docker system prune -f'
        }
    }
}
