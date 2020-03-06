import React from 'react';

function Dialog(props) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '400px',
        height: '300px',
        marginTop: '-150px',
        marginLeft: '-200px',
        zIndex: '10',
        background: 'white',
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.418)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    };

    return (
        <div>
            {props.isOpen? 
            <div style={style}>
                Hello
                <button onClick={props.onClose}>Zavřít</button>
            </div> 
            : null}
        </div>
    );
}

export default Dialog;