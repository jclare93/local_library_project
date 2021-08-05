function findAccountById(accounts, id) {
  //find and return the first account that has an id that matches the given id
  const foundAccount = accounts.find((account) => account.id === id);
  return foundAccount;
}

function sortAccountsByLastName(accounts) {
  const sortedAccounts = accounts.sort((nameA, nameB) => 
  nameA.name.last.toLowerCase() > nameB.name.last.toLowerCase() ? 1: -1);
  return sortedAccounts;
}

function getTotalNumberOfBorrows(account, books) {
  //use reduce function like an accumulator function to get books that are currently borrowed and adding that number together
  const result = books.reduce((acc, book)=>{
    let count = book.borrows.filter((b)=>b.id === account.id).length
    acc += count;
    return acc;
  }, 0)
  return result;
}

function getBooksPossessedByAccount(account, books, authors) {
  //find and filter books that match the account Id and have not yet been returned
  const accountId  = account.id;
  const booksBorrowed =  books.filter((book) => {
    return book.borrows[0].id === accountId && !book.borrows[0].returned
  });
  //go inside each book array and add the authors info
  booksBorrowed.forEach((book) => {
    const foundAuthor = authors.find((author) =>  author.id === book.authorId);
    book.author = foundAuthor;
  })
  return booksBorrowed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
