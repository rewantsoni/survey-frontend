import React from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../MyContext/MyContext'
class SurveyList extends React.Component {

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

    ////TODO:
    renderList() {
        return <div>List of surveys ----- </div>
    }


    render() {
        return (
            <MyContext.Consumer>{(context =>
                <div>
                    <h2>Your Surveys and Polls:</h2>
                    {/* <p>{context.state}</p> */}
                    {console.log(context.state)}
                    <div className="ui celled list">
                        {this.renderList()}
                        {this.renderCreate(context)}
                    </div>
                </div>
            )}</MyContext.Consumer>
        );
    }
}
export default SurveyList;