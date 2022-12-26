# TO-MY.SPACE

# Express and React Social Media Project

This is a project building a social media platform using React & Redux to build frontend or client-side, Node & Express to handle the server-side and MongoDB & Mongoose to store the database.

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

### 4. Setup Cloudinary

- Log in / Sign Up to Cloudinary
  - In Cloudinary account, find 'Configure your SDK' and 'Start Configuring'
  - In .env file update CLOUD_NAME, CLOUD_API_KEY and CLOUD_API_SECRET and fill it with cloud_name, api_key and api_secret respectively

### 5. Run Backend

- Set up port
  - In .env file update PORT=5050
- Set up jsonwebtoken
  - In .env file update JWT_SECRET='SOMETHINGSECRET'

```
$ npm install
$ npm start
```

### 6. Run Frontend

```
# open new terminal
$ cd ui-frontend
$ npm install
$ npm start
```

# Update

## Beta Version

### Version 0.6.X 23-Dec-22

- New Features
  - User can change profile picture
  - User can change profile name and bio
  - Big UI ImprovementS
  - Mobile Friendly
  - Fixed some bugs

### Version 0.3.3 7-Dec-22

- New Features
  - NOTIFICATION!!!
  - User can like and unlike posts
  - UI improvements
  - Fixed some bugs

### Version 0.1.X 30-Nov-22

- New Features
  - User can unfollow account they followed
  - User can delete their posts
  - Fixed some bugs

### Version 0.1.0 27-Nov-22

- Features
  - User can register an account to to-my.space
  - User can follow other accounts
  - User can post a post
  - User can see posts from account they follow
