import React from "react";
import {
    Switch,
    Route,
    Link
} from "react-router-dom";


import TicTacToeGame from './TicTacToeGame';
import SnakeGame from './SnakeGame';

export default () => {
    return (
        <div className={'ilc-learning-react'}>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/tictactoe">Tic-Tac-Toe game</Link>
                    </li>
                    <li>
                        <Link to="/snake">Snake game</Link>
                    </li>
                    <li>
                        <a href="http://demo.microfrontends.online/news/">Demo News app (link to another app)</a>
                    </li>
                </ul>
            </nav>

            <Switch>
                <Route path="/tictactoe">
                    <TicTacToeGame />
                </Route>
                <Route path="/snake">
                    <SnakeGame />
                </Route>
                <Route path="/">
                    Please select one of the links from above.
                </Route>
            </Switch>
        </div>
    );
}