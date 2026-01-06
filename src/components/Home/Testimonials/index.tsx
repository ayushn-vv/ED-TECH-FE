// import React from "react";
import Slider from "react-slick";
import { Icon } from "@iconify/react";
import { TestimonialData } from "../../../api/data";
import { getImagePrefix } from "../../../utils/util";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 600,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 800, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <>
        {[...Array(full)].map((_, i) => (
          <Icon key={`f-${i}`} icon="tabler:star-filled" className="text-yellow-500 text-lg" />
        ))}
        {half && <Icon icon="tabler:star-half-filled" className="text-yellow-500 text-lg" />}
        {[...Array(empty)].map((_, i) => (
          <Icon key={`e-${i}`} icon="tabler:star-filled" className="text-gray-300 text-lg" />
        ))}
      </>
    );
  };

  return (
    <section
      id="testimonial"
      className="pt-62 mt-34 pb-24 bg-gray-50 relative overflow-hidden"
      style={{ marginTop: '95px' }}
    >
      <div className="container mx-auto lg:max-w-screen-xl px-4">
        <Slider {...settings}>
          {TestimonialData.map((item, i) => (
            <div key={i} className="px-3">
              <div className="relative bg-white rounded-2xl shadow-lg pt-16 pb-6 px-6 my-12">
                
                {/* Avatar */}
                <div className="absolute -top-12 left-6">
                  <img
                    src={`${getImagePrefix()}${item.imgSrc}`}
                    alt={item.name}
                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>

                {/* Comment */}
                <p className="text-gray-600 text-base mb-6">
                  “{item.comment}”
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center border-t pt-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.profession}
                    </p>
                  </div>
                  <div className="flex gap-1">{renderStars(item.rating)}</div>
                </div>

              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonial;
