import { useState, useRef } from "react";
import { 
  Star, 
  BookOpen, 
  Users, 
  Clock, 
  TrendingUp, 
  Award,
  ChevronRight,
  ChevronLeft,
  Play,
  Heart,
  Share2
} from "lucide-react";

type Course = {
  id: number;
  title: string;
  instructor: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  level: string;
  students: number;
  duration: string;
  lessons: number;
  bestseller?: boolean;
  featured?: boolean;
};

const courses: Course[] = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp 2024",
    instructor: "Dr. Angela Yu",
    rating: 4.7,
    reviews: 145000,
    price: 84.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop",
    category: "Development",
    level: "Beginner",
    students: 450000,
    duration: "65 hours",
    lessons: 420,
    bestseller: true,
  },
  {
    id: 2,
    title: "Machine Learning A-Z: Hands-On Python & R",
    instructor: "Kirill Eremenko",
    rating: 4.5,
    reviews: 98000,
    price: 89.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop",
    category: "Data Science",
    level: "Intermediate",
    students: 320000,
    duration: "44 hours",
    lessons: 285,
    featured: true,
  },
  {
    id: 3,
    title: "The Complete Digital Marketing Course",
    instructor: "Rob Percival",
    rating: 4.6,
    reviews: 67000,
    price: 79.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    category: "Marketing",
    level: "All Levels",
    students: 180000,
    duration: "23 hours",
    lessons: 156,
    bestseller: true,
  },
  {
    id: 4,
    title: "iOS & Swift - Complete iOS App Development",
    instructor: "Angela Yu",
    rating: 4.8,
    reviews: 52000,
    price: 94.99,
    originalPrice: 189.99,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    category: "Mobile Development",
    level: "Beginner",
    students: 210000,
    duration: "58 hours",
    lessons: 380,
    featured: true,
  },
  {
    id: 5,
    title: "Complete Python Developer Course",
    instructor: "Jose Portilla",
    rating: 4.6,
    reviews: 89000,
    price: 79.99,
    originalPrice: 169.99,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop",
    category: "Programming",
    level: "All Levels",
    students: 280000,
    duration: "32 hours",
    lessons: 245,
  },
  {
    id: 6,
    title: "UI/UX Design Masterclass",
    instructor: "Daniel Walter Scott",
    rating: 4.7,
    reviews: 43000,
    price: 84.99,
    originalPrice: 174.99,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    category: "Design",
    level: "Beginner",
    students: 156000,
    duration: "28 hours",
    lessons: 198,
    bestseller: true,
  },
];

