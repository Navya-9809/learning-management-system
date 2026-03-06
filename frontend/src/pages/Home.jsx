import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, SlidersHorizontal } from 'lucide-react';
import { fetchCourses } from '../services/api';
import CourseCard from '../components/CourseCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [levelFilter, setLevelFilter] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetchCourses().then((data) => {
      if (!cancelled) {
        setCourses(Array.isArray(data) ? data : []);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, []);

  const categories = [...new Set(courses.map((c) => c.category).filter(Boolean))];
  const levels = [...new Set(courses.map((c) => c.level).filter(Boolean))];

  const filtered = courses.filter((c) => {
    const matchSearch =
      !search ||
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.instructor?.toLowerCase().includes(search.toLowerCase()) ||
      c.category?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !categoryFilter || c.category === categoryFilter;
    const matchLevel = !levelFilter || c.level === levelFilter;
    return matchSearch && matchCategory && matchLevel;
  });

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-500/30"
            >
              <BookOpen className="h-6 w-6 text-black" />
            </motion.span>
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Explore <span className="text-orange-500">Courses</span>
            </h1>
          </div>
          <p className="text-zinc-400">Discover courses to advance your skills</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Search courses, instructors, categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-12 pr-4 text-white placeholder-zinc-500 shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-sm text-zinc-500">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            >
              <option value="">All Levels</option>
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {loading ? (
          <LoadingSpinner />
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 p-16 text-center"
          >
            <Filter className="mb-4 h-16 w-16 text-zinc-600" />
            <p className="text-lg font-medium text-zinc-400">No courses match your filters</p>
            <p className="mt-1 text-zinc-500">Try adjusting your search or filters</p>
          </motion.div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
