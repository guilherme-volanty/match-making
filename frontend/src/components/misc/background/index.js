import React from 'react'
import './styles.css'
import volantyCar from '../../../assets/volanty-car2.png';

const Background = () =>{
    return(
        <section className="wrap">
            <img className="car-asset" src={volantyCar} alt="Ilustração de um carro"/>
        </section>
    )
}


export default Background;