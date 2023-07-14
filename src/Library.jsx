import React, { useEffect, useState } from 'react';
import { Book } from './components/Book.jsx'

export function Library() {
    const [books, setBooks] = useState([]);
    const [totalBooks, setTotalBooks] = useState(0);
    const [readingBooks, setReadingBooks] = useState(0);

    const handleIsReadingChange = (isReading) => {
        setReadingBooks(prevReadingBooks => isReading ? prevReadingBooks + 1 : prevReadingBooks - 1);
    };

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/midudev/pruebas-tecnicas/main/pruebas/01-reading-list/books.json')
            .then(response => response.json())
            .then(data => {
                setBooks(data.library);
                setTotalBooks(data.library.length);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div className='library bg-light-bg p-20 rounded-[40px] shadow-[0_0_60px_60px_rgba(0,0,0,0.1)]'>
            <h1 className="total-nooks font-serif text-accent text-4xl font-bold mb-2">Número de libros: {totalBooks}</h1>
            <h2 className="counter__wrapper text-xl font-bold mb-6">Libros que estamos leyendo: {readingBooks}</h2>
            <div className="books relative z-10 grid grid-cols-4 gap-12">
                {books.map((bookWrapper, index) => {
                    const book = bookWrapper.book; // Aquí extraemos el objeto book
                    return (
                        <Book key={index} genre={book.genre} img={book.cover} title={book.title}  handleIsReadingChange={handleIsReadingChange} />
                    );
                })}
            </div>
        </div>
    )
}