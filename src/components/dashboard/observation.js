import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiMap } from "src/api";
import { GetObservationAction } from "src/store/action";

function ObservationSection() {
  const dispatch = useDispatch()
  const observation = useSelector(state => state.observation)

  useEffect(()=> {
    ApiMap.getObservation().then((resp) => {
      if(resp.status === 200){
        dispatch(GetObservationAction(resp.data))
      }
    })
  }, [dispatch])

  return (
    <section id='observation'>
      <h4>Observation</h4>
      {
        Object.entries(observation).map(
          (e)=> 
          <p key={`observation-${e[0]}`}>You <span className="action">{e[0]}</span> the most tasks on <span className="day">{e[1]}</span></p>
        )
      }
    </section>
  )
}

export default ObservationSection;