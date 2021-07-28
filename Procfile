release: python3 manage.py migrate
web: gunicorn backend.wsgi -b :8000 --log-file -
