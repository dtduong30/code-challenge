# Problem 5: A Crude Server
This project is a TypeScript-based backend server using ExpressJS, designed to manage bookmarks with a CRUD interface. It connects to MongoDB.

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)
- MongoDB (>= 4.x)

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:dtduong30/code-challenge.git
   ```

2. Install the dependencies:
   ```bash
   npm install
   ``` 

3. Create a `.env` file in the root directory. You can follow `.env.example` file:
    ```env
    NODE_ENV=development
    PORT=3000
    MONGO_URI=mongodb://localhost:27017/bookmarks
    CORS_ORIGIN=http://localhost:*
    ```

## Running the Application

### Development

To run the application in development mode with hot-reloading:
```sh
npm run dev
```

### Production

To build and run the application in production mode:
```sh
npm run build
```

The server will start on the specified port (default is 8386).

## Running Tests

To run the unit tests:
```sh
npm run test
```

## API Endpoints

The API documentation is available at /api-docs when the server is running. It is generated using Swagger.

## Project Structure

src/
├── controllers/
│   ├── bookmarkController.ts
│   └── __tests__/
│       └── bookmarkController.test.ts
│   ├── ...
├── middlewares/
├── models/
│   └── bookmarkModel.ts
│   ├── ...
├── routes/
│   ├── bookmarkRoutes.ts
│   └── index.ts
│   ├── ...
├── services/
│   └── bookmarkService.ts
│   └── multipleBaseService.ts
│   ├── ...
├── shared/
│   └── common/
│   └── constants/
├── types/
├── utils/
│   ├── logger.ts
│   ├── ...
├── app.ts
├── envConfig.ts
└── server.ts

## 🤝 Feedback and Contributions

I'd love to hear your feedback and suggestions for improvement. Please feel free to email me at dangtuanduong99@gmail.com. 🍀🧧