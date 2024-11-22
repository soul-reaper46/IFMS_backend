
# Investment Fund Management System - Backend

The motivation to build this system comes from the limitations of traditional methods, which
heavily rely on manual processes/work, spreadsheets to track investments, and paper
records, which lead to inefficiencies, a higher risk of errors, and are also time-consuming. As
investment portfolios become more complex and global, involving investment types like
mutual funds, hedge funds, bonds, and so forth, building an investment fund management
system offers a more efficient and accurate way to manage financial assets and improve
decision-making. User can leverage this system to create, update and delete their investment
data which can help them better manage their investment strategy. This reduces a lot of time
for them as they have a centralized source of data to refer if they ever need to go back and
trace their history to make a better decision either now or in future.
## Authors

- [@SujaySN](https://github.com/soul-reaper46)
- [@Deepansh Chaturvedi](https://github.com/DeepanshChaturvedi)
- [@Neha Ganeshe](https://github.com/SachinShet73)
- [@Anagha](https://github.com/anaghagodbole)
- [@Sanskruti Mahajan](https://github.com/Msanskruti)

## Documentation

[Initial Project File,](https://github.com/neha-ganeshe4/DMDD_Project/blob/main/DMDD%20Project%20Topic%20and%20Objectives.pdf)
[Design Document,](https://github.com/neha-ganeshe4/DMDD_Project/blob/main/DMDD%20P2.pdf)
[Logical ERD](https://github.com/neha-ganeshe4/DMDD_Project/blob/main/P3.pdf)



## License

[MIT](https://choosealicense.com/licenses/mit/)


## Project Structure

Below is the basic file structure of the project 

```bash
BACKEND/
├── node_modules/           
├── src/                   
│   ├── config/           
│   │   └── db.js              # Database configuration
│   │
│   ├── controllers/      
│   │   ├── authController.js  # Authentication related controllers
│   │   └── userController.js  # User management controllers
│   │
│   ├── models/          
│   │   └── user.js            # User model schema
│   │
│   ├── routes/          
│   │   ├── authRoutes.js      # Authentication routes
│   │   ├── index.js           # Main router aggregator
│   │   └── user.js            # User-related routes
│   │
│   ├── app.js           # Express app configuration
│   └── server.js        # Server startup configuration
│
├── .env                  # Environment variables
├── .gitignore           
├── package-lock.json    
└── package.json         
```
    
## Tech Stack

**Application:** NodeJS, Express, MSSQL


## Run Locally

Create Main Folder "IFMS_Project"

Clone the project

```bash
  git clone https://github.com/soul-reaper46/IFMS_backend.git
```

Go to the project directory

```bash
  cd IFMS_backend
```

Install dependencies (Ensure Node.js is installed in System)

```bash
  npm install
```

Start the server

```bash
  node .src/server.js
```

To Access:

* Open Postman and use URL [http://localhost:4000/api/](http://localhost:4000/api/) to access APIs.


* Make Sure Database is running first. You need to create a .env folder in root folder to store Database credentials.


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DB_USER` (database user name, ensure user has permission to read/write)

`DB_PASSWORD` (database user password)

`DB_SERVER` (Server name)

`DB_NAME`(Database name - "FundManagement")

`PORT` (Port number for server to listen - 4000)

`JWT_SECRET` (any string/key to create jwt token)


## API Reference

#### For login

```http
  POST http://localhost:4000/api/auth/login
```

* accepts email and password values in body 

#### For SignUp

```http
  POST http://localhost:4000/api/auth/signup
```

* accepts "name","email","newpassword","phone","dob","riskprofile" in body (key-value pair).

#### To edit user

```http
  PUT http://localhost:4000/api/user/update-user-details
```
* accepts "name","email","phone","dob","riskprofile" in body (key-value pair).

#### To get user details

```http
  POST http://localhost:4000/api/user/get-user-details
```

* accepts email in body (key-value pair).

#### To get other table data
```http
  GET http://localhost:4000/api/user/allocation-strategy
  GET http://localhost:4000/api/user/watchlist
  GET http://localhost:4000/api/user/assets
  GET http://localhost:4000/api/user/funds
  GET http://localhost:4000/api/user/portfolio
```

#### To delete from Risk Assesment

```http
  DELETE http://localhost:4000/api/user/riskassessment/30
```

Please go through routes in route folder for additional apis.