## 10. Verified API Test Results

The following API endpoints were tested using a valid JWT access token.

| API Endpoint | Actual Result | Status |
|---|---|---|
| `/api/meal-plans/` | Meal plan records returned | Passed |
| `/api/customers/` | Customer record returned | Passed |
| `/api/subscriptions/` | Two subscription records returned | Passed |
| `/api/orders/` | Order record returned | Passed |
| `/api/deliveries/` | Delivery record returned | Passed |
| `/api/payments/` | Payment record returned | Passed |
| `/api/feedback/` | Feedback record returned | Passed |
| `/api/notifications/` | Notification record returned | Passed |
| `/api/user-profiles/` | User profile returned with `delivery_staff` role | Passed |

The user profiles endpoint was also tested earlier.

## 11. Conclusion

The tested endpoints returned data from the configured MySQL database when accessed with a valid JWT token. The meal plans endpoint rejected a request without authentication credentials.

Create, update, delete, input validation, and comprehensive role-based permission tests remain to be completed.

## 12. Delivery Staff Permission Tests

| Test Case | Expected Result | Actual Result |
|---|---|---|
| Delivery staff accesses `/api/deliveries/` | Access allowed | Passed — delivery record returned |
| Delivery staff accesses `/api/meal-plans/` | Access denied | Passed — permission-denied response returned |

**Conclusion:** The delivery staff account could access the deliveries endpoint but was denied access to the meal plans endpoint. This confirms that the tested endpoints enforce different permissions for this role.


## Meal Plans CRUD API Testing

Endpoint: `/api/meal-plans/`

Authentication: JWT Bearer token

| Method | Operation | Result |
|---|---|---|
| GET | List meal plans | Passed |
| POST | Create a meal plan | Passed |
| GET by ID | Retrieve created meal plan | Passed |
| PATCH | Update meal plan price | Passed |
| DELETE | Delete test meal plan | Passed |
| GET by deleted ID | Verify deleted record | Passed — record not found |

Test record ID: 52

The test record was created with the name `Healthy Breakfast Plan`, updated from 80.00 to 90.00, and deleted successfully. A follow-up GET request returned `No MealPlan matches the given query.` The final meal plan list contained the two original records.

Note: These tests verify the Meal Plans CRUD endpoint using an authenticated admin account. They do not verify all endpoints, all role permissions, or the complete business rules.



## Meal Plan Price Validation Test

- Endpoint: `POST /api/meal-plans/`
- Test input: `price = -10.00`
- Expected result: Reject the request.
- Actual result: Passed.
- Error response: `{"price":["Price must be greater than zero."]}`

Conclusion: The MealPlanSerializer rejects prices less than or equal to zero.


## Zero Price Validation Test

- Endpoint: `POST /api/meal-plans/`
- Test input: `price = 0.00`
- Expected result: Reject the request.
- Actual result: Passed.
- Error response: `{"price":["Price must be greater than zero."]}`

## Final Meal Plans Database Verification

- Endpoint: `GET /api/meal-plans/`
- Result: Passed.
- The API returned the two original Meal Plan records.
- The negative-price and zero-price test requests did not leave additional test records in the final list.


## Required Name Validation Test

- Endpoint: `POST /api/meal-plans/`
- Test: Submit a meal plan without the `name` field.
- Expected result: Reject the request.
- Actual result: Passed.
- Error response: `{"name":["This field is required."]}`

Conclusion: The API requires the meal plan name when creating a record.


## Optional Description Validation Test

- Endpoint: `POST /api/meal-plans/`
- Test: Create a meal plan without the description field.
- Actual result: Request accepted successfully.
- Created test record ID: 55
- Cleanup: Test record deleted after verification.
- Status: Passed.

Conclusion: The description field is optional.


## Active Status Filtering Test

- Endpoint: `GET /api/meal-plans/?is_active=true`
- Actual result: Active meal plans returned successfully.
- Status: Passed.

- Endpoint: `GET /api/meal-plans/?is_active=false`
- Actual result: Empty result because no inactive meal plans were available.
- Status: Passed.

Conclusion: The API filters meal plans by active status.


## Meal Plan Search and Ordering Tests

- Search endpoint: `GET /api/meal-plans/?search=Regular`
- Result: Two matching meal plans returned.
- Status: Passed.

- Ordering endpoint: `GET /api/meal-plans/?ordering=price`
- Result: Meal plans returned in ascending price order.
- Status: Passed.

- Reverse ordering endpoint: `GET /api/meal-plans/?ordering=-price`
- Expected result: Meal plans returned in descending price order.



## Meal Type Filtering Tests

- Endpoint: `GET /api/meal-plans/?meal_type=lunch`
- Result: Both lunch meal plans returned successfully.
- Status: Passed.

