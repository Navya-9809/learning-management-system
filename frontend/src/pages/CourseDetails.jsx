import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, User, Play, ListChecks } from 'lucide-react';
import { fetchCourseById } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useEnrollment } from '../context/EnrollmentContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { toast } from 'react-hot-toast';

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { enroll, isEnrolled } = useEnrollment();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchCourseById(id).then((data) => {
      if (!cancelled) {
        setCourse(data);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [id]);

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/course/${id}` } } });
      return;
    }
    if (!course) return;
    enroll(course);
    toast.success('Enrolled successfully!');
  };

  const handleStartCourse = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: `/player/${id}` } } });
      return;
    }
    if (!isEnrolled(course?.id)) {
      enroll(course);
      toast.success('Enrolled! Opening course...');
    }
    navigate(`/player/${id}`);
  };

  if (loading || !course) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-black">
        <LoadingSpinner />
      </div>
    );
  }

  const enrolled = isEnrolled(course.id);
  const lessons = course.lessons || [];

  return (
    <div className="min-h-screen bg-black">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl"
        >
          <div className="grid gap-0 md:grid-cols-5">
            <div className="relative aspect-video md:col-span-2 md:aspect-auto md:min-h-[320px]">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
                src={course.thumbnail}
                alt={course.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute left-4 top-4 rounded-xl bg-black/90 px-3 py-1.5 text-sm font-medium text-orange-400 backdrop-blur-sm">
                {course.level}
              </span>
            </div>
            <div className="flex flex-col p-8 md:col-span-3 md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white sm:text-3xl">
                  {course.title}
                </h1>
                <div className="mt-4 flex flex-wrap gap-5 text-zinc-400">
                  <span className="flex items-center gap-2">
                    <User className="h-5 w-5 text-orange-500" />
                    {course.instructor}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    {course.duration}
                  </span>
                </div>
                {course.category && (
                  <span className="mt-3 inline-block rounded-full bg-orange-500/20 px-4 py-1.5 text-sm font-medium text-orange-400">
                    {course.category}
                  </span>
                )}
                <p className="mt-5 text-zinc-400 leading-relaxed">
                  {course.description}
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                {enrolled ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStartCourse}
                    className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-medium text-black shadow-lg shadow-orange-500/30 transition hover:bg-orange-400"
                  >
                    <Play className="h-5 w-5" />
                    Continue Learning
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEnroll}
                    className="rounded-xl bg-orange-500 px-6 py-3 font-medium text-black shadow-lg shadow-orange-500/30 transition hover:bg-orange-400"
                  >
                    Enroll Now
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {lessons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl"
          >
            <h2 className="mb-6 flex items-center gap-2 text-lg font-semibold text-white">
              <ListChecks className="h-5 w-5 text-orange-500" />
              Course Lessons ({lessons.length})
            </h2>
            <ul className="space-y-3">
              {lessons.map((lesson, idx) => (
                <motion.li
                  key={lesson.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * idx }}
                  className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-800/50 px-5 py-4 transition hover:border-orange-500/30 hover:bg-orange-500/10"
                >
                  <span className="flex items-center gap-3 font-medium text-zinc-200">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/20 text-sm text-orange-400">
                      {idx + 1}
                    </span>
                    {lesson.title}
                  </span>
                  <span className="text-sm text-zinc-500">{lesson.duration}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
}
