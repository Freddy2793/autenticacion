import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);

	const [email,setEmail]=useState("")
	const [password,setPassword]=useState("")

	const navigate = useNavigate()

	const iniciar=async(e) =>{
		
		e.preventDefault()
		

		if(email != "" && password != "")  {

			await actions.iniciar(email,password)
			if(store.auth){
				navigate("/demo")
			}
			
		} else {
			
			alert("Faltan Datos")
		}

	}

	const registro=(e) =>{
		
		e.preventDefault()

		if(email != "" && password != "")  {

			actions.registro(email,password)
		} else {
			
			alert("Faltan Datos")
		}

	}

	return (
		<div className="text-center mt-5 container">
			<form>
				<div class="mb-3">
					<label for="exampleInputEmail1" class="form-label">Email address</label>
					<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
						<div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
				</div>
				<div class="mb-3">
					<label for="exampleInputPassword1" class="form-label">Password</label>
					<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" class="form-control" id="exampleInputPassword1"/>
				</div>
				
				<button onClick={iniciar} type="submit" class="btn btn-primary">Iniciar Sesión</button>

				<button onClick={registro} type="submit" class="btn btn-primary">Registrate</button>
			</form>
		</div>
	);
};
