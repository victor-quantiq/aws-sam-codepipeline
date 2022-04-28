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
        sh 'sam build --config-env dev'
        sh 'cd todos && npm install && npm run test && cd ../'
        stash includes: '**/.aws-sam/**/*', name: 'aws-sam'
      }
    }
    stage('Deploy') {
      steps {
        withAWS(credentials: 'sam-jenkins', region: 'eu-west-3') {
          unstash 'aws-sam'
          sh 'sam deploy --config-env dev'
          dir ('todos') {
            sh 'npm install'
            sh 'npm ci'
            sh 'AWS_REGION=eu-west-3 STACK_NAME=todo-sam-app-dev npm test tests/integ/test-integ-api.js'
          }
        }
      }
    }
  }
}