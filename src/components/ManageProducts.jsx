import React, {Component} from 'react'
import axios from 'axios'

class ManageProducts extends Component{

    state = {
        // ditaruh di state
        products:[]

        

    }

//ketiga
    componentDidMount(){
        //Ambil semua data produk (get)
        axios.get('http://localhost:2019/products')
        .then((res)=>{
            this.setState({products:res.data})
        }).catch((err)=> {
            console.log(err)
        })

    }
    // List product
    renderList = () => {
        // Map data object menjadi list. data didapat dr component didmount
        // products=[{},{},{}]array
        // product = {name.desc,price,picture}object
        //hasilRender = [<tr></tr>,<tr></tr>,<tr></tr>]
        let hasilRender = this.state.products.map((product)=>
        {
            return (
                <tr>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                        <img style={{width: "200px"}}src={product.picture}/>
                    </td>
                </tr>
            )
        })
        return hasilRender
    }


    // Add Product. ada on nya krn berhubungan dengan event handler
    onAddProduct = () =>{
        // komponen buat sendiri => klo bawaan (){}
        //Ambil data dari text input
        let data_name = this.name.value
        let data_desc = this.desc.value
        let data_price = this.price.value
        let data_picture = this.pict.value

        // taruh (Post) database ke JSON
        axios.post(
            'http://localhost:2019/products',
            {
                name:data_name,
                description:data_desc,
                price:data_price,
                picture:data_picture
            }
        ).then((res)=>{
            alert('Berhasil')
        }).catch((err)=>{
            console.log(err)
            alert('Gagal,coba buka console')
        })

    }
    //kedua
    render(){
        return(
            <div className="container">
                {/* RENDERING LIST DATA */}
                <h1 className="text-center mt-3 mb-3">List Of Products</h1>
                <table className="table text-center">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Desc</th>
                        <th>Price</th>
                        <th>Picture</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderList()}
                    </tbody>
                </table>

                {/* INPUT DATA */}
                <h1 className="text-center mt-3 mb-3">Input Products</h1>
                <table className="table text-center">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Desc</th>
                        <th>Price</th>
                        <th>Picture</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td> <input ref={(input) => {this.name= input}}className="form-control" type="text"/></td>
                        <td> <input ref={(input) => {this.desc= input}}className="form-control" type="text"/></td>
                        <td> <input ref={(input) => {this.price= input}}className="form-control" type="text"/></td>
                        <td> <input ref={(input) => {this.pict= input}}className="form-control" type="text"/></td>
                        
                        <td> 
                            <button className="btn btn-outline-success"
                            onClick={this.onAddProduct}>
                            
                            Add</button></td>
                        </tr>
                    </tbody>
                </table>

            </div>
        )
    }


}
export default ManageProducts

/*setiap kita running this.setState, akan men 
trigger function render untuk me running ulang(re render2) */