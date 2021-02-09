import React from 'react';
import classes from '../../UI/Input/Input.css'
const input = ( props ) => {
    let inputElement = null;
  const inputClasses = [classes.Input];
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }
    switch (props.elementType)
    {
        case 'input' :
            inputElement = <input 
             className = {inputClasses.join(' ')} 
             {...props.elementConfig} value={props.value}
            onChange={props.changed} />
            break;
         case 'textarea' :  
            inputElement = <textarea className ={inputClasses.join(' ')} 
            {...props.elementConfig} value={props.value}
           onChange={props.changed} />
            break; 
            case 'select' :
                inputElement=  (
                <select   className ={inputClasses.join(' ')}  
                value={props.value}
               onChange={props.changed} >
                               {props.elementConfig.options.map((opt,index)=>{
                                   return <option key={index}  value={opt.value}>{opt.displayValue}</option>
                               })};
                            </select>);
                break
            default :
            inputElement = <input className={classes.Input}  {...props.elementConfig} value={props.value}/>
             
    }
    return(
        <div className={classes.Input}>
            <label className={classes.label}>{props.label}</label>
            {inputElement}
        </div>
   );
};

export default input;