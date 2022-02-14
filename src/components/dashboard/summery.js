import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiMap } from "src/api";
import { GetSummeryAction } from "src/store/action";

function SummerySection() {
  const dispatch = useDispatch()
  const summery = useSelector(state => state.summery);
  
  useEffect(() => {
    ApiMap.getSummery().then((resp) => {
      if(resp.status === 200){
        dispatch(GetSummeryAction(resp.data))
      }
    })
  }, [dispatch])

  return (
    <section id="summery">
      <h4>Success for the week</h4>
      <div className="content">
        {
          Object.entries(summery).map(
            (e) => <StatCircle key={`stat-${e[0].toLowerCase()}`} label={e[0]} number={e[1]} ></StatCircle>
          )
        }
      </div>
    </section>
  )
}

export default SummerySection;


function StatCircle(props) {
  const {label, number} = props
  const _label = label.charAt(0) + label.slice(1).toLowerCase();
  
  return (
    <div className="stat">
      <h3>{_label}</h3>
      <div className="circle">
        <h1>{number}</h1>
        <span>tasks</span>
      </div>
    </div>
  )
}
