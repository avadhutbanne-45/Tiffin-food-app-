
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase


class ApiAuthenticationTests(APITestCase):
    def test_meal_plans_requires_authentication(self):
        response = self.client.get("/api/meal-plans/")
        self.assertIn(response.status_code, [401, 403])

    def test_admin_can_obtain_jwt_token(self):
        User = get_user_model()
        User.objects.create_superuser(
            username="testadmin",
            email="testadmin@example.com",
            password="TestAdmin@12345"
        )

        response = self.client.post(
            "/api/token/",
            {
                "username": "testadmin",
                "password": "TestAdmin@12345"
            },
            format="json"
        )

        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)
