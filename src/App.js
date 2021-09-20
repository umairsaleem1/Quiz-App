import React from 'react';
import Home from './pages/Home/Home';
import Question from './pages/Question/Question';
import Score from './pages/Score/Score';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = ()=>{
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/question' component={Question} />
                <Route path='/score' component={Score} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;