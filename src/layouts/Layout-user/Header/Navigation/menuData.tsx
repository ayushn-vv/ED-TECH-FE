import paths, { rootPaths } from "routes/paths";
import { HeaderItem } from "../../../../types/menu";

export const headerData: HeaderItem[] = [
  {
    label: "Home",
    href: rootPaths.userRoot, // "/user"
  },
  {
    label: "Courses",
    href: `${rootPaths.userRoot}/${paths.coursez}`, // "/user/allcourses"
  },
  {
    label: "Mentor",
    href: "#mentor",
  },
  {
    label: "Group",
    href: "#portfolio",
  },
  {
    label: "Testimonial",
    href: "#testimonial",
  },
  {
    label: "Docs",
    href: "documentation",
  },
];
