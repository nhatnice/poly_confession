import React, {Component} from 'react';
import {MarketPostForm} from '../components/Market/Market_Components';
import {MarketSidebar} from '../components/Sidebar/Sidebar';
import {Meta} from '../components/Meta/Meta';
import {SectionBanner, SectionHeader, SectionCategories} from '../components/Sections/Sections';
import {ProductCard} from '../components/Cards/Cards';
import {ProductEditModal} from '../components/Market/Modal';
import {API} from '../functions/API';
import {DefaultHeader} from '../components/Header/Header';
import {removeVietnameseTones} from '../functions/Global';

const categories = [{
    title: 'Thời trang',
    image: 'https://coveteur.com/wp-content/uploads/2019/12/PCL_MFWAW18_Day1_Image-18-2010s-fashion-trends-decade-homepage-1280x720.jpg',
    text: 'Blazer, Moschino, ...',
    link: '/market/fashion'
},{
    title: 'Đồ điện tử',
    image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/macbook-accessories-1585767118.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
    text: 'Blazer, Moschino, ...',
    link: '/market/tech'
},{
    title: 'Ăn uống',
    image: 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=700%2C636g',
    text: 'Blazer, Moschino, ...',
    link: '/market/foods'
}]

class Market extends Component {
    constructor(props) {
        super(props);
        this.state = {
            side_bar: false,
            create_modal_visible: false,
            data: [],
            searched: false,
            category: 'all',
            section_product_title: "Sản Phẩm Mới",
            section_product_text: "XEM CÓ GÌ MỚI ?",
            categories_options: [
                { value: 'clothes', label: 'Thời trang' },
                { value: 'food', label: 'Ăn uống' },
                { value: 'tech', label: 'Đồ điện tử' },
                { value: 'life', label: 'Sức khỏe & Đời sống' },
                { value: 'games', label: 'Đồ chơi' },
                { value: 'stationery', label: 'Văn phòng phẩm' },
                { value: 'vehicles', label: 'Xe cộ' },
                { value: 'another', label: 'Khác' },
            ]
        }

        this.handleLoadData(this.state.category);
    }

    handleLoadData = (category) => {
        API.get('get_products/' + category, (res) => {
            this.setState({
                data: res
            })
        })
    }

    //SHOW PRODUCT MODAl
    handleCreate = () => {
        this.setState({
            create_modal_visible: true,
            side_bar: false
        })
    }

    //HIDE PRODUCT MODAL
    handleCloseModal = () => {
        this.setState({create_modal_visible: false})
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.setState({
                category: this.props.match.params.page,
                searched: false,
                section_product_title: "Sản Phẩm Mới",
                section_product_text: "XEM CÓ GÌ MỚI ?"
            })

            this.handleLoadData(this.props.match.params.page);
        }
    }

    //PRODUCT SAVED
    handleSubmited = (data) => {
        this.handleLoadData();

        this.setState({
            create_modal_visible: false
        })
    }

    //SEARCH
    handleSearch = (value) => {
        let search_value = removeVietnameseTones(value.toString());

        API.get('get_products/' + 'all', (res) => {
            let data = res.filter((data, i) => {
                if(data.tags.toLowerCase().indexOf(search_value) > -1) return true;
                if(data.user_name.toLowerCase().indexOf(search_value) > -1) return true;
                
                return data.name.toLowerCase().indexOf(search_value) > -1;
            })

            this.setState({
                data: data,
                searched: true,
                section_product_title: 'Các Sản Phẩm Đã Tìm',
                section_product_text: 'BẠN VỪA TÌM KIẾM ?'
            })
        })
    }

    render() {
        return(
            <div>
                <DefaultHeader onSearch={this.handleSearch} onOpenSideBar={() => this.setState({side_bar: true})}/>
                <ProductEditModal onCloseModal={this.handleCloseModal} categories={this.state.categories_options} onSubmit={this.handleSubmited} visible={this.state.create_modal_visible}/>
                <Meta title="Laven Confession - Market"/>
                <MarketSidebar onSearch={this.handleSearch} visible={this.state.side_bar} onCloseSideBar={() => this.setState({side_bar: false})} onCreate={this.handleCreate}/>
                <div className="view flex">
                    <SectionBanner title="Marketplace" text="The best place for the community to buy and sell!" image="https://odindesignthemes.com/vikinger/img/banner/banner-bg.png"/>
                    
                    <SectionHeader text="BẠN KHÔNG BIẾT TÌM GÌ ?" title="Hạng Mục Nổi Bật" style={{display: `${this.state.searched ? 'none' : 'block'}`}}/>
                    <SectionCategories style={{display: `${this.state.searched ? 'none' : 'flex'}`}} categories={categories}/>

                    <SectionHeader title={this.state.section_product_title} text={this.state.section_product_text}/>
                    <div className="list">
                        {this.state.data.map ((data,i) => {
                            return <ProductCard categories={this.state.categories_options} key={"product" + i} data={data}/>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Market;