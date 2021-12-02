import React, { useState } from 'react';
import '../comingsoon.css';
import {quizData} from "../components/TriviaData";
function Trivia() {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [options, setOptions] = useState([]);
    const [disabled, setDisabled] = useState(true);
    return (
        <div className="app-wrapper">
            <div>
                <div className="question-section-wrapper">
                    <div className="question-count">
                        question {current +1}
                    </div>
                    <div className="question">
                        
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default Trivia
