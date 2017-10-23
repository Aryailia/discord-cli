# Using

To run:

1. `npm install` to install dependencies that have been gitingored 
1. Create a file inside a new folder private/login.json (todo make an example)
1. `node index.js`

You may wish to look up how to get your Discord token. (include links)

# Developing

[For using Blessed](https://gist.github.com/hawkins/5c05d077a5d15d95404c3bb56b2a81d7)
* Input and switching focus is buggy when inputOnFocus is not set to true

Since console.log interacts with blessed awkwardly and don't want to see entire log when piping, made a log function in private/Utils.js .
* `console.error` dumps to terminal
* To view this log, you can use `npm run logger` You will need nodemon installed for this. (Not currently in the dependencies)
* Or use `./tail -n -100 -f private/log.txt` though it's rewriting the log each time so this method produces funky output
* Another option is to `node index.js 2> private/log.txt` and redirect STDERR

# To Do

* Create an example login.json file for private/
* Add nodemon to dev dependencies
* Include link to getting discord token
* Implement getting token with password/email

# Notes

* The has passed for creating settings is passed by reference and copied
* Can access the individual cells of a `Blessed.list()` by using `#children()` by not doing it this way to avoid digging at blessed API in unintended ways.
* shrink>shrink will be minimalist in dimension down to one, shrink>100% will be take up 100%.