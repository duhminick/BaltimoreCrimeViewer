FROM python:3.7.4-alpine3.10
WORKDIR /app

# Install requirements
COPY requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . /app
CMD ["python3", "app.py"]