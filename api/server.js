// Express
let express = require('express')
let app = express()
let secret = 'd2532f46973f69d3152af9efda';

let cors = require('cors');
let bodyParser = require('body-parser');
let logger = require('morgan');
let helmet = require('helmet');

let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let jwtExpress = require('express-jwt');

app.use(logger('dev'));
app.use(require('cookie-parser')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

let saltRounds = 10;

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
    app.get('/todo',jwtExpress({ secret: secret }), (req, res) => {
        r.table('tasks').filter({completed: false}).run(connection, (err, cursor) => {
            if (err) throw err
            cursor.toArray((err, result) => {
                if (err) throw err
                return res.json(result)
            })
        })
    })

    app.get('/done',jwtExpress({ secret: secret }), (req, res) => {
        r.table('tasks').filter({completed: true}).run(connection, (err, cursor) => {
            if (err) throw err
            cursor.toArray((err, result) => {
                if (err) throw err
                return res.json(result)
            })
        })
    })

    app.get('/urgent',jwtExpress({ secret: secret }), (req, res) => {
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

    // app.post('/createUser', (req, res) => {
    //     r.table('users').filter(r.row('user').eq(req.body.user)).count().run(connection, (err, cursor) => {


    //         if (cursor >= 1) {
    //             return res.json(false);

    //         } else {
    //             bcrypt.hash(req.body.password, saltRounds).then((hash) => {
    //                 r.table('users').insert({
    //                     user: req.body.user,
    //                     password: hash,
    //                 }).run(connection, (err, cursor) => {
    //                     if (err) throw err
    //                     return res.json(true);
    //                 })
    //             })
    //         }
    //     });
    // });

    app.post('/proceedToLogin', (req, res) => {
        let user = req.body.user;
        let password = req.body.password;
        if (!user || !password) { res.statusCode = 401; return res.json(false); }
        // 1
        r.table('users').filter({ 'user': user }).run(connection, (err, cursor) => {
            if (err) throw err;
            cursor.toArray((err, result) => {
                if (err) throw err;
                bcrypt.compare(password, result[0].password, function (err, response) {
                    if (!response) { res.statusCode = 500; return res.json(err); }

                    // user = result[0];
                    let userId = result[0].id;
                    let token = jwt.sign({
                        // La clé publique
                        user: user,
                        id: userId,
                    }, secret /** Clé secrète */, { expiresIn: '2d' });
                    console.log(user)
                    console.log(password)
                    console.log(token)
                    return res.json({ token: token, id: result[0].id});
                });
            })
        })
    })

});

// Run server on port 3000
app.listen(9000, function () {
    console.log('Listened on port 9000!')
})