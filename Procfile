release: python3 manage.py migrate
web: cd frontend/ && npm start
worker: gunicorn backend.wsgi -b 127.0.0.1:8000
