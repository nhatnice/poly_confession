import {React, Component} from 'react';
import {Redirect} from 'react-router-dom';

class RedirectView extends Component {
    constructor(props) {
        super(props);
        window.location.hash.replace("#/redirect/","");
    }

    render() {
        console.log(window.location.hash.replace("#/redirect/",""));
        return null;
    }
}

export default RedirectView;