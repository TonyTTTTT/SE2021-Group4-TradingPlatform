pipeline {
    agent any 
    stages {
        stage('Compile') {
            steps {
                echo 'first stage, edit by Tony, v8' 
                echo 'Echo test'
            }
        }
        stage('Build') {
            steps {
                sh '''#!/bin/bash
                cd ~/project/school/se/Web-Application/frontend
                git pull --rebase
                '''
            }
        }
    }
}
