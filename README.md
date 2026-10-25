# Tiffin & Home Food Business Web Application

## 1. Project Overview

The Tiffin & Home Food Business Web Application is designed to help customers explore homemade meal plans and manage their subscriptions through a web-based interface.

The project includes a React frontend and a Django backend. The system design also covers customer accounts, meal plans, subscriptions, orders, deliveries, payments, feedback, and notifications.

## 2. Project Objectives

- Display homemade meal plans and their details.
- Provide customer registration and login pages.
- Allow customers to view and manage subscriptions.
- Provide a dashboard for navigating application features.
- Organize customer and meal-related information.
- Support order and delivery management as defined in the project design.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| React | Frontend user interface |
| Vite | Frontend development server |
| Python | Backend programming language |
| Django | Backend web framework |
| Database | Store application data |
| Git and GitHub | Version control and project hosting |

## 4. Main Features

### Homepage
Displays the application introduction, meal plans, and navigation links.

### Customer Authentication
Provides registration and login pages.

### Meal Plans
Displays available meal options, descriptions, and prices.

### Dashboard
Provides navigation to the main application sections.

### Subscription Management
Displays subscription details, dates, quantity, price, and status. Pause and cancellation actions are available where implemented.

### Orders and Delivery
The project design includes order tracking and delivery management.

### Feedback and Notifications
The project design includes customer feedback and notification management.

## 5. Project Structure

```text
Tiffin-Home-Food-App/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   └── auth/
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
│
├── day1/
├── day2/
├── day3/
├── day4/
├── day5/
├── day6/
├── day7/
└── README.md
```

Note: This is the intended high-level structure. Keep only folders and files that actually exist in your project.

## 6. Requirements

- Node.js and npm
- Python
- Django and the project's required Python packages
- A configured database
- Git for version control

## 7. How to Run the Frontend

Open PowerShell or the VS Code terminal and run:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL displayed in the terminal.

## 8. How to Run the Backend

Open a separate terminal and run:

```powershell
cd day3
.\venv_py313\Scripts\Activate.ps1
python manage.py runserver
```

The virtual environment folder and activation command must match your actual local setup.

If the backend reports a database connection or authentication error, configure the database before testing features that require it.

## 9. Database Design

The project's ERD describes entities such as users, customers, addresses, meal plans, subscriptions, pause requests, daily orders, deliveries, payments, feedback, notifications, and audit logs.

The exact relationships and fields should be checked against the project's ERD and implemented database models.

## 10. Data Flow Diagram

The project's DFD describes interactions between customers, the admin/owner, kitchen staff, delivery staff, and the system's main processes.

The processes include authentication, customer and meal-plan management, subscription management, order generation, delivery, payments, feedback, notifications, and reports.

## 11. Testing

Before submission, verify the following:

- Homepage loads correctly.
- Login and registration pages open.
- Frontend and backend can communicate.
- Database connectivity works.
- Meal plans are displayed correctly.
- Subscription details load correctly.
- Available subscription actions work.
- Dashboard navigation works.
- No missing component imports remain.

## 12. Documentation

The project documentation includes the project overview, requirements, modules, ERD, DFD, user-interface screenshots, testing checklist, and conclusion.

Daily work notes are maintained in the relevant day folders.

## 13. Version Control

Git and GitHub are used to track and host project source code.

Before committing, review staged files and ensure that passwords, API tokens, `.env` secrets, and virtual environment folders are not uploaded.

## 14. Future Enhancements

- Improve the customer dashboard.
- Add complete order tracking.
- Improve delivery management.
- Add payment integration.
- Improve notifications and reporting.
- Add more automated tests and validation.

## 15. Conclusion

The Tiffin & Home Food Business Web Application aims to make homemade meal-plan discovery and subscription management easier for customers. The project combines a React-based frontend with a Django backend and includes design documentation for the related business processes.

The final implementation should be tested against the project requirements before submission.
