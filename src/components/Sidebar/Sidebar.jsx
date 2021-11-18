import React, {Component} from 'react';
import {IoSearch,IoClose, IoGridOutline ,IoGameControllerOutline, IoCarSportOutline, IoColorPaletteOutline, IoHeartCircleOutline,IoHeadsetOutline, IoFastFoodOutline, IoShirtOutline,IoBasketOutline, IoStorefrontOutline, IoPersonOutline, IoBookmarkOutline, IoBagAddOutline} from 'react-icons/io5';
import {Link} from 'react-router-dom';

import "./styles.scss";

function changeSidebarStatus(page, ele) {
    ele.setState({active: page});
    ele.props.onCloseSideBar();
} 

/*
<li className={this.state.active === 'market/profile' ? 'menu-link active' : 'menu-link'} onClick={() => {changeSidebarStatus('market/profile', this)}}><Link to="/market/profile"><IoPersonOutline className="icon"/>Tài khoản của tôi</Link></li>
<li className={this.state.active === 'market/cart' ? 'menu-link active' : 'menu-link'} onClick={() => {changeSidebarStatus('market/cart', this)}}><Link to="/market/cart"><IoBasketOutline className="icon"/>Giỏ hàng</Link></li>
<li className={this.state.active === 'market/saved' ? 'menu-link active' : 'menu-link'} onClick={() => {changeSidebarStatus('market/saved', this)}}><Link to="/market/saved"><IoBookmarkOutline className="icon"/>Đã lưu</Link></li> */

class MarketSidebar extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        active: window.location.hash.replace("#","").replace("/","")
      }
    }

    render() {
        return(
            <div className={`${this.props.visible ? "sidebar market show" : "sidebar market"}`}>
                <h1>Laven Market</h1>
                
                <div className="searchbox input">
                    <IoSearch className="icon" onClick={() => this.props.onSearch(this.refs.searchbox.value)}/>
                    <input type="text" placeholder="Tìm kiếm..." ref="searchbox" onKeyDown={(e) => {if (e.key === 'Enter') this.props.onSearch(e.target.value)} }/>
                    <IoClose className="icon close" onClick={() => this.refs.searchbox.value = ""}/>
                </div>

                <div className="close_btn" onClick={this.props.onCloseSideBar}><IoClose className="icon"/></div>
                <ul>
                    <li className={this.state.active === 'market/all' ? 'menu-link active' : 'menu-link'} onClick={() => {changeSidebarStatus('market/all', this)}}><Link to="/market/all"><IoStorefrontOutline className="icon"/>Xem tất cả</Link></li>
                </ul>
                <button className="pink" onClick={this.props.onCreate}><IoBagAddOutline className="icon"/>Thêm sản phẩm</button>

                <hr/>

                <ul>
                    <span>Hạng mục</span>
                    <li className={this.state.active === 'market/fashion' ? 'menu-link active' : 'menu-link'} onClick={() => {changeSidebarStatus('market/fashion', this)}}><Link to="/market/fashion"><IoShirtOutline className="icon"/>Thời trang</Link></li>
                    <li className={this.state.active === 'market/foods' ? 'menu-link active' : 'menu-link'} onClick={() => {changeSidebarStatus('market/foods', this)}}><Link to="/market/foods"><IoFastFoodOutline className="icon"/>Ăn uống</Link></li>
                    <li className={this.state.active === 'market/tech' ? 'menu-link active' : 'menu-link'} onClick={() => {changeSidebarStatus('market/tech', this)}}><Link to="/market/tech"><IoHeadsetOutline className="icon"/>Đồ điện tử</Link></li>
                    <li className={this.state.active === 'market/life' ? 'menu-link active' : 'menu-link'} onClick={() => {changeSidebarStatus('market/life', this)}}><Link to="/market/life"><IoHeartCircleOutline className="icon"/>Sức khỏe & Đời sống</Link></li>
                    <li className={this.state.active === 'market/games' ? 'menu-link active' : 'menu-link'} onClick={() => {changeSidebarStatus('market/games', this)}}><Link to="/market/games"><IoGameControllerOutline className="icon"/>Đồ chơi</Link></li>
                    <li className={this.state.active === 'market/stationery' ? 'menu-link active' : 'menu-link'} onClick={() => {changeSidebarStatus('market/stationery', this)}}><Link to="/market/stationery"><IoColorPaletteOutline className="icon"/>Văn phòng phẩm</Link></li>
                    <li className={this.state.active === 'market/vehicles' ? 'menu-link active' : 'menu-link'} onClick={() => {changeSidebarStatus('market/vehicles', this)}}><Link to="/market/vehicles"><IoCarSportOutline className="icon"/>Xe cộ</Link></li>
                    <li className={this.state.active === 'market/another' ? 'menu-link active' : 'menu-link'} onClick={() => {changeSidebarStatus('market/another', this)}}><Link to="/market/another"><IoGridOutline className="icon"/>Khác</Link></li>
                </ul>
            </div>
        )
    }
}

export {
    MarketSidebar
}