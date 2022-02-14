import Footer from "@cpt/common/footer";
import Header from "@cpt/common/header";
import NavContainer from "@cpt/common/nav";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { ApiMap } from "src/api";
import { LogoutAction, RefreshTokenAction } from "src/store/action";

function BaseView(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token == null){
      if(location.pathname !== '/login' && location.pathname !== '/'){
        alert("로그인이 필요합니다")
        navigate("/login", { replace: true });
      }
    }else{
      ApiMap.verifyToken(token).then(
        (rep1) => {
          const refresh = localStorage.getItem("refresh")
          if(rep1.status !== 200){
            ApiMap.refreshToken(refresh).then(
              (rep2) => {
                if(rep2.status === 200){
                  dispatch(RefreshTokenAction(rep2.data.access))
                }else{
                  alert("인증이 만료 되었습니다.")
                  dispatch(LogoutAction())
                  navigate("/login", { replace: true });
                }
              }
            )
          }else{
            if(location.pathname === '/login' || location.pathname === '/'){
              navigate("/dashboard", { replace: true });
            }
          }
        }
      );
    }
  }, )

  return (
    <div id={props.type}>
      {props.type === "page" && <Header/>}
      <main>
        {props.type === "dashboard" && <NavContainer/>}
        {props.children}
      </main>
      {props.type === "page" && <Footer/>}
    </div>
  );
}
export default BaseView;

BaseView.defaultProps = {
  type: "page", // page, dashboard 가능
}