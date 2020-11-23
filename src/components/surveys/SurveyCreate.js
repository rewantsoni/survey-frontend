import React from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../MyContext/MyContext'
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

function SurveyCreate() {
    const [indexes, setIndexes] = React.useState([]);
    const [counter, setCounter] = React.useState(0);
    const { register, handleSubmit } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    const addQuesstion = () => {
        setIndexes(prevIndexes => [...prevIndexes, counter]);
        setCounter(prevCounter => prevCounter + 1);
    };


    const removeQuestion = index => () => {
        setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
        setCounter(prevCounter => prevCounter - 1);
    };

    const clearQuestions = () => {
        setCounter(prevCounter => prevCounter = 0)
        setIndexes([]);
    };


    const createSurvey = () => {
        return (<form onSubmit={handleSubmit(onSubmit)}>
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

    const renderLogin = () => {
        return (<div>Please login to create</div>);
    }

    const renderCreate = (context) => {
        console.log(context)
        if (context.state.isSignedin) {
            return createSurvey();
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