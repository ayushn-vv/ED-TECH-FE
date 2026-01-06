// import React, { useMemo, useState } from "react";
// import { 
//   TrendingUp, Award, BarChart3, Flame, Target, 
//   Calendar, CheckCircle2, BookOpen, Zap 
// } from "lucide-react";

// // --- Types & Interfaces ---
// interface ProgressDay {
//   day: string;
//   value: number;
// }

// interface MiniStatProps {
//   icon: React.ReactNode;
//   label: string;
//   val: string | number;
//   subText: string;
// }

// interface TaskItemProps {
//   title: string;
//   time: string;
//   done: boolean;
// }

// // --- Sub-components ---
// const MiniStat = ({ icon, label, val, subText }: MiniStatProps) => (
//   <div className="flex items-center gap-3">
//     <div className="p-2.5 rounded-xl bg-slate-800 border border-white/5 flex items-center justify-center">
//       {icon}
//     </div>
//     <div>
//       <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">{label}</p>
//       <div className="flex items-baseline gap-2">
//         <p className="text-base font-black text-white">{val}</p>
//         <p className="text-[9px] text-slate-500 font-medium">{subText}</p>
//       </div>
//     </div>
//   </div>
// );

// const TaskItem = ({ title, time, done }: TaskItemProps) => (
//   <div className={`p-4 rounded-2xl border transition-all duration-300 ${
//     done ? 'bg-emerald-500/5 border-emerald-500/10 opacity-60' : 'bg-white/5 border-white/5 hover:border-white/10'
//   }`}>
//     <div className="flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         <CheckCircle2 size={18} className={done ? 'text-emerald-500' : 'text-slate-600'} />
//         <div>
//           <p className="text-sm font-semibold text-white">{title}</p>
//           <p className="text-[10px] text-slate-500 font-medium">{time} estimated</p>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// // --- Main Component ---
// const DualDashboard = () => {
//   const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

//   // Your hour-based data
//   const data: ProgressDay[] = useMemo(() => [
//     { day: "Mon", value: 4.5 }, 
//     { day: "Tue", value: 2.1 },
//     { day: "Wed", value: 3.5 }, 
//     { day: "Thu", value: 2 },
//     { day: "Fri", value: 1.5 }, 
//     { day: "Sat", value: 5 },
//     { day: "Sun", value: 1 },
//   ], []);

//   // Set the scale of your graph (0 to 7 hours)
//   const yAxisMax = 7;
//   const maxValue = Math.max(...data.map((d) => d.value));

//   return (
//     <div className="w-full bg-[#080b14] p-6 lg:p-12 flex items-center justify-center font-sans">
//       <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-9 my-2.5">
        
//         {/* LEFT PANEL: Activity Graph */}
//         <div className="lg:col-span-7 bg-[#0d121f] rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col" style={{marginTop:6,marginBottom:6}}>
//           <div className="p-8 flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
//                 <BarChart3 className="text-white" size={24} />
//               </div>
//               <div>
//                 <h2 className="text-xl font-black text-white leading-tight">Weekly Learning <span className="text-cyan-400">Activity</span></h2>
//                 <p className="text-slate-500 text-xs flex items-center gap-1.5 mt-1 font-medium">
//                   <Calendar size={12}/> JAN 01 - JAN 07, 2026
//                 </p>
//               </div>
//             </div>
//             <div className="px-3 py-1 rounded-full bg-slate-800 border border-white/5 flex items-center gap-2">
//               <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
//               <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Live Tracking</span>
//             </div>
//           </div>

//           <div className="px-8 pb-4 flex-grow">
//             <div className="relative h-64 w-full flex items-end justify-between px-2">
//               {/* Y-Axis Grid Lines (0 to 7) */}
//               <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20" >
//                 {[7,6,5,4,3,2,1,0].map((v) => (
//                   <div key={v} className="w-full flex items-center gap-4">
//                     <span className="text-[10px] font-bold w-10" style={{ 
//           color: '#ffffffff', // Cyan-400
//           fontSize:'1.07rem'
//        }}>{v} hr</span>
//                     <div className="h-[1px] flex-1" />
//                   </div>
//                 ))}
//               </div>

