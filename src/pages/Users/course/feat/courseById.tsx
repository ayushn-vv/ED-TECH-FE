import {
  Box,
  Card,
  Typography,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  Paper,
  Breadcrumbs,
} from '@mui/material';
import { useGetCourseById } from '../../../../redux/useCourse';
import { useParams } from 'react-router-dom';
import { SiBombardier } from "react-icons/si";
import paths from 'routes/paths';
import { Link as RouterLink } from 'react-router-dom';
// -------------------
// Correct Course Type
// -------------------

const ArrowSeparator = (
  <svg width="16" height="16" viewBox="0 0 24 24" style={{ margin: '0 4px' }}>
    <path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);
interface Course {
  id: number;
  title: string;
  description?: string;
  category?: string;
  tags?: string;
  difficultyLevel?: string;
  price?: number;
  isFree?: boolean;
  thumbnail?: string;
  status?: string;
  duration?: number;
  instructorId?: number;
}

// -------------------
const CourseListPage = () => {
  const params = useParams<{ id: string }>();

  const courseId = params.id ? Number(params.id) : undefined;

  const { data, isLoading, isError, error } = useGetCourseById(
    courseId ? Number(courseId) : 0
  );

  const course: Course | undefined = data?.data
    ? {
        ...data.data,
        duration:
          data.data.duration !== undefined &&
          data.data.duration !== null &&
          data.data.duration !== ''
            ? Number(data.data.duration)
            : undefined,
      }
    : undefined;

  // -------------------
  // Validations
  // -------------------
  if (!courseId) {
    return (
      <Box p={3}>
        <Alert severity="warning">No course ID provided in the URL.</Alert>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box height="70vh" display="flex" alignItems="center" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={3}>
        <Alert severity="error">
          {error instanceof Error ? error.message : 'Failed to load course'}
        </Alert>
      </Box>
    );
  }

  if (!course) {
    return (
      <Box p={3}>
        <Alert severity="info">No course found.</Alert>
      </Box>
    );
  }

  // -------------------
  // UI
  // -------------------
  return (
    <>
    
    <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
      <h1>Hell</h1>
      <Breadcrumbs separator={ArrowSeparator} aria-label="breadcrumb" sx={{ mb: 2 }}>
                <Box
                  component={RouterLink}
                  to={paths.dashboard}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    px: 1.2,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: 'grey.100',
                    fontSize: 14,
                    fontWeight: 500,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                      bgcolor: 'grey.200',
                    },
                  }}
                >
                  Dashboard
                </Box>
      
                <Typography
                  sx={{
                    px: 1.2,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: 'grey.200',
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  Course Management
                </Typography>
                 <Typography
                  sx={{
                    px: 1.2,
                    py: 0.5,
                    borderRadius: 2,
                    bgcolor: 'grey.200',
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  CourseById Management
                </Typography>
              </Breadcrumbs>
      <Typography variant="h4" fontWeight={700} mb={3}>
        Course Details
      </Typography>
      
      <Card
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
        }}
      >
       
        {/* Title */}
        <Typography variant="h5" fontWeight={700} gutterBottom>
          <SiBombardier />{course.title}
        </Typography>

        {/* Chips */}
        <Box mt={1} display="flex" gap={1} flexWrap="wrap">
          {course.category && (
            <Chip label={course.category} color="primary" variant="outlined" sx={{p:1}} />
          )}

          {course.difficultyLevel && (
            <Chip label={course.difficultyLevel} color="secondary" variant="outlined" sx={{p:1}} />
          )}

          {course.status && (
            <Chip
              label={course.status.toUpperCase()}
              color={course.status === 'published' ? 'success' : 'warning'} sx={{p:1}}
            />
          )}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Price */}
        <Typography variant="h6" fontWeight={600}>
          Price:{' '}
          <span style={{ color: '#1976d2' }}>
            {course.isFree ? 'Free' : `₹${course.price}`}
          </span>
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Description */}
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Description
        </Typography>

        <Typography sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
          {course.description || 'No description provided.'}
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* Tags */}
        {course.tags && (
          <>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Tags
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>{course.tags}</Typography>

            <Divider sx={{ my: 3 }} />
          </>
        )}

        {/* Duration */}
        {course.duration && (
          <Typography variant="h6" fontWeight={600}>
            Duration: {course.duration} hours
          </Typography>
        )}
      </Card>
    </Paper>
    </>
  );
};

export default CourseListPage;
