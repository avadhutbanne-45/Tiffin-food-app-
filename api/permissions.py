from rest_framework.permissions import BasePermission


class IsAdminRole(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        if request.user.is_superuser:
            return True

        try:
            return request.user.userprofile.role == 'admin'
        except:
            return False


class IsKitchenStaff(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        try:
            return request.user.userprofile.role == 'kitchen_staff'
        except:
            return False


class IsDeliveryStaff(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        try:
            return request.user.userprofile.role == 'delivery_staff'
        except:
            return False


class IsCustomer(BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False

        try:
            return request.user.userprofile.role == 'customer'
        except:
            return False