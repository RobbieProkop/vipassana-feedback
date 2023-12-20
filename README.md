# App to collect server feedback post Vipassana course

## Built by Robbie Prokop, donated to the Alberta Vipassana Foundation

Building the first version using a backend Node Express server, with a PostgreSQL database. To get the initial deployed database setup, connect to the deployed database using the environment variables, and then run the schema.sql file in /backend/config/schema.sql

# Set-Up Guide

1. Clone the repo
2. cd to the root directory
3. create a docker-compose.yaml file, based on the docker compose template
4. add the environtment variables to the docker compose file
5. build the docker images with ```docker compose build```
6. run the docker compose file with ```docker compose up```
7. access psql from the container running postgres 
```docker exec -it vipassana_feedback_db psql -U postgres -d vipassanaFeedback```
8. add an admin user from psql
9. navigate to localhost:5173 to visit the frontend of the webapp
