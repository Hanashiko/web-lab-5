'use strict';

class User {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

class Libraian extends User {
    constructor(id, name, email, salary) {
        super(id, name, email);
        this.salary = salary;
    }
    addBook(book) {
        this.library.addBook(book);
    }
    removeBook(book) {
        this.library.removeBook(book);
    }
}

class Reader extends User {
    constructor(id, name, email, membershipId) {
        super(id, name, email);
        this.membershipId = membershipId;
    }
    borrowBook(book, library) {
        if(book.isAvailable) {
            const loan = new Loan(book, this, new Date(Date.now() + 14 * 24 * 60 * 60 * 1000));
            library.addLoan(loan);
            book.borrow();
            console.log(`${this.name} успішно взяв книгу ${book.title}. Термін повернення: ${loan.dueDate}.`);
        } else {
            console.log(`Кига ${book.title} вже в користуванні.`)
        }
    }
    returnBook(book, library) {
        const loan = library.findLoan(book, this);
        if (loan) {
            const overdue = (new Date() - loan.dueDate) > 0;
            library.removeLoan(loan);
            book.return();
            console.log(`${this.name} повернув книгу ${book.title}. ${overdue ? "Книга прострочена!" : ""}`);
        } else {
            console.log(`у вас немає цієї книги`);
        }
    }
}

class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.isAvailable = true;
    }
    borrow() {
        this.isAvailable = false;
    }
    return() {
        this.isAvailable = true;
    }
}

class Loan {
    constructor(book, reader, dueDate) {
        this.book = book;
        this.reader = reader;
        this.dueDate = dueDate
    }
}

class Library {
    constructor() {
        this.books = [];
        this.users = [];
        this.loans = [];
    }
    addBook(book) {
        this.books.push(book);
    }
    addUser(user) {
        this.users.push(user);
    }
    addLoan(loan) {
        this.loans.push(loan);
    }
    getBooks() {
        for (let book of this.books) {
            console.log(`Book: ${book.title} - ${book.author} - ${book.isAvailable ? "Є в наявності" : "Немає в наявності"}`);
        }
    }
    getUsers() {
        for (let user of this.users) {
            console.log(`User: ${user.name} ${user.email}`);
        }
    }
    getLoans() {
        for (let loan of this.loans) {
            console.log(`Loan: ${loan.book} ${loan.reader} ${loan.dueDate}`)
        }
    }
    removeBook(book) {
        const index = this.books.indexOf(book);
        if (index > -1)  {
            this.books.splice(index, 1);
        }
    }
    removeUser(user) {
        const index = this.users.indexOf(user);
        if (index !== -1){
            this.user.splice(index, 1);
        }
    }
    removeLoan(loan) {
        const index = this.loans.indexOf(loan);
        if (index !== -1) {
            this.loans.splice(index, 1);
        }
    }
    findLoan(book, reader) {
        return this.loans.find(loan => loan.book === book && loan.reader === reader);
    }
    isBookAvailable(book) {
        return book.isAvailable;
    }
}

const library = new Library;
const librarian = new Libraian(1, "Олександр", "alex@gmail.com", 5000);
const reader = new Reader(2, "Ірина", "irina@gmail.com", "12345");

const book1 = new Book("1984","Орвел");
const book2 = new Book("Який чудовий новий світ", "Хакслі");

library.addBook(book1, library);
library.addBook(book2, library);

console.log("Книги в бібліотеці:");
library.getBooks();

reader.borrowBook(book1, library);
reader.returnBook(book1, library);

reader.borrowBook(book2, library);
reader.returnBook(book2, library);