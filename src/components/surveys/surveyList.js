import React from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../MyContext/MyContext'
class SurveyList extends React.Component {

    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">
                        Delete
                    </Link>
                </div>
            );
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