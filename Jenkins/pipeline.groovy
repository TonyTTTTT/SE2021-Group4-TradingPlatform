pipeline {
    agent any 
    stages {
        stage('Sync') {
            steps {
                sh Jenkins/script/sync.sh
            }
        }
        stage('Install Dependency') {
            steps {
                sh Jenkins/script/install_dependency.sh
            }
        }
        stage('Build') {
            steps {
                sh Jenkins/script/build.sh
            }
        }
        stage('Test') {
            steps {
                sh Jenkins/script/test.sh
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
