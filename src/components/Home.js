import React,{Component} from 'react'
import Axios from 'axios';
import ProductItem from './ProductItem'

class Home extends Component{
    state = {
        products: [],
        searchProducts:[]
    }

    //ngambil data
    componentDidMount(){
        Axios.get(
           'http://localhost:2019/products' 
        ).then(res=>{
            this.setState({
                products: res.data,
                searchProducts: res.data,    
            })
        })
    }
    onResetClicked = () => {
        this.setState((prevState)=>{
            return{
                searchProducts:prevState.products
            }
        })
    }

    onSearchClicked = () => {
        let input_name = this.name.value
        let min = parseInt(this.minimum.value)
        let max = parseInt(this.maximum.value)
        if (isNaN (min)){
                min = 0
        }
        if (isNaN(max)){
            max = Infinity
        }

        let hasilFilter = this.state.products.filter((product) => {
            
                return product.name.toLowerCase().includes(input_name.toLowerCase())&&(min<=product.price)&&(max>=product.price)
            
        })
        this.setState({searchProducts: hasilFilter})
    }
    // membuat list, akan menggunakan map

    renderList = () => {
        //ambil data berupa array
        //apabila products isinya array of object
        // products = [{},{},{}]
        return this.state.searchProducts.map((product) => {
         return <ProductItem barang={product} key={product.item}/>
        })

    }
    render() {
        return (
            <div className='container'>
                <div className='row'>
                {/* div untuk search */}
                <div className='col-3 mt-3'>
                    <div className='card p-3'>
                        <div className='border-bottom border-secondary card-title'>
                            <h1>Search</h1>
                        </div>
                        <form className='form-group mb-5'>
                            <h4>Name</h4>
                            <input 
                            ref={(input)=>{this.name = input}}
                            type='text' 
                            className='form-control mb-2'/>

                            <h4>Price</h4>
                            <input ref={(input)=>{this.minimum= input}} 
                            type='text' 
                            placeholder='Minimum' 
                            className='form-control mb-2'/>
                            <input ref={(input)=>{this.maximum= input}} 
                            type='text' 
                            placeholder='Maximum' 
                            className='form-control'/>
                        </form>

                        <button className='btn btn-block btn-outline-primary' 
                        onClick={this.onSearchClicked}>
                        Search
                        </button>
                        <button className='btn btn-block btn-outline-danger' 
                        onClick={this.onResetClicked}>
                        Reset
                        </button>
                    </div>
                </div>

                {/* div untuk list */}
                <div className='row col-9'>
                    {this.renderList()}
                </div>
            </div>
            </div>
        )
    }
}

export default Home