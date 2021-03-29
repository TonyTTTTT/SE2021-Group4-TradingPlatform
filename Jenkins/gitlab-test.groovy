pipeline {
    agent any 
    stages {
        stage('Compile') {
            steps {
                echo 'first stage' 
            }
        }
    }
}
