import { useEffect } from "react";

import Hero from "../../components/Home/Hero";
import Companies from "../../components/Home/Companies";
import Courses from "../../components/Home/Courses";
// import Mentor from "../../components/Home/Mentor";
// import Testimonial from "../../components/Home/Testimonials";
// import Newsletter from "../../components/Home/Newsletter";
// import EnrollmentCard from "../../components/Home/Enroll";
import ProgressPanel from "../../components/Home/ProgresGraph";
import TimeGraph from '../../components/Home/TimeGraph';

const Home = () => {
  useEffect(() => {
    document.title = "eLearning";
  }, []);

  return (
    <div style={{ scrollBehavior: "smooth" ,margin: 50,marginTop:90, marginLeft: 35,marginRight:-46,marginBottom:0}}>
    <main className="bg-gray-50 ">
      {/* Global Page Container */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section spacing */}
        <section className="py-16">
          <Hero />
        </section>
         <section className="py-16">
          <TimeGraph />
        </section>
        <section className="py-16">
          <ProgressPanel />
        </section>
         {/* <section className="py-16">
          <EnrollmentCard/>
        </section> */}
        
        <section className="py-16">
          <Companies />
        </section>
        <section className="py-16">
          <Courses />
        </section>
       

        {/* <section className="py-16">
          <Mentor />
        </section> */}

        {/* <section className="py-16">
          <Testimonial />
        </section> */}

        {/* <section className="py-16">
          <Newsletter />
        </section> */}

      </div>
    </main>
    </div>
  );
};

export default Home;
