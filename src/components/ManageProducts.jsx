import React, {Component} from 'react'
import axios from 'axios'

class ManageProducts extends Component{

    state = {
        // ditaruh di state
        products:[],
        selectedId:0

    }

    //ketiga
    componentDidMount(){
        console.log('DidMount')
        //Ambil semua data produk (get)
     this.getData()   

    }


    // mengambil data dari database
    getData = () => {
        axios.get('http://localhost:2019/products')
        .then((res)=>{
            this.setState({products:res.data})
        }).catch((err)=> {
            console.log(err)
        })
    }

    onEditCLick = (id) => {
        this.setState({selectedId: id} )
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
            this.getData()
            // mengambil data
        
        }).catch((err)=>{
            console.log(err)
            alert('Gagal,coba buka console')
        })

        

    }

    // List product
    productList = () => {
        // Map data object menjadi list. data didapat dr component didmount
        // products=[{},{},{}]array
        // product = {name.desc,price,picture}object
        //hasilRender = [<tr></tr>,<tr></tr>,<tr></tr>]
        let hasilRender = this.state.products.map((product)=>
        { if (product.id!=this.state.selectedId){
            return (
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.price}</td>
                    <td>
                        <img style={{width: "100px"}}src={product.picture} alt={product.desc}/>
                    </td>
                    <td>
                        <button className="btn btn-outline-warning"
                        // anonymous function
                        onClick= {() => {this.onEditCLick(product.id)}}> 
                            Edit
                        </button>
                    </td>
                </tr>
            )
        } else{
            // di render sebagai textbox
            return(
                <tr key={product.id}>
                    <td><input type='text'/></td>
                    <td><input type='text'/></td>
                    <td><input type='text'/></td>
                    <td><input type='text'/></td>
                    <td>
                        <button className='btn btn-outline-danger'>
                        Cancel
                        </button>
                    </td>
                </tr>
            )
        }
        })
        return hasilRender
    }


    
    //kedua dan keempat
    render(){
        console.log('render')
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
                        {this.productList()}
                        
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


// key pada baris ke 74 menggunakan nilai id dari masing masing product
//product={name,description,price,picture,id}
/*
life cycle method
1.componentWillMount()
2.render()
3.componentDidMount()
4.render()
 */

/*setiap kita running this.setState, akan men 
trigger function render untuk me running ulang(re render) */

/*
Memberikan function ke onclick

1. Function tidak menerima argument
    langsung tuliskan nama function tersebut didalam kurung kurawal onClick

    contoh: {this.somethingDo} sebuah anonymous function () => {}
    baru masukkan func yang ingin dipanggil didalam anonym. function tsb

2. Function yang menerima argument
    Masukkan terlebih dahulu ke onClick
    onclick = this.comethingToDO(23)
    onclick={() => { }}
*/