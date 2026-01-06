import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type DailyUsage = {
  day: string;
  minutes: number;
};

const data: DailyUsage[] = [
  { day: "Mon", minutes: 4 },
  { day: "Tue", minutes: 6 },
  { day: "Wed", minutes: 3 },
  { day: "Thu", minutes: 1.5 },
  { day: "Fri", minutes: 5 },
  { day: "Sat", minutes: 1.25 },
  { day: "Sun", minutes: 2 },
];

const DailyTimeGraph = () => {
  // 🔹 Convert minutes → hours
  const chartData = data.map(item => ({
    day: item.day,
    hours: + item.minutes.toFixed(2),
  }));

  return (
    <div className="bg-white rounded-2xl shadow-md p-6" style={{paddingRight:14,marginTop:4,marginBottom:4,boxShadow:'6px 4px 5px rgba(0, 0, 0, 0.1)', padding:19, borderRadius:10}}>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        📊 Daily Learning Time (Hours)
      </h2>

      <div className="h-67" >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="day" />

            {/* ✅ Fixed Y-Axis: 0–10 hours */}
            <YAxis
              domain={[0, 10]}
              ticks={[0, 2, 4, 6, 8, 10]}
              tickFormatter={(value) => `${value}h`}
            />

            <Tooltip
              formatter={(value: number) => [`${value} hrs`, "Time Spent"]}
            />

            <Line
              type="monotone"
              dataKey="hours"
              stroke="#6366F1"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DailyTimeGraph;
