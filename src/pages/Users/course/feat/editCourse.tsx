/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  Modal,
  Input,
  Button,
  Select,
  Checkbox,
  Tag,
  InputNumber,
  message,
  // Divider,
  Space,
  Typography,
  Card,
  Row,
  Col,
  Image,
} from "antd";
import {
  CloseOutlined,
  PlusOutlined,
  DollarOutlined,
  ClockCircleOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import { useUpdateCourse } from "redux/useCourse";

const { TextArea } = Input;
const { Title, Text } = Typography;

// ---------------- TYPES ----------------
type DifficultyLevel = "beginner" | "intermediate" | "advanced";
type CourseStatus = "draft" | "published" | "unpublished";

export interface CourseFormData {
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

interface UpdateCourseDialogProps {
  open: boolean;
  onClose: () => void;
  courseId: number;
  initialData: CourseFormData;
}

// -----------------------------------------
const UpdateCourseDialog = ({
  open,
  onClose,
  courseId,
  initialData,
}: UpdateCourseDialogProps) => {
  const updateCourse = useUpdateCourse();

  const [formData, setFormData] = useState<CourseFormData>(initialData);
  const [debouncedData, setDebouncedData] = useState(formData);
  const [tagInput, setTagInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");

  // Parse tags and categories as arrays
  const tags = formData.tags
    ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];
  const categories = formData.category
    ? formData.category.split(",").map((c) => c.trim()).filter(Boolean)
    : [];

  // Load initial data when dialog opens
  useEffect(() => {
    if (open) setFormData(initialData);
  }, [open, initialData]);

  // Debounce (500ms)
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedData(formData);
    }, 500);
    return () => clearTimeout(t);
  }, [formData]);

  // Handle Input Change
  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle Tag Addition
  const handleAddTag = () => {
    if (tagInput.trim()) {
      const newTags = [...tags, tagInput.trim()];
      setFormData((prev) => ({ ...prev, tags: newTags.join(", ") }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setFormData((prev) => ({ ...prev, tags: newTags.join(", ") }));
  };

  // Handle Category Addition
  const handleAddCategory = () => {
    if (categoryInput.trim()) {
      const newCategories = [...categories, categoryInput.trim()];
      setFormData((prev) => ({ ...prev, category: newCategories.join(", ") }));
      setCategoryInput("");
    }
  };

  const handleRemoveCategory = (categoryToRemove: string) => {
    const newCategories = categories.filter((cat) => cat !== categoryToRemove);
    setFormData((prev) => ({ ...prev, category: newCategories.join(", ") }));
  };

  // Submit Form
  const handleSubmit = () => {
    updateCourse.mutate(
      { id: courseId, body: debouncedData },
      {
        onSuccess: () => {
          message.success("Course updated successfully!");
          onClose();
        },
        onError: (error: any) => {
          const errMsg =
            error?.response?.data?.message ||
            error?.message ||
            "Error occurred";
          message.error(errMsg);
        },
      }
    );
  };

  const difficultyColors = {
    beginner: "green",
    intermediate: "orange",
    advanced: "red",
  };

  const statusIcons = {
    draft: "📝",
    published: "✅",
    unpublished: "❌",
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={800}
      centered
      maskClosable={false}
      getContainer={false}
      modalRender={(modal) => (
        <div style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
        }}>
          {modal}
        </div>
      )}
      styles={{
        mask: {
          backdropFilter: 'blur(8px)',
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
        },
      }}
      title={
        <div
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            padding: "20px 24px",
            margin: "-20px -24px 20px",
            borderRadius: "8px 8px 0 0",
          }}
        >
          <Title level={3} style={{ color: "white", margin: 0 }}>
            Update Course
          </Title>
        </div>
      }
      footer={
        <Space>
          <Button size="large" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            loading={updateCourse.isPending}
            onClick={handleSubmit}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              border: "none",
            }}
          >
            {updateCourse.isPending ? "Updating..." : "Update Course"}
          </Button>
        </Space>
      }
      closeIcon={<CloseOutlined style={{ color: "white" }} />}
    >
      <div style={{ padding: "20px 0" }}>
        {/* Basic Information */}
        <Card
          title={<Text strong style={{ color: "#667eea" }}>Basic Information</Text>}
          style={{ marginBottom: 20 }}
          size="small"
        >
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <div>
              <Text strong>Course Title</Text>
              <Input
                size="large"
                placeholder="Enter course title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                style={{ marginTop: 8 }}
              />
            </div>

            <div>
              <Text strong>Description</Text>
              <TextArea
                rows={4}
                placeholder="Enter course description"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                style={{ marginTop: 8 }}
              />
            </div>
          </Space>
        </Card>

        {/* Categories */}
        <Card
          title={<Text strong style={{ color: "#667eea" }}>Categories</Text>}
          style={{ marginBottom: 20 }}
          size="small"
        >
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Input
              size="large"
              placeholder="Type and press Enter or click +"
              value={categoryInput}
              onChange={(e) => setCategoryInput(e.target.value)}
              onPressEnter={handleAddCategory}
              suffix={
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddCategory}
                  size="small"
                />
              }
            />

            {categories.length > 0 && (
              <div>
                {categories.map((category, index) => (
                  <Tag
                    key={index}
                    color="blue"
                    closable
                    onClose={() => handleRemoveCategory(category)}
                    style={{ marginBottom: 8, padding: "4px 10px", fontSize: 14 }}
                  >
                    {category}
                  </Tag>
                ))}
              </div>
            )}
          </Space>
        </Card>

        {/* Tags */}
        <Card
          title={<Text strong style={{ color: "#667eea" }}>Tags</Text>}
          style={{ marginBottom: 20 }}
          size="small"
        >
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Input
              size="large"
              placeholder="Type and press Enter or click +"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onPressEnter={handleAddTag}
              suffix={
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddTag}
                  size="small"
                  style={{ background: "#eb2f96" }}
                />
              }
            />

            {tags.length > 0 && (
              <div>
                {tags.map((tag, index) => (
                  <Tag
                    key={index}
                    color="magenta"
                    closable
                    onClose={() => handleRemoveTag(tag)}
                    style={{ marginBottom: 8, padding: "4px 10px", fontSize: 14 }}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </Space>
        </Card>

        {/* Course Details */}
        <Card
          title={<Text strong style={{ color: "#667eea" }}>Course Details</Text>}
          style={{ marginBottom: 20 }}
          size="small"
        >
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Text strong>Difficulty Level</Text>
                <Select
                  size="large"
                  style={{ width: "100%", marginTop: 8 }}
                  value={formData.difficultyLevel}
                  onChange={(value) => handleChange("difficultyLevel", value)}
                >
                  <Select.Option value="beginner">
                    <Tag color={difficultyColors.beginner}>Beginner</Tag>
                  </Select.Option>
                  <Select.Option value="intermediate">
                    <Tag color={difficultyColors.intermediate}>Intermediate</Tag>
                  </Select.Option>
                  <Select.Option value="advanced">
                    <Tag color={difficultyColors.advanced}>Advanced</Tag>
                  </Select.Option>
                </Select>
              </Col>

              <Col xs={24} sm={12}>
                <Text strong>Status</Text>
                <Select
                  size="large"
                  style={{ width: "100%", marginTop: 8 }}
                  value={formData.status}
                  onChange={(value) => handleChange("status", value)}
                >
                  <Select.Option value="draft">
                    {statusIcons.draft} Draft
                  </Select.Option>
                  <Select.Option value="published">
                    {statusIcons.published} Published
                  </Select.Option>
                  <Select.Option value="unpublished">
                    {statusIcons.unpublished} Unpublished
                  </Select.Option>
                </Select>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Text strong>Duration (hours)</Text>
                <InputNumber
                  size="large"
                  style={{ width: "100%", marginTop: 8 }}
                  min={0}
                  value={formData.duration}
                  onChange={(value) => handleChange("duration", value || 0)}
                  prefix={<ClockCircleOutlined />}
                />
              </Col>

              <Col xs={24} sm={12}>
                <Text strong>Price</Text>
                <InputNumber
                  size="large"
                  style={{ width: "100%", marginTop: 8 }}
                  min={0}
                  disabled={formData.isFree}
                  value={formData.price}
                  onChange={(value) => handleChange("price", value || 0)}
                  prefix={<DollarOutlined />}
                />
              </Col>
            </Row>

            <Checkbox
              checked={formData.isFree}
              onChange={(e) => handleChange("isFree", e.target.checked)}
            >
              <Text strong>Free Course</Text>
            </Checkbox>
          </Space>
        </Card>

        {/* Thumbnail */}
        <Card
          title={<Text strong style={{ color: "#667eea" }}>Thumbnail</Text>}
          size="small"
        >
          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Input
              size="large"
              placeholder="Enter thumbnail URL"
              value={formData.thumbnail}
              onChange={(e) => handleChange("thumbnail", e.target.value)}
              prefix={<PictureOutlined />}
            />

            {formData.thumbnail && (
              <div style={{ textAlign: "center" }}>
                <Image
                  src={formData.thumbnail}
                  alt="Thumbnail preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: 200,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                  fallback="data:image/png;base64,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"
                />
              </div>
            )}
          </Space>
        </Card>
      </div>
    </Modal>
  );
};

export default UpdateCourseDialog;