import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate();

    const handleGo = () => {
        navigate('/', {replace: true});
    }
    return(
        <div>
        <p>hello world</p>
        <button type="button" onClick={handleGo}>go back</button>
        </div>
    );
}