// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/MyHabitStacker");

app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.use(cors());

//CORS configuration
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Models
var Habit = mongoose.model('Habit', {
    name: String
});

var Log = mongoose.model('DailyLog', {
    name: String,
    date: Date
});

// ** HABITS ** //
// Get all habits 
app.get('/api/habits', function (req, res) {

    console.log("Listing habits ...");

    //use mongoose to get data from the database
    Habit.find(function (err, habits) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(habits); // return all habits in JSON format
    });
});

// Get one habit
app.get('/api/habits/:id', function (req, res) {

    console.log("List one specific habit ...");
    
    //use mongoose to get a single habit from the database
    Habit.find({ _id: req.params.id }, function (err, habits) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(habits); // return the habit in JSON format
    });
});

// Create a new habit
app.post('/api/habits', function (req, res) {

    console.log("Creating a new habit ...");

    Habit.create({
        name: req.body.name,
        done: false
    }, function (err, habit) {
        if (err) {
            res.send(err);
        }

        // create and return all the habits
        Habit.find(function (err, habits) {
            if (err)
                res.send(err);
            res.json(habits);
        });
    });

});

// Update a habit 
app.put('/api/habits/:id', function (req, res) {
    const habit = {
        name: req.body.name
    };
    console.log("Updating the habit ... ", req.params.id);
    Habit.update({_id: req.params.id}, habit, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete a habit
app.delete('/api/habits/:id', function (req, res) {
    console.log("Deleting a habit ... ", req.params.id);
    Habit.findOneAndRemove({   //updated from .remove - https://stackoverflow.com/questions/50283081/mongodb-error-cannot-use-retryable-writes-with-limit-0
        _id: req.params.id
    }, function (err, habit) {
        if (err) {
            console.error("Error deleting the habit ", err);
        }
        else {
            Habit.find(function (err, habits) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(habits);
                }
            });
        }
    });
});


// ** DAILY LOG ** //
// Get all daily log entires 
app.get('/api/logs', function (req, res) {

    console.log("Listing daily log entries ...");

    //use mongoose to get data from the database
    Log.find(function (err, logs) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(logs); // return all daily entries in JSON format
    });
});

// Get one daily entry record
app.get('/api/logs/:id', function (req, res) {

    console.log("List one specific daily log entry ...");
    
    //use mongoose to get a single log entry from the database
    Log.find({ _id: req.params.id }, function (err, logs) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(logs); // return the habit in JSON format
    });
});

// Create a new daily log entry
app.post('/api/logs', function (req, res) {

    console.log("Creating a new daily log entry ...");

    Log.create({
        name: req.body.name,
        date: req.body.date,
        done: false
    }, function (err, log) {
        if (err) {
            res.send(err);
        }

        // create and return all the log entries
        Log.find(function (err, logs) {
            if (err)
                res.send(err);
            res.json(logs);
        });
    });

});

// Update a daily log entry 
app.put('/api/logs/:id', function (req, res) {
    const log = {
        name: req.body.name,
        date: req.body.date
    };
    console.log("Updating the daily log entry ... ", req.params.id);
    Log.update({_id: req.params.id}, log, function (err, raw) {
        if (err) {
            res.send(err);
        }
        res.send(raw);
    });
});


// Delete a daily log entry
app.delete('/api/logs/:id', function (req, res) {
    console.log("Deleting a daily log entry ... ", req.params.id);
    Log.findOneAndRemove({   //updated from .remove - https://stackoverflow.com/questions/50283081/mongodb-error-cannot-use-retryable-writes-with-limit-0
        _id: req.params.id
    }, function (err, log) {
        if (err) {
            console.error("Error deleting the log entry ", err);
        }
        else {
            Log.find(function (err, logs) {
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(logs);
                }
            });
        }
    });
});




// Start app and listen on port 8080  
app.listen(process.env.PORT || 8080);
console.log("My Habit Stacker server listening on port  - ", (process.env.PORT || 8080));