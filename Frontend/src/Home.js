import React from 'react'

const Home = () => {

    const No = () => {
        console.log('No function called');
        // Add your functionality here
      };


  return (
    <>
    <div>
      <h1>This Is a Heading</h1>
    </div>

    <div>
    <button id='Menu1' onClick={No}>Menu 1</button>
    <button id='Menu2' onClick={No}>Menu 2</button>
    <button id='Menu3' onClick={No}>Menu 3</button>

    </div>
    </>
  )
}

export default Home
