import React, { useEffect, useState } from 'react';
import { Book } from './components/Book.jsx'

export function Library() {
    const [books, setBooks] = useState([]);
    const [readingBooks, setReadingBooks] = useState([])

    // Hacemos la petición a la API cuando inicia el componente
    useEffect(() => {
        fetch('https://raw.githubusercontent.com/midudev/pruebas-tecnicas/main/pruebas/01-reading-list/books.json')
            .then(response => response.json())
            .then(data => {
                setBooks(data.library);
            })
            .catch(error => console.error(error));
    }, []);

    // Manejamos el estado de los libros que estamos leyendo
    const handleReadingBooks = (ISBN) => {

        // Hacemos una copia del array de libros que estamos leyendo
        const newReadingBooks = [...readingBooks]

        // Aquí comprobamos si el libro que estamos leyendo está en el array
        const index = newReadingBooks.indexOf(ISBN)
        if (index === -1) {

            // Añadimos el libro al array de libros que estamos leyendo
            newReadingBooks.push(ISBN)
            setReadingBooks(newReadingBooks)
        } else {

            // Eliminamos el libro del array de libros que estamos leyendo
            newReadingBooks.splice(index, 1)
            setReadingBooks(newReadingBooks)
        }
    };

    return (
        <div className='library bg-light-bg p-20 rounded-[40px] shadow-[0_0_60px_60px_rgba(0,0,0,0.1)]'>
            <div className='flex w-full items-center justify-between'>
                <div className='titles'>
                    <h1 className='total-nooks font-serif text-accent text-4xl font-bold mb-2'>Número de libros: {books.length}</h1>
                    <h2 className='counter__wrapper text-xl font-bold mb-6'>Libros que estamos leyendo: {readingBooks.length}</h2>
                </div>
                {/* <div className='reset'>
                    <button className='border border-accent2 p-3 rounded text-accent2'>Reset</button>
                </div> */}
            </div>
            <div className='books relative z-10 grid grid-cols-4 gap-12'>
                {books.map((bookWrapper, index) => {
                    const book = bookWrapper.book // Aquí extraemos el objeto book
                    return (
                        <Book
                            key={index}
                            ISBN={book.ISBN}
                            genre={book.genre}
                            img={book.cover}
                            title={book.title}
                            handleReadingBooks={handleReadingBooks}
                            isReading={readingBooks.includes(book.ISBN)}
                        />
                    )
                })}
            </div>
        </div>
    )
}