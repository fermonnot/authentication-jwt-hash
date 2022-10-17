import React,   { useState,useContext } from 'react';
import { Context} from "../store/appContext";
import swal from 'sweetalert';


const Register = () => {
	let initState = {
		email:'',
		password:'',
        nick_name:''
	};
	const {actions} = useContext(Context);
	const [userRegister,setUserRegister]= useState(initState);
	
	const handleChange = ({target}) => {
	   setUserRegister ({
		...userRegister,
		[target.name]: target.value,
	   });


	};

	let alertRegister= () => {
        swal({
            title:"Guardado!",
            text: "Usuario Agregado Satisfactoriamente",
            icon: "success",
            button: "Aceptar"
        });
    }


	const handleSubmit = async (event) => {
       event.preventDefault();
	   if (userRegister.email.trim() != "" && userRegister.password.trim() != "" && userRegister.nick_name.trim() != "")
        {
		console.log ("good");
		  let response = await actions.userRegister(userRegister);
	      if (response) {
		    setUserRegister( initState );
		    alertRegister()
	      } else {
		    alert ('intente de nuevo');
	    }
	    } else {
		console.log("campos obligatorios");
	    }

	};

  return (

		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-6">
					<form onSubmit = {handleSubmit}>	
						<div className="form-group">
							<label>Correo electrónico</label>
							<input 
							 type="text"
							 name="email" 
							 className="form-control" 
							 onChange={handleChange}
							 value={userRegister.email}
							/>
						</div>

						<div className="form-group">
							<label>Contraseña</label>
							<input  
							 type="password"
							 name="password" 
							 className="form-control" 
							 onChange={handleChange}
							 value={userRegister.password}
							 />
						</div>

                        <div className="form-group">
							<label>Nombre</label>
							<input 
							 type="text"
							 name="nick_name" 
							 className="form-control" 
							 onChange={handleChange}
							 value={userRegister.nick_name}
							/>
						</div>

						<button className="btn btn-secundary w-100 my-3">
							Registrarse
						</button>

					</form>
				</div>
			</div>
		</div>
  )
}

export default Register;