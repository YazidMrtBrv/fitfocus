"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [cargando, setCargando] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [errorUsuario, setErrorUsuario] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [mensajeError, setMensajeError] = useState("");

  const manejarLogin = (e) => {
    e.preventDefault();
    setErrorUsuario(false);
    setErrorPassword(false);
    setMensajeError("");

    if (!usuario.trim()) {
      setErrorUsuario(true);
      setMensajeError("Introduce tu usuario o correo.");
      return;
    }
    if (!password.trim()) {
      setErrorPassword(true);
      setMensajeError("Introduce tu contraseña.");
      return;
    }

    const esCorreoCorrecto =
      usuario === "entrenador@fitfocus.com" || usuario === "coach";
    const esPasswordCorrecto = password === "123456";

    if (esCorreoCorrecto && esPasswordCorrecto) {
      setCargando(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      setErrorUsuario(true);
      setErrorPassword(true);
      setMensajeError("Credenciales incorrectas.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center font-sans px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-yellow-500/5 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-amber-500/5 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <AnimatePresence>
        {cargando && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md flex flex-col justify-center items-center z-50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-10 h-10 border-2 border-zinc-800 border-t-yellow-400 rounded-full"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-yellow-400 font-medium tracking-widest text-[10px] uppercase mt-4 opacity-80"
            >
              Autenticando...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass rounded-2xl p-8 w-full max-w-md glow-gold relative"
      >
        <div className="gradient-border rounded-2xl" style={{ padding: "1px" }}>
          <div className="bg-black/80 backdrop-blur-xl rounded-2xl p-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-black text-white tracking-tight flex items-center justify-center gap-2">
                <span className="text-2xl">💪</span>
                <span className="gradient-text">FitFocus</span>
              </h2>
              <p className="text-zinc-500 mt-1.5 text-xs tracking-wide">
                Área de acceso para entrenadores
              </p>
            </motion.div>

            <form onSubmit={manejarLogin} className="flex flex-col gap-5">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                  Usuario o Correo
                </label>
                <input
                  type="text"
                  placeholder="coach"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  className={`w-full bg-black/60 border rounded-xl p-3 text-white placeholder-zinc-800 text-sm transition-all duration-300 outline-none ${
                    errorUsuario
                      ? "border-rose-500/50 shadow-md shadow-rose-500/5 focus:border-rose-500"
                      : "border-zinc-800 focus:border-yellow-400"
                  }`}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-black/60 border rounded-xl p-3 text-white placeholder-zinc-800 text-sm transition-all duration-300 outline-none ${
                    errorPassword
                      ? "border-rose-500/50 shadow-md shadow-rose-500/5 focus:border-rose-500"
                      : "border-zinc-800 focus:border-yellow-400"
                  }`}
                />
              </motion.div>

              <AnimatePresence>
                {mensajeError && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-rose-400 text-xs font-medium text-center tracking-wide"
                  >
                    {mensajeError}
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  type="submit"
                  className="w-full btn-gold rounded-xl p-3 text-sm mt-2"
                >
                  Entrar al Panel
                </button>
              </motion.div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
