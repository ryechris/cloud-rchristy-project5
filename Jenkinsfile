pipeline {
  agent any
  stages {
    stage('Install Serverless') {
      steps {
        sh 'npm install -g serverless'
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
