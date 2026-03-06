import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, BookOpen, GraduationCap, ArrowRight } from 'lucide-react';
import { useEnrollment } from '../context/EnrollmentContext';
import ProgressBar from '../components/ProgressBar';

export default function MyCourses() {
  const { enrollments, getProgress } = useEnrollment();

  if (enrollments.length === 0) {
    return (
      <div className="min-h-screen bg-black">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-3xl px-4 py-20 text-center"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="mb-8 flex justify-center"
          >
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-orange-500/20 shadow-lg">
              <BookOpen className="h-12 w-12 text-orange-500" />
            </div>
          </motion.div>
          <h1 className="mb-4 text-3xl font-bold text-white">
            My Courses
          </h1>
          <p className="mb-8 text-lg text-zinc-400">
            You haven&apos;t enrolled in any courses yet. Browse our catalog and
            enroll to get started!
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-medium text-black shadow-lg shadow-orange-500/30 transition hover:bg-orange-400"
            >
              <GraduationCap className="h-5 w-5" />
              Browse Courses
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10 flex items-center gap-3 text-3xl font-bold text-white"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 shadow-lg shadow-orange-500/30">
            <BookOpen className="h-6 w-6 text-black" />
          </span>
          My Courses
        </motion.h1>
        <div className="grid gap-6 sm:grid-cols-2">
          {enrollments.map((course, index) => {
            const progress = getProgress(course.id);
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl transition-shadow hover:shadow-orange-500/10"
              >
                <div className="flex gap-5 p-5">
                  <div className="h-28 w-36 flex-shrink-0 overflow-hidden rounded-xl">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-semibold text-white line-clamp-2">
                      {course.title}
                    </h2>
                    <p className="mt-1 flex items-center gap-1 text-sm text-zinc-500">
                      <GraduationCap className="h-4 w-4 text-orange-500" />
                      {course.instructor}
                    </p>
                    <ProgressBar value={progress} className="mt-4" />
                    <p className="mt-2 text-xs font-medium text-zinc-500">
                      {progress}% complete
                    </p>
                    <Link
                      to={`/player/${course.id}`}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-orange-400 transition hover:text-orange-300"
                    >
                      <Play className="h-4 w-4" />
                      Continue
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
