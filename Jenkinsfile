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
                    echo "Starting Build stage..."
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
                    echo "Starting Test stage..."
                    npm config set cache .npm
                    # Don't reinstall - reuse node_modules from Build stage
                    npm run test
                '''
            }
        }

        stage("Archive Build") {
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage("Take Approval"){
            steps{
                timeout(time: 1, unit: "MINUTES"){
                    input message: "Do you want to deploy to Vercel?", ok: "proceed"
                }
            }
        }

        stage("Deploy"){
            agent {
                docker {
                    image 'node:22-alpine'  
                    args '-u root'
                    reuseNode true
                }
            }
            steps {
                sh '''
                    echo "Deploying to Vercel..."
                    npx vercel@latest --prod --token=$VERCEL_TOKEN --yes --name reactcicd
                '''
            }
        }
    }

    post { 
        success {
            emailext (
                subject: "SUCCESS: Build Passed - ReactCICD",
                body: "Your pipeline completed successfully and deployed to Vercel!\n\nBuild URL: ${env.BUILD_URL}",
                to: "prathamesh.224446105@vcet.edu.in"
            )
        }
        failure {
            emailext (  
                subject: "FAILURE: Build Failed - ReactCICD", 
                body: "Your pipeline failed.\n\nBuild URL: ${env.BUILD_URL}\n\nCheck Jenkins logs for details.",
                to: "prathamesh.224446105@vcet.edu.in"
            )
        }
        always {
            cleanWs()
        }
    }
}