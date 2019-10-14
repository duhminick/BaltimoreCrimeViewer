# Baltimore Crime Viewer
Data visualization for crime in Baltimore

# Installation
## Requirements
* [Docker](https://www.docker.com/products/docker-desktop)
* [Docker Compose](https://docs.docker.com/compose/)

## Usage
* Run every service
    ```
    $ docker-compose up
    ```

* Run every service excluding one
    ```
    $ docker-compose up --scale <service>=0
    ```

* Run one service (avoid using this as things will not work correctly)
    ```
    $ docker-compose run <service>
    ```

# Containers
* Client
    * Front-end using React
* Database
    * PostgreSQL
* Cache
    * Redis
    * Currently used as an LRU cache
* Retriever
    * Periodically retrieves and normalizes data from OpenBaltimore
* MBLS
    * API