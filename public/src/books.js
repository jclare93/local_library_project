function findAuthorById(authors, id) {
  //find first author id that matches the id given
  const foundAuthor = authors.find((author) => author.id === id);
  return foundAuthor;
}

function findBookById(books, id) {
  //find first book that has an id that matches the book
  const foundBook = books.find((book) => book.id === id);
  return foundBook;
}

function partitionBooksByBorrowedStatus(books) {
  //create two different arrays, one for returned, one for not returned 
  const booksNotBorrowed = books.filter((book)=> book.borrows[0].returned === true);
  const booksBorrowed = books.filter((book) => book.borrows[0].returned === false);
  //return an array that contains the two arrays
  return [booksBorrowed, booksNotBorrowed];
}

function getBorrowersForBook(book, accounts) {
  //make an empty array that we will add too
  let borrowersForBooks = [];
  book.borrows.forEach((borrow) => {
    //find the account id the match the borrower ids
    const result = accounts.find((account) => account.id ===borrow.id);
    //using dot notation to add a key and value to
    result.returned = borrow.returned
    //pushing this into array we created
    borrowersForBooks.push(result);
  })
  //limiting the list of borrowers to 10
  return borrowersForBooks.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
