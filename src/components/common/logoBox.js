import { ReactComponent as Logo } from '@asset/logo.svg';
import { useNavigate } from 'react-router-dom';

function LogoBox() {
  
  const navigate = useNavigate();
  function onClick() {
    navigate("/", { replace: true });
  }

  return (
    <button id='logoBox' onClick={onClick}>
      <Logo/>
      <div className="name">
        <span>Tasks</span>
        <span>Book</span>
      </div>
    </button>
  );
}
    
export default LogoBox;