import axios from 'axios'     

export const onLoginUser =(USERNAME,PASSWORD) => {
   //cek di database untuk ketersediaan data username dan password menggunakan axios (asynchronous processor). klo pake ini, nanti perlu pakai middleware
   return (dispatch) => {
    // Cek di database untuk ketersediaan data username dan password
axios.get(
    'http://localhost:2019/users',
    {
        params: {
            username: USERNAME,
            password: PASSWORD
        }
    }
).then((res) => {
    // Periksa apakah terdapat respon berupa user yang ditemukan
    if(res.data.length === 0){
        console.log('User tidak ditemukan')

    } else {
        let {id, username} = res.data[0]
    
        // Menyimpan data di local storage
        localStorage.setItem(
            'userData',
            JSON.stringify({id, username})
        )

        // Meyimpan / mengirim data di redux state
        dispatch(
            {
                type: 'LOGIN_SUCCESS',
                payload: {
                    id, username
                }
            }
        )

    }
})
}

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

// export 'dengan' default
    // ketika di import di file lain 'tidak' menggunakan kurung kurawal {}

// export 'tanpa' default
    // ketika di import di file lain 'harus' menggunakan kurung kurawal {}

// HANYA ADA SATU 'export default' DALAM SATU FILE