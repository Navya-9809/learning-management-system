import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Check, ArrowLeft, Video, List } from 'lucide-react';
import { fetchCourseById } from '../services/api';
import { useEnrollment } from '../context/EnrollmentContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Player() {
  const { id } = useParams();
  const { isEnrolled, enroll, setLessonProgress } = useEnrollment();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeLesson, setActiveLesson] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetchCourseById(id).then((data) => {
      if (!cancelled) {
        setCourse(data);
        setLoading(false);
        if (data && !isEnrolled(data.id)) enroll(data);
      }
    });
    return () => { cancelled = true; };
  }, [id, isEnrolled, enroll]);

  const lessons = course?.lessons || [];
  const currentLesson = lessons[activeLesson];

  const handleLessonSelect = (index) => {
    setActiveLesson(index);
    setLessonProgress(parseInt(id), index, lessons.length);
  };

  if (loading || !course) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-black">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 p-4 lg:flex-row lg:p-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <div className="aspect-video overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl ring-1 ring-zinc-800">
            <div className="flex h-full w-full flex-col items-center justify-center gap-6 text-zinc-500">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex h-24 w-24 items-center justify-center rounded-full bg-orange-500/20 ring-2 ring-orange-500/50"
              >
                <Play className="h-12 w-12 text-orange-500" />
              </motion.div>
              <div className="text-center">
                <p className="text-lg font-medium">Video Player Placeholder</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={currentLesson?.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 text-sm text-orange-400"
                  >
                    {currentLesson?.title || 'Select a lesson'}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLesson}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="mt-6 flex items-start gap-4"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-500/20 text-orange-500">
                <Video className="h-5 w-5" />
              </span>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  {currentLesson?.title || 'No lesson selected'}
                </h1>
                <p className="mt-1 text-zinc-500">
                  {currentLesson?.duration || ''}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full lg:w-96"
        >
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-xl backdrop-blur-sm">
            <h2 className="mb-5 flex items-center gap-2 font-semibold text-white">
              <List className="h-5 w-5 text-orange-500" />
              Lessons ({lessons.length})
            </h2>
            <ul className="space-y-1.5">
              {lessons.map((lesson, idx) => (
                <motion.li
                  key={lesson.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                >
                  <motion.button
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLessonSelect(idx)}
                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left transition ${
                      activeLesson === idx
                        ? 'bg-orange-500/20 text-orange-400 ring-1 ring-orange-500/30'
                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {activeLesson > idx ? (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20">
                          <Check className="h-4 w-4 text-emerald-400" />
                        </span>
                      ) : (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-700 text-sm font-medium">
                          {idx + 1}
                        </span>
                      )}
                      {lesson.title}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {lesson.duration}
                    </span>
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </div>
          <motion.div whileHover={{ x: -4 }}>
            <Link
              to="/my-courses"
              className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-orange-400 transition hover:text-orange-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to My Courses
            </Link>
          </motion.div>
        </motion.aside>
      </div>
    </div>
  );
}
