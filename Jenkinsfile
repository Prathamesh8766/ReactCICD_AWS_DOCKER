pipeline {
    agent any

    stages {
        stage("Build") {
            agent {
                docker {
                    image 'node:22-alpine'
                    args '-u root'
                    reuseNode true
                }
            }
            steps {
                sh '''
                echo "Setting npm cache locally"
                npm config set cache .npm

                echo "Cleaning old files"
                rm -rf node_modules package-lock.json

                echo "Listing files"
                ls -a

                echo "Node version"
                node --version

                echo "Installing dependencies"
                npm install

                echo "Building project"
                npm run build

                echo "Build completed"
                ls -a
                '''
            }
        }

        stage("Archive Build") {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
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