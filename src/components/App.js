import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import MyProvider from './Provider/MyProvider'
import SurveyList from './surveys/surveyList';
import SurveyCreate from './surveys/SurveyCreate';
import SurveyShow from './surveys/SurveyShow';
import SurveyTake from './surveys/SurveyTake';



class App extends Component {

  onUpdate(data) { this.setState({ data }) }

  render() {
    return (
      <MyProvider>
        <div className=" ui container">
          <BrowserRouter>
            <div>
              <Header />
              <Switch>
                <Route path="/" exact component={SurveyList} />
                <Route path="/survey/create" exact component={SurveyCreate} />
                <Route path="/survey/show/:id" exact component={SurveyShow} />
                <Route path="/:id" exact component={SurveyTake}/>
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </MyProvider>
    );
  }
}

export default App;
