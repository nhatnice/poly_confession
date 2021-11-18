import React, {Component} from 'react'
import './styles.scss';
import { BsChevronLeft } from 'react-icons/bs';
import {IoMenu, IoSearch, IoClose} from 'react-icons/io5';
import {AiOutlineMenu} from 'react-icons/ai';

class Header extends Component {
    constructor(props) {
        super(props);
    }

    goBack = (This) => {
        This.props.history.goBack();
    }

    render() {
        return(
            <div className="header_container">
                <button className="backBtn" onClick={() => this.goBack(this.props.HistoryParent)}><BsChevronLeft className="icon"/></button>
                <h1>{this.props.title}</h1>
            </div>
        )
    }
}

class DefaultHeader extends Component {
    render() {
        return(
            <div className="header">
                <div className="menu_button" onClick={this.props.onOpenSideBar}>
                    <AiOutlineMenu className="icon"/>
                </div>
                <div className="search_box">
                    <IoSearch className="icon" onClick={() => this.props.onSearch(this.refs.searchbox.value)}/>
                    <input type="text" placeholder="Tìm kiếm..." ref="searchbox" onKeyDown={(e) => {if (e.key === 'Enter') this.props.onSearch(e.target.value)} }/>
                    <IoClose className="icon close" onClick={() => this.refs.searchbox.value = ""}/>
                </div>
            </div>
        )
    }
}

export {
    Header,
    DefaultHeader
}