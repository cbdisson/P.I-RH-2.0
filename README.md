# 🧾 P.I RH 2.0

Projeto completo de um sistema de Recursos Humanos com **cadastro, listagem, edição e exclusão de funcionários**, desenvolvido para fins acadêmicos.

Este repositório contém tanto o frontend (React + Vite) quanto o backend (Django REST Framework), com autenticação via JWT e banco de dados PostgreSQL.

---

## 🚀 Tecnologias Utilizadas

### 🔧 Backend (Django)
- Python 3.10+
- Django 4+
- MySQL


---

## 📋 Funcionalidades

- Login com autenticação
- Listagem de dados
- Cadastro de novos dados
- Edição de dados
- Remoção de dados
- Campos diversos


---

## ⚙️ Como rodar o projeto localmente


```bash
# 1. Navegue até a pasta do projeto
cd "nome projeto"/

# 2. Crie e ative o ambiente virtual
python -m venv venv
venv\Scripts\activate  # (Windows)
# source venv/bin/activate  # (Linux/Mac)

# 3. Instale as django
pip install django

# 4. Configure o banco de dados no settings.py

# 5. Rode as migrações
python manage.py migrate

# 6. Crie um superusuário (para acessar o admin)
python manage.py createsuperuser

# 7. Rode o servidor
python manage.py runserver
```


> O Django roda em `http://localhost:8000`

---


## 👨‍💻 Autor

| Nome       | GitHub                          |
|------------|----------------------------------|
| cbdisson   | [@cbdisson](https://github.com/cbdisson) |
| Gallego991 | [@Gallego991](https://github.com/Gallego991)                                   |


---

## 📝 Observações

Este projeto foi desenvolvido para fins acadêmicos. Todos os arquivos do projeto estão disponíveis, incluindo configurações locais, por se tratar de um trabalho de escola.