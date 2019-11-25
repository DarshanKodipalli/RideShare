[//]: # (!!! Open README.html for rendered page !!!)

# RideShare

* A web application to manage taxi ridesharing using Java Servlets, Python, AngularJS and Machine Learning.
* The application has 3 user roles: *Rider/Customer*, *Driver*, *Admin*.
* Riders/Customers can book individual or shared taxi rides, cancel rides & rate drivers.
* Drivers can cancel rides & rate riders.
* Riders can view data like day-wise booking and cancellation, rides taken from zip codes, rating etc. on their dashboard.
* Drivers can view data like day-wise number of rides, day-wise earnings, zipcode-wise pickups & drops, rating etc. on their dashboard.

-----

### Total Lines of Code

- Lines of code for AngularJS UI              : **2,972**
- Lines of code for Java backend              : **2,290**
- Lines of code for Fare Estimate ML Modeling : **331**
- Lines of code for Python Fare API           : **82**

**Total Lines of Code = *5,675***

-----

### Technologies used in the application

***Topics from Assignments:***

- Java Servlets
- HTML & CSS
- MySQL Database
- MySQL CRUD Operations
- Application User Roles (Rider/Driver/Admin)
- Data Analytics & Visualizations
- Python
- Jupyter Notebooks
- JavaScript

***Others:***

- [Google Maps, Places & Distance Matrix APIs](https://developers.google.com/maps/documentation)
- [REST API](https://restfulapi.net/)
- [AngularJS](https://angular.io/) & [TypeScript](https://www.typescriptlang.org/)
- [Dask](https://dask.org/) for handling large amount of data (100 million records which don't fit in memory) and extraction useful data from the said data.
- [Numpy](https://numpy.org/), [Scipy](https://www.scipy.org/) & [Pandas](https://pandas.pydata.org/) for Data - Cleaning & Analysis.
- [scikit-learn](https://scikit-learn.org/stable/) for Machine Learning Model - Selection, Creation & Evaluation.
- [RandomForestRegression](https://medium.com/datadriveninvestor/random-forest-regression-9871bc9a25eb) - machine learning algorithm to estimate fare for a ride based on the distance, duration (from google distance matrix api) & number of perople sharing the ride.

-----

### Dataset used for the application

The Chicago City Data Portal's **[Transportation Network Providers - Trips](https://data.cityofchicago.org/Transportation/Transportation-Network-Providers-Trips/m6dm-c72p)** dataset has been used for this application. The dataset contains ***100,717,116*** records of ridesharing trips, starting November 2018, reported by Transportation Network Providers (sometimes called rideshare companies) to the City of Chicago as part of routine reporting required by ordinance. It contains trip start & end times, trip miles, trip total, pickup areas and many more informations for each trip.

From this dataset, we took 1 million records with only [Trip Miles, Trip Total, Shared Trip Authorized, Trips Pooled] columns using random sampling. This was done as the 100 million records did not fit into memory and the random sampling feature of pandas gives a very good sub sample of a dataset with same mean, variance & standard deviation.

-----

### Requirements

- [Java >= 11.0.4](https://aws.amazon.com/corretto/)
- [Python >= 3.7.5](https://docs.conda.io/en/latest/miniconda.html)
- [Tomcat Server 7.0.34](http://www.coreservlets.com/Apache-Tomcat-Tutorial/tomcat7-files/tomcat-7.0.34-preconfigured.zip) (with CORS filter enabled)
- [Node.js >= 12.12.0](https://nodejs.org/en/)
- [MySQL >= 8.0.18](https://dev.mysql.com/downloads/)
- Java Dependencies: **`servlet-api.jar`, `mysql-jdbc-5-bin.jar`, `gson-2.6.2.jar`** (Already present in **[lib](server/rideshare/WEB-INF/lib/)**)
- Python Dependencies: **`pandas`, `scikit-learn`, `joblib`, `flask`, `flask-cors`** (See **[requirements.txt](fare_estimation/requirements.txt)**)
- JavaScript Dependencies: See **[package.json](ui/package.json)**

-----

### Deploying the application

#### 1. Create MySQL Database User, Schema and Populate Data

Assuming that MySQL is installed and the server is running...

- Create the RideShare MySQL User. (Login to mysql shell as root `$ mysql -u root -p`)

    ```sql
    mysql> CREATE USER 'rideshareAdmin'@'localhost' IDENTIFIED BY 'rd@123';
    mysql> GRANT ALL PRIVILEGES ON * . * TO 'rideshareAdmin'@'localhost';
    mysql> FLUSH PRIVILEGES;
    ```
- Import the database schema and data from the dump file. (Database dump file: [rideshare_db_dump.sql](server/rideshare_db_dump.sql))

    ```bash
    $ mysql -u rideshareAdmin -prd@123 < server/rideshare_db_dump.sql
    ```

*(Make sure the mysql `bin` folder is in PATH)*

#### 2. Enable [Cross-Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) (CORS) in Tomcat Server

Cross-Origin Resource Sharing (CORS) is a mechanism that uses additional HTTP headers to tell browsers to give a web application running at one origin, access to selected resources from a different origin. A web application executes a cross-origin HTTP request when it requests a resource that has a different origin (domain, protocol, or port) from its own.

Reference: https://tomcat.apache.org/tomcat-7.0-doc/config/filter.html#CORS_Filter

* Copy the JAR files in **`tomcat_cors_filters` (see [tomcat_cors_filters.zip](tomcat_cors_filters.zip))** to the **`lib`** folder in tomcat directory.

    ```bash
    $ unzip tomcat_cors_filter.zip
    $ cp tomcat_cors_filter/*.jar <path_to_tomcat_server_folder>/lib/
    ```

* Open the **`web.xml`** config file located in the **`conf`** folder in tomcat server directory & add the following lines inside **`<web-app>`** tag:

    ```xml
    <filter>
        <filter-name>CorsFilter</filter-name>
        <filter-class>org.apache.catalina.filters.CorsFilter</filter-class>
    </filter>
    <filter-mapping>
        <filter-name>CorsFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
    ```

#### 3. Install Python and dependency packages

2 Ways:

1. Virtual environment with python and package creation using conda.
2. Standalone python installation and package installation using pip.

***Create Virtual Environmnet with python3 and required packages***

Environment File: [rideshare.yml](rideshare.yml)

Assuming that [Miniconda/Anaconda](https://docs.conda.io/en/latest/miniconda.html) (python-3) is installed and working as expected:

```bash
# Load conda base environment first
$ source <miniconda-installation-path>/bin/activate

# Create the virtual environment using the environment YAML file
(base) $ conda env create -f rideshare.yml

# Activate the new environmnet
(base) $ conda activate rideshare

(rideshare) $
```

***-or-***

***Standalone python installation and package installation using pip.***

Assuming that python 3 has been installed:

Requirements File: [requirements.txt](fare_estimation/requirements.txt)

```bash
$ python --version
Python 3.6.8

$ python -m pip install -U -r fare_estimation/requirements.txt
```

#### 4. Install Node.js and javascript packages

Install **Node.js** (https://nodejs.org/en/)

Then, assuming that you are currently inside the folder **`ui`** in RideShare and nodejs and npm are added to PATH:

```bash
# Install the javascript packages using npm
$ npm install
```

#### 5. Copy the Java Server Code & required dependency JAR files to Tomcat

Server Source Code Folder: **[rideshare](server/)**

Dependency JAR Files: **[lib](server/rideshare/WEB-INF/lib/)**

Assuming you are currently in the **`RideShare`** folder

```bash
$ cp -rf server/rideshare <path_to_tomcat_server_folder>/webapps
$ cp -f server/rideshare/lib/* <path_to_tomcat_server_folder>/lib
```

#### 6. Start python server

Assuming you are currently in the **`RideShare`** folder

*If using conda: assuming rideshare enviroment is created as per step 3* & ***`base`*** conda environment is activated*

```bash
(base) $ conda activate rideshare
(rideshare) $ python fare_estimation/estimate_fare_api.py
```

***-or-***

*If using system python: assuming required packages have been installed as per step 3*

```bash
$ python fare_estimation/estimate_fare_api.py
```

*(Runs on port=5000. If port=5000 is not open/being used, then give a custom port using `python fare_estimation/estimate_fare_api.py 5555`)*

#### 7. Start the Tomcat server

```bash
$ <path_to_tomcat_server_folder>/bin/catalina.sh run
```

#### 8. Start node.js/angular server for UI

Assuming you are currently in the **`RideShare/ui`** folder and step 4 is done.

```bash
$ npm start
```

-----

### The application is now live and can be accessed @ http://localhost:4200/

-----

### Use of Machine Learning in the application:

#### Machine Learning has been used to predict/estimate the fare for a given trip based on: trip distance in miles (given by google distance matrix api), trip duration in seconds (iven by google distance matrix api), is the ride shared or individual (true/false) and number of riders in the trip (will be 1 in case of an individual ride).

#### The machine learning model creation and evaluation notebooks are located [here](fare_modeling/).

#### The machine learning algorithm used is *`RandomForestRegressor` implemented from scikit-learn.*

-----

### Contributors :: Team 4

#### 👨‍💻 Darshan Kodipalli

##### 📧 [dkodipalli@hawk.iit.edu](mailto:dkodipalli@hawk.iit.edu) ◆ [darshan.kodipalli@gmail.com](mailto:darshan.kodipalli@gmail.com)

#### 👨‍💻 Maneesh Divana

##### 📧 [mdivana@hawk.iit.edu](mailto:mdivana@hawk.iit.edu) ◆ [maneeshd77@gmail.com](mailto:maneeshd77@gmail.com)

-----