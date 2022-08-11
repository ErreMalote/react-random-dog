
import {useEffect,useState } from 'react';
import './App.css';

const processLinks = ( apiResponse ) => {
  const dogsAndBreeds = [];
  const delimiterStart = 'breeds/'
  apiResponse.forEach( url => {
    const startOfName = url.indexOf(delimiterStart) + delimiterStart.length;
    const endOfName = url.indexOf('/', startOfName)
    const name = url.substring(startOfName, endOfName).replace('-', ' ');
    dogsAndBreeds.push({name, url})
  })

  return dogsAndBreeds
}

function App() {
  const [randomDogs, setRandomDogs ] = useState({})
  useEffect ( ()=> {
    fetchData()
  }, [])

  const fetchData = async () => {
    const response = await fetch(`https://dog.ceo/api/breeds/image/random/11`);
    const newData = await response.json();
    setRandomDogs(processLinks(newData.message));
  };
  console.log('random dogs: ', randomDogs)
  return (
    <div className="App">
      { randomDogs.length > 0 &&
        <header className="App-header">
        <img src={randomDogs[0].url} className="App-logo" alt={`${randomDogs[0].name} dog`} />
        <div className='random-dogs-list'>
          {
            randomDogs.slice(1).map( randomDog => (
              // I woudn't recommend using urls as keys in production but for the sake of time...
              <a href={randomDog.url}>
                <div key={randomDog.url} className="dogs-image" >
                <label>{randomDog.name}</label>
                <img src={randomDog.url} alt={randomDog.name} className="inner-image" />
              </div>
              </a>
              
              
            ))
          }
        </div>
      </header>
}
    </div>
  );
}

export default App;
