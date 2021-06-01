pipeline {
    agent any 
    stages {
        stage('Compile') {
            steps {
                echo 'first stage, edit by Tony, v5' 
            }
        }
        state('Build') {
            steps {
                sh '''#!/bin/bash
                pwd
                '''
            }
        }
    }
}
