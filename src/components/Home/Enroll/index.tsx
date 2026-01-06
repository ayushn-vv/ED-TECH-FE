// import { Users, TrendingUp } from "lucide-react";
// import { useGetCoursesEnrollmentCount } from "../../../redux/useEnrollment";
// import type { CourseEnrollmentCount } from "../../../redux/useEnrollment";

// interface EnrollmentCardProps {
//   title: string;
//   growth?: number;
// }

// const EnrollmentCard = ({ title, growth = 0 }: EnrollmentCardProps) => {
//   const { data, isLoading } = useGetCoursesEnrollmentCount();

//   // ✅ Safely sum enrollments
//   const totalEnrollments =
//     data?.reduce(
//       (sum: number, item: CourseEnrollmentCount) =>
//         sum + item.totalEnrollments,
//       0
//     ) ?? 0;

//   // ⏳ Loading
//   if (isLoading) {
//     return (
//       <div className="h-40 rounded-2xl bg-white shadow animate-pulse" />
//     );
//   }

//   // ❌ No enrollment
//   if (totalEnrollments === 0) {
//     return (
//       <div className="relative overflow-hidden rounded-2xl bg-blue-600 p-6 text-white shadow-xl">
//         <div className="absolute -top-10 -right-10 h-32 w-32 bg-white/20 rounded-full blur-3xl" />

//         <div className="flex h-full items-center justify-center">
//           <p className="text-white/80 font-medium">
//             No enrollment here
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Data exists
//   return (
//     <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 p-6 text-white shadow-xl hover:scale-[1.02] transition-transform">
//       <div className="absolute -top-10 -right-10 h-32 w-32 bg-white/20 rounded-full blur-3xl" />

//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-white/80 text-sm">{title}</p>
//           <h2 className="mt-1 text-4xl font-extrabold">
//             {totalEnrollments}
//           </h2>
//         </div>

//         <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/20">
//           <Users size={30} />
//         </div>
//       </div>

//       {growth > 0 && (
//         <div className="mt-6 flex items-center gap-2 text-sm">
//           <TrendingUp className="text-green-300" size={18} />
//           <span className="font-semibold">
//             {growth}% increase this month
//           </span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EnrollmentCard;
import { Play, Flame, Upload, Eye, Clock, Notebook, Award, BookOpen, CheckCircle } from "lucide-react";

/* ---------------- Upcoming Class Card ---------------- */
type ClassCardProps = {
  title: string;
  subject: string;
  teacher: string;
  time: string;
  status: string;
  statusColor: string;
};

const ClassCard = ({
  title,
  subject,
  teacher,
  time,
  status,
  statusColor,
}: ClassCardProps) => (
  <div className="group relative overflow-hidden flex items-center justify-between p-5 rounded-2xl border-2 border-gray-100 bg-gradient-to-br from-white to-gray-50 hover:shadow-xl hover:scale-[1.02] hover:border-blue-200 transition-all duration-300">
    {/* Decorative gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-blue-500/5 transition-all duration-500" />
    
    <div className="relative flex gap-4">
      {/* Enhanced Icon Box */}
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
        <BookOpen className="text-white" size={24} />
      </div>
      
      <div className="space-y-1">
        <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
            {subject}
          </span>
        </div>
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-gray-400" />
          by {teacher}
        </p>
      </div>
    </div>

    <div className="relative flex items-center gap-4" style={{paddingRight:12}}>
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <Clock size={14} className="text-gray-400" />
        <span className="font-medium">{time}</span>
      </div>
      
      <div className={`flex items-center gap-1 text-xs font-semibold ${statusColor} px-3 py-1.5 rounded-full bg-white shadow-sm border-2`}>
        <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'currentColor' }} />
        {status}
      </div>
      
      <button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300" style={{paddingRight:12}}>
        <Play size={16} fill="white" />
        Join Now
      </button>
    </div>
  </div>
);

