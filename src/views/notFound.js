import { useNavigate } from "react-router-dom";

import BaseView from '@views//base';
import notFound from '@asset/notFound.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function NotFound() {
  const navigate = useNavigate();
  function onClick() {
    navigate("/", { replace: true });
  }

  return (
    <BaseView type={"page"}>
      <div id='notfound'>
        <img  src={notFound} alt="notFound"/>
        <h1>Oops, This Page Could Not Be Found.</h1>
        <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
        <button onClick={onClick}>
          <ArrowBackIcon color="black" style={{zIndex:1, paddingRight: 10}}/>
          <span>Back to home</span>
        </button>
      </div>
    </BaseView>
  );
}
  
export default NotFound;