"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const diasSemana = [
  { id: "Lunes", nombre: "LUN" },
  { id: "Martes", nombre: "MAR" },
  { id: "Miércoles", nombre: "MIE" },
  { id: "Jueves", nombre: "JUE" },
  { id: "Viernes", nombre: "VIE" },
  { id: "Sábado", nombre: "SAB" },
];

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DashboardPage() {
  const [alumnos, setAlumnos] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevaRutina, setNuevaRutina] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState("Pagado");

  const [modalCalendarioAbierto, setModalCalendarioAbierto] = useState(false);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
  const [diaSeleccionado, setDiaSeleccionado] = useState("Lunes");
  const [ejerciciosEditados, setEjerciciosEditados] = useState("");

  useEffect(() => {
    const datosGuardados = localStorage.getItem("fitfocus_alumnos");
    if (datosGuardados) {
      setAlumnos(JSON.parse(datosGuardados));
    } else {
      const alumnosIniciales = [
        { id: 1, nombre: "Carlos Mendoza", rutina: "Hipertrofia - Empuje/Tirón", estado: "Pagado", proximoPago: "05 Jun", calendario: {} },
        { id: 2, nombre: "Sofía Rodríguez", rutina: "Definición - Full Body", estado: "Pendiente", proximoPago: "Atrasado", calendario: {} },
        { id: 3, nombre: "Mateo Silva", rutina: "Fuerza - Powerlifting", estado: "Pagado", proximoPago: "12 Jun", calendario: {} },
        { id: 4, nombre: "Elena Gómez", rutina: "Cardio / Resistencia", estado: "Pagado", proximoPago: "18 Jun", calendario: {} },
      ];
      setAlumnos(alumnosIniciales);
      localStorage.setItem("fitfocus_alumnos", JSON.stringify(alumnosIniciales));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("fitfocus_alumnos", JSON.stringify(alumnos));
  }, [alumnos]);

  useEffect(() => {
    if (alumnoSeleccionado) {
      const rutinaDia = alumnoSeleccionado.calendario?.[diaSeleccionado] || "";
      setEjerciciosEditados(rutinaDia);
    }
  }, [diaSeleccionado, alumnoSeleccionado]);

  const totalAlumnos = alumnos.length;
  const pagados = alumnos.filter((a) => a.estado === "Pagado").length;
  const pendientes = alumnos.filter((a) => a.estado === "Pendiente").length;

  const abrirCalendario = (alumno) => {
    setAlumnoSeleccionado(alumno);
    setDiaSeleccionado("Lunes");
    setEjerciciosEditados(alumno.calendario?.Lunes || "");
    setModalCalendarioAbierto(true);
  };

  const manejarCambioTexto = (nuevoTexto) => {
    setEjerciciosEditados(nuevoTexto);
    if (!alumnoSeleccionado) return;
    const alumnosActualizados = alumnos.map((a) => {
      if (a.id === alumnoSeleccionado.id) {
        return { ...a, calendario: { ...a.calendario, [diaSeleccionado]: nuevoTexto } };
      }
      return a;
    });
    setAlumnos(alumnosActualizados);
    setAlumnoSeleccionado({
      ...alumnoSeleccionado,
      calendario: { ...alumnoSeleccionado.calendario, [diaSeleccionado]: nuevoTexto },
    });
  };

  const alternarEstadoPago = (id) => {
    setAlumnos(
      alumnos.map((alumno) => {
        if (alumno.id === id) {
          const nuevoEstado = alumno.estado === "Pagado" ? "Pendiente" : "Pagado";
          const nuevaFecha = nuevoEstado === "Pagado" ? "19 Jun" : "Atrasado";
          return { ...alumno, estado: nuevoEstado, proximoPago: nuevaFecha };
        }
        return alumno;
      })
    );
  };

  const agregarAlumno = (e) => {
    e.preventDefault();
    if (!nuevoNombre.trim() || !nuevaRutina.trim()) return;
    const nuevoAlumno = {
      id: Date.now(),
      nombre: nuevoNombre,
      rutina: nuevaRutina,
      estado: nuevoEstado,
      proximoPago: nuevoEstado === "Pagado" ? "19 Jun" : "Atrasado",
      calendario: { Lunes: "", Martes: "", Miércoles: "", Jueves: "", Viernes: "", Sábado: "" },
    };
    setAlumnos([...alumnos, nuevoAlumno]);
    setNuevoNombre("");
    setNuevaRutina("");
    setNuevoEstado("Pagado");
    setModalAbierto(false);
  };

  const eliminarAlumno = (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar este alumno?")) {
      const listaFiltrada = alumnos.filter((alumno) => alumno.id !== id);
      setAlumnos(listaFiltrada);
    }
  };

  const obtenerPreviaDia = (alumno, diaId) => {
    const contenido = alumno.calendario?.[diaId];
    if (!contenido || !contenido.trim()) return "ZZZ";
    const primeraLinea = contenido.split("\n")[0];
    return primeraLinea.length > 12 ? primeraLinea.substring(0, 10) + "..." : primeraLinea;
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans">
      <nav className="glass border-b border-zinc-800/50 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-lg font-black tracking-tight flex items-center gap-2">
            <span>💪</span>
            <span className="gradient-text">FitFocus</span>
          </Link>
          <span className="text-[10px] text-zinc-600 font-medium uppercase tracking-widest">Panel de Control</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="flex items-center justify-between mb-8"
        >
          <motion.div variants={fadeUp}>
            <h1 className="text-2xl font-black tracking-tight text-white">
              Panel de Control
            </h1>
            <p className="text-zinc-500 text-xs mt-0.5">
              Gestión de entrenamientos y membresías.
            </p>
          </motion.div>
          <motion.button
            variants={fadeUp}
            onClick={() => setModalAbierto(true)}
            className="btn-gold text-xs px-4 py-2 rounded-lg"
          >
            + Añadir Alumno
          </motion.button>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[
            { label: "Activos", value: totalAlumnos, color: "text-yellow-400" },
            { label: "Pagados", value: pagados, color: "text-emerald-400" },
            { label: "Pendientes", value: pendientes, color: "text-rose-400" },
          ].map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="glass-card rounded-xl p-4"
            >
              <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                {s.label}
              </p>
              <p className={`text-2xl font-black mt-1 ${s.color}`}>{s.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="glass-card rounded-xl overflow-hidden glow-gold-sm"
        >
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase bg-black/40">
                  <th className="p-3.5 pl-5">Nombre</th>
                  <th className="p-3.5">Rutina</th>
                  <th className="p-3.5">Próximo Pago</th>
                  <th className="p-3.5 text-center">Estado</th>
                  <th className="p-3.5 text-right pr-5 w-16">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50 text-xs text-zinc-300">
                <AnimatePresence>
                  {alumnos.map((alumno) => (
                    <motion.tr
                      key={alumno.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="hover:bg-zinc-800/20 transition-colors"
                    >
                      <td className="p-3.5 pl-5 font-semibold text-white">
                        {alumno.nombre}
                      </td>
                      <td className="p-3.5">
                        <button
                          onClick={() => abrirCalendario(alumno)}
                          className="text-left text-zinc-400 hover:text-yellow-400 font-medium hover:underline cursor-pointer transition-colors"
                        >
                          {alumno.rutina}
                        </button>
                      </td>
                      <td className="p-3.5 text-zinc-500">{alumno.proximoPago}</td>
                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => alternarEstadoPago(alumno.id)}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-bold border transition-all ${
                            alumno.estado === "Pagado"
                              ? "bg-emerald-950/30 text-emerald-400 border-emerald-500/20 hover:bg-emerald-950/50"
                              : "bg-amber-950/30 text-amber-400 border-amber-500/20 hover:bg-amber-950/50"
                          }`}
                        >
                          {alumno.estado}
                        </button>
                      </td>
                      <td className="p-3.5 text-right pr-5">
                        <button
                          onClick={() => eliminarAlumno(alumno.id)}
                          className="text-zinc-600 hover:text-rose-400 p-1 rounded transition-colors"
                          title="Eliminar Alumno"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 inline"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {modalAbierto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass rounded-2xl p-6 w-full max-w-sm glow-gold-sm"
            >
              <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                Nuevo Registro
              </h3>
              <form onSubmit={agregarAlumno} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    placeholder="ej: Juan Pérez"
                    value={nuevoNombre}
                    onChange={(e) => setNuevoNombre(e.target.value)}
                    className="w-full bg-black/60 border border-zinc-800 focus:border-yellow-400 rounded-lg p-2.5 text-white outline-none text-sm placeholder-zinc-700 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                    Rutina o Enfoque
                  </label>
                  <input
                    type="text"
                    placeholder="ej: Hipertrofia Pierna"
                    value={nuevaRutina}
                    onChange={(e) => setNuevaRutina(e.target.value)}
                    className="w-full bg-black/60 border border-zinc-800 focus:border-yellow-400 rounded-lg p-2.5 text-white outline-none text-sm placeholder-zinc-700 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                    Estado Inicial de Pago
                  </label>
                  <select
                    value={nuevoEstado}
                    onChange={(e) => setNuevoEstado(e.target.value)}
                    className="w-full bg-black/60 border border-zinc-800 focus:border-yellow-400 rounded-lg p-2.5 text-white outline-none text-sm cursor-pointer transition-colors"
                  >
                    <option value="Pagado">Pagado</option>
                    <option value="Pendiente">Pendiente</option>
                  </select>
                </div>
                <div className="flex gap-2.5 mt-2">
                  <button
                    type="button"
                    onClick={() => setModalAbierto(false)}
                    className="flex-1 bg-zinc-800 text-zinc-300 font-medium rounded-lg py-2 text-xs hover:bg-zinc-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 btn-gold rounded-lg py-2 text-xs"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalCalendarioAbierto && alumnoSeleccionado && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="glass rounded-2xl p-6 w-full max-w-xl glow-gold-sm flex flex-col gap-5"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    {alumnoSeleccionado.nombre}
                  </h4>
                  <p className="text-[11px] text-zinc-500 font-medium">
                    Usa ENTER para crear tu lista de ejercicios
                  </p>
                </div>
                <button
                  onClick={() => setModalCalendarioAbierto(false)}
                  className="text-zinc-400 hover:text-white text-xs bg-zinc-800 border border-zinc-700 px-3 py-1.5 rounded-lg font-medium transition-colors"
                >
                  Cerrar
                </button>
              </div>

              <div className="grid grid-cols-6 gap-1.5 bg-black/60 p-1 rounded-xl border border-zinc-800">
                {diasSemana.map((d) => {
                  const esActivo = diaSeleccionado === d.id;
                  const vistaPrevia = obtenerPreviaDia(alumnoSeleccionado, d.id);
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => setDiaSeleccionado(d.id)}
                      className={`flex flex-col items-center justify-between py-2 px-1 rounded-lg border transition-all min-h-[70px] ${
                        esActivo
                          ? "bg-zinc-800 border-yellow-400 text-yellow-400"
                          : "bg-transparent border-transparent text-zinc-500 hover:border-zinc-700"
                      }`}
                    >
                      <span className="text-[9px] font-bold opacity-60">{d.nombre}</span>
                      <span className={`text-sm font-black my-0.5 ${esActivo ? "text-yellow-400" : "text-white"}`}>
                        {String(new Date().getDate()).padStart(2, "0")}
                      </span>
                      <span className="text-[9px] truncate w-full px-0.5 text-center font-medium">
                        {vistaPrevia}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col gap-2 bg-black/60 border border-zinc-800 p-4 rounded-xl">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    {diaSeleccionado}
                  </span>
                  <span className="text-[9px] text-zinc-600 font-medium italic">
                    Se guarda automáticamente
                  </span>
                </div>
                <textarea
                  rows="5"
                  value={ejerciciosEditados}
                  onChange={(e) => manejarCambioTexto(e.target.value)}
                  className="w-full bg-transparent text-zinc-200 outline-none text-sm resize-none leading-relaxed font-sans placeholder-zinc-700"
                  placeholder="Escribe la rutina aquí..."
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