//               {/* Bars Calculation Logic */}
//               <div className="absolute inset-0 left-12 flex items-end justify-around">
//                 {data.map((item, index) => {
//                   const isMax = item.value === maxValue;
//                   // Map the 0-7 hour scale to 0-100% of the container height
//                   const barHeight = (item.value / yAxisMax) * 100;

//                   return (
//                     <div 
//                       key={item.day} 
//                       className="relative flex flex-col items-center group w-full max-w-[38px] h-full justify-end"
//                       onMouseEnter={() => setHoveredIndex(index)}
//                       onMouseLeave={() => setHoveredIndex(null)}
//                     >
//                       {/* Tooltip on Hover */}
//                       {hoveredIndex === index && (
//                         <div className="absolute z-10 -top-8 bg-slate-800 text-white text-[10px] px-2 py-1 rounded border border-white/10">
//                           {item.value} hrs
//                         </div>
//                       )}

//                       {/* Bar Visual */}
//                       <div 
//                         className={`w-full rounded-t-xl transition-all duration-500 cursor-pointer relative ${
//                           isMax ? 'bg-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.3)]' : 'bg-slate-700/40 hover:bg-slate-600'
//                         }`}
//                         style={{ height: `${barHeight}%` }}
//                       >
//                         {isMax && (
//                            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
//                               <Award size={14} className="text-yellow-500" />
//                            </div>
//                         )}
//                       </div>
//                       <span className={`mt-4 text-[11px] font-bold uppercase ${hoveredIndex === index ? 'text-white' : 'text-slate-500'}`}>
//                         {item.day}
//                       </span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           <div className="p-8 bg-black/20 rounded-b-[2.5rem] border-t border-white/5 grid grid-cols-3 gap-4">
//             <MiniStat icon={<Target size={18} className="text-cyan-400" />} label="Avg Hours" val="3.2h" subText="Steady Growth" />
//             <MiniStat icon={<TrendingUp size={18} className="text-emerald-400" />} label="Peak Day" val="Sat" subText="Highly Productive" />
//             <MiniStat icon={<Flame size={18} className="text-orange-500" />} label="Total Hours" val="21.1h" subText="Weekly Total" />
//           </div>
//         </div>

//         {/* RIGHT PANEL: Goals & Path */}
//         <div className="lg:col-span-5 flex flex-col gap-6">
//           <div className="bg-[#0d121f] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
//             <div className="flex items-center justify-between mb-8">
//               <h3 className="text-lg font-black text-white">Monthly <span className="text-blue-500">Target</span></h3>
//               <Zap size={20} className="text-yellow-500" />
//             </div>
//             <div className="flex items-center gap-8">
//               <div className="relative h-24 w-24 flex items-center justify-center">
//                 <svg className="w-full h-full transform -rotate-90">
//                   <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
//                   <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.72)} className="text-blue-500" strokeLinecap="round" />
//                 </svg>
//                 <span className="absolute text-xl font-black text-white">72%</span>
//               </div>
//               <div>
//                 <p className="text-base font-bold text-white leading-tight">Full-Stack Development</p>
//                 <p className="text-xs text-slate-500 mt-1 font-medium">18 of 25 modules completed</p>
//                 <div className="mt-4 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full inline-block">
//                   <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">On Track</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-[#0d121f] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl flex-grow">
//             <div className="flex items-center gap-3 mb-8">
//               <BookOpen size={20} className="text-cyan-400" />
//               <h3 className="text-lg font-black text-white">Learning Path</h3>
//             </div>
//             <div className="space-y-4">
//               <TaskItem title="UI/UX Principles" time="45 mins" done={true} />
//               <TaskItem title="TypeScript Advanced" time="1.2 hrs" done={false} />
//               <TaskItem title="System Architecture" time="2.5 hrs" done={false} />
//             </div>
//             <button className="w-full mt-10 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-white text-sm font-black transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98]">
//               CONTINUE LEARNING
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DualDashboard;
import { CheckCircle, BookOpen, Clock } from "lucide-react";
import { LucideIcon } from "lucide-react";

