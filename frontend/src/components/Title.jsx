import React from 'react'

const Title = ({font, title, desc}) => {
  return (
    <div className='flex flex-col gap-2 '>
        <h1 className={`text-4xl ${font ? "Outlook font-semibold" : "text-gray-900 font-playfair font-bold " }  `}>{title}</h1>
        <p className='text-gray-500 '>{desc}</p>
    </div>
  )
}

export default Title
