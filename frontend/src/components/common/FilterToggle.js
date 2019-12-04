import React from 'react'
import Toggle from './Toggle'

function FilterToggle({ filterText, resetText, isFiltered, handleFilter }) {
  const text = isFiltered ? resetText : filterText
  const className = `button toggle ${isFiltered ? 'filtered' : ''}`

  return <Toggle text={text} handleToggle={handleFilter} className={className} />
}

export default FilterToggle
