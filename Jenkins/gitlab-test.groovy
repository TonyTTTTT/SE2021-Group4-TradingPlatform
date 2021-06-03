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
                sh '''#!/bin/bash
                cd ~/project/school/se/Web-Application/frontend &&
                pwd &&
                npm install --force
                '''
            }
        }
        stage('Build') {
            environment {
                CI = false
            }
            steps {
                sh '''#!/bin/bash
                cd ~/project/school/se/Web-Application/frontend &&
                pwd &&
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
		        cleanWhenFailure: true,
				deleteDirs: true,
				disableDeferredWipeout: true,
				notFailBuild: true,
				patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
						   [pattern: '.propsfile', type: 'EXCLUDE']])
		}
    }
}
