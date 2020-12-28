import React from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../MyContext/MyContext'
import { useForm } from "react-hook-form";
import client from "../../apis/surveyapp";

function SurveyCreate() {
    const [indexes, setIndexes] = React.useState([]);
    const [counter, setCounter] = React.useState(0);
    const [surveyName, setSurveyName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const { register, handleSubmit } = useForm();
    const history = useHistory();

    //Check the warning to submit the survey form
    const onSubmit = data => {

        data.email = email
        data.surveyName = surveyName
        client.post('/createSurvey', data).then(function (response) {
            var id = response.data.data
            console.log(id.substring(id.length - 8));
            var copyText = 'http://localhost:3000/'.concat(id.substring(id.length - 8))
            navigator.clipboard.writeText(copyText).then(function () {
                alert('Link has been copied to clipboard.')
            }, function () {
                alert('Unable copied to clipboard.')
            });
            console.log(response);
            history.push('/');
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
            <form onSubmit={handleSubmit(onSubmit)} className="ui form">
                <div className="field">
                    <label>Survey Name:
                        <input
                            type="text"
                            onChange={e => setSurveyName(e.target.value)}
                            name='surveyName'
                            ref={register({ required: true })}
                        />
                    </label>
                    {setEmail(context.state.email)}
                </div>

                {indexes.map(index => {
                    let fieldName = `Questions[${index}]`;
                    return (
                        <div name={fieldName} key={fieldName} className="field">
                            <label>
                                Question:
                            <input
                                    type="text"
                                    name={`${fieldName}.question`}
                                    ref={register({ required: true })}
                                />
                            </label>
                            <button type="button" onClick={removeQuestion(index)} className="ui button negative">
                                Remove
                            </button>
                        </div>
                    );
                })}

                <button type="button" onClick={addQuesstion} className="ui button">
                    Add Question
                </button>

                <button type="button" onClick={clearQuestions} className="ui button negative">
                    Clear All Questions
                </button>

                <input type="submit" className="ui button primary" />

            </form>);
    }


    //Prompt if not logged in
    const renderLogin = () => {
        return (<h3>Please login to create a survey.</h3>);
    }

    //rendering the page components
    const renderCreate = (context) => {
        return context.state.isSignedin ? createSurvey(context) : renderLogin();
    }


    return (
        <MyContext.Consumer>{(context => { return renderCreate(context) }
        )}</MyContext.Consumer>
    );
}

export default SurveyCreate;