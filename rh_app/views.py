from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated  # se for usar proteção por login
from django.contrib.auth import authenticate, login
from django.contrib.auth import get_user_model

from .models import Funcionario, Beneficiario
from .serializers import FuncionarioSerializer, BeneficiarioSerializer, UsuarioSerializer

User = get_user_model()

class FuncionarioViewSet(viewsets.ModelViewSet):
    queryset = Funcionario.objects.all()
    serializer_class = FuncionarioSerializer
    permission_classes = [IsAuthenticated]  # opcional: só permite acesso se estiver logado

class BeneficiarioViewSet(viewsets.ModelViewSet):
    queryset = Beneficiario.objects.all()
    serializer_class = BeneficiarioSerializer
    permission_classes = [IsAuthenticated]  # idem

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            serializer = UsuarioSerializer(user)
            return Response({
                "message": "Login realizado com sucesso",
                "usuario": serializer.data
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Usuário ou senha inválido"}, status=status.HTTP_401_UNAUTHORIZED)
