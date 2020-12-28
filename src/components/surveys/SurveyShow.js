import React from 'react';
import MyContext from '../MyContext/MyContext';
import client from "../../apis/surveyapp";


let stateContext = null

class SurveyShow extends React.Component {

    state = { email: "", formID: "", data: {} }

    componentDidMount() {
        this.fetchData(this.props.match.params.id, stateContext.state.email);
    }


    fetchData = async (formID, email) => {
        client.post(`surveyResults`, {
            "formID": formID,
            "email": email
        })
            .then(response => {
                if (response.data.success) {
                    this.setState({ "data": response.data.data[0] })
                } else {
                    console.log(response.data.error)
                }
            });
    }

    renderQuestion = (questions) => {
        return questions.map((qs, idx) => {
            return (<th key={idx} style={{ border: " 1px solid #dddddd", textAlign: "left", padding: "8px" }}>{qs.question}</th>)
        })
    }

    renderAnswer = (answer) => {
        return answer.map((ans, idx) => {
            return (<td key={idx} style={{ border: " 1px solid #dddddd", textAlign: "left", padding: "8px" }}>{ans.answer}</td>)
        })
    }
    renderAnswersRow = (answers) => {
        if (answers)
            return answers.map((answer, idx) => {
                return (
                    <tr key={idx}>
                        {this.renderAnswer(answer)}
                    </tr>
                )
            })
    }
    renderTable = () => {
        if (!this.state.data || !this.state.data.surveyName) return (<h3>Login to continue and load the data from main page.</h3>)
        return (
            <div>
                <h2>{this.state.data.surveyName}</h2>
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <tr style={{ backgroundColor: "#3792cb" }}>
                        {this.renderQuestion(this.state.data.Questions)}
                    </tr>
                    {this.renderAnswersRow(this.state.data.answers)}
                </table>
            </div >
        )
    }

    render() {
        return (
            <MyContext.Consumer>{(context => {

                stateContext = context
                return (
                    <div>
                        {context.state.email !== this.state.email && this.setState({ email: context.state.email })}
                        {this.state.data !== {} && this.renderTable()}
                    </div>)
            })}</MyContext.Consumer>
        );
    }
}
export default SurveyShow;