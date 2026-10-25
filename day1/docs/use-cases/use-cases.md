# Use Cases

## 1. Login

### Use Case ID
UC-01

### Use Case Name
User Login

### Primary Actor
Admin/Owner, Kitchen Staff, Delivery Staff, Customer

### Description
The user logs into the application using valid credentials.

### Preconditions
- User must have a registered account.
- User must have valid login credentials.

### Main Flow
1. User opens the Login page.
2. User enters email and password.
3. User submits the login form.
4. System validates the credentials.
5. System authenticates the user.
6. System redirects the user to the authorized dashboard.

### Alternative Flow
- If credentials are invalid, the system displays an error message.

### Postconditions
- User is successfully logged in.
- User can access authorized features according to their role.


## 2. Customer Management

### Use Case ID
UC-02

### Use Case Name
Manage Customers

### Primary Actor
Admin/Owner

### Description
Admin/Owner manages customer information.

### Preconditions
- Admin/Owner must be logged in.
- Admin/Owner must have required permissions.

### Main Flow
1. Admin/Owner opens the customer management section.
2. System displays customer records.
3. Admin/Owner can add a new customer.
4. Admin/Owner can view customer details.
5. Admin/Owner can edit customer information.
6. Admin/Owner can search customer records.
7. System saves the changes.

### Alternative Flow
- If required information is missing, the system displays validation messages.

### Postconditions
- Customer information is stored or updated successfully.


## 3. Meal Plan Management

### Use Case ID
UC-03

### Use Case Name
Manage Meal Plans

### Primary Actor
Admin/Owner

### Description
Admin/Owner creates and manages available meal plans.

### Preconditions
- Admin/Owner must be logged in.

### Main Flow
1. Admin/Owner opens the Meal Plans section.
2. System displays available meal plans.
3. Admin/Owner creates a meal plan.
4. Admin/Owner enters meal plan details.
5. Admin/Owner saves the meal plan.
6. System validates and stores the meal plan.

### Alternative Flow
- If meal plan information is invalid, the system displays an error message.

### Postconditions
- Meal plan is available for customers.


## 4. Subscription Management

### Use Case ID
UC-04

### Use Case Name
Manage Subscription

### Primary Actor
Customer, Admin/Owner

### Description
Customer subscribes to a meal plan and Admin/Owner manages the subscription.

### Preconditions
- Customer must have an account.
- A meal plan must be available.

### Main Flow
1. Customer opens available meal plans.
2. Customer selects a meal plan.
3. Customer selects the subscription period.
4. System calculates the applicable price.
5. Customer confirms the subscription.
6. System creates the subscription.
7. Admin/Owner can view and manage the subscription.

### Alternative Flow
- If required information is invalid, the system displays a validation message.

### Postconditions
- Subscription is created and stored.
- Subscription status is recorded.


## 5. Daily Order Management

### Use Case ID
UC-05

### Use Case Name
Manage Daily Orders

### Primary Actor
Admin/Owner, Kitchen Staff

### Description
The system manages daily orders generated from active subscriptions.

### Preconditions
- Customer must have an active subscription.

### Main Flow
1. System identifies active subscriptions.
2. System generates daily orders.
3. System calculates the required meal quantity.
4. Admin/Owner or Kitchen Staff views daily orders.
5. Kitchen Staff uses the order information for meal preparation.

### Alternative Flow
- Paused subscriptions are excluded from delivery orders for paused dates.

### Postconditions
- Daily meal requirements are available for preparation.


## 6. Delivery Management

### Use Case ID
UC-06

### Use Case Name
Manage Deliveries

### Primary Actor
Admin/Owner, Delivery Staff

### Description
Admin/Owner assigns deliveries and Delivery Staff updates delivery status.

### Preconditions
- Daily orders must exist.
- Delivery Staff must be available.

### Main Flow
1. Admin/Owner views daily orders.
2. Admin/Owner assigns orders to Delivery Staff.
3. Delivery Staff views assigned orders.
4. Delivery Staff delivers the orders.
5. Delivery Staff updates the delivery status.
6. System stores the updated status.

### Alternative Flow
- If an order cannot be delivered, Delivery Staff marks it as not delivered.

### Postconditions
- Delivery status is updated and stored.


