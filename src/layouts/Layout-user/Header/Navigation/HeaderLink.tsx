import { Link, useLocation } from "react-router-dom";
import { HeaderItem } from "../../../../types/menu";
import { useState } from "react";

const HeaderLink: React.FC<{ item: HeaderItem }> = ({ item }) => {
  const { pathname } = useLocation();
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const isHashLink = item.href.startsWith("#");

  const isActive =
    !isHashLink &&
    (
      pathname === item.href ||
      pathname.startsWith(item.href + "/") ||
      item.submenu?.some(
        sub =>
          pathname === sub.href ||
          pathname.startsWith(sub.href + "/")
      )
    );

  return (
    <div
      className="relative"
      onMouseEnter={() => item.submenu && setSubmenuOpen(true)}
      onMouseLeave={() => setSubmenuOpen(false)}
    >
      {/* MAIN LINK */}
      <Link
        to={item.href}
        className={`
          group relative flex items-center gap-2
          px-7 py-3 text-lg capitalize
          rounded-full
          transition-all duration-300 ease-out
          ${
            isActive
              ? `
                bg-gradient-to-r from-primary/20 to-primary/10
                text-primary
                shadow-[0_0_22px_rgba(99,102,241,0.35)]
                ring-2 ring-primary/30
                scale-[1.04]
              `
              : `
                text-grey
                hover:text-black
                hover:bg-black/5
                hover:shadow-md
                hover:scale-[1.03]
              `
          }
        `}
      >
        {/* Animated underline */}
        <span
          className={`
            absolute bottom-1 left-1/2
            h-[4px] w-8
            -translate-x-1/2
            rounded-full
            bg-primary
            transition-all duration-300
            ${
              isActive
                ? "opacity-100 scale-100"
                : "opacity-0 scale-50 group-hover:opacity-70"
            }
          `}
        />

        {/* Text */}
        <span className="relative z-10 font-semibold tracking-wide">
          {item.label}
        </span>

        {/* Arrow */}
        {item.submenu && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.3em"
            height="1.3em"
            viewBox="0 0 24 24"
            className={`
              transition-transform duration-300
              ${submenuOpen ? "rotate-180" : ""}
            `}
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m7 10l5 5l5-5"
            />
          </svg>
        )}
      </Link>

      {/* SUBMENU */}
      {submenuOpen && item.submenu && (
        <div className="absolute left-1/2 z-50 mt-3 w-64 -translate-x-1/2 rounded-2xl bg-blue p-3 shadow-2xl backdrop-blur">
          {item.submenu.map((subItem, index) => {
            const isSubActive =
              pathname === subItem.href ||
              pathname.startsWith(subItem.href + "/");

            return (
              <Link
                key={index}
                to={subItem.href}
                className={`
                  block rounded-xl px-6 py-4 text-sm font-medium
                  transition-all duration-200
                  ${
                    isSubActive
                      ? "bg-primary text-white shadow-md"
                      : "text-black hover:bg-primary/10 hover:translate-x-1"
                  }
                `}
              >
                {subItem.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HeaderLink;
