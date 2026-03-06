import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, User, ArrowRight, Sparkles } from 'lucide-react';

export default function CourseCard({ course, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
    >
      <Link
        to={`/course/${course.id}`}
        className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl shadow-black/50 transition-all duration-300 hover:border-orange-500/50 hover:shadow-orange-500/10"
      >
        <div className="relative aspect-video overflow-hidden bg-zinc-800">
          <motion.img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
            whileHover={{ scale: 1.08 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/90 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <Sparkles className="h-3 w-3 text-orange-400" />
            {course.level}
          </span>
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-orange-500 px-2.5 py-1 text-xs font-medium text-black opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
            View
            <ArrowRight className="h-3 w-3" />
          </span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-semibold text-white line-clamp-2 transition-colors group-hover:text-orange-400">
            {course.title}
          </h3>
          <div className="mt-3 flex items-center gap-4 text-sm text-zinc-400">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4 text-orange-500" />
              {course.instructor}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-orange-500" />
              {course.duration}
            </span>
          </div>
          {course.category && (
            <span className="mt-3 inline-block w-fit rounded-full bg-orange-500/20 px-3 py-1 text-xs font-medium text-orange-400">
              {course.category}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
