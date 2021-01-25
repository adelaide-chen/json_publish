// For installation: npm install --save express body-parser mysql nodemon

/* Database schema?
    Since the only thing on the top-most level of the JSON object is "article", there didn't seem to be much point keeping it.
    So when inserting the entry in the database, I decided to remove the top level.

    lead_art and authors are nested JSON objects, using stringify and parse to read and write

    CREATE TABLE stories (
        id VARCHAR(255), 
        slug VARCHAR(255), 
        title VARCHAR(255), 
        dek VARCHAR(255), 
        published_date VARCHAR(255), 
        canonical_url VARCHAR(255), 
        word_count INT, 
        tags VARCHAR(255), 
        embeds VARCHAR(255), 
        lead_art JSON, 
        authors JSON
    )
*/


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
    const lead_art = JSON.stringify(json.lead_art)
    const authors = JSON.stringify(json.authors)
    // connection.query(
    //     "INSERT INTO stories (id,slug,title,dek,published_date,canonical_url,word_count,tags,embeds,lead_art,authors) VALUES('"+json.id+"', '"+json.slug+"', '"+json.title+"', '"+json.dek+"', '"+json.published_date+"', '"+json.canonical_url+"', '"+json.word_count+"', '"+json.tags+"', '"+json.embeds+"', '"+lead_art+"', '"+authors+"');"
    //     , (error, results, fields) => {
    //     if (error) {
    //         console.log(error)
    //         next();
    //     } else {
    //         res.end(JSON.stringify(results));
    //     }
    // })
    const update = "UPDATE stories SET slug =?, title=?, dek=?, published_date=?, word_count=?, tags=?, embeds=?, lead_art=?, authors=? WHERE (id=? AND canonical_url=?)";
    connection.query(
        update,
        [json.slug, json.title, json.dek, json.published_date, json.word_count, json.tags, json.embeds, lead_art, authors, json.id, json.canonical_url],
        (error, results, fields) => {
            if (error) {
                console.log(error);
                next();
            } else {
                res.end(JSON.stringify(results));
            }
        }
    )
})
