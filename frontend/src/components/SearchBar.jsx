import React from 'react'

const SearchBar = ({placeholder, data}) => {
  return (
    <div className='search'>
      <div className='search-inputs'>
        <input className='form-control' type='text' placeholder={placeholder} />
        <div className='search-icon'></div>
      </div>
    </div>
  )
}

export default SearchBar