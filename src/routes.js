const {addBookHandler, getBooksByHandler, getBookByIdHandler, updateBookByHandler, deleteBookByIdHandler} = require('./handler')

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBookHandler,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getBooksByHandler
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: getBookByIdHandler
    }, 
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: updateBookByHandler
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: deleteBookByIdHandler
    },
]

module.exports = routes