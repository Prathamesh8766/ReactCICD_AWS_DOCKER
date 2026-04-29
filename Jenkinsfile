pipeline {
    agent any

    options { 
        skipDefaultCheckout(true) 
    }

    environment {  
        VERCEL_TOKEN = credentials("VERCEL_TOKEN") 
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

        stage("Deploy"){
            steps{
                sh '''
                    npx vercel@latest --prod --token=$VERCEL_TOKEN --yes
                '''
            }
        }
    }

    post { 
        success {
            emailext (
                subject: "SUCCESS: Build Passed",
                body: "Your pipeline completed successfully.",
                to: "prathamesh.224446105@vcet.edu.in"
            )
        }
        failure {
            emailext (  
                subject: "FAILURE: Build Failed",
                body: "Your pipeline failed",
                to: "prathamesh.224446105@vcet.edu.in"
            )
        }
        always {
            cleanWs()
        }
    }
}