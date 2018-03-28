DDaT Codelabs
=============

This is a Node/Express application that makes coding lessons (written tutorials, code samples and media) available to learners. It's backed by a PostgreSQL database.

This app part of the [DDaT Codelab](mailto:ddatcodelabs@gmail.com) ecosystem. We're always looking for subject matter experts, content designers and user researchers to help us out.

Installation
------------

Clone this repository and run `npm install` to get dependencies.

Then, making sure that your database connection string is set to the environment variable `DB_URI`, prepare your database using `node_modules/.bin/sequelize db:migrate`.

You can then run the app using `npm start`. It will be on port 4000 by default.

Usage
----

This app supports **lessons**, **modules** and **pages**. Each module can have many lessons. Pages present miscellaneous content that isn't part of the main syllabus.

Modules are published and unpublished on admin-defined dates to allow a cohort to progress through lessons at a fixed pace.

A markdown editor is provided to edit page and lesson content. Raw HTML can be mixed in with markdown.

Code samples benefit from automatic syntax highlighting courtesy of highlight.js.

Admin users
-----------

Administrators can log in at `/login` to edit content, but there is deliberately no way to create new admin users within the app. This must be done seperately.
