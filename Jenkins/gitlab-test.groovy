pipeline {
    agent any 
    stages {
        stage('Sync') {
            steps {
                sh 'cd ~/project/school/se/Web-Application/'
                sh 'git clean -x -f'
                sh 'git pull --rebase'
                '''
            }
        }
        stage('Install Dependency') {
            steps {
                sh 'cd ~/project/school/se/Web-Application/frontend'
                sh 'pwd'
                sh 'npm install --force'
                '''
            }
        }
        stage('Build') {
            environment {
                CI = 'false'
            }
            steps {
                sh 'cd ~/project/school/se/Web-Application/frontend'
                sh 'pwd'
                sh 'npm run build'
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
