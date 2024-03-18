# Currency Conversion App

Welcome to the Currency Conversion App! This application allows users to convert currencies based on real-time exchange rates. Below you'll find information on how to set up, configure, and use the application.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The Currency Conversion App is a Node.js application that leverages real-time exchange rate data to perform currency conversions. Users can register, login, and convert currencies using the available endpoints.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your local machine
- ExchangeRate-API access key

## Installation

To install and run this application, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone hhttps://github.com/mGeorge90/currency-conversion.git
   ```
2. Navigate to the project directory:

   ```bash
    cd currency-conversion
    ```
3. Install the project dependencies:

   ```bash
   npm install
   ```
## Usage
``` bash
    npm start
```
## Docker Installation
1.Build the Docker image:
```bash
  docker-compose up
```
2. Run the Docker container:
```bash
  docker-compose up
```
### Endpoints
The following endpoints are available in the application:

- POST /register: Register a new user.
- POST /login: Login and obtain an authentication token.
- GET /convert: Convert currency (requires authentication token).
- GET /user/history: View conversion history (requires authentication token).
- GET /__health: Check the health status of the application.
For detailed API documentation, refer to the Swagger documentation at /api-docs.


   
