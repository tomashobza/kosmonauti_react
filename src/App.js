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

  const deleteCosmonaut = async (id) => {
    try {
      const res = await fetch(`http://${window.location.hostname}:8000/delete_cosmonaut`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      getCosmonauts(); 
    } catch (err) {
      throw err;
    }
  };

  const addCosmonaut = async () => {
    let data = {};
    let ready = true;
    [...document.querySelectorAll('#popupDialog input')].forEach((e) => {
      if (e.value) {
        e.classList.remove('valueIncorrect');
        data[e.id]=e.value;
      } else {
        ready = false;
        e.classList.add('valueIncorrect');
      }
    });
    if (ready) {
      try {
        const res = await fetch(`http://${window.location.hostname}:8000/add_cosmonaut`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        const resData = await res.json();
        console.log(resData);
        setOpen(!isOpen);
        getCosmonauts(); 
      } catch (err) {
        throw err;
      }
    }
  };


  return (
    <div >
      <button onClick={() => setOpen(!isOpen)}>Přidat kosmonauta</button>
      <Dialog isOpen={isOpen} onClose={() => setOpen(!isOpen)} handleAddCosmonaut={() => addCosmonaut()}/>
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
