pipeline {
    agent any

    environment {
        NODE_HOME = '/usr/local/bin'
        PATH = "${env.NODE_HOME}:${env.PATH}"
    }

    stages {
        stage('Clone Repository') {
            steps {
                // The repository is already cloned by Jenkins, so this is optional
                git url: 'https://github.com/louayx14/test.git', branch: 'main'
            }
        }
     
        stage('Run Unit Tests') {
            steps {
                // Run Hardhat tests
                sh 'npx hardhat test'
            }
        }
    }

    post {
        always {
            // Clean workspace after build
            cleanWs()
        }
        success {
            echo 'Unit tests passed!'
        }
        failure {
            echo 'Unit tests failed!'
        }
    }
}
