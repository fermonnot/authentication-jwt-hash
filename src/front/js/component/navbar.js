import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import cap from "../../img/cap.png"
import "../../styles/navbar.css"



export const Navbar = () => {
	const { store, actions } = useContext(Context);

	
	return (
		<nav className="navbar navbar-light bg-light ">
			<div className="container">
				<Link to="/">
				
					<span className="navbar-brand mb-0 h1 p-2"><img className="img"src={cap}/></span>

				</Link>
				
				
				<div className="ml-auto">
					<div className="dropdown">
						<a className="btn btn-secondary " href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
							<i className="fas fa-bars"></i>
						</a>

						<ul className="dropdown-menu dropdown-menu-end">
							
							{store.token ?
								<>
								<li><Link to="/demo" className="dropdown-item border-bottom" href="#">demo</Link></li>
								<li><Link to="/" className="dropdown-item border-bottom" href="#">home</Link></li>
								<li>
								<button className="dropdown-item border-bottom"
								onClick={() => {
									actions.logout();

								}}>

								Salir
							</button>
							</li>
								</>
								:
								<>
									<li><Link to="/register" className="dropdown-item border-bottom" href="#">Registrarse</Link></li>
									<li><Link to="/login" className="dropdown-item border-bottom" href="#">Iniciar sesion</Link></li>
								</>
							}
							
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
