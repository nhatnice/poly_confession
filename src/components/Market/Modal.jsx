import React, {Component} from 'react';
import {IoBagHandleOutline, IoClose, IoCardOutline, IoShapesOutline, IoPricetagsOutline, IoPersonOutline,IoUnlinkOutline} from 'react-icons/io5';
import {API} from '../../functions/API';
import {MEDIA_LINK} from '../../functions/Global';
import Select from 'react-select';

class ProductEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            can_submit: false,
            data: {
                name: null,
                price: null,
                tags: null,
                categories: null,
                descriptions: null,
                image: null,
                link: null,
                user_name: null
            }
        }
    }

    handleSubmitFile = (e) => {
        let data = this.state.data;

        API.upload_file(e.target.files[0], (res) => {
            data["image"] = res.fileName

            this.setState({
                data: data
            })

            if(data["price"] && data["name"] && data["tags"] && data["categories"] && data["descriptions"] && data["image"] && data["link"] && data["user_name"]) {
                this.setState({
                    can_submit: true
                })
            }
        })
    }

    //INPUT ON CHANGE
    handleChangeInput = (e, attr) => {
        let data = this.state.data;
        if(attr === 'categories') {
            data[attr] = e.value;
        }else{
            data[attr] = e.target.value !== "" ? e.target.value : null;
        }

        if(data["price"] && data["name"] && data["tags"] && data["categories"] && data["descriptions"] && data["image"] && data["link"] && data["user_name"]) {
            this.setState({
                can_submit: true
            })
        }

        this.setState({
            data: data
        })
    }

    //SUBMIT PRODUCT
    handleSubmit = (e) => {
        e.preventDefault();
        let data = this.state.data;

        API.post('create_product','', {data: data}, (res) => {
            this.setState({
                can_submit: false,
                data: {
                    name: null,
                    price: null,
                    tags: null,
                    categories: null,
                    descriptions: null,
                    image: null,
                    link: null,
                    user_name: null
                }
            });

            this.props.onSubmit(data);
        })
    }

    render() {
        return (
            <div className="modal form market" style={{display: `${this.props.visible ? 'flex' : 'none'}`}}>
                <button className="close_btn" onClick={this.props.onCloseModal}>Thoát</button>
                <form>
                    <h5>Thêm sản phẩm</h5>
                    <div className="add_image" style={this.state.data.image ? {background: `url(${MEDIA_LINK}${this.state.data.image}) no-repeat center center / cover`} : null}>
                        <label htmlFor="file">{this.state.image ? 'Đổi hình ảnh' : 'Thêm hình ảnh'}</label>
                        <input type="file" id="file" style={{display: 'none'}} onChange={this.handleSubmitFile}/>
                    </div>
                    <div className="box">
                        <div className="textbox">    
                            <IoPersonOutline className="icon"/>
                            <input type="text" onChange={(e) => this.handleChangeInput(e, 'user_name')} ref="user_name" placeholder="Họ tên của bạn"/>
                        </div>
                    </div>
                    <div className="box">
                        <div className="textbox">    
                            <IoUnlinkOutline className="icon"/>
                            <input type="text" onChange={(e) => this.handleChangeInput(e, 'link')} ref="link" placeholder="Link bài viết trên FB / INS"/>
                        </div>
                    </div>
                    <div className="box">
                        <div className="textbox">    
                            <IoBagHandleOutline className="icon"/>
                            <input type="text" onChange={(e) => this.handleChangeInput(e, 'name')} ref="name" placeholder="Tên sản phẩm"/>
                        </div>
                    </div>
                    <div className="box">
                        <div className="textbox">    
                            <IoCardOutline className="icon"/>
                            <input type="number" onChange={(e) => this.handleChangeInput(e, 'price')} ref="price" placeholder="Giá" min="1"/>
                        </div>
                    </div>
                    <div className="box">
                        <Select options={this.props.categories}  onChange={(e) => this.handleChangeInput(e, 'categories')} ref="categories" placeholder="Hạng mục"/>
                    </div>
                    <div className="box">
                        <div className="textbox">    
                            <IoPricetagsOutline className="icon"/>
                            <input type="text" onChange={(e) => this.handleChangeInput(e, 'tags')} ref="tags" placeholder="Thẻ sản phẩm"/>
                        </div>
                    </div>
                    <textarea type="text" onChange={(e) => this.handleChangeInput(e, 'descriptions')} ref="descriptions" placeholder="Mô tả sản phẩm" className="input"></textarea>
                    <div className="box"> 
                        <button className="cancel" onClick={this.props.onCloseModal}>Hủy</button>
                        <button className="pink" onClick={this.handleSubmit} disabled={this.state.can_submit ? '' : 'disabled'}>Thêm</button>
                    </div>
                </form>
            </div>
        )
    }
}

export {
    ProductEditModal
};