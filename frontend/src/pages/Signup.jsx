import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'Enter a valid email';
    if (!password) next.password = 'Password is required';
    else if (password.length < 6)
      next.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword)
      next.confirmPassword = 'Passwords do not match';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    signup(email, password, name);
    toast.success('Account created successfully!');
    navigate('/');
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-black px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-10 shadow-2xl">
          <div className="mb-8 flex items-center gap-3">
            <motion.span
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-500/30"
            >
              <UserPlus className="h-7 w-7 text-black" />
            </motion.span>
            <div>
              <h1 className="text-2xl font-bold text-white">Sign Up</h1>
              <p className="text-sm text-zinc-500">Create your account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-zinc-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 pl-12 pr-4 text-white placeholder-zinc-500 transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1.5 text-sm text-orange-400"
                >
                  {errors.name}
                </motion.p>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 pl-12 pr-4 text-white placeholder-zinc-500 transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1.5 text-sm text-orange-400"
                >
                  {errors.email}
                </motion.p>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-300">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 pl-12 pr-4 text-white placeholder-zinc-500 transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1.5 text-sm text-orange-400"
                >
                  {errors.password}
                </motion.p>
              )}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
            >
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-zinc-300">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 py-3 pl-12 pr-4 text-white placeholder-zinc-500 transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                />
              </div>
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-1.5 text-sm text-orange-400"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </motion.div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 font-medium text-black shadow-lg shadow-orange-500/30 transition hover:bg-orange-400"
            >
              Create Account
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </form>
          <p className="mt-8 text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="inline-flex items-center gap-1 font-medium text-orange-400 transition hover:text-orange-300"
            >
              Log in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
