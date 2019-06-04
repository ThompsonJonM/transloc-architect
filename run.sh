#!/usr/bin/env bash

function run_architect_tests() {

  # Remove results from previous runs
  rm -rf .cypress/output/ || true

  # Pull the latest browsers from the Cypress Browsers Docker image
  docker pull cypress/browsers:latest

  # Build a new Docker image, then stop/remove previous containers if remove failed after run
  docker image build -t transloc-architect .
  docker stop transloc-architect-tester || true && docker rm transloc-architect-tester || true

  # Run the newly created Docker image
  docker run --name transloc-architect-tester transloc-architect

  # Copy the results for CI/CD use once the test run has finished
  docker cp transloc-architect-tester:/usr/src/app/cypress/output ./cypress

  # Remove the container following test complete
  docker rm transloc-architect-tester

}

run_architect_tests
