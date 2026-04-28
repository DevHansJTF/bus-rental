"use client";

import { motion, useScroll, useTransform, useInView } from "motion/react";
import { useRef, useState, useEffect } from "react";

function Counter({
  from,
  to,
  duration = 2,
  suffix = "",
}: {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (inView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

        // Easing out sine
        const easeOutQuad = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOutQuad * (to - from) + from);

        setCount(currentCount);

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(to); // ensure final exact value
        }
      };

      animationFrame = requestAnimationFrame(animate);

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [inView, from, to, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="py-12 bg-transparent relative z-10 -mt-10 lg:-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="backdrop-blur-2xl bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/10 dark:border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden transition-colors">
          <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-400/20 dark:bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="grid md:grid-cols-3 gap-10 md:gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-900/10 dark:divide-white/10 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:px-8"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-zinc-900 dark:text-white mb-2 drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-colors">
                <Counter from={0} to={20} suffix="k+" />
              </div>
              <p className="text-[10px] text-zinc-500 dark:text-blue-400 uppercase font-bold tracking-[0.2em] mt-3">
                Completed Trips
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:px-8 pt-6 sm:pt-10 md:pt-0"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-zinc-900 dark:text-white mb-2 drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-colors">
                <Counter from={0} to={540} suffix="+" />
              </div>
              <p className="text-[10px] text-zinc-500 dark:text-blue-400 uppercase font-bold tracking-[0.2em] mt-3">
                Active Vehicles
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:px-8 pt-6 sm:pt-10 md:pt-0"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-zinc-900 dark:text-white mb-2 drop-shadow-sm dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-colors">
                <Counter from={0} to={25} suffix="+" />
              </div>
              <p className="text-[10px] text-zinc-500 dark:text-blue-400 uppercase font-bold tracking-[0.2em] mt-3">
                Years of Excellence
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
