# K6 Performance Testing Project

## Overview

This project is designed to test the performance of various endpoints of the [Reqres.in](https://reqres.in) API using [K6](https://k6.io/), a popular open-source load testing tool. The tests cover user creation, updating, deletion, login, registration,retrieval etc features.

## Project Structure

```
├── auth_tests.js        # Contains test cases
├── user_management_tests.js        # Contains test cases
├── config.js            # Configuration file 
├── payloads.js          # Payloads file
└── README.md            # Documentation
```

## Prerequisites

- [K6](https://k6.io/docs/getting-started/installation) (for running the tests)

### Installation

1. **Clone the Repository**:
   ```bash
   git clone [https://github.com/yourusername/your-repo-name.git](https://github.com/hodehoujolive/k6-reqres-in.git)
   cd k6-reqres-in 
   ```

## Running the Tests

### Single Test Run

To run a single test file (e.g., `user_management_tests.js`), use the following command:

```bash
k6 run user_management_tests.js
```
