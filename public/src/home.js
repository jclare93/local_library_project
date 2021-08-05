function getTotalBooksCount(books) {
  //seeing how many book objects there are inside the array
  return books.length
}

function getTotalAccountsCount(accounts) {
  //seeing how many account objects there are in the array
  return accounts.length
}

function getBooksBorrowedCount(books) {
  //making a array that returns any books that have been checked out and not returned
  const booksBorrowed = books.filter((book) => book.borrows[0].returned === false)
  //returning the length of the array we made to get the amount of books
  return booksBorrowed.length;
}

function topFive(listOfFavs){
  //this function will be used to sort objects with count keys by value
  listOfFavs.sort((itemA, itemB)=> itemB.count - itemA.count);
  if (listOfFavs.length > 5){
    for (let i = listOfFavs.length - 1; i > 4;i--){
      listOfFavs.pop();
    }
  }
  return listOfFavs;
}

function getMostCommonGenres(books) {
  //this function will loop through the books array looking for and counting the genre
  const bookGenres = books.reduce((acc, book) => {
    const name = book.genre;
    const genreName = acc.find((bookGenre)=> bookGenre.name === name);
    /*if the current genre has not been found in the array genreName it will push it into the array and add count =1
    if the current genre is found, it will add the genreName count by 1*/
    genreName === undefined ? acc.push({name, count: 1}) : genreName.count++;
    return acc;
  },[])
  return topFive(bookGenres);
}

function getMostPopularBooks(books) {
  //loop through books and return an array that just has the book name and how many times it has been borrowed
  const nameAndCount = books.map((book) => {return {name : book.title, count: book.borrows.length}});
  return topFive(nameAndCount);
}

function getMostPopularAuthors(books, authors) {
  //create empty array we can push author objects into
  const popularAuthors = [];
  authors.forEach((author) => {
    let totalCount = 0;
    //using an accumulator pattern that will loop through each author counting how many times each book as been borrowed
    books.reduce((acc, book)=>{
      if (book.authorId === author.id) acc += book.borrows.length;
      totalCount = acc;
      return acc;
    }, totalCount)
    popularAuthors.push({name: `${author.name.first} ${author.name.last}`, count: totalCount});
  })
  return topFive(popularAuthors);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
