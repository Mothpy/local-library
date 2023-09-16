/* there are 3 datasets apart of this project: accounts,
 authors, and books

 Note: author id is set to a number; 
 account & book id's are set to strings
 */


// return the account object that has the matching ID.
function findAccountById(accounts, id) {
 // use array.find() to search for account with matching id //
 return accounts.find(account => account.id === id);
}

// return accounts sorted by last name 
function sortAccountsByLastName(accounts) {
// use array.sort() to sort the accounts by last name 
return accounts.sort((accountA,accountB) => { 
// (accountA, accountB) compare last names of account objects 
const lastNAmeA = accountA.name.last.toLowerCase();
const lastNameB = accountB.name.last.toLowerCase();
// converted lastnames toLowerCase in case of case-insensitivty  
return lastNAmeA.localeCompare(lastNameB);
// compare lastnames using localeCompare for proper sorting
  });
}


// return total number of borrows for a user's account 
function getTotalNumberOfBorrows(account, books) {
// set counter to 0 
let totalCount = 0; 
// loop through the books array using for/of loop 
for(const book of books) {
  // declare borrows variable 
  const borrows = book.borrows;
  // loop through borrows array 
  for(const borrow of borrows) {
    // check if borrow.id is the same as account.id 
    if(borrow.id === account.id) {
      // increment totalCount if id matches 
      totalCount++;
    }
  }
}
return totalCount; 
}


// use filter() to find books checked out by a user's account  
function getBooksPossessedByAccount(account, books, authors) {
 const checkedOutBooks = books.filter(book => {
  const currentBorrow = book.borrows[0];
    // check if currentBorrow.id === account.id
    // check if currentBorrow !=== returned 
  return currentBorrow.id === account.id &&  !currentBorrow.returned;
 });
 // add author info to checkOutBooks
 // use map() to iterate through each book in checkedOutBooks array
 const booksWithAuthor = checkedOutBooks.map(book => {
  // use find() to find the author.id that matches book.authorId
  const author = authors.find(author => author.id === book.authorId);
  // return new object combining book object and author object 
  return {
    ...book, // spread book object into new object
    author, //  add author object 
  };
 });
 return booksWithAuthor;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
