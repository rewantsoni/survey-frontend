import React from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../MyContext/MyContext'
import client from "../../apis/surveyapp";

class SurveyList extends React.Component {

    state = { data: [], email: '' }


    componentDidUpdate(prevProps, prevState) {
        if (this.state.email !== prevState.email) {
            this.fetchData(this.state.email);
        }
    }
    renderCreate(context) {
        if (context.state.isSignedin) {
            return (
                <div style={{ textAlign: 'right ' }}>
                    <Link to="survey/create" className="ui button primary ">
                        Create Survey
                    </Link>
                </div>
            );
        }

    }

    fetchData = async () => {
        client.post(`mySurveys`, {
            "email": this.state.email
        })
            .then(response => {
                if (response.data.success) {
                    this.setState({ "data": response.data.data })
                } else {
                    console.log(response.data.error)
                }
            });
    }

    renderSurveys() {
        return this.state.data.map(survey => {
            return (
                <div className="item" key={survey.formID}>
                    <div className="right floated content">
                        <div
                            className="ui button"
                            onClick={() => navigator.clipboard.writeText('http://localhost:3000/'.concat(survey.formID))}>
                            Copy Shareable Link
                            </div>
                        <Link className="ui button" to={`/survey/show/${survey.formID}`}>
                            View Results
                        </Link>
                    </div>
                    <div className="middle aligned content">
                        {survey.surveyName}
                    </div>
                </div>)
        })
    }

    renderList(context) {
        if (context.state.isSignedin) {
            if (this.state.email !== context.state.email) this.setState({ "email": context.state.email })
            return (
                <div>
                    <h2>Your Surveys and Polls:</h2>
                    <h3>List of Surveys: </h3>
                    <div className="ui big middle aligned divided list">
                        {this.state.data.length > 0 ? this.renderSurveys() : <div>No Surverys Created Yet.</div>}
                    </div>
                </div>);
        }
        else
            return (
                <div>
                    <h3>Please signIn to view your surveys or create one.</h3>
                </div>
            )
    }


    render() {
        return (
            <MyContext.Consumer>{(context =>
                <div>
                    <div className="ui celled list">
                        {this.renderList(context)}
                        {this.renderCreate(context)}
                    </div>
                </div>
            )}</MyContext.Consumer>
        );
    }
}
export default SurveyList;