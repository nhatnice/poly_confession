import React, {Component} from 'react';
import {Select} from '../components/Laven';
import {IoFolder} from 'react-icons/io5';

class Paper extends Component {
    render() {
        return(
            <div className="card">{this.props.children}</div>
        )
    }
}

class Test extends Component {
    render() {
        return(
            <div style={{width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Select>
                    
                </Select>
            </div>
        )
    }
}

export default Test;