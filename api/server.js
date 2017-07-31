// Express
let express = require('express')
let app = express()

let cors = require('cors');
let bodyParser = require('body-parser');
let logger = require('morgan');
let helmet = require('helmet');

app.use(logger('dev'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
logger('tiny')
app.use(helmet());

let r = require('rethinkdb');

/**
 * Throw errors in JSON format
 */
app.use(function (error, request, response, next) {
    response.status(error.status || 500);
    response.json({ error: error.message });
});


let connection = r.connect({
    db: "tasks_manager" //your database
}).then((connection) => {
    app.get('/', (req, res) => {
        r.table('tasks').filter({completed: false}).run(connection, (err, cursor) => {
            if (err) throw err
            cursor.toArray((err, result) => {
                if (err) throw err
                return res.json(result)
            })
        })
    })

    app.get('/done', (req, res) => {
        r.table('tasks').filter({completed: true}).run(connection, (err, cursor) => {
            if (err) throw err
            cursor.toArray((err, result) => {
                if (err) throw err
                return res.json(result)
            })
        })
    })

    app.get('/urgent', (req, res) => {
        r.table('tasks').filter({priority: 3, completed: false}).run(connection, (err, cursor) => {
            if (err) throw err
            cursor.toArray((err, result) => {
                if (err) throw err
                return res.json(result)
            })
        })
    })

    app.get('/details/:taskId', (req, res) => {
        let id = req.params.taskId;
        r.table('tasks').filter({'id': id}).run(connection, (err, cursor) => {
            if (err) throw err
                cursor.toArray((err, result) => {
                    return res.json(result);
                })
        })
    })

    app.post('/addTask', (req, res) => {
        r.table('tasks').insert(req.body).run(connection, (err, cursor) => {
            if (err) throw err
                return res.json(true)
        })
    })

    app.put('/completeTask/:taskId', (req, res) => {
        let id = req.params.taskId;
        r.table('tasks').get(id).update({completed: true}).run(connection, (err, cursor) => {
            return res.json(true);
        })
    })

    app.delete('/deleteTask/:taskId', (req, res) => {
        let id = req.params.taskId;
        r.table('tasks').get(id).delete().run(connection, (err, cursor) => {
            return res.json(true);
        })
    })
});

// Run server on port 3000
app.listen(9000, function () {
    console.log('Listened on port 9000!')
})