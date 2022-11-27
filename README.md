# TO-MY.SPACE

# Express and React Social Media Project

This is a project building a social media platform using React to build frontend or client-side, Express to handle the server-side and MongoDB & Mongoose to store the database.

## Demo Website

- to-my.space : [https://to-my.space](https://to-my.space)

## Run Locally

### 1. Clone repo

```
$ git clone git@github.com:mfadlika/Express-React-Socmed_TMS.git
$ cd Express-React-Socmed_TMS
```

### 2. Create .env File

- create .env file in root folder

```
$ touch .env
```

### 3. Setup MongoDB

- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)
  - In .env file update MONGODB_URI=mongodb://localhost/amazona
- OR Atlas Cloud MongoDB
  - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
  - In .env file update MONGODB_URI='mongodb+srv://your-db-connection'

### 4. Run Backend

- Set up port
  - In .env file update PORT=5050
- Set up jsonwebtoken
  - In .env file update JWT_SECRET='SOMETHINGSECRET'

```
$ npm install
$ npm start
```

### 5. Run Frontend

```
# open new terminal
$ cd ui-frontend
$ npm install
$ npm start
```

## Beta Version

### Features

- User can register an account to to-my.space
- User can follow other accounts
- User can post a post
- User can see posts from account they follow
