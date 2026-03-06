import { motion } from 'framer-motion';

export default function ProgressBar({ value = 0, className = '' }) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div className={`h-2.5 overflow-hidden rounded-full bg-zinc-800 ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="h-full rounded-full bg-orange-500 shadow-sm"
      />
    </div>
  );
}
