import React from 'react';
import client from "../../apis/surveyapp";



class SurveyTake extends React.Component {

    state = { data: {}, answers: [{ 'answer': '' }] }

    componentDidMount() {
        this.fetchData()

    }

    fetchData = async () => {
        client.get(`/survey${this.props.match.url}`)
            .then(response => {
                if (response.data.success) {
                    this.setState({ "data": response.data.data })
                } else {
                    console.log(response.data.error)
                }
            });
    }


    //close or navigate to other page
    handleSubmit = e => {
        // e.preventDefault();
        client.post(`/answerSurvey`, {
            "formID": `${this.state.data.formID}`,
            "answers": [...this.state.answers]
        }).then(function (response) {
            console.log(response.data.success)
            alert('Survey has been Completed.')
            window.location.replace("http://localhost:3000/")
        })
    }

    handleChange = idx => evt => {
        let newAns = this.state.answers;
        if (idx > this.state.answers.length - 1) {
            newAns = [...this.state.answers, { 'answer': evt.target.value }]
        } else {
            newAns = this.state.answers.map((ans, sidx) => {
                if (idx !== sidx) return ans;
                return { ...ans, answer: evt.target.value };
            });
        }


        this.setState({ answers: newAns });
    };


    renderQuestions = () => {
        return this.state.data.Questions.map((question, index) => {
            return (
                <div key={index}>
                    <div className="field">
                        <label>{question.question}</label>
                        <input
                            type="text"
                            name={question.question}
                            value={question.answer}
                            onChange={this.handleChange(index)}
                            placeholder="Enter Your Answer" required/>
                    </div>
                </div>
            )
        })
    }

    render() {
        if (!this.state.data || !this.state.data.surveyName) {
            return <div>Loading...</div>
        } else {
            return (
                <div >
                    <h1>{this.state.data.surveyName}</h1>
                    <form className="ui form">
                        {this.renderQuestions()}
                        <br />
                        <button className="ui button" type="submit" onClick={this.handleSubmit}>Submit</button>
                    </form>
                </div>
            );
        }
    }
};

export default SurveyTake;