/* ------------------ Semi Circle Progress ------------------ */
type SemiCircleProgressProps = {
  value: number;
  label: string;
  color: string;
};

const SemiCircleProgress = ({ value, label }: SemiCircleProgressProps) => {
  const radius = 90;
  const strokeWidth = 18;
  const circumference = Math.PI * radius;
  const progress = (value / 100) * circumference;

  return (
    <div className="relative w-[220px] h-[120px] overflow-hidden">
      <svg width="220" height="120" viewBox="0 0 220 120">
        {/* Background arc */}
        <path
          d="M 20 110 A 90 90 0 0 1 200 110"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Progress arc */}
        <path
          d="M 20 110 A 90 90 0 0 1 200 110"
          fill="none"
          stroke="#10b981"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center mt-6">
        <span className="text-2xl font-bold text-gray-900">
          {value}%
        </span>
        <span className="text-xs font-medium text-gray-500 tracking-wide">
          {label}
        </span>
      </div>
    </div>
  );
};

/* ------------------ Circular Progress Ring ------------------ */
type ProgressRingProps = {
  value: number;
  label: string;
  color: string;
};

const ProgressRing = ({ value, label, color }: ProgressRingProps) => {
  const radius = 42;
  const stroke = 15;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const offset =
    circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-700 ease-out"
        />
        {/* Progress ring */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-700 ease-out"
        />
      </svg>

      <span className="text-sm font-semibold">{value}%</span>
      <span className="text-xs text-gray-500 text-center max-w-[80px]">
        {label}
      </span>
    </div>
  );
};

/* ------------------ Stat Item ------------------ */
type StatItemProps = {
  icon: LucideIcon;
  title: string;
  value: string;
};

const StatItem = ({ icon: Icon, title, value }: StatItemProps) => (
  <div className="
    flex items-center gap-4
    rounded-xl p-4
    bg-gradient-to-br from-white to-gray-50
    hover:shadow-lg hover:-translate-y-1
    transition-all duration-300
  " style={{paddingBottom:7, paddingTop:5}}>
    <div className="p-3 rounded-xl bg-primary/10 text-primary">
      <Icon size={22} />
    </div>
    <div>
      <p className="text-xs text-gray-500">{title}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

/* ------------------ Dashboard ------------------ */
const StudentPerformanceDashboard = () => {
  return (
    <div className="space-y-6">

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3" style={{marginTop:4,marginBottom:4,boxShadow:'0 4px 6px rgba(0, 0, 0, 0.1)', padding:10, borderRadius:10}}>
        {/* Overall Performance */}
        <div className="
          bg-white rounded-2xl shadow-sm
          hover:shadow-xl transition-all duration-300
          p-6
        " style={{padding:10}}>
          <p className="text-sm font-medium text-gray-700">
            Overall performance
          </p>
          <p className="text-xs text-gray-400 mb-4">
            Course completion rate
          </p>

          <div className="flex justify-center">
            <SemiCircleProgress
              value={80}
              label="PRO LEARNER" color={""}            />
          </div>
        </div>

        {/* Course Stats */}
        <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4" style={{padding:10}}>
          <StatItem
            icon={BookOpen}
            title="Total enrolled courses"
            value="5"
          />
          <StatItem
            icon={CheckCircle}
            title="Courses completed"
            value="1"
          />
          <StatItem
            icon={Clock}
            title="Hours spent learning"
            value="112h"
          />
        </div>

        {/* Activity Progress */}
        <div className="
          bg-white rounded-2xl shadow-sm p-6
          flex justify-between gap-8 
        " style={{padding:10}}>
          <ProgressRing
            value={70}
            label="Live Classes"
            color="#f97316"
          
          />
          <ProgressRing
            value={67}
            label="Quiz Practice"
            color="#8b5cf6"
          />
          <ProgressRing
            value={67}
            label="Assignments"
            color="#3b82f6"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentPerformanceDashboard;
