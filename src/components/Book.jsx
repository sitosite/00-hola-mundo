import React, { useEffect, useState } from 'react'
import { Plus } from './Plus.jsx'
import { Tick } from './Tick.jsx'

export function Book({ img, title, genre, handleIsReadingChange }) {
	const [isReading, setIsReading] = useState(false)

	const handleClick = () => {
		const newIsReadingState = !isReading;
		setIsReading(newIsReadingState);
		handleIsReadingChange(newIsReadingState);
	}

	const reading = isReading ? 'book group is-reading' : 'book group';
	const readingText = isReading ? <Tick /> : <Plus />;

	const imageStyle = {
		backgroundImage: `url(${img})`,
	}

	return (
		<div className={reading}>
			<div className="book__wrapper relative cursor-pointer" onClick={handleClick}>
				<div className="hidden group-hover:flex group-[.is-reading]:flex absolute top-2 left-2 z-10 w-[30px] h-[30px] items-center justify-center group-hover:bg-bg group-[.is-reading]:bg-accent rounded">{readingText}</div>
				<div className="book__cover relative">
					<div class="book-cover" style={imageStyle}>
						<div class="effect"></div>
						<div class="light"></div>
					</div>
					<div class="book-inside">
					</div>
				</div>
				<div className="book__info">
					<p className='font-serif text-center mt-2 text-xl font-bold'>{title}</p>
					<p className='text-center italic'>{genre}</p>
				</div>
			</div>
		</div >
	)
}