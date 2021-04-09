pipeline {
    agent any 
    stages {
        stage('Compile') {
            steps {
                echo 'first stage, edit by Tony, v3' 
            }
        }
    }
}
