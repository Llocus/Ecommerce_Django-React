release: python3 manage.py migrate
web gunicorn backend.wsgi -b 127.0.0.1:8000 --log-file -
