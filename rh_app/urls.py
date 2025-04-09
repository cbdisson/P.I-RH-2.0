from django.urls import path, include
from rest_framework import routers
from .views import FuncionarioViewSet, BeneficiarioViewSet, LoginView

router = routers.DefaultRouter()
router.register(r'funcionarios', FuncionarioViewSet)
router.register(r'beneficiarios', BeneficiarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
]
