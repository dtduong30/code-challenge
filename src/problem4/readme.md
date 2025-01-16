# Running the `sum_to_n.ts` File

## Prerequisites
Make sure you have Node.js and npm installed on your machine.

## Steps to Run the File

1. Navigate to the project directory:
  ```sh
  cd src/problem4
  ```

2. Run the `sum_to_n.ts` file using `ts-node`:
  ```sh
  npx ts-node sum_to_n.ts
  ```

## Running Tests with Jest

1. Install Jest and necessary TypeScript dependencies if you haven't already:
  ```sh
  npm install --save-dev jest ts-jest @types/jest
  ```

2. Create a Jest configuration file if it doesn't exist:
  ```sh
  npx ts-jest config:init
  ```

3. Run the tests:
  ```sh
  npm test
  ```