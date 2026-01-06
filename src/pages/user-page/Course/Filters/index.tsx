import { useEffect, useState } from "react";
import { Search, Filter, X } from "lucide-react";

/* ---------------- TYPES ---------------- */

export type Course = {
  id: number;
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  image: string;
  instructorImage: string;
};

type CourseFiltersProps = {
  courses: Course[];
  onFilter: (filtered: Course[]) => void;
};

/* ---------------- MAIN COMPONENT ---------------- */

const CourseFilters: React.FC<CourseFiltersProps> = ({ courses, onFilter }) => {
  const [filters, setFilters] = useState({
    title: "",
    level: "",
    keyword: "",
  });

  const [filteredCount, setFilteredCount] = useState(courses.length);

  useEffect(() => {
    const result = courses.filter((course) => {
      // Title
      if (
        filters.title &&
        !course.title.toLowerCase().includes(filters.title.toLowerCase())
      ) {
        return false;
      }

      // Level
      if (filters.level && course.level !== filters.level) {
        return false;
      }

      // Keyword
      if (
        filters.keyword &&
        !course.description
          .toLowerCase()
          .includes(filters.keyword.toLowerCase())
      ) {
        return false;
      }

      return true;
    });

    setFilteredCount(result.length);
    onFilter(result);
  }, [filters, courses, onFilter]);

  const clearFilters = () => {
    setFilters({ title: "", level: "", keyword: "" });
  };

  const hasActiveFilters =
    filters.title || filters.level || filters.keyword;

  return (
    <div className="w-full mb-14">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-semibold text-slate-800" style={{marginTop:2,marginBottom: 2}}>
            Filter Courses
          </h3>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition"
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        )}
      </div>

      {/* FILTER CARD */}
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x" style={{marginLeft:10,margin:6}}>
          {/* TITLE FILTER */}
          <FilterInput
            label="Search by Title"
            placeholder=""
            value={filters.title}
            onChange={(v) => setFilters({ ...filters, title: v })}
          />

          {/* LEVEL FILTER */}
          <div className="p-6 hover:bg-slate-50/60 transition">
            <label className="block text-xs font-semibold text-slate-500 uppercase mb-3">
              Difficulty Level
            </label>
            <select
              value={filters.level}
              onChange={(e) =>
                setFilters({ ...filters, level: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* KEYWORD FILTER */}
          <FilterInput
            label="Search Description"
            placeholder=""
            value={filters.keyword}
            onChange={(v) => setFilters({ ...filters, keyword: v })}
          />
        </div>

        {/* ACTIVE FILTERS */}
        {hasActiveFilters && (
          <div className="px-6 py-4 bg-indigo-50/50 border-t">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-600 mr-2">
                Active Filters:
              </span>

              <FilterChip
                show={!!filters.title}
                label={`Title: ${filters.title}`}
                onRemove={() =>
                  setFilters({ ...filters, title: "" })
                }
              />

              <FilterChip
                show={!!filters.level}
                label={`Level: ${filters.level}`}
                onRemove={() =>
                  setFilters({ ...filters, level: "" })
                }
              />

              <FilterChip
                show={!!filters.keyword}
                label={`Keyword: ${filters.keyword}`}
                onRemove={() =>
                  setFilters({ ...filters, keyword: "" })
                }
              />
            </div>
          </div>
        )}
      </div>

      {/* RESULT COUNT */}
      <p className="mt-4 text-center text-sm text-slate-600">
        Showing{" "}
        <span className="font-semibold text-indigo-600">
          {filteredCount}
        </span>{" "}
        of{" "}
        <span className="font-semibold">{courses.length}</span>{" "}
        courses
      </p>
    </div>
  );
};

export default CourseFilters;

/* ---------------- REUSABLE COMPONENTS ---------------- */

const FilterInput = ({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="p-6 hover:bg-slate-50/60 transition">
    <label className="block text-xs font-semibold text-slate-500 uppercase mb-3">
      {label}
    </label>
    <div className="relative">
  {!value && (
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 transition-opacity" />
  )}

  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className="
      w-full
      pl-11 pr-4 py-3
      rounded-xl
      bg-slate-50
      border border-slate-200
      focus:ring-2 focus:ring-indigo-500
      focus:border-transparent
      transition
    " style={{paddingLeft:6}}
  />
</div>

  </div>
);

const FilterChip = ({
  label,
  show,
  onRemove,
}: {
  label: string;
  show: boolean;
  onRemove: () => void;
}) =>
  show ? (
    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white rounded-full text-xs font-medium text-slate-700 border border-slate-200 shadow-sm">
      {label}
      <button
        onClick={onRemove}
        className="hover:text-red-600 transition"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  ) : null;
