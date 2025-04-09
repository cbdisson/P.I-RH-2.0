from rest_framework import serializers
from .models import Funcionario, Beneficiario

class BeneficiarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beneficiario
        fields = '__all__'

class FuncionarioSerializer(serializers.ModelSerializer):
    beneficiarios = BeneficiarioSerializer(many=True, read_only=True)

    class Meta:
        model = Funcionario
        fields = '__all__'
