import React from 'react';
import client from "../../apis/surveyapp";



class SurveyTake extends React.Component {

    state = { data: {} }

    componentDidMount() {
        this.fetchData()

    }

    fetchData = async () => {
        console.log(this.props)
        client.get(`/survey${this.props.match.url}`)
            .then(response => {
                if (response.data.success) {
                    this.setState({ "data": response.data.data })
                    console.log(response.data.data)
                } else {
                    console.log(response.data.error)
                }
            });
    }


    render() {
        if (!this.state.data) {
            return <div>Loading...</div>
        }
        return (
            <div >
                <h1>{this.state.data.surveyName}</h1>
                {/* <h5>{this.state}</h5> */}
            </div>
        );
    }
};

export default SurveyTake;