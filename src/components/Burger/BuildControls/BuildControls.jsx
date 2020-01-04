import React from 'react';
import styles from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label: 'Salad', type:'salad'},
    { label: 'Bacon', type:'bacon'},
    { label: 'Meat', type:'meat'},
    { label: 'Cheese', type:'cheese'}
];

const buildControls = (props) => {
    return ( 
        <div className={styles.BuildControls}>
            {controls.map(ctrl =>(
                <BuildControl key={ctrl.label} label={ctrl.label} 
                added={()=>props.ingredientAdded(ctrl.type)}
                removed={()=>props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>
            ))}
        </div>
     );
}
 
export default buildControls;