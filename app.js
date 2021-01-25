// npm install --save express body-parser mysql nodemon

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'db'
});

connection.connect(err => {
    if (err) {
        console.log(err)
    } else {
        console.log('connected')
        app.listen(3000)

        const sql = "CREATE TABLE stories (id VARCHAR(255), slug VARCHAR(255), title VARCHAR(255), dek VARCHAR(255), published_date VARCHAR(255), canonical_url VARCHAR(255), word_count INT, tags VARCHAR(255), embeds VARCHAR(255), lead_art JSON, authors JSON)"
        connection.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                console.log("table created")
            }
        })
    }
})

app.get('/', (req, res, next) => {
    connection.query('SELECT * FROM stories', (err, results) => {
        if (err) {
            console.log(err);
            next();
        } else {
            res.end(JSON.stringify(results));
        }
    })
})

app.post('/', (req, res, next) => {
    const json = req.body.article;
    connection.query(
        (error, results, fields) => {
            if (error) {
                console.log(error)
                next();
            } else {
                results = JSON.parse(JSON.stringify(results))[0][sql]
                const lead_art = JSON.stringify(json.lead_art)
                const authors = JSON.stringify(json.authors)
                if (results == 0) {
                    connection.query(
                        "INSERT INTO stories (id,slug,title,dek,published_date,canonical_url,word_count,tags,embeds,lead_art,authors) VALUES('"+json.id+"', '"+json.slug+"', '"+json.title+"', '"+json.dek+"', '"+json.published_date+"', '"+json.canonical_url+"', '"+json.word_count+"', '"+json.tags+"', '"+json.embeds+"', '"+lead_art+"', '"+authors+"');"
                        , (error, results, fields) => {
                        if (error) {
                            console.log(error)
                            next();
                        } else {
                            res.end(JSON.stringify(results));
                        }
                    })
                }
            }
        }
    )
})
