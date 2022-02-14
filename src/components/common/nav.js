import LogoBox from "./logoBox";
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, useNavigate } from "react-router-dom";

import { ReactComponent as MenuTarget } from '@asset/menuTarget.svg';
import { ReactComponent as Add } from '@asset/add.svg';
import { useState, useEffect } from "react";
import { ApiMap } from "src/api";
import { useDispatch, useSelector } from "react-redux";
import { LogoutAction ,GetCategoriesAction } from "src/store/action";
import AddCategoryModal from "@cpt/modal/addCategory";

function NavContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    ApiMap.getCategories().then(
      (res) => {
        if(res.status === 200){
          dispatch(GetCategoriesAction(res.data))
        }
      }
    )
  })

  const logout = () => {
    dispatch(LogoutAction())
    navigate("/login", { replace: true });
  }

  return (
    <nav id="nav">
      <div className="menu-box">
        <div style={{marginBottom: 60, paddingLeft: 20}}>
          <LogoBox/>
        </div>
        <ul className="analytics">
          <div>Analytics</div>
          <NavMenuItem icon={<BarChartIcon/>} text={'Summary'} route={'/dashboard'}/>
          <NavMenuItem icon={<ShowChartIcon/>} text={'Todo List'} route={'/todo'}/>
        </ul>
        <CategoryMenu/>
      </div>
      <button onClick={logout}>
        <LogoutIcon/>logout
      </button>
    </nav>
  );
}
      
export default NavContainer;


function NavMenuItem(props){
  const location = useLocation();
  const navigate = useNavigate();

  const goPage = async () =>{
    navigate(props.route);
  }

  return(
    <li onClick={goPage} className='menu-item'>
      {props.icon}
      {props.text}
      {location.pathname === props.route && 
      <div style={{position:"absolute", right: 0}}>
        <MenuTarget/>
      </div>
      }
    </li>
  )
}


NavMenuItem.defaultProps = {
  icon: <BarChartIcon/>,
  text: "Summary",
  route: "/dashboard",
}


function CategoryMenu(){
  const [isOpen, setOpen] =  useState(false);
  const categories = useSelector(state => state.categories);
  return (
    <ul className="categories">
      <div>Categories</div>
      {categories.map(
        (c) => (
        <li key={c.name} className="category">
          <div className='dot' style={{backgroundColor: c.color}}></div>{c.name}
        </li>)
      )}
      <button onClick={() => setOpen(true)}>
        <Add/>Add category
      </button>
      <AddCategoryModal isOpen={isOpen} onRequestClose={() => setOpen(false)}/>
    </ul>
  )
}