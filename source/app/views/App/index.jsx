import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue700, blue600, blue500} from 'material-ui/styles/colors';
import NotFound from 'views/NotFound';
import Student from 'views/Student';
import StudentDetails from 'views/StudentDetails';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: blue700,
    primary2Color: blue600,
    primary3Color: blue500,
  },
}, {
  avatar: {
    borderColor: null,
  }
});
export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div className='App'>
                        <Switch>
                            <Route exact path={ '/' } component={ Student } />
                            <Route exact path={ '/:rollNo' } component={ StudentDetails } />
                            <Route path='*' component={ NotFound } />
                        </Switch>
                    </div>
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}
