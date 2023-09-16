/*  Note: author id is set to a number; 

 account & book id's are set to strings
 */


function getTotalBooksCount(books) {
return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
return books.filter(book => !book.borrows[0].returned).length;
}

function getMostCommonGenres(books) {
// create empty object 
const genreCounts = {};
// loop thru books and increment genre counts 
for (const book of books) {
  const genre = book.genre;
  if (genreCounts[genre]) {
    genreCounts[genre]++;
  } else {
    genreCounts[genre] = 1;
  }
}
// convert object into an array of objects 
const genreArray = Object.keys(genreCounts).map(genre => ({
  name: genre,
  count: genreCounts[genre],
}));
// sort descending order 
genreArray.sort((a,b) => b.count - a.count);
// slice top 5 genres 
const topGenres = genreArray.slice(0,5);
// return top genres 
return topGenres;
}

function getMostPopularBooks(books) {
  // use map() sort() and slice() 
  // most popular = borrows.length 
  return books 
  .map(book => ({ name: book.title, count: book.borrows.length }))
  .sort((a,b) => b.count - a.count)
  .slice(0,5);
}

// create helper function for total borrows of a given author 
function calculateAuthorBorrowCount(books, author) {
 const authorBooks = books.filter(book => book.authorId === author.id);
 return authorBooks.reduce((total, book) => total + book.borrows.length, 0);
}
function getMostPopularAuthors(books, authors) {
  // create new array 
  const authorCounts = [];
  // loop thru authors and calculate total borrow counts 
  for(const author of authors) {
    // create an object for author 
    const authorObj = {
      name: `${author.name.first} ${author.name.last}`,
      count: calculateAuthorBorrowCount(books,author),
    };
    // push author object to new array 
    authorCounts.push(authorObj);
  };
  // sort array in descending order by borrows count 
  authorCounts.sort((a,b) => b.count - a.count);
  
  // slice array keep top 5
  const topAuthors = authorCounts.slice(0,5);

  // return new sliced array 
  return topAuthors;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
