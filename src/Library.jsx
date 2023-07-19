import { useEffect, useState } from 'react'
import { Book } from './components/Book.jsx'

export function Library() {
    const [books, setBooks] = useState([])
    const [genreFilter, setGenreFilter] = useState('all')
    const [filteredBooks, setFilteredBooks] = useState([])
    const [readingBooks, setReadingBooks] = useState(() => {
        // Obtenemos el array de libros que estamos leyendo del localStorage
        const savedReadingBooks = localStorage.getItem('readingBooks')
        if (savedReadingBooks) return JSON.parse(savedReadingBooks)
        return []
    })
    const [genres, setGenres] = useState([]) // [ 'fantasia', 'terror', 'ciencia ficcion'
    const [maxPages, setMaxPages] = useState(0)
    const [sliderValue, setSliderValue] = useState(maxPages)

    // Hacemos la petición a la API cuando inicia el componente
    useEffect(() => {

        const controller = new AbortController()
        const { signal } = controller

        fetch('https://raw.githubusercontent.com/midudev/pruebas-tecnicas/main/pruebas/01-reading-list/books.json', { signal })
            .then(response => response.json())
            .then(data => {
                setBooks(data.library)
                setFilteredBooks(data.library)
            })
            .catch(error => console.error(error))

        // Si se desmonta el componente, abortamos la petición
        return () => controller.abort()

    }, [])

    // Creamos un array con todos los generos de los libros disponibles a partir de
    useEffect(() => {
        if (!books) return
        const genresMap = books.map(book => book.book.genre)
        const genresSet = new Set(genresMap)
        const genresArray = [...genresSet]
        setGenres(genresArray)

        const topPages = Math.max(...books.map(book => book.book.pages))
        setMaxPages(topPages)
        setSliderValue(topPages)
    }, [books])

    // Sincronizar pestañas abiertas
    useEffect(() => {

        // Escuchamos cuelquier cambio en el localStorage, para sincronizar pestañas abiertas
        function handleStorageChange(event) {
            if (event.key === 'readingBooks') {
                setReadingBooks(JSON.parse(event.newValue)) // event.newValue contiene el nuevo valor que se guardó en localStorage
            }
        }

        // Agrega un listener al evento 'storage'
        window.addEventListener('storage', handleStorageChange)

        // Regresa una función de limpieza para quitar el listener cuando el componente se desmonta
        return () => {
            window.removeEventListener('storage', handleStorageChange)
        }

    }, [])

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
    }

    // Hacemos reset de la libreria
    const resetReadingBooks = () => {
        setReadingBooks([])
        localStorage.removeItem('readingBooks')
    }


    const applyFilters = (genre, pages) => {
        // Create a copy of the books array
        const originalBooks = [...books];

        // Create a filtered array, starting with all the books
        let filtered = originalBooks;

        // If the genre is not 'all', filter the array to contain only books
        // with the chosen genre
        if (genre !== 'all') {
            filtered = filtered.filter(book => book.book.genre.toLowerCase() === genre)
        }

        // Filter the array to contain only books with less than or equal to
        // the chosen number of pages
        filtered = filtered.filter(book => book.book.pages <= pages);

        // Update the state to contain the filtered array
        setFilteredBooks(filtered);
    }

    // Renderizamos los libros
    return (
        <div className='library w-11/12 mx-auto bg-light-bg p-20 px-6 md:px-20 rounded-[40px] shadow-[0_0_60px_60px_rgba(0,0,0,0.1)]'>
            <div className='flex flex-col md:flex-row w-full items-center justify-between'>
                <div className='titles'>
                    <h1 className='total-nooks font-serif text-accent text-3xl md:text-4xl font-bold mb-2'>{filteredBooks.length} libros disponibles</h1>
                    <h2 className='counter__wrapper text-lg md:text-xl font-bold mb-6'>{readingBooks.length} en la lista de lectura</h2>
                </div>
                <div className='reset'>
                    <button onClick={resetReadingBooks} className='border border-accent2 px-3 py-2 font-bold rounded text-accent2 hover:bg-accent2 hover:text-accent'>Reset</button>
                </div>
            </div>
            <div className="filters flex gap-4 mb-6">
                <input
                    type="range"
                    min="0"
                    max={maxPages}
                    value={sliderValue}
                    step="10"
                    onChange={(e) => {
                        const pages = Number(e.target.value);
                        setSliderValue(pages);
                        applyFilters(genreFilter, pages);
                    }}
                />
                <select className='border py-1 px-2' onChange={(e) => {
                    const genre = e.target.value.toLowerCase()
                    setGenreFilter(genre);
                    applyFilters(genre, sliderValue);
                }}>
                    <option value="all">Todos los géneros</option>
                    {genres.map((genre, index) => {
                        return <option key={index} value={genre}>{genre}</option>
                    })}
                </select>
            </div>
            <div className='books relative z-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-12'>
                {filteredBooks.map((bookWrapper, index) => {
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