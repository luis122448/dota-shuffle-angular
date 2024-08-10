pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'dota-shuffle-angular-app'
    }

    stages {

        stage('Prepare Environment') {
            steps {
                withCredentials([string(credentialsId: 'JENKINS_SECRETS', variable: 'SECRETS')]) {
                    script {
                        def envVars = SECRETS.split('\n')
                        envVars.each { line ->
                            def parts = line.split('=')
                            env[parts[0]] = parts[1]
                        }
                    }
                }
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
