pipeline {
  agent any

  tools {
    nodejs 'Node 18'
  }

  stages {
    stage('Clone Repo') {
      steps {
        git 'https://github.com/mrshanakr/chatreact.git'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }

    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
  }
}
