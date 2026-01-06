import { useEffect, useMemo, useState } from "react";
import { User, Flame } from "lucide-react";

/* ================= TYPES ================= */

type UserType = {
  name: string;
  email?: string;
  coursesEnrolled?: number;
  completionRate?: number;
  learningStreak?: number;
};

/* ================= HERO ================= */

const Hero = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      console.error("Invalid user data");
    }
  }, []);

  const stats = useMemo(
    () => ({
      courses: user?.coursesEnrolled ?? 0,
      completion: user?.completionRate ?? 0,
      streak: user?.learningStreak ?? 0,
    }),
    [user]
  );

  return (
    <section
      id="home-section"
      className="relative overflow-hidden bg-blue-50 via-indigo-50 to-purple-50 py-6 lg:py-10"
      style={{ marginTop: "-40px" }}
    >
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-24 left-10 w-72 h-72 bg-purple-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />

      <div className="relative z-10 w-full px-4 lg:px-6">
        {/* ================= USER CARD ================= */}
        {user && (
          <div className="mb-4 flex justify-center lg:justify-start animate-fadeIn" style={{backgroundColor:'#e1e6f1'}}>
            <div className="w-full" >
              <div
                className="
                  relative overflow-hidden
                  border border-white/60
                  shadow-[0_20px_60px_rgba(10,0,0,0.15)]
                  hover:shadow-[0_30px_80px_rgba(10,0,0,0.2)]
                  transition-all duration-300
                " 
              >
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 px-6 py-5" style={{padding:6}}>
                  <div className="flex items-center justify-between gap-6" style={{paddingRight:25}}>
                    {/* Left */}
                    <div className="flex items-center gap-6" style={{paddingLeft:8 }}>
                      {/* Avatar */}
                      <div className="
                        relative h-16 w-16 rounded-full
                        bg-white/20 border border-white/40
                        flex items-center justify-center
                        shadow-lg
                      " >
                        <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping opacity-20" />
                        <User size={30} className="text-white" />
                      </div>

                      {/* User info */}
                      <div>
                        <p className="text-white/80 text-sm">
                          Welcome back 👋
                        </p>
                        <h2 className="text-white font-bold text-2xl leading-tight">
                          {user.name}
                        </h2>
                        {user.email && (
                          <p className="text-white/70 text-xs">
                            {user.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right */}
                    <div className="
                      hidden md:flex items-center gap-2
                      bg-white/20 px-4 py-2 rounded-full
                      border border-white/30
                      shadow-inner
                    " style={{paddingRight:15}}>
                      <Flame className="text-orange-300 animate-pulse" />
                      <span className="text-white font-semibold text-sm">
                        {stats.streak} day streak
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer strip */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ================= ANIMATIONS ================= */}
      <style>{`
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
