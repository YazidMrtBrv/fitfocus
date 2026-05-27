"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const features = [
  {
    img: "/images/calendar.png",
    title: "Rutinas Claras",
    desc: "Crea y asigna rutinas personalizadas para cada alumno de forma digital.",
  },
  {
    img: "/images/dollar.png",
    title: "Control de Pagos",
    desc: "Visualiza quién ha pagado su mensualidad y quién tiene saldos pendientes.",
  },
  {
    img: "/images/strong.png",
    title: "Gráficas de Progreso",
    desc: "Tus alumnos podrán ver la evolución de su peso e historial directamente.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-yellow-400/30 selection:text-yellow-400 overflow-x-hidden">
      <nav className="glass border-b border-zinc-800/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-black tracking-tight flex items-center gap-2"
          >
            <span className="text-2xl">💪</span>
            <span className="gradient-text">FitFocus</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Link
              href="/login"
              className="btn-outline-gold text-xs px-4 py-2 rounded-xl"
            >
              ¿Ya eres parte de nuestro equipo?, click aqui
            </Link>
          </motion.div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-28 pb-16 text-center flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-500/5 rounded-full blur-[100px] animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
        </div>

        <motion.span
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
        >
          Para Entrenadores Independientes
        </motion.span>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-5xl md:text-7xl font-black tracking-tight max-w-3xl leading-tight mb-6"
        >
          Lleva tus entrenamientos al{" "}
          <span className="gradient-text">siguiente nivel.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed"
        >
          Deja atrás los Excels y las libretas de papel. Gestiona las rutinas de
          tus alumnos, controla sus pagos y sigue su progreso en un solo lugar.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href="/login" className="btn-gold px-8 py-4 text-base text-center">
            Comenzar Gratis
          </Link>
          <a
            href="#features"
            className="btn-outline-gold px-8 py-4 text-base text-center"
          >
            Saber más
          </a>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          id="features"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-32 border-t border-zinc-800/50 pt-20"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={fadeUp}
              custom={i}
              className="glass-card rounded-2xl p-6 flex flex-col items-start text-left gap-4 group"
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 glow-gold-sm">
                <img
                  src={f.img}
                  alt={f.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors">
                  {f.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
