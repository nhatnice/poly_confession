import React, {Component} from 'react';
import { components } from 'react-select';
import "./global.scss";

class Button extends Component {
    render(){
        const Icon = this.props.icon;
        const Type = this.props.type;

        return(
            <button className="lavenst btn text default">
                {Type !== "submit" ? <Icon className="icon"/> : null} 
                {this.props.children}
                {Type == "submit" ? <Icon className="icon" style={{margin: '0 0 0 8px'}}/> : null} 
            </button>
        )
    }
}

class Grid extends Component {
    render() {
        const direction = this.props.direction == undefined ? 'unset' : this.props.direction;
        const justify = this.props.justify == undefined ? 'unset' : this.props.justify;
        const alignItems = this.props.alignItems == undefined ? 'unset' : this.props.alignItems;

        return(
            <div className={`lavenst grid ${this.props.container ? 'container' : 'item xs-' + this.props.xs} ${this.props.spacing ? `spacing-xs-${this.props.spacing}` : ''}`} style={{flexDirection: `${direction}`, justifyContent: `${justify}`, alignItems: `${alignItems}`}}>
                {this.props.children}
            </div>
        )
    }
}

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked || false
        }
    }

    handleClick = () => {
        this.setState({
            checked: !this.state.checked
        })

        try {
            this.props.onChange(!this.state.checked);
        }catch(e) {

        }
    }

    render() {
        return(
            <div className={`lavenst checkbox ${this.state.checked ? 'checked' : ''} ${this.props.disabled ? 'disabled' : ''}`} onClick={this.handleClick}>
               <svg stroke="currentColor" className="mark" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" class="mark" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="square" stroke-miterlimit="10" stroke-width="44" d="M416 128L192 384l-96-96"></path></svg>
            </div>
        )
    }
}

class CheckboxLabel extends Component {
    render() {
        return(
            <div className="lavenst form_control_label">
                <Checkbox ref="checkbox" onChange={this.props.onChange}/>
                <label onClick={() => this.refs.checkbox.handleClick()}>{this.props.label}</label>
            </div>
        )
    }
}

class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.checked || false
        }
    }

    handleClick = () => {
        this.setState({
            checked: true
        })

        try {
            this.props.onChange(!this.state.checked);
        }catch(e) {

        }
    }

    render() {
        return(
            <label className={`lavenst radio ${this.state.checked ? 'checked' : ''} ${this.props.disabled ? 'disabled' : ''}`} onClick={this.handleClick}>
                <div className="mark"></div>
            </label>
        )
    }
}

//SELECT BOX
class Select extends Component {
    render() {
        return(
            <div className="lavenst select">
                <label>Value</label>
                {this.props.children}
            </div>
        )
    }
}

export {
    Button,
    Grid,
    Checkbox,
    CheckboxLabel,
    Radio,
    Select
}