## Steps to run the project

1- clone the project using this github [link](https://github.com/sachin-me/e_com_backend)

2- run `npm install` command to install the required packages.

3- add `.env` file to root of the project
  - It contains 3 fields
  - MONGO_URI (To create database connection)
  - PORT (App will run on given port)
  - SECRET (To autheticate user via jwt token)

4- run `npm start` to run the project.

***
App will run on http://localhost:9000*

* App will run on provided PORT only
* Check postman collection for API listing.
  - https://elements.getpostman.com/redirect?entityId=6337410-f05d5dc1-67ec-4df7-8a6a-40923f3c84e2&entityType=collection
  - To run the APIs
    - import above link in postman
    - add url and Accesstoken environment variable 
    - send Accesstoken in headers
<br>
