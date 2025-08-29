
# CRM Dashboard Project 

## 1. Project Overview

### Project Name: CRM Dashboard

### Objective:
The CRM Dashboard is a web-based application designed to help businesses efficiently track and manage customer relationships and important business data. The dashboard enables users to view stock market data in real-time, track financial trends, and access insights using charts and graphs. The system provides an intuitive user interface, secure authentication, and data fetching from external APIs. Testing is also done using the Jest and selenium testing. where Jest is used to check the Fronted testing that gives the required Text and any important texts in the page and selenium is used to test the login page and automated taks.

### Technology Stack:
- **Frontend**: React.js, Axios, Recharts (for data visualization)
- **Backend**: Node.js, Express.js, MongoDB (for database)
- **Authentication**: JWT-based user authentication
- **API Integration**: Financial data fetched via external APIs

## 2. Features

### User Authentication:
- Users can create accounts, log in, and securely access their personalized dashboards.
- JWT tokens are used to authenticate and authorize users.

### Dashboard:
- Displays key financial information such as stock prices.
- Dynamic and interactive stock charts, using Recharts, that update based on the selected stock symbol.

### Financial Data:
- Real-time stock market data fetched from external APIs (e.g., Alpha Vantage, Yahoo Finance).
- Visualization of stock data using line charts and other graph types for easy data analysis.

### Responsive Design:
- The dashboard adapts seamlessly across devices using Bootstrap for mobile-first design.

## 3. Architecture Overview

### Frontend
The frontend is built using React.js, providing a dynamic, component-based structure:
- **StockList**: Displays a list of stocks that users can select to view more detailed stock data.
- **DashBoard**: Displays the stock data, including price history, using charts from Recharts.
- **Authentication**: Handles login/signup functionality and stores JWT tokens on the client side (LocalStorage or Cookies).
- **Routing**: React Router is used to manage the navigation between different pages/components of the dashboard.

### Backend
The backend is built using Node.js with Express.js:
- MongoDB stores user data and relevant financial information.
- JWT is used for secure authentication. Each request to a protected route is verified using a JWT token.
- External APIs are used to fetch real-time stock data, which is processed and returned to the frontend.

## 4. Database Schema

### User Model
Stores user authentication details:
```json
{
  "username": "String",
  "email": "String",
  "password": "String", // Hashed password
  "token": "String" // JWT token
}
```

### Stock Model
Stores stock data:
```json
{
  "symbol": "String",  // e.g., AAPL, GOOGL
  "name": "String",     // e.g., Apple Inc.
  "price": "Number",    // Latest price (optional)
  "volume": "Number"    // Trading volume (optional)
}
```

## 5. API Documentation

### GET /api/all-stocks
**Description**: Fetches the list of all available stocks from the database.
**Response**:
```json
[
  { "symbol": "AAPL", "name": "Apple Inc." },
  { "symbol": "GOOGL", "name": "Alphabet Inc." },
  ...
]
```

### GET /api/stocks/:symbol
**Description**: Fetches real-time stock data for the given symbol.
**Response**:
```json
{
  "Time Series (Daily)": {
    "2022-02-01": {
      "4. close": "145.50",
      "5. volume": "5000000",
      ...
    },
    ...
  }
}
```

## 6. Frontend Workflow

### Authentication:
- The user logs in with their credentials.
- Upon successful authentication, the backend returns a JWT token.
- The token is stored on the client side (in LocalStorage or Cookies) and is sent along with each request to secure routes.

### Fetching Data:
- After authentication, the user can view the StockList, which contains all available stocks.
- Upon selecting a stock, the DashBoard component fetches detailed stock data (price history) and visualizes it on the dashboard using Recharts.

### Stock Visualization:
- The stock data (price, volume) is represented in an interactive line chart that helps users analyze historical performance.

## 7. Backend Workflow

### User Authentication:
- When users log in, the backend verifies their credentials and returns a JWT token.
- The token is used to authorize the user for any subsequent requests to protected API routes.

### Database Operations:
- The MongoDB database stores user information and stock data. Stock data is fetched from external APIs (e.g., Alpha Vantage or Yahoo Finance) and stored in the database.

### Fetching Stock Data:
- The backend fetches real-time stock data for a given stock symbol using an external API.
- The stock data is processed and sent to the frontend for display.

## 8. Error Handling

### Authentication Errors:
- If invalid credentials are provided, an error message is shown.

### API Fetch Errors:
- If there is an issue with fetching stock data (e.g., API downtime), an error message is displayed to the user.

## 9. Deployment

### Frontend:
- The frontend is deployed using services like Netlify or Vercel.

### Backend:
- The backend is hosted on platforms like Heroku or AWS for scalability and ease of deployment.

### Environment Variables:
- API keys, database URLs, and JWT secrets are stored in .env files for security.

## 10. Conclusion
The CRM Dashboard provides businesses with a tool to manage customer relationships and monitor financial data, with a focus on real-time stock tracking and data visualization. The system is secure, scalable, and provides a responsive user experience. Its modular architecture ensures that it can be easily extended with additional features, such as adding more stock data sources or integrating other business analytics tools.
