# json_publish

1. Run npm install --save express body-parser mysql nodemon
  - Should see node_modules folder pop up
2. Run npm start
  - Any subsequent runs will probably raise a "TABLE_EXISTS_ERROR" since the table is created upon starting up database connection, and is never deleted when the program ends. Even if the error is raised, the rest of the code runs fine.


Database Schema:

  Since the only thing on the top-most level of the JSON object is "article", there didn't seem to be much point keeping it.
  So when inserting the entry in the database, I decided to remove the top level.

  lead_art and authors are nested JSON objects, so I decided to use stringify to read and write

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
