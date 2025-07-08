# OCR Simulation App

A web application that simulates Optical Character Recognition (OCR) functionality for processing and extracting text from images.

## Features

- Text extraction from pdf
- RESTful API for OCR operations
- Docker support

## Prerequisites

- Node.js (version 20 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized setup)

## Installation

1. Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode

```bash
# Start in development mode
npm run start

# Start with hot reload (watch mode)
npm run start:dev
```

### Production Mode

```bash
npm run start:prod
```

### Docker Setup

```bash
# Start the application with database
docker-compose up

# Run in detached mode
docker-compose up -d

# Stop the containers
docker-compose down
```

## API Documentation

The API is accessible at `http://localhost:3000/ocr`

### Available Endpoints

| Method | Endpoint | Description                   |
| ------ | -------- | ----------------------------- |
| POST   | `/ocr`   | Upload pdf for OCR processing |
| GET    | `/ocr`   | Get OCR results               |

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
