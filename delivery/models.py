from django.db import models
from orders.models import Order
from django.contrib.auth.models import User


class Delivery(models.Model):
    STATUS_CHOICES = [
        ('assigned', 'Assigned'),
        ('picked_up', 'Picked Up'),
        ('out_for_delivery', 'Out for Delivery'),
        ('delivered', 'Delivered'),
        ('failed', 'Failed'),
    ]

    order = models.OneToOneField(
        Order,
        on_delete=models.CASCADE,
        related_name='delivery'
    )
    delivery_staff = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='deliveries'
    )
    delivery_date = models.DateField()
    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default='assigned'
    )
    delivered_at = models.DateTimeField(null=True, blank=True)
    delivery_notes = models.TextField(blank=True)

    def __str__(self):
        return f"Delivery #{self.id} - Order #{self.order.id}"