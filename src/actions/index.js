import axios from 'axios'     

export const onLoginUser =(USERNAME,PASSWORD) => {
   //cek di database untuk ketersediaan data username dan password menggunakan axios (asynchronous processor). klo pake ini, nanti perlu pakai middleware
    axios.get(
        'http://localhost:2019/users',
        // klo atau cari data pakai get harus pakai pakai params
        {
           params: {username : this.username.value,
            password: this.password.value}

        }
    ).then((res) => {
        // function hasil pencariannya diberi sebuah nama (res)
        // res.data merupakan sebuah array, jika ditemukan, length nya pasti lebih besar daripada 0, dan jika tidak, length = 0
        // diluar class tidak perlu pakai this
        if (res.data.length===0){
            console.log('user tidak ditemukan')
        }else{
            let{id,username} = res.data[0]
            //res.data[0] = {id,email,username,password}
            this.props.onLoginUser(
                id,username
            )
             //agar keluarannya berupa string. (di local storage kalau datanya berupa object dia nggak bisa terbuka)
             //2. Mengirim data ke local storage
             localStorage.setItem('userData',JSON.stringify({id,username}))
        }
    })

}




export const onLogoutUser = () => {
    localStorage.removeItem('userData')
    return{
        type: 'LOGOUT_SUCCESS'
    }
}

// Action creator
// A.C adalah function biasa yang terhubung dengan reducer melalui connect
//harus return object yang memiliki property 'type'