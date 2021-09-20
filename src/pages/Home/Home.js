import React, { useState, useEffect } from 'react';
import './home.css';
import Heading from '../../components/Heading/Heading';
import { useHistory } from 'react-router-dom';
import useSound from 'use-sound';
import play from '../../sounds/play.mp3';

const Home = ()=>{
    const [categories, setCategories] = useState([]);
    const [userSettings, setUserSettings] = useState({name:'', category:'select category', difficulty:'select difficulty'});
    const [error, setError] = useState(false);
    const history = useHistory();
    const [letsPlay] = useSound(play);

    useEffect(()=>{
        const fetchCategories = async ()=>{
            try{
                const response = await fetch('https://opentdb.com/api_category.php');
                if(!response.ok){
                    throw new Error(response.status);
                }
                const data = await response.json();
                setCategories(data.trivia_categories);
            }catch(e){
                console.log(e);
            }
        }
        fetchCategories();
    },[]);

    const handleChange = (e)=>{
        setUserSettings({...userSettings, [e.target.name]:e.target.value});
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const {name, category, difficulty} = userSettings;
        if(name.length>0 && category!=='select category' && difficulty!=='select difficulty'){
            setError(false);
            // console.log(userSettings);
            history.push({
                pathname: '/question',
                state: userSettings
            });
        }else{
            setError(true);
            setTimeout(()=>{
                setError(false);
            },2000);
        }
        letsPlay();
    }

    return(
        <div className='main-container'>
            <div className='container'>
                <Heading/>
                {/* { */}
                <div className='quiz-form-container'>
                    <div className='form-container'>
                        <h1>Quiz Settings</h1>
                        {error && <h1 className='error-message'>Please Fill All The Fields</h1>}
                        <form onSubmit={handleSubmit} >
                            <input type='text' placeholder='Enter Your Name' onChange={handleChange} value={userSettings.name} name='name'/>
                            <select onChange={handleChange} name='category'>
                                <option hidden defaultValue='select category'>Select Category</option>
                                {
                                    categories.length>0
                                    ?
                                    categories.map((item)=>{
                                        return <option value={item.id} key={item.id}> {item.name} </option>
                                    })
                                    :
                                    null
                                }
                            </select>
                            <select onChange={handleChange} name='difficulty'>
                                <option hidden defaultValue='select difficulty'>Select Difficulty</option>
                                <option value='Easy'>Easy</option>
                                <option value='Medium'>Medium</option>
                                <option value='Hard'>Hard</option>
                            </select>
                            <button type='submit' className='start-quiz-btn'>Start Quiz</button>
                        </form>
                    </div>
                    <div className='quiz-image-container'>
                        <img src='images/quiz.svg' alt='' />
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default Home;