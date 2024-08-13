# K6 Performance Testing Project

## Overview

This project is designed to test the performance of various endpoints of the [Reqres.in](https://reqres.in) API using [K6](https://k6.io/), a popular open-source load testing tool. The goal is to ensure that our APIs perform well under various levels of load, and to integrate these tests into a Continuous Integration (CI) pipeline using GitHub Actions. Test results are sent to Grafana Cloud for real-time analysis and visualization.

## Project Structure

```
├── auth_tests.js        # Contains test cases
├── user_management_tests.js        # Contains test cases
├── resource_tests.js        # Contains test cases
├── config.js            # Configuration file 
├── payloads.js          # Payloads file
└── README.md            # Documentation
```

## Prerequisites

- [K6](https://k6.io/docs/getting-started/installation) (for running the tests)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/hodehoujolive/k6-reqres-in.git
   cd k6-reqres-in 
   ```

## Running the Tests

### Single Test Run

To run a single test file (e.g., `user_management_tests.js`), use the following command:

```bash
k6 run user_management_tests.js
```

### Running Tests on Grafana Cloud
Grafana Cloud provides real-time visualization and analysis for your K6 performance tests. Follow the steps on [Grafana Cloud](https://grafana.com/docs/k6/latest/results-output/real-time/cloud/)  and run your tests with cloud output.
![Screenshot_1](https://github.com/hodehoujolive/k6-reqres-in/blob/main/screenshots/Screenshot%202024-08-12%20at%2016.36.12.png)
![Screenshot_2](https://github.com/hodehoujolive/k6-reqres-in/blob/main/screenshots/Screenshot%202024-08-12%20at%2016.36.43.png)
