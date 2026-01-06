/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback ,useEffect} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  MenuItem,
} from "@mui/material";
import { useCreateCourse } from "../../../../redux/useCourse";

// ---------------- TYPES ----------------
type DifficultyLevel = "beginner" | "intermediate" | "advanced";
type CourseStatus = "draft" | "published" | "unpublished";

interface CourseFormData {
  title: string;
  description: string;
  category: string;
  tags: string;
  difficultyLevel: DifficultyLevel;
  price: number;
  isFree: boolean;
  thumbnail: string;
  status: CourseStatus;
  duration: number;
  instructorId: number;
}

const INITIAL_FORM_STATE: CourseFormData = {
  title: "",
  description: "",
  category: "",
  tags: "",
  difficultyLevel: "beginner",
  price: 0,
  isFree: false,
  thumbnail: "",
  status: "draft",
  duration: 0,
  instructorId: 1,
};

// ---------------- COMPONENT ----------------
const CreateCourseDialog = () => {
  const [open, setOpen] = useState(false);
  const createCourse = useCreateCourse();
  const [formData, setFormData] = useState<CourseFormData>(INITIAL_FORM_STATE);
   const [debouncedData, setDebouncedData] = useState(formData);

  // 🔥 Debounce Input (500ms)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedData(formData);
    }, 500);
       return () => clearTimeout(timeout);
  }, [formData]);

  // Open dialog
  const handleOpen = () => setOpen(true);

  // Close dialog
  const handleClose = () => {
    setOpen(false);
    setFormData(INITIAL_FORM_STATE);
  };

  // Handle Input Change
  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, type } = e.target;
      const value =
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? Number((e.target as HTMLInputElement).value)
          : e.target.value;

      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  // Submit Form
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      createCourse.mutate(debouncedData, {
        onSuccess: () => {
          handleClose();
        },
      });
    },
    [ createCourse,debouncedData]
  );

  // Extract error message safely
  const getErrorMessage = (): string => {
    if (!createCourse.error) return "Something went wrong";

    const error: any = createCourse.error;
    return error?.response?.data?.message || error?.message || "Error occurred";
  };

  return (
    <>
      {/* CREATE BUTTON */}
      <Button variant="contained" sx={{backgroundColor:'#8db0b1ff',color:'#fcfcfcff'}} onClick={handleOpen}>
        + Create Course
      </Button>

      {/* DIALOG START */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Course</DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>

            <TextField
              label="Course Title"
              name="title"
              required
              fullWidth
              value={formData.title}
              onChange={handleChange}
            />

            <TextField
              label="Description"
              name="description"
              rows={3}
              multiline
              fullWidth
              value={formData.description}
              onChange={handleChange}
            />

            <TextField
              label="Category"
              name="category"
              required
              fullWidth
              value={formData.category}
              onChange={handleChange}
            />

            <TextField
              label="Tags"
              name="tags"
              fullWidth
              value={formData.tags}
              onChange={handleChange}
            />

            <TextField
              select
              fullWidth
              label="Difficulty Level"
              name="difficultyLevel"
              value={formData.difficultyLevel}
              onChange={handleChange}
            >
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
            </TextField>

            {/* Price + Free Checkbox */}
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              disabled={formData.isFree}
              value={formData.price}
              onChange={handleChange}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isFree}
                  name="isFree"
                  onChange={handleChange}
                />
              }
              label="Free Course"
            />

            <TextField
              label="Thumbnail URL"
              name="thumbnail"
              fullWidth
              value={formData.thumbnail}
              onChange={handleChange}
            />

            <TextField
              label="Duration (hours)"
              name="duration"
              type="number"
              fullWidth
              value={formData.duration}
              onChange={handleChange}
            />

            <TextField
              select
              label="Status"
              fullWidth
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="published">Published</MenuItem>
              <MenuItem value="unpublished">Unpublished</MenuItem>
            </TextField>

            {createCourse.isError && (
              <p style={{ color: "red", fontSize: "14px" }}>
                {getErrorMessage()}
              </p>
            )}

            {createCourse.isSuccess && (
              <p style={{ color: "green", fontSize: "14px" }}>
                Course created successfully!
              </p>
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={createCourse.isPending}
            >
              {createCourse.isPending ? "Creating..." : "Create Course"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CreateCourseDialog;
