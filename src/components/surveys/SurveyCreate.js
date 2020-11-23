import React from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../MyContext/MyContext'
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import client from "../../apis/createSurvey";

function SurveyCreate() {
    const [indexes, setIndexes] = React.useState([]);
    const [counter, setCounter] = React.useState(0);
    const [surveyName, setSurveyName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const { register, handleSubmit } = useForm();


    //Check the warning
    //to submit the survey form
    const onSubmit = data => {

        data.email = email
        data.surveyName = surveyName
        console.log(data);
        client.post('/createSurvey', {
            data
        }).then(function (response) {
            console.log(response);
        })
    };

    //add questions to the survey form
    const addQuesstion = () => {
        setIndexes(prevIndexes => [...prevIndexes, counter]);
        setCounter(prevCounter => prevCounter + 1);
    };

    //remove questions from the ssurvey form
    const removeQuestion = index => () => {
        setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
        setCounter(prevCounter => prevCounter - 1);
    };

    //clear all questions from survey form
    const clearQuestions = () => {
        setCounter(prevCounter => prevCounter = 0)
        setIndexes([]);
    };


    ////TODO: move the questions up and down
    ////TODO: do validation check before you submit the form
    ////TODO: add different types of question

    //create the survey form
    const createSurvey = (context) => {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Survey Name:
                        <input
                        type="text"
                        onChange={e => setSurveyName(e.target.value)}
                        name='surveyName'
                        ref={register}
                    />
                </label>
                {setEmail(context.state.email)}
                {indexes.map(index => {
                    let fieldName = `Questions[${index}]`;
                    return (
                        <fieldset name={fieldName} key={fieldName}>
                            <label>
                                Question:
                            <input
                                    type="text"
                                    name={`${fieldName}.question`}
                                    ref={register}
                                />
                            </label>
                            <button type="button" onClick={removeQuestion(index)}>
                                Remove
                        </button>
                        </fieldset>
                    );
                })}

                <button type="button" onClick={addQuesstion}>
                    Add Question
            </button>
                <button type="button" onClick={clearQuestions}>
                    Clear All Questions
            </button>
                <input type="submit" />
            </form>);
    }


    //Prompt if not logged in
    const renderLogin = () => {
        return (<div>Please login to create</div>);
    }

    //rendering the page components
    const renderCreate = (context) => {
        console.log(context)
        if (context.state.isSignedin) {
            return createSurvey(context);
        } else {
            console.log(context)
            return renderLogin();
        }
    }

    
    return (
        <MyContext.Consumer>{(context => { return renderCreate(context) }
        )}</MyContext.Consumer>
    );
}

export default SurveyCreate;