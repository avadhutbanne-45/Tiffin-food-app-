from rest_framework.routers import DefaultRouter
from .views import (
    UserProfileViewSet,
    CustomerViewSet,
    MealPlanViewSet,
    SubscriptionViewSet,
    OrderViewSet,
    DeliveryViewSet,
    PaymentViewSet,
    FeedbackViewSet,
    NotificationViewSet,
)

router = DefaultRouter()

router.register('user-profiles', UserProfileViewSet)
router.register('customers', CustomerViewSet)
router.register('meal-plans', MealPlanViewSet)
router.register('subscriptions', SubscriptionViewSet)
router.register('orders', OrderViewSet)
router.register('deliveries', DeliveryViewSet)
router.register('payments', PaymentViewSet)
router.register('feedback', FeedbackViewSet)
router.register('notifications', NotificationViewSet)

urlpatterns = router.urls