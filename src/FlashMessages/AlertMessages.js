import SweetAlert from 'react-bootstrap-sweetalert';
import { useNavigate } from 'react-router-dom'
import '../assets/css/buttons/_buttons.scss';

export const AlertMessages = (props) => {
    const navigate = useNavigate();

    const onConfirm = () => {
        navigate('/');
    }    
    
    const onCancel = () => {
        navigate('/');
    }
    return (
        props.title ? 
        <>
            <SweetAlert
                title={props.title}
                onConfirm={onConfirm}
                onCancel={onCancel}
                danger
                customButtons={
                    <button onClick={onCancel} className="sweetalert-redirect-btn">Redirect</button>
                }
            >
                {props.message}
            </SweetAlert>
        </> : ""
    );
} 