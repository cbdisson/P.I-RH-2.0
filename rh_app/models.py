from django.db import models

class Funcionario(models.Model):

    n_registro = models.IntegerField(primary_key=True)

    nome = models.CharField(max_length=255)
    data_nascimento = models.DateField(null=True, blank=True)
    estado_civil = models.CharField(max_length=20, blank=True)
    nacionalidade = models.CharField(max_length=50, blank=True)
    telefone = models.CharField(max_length=20, blank=True)

    nome_mae = models.CharField(max_length=255, blank=True)
    nome_pai = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name_plural = "01. Funcionaros"



class Empregador(models.Model):

    n_registrofun = models.OneToOneField(Funcionario, on_delete=models.CASCADE, related_name='registro_em', primary_key=True)
    nomefunc = models.ForeignKey(Funcionario, on_delete=models.CASCADE, related_name='nome_em')

    nome_emp = models.CharField(max_length=255)
    cnpj = models.CharField(max_length=20, blank=True)
    cep = models.CharField(max_length=10, blank=True)
    endereco = models.CharField(max_length=255, blank=True)
    numero = models.CharField(max_length=10, blank=True)
    andar = models.CharField(max_length=10, blank=True)
    apartamento = models.CharField(max_length=10, blank=True)
    bairro = models.CharField(max_length=50, blank=True)
    cidade = models.CharField(max_length=50, blank=True)
    uf = models.CharField(max_length=2, blank=True)

    def __str__(self):
        return self.nome_emp

    class Meta:
        verbose_name_plural = "02. Empregadores"



class Residencia(models.Model):

    n_registrofun = models.ForeignKey(Funcionario, on_delete=models.CASCADE, related_name='registro_res', primary_key=True)
    nomefunc = models.ForeignKey(Funcionario, on_delete=models.CASCADE, related_name='nome_res')

    cep = models.CharField(max_length=10, blank=True)
    endereco = models.CharField(max_length=255, blank=True)
    numero = models.CharField(max_length=10, blank=True)
    andar = models.CharField(max_length=10, blank=True)
    apartamento = models.CharField(max_length=10, blank=True)
    bairro = models.CharField(max_length=50, blank=True)
    cidade = models.CharField(max_length=50, blank=True)
    uf = models.CharField(max_length=2, blank=True)

    def __str__(self):
        return self.nomefunc

    class Meta:
        verbose_name_plural = "03. Residencias"



class DocumentoFun(models.Model):

    n_registrofun = models.OneToOneField(Funcionario, on_delete=models.CASCADE, related_name='registro_doc', primary_key=True)
    nomefunc = models.ForeignKey(Funcionario, on_delete=models.CASCADE, related_name='nome_doc')

    cpf = models.CharField(max_length=20, blank=True)

    rg = models.CharField(max_length=20, blank=True)
    rg_orgao_emissor = models.CharField(max_length=20, blank=True)
    rg_data_emissao = models.DateField(null=True, blank=True)

    titulo_eleitor = models.CharField(max_length=20, blank=True)
    titulo_zona = models.CharField(max_length=10, blank=True)
    titulo_secao = models.CharField(max_length=10, blank=True)

    ctps = models.CharField(max_length=20, blank=True)
    ctps_serie = models.CharField(max_length=20, blank=True)
    ctps_uf = models.CharField(max_length=2, blank=True)
    ctps_data_emissao = models.DateField(null=True, blank=True)

    cnh = models.CharField(max_length=20, blank=True)
    cnh_categoria = models.CharField(max_length=5, blank=True)

    reservista = models.CharField(max_length=20, blank=True)

    def __str__(self):
        return self.nomefunc

    class Meta:
        verbose_name_plural = "04. Documentos"



class DocumentoEstrangeiro(models.Model):

    n_registrofun = models.OneToOneField(Funcionario, on_delete=models.CASCADE, related_name='registro_est', primary_key=True)
    nomefunc = models.ForeignKey(Funcionario, on_delete=models.CASCADE, related_name='nome_est')

    rne = models.CharField(max_length=14, blank=True)
    visto = models.CharField(max_length=100, blank=True)
    numero_decreto = models.CharField(max_length=20, blank=True)

    naturalidade = models.CharField(max_length=50, blank=True)

    casado = models.BooleanField(default=False)
    nome_conjuge = models.CharField(max_length=255, blank=True)
    numero_filhos = models.IntegerField(blank=True)

    data_chegada = models.DateField(null=True, blank=True)
    vencimento = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.nomefunc

    class Meta:
        verbose_name_plural = "05. Documentos estrangeiro"



