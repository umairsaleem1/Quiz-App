import React, { useState, useEffect } from 'react';
import './question.css';
import Heading from '../../components/Heading/Heading';
import { useLocation, useHistory } from 'react-router-dom';
import useSound from 'use-sound';
import correct from '../../sounds/correct.mp3';
import wrong from '../../sounds/wrong.mp3';


const Question = ()=>{
    const [questions, setQuestions] = useState([]);
    const [options, setOptions] = useState([]);
    const [optionsNo, setOptionsNo] = useState([]);
    const [questionNo, setQuestionNo] = useState(0);
    const [score, setScore] = useState(0);
 

    const location = useLocation();
    const history = useHistory();
    const {name, category, difficulty} = location.state;
    const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty.toLowerCase()}&type=multiple`;

    const [letsCorrect] = useSound(correct);
    const [letsWrong] = useSound(wrong);

 

    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    useEffect(()=>{
        const fetchQuestions = async ()=>{
            try{
                const response = await fetch(url);
                if(!response.ok){
                    throw new Error(response.status);
                }
                const data = await response.json();
                setQuestions(data.results);
                let answers = data.results[0].incorrect_answers;
                answers.push(data.results[0].correct_answer);
                setOptions(answers);
                let arr = [0,1,2,3];
                shuffle(arr);
                setOptionsNo(arr);

            }catch(e){
                console.log(e);
            }
        }
        fetchQuestions();
    },[url]);


    const handleQuit = ()=>{
        history.push('/');
    }

    const handleNextQuestion = ()=>{
        
        setQuestionNo(questionNo+1);
        let answers = questions[questionNo+1].incorrect_answers;
        answers.push(questions[questionNo+1].correct_answer);
        setOptions(answers);
        let arr = [0,1,2,3];
        shuffle(arr);
        setOptionsNo(arr);
    }
    
    const handleOption = (e)=>{
        e.target.style = 'background: rgb(75, 74, 74); color: white';
        if(e.target.textContent.trim()===questions[questionNo].correct_answer.trim()){
            letsCorrect();
            setTimeout(()=>{
                e.target.style = 'background: green; color: white';
                setTimeout(()=>{
                    e.target.style = 'background: rgb(233, 232, 232); color:black';
                },1000);
            },2000);
            setScore(score+1);
            setScore(score+1);
        }else{
            letsWrong();
            setTimeout(()=>{
                e.target.style = 'background: red; color: white';
                setTimeout(()=>{
                    e.target.style = 'background: rgb(233, 232, 232); color:black';
                },1000);
            },2000);
        }
        
        
    }

    const handleScore = ()=>{
        history.push({
            pathname: '/score',
            state: score
        });
    }
    
    return(
        <div className='main-container'>
            <div className='container'>
                <Heading/>
                <div className='greeting-container'>
                    <div className='greeting'><i>Welcome, {name} </i></div>
                </div>
                {
                    questions.length>0
                    ?
                    <>
                        <div className='category-and-score'>
                        <p><b>Category: </b> {questions[0].category} </p>
                        <p><b>Score: </b> {score} </p>
                        </div>
                        <h1 className='question-no'>Question {questionNo+1}:</h1>
                        <div className='question-container'>
                            <h1 className='question'> {questions[questionNo].question} </h1>
                            <div className='options-container'>
                                <div className='option' onClick={handleOption} > {options[optionsNo[0]]} </div>
                                <div className='option' onClick={handleOption} > {options[optionsNo[1]]} </div>
                                <div className='option' onClick={handleOption} > {options[optionsNo[2]]} </div>
                                <div className='option' onClick={handleOption} > {options[optionsNo[3]]} </div>
                            </div>
                            <div className='question-btns'>
                                <button className='quit-btn' onClick={handleQuit} >Quit</button>
                                {
                                    questionNo+1===10
                                    ?
                                    <button className='get-score-btn' onClick={handleScore}>Get Score</button>
                                    :
                                    <button className='next-question-btn' onClick={handleNextQuestion} >Next Question</button>
                                }
                                
                                
                            </div>
                        </div>
                    </>
                    :
                    <div className='loader-container'>
                        <p>loading...</p>
                        <div className='loader'></div>
                    </div>
                    
                }
                
                
            </div>
        </div>
    );
}

export default Question;