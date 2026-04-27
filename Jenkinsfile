pipeline {
    agent any
    stages {
        stage("build") {
            agent {
                docker {
                    image: 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                ls -a
                node --version
                npm install
                npm run build
                ls -a
                '''
            }
        }
    }
}   