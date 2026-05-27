"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimateOnScroll } from "@/animations/AnimateOnScroll";
import {
  heroContainer,
  heroItem,
  fadeUp,
  sectionTitle,
  sectionLine,
} from "@/animations/variants";

const features = [
  {
    icon: "calendar",
    title: "Rutinas Claras",
    desc: "Crea y asigna rutinas personalizadas para cada alumno de forma digital.",
  },
  {
    icon: "dollar",
    title: "Control de Pagos",
    desc: "Visualiza quién ha pagado su mensualidad y quién tiene saldos pendientes.",
  },
  {
    icon: "dumbbell",
    title: "Gráficas de Progreso",
    desc: "Tus alumnos podrán ver la evolución de su peso e historial directamente.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-400/30 selection:text-emerald-400 overflow-x-hidden">
      <nav className="glass border-b border-zinc-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-tight flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-emerald-400">
              <path d="M6.5 6.5 17.5 17.5" />
              <line x1="20" y1="12" x2="4" y2="12" />
              <path d="M17.5 17.5 20 15 20 9 17.5 6.5" />
              <path d="M6.5 6.5 4 9 4 15 6.5 17.5" />
            </svg>
            <span className="gradient-text">FitFocus</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/login"
              className="btn-outline-emerald text-xs px-4 py-2 rounded-xl"
            >
              ¿Ya eres parte de nuestro equipo?, click aqui
            </Link>
          </motion.div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-16 text-center flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[80px] animate-pulse-glow" />
          <div className="absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[80px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
        </div>

        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            variants={heroItem}
            className="bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 inline-block"
          >
            Para Entrenadores Independientes
          </motion.span>

          <motion.h1
            variants={heroItem}
            className="text-5xl md:text-7xl font-black tracking-tight max-w-3xl leading-tight mb-6"
          >
            Lleva tus entrenamientos al{" "}
            <span className="gradient-text">siguiente nivel.</span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed mx-auto"
          >
            Deja atrás los Excels y las libretas de papel. Gestiona las rutinas de
            tus alumnos, controla sus pagos y sigue su progreso en un solo lugar.
          </motion.p>

          <motion.div
            variants={heroItem}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center"
          >
            <Link href="/login" className="btn-emerald px-8 py-4 text-base text-center">
              Comenzar Gratis
            </Link>
            <a
              href="#features"
              className="btn-outline-emerald px-8 py-4 text-base text-center"
            >
              Saber más
            </a>
          </motion.div>
        </motion.div>

        <section
          id="features"
          className="w-full mt-32 border-t border-zinc-800/50 pt-20"
        >
          <AnimateOnScroll variants={sectionTitle}>
            <h2 className="text-3xl md:text-4xl font-black text-center">
              Todo lo que necesitás
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll variants={sectionLine}>
            <div className="h-0.5 w-16 bg-emerald-400/50 mx-auto mt-3 mb-16" />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <AnimateOnScroll
                key={f.title}
                variants={fadeUp}
                delay={i * 0.15}
              >
                <article className="glass-card rounded-2xl p-6 flex flex-col items-start text-left gap-4 group h-full">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 glow-emerald-sm shrink-0">
                    {f.icon === "calendar" ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    ) : f.icon === "dollar" ? (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
                        <line x1="12" y1="2" x2="12" y2="6" />
                        <line x1="12" y1="18" x2="12" y2="22" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                        <path d="M6.5 6.5 17.5 17.5" />
                        <line x1="20" y1="12" x2="4" y2="12" />
                        <path d="M17.5 17.5 20 15 20 9 17.5 6.5" />
                        <path d="M6.5 6.5 4 9 4 15 6.5 17.5" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-emerald-400 transition-colors">
                      {f.title}
                    </h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                </article>
              </AnimateOnScroll>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
