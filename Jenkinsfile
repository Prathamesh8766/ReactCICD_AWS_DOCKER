pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    stages {

        stage("Checkout Code") {
            steps {
                checkout scm
            }
        }

        stage("Build") {
            agent {
                docker {
                    image 'node:22-alpine'
                    reuseNode true
                }
            }
            steps {
                sh '''
                echo "Setting npm cache locally"
                npm config set cache .npm

                echo "Cleaning old files"
                rm -rf node_modules

                echo "Listing files"
                ls -a

                echo "Node version"
                node --version

                echo "Installing dependencies"
                npm ci --prefer-offline

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