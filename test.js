import needle from 'needle';

needle.post(
    'http://localhost:3000/add-book',
    {   // accept object with parameters bookName, isbn, author, and year
        bookName: "Harry Potter and the Philosopher's Stone", 
        ISBN: "978-0-7475-3269-9", 
        author: "J.K. Rowling", 
        year: "1997"
    },
    (err, res) => {
        if (err) { // throw error
            console.error("Error:", err);
        } else { // log the param onto console
            console.log("Response:", res.body);
        }
    }
);

needle.post(
    'http://localhost:3000/add-book',
    {   // accept object with parameters bookName, isbn, author, and year
        bookName: "Harry Potter and Chamber of Secrets", 
        ISBN: "978-1-7475-3259-9", 
        author: "J.K. Rowling", 
        year: "1999"
    },
    (err, res) => {
        if (err) { // throw error
            console.error("Error:", err);
        } else { // log the param onto console
            console.log("Response:", res.body);
        }
    }
);