## 7. Payment Management

### Use Case ID
UC-07

### Use Case Name
Manage Payments

### Primary Actor
Admin/Owner, Customer

### Description
The system manages subscription invoices, advances, pending payments and payment history.

### Preconditions
- Customer must have a subscription or applicable payment record.

### Main Flow
1. Customer or Admin/Owner opens the payment section.
2. System displays payment information.
3. Payment information is recorded.
4. System updates the payment status.
5. Payment history is maintained.

### Alternative Flow
- If payment information is invalid, the system displays an error message.

### Postconditions
- Payment information is stored correctly.


## 8. Pause and Resume Subscription

### Use Case ID
UC-08

### Use Case Name
Pause and Resume Service

### Primary Actor
Customer

### Description
Customer temporarily pauses and resumes the tiffin service.

### Preconditions
- Customer must have an active subscription.

### Main Flow
1. Customer opens the subscription section.
2. Customer selects the pause option.
3. Customer selects the required pause dates.
4. System records the pause.
5. Paused dates are excluded from delivery orders.
6. Customer can resume the service.
7. System updates the subscription status.

### Alternative Flow
- If the selected dates are invalid, the system displays a validation message.

### Postconditions
- Subscription pause/resume status is updated.


## 9. Feedback Management

### Use Case ID
UC-09

### Use Case Name
Provide Feedback

### Primary Actor
Customer

### Description
Customer provides ratings, complaints or meal feedback.

### Preconditions
- Customer must be logged in.

### Main Flow
1. Customer opens the Feedback section.
2. Customer selects the relevant meal/order.
3. Customer provides a rating or feedback.
4. Customer submits the feedback.
5. System stores the feedback.

### Alternative Flow
- If required feedback information is missing, the system displays a validation message.

### Postconditions
- Feedback is stored successfully.


## 10. Notification Management

### Use Case ID
UC-10

### Use Case Name
Receive Notifications

### Primary Actor
Customer

### Description
The system provides important notifications to the customer.

### Preconditions
- Customer must have an account.
- A notification event must occur.

### Main Flow
1. A notification event occurs.
2. System creates the notification.
3. Customer receives the notification.
4. Customer views the notification.

### Notification Types
- Subscription renewal
- Daily delivery
- Payment reminder
- Pause confirmation

### Postconditions
- Customer can view important notifications.


## 11. Search and Filter

### Use Case ID
UC-11

### Use Case Name
Search and Filter Records

### Primary Actor
Authorized User

### Description
Authorized users search and filter application records.

### Preconditions
- User must be logged in.
- User must have permission to access the relevant records.

### Main Flow
1. User opens a records list.
2. User enters a search term or selects filters.
3. System processes the search or filter.
4. System displays matching records.

### Postconditions
- Relevant records are displayed.


## 12. Dashboard and Reports

### Use Case ID
UC-12

### Use Case Name
View Dashboard and Reports

### Primary Actor
Admin/Owner

### Description
Admin/Owner views important business metrics and reports.

### Preconditions
- Admin/Owner must be logged in.

### Main Flow
1. Admin/Owner opens the dashboard.
2. System displays key metrics.
3. Admin/Owner views daily meal count.
4. Admin/Owner views active subscribers.
5. Admin/Owner views revenue.
6. Admin/Owner views pending payments.
7. Admin/Owner views delivery performance.

### Postconditions
- Admin/Owner can monitor business performance.


# Use Case Summary

| Use Case ID | Use Case | Primary Actor |
|---|---|---|
| UC-01 | User Login | All Users |
| UC-02 | Manage Customers | Admin/Owner |
| UC-03 | Manage Meal Plans | Admin/Owner |
| UC-04 | Manage Subscription | Customer, Admin/Owner |
| UC-05 | Manage Daily Orders | Admin/Owner, Kitchen Staff |
| UC-06 | Manage Deliveries | Admin/Owner, Delivery Staff |
| UC-07 | Manage Payments | Admin/Owner, Customer |
| UC-08 | Pause and Resume Service | Customer |
| UC-09 | Provide Feedback | Customer |
| UC-10 | Receive Notifications | Customer |
| UC-11 | Search and Filter Records | Authorized User |
| UC-12 | View Dashboard and Reports | Admin/Owner |