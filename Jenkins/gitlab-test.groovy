pipeline {
    agent any 
    stages {
        stage('Compile') {
            steps {
                echo 'Compile the source code' 
            }
        }
    }
}
