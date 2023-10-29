# Leighton Asia Technical Assessment
by: Gabriel Agoncillo


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
