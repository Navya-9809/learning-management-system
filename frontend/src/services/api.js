import axios from 'axios';

const API_BASE = 'http://localhost:3001';

export const fetchCourses = async () => {
  try {
    const { data } = await axios.get(`${API_BASE}/courses`);
    return data;
  } catch (error) {
    console.error('API Error - using fallback. Run: npx json-server --watch db.json --port 3001', error.message);
    return getFallbackCourses();
  }
};

export const fetchCourseById = async (id) => {
  try {
    const { data } = await axios.get(`${API_BASE}/courses/${id}`);
    return data;
  } catch (error) {
    const courses = getFallbackCourses();
    return courses.find((c) => c.id === parseInt(id)) || null;
  }
};

const getFallbackCourses = () => {
  return [
    {
      id: 1,
      title: 'React Basics',
      description: 'Learn the fundamentals of React including components, props, state, and hooks.',
      instructor: 'Sarah Johnson',
      duration: '5 hours',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
      category: 'Web Development',
      level: 'Beginner',
      lessons: [
        { id: 1, title: 'Introduction to React', duration: '15 min' },
        { id: 2, title: 'Components and JSX', duration: '25 min' },
        { id: 3, title: 'Props and State', duration: '30 min' },
      ],
    },
    {
      id: 2,
      title: 'JavaScript Mastery',
      description: 'Master JavaScript from basics to advanced concepts.',
      instructor: 'Mike Chen',
      duration: '12 hours',
      thumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop',
      category: 'Programming',
      level: 'Intermediate',
      lessons: [
        { id: 1, title: 'Variables and Data Types', duration: '20 min' },
        { id: 2, title: 'Functions and Scope', duration: '35 min' },
      ],
    },
  ];
};
