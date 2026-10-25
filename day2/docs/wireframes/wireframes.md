# Tiffin & Home Food Business Web Application

# Wireframe Documentation

## 1. Introduction

This document describes the planned user interface and major screens of the Tiffin & Home Food Business Web Application.

The wireframes are prepared before frontend development to define the structure, navigation, forms, lists, and major user interactions.

## 2. User Roles

The application supports the following roles:

1. Admin / Owner
2. Kitchen Staff
3. Delivery Staff
4. Customer

## 3. Authentication Screens

### 3.1 Login Screen

The Login screen allows users to access the application using their registered credentials.

Main elements:

- Email
- Password
- Login button
- Forgot Password option
- Register link
- Validation messages

### 3.2 Register Screen

The Register screen allows a new customer to create an account.

Main elements:

- Full Name
- Email
- Phone Number
- Password
- Confirm Password
- Address
- Register button
- Login link
- Validation messages

## 4. Admin / Owner Screens

### 4.1 Admin Dashboard

The dashboard provides an overview of the business.

Main elements:

- Total Customers
- Active Subscriptions
- Today's Orders
- Pending Deliveries
- Today's Payments
- Recent Activities
- Quick Actions

### 4.2 Customer Management

The Customer Management screen allows the Admin to manage customer records.

Main elements:

- Customer list
- Search
- Filter
- Add Customer
- Edit Customer
- View Customer
- Delete Customer
- Customer details

### 4.3 Meal Plan Management

The Meal Plan screen allows the Admin to manage available meal plans.

Main elements:

- Meal plan list
- Add Meal Plan
- Edit Meal Plan
- View Meal Plan
- Delete Meal Plan
- Search
- Filter
- Price
- Meal type
- Status

### 4.4 Subscription Management

The Subscription screen allows the Admin to manage customer subscriptions.

Main elements:

- Subscription list
- Customer
- Meal Plan
- Start Date
- End Date
- Quantity
- Price
- Status
- Pause
- Resume
- Search
- Filter

### 4.5 Order Management

The Order Management screen displays daily orders.

Main elements:

- Order list
- Order ID
- Customer
- Date
- Meal Plan
- Quantity
- Order Status
- Search
- Filter
- View Details

### 4.6 Delivery Management

The Delivery screen allows the Admin to monitor deliveries.

Main elements:

- Delivery list
- Order ID
- Customer
- Delivery Staff
- Delivery Address
- Delivery Status
- Delivery Date
- Search
- Filter

### 4.7 Payment Management

The Payment screen displays financial transactions.

Main elements:

- Payment list
- Payment ID
- Customer
- Amount
- Payment Method
- Payment Date
- Payment Status
- Search
- Filter
- Transaction Details

### 4.8 Feedback Management

The Feedback screen allows the Admin to view customer feedback.

Main elements:

- Customer
- Rating
- Feedback
- Date
- Status
- Search
- Filter

### 4.9 Notifications

The Notifications screen displays system and business notifications.

Main elements:

- Notification list
- Notification message
- Notification type
- Date
- Read / Unread status

### 4.10 Reports

The Reports screen provides business reports.

Main elements:

- Customer report
- Subscription report
- Order report
- Delivery report
- Payment report
- Revenue information
- Date filters

## 5. Kitchen Staff Screens

### 5.1 Kitchen Dashboard

Main elements:

- Today's Orders
- Pending Orders
- Preparing Orders
- Completed Orders

### 5.2 Kitchen Orders

Main elements:

- Order ID
- Customer
- Meal
- Quantity
- Order Date
- Order Status
- Update Status

Kitchen staff can update the preparation status of orders according to their permissions.

## 6. Delivery Staff Screens

### 6.1 Delivery Dashboard

Main elements:

- Assigned Deliveries
- Pending Deliveries
- Completed Deliveries

### 6.2 Delivery Orders

Main elements:

- Order ID
- Customer Name
- Delivery Address
- Delivery Date
- Delivery Status
- Update Delivery Status

Delivery staff can update delivery status but cannot change subscription pricing.

## 7. Customer Screens

### 7.1 Customer Dashboard

Main elements:

- Active Subscription
- Today's Order
- Upcoming Orders
- Payment Summary
- Notifications

### 7.2 Meal Plans

Main elements:

- Available Meal Plans
- Meal Name
- Description
- Price
- Meal Type
- Subscribe button

### 7.3 Subscription

Main elements:

- Current Subscription
- Meal Plan
- Quantity
- Start Date
- End Date
- Price
- Subscription Status
- Pause Service
- Resume Service

### 7.4 Orders

Main elements:

- Order History
- Order ID
- Order Date
- Meal
- Quantity
- Order Status
- View Details

### 7.5 Payments

Main elements:

- Payment History
- Amount
- Payment Method
- Payment Date
- Payment Status
- Transaction Details

### 7.6 Feedback

Main elements:

- Rating
- Feedback message
- Submit button
- Previous feedback

### 7.7 Profile

Main elements:

- Name
- Email
- Phone
- Address
- Edit Profile
- Change Password

## 8. Common UI Features

The application should provide:

- Responsive design
- Navigation menu
- Search functionality
- Filter functionality
- Form validation
- Error messages
- Success messages
- Confirmation messages
- Loading indicators
- Role-based navigation

## 9. Navigation Structure

### Admin

Login
→ Dashboard
→ Customers
→ Meal Plans
→ Subscriptions
→ Orders
→ Delivery
→ Payments
→ Feedback
→ Notifications
→ Reports
→ Profile
→ Settings

### Kitchen Staff

Login
→ Dashboard
→ Kitchen Orders
→ Notifications
→ Profile

### Delivery Staff

Login
→ Dashboard
→ Assigned Deliveries
→ Notifications
→ Profile

### Customer

Login
→ Dashboard
→ Meal Plans
→ Subscription
→ Orders
→ Payments
→ Feedback
→ Notifications
→ Profile

## 10. Responsive Design

The application interface should work properly on:

- Desktop
- Laptop
- Tablet
- Mobile

The layout should adjust according to the screen size.

## 11. Wireframe Design Goal

The wireframes provide a clear plan for the frontend implementation.

They define:

- Screen structure
- Navigation
- Forms
- Lists
- Search and filters
- User actions
- Role-based screens
- Dashboard information