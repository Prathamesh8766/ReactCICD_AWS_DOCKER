pipeline {
    agent any

    options{
        skipDefaultCheckout(true)
    }

    stages {

        stage("CheckOut Code"){
            steps{
                checkout scm
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
                npm config set cache .npm
                rm -rf node_modules package-lock.json
                npm install
                npm run build
                '''
            }
        }

        stage("Test"){
            agent{
                docker {
                    image 'node:22-alpine'   
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
        failure {
            emailext (  
                subject: "FAILURE: Build Failed",
                body: "Your pipeline failed",
                to: "prathampatil123789@gmail.com"
            )
        }
        always {
            cleanWs()
        }
    }
}