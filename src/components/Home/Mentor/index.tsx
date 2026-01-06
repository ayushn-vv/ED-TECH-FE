import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MentorData } from "../../../api/data";
import { getImagePrefix } from "../../../utils/util";

type Mentor = {
  imgSrc: string;
  name: string;
  profession: string;
};

const MentorSkeleton = () => (
  <div className="rounded-2xl bg-white p-6 shadow animate-pulse text-center">
    <div className="h-[306px] bg-gray-300 rounded-xl mb-6" />
    <div className="h-6 w-3/4 bg-gray-300 rounded mx-auto mb-2" />
    <div className="h-4 w-1/2 bg-gray-300 rounded mx-auto" />
  </div>
);

const Mentor = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate API delay
    setTimeout(() => {
      setMentors(MentorData);
      setLoading(false);
    }, 1500);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 1000, settings: { slidesToShow: 2 } },
      { breakpoint: 530, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="bg-deepSlate mb-20 mt-12" id="mentor">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-semibold mb-10">
          Meet with our mentor.
        </h2>

        {/* ✅ LOADER */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <MentorSkeleton key={i} />
            ))}
          </div>
        )}

        {/* ✅ SLIDER */}
        {!loading && (
          <Slider {...settings}>
            {mentors.map((items, i) => (
              <div key={i} className="px-3">
                <div className="py-14 text-center">
                  <div className="relative">
                    <img
                      src={`${getImagePrefix()}${items.imgSrc}`}
                      alt="mentor"
                      className="mx-auto rounded-xl"
                    />
                  </div>

                  <div className="-mt-10">
                    <h3 className="text-2xl font-semibold">
                      {items.name}
                    </h3>
                    <p className="opacity-60">{items.profession}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default Mentor;
