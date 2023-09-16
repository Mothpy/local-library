/* Note: author id is set to a number;
 
account & book id's are set to strings
*/


function findAuthorById(authors, id) {
  return authors.find(author => author.id === id);
}

function findBookById(books, id) {
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // set two variables to hold checkedout books and returned books 
  let currentlyCheckedOut = [];
  let returnedBooks = []; 

  // iterate through books array 
  for(const book of books) {
    // get first borrow transaction 
    const firstTransaction = book.borrows[0];

    // check if book is currently checked out 
    if(!firstTransaction.returned) {
      currentlyCheckedOut.push(book);
    } else {
      returnedBooks.push(book);
    }
  }
  // return an array that contains currentlyCheckOut and returnedBooks
  return [currentlyCheckedOut, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  let borrowers = [];

  // loop through borrows array of book object 
  for(const borrow of book.borrows) {
    // find matching account ID 
    const account = accounts.find(acc => acc.id === borrow.id);
    if(account) {
      // extract returned from book.borrows object 
      const {returned} = borrow;
      // set returned entry to account object 
      account.returned = returned; 
      // add(push) modified account object to borrowers array 
      borrowers.push(account); 
      // set borrowers array to <= 10 objects 
      if (borrowers.length >= 10) {
        break;
      }
    }
  }
  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
