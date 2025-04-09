from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):
    TIPOS_USUARIO = (
        ('SUPER', 'Super Administrador'),
        ('RH_ADMIN', 'Administrador RH'),
        ('RH', 'Usuário RH'),
        ('FUNC', 'Funcionário Comum'),
    )
    
    tipo_usuario = models.CharField(max_length=8, choices=TIPOS_USUARIO, default='FUNC')
    telefone = models.CharField(max_length=15, blank=True)
    
    class Meta:
        verbose_name = 'Usuário'
        verbose_name_plural = 'Usuários'
    
    def __str__(self):
        return f"{self.username} ({self.get_tipo_usuario_display()})"

class Funcionario(models.Model):
    nome_completo = models.CharField(max_length=255)
    data_nascimento = models.DateField(null=True, blank=True)
    sexo = models.CharField(max_length=10, blank=True)
    estado_civil = models.CharField(max_length=20, blank=True)
    nacionalidade = models.CharField(max_length=50, blank=True)
    naturalidade = models.CharField(max_length=50, blank=True)
    nome_mae = models.CharField(max_length=255, blank=True)
    nome_pai = models.CharField(max_length=255, blank=True)
    cpf = models.CharField(max_length=14, blank=True)
    rg = models.CharField(max_length=20, blank=True)
    orgao_emissor = models.CharField(max_length=20, blank=True)
    data_emissao = models.DateField(null=True, blank=True)
    titulo_eleitor = models.CharField(max_length=20, blank=True)
    zona = models.CharField(max_length=10, blank=True)
    secao = models.CharField(max_length=10, blank=True)
    reservista = models.CharField(max_length=20, blank=True)
    ctps = models.CharField(max_length=20, blank=True)
    serie = models.CharField(max_length=20, blank=True)
    pis = models.CharField(max_length=20, blank=True)
    cnh = models.CharField(max_length=20, blank=True)
    categoria = models.CharField(max_length=5, blank=True)
    validade_cnh = models.DateField(null=True, blank=True)
    escolaridade = models.CharField(max_length=50, blank=True)
    curso = models.CharField(max_length=100, blank=True)
    instituicao = models.CharField(max_length=100, blank=True)
    conclusao = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    telefone = models.CharField(max_length=20, blank=True)
    celular = models.CharField(max_length=20, blank=True)
    cep = models.CharField(max_length=10, blank=True)
    endereco = models.CharField(max_length=255, blank=True)
    numero = models.CharField(max_length=10, blank=True)
    complemento = models.CharField(max_length=50, blank=True)
    bairro = models.CharField(max_length=50, blank=True)
    cidade = models.CharField(max_length=50, blank=True)
    estado = models.CharField(max_length=2, blank=True)
    cargo = models.CharField(max_length=100, blank=True)
    setor = models.CharField(max_length=100, blank=True)
    salario = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    data_admissao = models.DateField(null=True, blank=True)
    data_demissao = models.DateField(null=True, blank=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.nome_completo

class Beneficiario(models.Model):
    funcionario = models.ForeignKey(Funcionario, on_delete=models.CASCADE, related_name='beneficiarios')
    nome = models.CharField(max_length=255)
    parentesco = models.CharField(max_length=100, blank=True, null=True)
    data_nascimento = models.DateField(blank=True, null=True)
    cpf = models.CharField(max_length=14, blank=True, null=True)

    def __str__(self):
        return f"{self.nome} - {self.parentesco}"
