import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 scroll-smooth">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow w-full pt-74 pb-10">
        <div className="mx-auto w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;
