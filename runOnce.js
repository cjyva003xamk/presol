. Accessing the MySQL CLI (command-line interface). Once MySQL is installed on the machine, we can access its terminal by entering the below command. It will prompt you for a password and you will gain access to the database upon successful authentication.mysql -u my_user_name -p

2. Creating a table in the database. To store the data, we first need to create a table in the database that corresponds to the data in the csv file. This step requires a bit more attention as the order of the columns in the table should exactly match the order in the csv. This needs to be performed as when creating a table, we specify the type of data that should be stored in the columns. Incorrect table creation will lead to failure in importing the csv through the MySQL command line.

use new_schema;
 
CREATE TABLE employee_details (
id INTEGER,
employee_name VARCHAR(100),
employee_age INTEGER,
PRIMARY KEY (id)
);

3. Importing the CSV file into a table. Once the table has been created, we can import table with the contents of the csv files. We can either mention the file path or store the file in the default directory of the MySQL server.

LOAD DATA INFILE 'Path to the exported csv file'
INTO TABLE employee_details
FIELDS TERMINATED BY ','
IGNORE 1 ROWS;

Upon the completion of these steps, the data will be successfully imported into the table. To check the sample contents of the table, we can use the below query. Remember to use the LIMIT keyword as it will only show a limited number of records and would not impact the system if the table is very huge.

SELECT *
FROM employee_details
LIMIT 10;