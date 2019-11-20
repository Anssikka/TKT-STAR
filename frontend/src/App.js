import React from "react";
import AddBookForm from "./components/addRecommendation"
import createBook from "./services/communicator"

const App = ( props ) =>  {

  return (
    <div>
      <h1>Books</h1>
      <AddBookForm createBook={ createBook }/>
    </div>
  );
}

export default App