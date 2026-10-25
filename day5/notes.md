# Day 5 – Tiffin & Home Food Business Web Application

## 1. Day 5 Overview

Day 5 focuses on reviewing the project structure, understanding the main application modules, and documenting the planned frontend and backend workflow for the Tiffin & Home Food Business Web Application.

## 2. Project Objectives

- Organize the project modules properly.
- Review customer registration and login functionality.
- Review meal plans and subscription management.
- Understand the relationship between frontend, backend, and database.
- Identify errors and test the available application features.

## 3. Main Project Modules

### Authentication
- Customer registration
- Customer login
- Form validation

### Meal Plan Management
- Display available meal plans
- Show meal prices and descriptions
- Allow customers to explore meal options

### Subscription Management
- Display customer subscriptions
- Show subscription start and end dates
- Display quantity, price, and subscription status
- Support pause and cancellation actions where implemented

### Dashboard
- Provide navigation to important application pages
- Display links to meal plans and subscriptions
- Provide access to customer-related features where implemented

### Order Management
- Display customer orders and order status
- Connect order information with the backend API

## 4. Frontend

The frontend is developed using React and Vite.

Important frontend areas include:
- `src/App.jsx`
- `src/index.css`
- `src/pages/`
- `src/pages/auth/`

The frontend provides the user interface and sends requests to the backend when server-side data is required.

## 5. Backend

The backend is developed using Python and Django.

The backend is responsible for:
- Processing API requests
- Validating submitted data
- Managing application records
- Communicating with the configured database
- Returning responses to the frontend

## 6. Database

The database stores application information such as user accounts, customer details, meal plans, subscriptions, orders, payments, and delivery information according to the implemented models.

Database connectivity and credentials must be configured correctly for API operations to work.

## 7. Testing and Verification

The following checks should be performed:

1. Open the homepage.
2. Open the registration and login pages.
3. Check that meal plans are displayed correctly.
4. Open the My Subscriptions page.
5. Test available subscription actions.
6. Open the dashboard and verify navigation links.
7. Start the Django backend and check for errors.
8. Verify the frontend-to-backend connection.
9. Check that API errors are displayed properly.

## 8. Issues to Verify

- Backend server availability
- Database connection and authentication
- API authentication errors
- Missing frontend page imports
- Incorrect navigation paths
- Data loading and status refresh

## 9. Day 5 Outcome

Day 5 documentation records the main application modules, technology stack, testing activities, and issues that need verification.

Only mark a feature as completed after testing it successfully in the running application.

## 10. Next Steps

- Resolve remaining frontend and backend errors.
- Test the main customer workflows.
- Verify database operations.
- Review project documentation.
- Check Git status before committing and pushing the work to GitHub.
