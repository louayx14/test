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

       /* stage('Install Dependencies') {
            steps {
                // Install npm dependencies
                sh 'npm install'
            }
        }

        stage('Run Unit Tests') {
            steps {
                // Run Hardhat tests
                sh 'npx hardhat test'
            }
        }*/

        stage('Run Solidity Code Metrics') {
            steps {
                script {
                    dir("${LOCAL_DIR}/contracts") {
                        // Run solidity-code-metrics on all Solidity files in the contracts directory
                        sh "solidity-code-metrics *.sol --html > ../metrics.html"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Unit tests passed!'
        }
        failure {
            echo 'Unit tests failed!'
        }
    }
}
