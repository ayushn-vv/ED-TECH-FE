/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";
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
  Autocomplete,
  Chip,
  Box,
  Divider,
  Typography,
  Card,
} from "@mui/material";
import { useCreateCourse } from "../../../../redux/useCourse";

type DifficultyLevel = "beginner" | "intermediate" | "advanced";
type CourseStatus = "draft" | "published" | "unpublished";

interface CourseFormData {
  title: string;
  description: string;
  category: string;
  tags: string[];
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
  tags: [],
  difficultyLevel: "beginner",
  price: 0,
  isFree: false,
  thumbnail: "",
  status: "draft",
  duration: 0,
  instructorId: 1,
};

const CreateCourseDialog = () => {
  const [open, setOpen] = useState(false);
  const createCourse = useCreateCourse();
  const [formData, setFormData] = useState<CourseFormData>(INITIAL_FORM_STATE);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setFormData(INITIAL_FORM_STATE);
  };

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
          ? Number(e.target.value)
          : e.target.value;

      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleTagsChange = (_: any, newValue: string[]) => {
    setFormData((prev) => ({ ...prev, tags: newValue ?? [] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createCourse.mutate(
      { ...formData, tags: formData.tags.join(",") },
      { onSuccess: handleClose }
    );
  };

  const errorMessage = (() => {
    const error: any = createCourse.error;
    return error?.response?.data?.message || "Something went wrong";
  })();

  return (
    <>
      <Button
        variant="contained"
        sx={{
          textTransform: "none",
          background: "linear-gradient(135deg, #61acacff, #4f7f7dff)",
          paddingX: 3,
          paddingY: 1,
          borderRadius: 2,
          fontWeight: 600,
        }}
        onClick={handleOpen}
      >
        + Create Course
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle
          sx={{
            background: "linear-gradient(135deg, #61acacff, #979e9dff)",
            color: "white",
            fontWeight: 700,
            padding: 3,
          }}
        >
          Create New Course
        </DialogTitle>

        <form onSubmit={handleSubmit}>
          <DialogContent sx={{ backgroundColor: "#f8f9fb", padding: 3 }}>
            <Card
              sx={{
                padding: 3,
                borderRadius: 3,
                backgroundColor: "white",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Basic Information
              </Typography>
              <Divider />

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
                multiline
                rows={3}
                fullWidth
                value={formData.description}
                onChange={handleChange}
              />

              <TextField
                label="Category"
                name="category"
                fullWidth
                value={formData.category}
                onChange={handleChange}
              />

              {/* TAGS */}
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={formData.tags}
                onChange={handleTagsChange}
                renderTags={(value, getTagProps) =>
                  value.map((option: string, index: number) => (
                    <Chip
  label={option}
  {...getTagProps({ index })}
  sx={{
    background: "#61acac22",
    border: "1px solid #61acac55",
  }}
/>

                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Tags" placeholder="Add tags..." />
                )}
              />

              <TextField
                select
                name="difficultyLevel"
                label="Difficulty Level"
                fullWidth
                value={formData.difficultyLevel}
                onChange={handleChange}
              >
                <MenuItem value="beginner">Beginner</MenuItem>
                <MenuItem value="intermediate">Intermediate</MenuItem>
                <MenuItem value="advanced">Advanced</MenuItem>
              </TextField>

              <Box display="flex" gap={2}>
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  disabled={formData.isFree}
                  fullWidth
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
                  label="Free"
                />
              </Box>

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
                name="status"
                label="Status"
                fullWidth
                value={formData.status}
                onChange={handleChange}
              >
                <MenuItem value="draft">Draft</MenuItem>
                <MenuItem value="published">Published</MenuItem>
                <MenuItem value="unpublished">Unpublished</MenuItem>
              </TextField>

              {createCourse.isError && (
                <Typography color="error" sx={{ fontSize: "14px" }}>
                  {errorMessage}
                </Typography>
              )}
            </Card>
          </DialogContent>

          <DialogActions sx={{ padding: 2 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={createCourse.isPending}
              sx={{
                textTransform: "none",
                paddingX: 3,
                paddingY: 1,
                background: "linear-gradient(135deg, #667eea, #764ba2)",
              }}
            >
              {createCourse.isPending ? "Creating…" : "Create Course"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default CreateCourseDialog;
