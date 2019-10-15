pipeline {
  agent any
  stages {
    stage('Install Serverless') {
      steps {
        sh 'sudo apt install -y nodejs'
        sh 'sudo apt install -y npm'
        sh 'sudo npm install -g serverless'
      }
    }
    stage('Serverless Deploy V') {
      steps {
        dir("/var/lib/jenkins/workspace/cloud-rchristy-project5_master/backend") {
          sh '''
            export PATH=/var/lib/jenkins:$PATH
            serverless deploy -v
            '''
        }
      }
    }
  }
}
