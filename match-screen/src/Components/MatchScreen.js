import React from 'react'; 
import OtherCards from './OtherCards';
import WebmotorsCard from './WebmotorsCard'
import '../Style/MatchScreen.css'

const MatchScreen = () =>{
    return(
        <div className = "Cards">
            <WebmotorsCard className="webmotors"/>
            <OtherCards className = "localiza" />
            <OtherCards />
        </div>
    )
}

export default MatchScreen;