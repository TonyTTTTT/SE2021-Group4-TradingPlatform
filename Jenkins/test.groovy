pipeline {
    agent any 
    stages {
        stage('Build') {
            steps {
				echo 'Testing by Tony v1'  
				echo 'Building...'
            }
        }
        stage('Test') {
            steps {
				echo 'Testing...'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'    
            }
        }

    }
}