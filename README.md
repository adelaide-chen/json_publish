# json_publish

1. Run npm install --save express body-parser mysql nodemon
  - Should see node_modules folder pop up
2. Run npm start
  - Any subsequent runs will probably raise a "TABLE_EXISTS_ERROR" since the table is created upon starting up database connection, and is never deleted when the program ends. Even if the error is raised, the rest of the code runs fine.
3. 
