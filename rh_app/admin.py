from django.contrib import admin
from .models import *

@admin.register(Funcionario)
class FuncionarioAdmin(admin.ModelAdmin):

    list_display = ('n_registro', 'nome', 'data_nascimento', 'telefone')
    list_filter = ('nome',)
    list_display_links = ('n_registro', 'nome')
    search_fields = ('n_registro', 'nome', 'telefone')




@admin.register(Empregador)
class EmpregadorAdmin(admin.ModelAdmin):

    list_display = ('n_registrofun', 'nome_emp', 'nomefunc', 'cnpj')
    list_filter = ('nome_emp', 'nomefunc', 'cnpj')
    list_display_links = ('nomefunc', 'nome_emp')
    search_fields = ('nomefunc', 'nome_emp', 'cnpj')



@admin.register(Residencia)
class ResidenciaAdmin(admin.ModelAdmin):

    list_display = ('nomefunc', 'endereco', 'cep')
    list_filter = ('nomefunc', 'endereco', 'cep')
    list_display_links = ('nomefunc',)
    search_fields = ('nomefunc', 'endereco', 'cep')



@admin.register(DocumentoFun)
class DocumentoFunAdmin(admin.ModelAdmin):

    list_display = ('nomefunc', 'rg', 'cpf', 'ctps', 'cnh')
    list_filter = ('nomefunc', 'rg', 'cpf')
    list_display_links = ('nomefunc',)
    search_fields = ('nomefunc', 'rg', 'cpf', 'ctps', 'cnh')



@admin.register(DocumentoEstrangeiro)
class DocumentoEstrangeiroAdmin(admin.ModelAdmin):

    list_display = ('nomefunc', 'rne', 'data_chegada', 'vencimento')
    list_filter = ('nomefunc', 'rne')
    list_display_links = ('nomefunc', 'rne')
    search_fields = ('nomefunc', 'rne')



@admin.register(Funcao)
class FucaoAdmin(admin.ModelAdmin):

    list_display = ('nomefunc', 'cargo', 'salario')
    list_filter = ('nomefunc', 'cargo', 'salario')
    list_display_links = ('nomefunc', 'cargo')
    search_fields = ('nomefunc', 'cargo', 'salario')



@admin.register(HorarioTrab)
class HorarioTrabAdmin(admin.ModelAdmin):

    list_display = ('nomefunc', 'dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab')
    list_filter = ('nomefunc',)
    list_display_links = ('nomefunc',)
    search_fields = ('nomefunc',)



@admin.register(Beneficiario)
class BeneficiarioAdmin(admin.ModelAdmin):

    list_display = ('nomefunc', 'nome_ben', 'parentesco')
    list_filter = ('nomefunc', 'nome_ben')
    list_display_links = ('nomefunc', 'nome_ben')
    search_fields = ('nomefunc', 'nome_ben')



@admin.register(FGTS)
class FGTSAdmin(admin.ModelAdmin):

    list_display = ('nomefunc', 'banco_depositario', 'data_opcao')
    list_filter = ('nomefunc', 'banco_depositario')
    list_display_links = ('nomefunc',)
    search_fields = ('nomefunc', 'banco_depositario')



@admin.register(PIS)
class PISAdmin(admin.ModelAdmin):

    list_display = ('nomefunc', 'numero', 'nome_banco')
    list_filter = ('nomefunc', 'numero', 'nome_banco')
    list_display_links = ('nomefunc', 'numero')
    search_fields = ('nomefunc', 'numero', 'nome_banco')



@admin.register(Recisao)
class RecisaoAdmin(admin.ModelAdmin):

    list_display = ('nomefunc', 'numero_homologacao', 'data_saida', 'tipo_desligamento')
    list_filter = ('nomefunc', 'numero_homologacao', 'data_saida', 'tipo_desligamento')
    list_display_links = ('nomefunc', 'numero_homologacao')
    search_fields = ('nomefunc', 'numero_homologacao', 'data_saida', 'tipo_desligamento')
