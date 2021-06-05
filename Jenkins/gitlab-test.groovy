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
        stage('Test') {
            steps {
                sh '''#!/bin/bash
                cd ~/project/school/se/Web-Application/
                cd backend
                pwd
                python -m pytest test_AssetData.py
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
