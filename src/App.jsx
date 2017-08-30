import React, {Component} from 'react';

import Submission from './Submission'
import {state} from './state.js';

import './css/app.css'
import './css/general.css'
import './css/formStyle.css'
import './css/modal.css'

//599debb9aa44810760da12e4 599de853aa44810760da12de 599f971e4ed71d1696bfd5fe

class App extends Component {
    constructor(props){
        super(props);
        this.state = state
    }
    render() {
        return (
            <div>
                <Submission
                    submission={this.state.submissionByID['599f971e4ed71d1696bfd5fe']}
                    submissionID='599f971e4ed71d1696bfd5fe'
                    isLoading={false}/>
            </div>
        )
    }
}

export default App;