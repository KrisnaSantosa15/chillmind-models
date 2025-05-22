# Journaling Model

## Docker installation

```bash
docker build -t journaling-model-app .

docker run -p 80:80 -e PORT=80 journaling-model-app
```

## Heroku deployment

Install [heroku-cli](https://devcenter.heroku.com/articles/heroku-cli#install-the-heroku-cli) first.

```bash
git init

git add .

git commit -m "first commit"
```

```bash
heroku login

heroku create journaling-model-app-v1

heroku git:remote journaling-model-app-v1

heroku stack:set container

git push heroku master
```
