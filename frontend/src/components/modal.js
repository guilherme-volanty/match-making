import React , {useState} from 'react';
import Modal from 'react-modal'

function Modall(){

    const [modalIsOpen, setModalIsOpen] = useState(false)
    return(
        <div className='Modal'>
            <button onClick={()=>setModalIsOpen(true)}>Open modal</button>
            <Modal isOpen={modalIsOpen}>
                <h2>Modal Title</h2>
                <p>Modal Body</p>
                <div>
                    <button onClick={()=>setModalIsOpen(false)}>Close</button>
                </div>
            </Modal>
        </div>


    )
}

export default Modall;