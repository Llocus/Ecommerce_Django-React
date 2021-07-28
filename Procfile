release: python3 manage.py migrate
web: gunicorn backend.wsgi -b :6367 --log-file -
