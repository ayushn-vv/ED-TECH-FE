import { tasks } from 'data/tasks';
import TaskCard from './TaskCard';
import SliderWrapper from 'components/common/SliderWrapper';

const UpcomingTask = () => {
  return <div style={{ marginTop: '22px',marginBottom: '2px'}}>
  <SliderWrapper title="Ongoing Courses" SliderCard={TaskCard} data={tasks} />
  </div>;
};

export default UpcomingTask;
