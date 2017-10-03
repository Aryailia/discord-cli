Since console.log interacts with blessed awkwardly and don't want to see entire log when piping, made a log function in private/Utils.js .
* To view this log, you can use `./nodemon --watch -I readlog.js`
* Or use `./tail -n -100 -f private/log.txt` though it's rewriting the log each time so this method produces funky output