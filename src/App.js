import React, { useState, useEffect } from 'react';
import './App.css';
import Dialog from './Dialog.js';
import Row from './Row.js';

function App() {
  const [isOpen, setOpen] = useState(false);
  const [cosmonauts, setCosmonauts] = useState([]);
  
  
  useEffect(() => { getCosmonauts() }, []);
  
  const getCosmonauts = async () => {
    const res = await fetch(`http://${window.location.hostname}:8000/get_cosmonauts`);
    const data = await res.json();
    setCosmonauts(data);
  };

  const deleteCosmonaut = (id) => {

    fetch(`http://${window.location.hostname}:8000/delete_cosmonaut`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      getCosmonauts();
    })
    .catch((error) => {
      console.error('Error:', error);
    });         
  };


  return (
    <div >
      <button onClick={() => setOpen(!isOpen)}>Přidat kosmonauta</button>
      <Dialog isOpen={isOpen} onClose={() => setOpen(!isOpen)}/>
      <table>
        <tbody>
          <tr>
            <th className='bg'>id</th>
            <th>Jméno</th>
            <th>Příjmení</th>
            <th>Datum narození</th>
            <th colSpan="2">Superschopnost</th>
          </tr>
          {cosmonauts.map((el, i) =>
        <Row id={i} data={el} key={i} deleteItem={() => deleteCosmonaut(i)} />
          )}
          </tbody>
      </table>
    </div>
  );
}

export default App;
