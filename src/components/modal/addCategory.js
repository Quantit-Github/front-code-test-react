import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { HexColorPicker } from "react-colorful";
import { ApiMap } from 'src/api';
import { useDispatch } from 'react-redux';
import { AddCategoryAction } from 'src/store/action';

function AddCategoryModal(props){
  const dispatch = useDispatch();

  const [category, setCategory] = useState('');
  const [openPalette, setOpenPalette] = useState(false);
  const [paleteCordinate, setPaleteCordinate] = useState({x:0, y:0})
  const [color, setColor] = useState("#fffff");

  useEffect(()=> {
    if(openPalette){
      const element = document.getElementById("category-color-btn");
      GetScreenCordinates(element);
    }
  }, [openPalette])

  const categoryChange = (event) => {
    setCategory(event.target.value);
  };

  const selectColor = (color) => {
    setColor(color)
  }

  const onRequestClose = () => {
    setOpenPalette(false)
    setColor("#ffffff")
    setCategory('')
    props.onRequestClose();
  }

  function GetScreenCordinates(element) {
    var p = {};
    p.x = element.offsetLeft;
    p.y = element.offsetTop;
    while (element.offsetParent) {
        p.x = p.x + element.offsetParent.offsetLeft;
        p.y = p.y + element.offsetParent.offsetTop;
        if (element === document.getElementsByTagName("body")[0]) {
            break;
        }
        else {
          element = element.offsetParent;
        }
    }
    setPaleteCordinate(p);
  }

  const addClick = async () => {
    if(category.length === 0){
      alert("이름을 입력해 주세요");
    }else{
      await ApiMap.addCategory({
        'name': category,
        'color': color,
      }).then(async (rep) => {
        if(rep.status === 200){
          await dispatch(AddCategoryAction(rep.data)) 
        }else{
          alert(rep.data.error)
        }
      })
      props.onRequestClose()
      alert("Category 추가 성공")
    }
  }

  return( 
    <Modal 
      isOpen={props.isOpen}
      onRequestClose={onRequestClose}
      id={"add-category-modal"}
      overlayClassName={"overlay"}
      className={"content"}
    >
      <h4>Add a new category</h4>        
      <form className="category-input">
        <div className="name">
          <span>Name</span>
          <input
            name="todo"
            className='input-field'
            value={category} 
            onChange={categoryChange}
            type={'text'}
            placeholder={"Please enter your category"}
          />
        </div>
        <div className="color">
          <span>Color</span>
          <div id="category-color-btn" style={{backgroundColor: color}} onClick={()=> setOpenPalette(!openPalette)}></div>
        </div>
      </form>
      <div className="category-buttons">
        <button onClick={onRequestClose}>Cancel</button>
        <button onClick={addClick}>Add</button>
      </div>
      { openPalette && 
      <div id="color-palette" style={{top: paleteCordinate.y, left: paleteCordinate.x + 40}}>
        <HexColorPicker color={color} onChange={selectColor} />
        <div className='info'>
          <form>
            <input
              name="color"
              className='input-field'
              readOnly
              value={color}
              type={'text'}
            />
          </form>
          <div className='btn-box'>
            <button onClick={()=>setOpenPalette(false)}>Ok</button>
          </div>
        </div>
      </div>
      }
    </Modal>
  ) 
}

AddCategoryModal.defaultProps = {
    isOpen: false,
    onRequestClose: () => console.log('close'),
}

export default AddCategoryModal;