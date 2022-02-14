import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiMap } from "src/api";
import { GetAphorismAction } from "src/store/action";

function AphorismSection() {
  const dispatch = useDispatch()
  const aphorism = useSelector(state => state.aphorism)

  useEffect(()=> {
    ApiMap.getAphorism().then((resp) =>{
      if(resp.status === 200){
        dispatch(GetAphorismAction(resp.data))
      }
    })
  }, [dispatch])

  return (
    <section id='aphorism'>
      <h4>Aphorism of the day</h4>
      <p>{aphorism.slip.advice}</p>
    </section>
  )
}

export default AphorismSection;