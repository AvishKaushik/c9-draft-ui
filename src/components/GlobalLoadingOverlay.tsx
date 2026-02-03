import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const LOADING_MESSAGES = [
  'Connecting to draft system...',
  'Loading champion database...',
  'Analyzing meta trends...',
  'Preparing draft recommendations...',
  'Finalizing setup...'
]

interface GlobalLoadingOverlayProps {
  visible: boolean
}

export default function GlobalLoadingOverlay({
  visible
}: GlobalLoadingOverlayProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  const messages = LOADING_MESSAGES

  useEffect(() => {
    if (!visible) {
      setCurrentMessageIndex(0)
      return
    }

    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => {
        if (prev < messages.length - 1) {
          return prev + 1
        }
        return prev
      })
    }, 600) // Faster cycling for 3 second display

    return () => clearInterval(interval)
  }, [visible, messages.length])

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0095d9] via-[#00aeef] to-[#00c4ff]"
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
                               radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="relative text-center px-8">
            {/* Logos Container with X collaboration mark */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center justify-center gap-6 mb-10"
            >
              {/* Cloud9 Logo */}
              <motion.div
                className="w-24 h-24 md:w-28 md:h-28"
                style={{ filter: 'drop-shadow(0 4px 20px rgba(255,255,255,0.3))' }}
              >
                <svg
                  viewBox="0 0 800 800"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#ffffff"
                    d="M642.07,388.02c-58.31-27.63-127.97-2.75-155.6,55.56-4.03,8.51-6.91,17.27-8.76,26.09l67.8,32.13c-1.65-9.33-.56-19.24,3.8-28.45,11.18-23.61,39.39-33.68,62.99-22.5,23.62,11.19,33.69,39.39,22.5,63-11.11,23.45-39.02,33.52-62.53,22.69l-125.19-59.31 .02-.05 -.27-.12 61.64-130.14c22.87-56.89-2.25-122.46-58.4-149.05-58.31-27.63-127.97-2.76-155.6,55.56-27.62,58.3-2.75,127.97,55.56,155.59 8.52,4.04 17.27,6.91 26.1,8.78l32.12-67.8c-9.33,1.65-19.24,.56-28.46-3.8-23.61-11.18-33.68-39.39-22.5-63 11.19-23.61 39.39-33.68 63-22.5 23.45,11.11 33.52,39.01 22.69,62.52l-58.83,124.16 -130.9-62c-56.89-22.88-122.46,2.25-149.05,58.4-27.63,58.31-2.76,127.97,55.55,155.6 58.31,27.62 127.97,2.75 155.6-55.56 4.03-8.51 6.91-17.27 8.77-26.1l-67.8-32.12c1.65,9.33 .56,19.24-3.8,28.45-11.18,23.61-39.39,33.68-62.99,22.5-23.61-11.19-33.68-39.39-22.5-63 11.11-23.45 39.01-33.52 62.53-22.69l124.93,59.19 -.02 .04 62.66,29.69 131.43,62.25c56.89,22.88 122.46-2.25 149.05-58.4 27.63-58.31 2.76-127.97-55.56-155.6Z"
                  />
                </svg>
              </motion.div>

              {/* Collaboration X */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-white/80 text-3xl md:text-4xl font-light"
                style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))' }}
              >
                ×
              </motion.div>

              {/* Game Logo - League of Legends */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="w-20 h-20 md:w-24 md:h-24"
                style={{ filter: 'drop-shadow(0 4px 20px rgba(255,255,255,0.3))' }}
              >
                <svg
                  viewBox="0 0 800 800"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="#ffffff">
                    <path d="M438.14,168A235.31,235.31,0,0,1,580.08,552.7h79.45a299,299,0,0,0,41.4-152.25c0-153.18-114.63-279.58-262.79-298.11Z" />
                    <path d="M208.88,631.86V537.33a235.17,235.17,0,0,1,0-273.77V169a300.44,300.44,0,0,0,0,462.83Z" />
                  </g>
                  <polygon
                    fill="#ffffff"
                    points="393.14 75 220.98 75 253.88 142.3 253.88 658.33 221.32 724.89 611.49 724.89 647.14 597.7 393.14 597.7 393.14 75"
                  />
                </svg>
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="text-2xl md:text-3xl font-semibold text-white tracking-wide">
                Cloud9 Draft Assistant
              </h1>
            </motion.div>

            {/* Loading Message */}
            <motion.div
              className="mb-8 h-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentMessageIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="text-white/80 text-sm md:text-base"
                >
                  {messages[currentMessageIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Professional Progress Indicator */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8, duration: 0.4 }}
              className="flex flex-col items-center"
            >
              {/* Circular Progress Ring */}
              <div className="relative w-16 h-16 mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background circle */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="2"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="94.2"
                    initial={{ strokeDashoffset: 94.2 }}
                    animate={{
                      strokeDashoffset: 94.2 - (94.2 * ((currentMessageIndex + 1) / messages.length))
                    }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </svg>
                {/* Percentage in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {Math.round(((currentMessageIndex + 1) / messages.length) * 100)}%
                  </span>
                </div>
              </div>

              {/* Progress steps */}
              <div className="flex gap-2">
                {messages.map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{
                      scale: 1,
                      backgroundColor: i <= currentMessageIndex ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.3)'
                    }}
                    transition={{
                      scale: { delay: 0.9 + i * 0.1 },
                      backgroundColor: { duration: 0.3 }
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}