const EnhancedCourses = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [likedCourses, setLikedCourses] = useState<Set<number>>(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const itemsPerView = 3;
  const maxSlides = Math.max(0, courses.length - itemsPerView);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlides));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const toggleLike = (id: number) => {
    const newLiked = new Set(likedCourses);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedCourses(newLiked);
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`
              ${i < fullStars ? 'fill-yellow-400 text-yellow-400' : 
                i === fullStars && hasHalfStar ? 'fill-yellow-400/50 text-yellow-400' : 
                'text-gray-300'}
            `}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="courses" className="py-20 bg-gradient-to-b from-gray-50 via-white to-blue-50" style={{marginTop:4,marginBottom:4,boxShadow:'0 4px 6px rgba(0, 0, 0, 0.1)', padding:10, borderRadius:10}}>
      <div className="container mx-auto lg:max-w-7xl px-6">
        
        {/* Enhanced Header */}
        <div className="mb-16">
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg">
                  <TrendingUp className="text-white" size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                    Featured Learning
                  </p>
                  <h2 className="text-4xl font-bold text-gray-900">
                    Popular Courses
                  </h2>
                </div>
              </div>
              <p className="text-gray-600 max-w-2xl">
                Discover our most loved courses by thousands of students worldwide
              </p>
            </div>

            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300" style={{padding:2.5}}>
              Explore All Courses
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={`
              absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10
              h-12 w-12 rounded-full bg-white shadow-xl
              flex items-center justify-center
              transition-all duration-300
              ${currentSlide === 0
                ? 'opacity-70 cursor-not-allowed'
                : 'hover:scale-110 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white'}
            `}
            style={{marginLeft:12}}
          >
            <ChevronLeft size={69} />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentSlide >= maxSlides}
            className={`
              absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10
              h-12 w-12 rounded-full bg-white shadow-xl
              flex items-center justify-center
              transition-all duration-300
              ${currentSlide >= maxSlides
                ? 'opacity-40 cursor-not-allowed'
                : 'hover:scale-110 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white'}
            `}
             style={{marginRight:12}}
          >
            <ChevronRight size={69} />
          </button>

          {/* Slider Container */}
          <div className="overflow-hidden" ref={sliderRef}>
            <div
              className="flex gap-8 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / itemsPerView)}%)`,
              }}
            >
              {courses.map((course) => {
                const isHovered = hoveredCard === course.id;
                const isLiked = likedCourses.has(course.id);
                
                return (
                  <div
                    key={course.id}
                    className={`
                      group relative bg-white rounded-3xl overflow-hidden
                      transition-all duration-500 cursor-pointer flex-shrink-0
                      border-2 border-gray-100
                      ${isHovered ? 'shadow-2xl scale-105 border-blue-200 -translate-y-2' : 'shadow-lg hover:shadow-xl'}
                    `}
                    style={{ width: `calc(${80 / itemsPerView}% - ${(6 * (itemsPerView - 1)) / itemsPerView}px)` }}
                    onMouseEnter={() => setHoveredCard(course.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    {/* Image Container */}
                    <div className="relative overflow-hidden h-56" style={{marginTop:4,marginBottom:4,boxShadow:'0 4px 6px rgba(0, 0, 0, 0.1)', padding:10, borderRadius:10}}>
                      <img
                        src={course.image}
                        alt={course.title}
                        className={`
                          w-full h-full object-cover transition-transform duration-700
                          ${isHovered ? 'scale-110' : 'scale-100'}
                        `}
                      />
                      
                      {/* Overlay Gradient */}
                      <div className={`
                        absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent
                        transition-opacity duration-300
                        ${isHovered ? 'opacity-80' : 'opacity-40'}
                      `} />

                      {/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {course.bestseller && (
                          <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse" style={{padding:2}}>
                            <Award size={14} />
                            Best Seller
                          </div>
                        )}
                        {course.featured && (
                          <div className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                            <Star size={14} fill="white" />
                            Featured
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className={`
                        absolute top-4 right-4 flex gap-2
                        transition-all duration-300
                        ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
                      `}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(course.id);
                          }}
                          className={`
                            h-10 w-10 rounded-full flex items-center justify-center
                            backdrop-blur-md border-2 transition-all duration-300
                            ${isLiked
                              ? 'bg-red-500 border-red-400 scale-110'
                              : 'bg-white/20 border-white/40 hover:bg-white/30'}
                          `}
                        >
                          <Heart
                            size={18}
                            className={isLiked ? 'fill-white text-white' : 'text-white'}
                          />
                        </button>
                        <button className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center text-white hover:bg-white/30 transition-all">
                          <Share2 size={18} />
                        </button>
                      </div>

                      {/* Play Button Overlay */}
                      <div className={`
                        absolute inset-0 flex items-center justify-center
                        transition-all duration-500
                        ${isHovered ? 'opacity-100' : 'opacity-0'}
                      `}>
                        <div className="h-16 w-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                          <Play size={28} className="text-blue-600 fill-blue-600 ml-1" />
                        </div>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-800 border border-white/50">
                          {course.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-4" style={{marginLeft:6}}>
                      {/* Title */}
                      <h5 className={`
                        text-lg font-bold line-clamp-2 transition-colors duration-300
                        ${isHovered ? 'text-blue-600' : 'text-gray-900'}
                      `} >
                        {course.title}
                      </h5>

                      {/* Instructor */}
                      <p className="text-sm text-gray-600 flex items-center gap-2" style={{marginLeft:3}}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                          {course.instructor[0]}
                        </div>
                        {course.instructor}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-gray-900">{course.rating}</span>
                        {renderStars(course.rating)}
                        <span className="text-xs text-gray-500">({course.reviews.toLocaleString()})</span>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-3 py-3 border-t border-b border-gray-100">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <BookOpen size={14} className="text-blue-600" />
                          </div>
                          <p className="text-xs text-gray-500">{course.lessons} lessons</p>
                        </div>
                        <div className="text-center border-x border-gray-100">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Clock size={14} className="text-green-600" />
                          </div>
                          <p className="text-xs text-gray-500">{course.duration}</p>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <Users size={14} className="text-purple-600" />
                          </div>
                          <p className="text-xs text-gray-500">{(course.students / 1000).toFixed(0)}k</p>
                        </div>
                      </div>

                      {/* Price & CTA */}
                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-gray-900">
                              ${course.price}
                            </span>
                            {course.originalPrice && (
                              <span className="text-sm text-gray-400 line-through">
                                ${course.originalPrice}
                              </span>
                            )}
                          </div>
                          {course.originalPrice && (
                            <span className="text-xs font-semibold text-green-600">
                              {Math.round((1 - course.price / course.originalPrice) * 100)}% OFF
                            </span>
                          )}
                        </div>

                        <button className={`
                          px-6 py-2.5 rounded-xl font-semibold text-sm
                          transition-all duration-300
                          ${isHovered
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}
                        `}>
                          Enroll Now
                        </button>
                      </div>
                    </div>

                    {/* Hover Border Animation */}
                    <div className={`
                      absolute inset-0 rounded-3xl pointer-events-none
                      transition-opacity duration-300
                      ${isHovered ? 'opacity-100' : 'opacity-0'}
                    `}>
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-20 animate-gradient-shift" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {[...Array(maxSlides + 1)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${currentSlide === index
                    ? 'w-8 bg-gradient-to-r from-blue-600 to-purple-600'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'}
                `}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-3 rounded-full border-2 border-blue-200">
            <span className="text-gray-700">Can't find what you're looking for?</span>
            <button className="text-blue-600 font-semibold hover:text-purple-600 transition-colors">
              Browse all {courses.length * 50}+ courses →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default EnhancedCourses;