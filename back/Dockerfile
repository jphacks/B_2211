FROM python:3
USER root

COPY requirements.txt .
RUN apt-get update && apt-get install -y curl
RUN pip install -r requirements.txt
COPY . .

EXPOSE 8000
CMD ["uvicorn", "get_grass_API:app", "--host", "0.0.0.0", "--port", "8000"]

