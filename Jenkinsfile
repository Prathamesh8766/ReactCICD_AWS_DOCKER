pipeline {
    agent any
    stages {
        stages("build"){
            agent{
                docker{
                    image: 'node:18-alpine'
                    reuseNode ture
                }
            }
            steps{
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