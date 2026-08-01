"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, memo, useCallback, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronDown, 
  LogOut, 
  LayoutDashboard, 
  Menu, 
  X, 
  Trophy,
  ClipboardList,
  User
} from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "@/src/context/AuthContext";

// 🚀 Performance: Click outside hook (Fixed: using useEffect instead of useState)
function useClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  handler: () => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

// Performance: Memoized UserDropdown with Framer Motion & Lucide
const UserDropdown = memo(
  ({
    user,
    onLogout,
  }: {
    user: { fullName: string; email: string; avatar?: string; role: string };
    onLogout: () => void;
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);
    useClickOutside(dropdownRef, () => setIsOpen(false));

    const avatarUrl =
      user.avatar ||
      `/user.png`;

    return (
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 p-1 rounded-full border border-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Image
            src={avatarUrl}
            alt={user.fullName}
            width={34}
            height={34}
            className="rounded-full object-cover ring-2 ring-gray-100"
          />
          <span className="hidden md:block text-sm font-medium text-gray-700">
            {user.fullName}
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              role="menu"
              className="absolute right-0 mt-2 w-60 origin-top-right rounded-xl border border-gray-100 bg-white p-1 shadow-lg shadow-black/5 ring-1 ring-black/5 z-50"
            >
              <div className="px-4 py-3 border-b border-gray-50">
                <p className="text-sm font-semibold text-gray-900 truncate">{user.fullName}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              
              <div className="py-1">
                 <Link
                  href={user.role === "admin" ? "/admin/profile" : "/candidate/profile"}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-indigo-600"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-4 w-4" /> Profile
                </Link>
                <Link
                  href={user.role === "admin" ? "/admin" : "/candidate/dashboard"}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 hover:text-indigo-600"
                  role="menuitem"
                  onClick={() => setIsOpen(false)}
                >
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
              </div>

              <div className="border-t border-gray-50 py-1">
                <button
                  onClick={onLogout}
                  className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                  role="menuitem"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);
UserDropdown.displayName = "UserDropdown";

export default function Navbar() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname(); // Can be used for active link styling if needed

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAssessmentsOpen, setIsAssessmentsOpen] = useState(false);
  
  const assessmentsRef = useRef<HTMLDivElement>(null);
  useClickOutside(assessmentsRef, () => setIsAssessmentsOpen(false));

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      Swal.fire({
        icon: "success",
        title: "Logged out successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      // Even if API fails (e.g., token already expired), we should still redirect
      console.error("Logout API failed:", error);
    } finally {
      router.push("/login");
    }
  }, [logout, router]);

  const assessmentCategories = [
    { name: "All Assessments", href: "/assessments", icon: "📋" },
    { name: "React", href: "/assessments/react", icon: "⚛️" },
    { name: "TypeScript", href: "/assessments/typescript", icon: "📘" },
    { name: "JavaScript", href: "/assessments/javascript", icon: "⚡" },
    { name: "CSS & Tailwind", href: "/assessments/css", icon: "🎨" },
    { name: "Next.js", href: "/assessments/nextjs", icon: "▲" },
  ];

  //  Loading skeleton for better UX
  if (isLoading) {
    return (
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="h-9 w-32 bg-gray-200 rounded-md animate-pulse" />
            <div className="hidden md:flex space-x-8">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="h-10 w-36 bg-gray-200 rounded-full animate-pulse" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1">
            <Image
              src="/logo1.png"
              alt="FrontendIQ logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain rounded-lg"
              priority
            />
            <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">FrontendIQ</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Assessments Dropdown */}
            <div className="relative" ref={assessmentsRef}>
              <button
                onClick={() => setIsAssessmentsOpen(!isAssessmentsOpen)}
                className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-2 py-1"
                aria-expanded={isAssessmentsOpen}
                aria-haspopup="true"
              >
                <span>Assessments</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isAssessmentsOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isAssessmentsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    role="menu"
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl shadow-black/5 ring-1 ring-black/5 p-2 z-50"
                  >
                    {assessmentCategories.map((category) => (
                      <Link
                        key={category.href}
                        href={category.href}
                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors text-gray-700"
                        role="menuitem"
                        onClick={() => setIsAssessmentsOpen(false)}
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-medium text-sm">{category.name}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/features" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-2 py-1">
              Features
            </Link>
            
            <Link href="/pricing" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-2 py-1">
              Pricing
            </Link>

            {/* {isAuthenticated && (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-2 py-1"
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
                <Link
                  href="/leaderboard"
                  className="flex items-center gap-1.5 text-gray-600 hover:text-indigo-600 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md px-2 py-1"
                >
                  <Trophy className="w-4 h-4" /> Leaderboard
                </Link>
              </>
            )} */}
          </div>

          {/* Right Side: CTA & Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <Link
                  href="/assessments/start"
                  className="px-5 py-2.5 bg-linear-to-tr from-[#3452F3] to-[#442a94] text-white rounded-full hover:shadow-lg hover:shadow-indigo-500/25 transition-all font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center gap-2"
                >
                  <ClipboardList className="w-4 h-4" /> Start Assessment
                </Link>
                <UserDropdown
                  user={{
                    fullName: user.fullName,
                    email: user.email,
                    avatar: user.avatar,
                    role: user.role,
                  }}
                  onLogout={handleLogout}
                />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2.5 bg-linear-to-tr from-[#3452F3] to-[#442a94] text-white rounded-full hover:shadow-lg hover:shadow-indigo-500/25 transition-all font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Log in
                </Link>
                {/* <Link
                  href="/register"
                  className="px-5 py-2.5 bg-linear-to-tr from-[#3452F3] to-[#442a94] text-white rounded-full hover:shadow-lg hover:shadow-indigo-500/25 transition-all font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Get Started
                </Link> */}
                 <Link
                  href="/become-recruiter"
                  className="px-5 py-2.5 border border-gray-300 rounded-full hover:shadow-lg hover:shadow-indigo-500/25 transition-all font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Become a Recruiter
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl"
            >
              <div className="py-4 space-y-4 px-2">
                {/* Assessments Accordion */}
                <div className="bg-gray-50 rounded-xl p-2">
                  <button
                    onClick={() => setIsAssessmentsOpen(!isAssessmentsOpen)}
                    className="flex items-center justify-between w-full text-gray-800 font-medium p-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <ClipboardList className="w-5 h-5 text-indigo-600" />
                      <span>Assessments</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isAssessmentsOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isAssessmentsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 space-y-1 pl-2 border-l-2 border-indigo-100 ml-4">
                          {assessmentCategories.map((category) => (
                            <Link
                              key={category.href}
                              href={category.href}
                              className="flex items-center gap-3 py-2 px-3 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <span className="text-lg">{category.icon}</span>
                              <span className="text-sm font-medium">{category.name}</span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex flex-col space-y-1 px-2 pb-2 border-b border-gray-100">
                  <Link
                    href="/features"
                    className="flex items-center gap-3 text-gray-700 font-medium p-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link
                    href="/blogs"
                    className="flex items-center gap-3 text-gray-700 font-medium p-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Blogs
                  </Link>
                  <Link
                    href="/pricing"
                    className="flex items-center gap-3 text-gray-700 font-medium p-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                </div>

                {isAuthenticated && (
                  <div className="space-y-1 px-2">
                    <Link
                      href={user?.role === "admin" ? "/admin" : "/candidate/dashboard"}
                      className="flex items-center gap-3 text-gray-700 font-medium p-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LayoutDashboard className="w-5 h-5 text-indigo-600" /> Dashboard
                    </Link>
                    <Link
                      href="/leaderboard"
                      className="flex items-center gap-3 text-gray-700 font-medium p-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Trophy className="w-5 h-5 text-indigo-600" /> Leaderboard
                    </Link>
                  </div>
                )}

                {/* Mobile Auth Section */}
                <div className="px-2 pt-4 border-t border-gray-100">
                  {isAuthenticated && user ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <Image
                          src={user.avatar || `/user.png`}
                          alt={user.fullName}
                          width={44}
                          height={44}
                          className="rounded-full ring-2 ring-white object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-gray-900 truncate">{user.fullName}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="/assessments/start"
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 text-white rounded-xl font-medium text-sm"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Start Test
                        </Link>
                        <button
                          onClick={() => {
                            handleLogout();
                            setIsMobileMenuOpen(false);
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl font-medium text-sm transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/login"
                        className="flex justify-center items-center px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Log in
                      </Link>
                      <Link
                        href="/register"
                        className="flex justify-center items-center px-4 py-3 bg-linear-to-tr from-[#3452F3] to-[#442a94] text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Get Started
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}