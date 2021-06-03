pipeline {
    agent any 
    stages {
        stage('Sync') {
            steps {
                sh '''#!/bin/bash
                cd ~/project/school/se/Web-Application/
                git pull --rebase
                '''
            }
        }
        stage('Build') {
            steps {
                sh '''#!/bin/bash
                cd frontend
                npm run build
                '''
            }
        }
    }
}
