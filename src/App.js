import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [answers, setAnswers] = useState({
    question1: '',
    question2: '',
    question3: ''
  });
  const [result, setResult] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value
    });
  };

  const calculateResult = () => {
    const scores = {
      exploring: 0,
      relaxing: 0,
      creating: 0,
      competing: 0,
      mountains: 0,
      beach: 0,
      city: 0,
      countryside: 0,
      adventure: 0,
      avoid: 0,
      solve: 0,
      conquer: 0
    };

    for (const answer of Object.values(answers)) {
      scores[answer]++;
    }

    const maxScore = Math.max(...Object.values(scores));
    const spiritAnimal = Object.keys(scores).find(key => scores[key] === maxScore);

    const spiritAnimals = {
      exploring: 'Eagle',
      relaxing: 'Cat',
      creating: 'Fox',
      competing: 'Lion',
      mountains: 'Mountain Goat',
      beach: 'Dolphin',
      city: 'Raven',
      countryside: 'Deer',
      adventure: 'Tiger',
      avoid: 'Turtle',
      solve: 'Owl',
      conquer: 'Bear'
    };

    setResult(spiritAnimals[spiritAnimal] || 'Unknown');
    setSubmitted(true);

    // Set a delay before starting the fade-out
    setTimeout(() => {
      setFadeOut(true);
    }, 3000); // Change 3000ms to how long you want the result to be visible
  };

  const handleTakeQuizAgain = () => {
    setSubmitted(false);
    setFadeOut(false);
    setAnswers({
      question1: '',
      question2: '',
      question3: ''
    });
  };

  return (
    <div className={`container ${fadeOut ? 'fade-out' : ''}`}>
      <h1>Find Your Spirit Animal</h1>
      {!submitted ? (
        <form className="quiz-form">
          <div className="question">
            <label htmlFor="question1">What is your favorite activity?</label>
            <select id="question1" name="question1" value={answers.question1} onChange={handleChange}>
              <option value="">Select</option>
              <option value="exploring">Exploring</option>
              <option value="relaxing">Relaxing</option>
              <option value="creating">Creating</option>
              <option value="competing">Competing</option>
            </select>
          </div>

          <div className="question">
            <label htmlFor="question2">What is your ideal vacation?</label>
            <select id="question2" name="question2" value={answers.question2} onChange={handleChange}>
              <option value="">Select</option>
              <option value="mountains">Mountains</option>
              <option value="beach">Beach</option>
              <option value="city">City</option>
              <option value="countryside">Countryside</option>
            </select>
          </div>

          <div className="question">
            <label htmlFor="question3">How do you handle challenges?</label>
            <select id="question3" name="question3" value={answers.question3} onChange={handleChange}>
              <option value="">Select</option>
              <option value="adventure">Embrace them as adventures</option>
              <option value="avoid">Avoid them if possible</option>
              <option value="solve">Solve them logically</option>
              <option value="conquer">Conquer them head-on</option>
            </select>
          </div>

          <button type="button" onClick={calculateResult}>Find My Spirit Animal</button>
        </form>
      ) : (
        <div className={`result ${submitted ? 'fade-in' : ''}`}>
          <h2>Your Spirit Animal is:</h2>
          <div className="result-animal">{result}</div>
          <button onClick={handleTakeQuizAgain}>Take the Quiz Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
