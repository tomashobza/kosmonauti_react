import React from 'react';

function Row(props) {

    const rows = Object.keys(props.data).map((key, i) => 
        <td key={i}>{props.data[key]}</td>
    )

    return (
        <tr>
        <td>{props.id}</td>
        {rows}
        <td>
            <button onClick={props.deleteItem}>x</button>
        </td>
    </tr>
    );
}

export default Row;