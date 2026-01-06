import MentorCard from './MentorCard';
import SliderWrapper from 'components/common/SliderWrapper';
import { mentors } from 'data/mentors';

const MonthlyMentors = () => {

  return <div style={{ marginTop: '22px',marginBottom: '8px'}}>
   <SliderWrapper title="Top Monthly Mentors" SliderCard={MentorCard} data={mentors} />
  </div>;
};

export default MonthlyMentors;