/* ---------------- Enhanced Streak Card ---------------- */
const StreakCard = () => (
  <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50 rounded-3xl p-6 border-2 border-orange-100 shadow-lg hover:shadow-2xl transition-all duration-300">
    {/* Decorative circles */}
    <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-200/30 rounded-full blur-3xl" />
    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-red-200/30 rounded-full blur-3xl" />
    
    <div className="relative space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <Flame className="text-orange-500 animate-pulse" size={24} />
            5 Days Streak!
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            🏆 Record: 16 days without a break
          </p>
        </div>
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg">
          <Award className="text-white" size={24} />
        </div>
      </div>

      {/* Week Days */}
      <div className="flex justify-between gap-2 py-4">
        {["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map((day, i) => (
          <div key={day} className="flex flex-col items-center gap-2 flex-1" style={{boxShadow:'0 4px 6px rgba(0, 0, 0, 0.1)', padding:8, borderRadius:10}}>
            <div className={`
              relative w-12 h-12 rounded-xl flex items-center justify-center
              transition-all duration-300 hover:scale-110
              ${i < 5 
                ? 'bg-gradient-to-br from-orange-400 to-red-500 shadow-lg shadow-orange-500/30' 
                : 'bg-gray-100 border-2 border-dashed border-gray-300'
              }
            `} >
              <Flame
                size={24}
                className={i < 5 ? "text-white" : "text-gray-300"}
              />
              {i < 5 && (
                <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse" />
              )}
            </div>
            <span className={`text-xs font-semibold ${i < 5 ? 'text-orange-600' : 'text-gray-400'}`}>
              {day}
            </span>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 pt-3 border-t-2 border-dashed border-orange-200">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-orange-100">
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
            <BookOpen size={16} className="text-blue-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Classes</p>
            <p className="text-lg font-bold text-gray-900">6</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-orange-100">
          <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
            <CheckCircle size={16} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Assignments</p>
            <p className="text-lg font-bold text-gray-900">4</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

/* ---------------- Enhanced Assignment Card ---------------- */
const AssignmentCard = () => (
  <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 rounded-3xl p-6 border-2 border-purple-100 shadow-lg hover:shadow-2xl transition-all duration-300">
    {/* Decorative shapes */}
    <div className="absolute -top-8 -right-8 w-24 h-24 bg-purple-200/30 rounded-full blur-2xl" />
    
    <div className="relative space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">📝 Assignment</h3>
        <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-full border-2 border-red-200 animate-pulse">
          Urgent
        </span>
      </div>

      {/* Assignment Details */}
      <div className="flex gap-4 p-4 bg-white rounded-2xl border-2 border-gray-100 hover:border-purple-200 transition-colors">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg flex-shrink-0">
          <BookOpen className="text-white" size={24} />
        </div>
        
        <div className="flex-1 space-y-2">
          <p className="text-sm font-bold text-gray-900">
            Advanced problem solving math
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
              H.math 1 · Assignment 5
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-red-600 font-medium">
            <Clock size={12} />
            Submit before 15th Oct, 12:00PM
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button className="flex-1 flex items-center justify-center gap-2 text-green-600 border-2 border-green-500 px-4 py-3 rounded-xl text-sm font-semibold hover:bg-green-50 hover:scale-105 transition-all duration-300">
          <Eye size={16} />
          View Details
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
          <Upload size={16} />
          Upload Work
        </button>
      </div>
    </div>
  </div>
);

/* ---------------- Enhanced Total Courses ---------------- */
const TotalCourses = () => (
  <div className="bg-white rounded-3xl p-6 border-2 border-gray-100 shadow-lg space-y-5" style={{marginTop:8}}>
    {/* <div className="flex items-center justify-between" style={{padding:6}}>
      <Notebook className="text-blue-600" size={24} />
      <h3 className="text-xl font-bold text-gray-900">My Courses</h3>
      <span className="px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-bold rounded-full">
        5 Active
      </span>
    </div> */}
       <div className="flex items-center justify-between" style={{padding:6}}>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2" style={{paddingLeft:10}}>
                  <Notebook className="text-blue-600" size={24} />
                  My Courses
                </h3>
                <span className="px-4 py-1.5 bg-red-100 text-red-700 text-sm font-bold rounded-full animate-pulse" style={{paddingRight:6,paddingLeft:6}}>
                  5 Active
                </span>
              </div>
    <div className="space-y-4" >
      {[
        { name: "Physics 1", chapters: 5, lectures: 30, progress: 80, status: "In Progress", color: "orange" },
        { name: "Chemistry 1", chapters: 4, lectures: 25, progress: 60, status: "In Progress", color: "blue" },
        { name: "Mathematics 2", chapters: 6, lectures: 35, progress: 95, status: "Almost Done", color: "green" },
      ].map((course, idx) => (
        <div
          key={idx}
          className="group relative overflow-hidden p-4 rounded-2xl border-2 border-gray-100 bg-gradient-to-br from-white to-gray-50 hover:shadow-lg hover:border-blue-200 transition-all duration-300"
          style={{margin:9}}
        >
          {/* Glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-${course.color}-500/0 to-${course.color}-500/0 group-hover:from-${course.color}-500/5 group-hover:to-${course.color}-500/5 transition-all duration-500`} />
          
          <div className="relative flex items-center justify-between gap-4" >
            <div className="flex-1 space-y-2" style={{margin:8}}>
              <div className="flex items-center gap-3">
                <p className="font-bold text-gray-900">{course.name}</p>
                <span className={`px-2 py-0.5 bg-${course.color}-100 text-${course.color}-700 text-xs font-semibold rounded-full border border-${course.color}-200`}>
                  {course.status}
                </span>
              </div>
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <BookOpen size={12} />
                  {course.chapters} chapters
                </span>
                <span>•</span>
                <span>{course.lectures} lectures</span>
              </p>
            </div>

            {/* Progress Section */}
            <div className="flex items-center gap-4">
              <div className="w-32 space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-bold text-gray-900">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-${course.color}-400 to-${course.color}-600 rounded-full transition-all duration-1000 relative overflow-hidden`}
                    style={{ width: `${course.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>

              {/* Circular Progress */}
              <div className="relative w-12 h-12">
                <svg className="w-12 h-12 transform -rotate-90">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="#e5e7eb"
                    strokeWidth="4"
                    fill="none"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke={course.color === 'orange' ? '#f97316' : course.color === 'blue' ? '#3b82f6' : '#10b981'}
                    strokeWidth="4"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 20}`}
                    strokeDashoffset={`${2 * Math.PI * 20 * (1 - course.progress / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-900">
                  {course.progress}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

/* ---------------- Main Page ---------------- */
const StudentDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-6" style={{boxShadow:'0 4px 6px rgba(0, 0, 0, 0.1)', padding:8, borderRadius:10}}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {/* <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back! 👋</h1>
          <p className="text-gray-600">Here's what's happening with your learning today</p>
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3" >
          {/* LEFT SECTION */}
          <div className="lg:col-span-2 space-y-6" >
            <div className="bg-white rounded-3xl p-6 border-2 border-gray-100 shadow-lg space-y-5">
              <div className="flex items-center justify-between" style={{padding:6}}>
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2" style={{paddingLeft:10}}>
                  <Clock className="text-blue-600" size={24} />
                  Upcoming Classes
                </h3>
                <span className="px-4 py-1.5 bg-red-100 text-red-700 text-sm font-bold rounded-full animate-pulse" style={{paddingRight:6,paddingLeft:6}}>
                  2 Today
                </span>
              </div>
             <div style={{paddingLeft:8}}>
              <ClassCard
                title="Newtonian Mechanics - Class 5"
                subject="Physics 1"
                teacher="Rakesh Ahmed"
                time="15th Oct, 12:00PM"
                status="2 min left"
                statusColor="text-red-600"
              />

              <ClassCard
                title="Polymer - Class 3"
                subject="Chemistry 1"
                teacher="Khalil khan"
                time="15th Oct, 12:00PM"
                status="4 hr left"
                statusColor="text-blue-600"
              />
              </div>
            </div>

            <TotalCourses />
          </div>

          {/* RIGHT SECTION */}
          <div className="space-y-6">
            <StreakCard />
            <AssignmentCard />
          </div>
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

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default StudentDashboardPage;