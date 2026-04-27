pipeline {
    agent any
    options{
        skipDefaultCheckout(true) // skkep the ui checkout of the code
    }

    stages {

        stage("CheckOut Code"){
            steps{
                checkout scm // manual check out
            }
        }

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

        stage("Test"){
            agent{
                docker {
                    image: 'node:22-alpine'
                    args '-u root'
                    reuseNode true
                }

            }
            steps{
                 sh '''   
                npm config set cache .npm
                rm -rf node_modules package-lock.json
                npm install
                npm run test
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
        success {
            emailext (
                subject: "SUCCESS: Build Passed",
                body: "Your pipeline completed successfully.",
                to: "prathampatil123789@gmail.com"
            )
        }
        failure{
            eamilext(
                subject: "Faliuer: Build failed",
                body: "Your pipeline failed",
                to: "prathampatil123789@gmail.com"
            )
        }
        always {
            echo "Cleaning workspace"
            cleanWs()
        }
    }
}