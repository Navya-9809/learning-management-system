import { createContext, useContext, useState, useEffect } from 'react';

const EnrollmentContext = createContext(null);

const ENROLLMENT_KEY = 'lms_enrollments';
const PROGRESS_KEY = 'lms_progress';

export function EnrollmentProvider({ children }) {
  const [enrollments, setEnrollments] = useState([]);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ENROLLMENT_KEY);
      const storedProgress = localStorage.getItem(PROGRESS_KEY);
      if (stored) setEnrollments(JSON.parse(stored));
      if (storedProgress) setProgress(JSON.parse(storedProgress));
    } catch {
      localStorage.removeItem(ENROLLMENT_KEY);
      localStorage.removeItem(PROGRESS_KEY);
    }
  }, []);

  const enroll = (course) => {
    setEnrollments((prev) => {
      if (prev.some((e) => e.id === course.id)) return prev;
      const next = [...prev, { ...course, enrolledAt: new Date().toISOString() }];
      localStorage.setItem(ENROLLMENT_KEY, JSON.stringify(next));
      return next;
    });
    setProgress((p) => {
      const next = { ...p, [course.id]: 0 };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const isEnrolled = (courseId) => enrollments.some((e) => e.id === courseId);

  const getProgress = (courseId) => progress[courseId] ?? 0;

  const setLessonProgress = (courseId, lessonIndex, totalLessons) => {
    const percent = totalLessons > 0 ? Math.round(((lessonIndex + 1) / totalLessons) * 100) : 0;
    setProgress((p) => {
      const next = { ...p, [courseId]: Math.min(100, Math.max(p[courseId] ?? 0, percent)) };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(next));
      return next;
    });
  };

  return (
    <EnrollmentContext.Provider
      value={{
        enrollments,
        enroll,
        isEnrolled,
        progress,
        getProgress,
        setLessonProgress,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
}

export function useEnrollment() {
  const ctx = useContext(EnrollmentContext);
  if (!ctx) throw new Error('useEnrollment must be used within EnrollmentProvider');
  return ctx;
}
