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

    onSelectChange = (e) => {
        let hasilSort 
        if (e.target.value ==='nameAsc'){
            console.log('sort nama')
            hasilSort = this.state.searchProducts.sort((a,b) => {
                if(a.name>b.name){
                    return 1
                }else if(a.name<b.name){
                    return -1
                }else{
                    return 0
                }
            })
        }

        else if (e.target.value === 'priceHighest'){
            console.log('sort harga terendah')
            hasilSort = this.state.searchProducts.sort((a,b) => {
                return (b.price - a.price)
            })
        }

        else if(e.target.value === 'priceLowest'){
            console.log('sort harga tertinggi')
            hasilSort = this.state.searchProducts.sort((a,b) => {
                return (a.price - b.price)
            })
        }
        this.setState({searchProducts: hasilSort})
    }

    // membuat list, akan menggunakan map

    renderList = () => {
        //ambil data berupa array
        //apabila products isinya array of object
        // products = [{},{},{}]
        return this.state.searchProducts.map((product) => {
         return <ProductItem barang={product} key={product.id}/>
        })

    }
    render() {
        return (
            
            <div className='container' style={{textAlign:"left"}}>
                <div className='row'>
                {/* div untuk search */}
                <div className='col-3 mt-3'>
                    
                    <div className='card p-3'>
                        <div className='border-bottom border-secondary card-title'>
                            <h4>Search</h4>
                        </div>
                        <div>
                        </div>
                        <form className='form-group mb-5'>
                            <h5 className= 'm-2'>Name</h5>
                            <input 
                            ref={(input)=>{this.name = input}}
                            type='text' 
                            className='form-control mb-2'/>

                            <h5 className='m-2'>Price</h5>
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

                        <div style={{margin:'auto'}}>
                            <h5 className= 'm-3'
                            style={{textAlign:"center"}}>
                            Sort by : </h5>

                            <select name='sortComponent'
                                onChange={this.onSelectChange}>

                                <option style = {{color:"gray",fontSize:"11px",textDecoration:"italic"}} >Please Select</option>
                                <option value='nameAsc'>Name A-Z</option>
                                <option value= 'priceLowest'>Lowest Price First</option>
                                <option value= 'priceHighest'>Highest Price First</option>
                            
                            </select>
                         </div>
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