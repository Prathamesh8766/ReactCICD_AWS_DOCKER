pipeline {
    agent any

    stages {
        stage("Build") {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                echo "Listing files"
                ls -a

                echo "Node version"
                node --version

                echo "Installing dependencies"
                npm install

                echo "Building project"
                npm run build

                echo "After build"
                ls -a
                '''
            }
        }
    }

    post {
        always {
            echo "Cleaning workspace"
            cleanWs()
        }
    }
}