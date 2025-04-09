from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Funcionario, Beneficiario

User = get_user_model()

class BeneficiarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beneficiario
        fields = '__all__'

class FuncionarioSerializer(serializers.ModelSerializer):
    beneficiarios = BeneficiarioSerializer(many=True, read_only=True)

    class Meta:
        model = Funcionario
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'tipo_usuario']
