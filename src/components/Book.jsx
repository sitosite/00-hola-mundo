import React, { useEffect, useState } from 'react'
import { Plus } from './Plus.jsx'
import { Tick } from './Tick.jsx'

export function Book({ img, title, ISBN, genre, handleReadingBooks, isReading, book }) {

	const className = `book group ${isReading ? 'is-reading' : ''}`
	const readingText = isReading ? <Tick /> : <Plus />;

	const imageStyle = {
		backgroundImage: `url(${img})`,
	}

	const handleClick = () => {
		handleReadingBooks(ISBN)
	}

	return (
		<div className={className}>
			<div className='book__wrapper relative'>
				<div className='hidden group-hover:flex group-[.is-reading]:flex absolute top-2 left-2 z-10 w-[30px] h-[30px] items-center justify-center group-hover:bg-bg group-[.is-reading]:bg-accent2 group-[.is-reading]:text-accent rounded cursor-pointer' onClick={handleClick}>{readingText}</div>
				<div className='book__cover relative'>
					<div className='book-cover' style={imageStyle}>
						<div className='effect'></div>
						<div className='light'></div>
					</div>
					<div className='book-inside'>
					</div>
				</div>
				<div className='book__info'>
					<p className='font-serif text-center mt-2 text-xl font-bold'>{title}</p>
					<p className='text-center italic'>{genre}</p>
				</div>
			</div>
		</div >
	)
}