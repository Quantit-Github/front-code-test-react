import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import moment from 'moment';
import { useEffect, useState } from 'react';

function CurrentTime() {
  const [sec, setSec] = useState(new Date().getTime())
  
  useEffect(() => {
    const timer = setInterval( () => {
      setSec(sec => sec + 1000);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const time = () => moment(new Date(sec)).format("HH:mm:ss")
  const date = () => moment(new Date(sec)).format("yyyy.MM.DD")

  return (
    <section id="cur-time">
      <h4>Current time</h4>
      <div className="datetime-box">
        <div>
          <h5>Time</h5>
          <div>
            <AccessTimeOutlinedIcon/>
            <span>{time()}</span>
          </div>
        </div>
        <div>
          <h5>Date</h5>
          <div>
            <CalendarTodayOutlinedIcon/>
            <span>{date()}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CurrentTime;