import React from 'react'
import './styles.css'
import volantyCar from '../../Assets/volanty-car2.png';

const Backgroundd = () =>{
    return(
        <section className="wrap">
            <img className="car-asset" src={volantyCar} alt="Ilustração de um carro"/>
        </section>
    )
}


export default Backgroundd;