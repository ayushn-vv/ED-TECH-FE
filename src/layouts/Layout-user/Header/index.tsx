import { useEffect, useRef, useState } from "react";
import { headerData } from "./Navigation/menuData";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import { paths, rootPaths } from "../../../routes/paths";
import HeaderLink from "./Navigation/HeaderLink";
import MobileHeaderLink from "./Navigation/MobileHeaderLink";
import { SIGN_OUT } from 'redux/authRedux';
import {
  AiOutlineMenu,
  AiOutlineUser,
  AiOutlineSetting,
  AiTwotoneBell,
  AiOutlineDashboard,
} from "react-icons/ai";
import { IoLogOutOutline, IoChevronDown } from "react-icons/io5";
import { MdOutlineContactSupport } from "react-icons/md";
import { BsShieldCheck } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useAuth } from "redux/useAuth";
import { FiShoppingCart } from "react-icons/fi";
import { PiListStarBold } from "react-icons/pi";
// import { Button } from "antd";
import { notification } from 'antd';
const Header: React.FC = () => {
  const navigate = useNavigate();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const { signout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  /* ---------------- Scroll Sticky ---------------- */
  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY >= 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ---------------- Click Outside ---------------- */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setNavbarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLogout = async () => {
      try {
        // console.log('Initiating logout process...');
        const refreshToken = localStorage.getItem('refresh_token');
        // console.log('Refresh Token:', refreshToken);
        if (!refreshToken) {
          console.warn('No refresh token found, forcing logout');
          dispatch(SIGN_OUT());
  
          return;
        }
  
        await signout.mutateAsync(
          { refreshToken },
          {
            onSuccess: () => {
              notification.success({
                message: 'Signout Successful',
                description: 'Your account  log out !',
              });
  
              navigate(`${rootPaths.authRoot}/${paths.signin}`);
            },
            onError: () => {
              notification.error({
                message: 'Signup Failed',
                description: 'Something went wrong',
              });
            },
          },
        );
  
        // localStorage.removeItem("refreshToken");
        // navigate(paths.signin);
      } catch (err) {
        console.log('Logout error:', err);
      }
    };
  /* ---------------- Body Scroll Lock ---------------- */
  useEffect(() => {
    document.body.style.overflow = navbarOpen ? "hidden" : "";
  }, [navbarOpen]);

  /* ---------------- Menu Items ---------------- */
  const menuItems = [
    {
      icon: <AiOutlineUser className="text-xl" />,
      label: "Profile",
      description: "View your profile",
      onClick: () => navigate("/profile"),
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <AiOutlineDashboard className="text-xl" />,
      label: "Dashboard",
      description: "Analytics & insights",
      onClick: () => navigate("/dashboard"),
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <AiOutlineSetting className="text-xl" />,
      label: "Settings",
      description: "Manage preferences",
      onClick: () => navigate("/settings"),
      gradient: "from-gray-500 to-gray-700",
    },
    {
      icon: <AiTwotoneBell className="text-xl" />,
      label: "Notifications",
      description: "3 unread messages",
      onClick: () => navigate("/notifications"),
      gradient: "from-orange-500 to-red-500",
      badge: "3",
    },
    {
      icon: <BsShieldCheck className="text-xl" />,
      label: "Security",
      description: "Privacy & security",
      onClick: () => navigate("/security"),
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: <MdOutlineContactSupport className="text-xl" />,
      label: "Help & Support",
      description: "Get assistance",
      onClick: () => navigate("/help"),
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      icon: <IoLogOutOutline className="text-xl" />,
      label: "Logout",
      description: "Sign out securely",
      onClick: () => handleLogout(),
      gradient: "from-red-500 to-rose-600",
      isDanger: true,
    },
  ];

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .dropdown-enter {
          animation: slideDown 0.3s ease-out;
        }
        
        .menu-item-hover:hover .icon-bg {
          transform: scale(1.1) rotate(5deg);
        }
        
        .menu-item-hover:hover .arrow-icon {
          transform: translateX(4px);
        }
      `}</style>

      <header
        className={`fixed top-0 z-40 w-full bg-white transition-all duration-300 ${
          sticky ? "shadow-lg py-4" : "py-5"
        }`} 
      >
      
        <div className="container mx-auto lg:max-w-screen-xl px-4 flex items-center justify-between" style={{marginLeft: 40}}>
          {/* Logo */}
          <Logo />
         
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex flex-grow justify-center gap-8">
            {headerData.map((item, i) => (
              <HeaderLink key={i} item={item} />
            ))}
          </nav>
           
          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Desktop Dropdown */}
            <PiListStarBold className="w-44px h-44px" style={{height:'24px',width:'24px',marginRight:'18px'}}/>
                <FiShoppingCart className="w-44px h-44px" style={{height:'24px',width:'24px',marginRight:'18px'}}/>
            <div className="hidden lg:block relative" ref={dropdownRef}>
              <button
  onClick={() => setDropdownOpen(!dropdownOpen)}
  className="
    group relative flex items-center gap-3
    rounded-full
    bg-gradient-to-r from-primary to-primary/90
    px-10 py-14
    text-black font-medium
    // shadow-md
    hover:shadow-lg hover:shadow-primary/40
    transition-all duration-300
    overflow-hidden
  "
  style={{padding: 3,marginRight: 5}}
>
   
  <AiOutlineMenu className="text-xxxl relative z-14" />
  Menu
  {/* Shine animation */}
  {/* <span
    className="
      absolute inset-0
      bg-gradient-to-r from-transparent via-white/30 to-transparent
      -translate-x-full group-hover:translate-x-full
      transition-transform duration-1000
    "
  /> */}

  {/* Content */}
  <IoChevronDown
    className={`text-lg relative z-10 transition-transform duration-300 ${
      dropdownOpen ? "rotate-180" : ""
    }`}
  />
</button>


              {/* Enhanced Dropdown */}
              {dropdownOpen && (
                <div
                  className="
                    dropdown-enter
                    absolute right-0 mt-4 w-70
                    rounded-2xl border border-gray-100
                    bg-white/80 backdrop-blur-2xl
                    shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]
                    overflow-hidden
                    z-50
                  "
                 
                >
                  {/* Header */}
                  <div className="bg-gradient-to-r from-primary/10 to-primary/15 px-10 py-14 border-b border-gray-100 " style={{justifyContent: 'center', textAlign: 'center' }}>
                    <h3 className="text-sm font-semibold text-gray-900">Account Menu</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Manage your account & settings</p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {menuItems.map((item, index) => (
                      <div key={index} >
                        {item.isDanger && (
                          <div className="my-2 mx-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"  style={{gap: '8px'}} />
                        )}

                        <button
                          onClick={() => {
                            item.onClick();
                            setDropdownOpen(false);
                          }}
                          className={`
                            menu-item-hover group w-full flex items-center gap-4
                            px-5 py-3.5 text-left
                            transition-all duration-300
                            hover:bg-gradient-to-r ${
                              item.isDanger 
                                ? "hover:from-red-50 hover:to-rose-50" 
                                : "hover:from-primary/5 hover:to-primary/10"
                            }
                            ${item.isDanger ? "text-red-600" : "text-gray-700"}
                          `}
                        >
                          {/* Icon with gradient background */}
                          <div className="relative">
                            <div
                              className={`
                                icon-bg
                                flex items-center justify-center
                                w-11 h-11 rounded-xl
                                bg-gradient-to-br ${item.gradient}
                                text-white
                                transition-all duration-300
                                shadow-md group-hover:shadow-lg
                              `}
                            >
                              {item.icon}
                            </div>
                            {item.badge && (
                              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                                {item.badge}
                              </span>
                            )}
                          </div>

                          {/* Text Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-semibold">{item.label}</span>
                              <IoChevronDown className="arrow-icon text-gray-400 -rotate-90 transition-transform duration-300" />
                            </div>
                            <p className="text-xs text-gray-500 mt-0.5 truncate">
                              {item.description}
                            </p>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="bg-gray-50/80 px-6 py-3 border-t border-gray-100">
                    <p className="text-xs text-gray-400 text-center">
                      Version 2.0.1 • © 2025
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setNavbarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open mobile menu"
            >
              <span className="block w-6 h-0.5 bg-black" />
              <span className="block w-6 h-0.5 bg-black mt-1.5" />
              <span className="block w-6 h-0.5 bg-black mt-1.5" />
            </button>
          </div>
        </div>

        {/* Mobile Overlay */}
        {navbarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-[fadeIn_0.3s_ease-out]"
            onClick={() => setNavbarOpen(false)}
          />
        )}

        {/* Enhanced Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50
            transform transition-transform duration-500 ease-out
            shadow-[-10px_0_40px_rgba(0,0,0,0.3)]
            ${navbarOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Mobile Header */}
          <div className="flex items-center justify-between p-5 border-b bg-gradient-to-r from-primary/5 to-transparent">
            <Logo />
            <button 
              onClick={() => setNavbarOpen(false)}
              className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-600 hover:text-gray-900 text-2xl font-light"
            >
              ✕
            </button>
          </div>

          {/* Mobile Navigation */}
          <nav className="p-4 border-b">
            {headerData.map((item, i) => (
              <MobileHeaderLink key={i} item={item} />
            ))}
          </nav>

          {/* Mobile Menu Items */}
          <div className="p-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
              Account
            </h4>
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick();
                  setNavbarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3
                  px-3 py-3 rounded-xl mb-1
                  transition-all duration-200
                  hover:bg-gray-50
                  ${item.isDanger ? "text-red-600" : "text-gray-700"}
                `}
              >
                <div
                  className={`
                    flex items-center justify-center
                    w-10 h-10 rounded-lg
                    bg-gradient-to-br ${item.gradient}
                    text-white shadow-md
                  `}
                >
                  {item.icon}
                </div>
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500">{item.description}</div>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;