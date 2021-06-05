pipeline {
    agent any 
    stages {
        stage('Test') {
            steps {
                sh '''#!/bin/bash
                cd backend
                pwd
                python3 -m pytest test_AssetData.py
                '''
            }
        }
        stage('Sync') {
            steps {
                sh '''#!/bin/bash
                echo 'cd into delivery repository to pull the latest code'
                cd ~/project/school/se/Web-Application/
                git reset --hard HEAD
                git pull --rebase
                '''
            }
        }
        stage('Install Dependency') {
            steps {
                sh '''#!/bin/bash
                cd ~/project/school/se/Web-Application/
                cd frontend
                pwd
                npm install --force
                '''
            }
        }
        stage('Build') {
            steps {
                sh '''#!/bin/bash
                cd ~/project/school/se/Web-Application/
                cd frontend
                pwd
                CI='' npm run build 
                '''
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
