# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /code

# Copy the requirements file into the container at /code
COPY ./requirements.txt /code/requirements.txt

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Copy the ./app directory from your local machine to /code/app in the container
COPY ./ /code/app
COPY ./emotion_model.h5 /code/app/

# Make port 80 available to the world outside this container
# Heroku will use this port and map it to 80/443 externally
EXPOSE 80

# Command to run the application using Uvicorn
# Heroku dynamically assigns the port via the PORT environment variable.
# Uvicorn needs to listen on 0.0.0.0 to be accessible.
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port $PORT"]