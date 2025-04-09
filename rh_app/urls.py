from django.urls import path, include
from rest_framework import routers
from .views import FuncionarioViewSet, BeneficiarioViewSet

router = routers.DefaultRouter()
router.register(r'funcionarios', FuncionarioViewSet)
router.register(r'beneficiarios', BeneficiarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
