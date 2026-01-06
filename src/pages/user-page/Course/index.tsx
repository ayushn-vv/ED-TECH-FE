import React, { useState } from "react";
import { Clock, Sparkles, Star, Users, Award, ArrowRight, BookOpen, TrendingUp } from "lucide-react";
import CourseFilters, { Course } from "./Filters";

const courses: Course[] = [
  {
    id: 1,
    title: "React for Beginners",
    description: "Learn the basics of React and component-driven UI.",
    category: "Frontend",
    instructor: "Ayushmaan Naman",
    duration: "6 weeks",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    description: "Hooks, Context, performance optimization.",
    category: "Frontend",
    instructor: "John Doe",
    duration: "4 weeks",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80",
    instructorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
  },
  {
    id: 3,
    title: "Node.js API Development",
    description: "Build scalable REST APIs with Node.js & Express.",
    category: "Backend",
    instructor: "Jane Smith",
    duration: "5 weeks",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
    instructorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
  },
   {
    id: 4,
    title: "React for Advanced Developers",
    description: "Learn the basics of React and component-driven UI.",
    category: "Frontend",
    instructor: "Ayushmaan Naman",
    duration: "60 Hours",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    instructorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  },
  {
    id: 5,
    title: "Advanced React Patterns",
    description: "Hooks, Context, performance optimization.",
    category: "Frontend",
    instructor: "John Doe",
    duration: "4 weeks",
    level: "Advanced",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&q=80",
    instructorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
  },
  {
    id: 6,
    title: "Node.js API Development",
    description: "Build scalable REST APIs with Node.js & Express.",
    category: "Backend",
    instructor: "Jane Smith",
    duration: "5 weeks",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80",
    instructorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
  },
];

const levelConfig: Record<string, { bg: string; text: string; icon: JSX.Element }> = {
  Beginner: {
    bg: "bg-gradient-to-r from-green-50 to-emerald-50",
    text: "text-green-700",
    icon: <BookOpen className="w-3 h-3" />,
  },
  Intermediate: {
    bg: "bg-gradient-to-r from-yellow-50 to-orange-50",
    text: "text-yellow-700",
    icon: <TrendingUp className="w-3 h-3" />,
  },
  Advanced: {
    bg: "bg-gradient-to-r from-red-50 to-pink-50",
    text: "text-red-700",
    icon: <Award className="w-3 h-3" />,
  },
};

const categoryColors: Record<string, string> = {
  Frontend: "from-blue-500 to-cyan-500",
  Backend: "from-purple-500 to-pink-500",
  Design: "from-orange-500 to-red-500",
};

const CoursePage: React.FC = () => {
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const groupedCourses = filteredCourses.reduce<Record<string, Course[]>>(
    (acc, course) => {
      acc[course.category] = acc[course.category] || [];
      acc[course.category].push(course);
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20" style={{marginLeft: 75,marginBottom:26, marginTop:45}}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 px-6 md:px-10 py-16 max-w-[1400px] mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-indigo-100 mb-6 hover:shadow-xl transition-all duration-300">
            <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
            <span className="text-sm font-semibold text-indigo-600 tracking-wide">
              Start Your Learning Journey
            </span>
          </div>
          
          <h1 className="text-6xl md:text-6xl font-black mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Explore Courses
          </h1>
          
         <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto justify-center">
  Discover world-class courses taught by industry experts
</p>


          {/* Stats */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">{courses.length}+</p>
              <p className="text-sm text-slate-500">Courses</p>
            </div>
            <div className="w-px h-12 bg-slate-200" />
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">15k+</p>
              <p className="text-sm text-slate-500">Students</p>
            </div>
            <div className="w-px h-12 bg-slate-200" />
            <div className="text-center">
              <p className="text-3xl font-bold text-indigo-600">4.8</p>
              <p className="text-sm text-slate-500">Rating</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <CourseFilters courses={courses} onFilter={setFilteredCourses} />

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-12 h-12 text-slate-400" />
            </div>
            <p className="text-slate-500 text-xl font-medium">No courses found</p>
            <p className="text-slate-400 text-sm mt-2">Try adjusting your filters</p>
          </div>
        )}

        {/* Course Sections */}
        {Object.entries(groupedCourses).map(([category, categoryCourses]) => (
          <section key={category} className="mb-20">
            {/* Category Header */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-2 h-12 rounded-full bg-gradient-to-b ${categoryColors[category] || 'from-gray-400 to-gray-600'}`} />
              <div>
                <h2 className="text-4xl font-bold text-slate-800">{category}</h2>
                <p className="text-slate-500 text-sm mt-1">{categoryCourses.length} courses available</p>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{marginBottom: 10,marginTop: 10}}>
              {categoryCourses.map((course) => (
                <div
                  key={course.id}
                  onMouseEnter={() => setHoveredCard(course.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-slate-100 hover:border-indigo-200 transform hover:-translate-y-2"
                >
                  {/* Image Container */}
                  <div className="relative h-42 overflow-hidden" style={{borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px',marginBottom: '-8px'}}>
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Level Badge */}
                    <div className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md ${levelConfig[course.level].bg} border border-white/20 shadow-lg`} style={{padding: '3px 6px'}}>
                      {levelConfig[course.level].icon}
                      <span className={`text-xs font-bold ${levelConfig[course.level].text}`}>
                        {course.level}
                      </span>
                    </div>

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-md bg-white/90 shadow-lg" style={{padding: '3px 6px'}}>
                      <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold text-slate-700">4.8</span>
                    </div>

                    {/* Hover Action Button */}
                    <button
                      className={`absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-6 py-2.5 bg-white rounded-full shadow-lg font-semibold text-sm text-indigo-600 transition-all duration-300 ${
                        hoveredCard === course.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      View Course
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="p-6" style={{paddingTop: '6px'}}>
                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1" style={{marginLeft: 8}}>
                      {course.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed" style={{marginLeft: 8}}>
                      {course.description}
                    </p>

                    {/* Instructor */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100" style={{marginLeft: 8}}>
                      <img
                        src={course.instructorImage}
                        alt={course.instructor}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-slate-500 font-medium">Instructor</p>
                        <p className="text-sm font-semibold text-slate-700 truncate">
                          {course.instructor}
                        </p>
                      </div>
                    </div>

                    {/* Footer Info */}
                    <div className="flex items-center justify-between text-sm" style={{marginLeft: 9, marginRight: 12 }}>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-4 h-4 text-indigo-500" />
                        <span className="font-medium">{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <Users className="w-4 h-4 text-indigo-500" />
                        <span className="font-medium">2.5k</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Accent Line */}
                  <div className={`h-1 bg-gradient-to-r ${categoryColors[category] || 'from-gray-400 to-gray-600'} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default CoursePage;