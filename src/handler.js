const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = nanoid(16);
    let finished = pageCount === readPage ? true : false;
    insertedAt = new Date().toISOString();
    updatedAt = insertedAt;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    if (name === "" || name === null || name === undefined) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    }

    books.push(newBook);
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Buku gagal ditambahkan",
    });
    response.code(500);
    return response;
};

const getBooksByHandler = (request, h) => {
    const data = books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
    }));

    // REQUEST.QUERY NAME = DICODING
    const { name, reading, finished } = request.query;

    if (name) {
        const filteredBooks = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
        const dataName = filteredBooks.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }));

        const response = h.response({
            status: "success",
            data: {
                books: dataName,
            },
        });
        response.code(200);
        return response;
    }

    // REQUEST.QUERY READING = 0 OR READING = 1
    if (reading === "0") {
        const filterBook = books.filter((book) => book.reading === false);
        const dataReading = filterBook.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }));
        const response = h.response({
            status: "success",
            data: {
                books: dataReading,
            },
        });
        response.code(200);
        return response;
    }
    if (reading === "1") {
        const filterBook = books.filter((book) => book.reading === true);
        const dataReading = filterBook.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }));
        const response = h.response({
            status: "success",
            data: {
                books: dataReading,
            },
        });
        response.code(200);
        return response;
    }


    // REQUEST.QUERY FINISHED = 0 OR FINSHED = 1
    if (finished === "0") {
        const filterBook = books.filter((book) => book.finished === false);
        const dataFinish = filterBook.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }));
        const response = h.response({
            status: "success",
            data: {
                books: dataFinish,
            },
        });
        response.code(200);
        return response;
    }
    if (finished === "1") {
        const filterBook = books.filter((book) => book.finished === true);
        const dataFinish = filterBook.map((book) => ({
            id: book.id,
            name: book.name,
            publisher: book.publisher,
        }));
        const response = h.response({
            status: "success",
            data: {
                books: dataFinish,
            },
        });
        response.code(200);
        return response;
    }

    // menampilkan semua data
    const response = h.response({
        status: "success",
        data: {
            books: data,
        },
    });
    response.code(200);
    return response;
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter((b) => b.id === bookId)[0];

    if (book !== undefined) {
        const response = h.response({
            status: "success",
            data: {
                book: book,
            },
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Buku tidak ditemukan",
        data: {
            books: books,
        },
    });
    response.code(404);
    return response;
};

const updateBookByHandler = (request, h) => {
    const { bookId } = request.params;
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();

    const index = books.findIndex((book) => book.id === bookId);

    if (name === "" || name === null || name === undefined) {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku",
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
        });
        response.code(400);
        return response;
    }

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        };

        const response = h.response({
            status: "success",
            message: "Buku berhasil diperbarui",
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
};

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: "success",
            message: "Buku berhasil dihapus",
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
};

module.exports = { addBookHandler, getBooksByHandler, getBookByIdHandler, updateBookByHandler, deleteBookByIdHandler };