- Endpoint: `GET /api/meal-plans/?meal_type=breakfast`
- Result: Empty result because no breakfast meal plans exist.
- Status: Passed.

## Reverse Price Ordering Test

- Endpoint: `GET /api/meal-plans/?ordering=-price`
- Result: Both meal plans returned successfully in descending price order.
- Note: Both records have the same price of 100.00.
- Status: Passed.


## Authentication Security Test

- Endpoint: `GET /api/meal-plans/`
- Test: Send a request without an authentication token.
- Actual result: Request rejected.
- Response: `Authentication credentials were not provided.`
- Status: Passed.

Conclusion: The API requires authentication before allowing access to meal plans.


## Final API Endpoint Verification

**Date:** 9 October 2026

All nine API endpoints were tested using a valid JWT access token. All endpoints returned successful responses.

| No. | API Endpoint | Result |
|---:|---|---|
| 1 | `/api/user-profiles/` | SUCCESS |
| 2 | `/api/customers/` | SUCCESS |
| 3 | `/api/meal-plans/` | SUCCESS |
| 4 | `/api/subscriptions/` | SUCCESS |
| 5 | `/api/orders/` | SUCCESS |
| 6 | `/api/deliveries/` | SUCCESS |
| 7 | `/api/payments/` | SUCCESS |
| 8 | `/api/feedback/` | SUCCESS |
| 9 | `/api/notifications/` | SUCCESS |

**Conclusion:** All nine API endpoints returned successful responses during the authenticated GET request tests. This confirms that the endpoints are accessible with a valid JWT token. It does not by itself confirm that all create, update, delete, validation, and business-rule tests are complete.

## Delivery Staff Permission Test

**Test 1:** GET `/api/deliveries/` using a Delivery Staff JWT token.

**Actual Result:** The delivery record was returned successfully.

**Status:** PASS

**Test 2:** GET `/api/meal-plans/` using the same Delivery Staff JWT token.

**Actual Result:** Access was denied with the message: `You do not have permission to perform this action.`

**Status:** PASS

**Conclusion:** Delivery Staff can access delivery records but cannot access the Meal Plans endpoint with their current role permissions.


## Delivery Status Update Test

**Endpoint:** `PATCH /api/deliveries/1/`

**User Role:** Delivery Staff

**Request Body:**
```json
{
  "status": "picked_up"
}
```

**Actual Result:** The API successfully updated the delivery status from `assigned` to `picked_up`.

**Status:** PASS

**Conclusion:** The Delivery Staff account was able to update the status of its assigned delivery through the API.

**Note:** This test confirms status update access. Restrictions on changing other delivery fields still need separate verification.

## Delivery Staff Field-Level Security Tests

| Test | Expected Result | Actual Result | Status |
|---|---|---|---|
| Update delivery status | Status updates successfully | Status changed to `picked_up` | PASS |
| Update delivery notes | Notes update successfully | Notes updated successfully | PASS |
| Change delivery staff | Assignment remains unchanged | `delivery_staff` remained `2` | PASS |
| Change order | Order remains unchanged | `order` remained `1` | PASS |
| Change delivery date | Date remains unchanged | Date remained `2026-10-07` | PASS |
| Change delivered timestamp | Timestamp remains unchanged | `delivered_at` remained empty | PASS |

**Conclusion:** Delivery Staff can update delivery status and notes, but cannot modify assignment, order, delivery date, or delivery completion timestamp through the tested PATCH requests.

## Delivery Staff Security Testing

| Test | Expected Result | Actual Result | Status |
|---|---|---|---|
| Access Meal Plans API | Permission denied | Permission denied | PASS |
| Update delivery status | Status can be updated | Status updated to delivered | PASS |
| Update delivery notes | Notes can be updated | Notes updated successfully | PASS |
| Change delivery date | Date remains unchanged | Date remained 2026-10-07 | PASS |
| Change delivered_at directly | Field remains unchanged | Field remained empty | PASS |

**Conclusion:** Delivery Staff can access permitted delivery records and update delivery status and notes. The delivery date, order assignment, staff assignment, and `delivered_at` fields are read-only for Delivery Staff.

## Final Backend Verification

| Check | Result |
|---|---|
| Django system check | PASS — No issues detected |
| MySQL connection | PASS — Connected successfully |
| API endpoints | PASS — All 9 endpoints responded successfully with admin authentication |
| Database records | PASS — Records found in all 9 checked tables |
| Migration check | PASS — `makemigrations --check --dry-run` reported no changes |
| Delivery Staff permission test | PASS — Meal Plans access denied |
| Delivery status update | PASS |
| Delivery notes update | PASS |
| Delivery date protection | PASS — Date remained unchanged |
| `delivered_at` protection | PASS — Value remained unchanged |

**Note:** These results reflect the checks performed during development. The separate `migrate --check` command has not yet been run.
