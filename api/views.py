
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from accounts.models import UserProfile
from customers.models import Customer
from meal_plans.models import MealPlan
from subscriptions.models import Subscription
from orders.models import Order
from delivery.models import Delivery
from payments.models import Payment
from feedback.models import Feedback
from notifications.models import Notification

from .serializers import (
    UserProfileSerializer,
    CustomerSerializer,
    MealPlanSerializer,
    SubscriptionSerializer,
    OrderSerializer,
    DeliverySerializer,
    PaymentSerializer,
    FeedbackSerializer,
    NotificationSerializer,
)

from .permissions import (
    IsAdminRole,
    IsKitchenStaff,
    IsDeliveryStaff,
    IsCustomer,
)


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAdminRole]


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAdminRole]
    filterset_fields = ['is_active']
    search_fields = [
        'phone',
        'address',
        'delivery_address',
        'user__username',
        'user__first_name',
        'user__last_name',
    ]
    ordering_fields = ['id', 'phone', 'is_active']


class MealPlanViewSet(viewsets.ModelViewSet):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer
    permission_classes = [IsAdminRole]
    filterset_fields = ['meal_type', 'is_active']
    search_fields = ['name', 'description']
    ordering_fields = ['id', 'name', 'price']


class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAdminRole | IsCustomer]
    filterset_fields = ['status', 'customer', 'meal_plan']
    search_fields = [
        'customer__user__username',
        'customer__user__first_name',
        'customer__user__last_name',
        'meal_plan__name',
    ]
    ordering_fields = [
        'id',
        'start_date',
        'end_date',
        'price',
        'quantity',
    ]

    def get_queryset(self):
        user = self.request.user

        if not user or not user.is_authenticated:
            return Subscription.objects.none()

        if user.is_superuser:
            return Subscription.objects.all()

        try:
            role = user.userprofile.role
        except (AttributeError, UserProfile.DoesNotExist):
            return Subscription.objects.none()

        if role == 'admin':
            return Subscription.objects.all()

        if role == 'customer':
            return Subscription.objects.filter(customer__user=user)

        return Subscription.objects.none()

    @action(detail=True, methods=['post'])
    def pause(self, request, pk=None):
        subscription = self.get_object()

        if subscription.status != 'active':
            return Response(
                {'detail': 'Only active subscriptions can be paused.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        subscription.status = 'paused'
        subscription.save(update_fields=['status'])

        return Response(
            SubscriptionSerializer(subscription).data,
            status=status.HTTP_200_OK,
        )

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        subscription = self.get_object()

        if subscription.status in ['cancelled', 'completed']:
            return Response(
                {'detail': 'This subscription cannot be cancelled.'},
                status=status.HTTP_400_BAD_REQUEST,
            )

        subscription.status = 'cancelled'
        subscription.save(update_fields=['status'])

        return Response(
            SubscriptionSerializer(subscription).data,
            status=status.HTTP_200_OK,
        )


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAdminRole | IsKitchenStaff | IsCustomer]
    filterset_fields = ['status', 'customer', 'subscription', 'order_date']
    search_fields = [
        'customer__user__username',
        'customer__user__first_name',
        'customer__user__last_name',
    ]
    ordering_fields = [
        'id',
        'order_date',
        'quantity',
        'total_amount',
        'status',
    ]


class DeliveryViewSet(viewsets.ModelViewSet):
    queryset = Delivery.objects.all()
    serializer_class = DeliverySerializer
    permission_classes = [IsAdminRole | IsDeliveryStaff]
    filterset_fields = [
        'status',
        'delivery_staff',
        'delivery_date',
        'order',
    ]
    search_fields = [
        'order__customer__user__username',
        'order__customer__user__first_name',
        'order__customer__user__last_name',
        'delivery_notes',
    ]
    ordering_fields = ['id', 'delivery_date', 'status', 'delivered_at']


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [IsAdminRole | IsCustomer]
    filterset_fields = [
        'status',
        'payment_method',
        'customer',
        'order',
        'payment_date',
    ]
    search_fields = [
        'transaction_id',
        'customer__user__username',
        'customer__user__first_name',
        'customer__user__last_name',
    ]
    ordering_fields = ['id', 'amount', 'payment_date', 'status']


class FeedbackViewSet(viewsets.ModelViewSet):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = [IsAdminRole | IsCustomer]
    filterset_fields = ['rating', 'customer', 'order', 'created_at']
    search_fields = [
        'comment',
        'customer__user__username',
        'customer__user__first_name',
        'customer__user__last_name',
    ]
    ordering_fields = ['id', 'rating', 'created_at']


class NotificationViewSet(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    permission_classes = [
        IsAdminRole | IsKitchenStaff | IsDeliveryStaff | IsCustomer
    ]
    filterset_fields = [
        'user',
        'notification_type',
        'is_read',
        'created_at',
    ]
    search_fields = ['title', 'message']
    ordering_fields = ['id', 'created_at', 'is_read']
