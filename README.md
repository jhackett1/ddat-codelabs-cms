DDaT Codelabs
=============

This is a Node/Express application that makes coding lessons (written tutorials, code samples and media) available to learners. It's backed by a PostgreSQL database.

Installation
------------

Clone this repository and run `npm install` to get dependencies.

Then, making sure that your database connection string is set to the environment variable `DB_URI`, create the database tables using `node_modules/.bin/sequelize db:migrate`.

You can then run the app using `npm start`. It will be on port 4000 by default.
