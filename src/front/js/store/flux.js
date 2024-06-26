const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			auth:false
		},
		actions: {
			// Use getActions to call a function within a fuction
			iniciar: async(email,password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/login",{
						method:"POST",
						body: JSON.stringify({
							username:email,
							password:password
						}),
						headers:{"Content-Type":"application/json"}
					})
					if(response.status==200){

					
					const data = await response.json()

					localStorage.setItem("token",data.access_token)

					setStore({
						auth:true
					})

					// console.log(data)
				}else{

					setStore({
						auth:false
					})

				}
				} catch (error) {
					console.log (error)
				}
			},

			registro: async(email,password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "api/registrar",{
						method:"POST",
						body: JSON.stringify({
							email:email,
							password:password
						}),
						headers:{"Content-Type":"application/json"}
					})
					const data = await response.json()

					console.log(data)

				} catch (error) {
					console.log (error)
				}
			},

			logout:() =>{
				localStorage.removeItem("token")
				setStore({
					auth:false
				})
			}

			
		
		}
	};
};

export default getState;
