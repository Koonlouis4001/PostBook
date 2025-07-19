this is just my practice project to create my own version of facebook-like web application using react,nest js,PostgresSQL and docker to help me more proficient in using these technology more.

React for front-end,
Nest Js for back-end,
PostgreSQL for storing data and query,
Docker for containerize both my back-end application and PostgresSQL

Current Features
    User Authentication
    -   Login using username and password. (password are hash using bcrypt)
    -   Authentication via JWT (Access Token & Refresh Token) using JWTService in NestJS
    -   Limited password in 8 - 72 bytes due to bcrypt limitation
    User & Profile
    -   Each user is linked to a unique profile
    -   Users can view their profile page with personalized data
    -   Users can view other users' profiles by clicking on their profile
    Post System
    -   Users can create, update and delete their own posts
    -   All users can read posts from everyone in the application

Incomplete Features
    Profile System
    -   Users can add their profile picture during registration (Currently available only via backend API)
    -   Users can update their own profile information in profile page (Currently available only via backend API)
    Post System
    -   Users can add, update and delete their comment under any post
    -   Add a like button for each post.
    -   Post should display total likes
