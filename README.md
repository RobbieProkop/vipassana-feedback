# App to collect server feedback post Vipassana course

## Built by Robbie Prokop, donated to the Alberta Vipassana Foundation

Building the first version using a backend Node Express server, with a PostgreSQL database. To get the initial deployed database setup, connect to the deployed database using the environment variables, and then run the schema.sql file in /backend/config/schema.sql

The second version of the app with be made using AWS SES, with a lambda function to format and send an email with the form submission.

The third version of the app if I decide to build it, will be made using the google sheets api. The form submissions will be added as rows to a google sheet form. DSO committee members will have read only access to the form.
