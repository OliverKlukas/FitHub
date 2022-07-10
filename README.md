# SEBA Master 2022 - Team FitHub
![FitHub Logo](./frontend/src/resources/logo_standard.svg)

# Our mission
FitHub is the platform where fitness content creators sell their training and nutrition plans to fitness enthusiasts and health-conscious consumers. We want to help fitness content creators reaching a larger audience than on social media, while also providing a trustworthy and simple-to-use solution for fitness enthusiasts to find training plans, fitness plans or coachings suited for their preferences.

# Technical documentation
Please install all prerequisites and always run frontend and backend simultaneously.

## Prerequisites
- Node: v16.x
- React: v18.x
- MongoDB: v4.x

## Run commands frontend
```shell
    # Run frontend on localhost:3000
    cd frontend
    npm install
    npm start
 ```

## Run commands backend
In two separate terminals please run:
```shell
    # MongoDB database
    mongod --dbpath "path/to/database"
```
```shell
    # Run backend on localhost:4000
    cd backend
    node index.js
```

## Project structure
```shell
.
├── backend
│   ├── index.js
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   └── src
│       ├── api.js                                    # express backend server
│       ├── config.js                                 # server configuration
│       ├── controllers                               # data controllers
│       ├── middleware.js                             # JWT authentication
│       ├── models                                    # data models
│       └── routes                                    # data routes
├── frontend
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   └── src
│       ├── App.js                                    # main react file incl. routing
│       ├── components                                # stand-alone react components
│       ├── index.css
│       ├── index.js
│       ├── redux                                     # redux reducers and actions
│       ├── resources                                 # static resources (e.g. SVGs)
│       ├── services                                  # backend connection services
│       ├── utils                                     # theme and small functions
│       ├── views                                     # main views of frontend
├── README.md
└── sample_content
```

# Team
| ![Max](./frontend/src/resources/Maximilian.jpeg) | ![Simon](./frontend/src/resources/Simon_Vogl.jpg) | ![Johannes](./frontend/src/resources/Johannes.jpg) | ![Oliver](./frontend/src/resources/Oliver.jpg) |
|-------------------------------------------------|---------------------------------------------------|----------------------------------------------------|------------------------------------------------| 
| Maximilian Schumergruber (@00000000014AAA89)    | Simon Vogl (@00000000014AE5CA)                    | Johannes Loebbecke (@loebbeckeJohannes)            | Oliver Klukas (@ga87daw)                       | 

# Disclaimer
This project is officially finished as of 28th of July 2022 and will not be updated or maintained. It is not an actual Platform but rather just a fully functional proof of concept. All code is the shared intellectual property of the four aforementioned Team members. The Application is not licensed and any transactions done using the PayPal Payment System will be sent to a developer account and refunded. The Content and Content Creators are mocked.
