from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuario #Cargo, Funcionario, Departamentos
from django.contrib.auth.forms import UserChangeForm

class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = Usuario

class UsuarioAdmin(UserAdmin):
    form = CustomUserChangeForm
    list_display = ('username', 'email', 'first_name', 'last_name', 'tipo_usuario', 'is_active')
    list_filter = ('tipo_usuario', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Informações Pessoais', {'fields': ('first_name', 'last_name', 'email', 'telefone')}),
        ('Permissões', {
            'fields': ('tipo_usuario', 'is_active', 'is_staff', 'is_superuser', 
                      'groups', 'user_permissions'),
        }),
        ('Datas Importantes', {'fields': ('last_login', 'date_joined')}),
    )

admin.site.register(Usuario, UsuarioAdmin)