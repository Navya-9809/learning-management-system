import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, LogOut, User, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 bg-black text-white shadow-xl shadow-black/50 backdrop-blur-sm border-b border-zinc-800"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="group flex items-center gap-2 font-bold text-xl tracking-tight">
          <motion.span
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="flex items-center justify-center rounded-xl bg-orange-500 p-2 shadow-lg shadow-orange-500/30"
          >
            <BookOpen className="h-6 w-6 text-black" />
          </motion.span>
          <span className="bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
            LearnHub
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link to="/" className="group flex items-center gap-1.5 rounded-lg px-3 py-2 text-zinc-400 transition hover:bg-orange-500/20 hover:text-orange-400">
            <GraduationCap className="h-4 w-4 transition group-hover:scale-110" />
            <span>Courses</span>
          </Link>
          {isAuthenticated && (
            <Link
              to="/my-courses"
              className="group flex items-center gap-1.5 rounded-lg px-3 py-2 text-zinc-400 transition hover:bg-orange-500/20 hover:text-orange-400"
            >
              <BookOpen className="h-4 w-4 transition group-hover:scale-110" />
              <span>My Courses</span>
            </Link>
          )}

          {isAuthenticated ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <span className="hidden items-center gap-1.5 text-sm text-zinc-500 sm:flex">
                <User className="h-4 w-4" />
                {user?.name}
              </span>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-xl bg-zinc-800 px-4 py-2 text-sm transition hover:bg-orange-600"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </motion.button>
            </motion.div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm text-zinc-400 transition hover:bg-orange-500/20 hover:text-orange-400"
              >
                Log in
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-black shadow-lg shadow-orange-500/30 transition hover:bg-orange-400"
                >
                  Sign Up
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