class Funcao(models.Model):

    n_registrofun = models.OneToOneField(Funcionario, on_delete=models.CASCADE, related_name='registro_func', primary_key=True)
    nomefunc = models.ForeignKey(Funcionario, on_delete=models.CASCADE, related_name='nome_func')

    cargo = models.CharField(max_length=100, blank=True)
    departamento = models.CharField(max_length=100, blank=True)
    data_admissao = models.DateField(null=True, blank=True)
    hora_mes = models.TimeField(blank=True)

    grau_instrucao = models.CharField(max_length=50, blank=True)

    salario = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    tipo_pagamento = models.CharField(max_length=100, blank=True)
    adic_insalubridade = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    adic_periculosidade = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return self.nomefunc

    class Meta:
        verbose_name_plural = "06. Funções"



class HorarioTrab(models.Model):

    n_registrofun = models.OneToOneField(Funcionario, on_delete=models.CASCADE, related_name='registro_hor', primary_key=True)
    nomefunc = models.ForeignKey(Funcionario, on_delete=models.CASCADE, related_name='nome_hor')

    dom = models.TimeField(blank=True)
    seg = models.TimeField(blank=True)
    ter = models.TimeField(blank=True)
    qua = models.TimeField(blank=True)
    qui = models.TimeField(blank=True)
    sex = models.TimeField(blank=True)
    sab = models.TimeField(blank=True)

    def __str__(self):
        return self.nomefunc

    class Meta:
        verbose_name_plural = "07. Horarios"



class Beneficiario(models.Model):

    n_registrofun = models.ForeignKey(Funcionario, on_delete=models.CASCADE, related_name='registro_ben', primary_key=True)
    nomefunc = models.ForeignKey(Funcionario, on_delete=models.CASCADE, related_name='nome_ben')

    nome_ben = models.CharField(max_length=255)
    parentesco = models.CharField(max_length=100, blank=True, null=True)
    data_nascimento = models.DateField(blank=True, null=True)

    def __str__(self):
        return f"{self.nomefunc} - {self.nome_ben}"

    class Meta:
        verbose_name_plural = "08. Beneficiarios"



class FGTS(models.Model):

    n_registrofun = models.OneToOneField(Funcionario, on_delete=models.CASCADE, related_name='registro_fgts', primary_key=True)
    nomefunc = models.ForeignKey(Funcionario, on_delete=models.CASCADE, related_name='nome_fgts')

    banco_depositario = models.CharField(max_length=255)
    data_opcao = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.nomefunc

    class Meta:
        verbose_name_plural = "09. FGTS"



class PIS(models.Model):

    n_registrofun = models.OneToOneField(Funcionario, on_delete=models.CASCADE, related_name='registro_pis', primary_key=True)
    nomefunc = models.ForeignKey(Funcionario, on_delete=models.CASCADE, related_name='nome_pis')

    numero = models.CharField(max_length=20, blank=True)
    cadatrado = models.DateField(null=True, blank=True)

    nome_banco = models.CharField(max_length=255, blank=True)
    endereco_banco = models.CharField(max_length=255, blank=True)
    numero_banco = models.CharField(max_length=10, blank=True)
    agencia = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.nomefunc

    class Meta:
        verbose_name_plural = "10. PIS"



class Recisao(models.Model):

    n_registrofun = models.OneToOneField(Funcionario, on_delete=models.CASCADE, related_name='registro_rec', primary_key=True)
    nomefunc = models.ForeignKey(Funcionario, on_delete=models.CASCADE, related_name='nome_rec')

    numero_homologacao = models.CharField(max_length=100, blank=True)
    data_saida = models.DateField(blank=True, null=True)
    tipo_desligamento = models.CharField(max_length=100, blank=True)
    local_homologacao = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.nomefunc

    class Meta:
        verbose_name_plural = "11. Recisão"

