import { useState } from "react";
import { ChevronRight, BookOpen, Award, CheckCircle, Clock, Play } from "lucide-react";

type CourseStatus = "in-progress" | "completed";

type Course = {
  id: number;
  name: string;
  chapters: number;
  lectures: number;
  progress: number;
  score: number;
  status: CourseStatus;
};

const courses: Course[] = [
  {
    id: 1,
    name: "Physics 1",
    chapters: 5,
    lectures: 30,
    progress: 30,
    score: 80,
    status: "in-progress",
  },
  {
    id: 2,
    name: "Physics 2",
    chapters: 5,
    lectures: 30,
    progress: 65,
    score: 85,
    status: "in-progress",
  },
  {
    id: 3,
    name: "Chemistry 1",
    chapters: 5,
    lectures: 30,
    progress: 45,
    score: 70,
    status: "in-progress",
  },
  {
    id: 4,
    name: "Chemistry 2",
    chapters: 5,
    lectures: 30,
    progress: 80,
    score: 88,
    status: "in-progress",
  },
  {
    id: 5,
    name: "Higher math 1",
    chapters: 5,
    lectures: 30,
    progress: 100,
    score: 90,
    status: "completed",
  },
];

const CoursesProgressTable = () => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  // const completedCount = courses.filter(c => c.status === "completed").length;
  // const inProgressCount = courses.filter(c => c.status === "in-progress").length;
  // const avgProgress = Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / courses.length);

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden" style={{marginTop:8,marginBottom:8,boxShadow:'0 4px 6px rgba(0, 0, 0, 0.1)',padding:10, borderRadius:10}}>
      
      {/* Header Section */}


      {/* Table Section */}
      <div className="p-6" style={{padding:9}}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200" >
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Course Details
                </th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Progress
                </th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Score
                </th>
                <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Status
                </th>
                <th className="py-4 px-4"></th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course) => {
                const isHovered = hoveredRow === course.id;
                const isCompleted = course.status === "completed";
                
                return (
                  <tr
                    key={course.id}
                    className={`
                      border-b border-gray-100 transition-all duration-300 cursor-pointer
                      ${isHovered ? 'bg-gradient-to-r from-blue-50 to-purple-50 scale-[1.01] shadow-md' : 'hover:bg-gray-50'}
                    `}
                    onMouseEnter={() => setHoveredRow(course.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    {/* Course Name */}
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-4">
                        {/* Enhanced Avatar */}
                        <div className="relative">
                          <div
                            className={`
                              h-14 w-14 rounded-2xl flex items-center justify-center font-bold text-xl text-white
                              shadow-lg transition-all duration-300
                              ${isCompleted
                                ? 'bg-gradient-to-br from-green-500 to-emerald-600'
                                : 'bg-gradient-to-br from-orange-400 to-red-500'}
                              ${isHovered ? 'scale-110 rotate-3' : 'scale-100'}
                            `}
                          >
                            {course.name[0]}
                          </div>
                          {isCompleted && (
                            <div className="absolute -top-1 -right-1 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-bounce">
                              <CheckCircle className="text-white" size={14} />
                            </div>
                          )}
                        </div>

                        <div>
                          <p className={`font-bold text-base transition-colors ${isHovered ? 'text-blue-600' : 'text-gray-900'}`}>
                            {course.name}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              <BookOpen size={12} />
                              <span>{course.chapters} chapters</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                              <Play size={12} />
                              <span>{course.lectures} lectures</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Progress */}
                    <td className="py-5 px-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-semibold ${isCompleted ? 'text-green-600' : 'text-orange-600'}`}>
                            {course.progress}%
                          </span>
                        </div>
                        <div className="relative w-40 h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                          <div
                            className={`
                              h-full rounded-full relative overflow-hidden transition-all duration-1000
                              ${isCompleted
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600'
                                : 'bg-gradient-to-r from-orange-400 to-red-500'}
                            `}
                            style={{ width: `${course.progress}%` }}
                          >
                            {/* Shimmer Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Score */}
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-2">
                        <div className={`
                          px-4 py-2 rounded-xl font-bold text-lg
                          ${course.score >= 80
                            ? 'bg-green-100 text-green-700 border-2 border-green-300'
                            : 'bg-orange-100 text-orange-700 border-2 border-orange-300'}
                        `}>
                          {course.score}%
                        </div>
                        {course.score >= 90 && (
                          <Award className="text-yellow-500" size={20} />
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-5 px-4">
                      <span
                        className={`
                          px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 w-fit
                          border-2 transition-all duration-300
                          ${isCompleted
                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-300'
                            : 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border-orange-300'}
                          ${isHovered ? 'scale-105 shadow-lg' : ''}
                        `}
                      >
                        {isCompleted ? (
                          <>
                            <CheckCircle size={16} className="animate-pulse" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Clock size={16} className="animate-spin-slow" />
                            In Progress
                          </>
                        )}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-5 px-4 text-right">
                      <button
                        className={`
                          h-10 w-10 rounded-xl flex items-center justify-center
                          transition-all duration-300
                          ${isHovered
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-110'
                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}
                        `}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-t-2 border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" style={{marginLeft:12}}/>
            <span>Keep learning to unlock more achievements</span>
          </div>
          <button className="px-4 py-2  bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300" style={{marginRight:12,padding:3}}>
            View All Courses
          </button>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CoursesProgressTable;