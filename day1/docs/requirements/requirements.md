# Tiffin & Home Food Business Web Application

## 1. Project Overview

The Tiffin & Home Food Business Web Application is a full-stack web application designed for a local home-based tiffin service.

The application will provide one centralized system to manage customers, meal plans, subscriptions, daily orders, deliveries, payments, pauses, feedback, notifications and reports.

## 2. Project Type

Full Stack Web Application

## 3. Primary Objective

The primary objective of this application is to replace manual business processes such as notebooks, spreadsheets, phone calls, WhatsApp coordination and separate records with one reliable digital system.

## 4. User Roles

The application will have the following user roles:

1. Admin/Owner
2. Kitchen Staff
3. Delivery Staff
4. Customer

## 5. Functional Requirements

### 5.1 Customer Management

The system should provide:

- Customer profile management
- Customer address
- Delivery instructions
- Dietary preferences

### 5.2 Meal Plans

The system should support:

- Daily meal plans
- Weekly meal plans
- Monthly meal plans
- Lunch
- Dinner
- Veg options
- Jain options
- Other available meal options

### 5.3 Subscriptions

The system should manage:

- Subscription start date
- Subscription end date
- Active subscription
- Paused subscription
- Cancelled subscription
- Plan pricing

### 5.4 Daily Orders

The system should:

- Automatically generate daily orders from active subscriptions
- Allow order exceptions
- Calculate daily order quantity according to active subscriptions and approved add-ons

### 5.5 Delivery Management

The system should allow:

- Assignment of orders to delivery staff
- Grouping of orders by area
- Updating delivery status
- Marking orders as delivered
- Marking orders as not delivered

### 5.6 Payments

The system should manage:

- Subscription invoices
- Advance payments
- Pending payments
- Payment history

### 5.7 Pause and Resume

The system should allow:

- Customer to request temporary service pause
- Customer to resume service
- Paused dates to be excluded from delivery orders

### 5.8 Feedback

The system should support:

- Ratings
- Complaints
- Meal feedback

### 5.9 Notifications

The system should provide notifications for:

- Subscription renewal
- Daily delivery
- Payment reminders
- Pause confirmations

### 5.10 Reports

The system should provide:

- Daily meal count
- Active subscribers
- Revenue
- Pending payments
- Delivery performance

## 6. Core Business Flow

Customer Management
→ Meal Plans
→ Subscriptions
→ Daily Orders
→ Delivery Management
→ Payments

## 7. Business Rules

1. Only active subscriptions generate daily orders.
2. Paused subscriptions must not generate delivery orders for paused dates.
3. Daily order quantity must be calculated from active subscriptions and approved add-ons.
4. Delivery staff can update delivery status but cannot change subscription pricing.

## 8. Key Screens

The application should include:

1. Login
2. Register
3. Role-specific Dashboard
4. Main Records List
5. Search and Filters
6. Create/Edit Form
7. Record Details
8. Record History
9. Transactions/Payments
10. Reports/Analytics
11. Profile
12. Settings
13. Notifications

## 9. API Requirements

The backend should provide REST APIs for:

- Authentication
- Core entity CRUD operations
- Search and filtering
- Workflow and status operations
- Transactions and payments
- Dashboard and reports
- Role and permission checks

## 10. MVP Requirements

The Minimum Viable Product should include:

- Authentication
- Role-based authorization
- Main customer/user records
- Primary business workflow
- Search and filtering
- Payment/financial tracking
- Dashboard with key metrics
- Responsive frontend
- Backend validation
- Error handling
- Database persistence
- Basic testing
- Documentation

## 11. Non-Functional Requirements

The application should provide:

- Responsive UI for desktop, tablet and mobile
- Secure password hashing
- Server-side validation
- Clear success and error messages
- Useful HTTP status codes
- Role-based authorization
- Database consistency
- Search, filtering and pagination for large lists
- Audit/history for important status and financial changes
- Environment variables for secrets and API keys
- Clean folder structure
- Reusable components
- Documented setup
- Basic accessibility

## 12. Acceptance Criteria

The application should satisfy the following:

- All core user roles can authenticate.
- Users should see only authorized functions.
- Main business records can be created, viewed, edited and searched.
- The primary business workflow should work end-to-end.
- Financial calculations should be consistent and testable.
- Important status changes should be stored with dates, times and user information where appropriate.
- Invalid inputs should display understandable validation messages.
- The responsive UI should work on common desktop and mobile screen sizes.
- No critical frontend, API or database errors should remain in the final demonstration.
- README, setup instructions, ER diagram, API documentation and test cases should be submitted.
- The project should be demonstrated using realistic sample data.