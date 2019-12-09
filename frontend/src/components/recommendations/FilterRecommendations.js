import React from 'react'
import Row from '../common/Row'

function FilterRecommendations({ filterType, filterOnChange, filterTagFieldHandler}) {

  return (
      <form>
        <Row>
          <p>Filter by:</p>
          <label>
          <input type="radio" name="RButton" id="0" value="All" checked={filterType === "All"} onChange={filterOnChange}></input>Show All
          </label>
          <label>
          <input type="radio" name="RButton" id="4" value="BookIsRead" checked={filterType === "BookIsRead"} onChange={filterOnChange}></input>Show Read Books
          </label>
            <label>
          <input type="radio" name="RButton" id="1" value="Tag" checked={filterType === "Tag"} onChange={filterOnChange}></input>Tag
          </label>
        {filterType === "Tag" ? <input type="text" onChange={filterTagFieldHandler} /> : null}
        </Row>
      </form>
  )
}

export default FilterRecommendations
