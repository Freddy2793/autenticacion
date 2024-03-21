import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const{
		actions,store
	}=useContext(Context)

	const navigate=useNavigate()

	const cerrarSesion=async() =>{

		await actions.logout()

		if (store.auth==false){
			navigate("/")
		}
	}
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Registrarte</span>
				</Link>
				<div className="ml-auto">
					
						<button onClick={cerrarSesion} className="btn btn-primary">Cerrar Sesion</button>
				
				</div>
			</div>
		</nav>
	);
};
