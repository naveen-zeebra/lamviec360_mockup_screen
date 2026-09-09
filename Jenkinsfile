///////////////////////////////////////////////////////////////////////////////
// Jenkinsfile — LamViec360 Job Seeker Landing
// Simple Docker CI/CD
///////////////////////////////////////////////////////////////////////////////

pipeline {

    agent any

    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timestamps()
    }

    environment {

        DOCKER_REGISTRY = 'docker.io'
        DOCKER_REPO = 'naveenkumar1137/sampledev'

        IMAGE_TAG = "${BUILD_NUMBER}"
        IMAGE_FULL = "${DOCKER_REGISTRY}/${DOCKER_REPO}:${BUILD_NUMBER}"
        IMAGE_LATEST = "${DOCKER_REGISTRY}/${DOCKER_REPO}:latest"

        DOCKER_CREDENTIALS = 'dockerhub'

        DEPLOY_HOST = '103.175.146.37'
        DEPLOY_USER = 'deploy'
        SSH_CREDENTIALS = 'ssh-dev-server'

        REMOTE_PROJECT_DIR = '/opt/jobseeker-landing'

        APP_PORT = '4028'
        CONTAINER_NAME = 'lv360_jobseeker_landing'
    }

    stages {

        // ================================================================
        // 1. CHECKOUT
        // ================================================================

        stage('Checkout') {
            steps {

                checkout scm

                sh '''
                    echo "=========================================="
                    echo "JOB SEEKER LANDING"
                    echo "=========================================="

                    echo "Commit:"
                    git rev-parse --short HEAD

                    echo ""
                    echo "Files:"
                    ls -la
                '''
            }
        }


        // ================================================================
        // 2. DOCKER BUILD
        // ================================================================

        stage('Docker Build') {
            steps {

                sh '''
                    echo "=========================================="
                    echo "BUILDING DOCKER IMAGE"
                    echo "=========================================="

                    docker build \
                        --pull \
                        -t ${IMAGE_FULL} \
                        -t ${IMAGE_LATEST} \
                        .

                    echo ""
                    echo "Docker build successful."

                    docker images ${DOCKER_REPO}
                '''
            }
        }


        // ================================================================
        // 3. DOCKER HUB PUSH
        // ================================================================

        stage('Docker Push') {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: env.DOCKER_CREDENTIALS,
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {

                    sh '''
                        echo "=========================================="
                        echo "PUSHING TO DOCKER HUB"
                        echo "=========================================="

                        echo "$DOCKER_PASS" | docker login \
                            ${DOCKER_REGISTRY} \
                            -u "$DOCKER_USER" \
                            --password-stdin

                        docker push ${IMAGE_FULL}

                        docker push ${IMAGE_LATEST}

                        docker logout ${DOCKER_REGISTRY}

                        echo ""
                        echo "Docker push successful."
                    '''
                }
            }
        }


        // ================================================================
        // 4. DEPLOY
        // ================================================================

        stage('Deploy') {
            steps {

                sshagent(credentials: [env.SSH_CREDENTIALS]) {

                    sh '''
                        echo "=========================================="
                        echo "DEPLOYING TO SERVER"
                        echo "=========================================="

                        ssh \
                            -o StrictHostKeyChecking=no \
                            ${DEPLOY_USER}@${DEPLOY_HOST} << ENDSSH

                            set -e

                            echo "Server: ${DEPLOY_HOST}"

                            mkdir -p ${REMOTE_PROJECT_DIR}

                            cd ${REMOTE_PROJECT_DIR}

                            echo ""
                            echo "Pulling image:"
                            echo "${IMAGE_FULL}"

                            docker pull ${IMAGE_FULL}

                            echo ""
                            echo "Starting application..."

                            export DOCKER_IMAGE_TAG=${BUILD_NUMBER}

                            docker compose up -d --force-recreate

                            echo ""
                            echo "Container status:"

                            docker ps \
                                --filter "name=${CONTAINER_NAME}"

                            echo ""
                            echo "Deployment completed."

ENDSSH
                    '''
                }
            }
        }


        // ================================================================
        // 5. HEALTH CHECK
        // ================================================================

        stage('Health Check') {
            steps {

                sshagent(credentials: [env.SSH_CREDENTIALS]) {

                    sh '''
                        echo "=========================================="
                        echo "HEALTH CHECK"
                        echo "=========================================="

                        ssh \
                            -o StrictHostKeyChecking=no \
                            ${DEPLOY_USER}@${DEPLOY_HOST} << ENDSSH

                            set -e

                            echo "Waiting for application..."

                            sleep 10

                            echo ""
                            echo "Container:"

                            docker ps \
                                --filter "name=${CONTAINER_NAME}"

                            echo ""
                            echo "Checking port ${APP_PORT}..."

                            curl \
                                --fail \
                                --silent \
                                --show-error \
                                http://localhost:${APP_PORT}/ \
                                > /dev/null

                            echo ""
                            echo "=========================================="
                            echo "APPLICATION IS HEALTHY"
                            echo "=========================================="

ENDSSH
                    '''
                }
            }
        }
    }


    // ================================================================
    // POST
    // ================================================================

    post {

        success {
            echo """
==============================================
JOB SEEKER LANDING DEPLOYED SUCCESSFULLY
==============================================

Image     : ${IMAGE_FULL}
Server    : ${DEPLOY_HOST}
Port      : ${APP_PORT}
Container : ${CONTAINER_NAME}

==============================================
"""
        }

        failure {
            echo """
==============================================
JOB SEEKER LANDING DEPLOYMENT FAILED
==============================================
"""
        }

        cleanup {
            sh '''
                docker rmi ${IMAGE_FULL} 2>/dev/null || true
                docker rmi ${IMAGE_LATEST} 2>/dev/null || true
            '''
        }
    }
}