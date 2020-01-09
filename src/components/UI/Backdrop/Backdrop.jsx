import React from 'react';
import style from './Backdrop.module.css';

const backdrop = (props) => {
    return ( 
        props.show ? <div className={style.Backdrop}
        onClick={props.clicked}
        ></div> : null
     );
}
 
export default backdrop;