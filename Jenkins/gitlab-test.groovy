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
        stage('Install Dependency') {
            steps {
                sh '''
                cd ~/project/school/se/Web-Application/frontend &&
                pwd &&
                npm install --force
                '''
            }
        }
        stage('Build') {
            steps {
                sh '''
                cd ~/project/school/se/Web-Application/frontend &&
                pwd &&
                CI='' npm run build
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
