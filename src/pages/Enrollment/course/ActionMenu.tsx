/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Dropdown, MenuProps } from "antd";
import IconifyIcon from "components/base/IconifyIcon";
import { useDeleteCourse } from "../../../redux/useCourse";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import paths from "routes/paths";
import UpdateCourseDialog from "./feat/editCourse";

interface ActionMenuProps {
  recordId: string | number;
  rowData: any; // Full row data
}

export default function ActionMenu({ recordId, rowData }: ActionMenuProps) {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const deleteCourse = useDeleteCourse();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // console.log("Row Data:", rowData,recordId);
  // Convert string → number if needed
  const id = typeof recordId === "string" ? Number(recordId) : recordId;
   console.log("Record ID:", id);
  const items: MenuProps["items"] = [
    {
      key: "view",
      label: "View",
      icon: <IconifyIcon icon="hugeicons:file-view" />,
    },
    // {
    //   key: "edit",
    //   label: "Edit",
    //   icon: <IconifyIcon icon="hugeicons:pencil-edit-02" />,
    // },
    // {
    //   key: "remove",
    //   label: "Remove",
    //   danger: true,
    //   icon: <IconifyIcon icon="hugeicons:delete-02" color="red" />,
    // },
  ];

  const onMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case "view":
        navigate(paths.courseById(id));
        break;

      case "edit":
        setSelectedCourse(rowData);
        setOpenEditDialog(true);
        break;

      case "remove":
        deleteCourse.mutate(id, {
          onSuccess: () =>
            queryClient.invalidateQueries({ queryKey: ["courses"] }),
        });
        break;
    }
  };

  return (
    <>
      <Dropdown menu={{ items, onClick: onMenuClick }} trigger={["click"]}>
        <span style={{ cursor: "pointer" }}>
          <IconifyIcon icon="iconamoon:menu-kebab-horizontal-fill" />
        </span>
      </Dropdown>

      {/* EDIT DIALOG */}
      {openEditDialog && selectedCourse && (
        <UpdateCourseDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          courseId={selectedCourse.id}
          initialData={selectedCourse}
        />
      )}
    </>
  );
}
