# Leighton Asia Technical Assessment
by: Gabriel Agoncillo

Packages used:

![npm version](https://img.shields.io/badge/nodejs-v16.13.2-green)

![yarn version](https://img.shields.io/badge/yarn-v1.22.19-blue)

![yarn version](https://img.shields.io/badge/PostgreSQL-v15.4-red)

I preferred yarn as the scripts declared in package.json of the projects are yarn command

Clone this repo and follow the steps to setup the application.

## Database Setup
1. Download PostgreSQL through this [link](https://www.postgresql.org/download/). Choose the installer that your operating system supports. For this project, I've downloaded version 15.4 but any will do. You may also follow this [guide](https://www.tutorialsteacher.com/postgresql/install-postgresql)
2. AFter downloading, create your connection through SQL Shell or pgAdmin 4. (Much preferred through SQL shell)
3. Create your own credentials for your PostgreSQL connection. You may follow this [guide](https://www.tutorialsteacher.com/postgresql/connect-to-postgresql-database).
4. After creating your credentials and connection, run this SQL query to create the database for the application.

```MySQL
CREATE TABLE IF NOT EXIST duties (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  createdat TIMESTAMP(3) NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  updatedat TIMESTAMP(3) NULL
);
```
5. Double check also in pgAdmin4 if the table is created successfully. You may follow this [guide](https://www.tutorialsteacher.com/postgresql/create-database)


## Server setup

1. Go inside the root of the **server** folder.
2. IMPORTANT: Create a **.env** file inside the server folder with this format
```.env
DB_HOST= <The PostgreSQL hostname you've created>
DB_NAME= <The PostgreSQL database name you've created>
DB_USERNAME= <The username you've used in creating your PostgreSQL connection>
DB_PASSWORD= <The password you've used in creating your PostgreSQL connection>
CLIENT_BASE_URL= http://localhost:3000
NODE_ENV = production
```
Input the credentials you've created for PostgreSQL connection inside the .env file. Set the ```NODE_ENV``` to ```production``` so the server will know that it will run in production mode.


2. Open terminal and type ```yarn install```.
3. Once the command script runs, it will trigger the unit testing, compiling of ts files, and running the server application. NOTE: It may take a while.
4. Once this message appears in the command line. It means the server is now running properly
```
process.env: dev
App running in port 5000
```

## Client setup

1. Go inside the root of the **client** folder.
2. Open terminal and type ```yarn install```.
3. Once the command script runs, it will trigger the unit testing, building of the react application, and serving the build application. NOTE: It may take a while.
4. Once done. Open ```http://localhost:3000``` in the browser and the react app will appear.

## Development setup
- For server development. Go inside the **server** folder, run to the terminal ```yarn install & yarn run dev``` to start development server
- For client development. Go inside the **client** folder and run to the terminal ```yarn install &  yarn run start``` and open ```http://localhost:3000``` in the browser to start the reactjs development
