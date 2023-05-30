# presol

This app is made to import, gather and search for information from HSL citybikes csv files. 

Project is based on Node.js backend with Express framework using REST. Frontend is React with material UI. Typescript is main programming language. Database is SQLite due to its easy setup for testing environment. SQLite comes with some drawbacks, such as insertMany method missing, making file size a thing and therefore the imported csv are restricted to 20 000 first lines. Prisma ORM is used.


To run the app, copy the code and open it or clone the repo into Visual Studio Code. Open new terminal and run command "npm install" for client and the server folders individually to install the node packages. Add .env file with "PORT='3100'" variable on the index.ts folder level. The database should be running automatically, but if needed, schema can be set up by command "npx prisma db push" & "npx prisma db generate". The status of the DB can be checked from gui opened by command "npx prisma studio". Database table can be erased by command "npx ts-node deleteDb.ts". Start the server by command "npm start" and then go to client directory and run the same command to start the client. The db is empty by default, so it needs to be populated with csv files with right structure. The code does not have a production build. 

 -- installed dependencies for node, typescript, cors, prisma orm, dotenv, express
                  dev-dependencies for nodemon, ts-node, @types/ node & cors, 
                  create-react-app client & material ui 

 -- installed react router, busboy&types, node-csv, 

 -- frontend ui

 -- backend and routes

 -- database with backend

 -- time issues, need to drop out making another db table, one ui page, the tests and fault handling are not finished

 -- tested the app

links to csv files  : https://dev.hsl.fi/citybikes/od-trips-2021/2021-07.csv 
                    : https://dev.hsl.fi/citybikes/od-trips-2021/2021-06.csv
                    : https://dev.hsl.fi/citybikes/od-trips-2021/2021-05.csv

