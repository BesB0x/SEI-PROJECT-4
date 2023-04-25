![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)

# Deployment of Django app on Heroku

## 1. Create an account with Heroku

We will use Heroku to deploy both our Django and Node applications. If you have already set up a Heroku account with a previous project you can skip this step.

- Sign up for an account [Heroku | Sign up](https://signup.heroku.com/)

- Add a payment method to your account, we will use a free database tier in this guide which will not charge you, you need a fair amount of traffic before any costs will be incurred.

- Install the Heroku Command Line Tools with Homebrew `brew tap heroku/brew && brew install heroku`
<br><br>

## Preparing a Django App for Deployment.


#### Make sure your main/master branch is checked out in your terminal and up to date. Heroku always used the main/master despite whether you run all the below from development or a feature branch

The aim of this guide is to prepare the app for deployment to Heroku, to do this we need to run (frontend and backend) from the same port (the backend one). As it stands we run them separately, this is great for development, it allows us access to lots of benefits like hot reloading and being able to test changes quickly, but this is not that state it will be deployed in.

### Frontend

* Make sure your files/folders are correctly cased within your app, folders are lowered cased eg `components` . Check that all import statements have the correct casing, this will cause errors in deployment if they are not matching.

* Make sure all urls in requests end in a trailing `/` regardless of verb. So a GET request should be for example `axios.get('/api/cheeses/)` the trailing slash at the end of `cheeses/` will be required.

* Go to the file `client/.gitignore` and replace it with the following

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

* Making sure you are inside `client` in the terminal, run the following
* *If you used npm* `npm run build`
* *If you used yarn*  `yarn build`


### Backend

* Navigate to `project/settings.py`

* To the top of the file, add the following

* `import os`

* Find the key `TEMPLATES` in this file and completely replace what is currently there with the following:

```python
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'client')
                 ]  #Look, we have added the root folder of frontend here
        ,
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```


* Still in  `project/settings.py`  add the following to the bottom of the file

* Check the below settings are in the `settings.py` file, if not add them:

```python
ROOT_URLCONF = 'project.urls' #check if you have this already, if not add it in

STATIC_URL = 'static/' # same with this
```

* Then at the bottom of your file add the below:

```python
STATICFILES_DIRS = (
    os.path.join(BASE_DIR, 'client', "build", "static"),
)
```

* Create a file inside the project directory called  `views.py`.

* To the new `project/views.py` file add the following:

```python
from django.shortcuts import render

def index(request):
    return render(request, 'build/index.html')
```

* Update the `project/urls.py` to add the following:

```python
from django.contrib import admin
from django.urls import path, include, re_path # <-- added this new import re_path
from .views import index # <-- also new

urlpatterns = [
    #...your other views,
    re_path(r'^.*$', index) # <-- have this come last using re path.
]

```

* Run the command to run the server `python manage.py runserver`  navigate to `localhost:8000` you should see your frontend working there. Test everything is working at this point before moving on.<br><br>

## Deploying a Django/React App to Heroku
* Ensure you have followed and tested Preparing a Django App for Deployment, and created an account with Heroku before following these steps.
* Your project should be have git initialized at this point also, *if you have not*, run `git init`

### Set Up Heroku App

Run the following commands from the project root

* `heroku login`  - This will log you into the Heroku command line tools

* `heroku create --region=eu project-name` - replace project name with a name of your choosing, Heroku will let you know if it is currently available (custom domains can be configured later from the Heroku dashboard)

* `heroku buildpacks:add heroku/python` - This tell Heroku we will be using Python


### Environment Variables

- Heroku doesn't have your .env file so we need to create environment variables so it can create one for us. We'll do this now. Heroku takes specific names for things, so your config variables should be named in all caps in the way we do it below. This is a vital step. Remember the casing needs to match that in your .env file. For example, the below shows us take a SECRET variable in the .env file, and adding it to Heroku:

- **SECRET variable**: `heroku config:set SECRET_KEY='your secret goes here'`

- You can check all of your set environment variables by running the command `heroku config` and should get an output that looks something like this:

### Configure Django For Heroku

* In the root of your project, create a new file called “Procfile” `touch Procfile`

* Add the following code to that file

```
web: python manage.py runserver 0.0.0.0:$PORT --noreload
```


* From the root `pipenv install django-on-heroku` - install the Django-Heroku package.


* Add the following to `project/settings.py`
```python

import django_on_heroku # put this at the top of the file

# all the rest of the settings file...

django_on_heroku.settings(locals()) # put this last

```


* *If you worked in a team*, add, commit and checkout to the master branch `gco master` and merge all code into it from development `git merge development`

* Add and commit your code from the root `git add . && git commit -m"ready to deploy"`

* `git push heroku main` - Push your application to Heroku to be deployed.

* If you get an application error when navigating to the site, in the root run `heroku logs --tail`

* If the deployment was successful (you can see the site, but things may not be working)  you need to run the migrations, and any seeds eg:
```
heroku run python manage.py migrate
heroku run python manage.py loaddata books/seeds.json
```