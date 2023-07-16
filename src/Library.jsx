import React, { useEffect, useState } from 'react';
import { Book } from './components/Book.jsx'

export function Library() {
    const [books, setBooks] = useState([]);
    const [readingBooks, setReadingBooks] = useState(() => {
        // Obtenemos el array de libros que estamos leyendo del localStorage
        const savedReadingBooks = localStorage.getItem('readingBooks')
        if (savedReadingBooks) return JSON.parse(savedReadingBooks)
        return []
    });

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

        // Comprobamos si el libro que estamos leyendo está en el array
        const index = newReadingBooks.indexOf(ISBN)
        if (index === -1) {

            // Añadimos el libro al array de libros que estamos leyendo
            newReadingBooks.push(ISBN)
        } else {

            // Eliminamos el libro del array de libros que estamos leyendo
            newReadingBooks.splice(index, 1)
        }

        setReadingBooks(newReadingBooks)

        // Guardamos el array de libros que estamos leyendo en el localStorage
        localStorage.setItem('readingBooks', JSON.stringify(newReadingBooks))
    };

    // Hacemos reset de la libreria
    const resetReadingBooks = () => {
        setReadingBooks([])
        localStorage.removeItem('readingBooks')
    }

    // Renderizamos los libros
    return (
        <div className='library w-11/12 mx-auto bg-light-bg p-20 px-6 md:px-20 rounded-[40px] shadow-[0_0_60px_60px_rgba(0,0,0,0.1)]'>
            <div className='flex flex-col md:flex-row mb-10 w-full items-center justify-between'>
                <div className='titles'>
                    <h1 className='total-nooks font-serif text-accent text-3xl md:text-4xl font-bold mb-2'>Número de libros: {books.length}</h1>
                    <h2 className='counter__wrapper text-lg md:text-xl font-bold mb-6'>Libros que estamos leyendo: {readingBooks.length}</h2>
                </div>
                <div className='reset'>
                    <button onClick={resetReadingBooks} className='border border-accent2 px-3 py-2 font-bold rounded text-accent2 hover:bg-accent2 hover:text-accent'>Reset</button>
                </div>
            </div>
            <div className='books relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-12'>
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