import DashboardHeader from '@cpt/common/dashHeader';
import BaseView from '@views//base';
import SummerySection from '@cpt/dashboard/summery';
import TaskListSection from '@cpt/dashboard/task';
import CurrentTime from '@cpt/dashboard/currentTime';
import ObservationSection from '@cpt/dashboard/observation';
import AphorismSection from '@cpt/dashboard/aphorism';
import ChartSection from '@cpt/dashboard/chart';

function Dashboard() {

  return (
    <BaseView type={"dashboard"}>
      <div className='content'>
        <DashboardHeader/>
        <article className='dashboard'>
            <div className='column'>
              <SummerySection/>
              <TaskListSection/>
            </div>
            <div className='column'>
              <CurrentTime/>
              <ObservationSection/>
              <AphorismSection/>
              <ChartSection/>
            </div>
          </article>
      </div>
    </BaseView>
  );
}
  
export default Dashboard;