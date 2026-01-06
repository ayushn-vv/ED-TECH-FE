type Course = {
  id: number;
  title: string;
  duration: number;
  difficulty: "easy" | "medium" | "hard";
  tags?: string[];
};

type CourseCardProps = {
  course: Course;
};

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: 12,
        marginBottom: 8,
      }}
    >
      <h4>{course.title}</h4>
      <p>Duration: {course.duration} hrs</p>
      <p>Level: {course.difficulty}</p>
    </div>
  );
};

export default CourseCard;
