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
                npm install
                npm run build
                '''
            }
        }
        stage('Test') {
            steps {
                echo 'no test yet'    
            }
        }
	}
	post {
	// Clean after build
	always {
		cleanWs(cleanWhenNotBuilt: false,
				deleteDirs: true,
				disableDeferredWipeout: true,
				notFailBuild: true,
				patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
						   [pattern: '.propsfile', type: 'EXCLUDE']])
		}
    }
}
