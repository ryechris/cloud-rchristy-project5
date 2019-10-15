pipeline {
  agent any
  environment {
    AWS_ACCESS_KEY_ID = credentials('jaws-access-key-id')
    AWS_SECRET_ACCESS_KEY = credentials('jaws-secret-access-key')
  }
  stages {
    stage('Install Serverless') {
      steps {
        sh 'sudo apt install -y nodejs'
        sh 'sudo apt install -y npm'
        sh 'sudo npm install -g serverless'
      }
    }
    stage('Serverless Deploy') {
      steps {
        dir("/var/lib/jenkins/workspace/cloud-rchristy-project5_master/backend") {
          sh '''
            export PATH=/var/lib/jenkins:$PATH
            npm install
            '''
          sh "serverless config credentials --provider aws --key ${env.AWS_ACCESS_KEY_ID} --secret ${env.AWS_SECRET_ACCESS_KEY} --profile rc-serverless"
          sh "serverless deploy"
        }
      }
    }
  }

}
