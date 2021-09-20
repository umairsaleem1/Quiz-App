import React from 'react';
import Heading from '../../components/Heading/Heading';
import './score.css';
import { useLocation, useHistory } from 'react-router-dom';

const Score = ()=>{
    const location = useLocation();
    const score = location.state;

    const history = useHistory();

    const handleHomePage = ()=>{
        history.push('/');
    }
    return(
        <div className='main-container-score'>
            <div className='container'>
                <Heading/>
                <h1 className='score'>final score : {score}</h1>
                <div className='back-btn-container'>
                    <button className='backhome-btn' onClick={handleHomePage}>HomePage</button>
                </div>
                
            </div>
        </div>
    );
}

export default Score;