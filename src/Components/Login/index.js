import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const handleGo = () => {
        navigate('/', {replace: true});
    }
    
    return (
        <div className="login-container"> {/* Add this wrapper */}
            <div className="card"> {/* Use Bootstrap card classes */}
                <div className="card-body">
                    <h2>Login</h2>
                    
                    <form className="mt-4"> {/* Add margin-top */}
                        <div className="mb-3"> {/* Add form group */}
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Email" 
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Password" 
                                required
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn btn-primary w-100"
                        >
                            Login
                        </button>
                    </form>

                    <button 
                        type="button" 
                        onClick={handleGo}
                        className="btn btn-link mt-3" 
                    >
                        Go back
                    </button>
                </div>
            </div>
        </div>
    );
}