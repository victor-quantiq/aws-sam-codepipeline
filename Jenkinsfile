pipeline {
  agent any
 
  stages {
    // stage('Install sam-cli') {
    //   steps {
    //     sh 'python3 -m venv venv && venv/bin/pip install aws-sam-cli'
    //     stash includes: '**/venv/**/*', name: 'venv'
    //   }
    // }
    stage('Build') {
      steps {
        // unstash 'venv'
        // sh 'venv/bin/sam build'
        sh 'sam build'
        stash includes: '**/.aws-sam/**/*', name: 'aws-sam'
      }
    }
    stage('beta') {
      environment {
        STACK_NAME = 'sam-app-beta-stage'
        S3_BUCKET = 'sam-jenkins-demo-us-west-2-user1'
      }
      steps {
        withAWS(credentials: 'sam-jenkins', region: 'eu-west-3') {
          unstash 'aws-sam'
          sh 'sam deploy --config-env dev'
          dir ('todos') {
            sh 'npm ci'
            sh 'npm run integ-test'
          }
        }
      }
    }
  }
}