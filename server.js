import express from 'express';
import fs from 'fs';

// instantiate the server
const app = express();
app.use(express.urlencoded({ extended: true }));

// this tells our server to listen to the port 3000
app.listen(3000, () => { console.log('Server started at port 3000')} );

app.post('/add-book', (req, res) => {
    const { bookName, ISBN, author, year } = req.body; // get the body of req 

    if (!bookName || !ISBN || !author || !year) { // checks if either one is missing; if so, return object with field success as false
        return res.send({ success: false });
    }

    let data = `${bookName},${ISBN},${author},${year}\n`;  // format and place information into variable 'data'
    fs.appendFileSync("books.txt", data); // append data to new file books.txt
    res.send({ success: true }); // upon successful saving of data, respond with object with field success as true
});

app.get('/find-by-isbn-author', (req, res) => {
    const { isbn, author } = req.query; // get the body of req

    if (!isbn || !author) { // if either isbn or author is empty, respond with blank
        return res.send({});
    }

    const data = fs.readFileSync("books.txt").toString().split("\n"); // read content of file books.txt onto list data in which it is indexed by line

    for (let i = 0; i < data.length; i++) { // iterate with the number of lines/books
        const book = data[i].split(","); // split each index further to access specific fields needed and assign the list onto variable book
        if (book[1].toLowerCase === isbn.toLowerCase && book[2].toLowerCase === author.toLowerCase) { // if the isbn and author matches
            return res.send({ bookName: book[0], isbn: book[1], author: book[2], year: book[3] }); // if matching, return the book as object with the fields
        }
    }
    return(res.send({})) // if the required qualities are not satisfied, return blank
});

app.get('/find-by-author', (req, res) => {
    var authored = []; // create array to accumulate books authored by passed author
    const { author } = req.query; // get author through query

    if (!author) { // if author is empty, respond with empty
        return res.send({});
    }

    const data = fs.readFileSync("books.txt").toString().split("\n"); // read file onto data, divided by each line

    for (let i = 0; i < data.length; i++) { // iterate with the number of lines/books existing in the file
        const book = data[i].split(","); // further split to acquire specific fields needed and assign onto book
        if (book.length >= 4 && book[2].toLowerCase === author.toLowerCase) { // if author is found, push the book onto authored
            authored.push(book);
        }
    }
    return res.send(authored); // return authored
});
