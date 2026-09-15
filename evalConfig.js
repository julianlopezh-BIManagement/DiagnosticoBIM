/**
 * ==============================================================================
 * ARCHIVO DE CONFIGURACIÓN: CRITERIOS Y ANCLAS DE EVALUACIÓN
 * ==============================================================================
 * Este archivo centraliza todos los textos, criterios y anclas conductuales
 * de la maqueta de Evaluación de Desempeño (Fin de Período de Prueba - 3 meses).
 *
 * Para personalizar los objetivos del cargo o las anclas de competencias cuando
 * se validen con Gestión Humana, edita ÚNICAMENTE las constantes de este archivo.
 * ==============================================================================
 */

// Escala Likert general utilizada en las evaluaciones
const LIKERT_SCALE = [
  { value: 1, label: "No cumple", description: "Desempeño por debajo del umbral mínimo esperado." },
  { value: 2, label: "Cumple parcialmente", description: "Cumple algunos aspectos, pero requiere supervisión constante o correcciones." },
  { value: 3, label: "Cumple", description: "Cumple de manera sólida y consistente con lo esperado para el rol." },
  { value: 4, label: "Supera", description: "Supera las expectativas habituales, demuestra autonomía y alta calidad." },
  { value: 5, label: "Sobresale", description: "Rendimiento excepcional, referente técnico o metodológico para el equipo." }
];

/**
 * BLOQUE A: Desempeño del Cargo (Objetivos Técnicos y Operativos del Rol)
 * NOTA: Criterios placeholder. Reemplazar según la ficha técnica de cada rol.
 */
const BLOCK_A_CRITERIA = [
  {
    id: "cargo_obj_1",
    code: "OBJ-01",
    title: "Objetivo del cargo #1 — EJEMPLO, reemplazar según ficha del rol",
    description: "Ejecución técnica y entrega de entregables clave asignados durante los primeros 90 días con los estándares de calidad definidos para la disciplina.",
    placeholderComment: "Describe hechos observables, entregables entregados o áreas técnicas donde cumplió o tuvo desviaciones..."
  },
  {
    id: "cargo_obj_2",
    code: "OBJ-02",
    title: "Objetivo del cargo #2 — EJEMPLO, reemplazar según ficha del rol",
    description: "Cumplimiento de plazos, gestión del tiempo y autonomía operativa en los flujos diarios de trabajo del área.",
    placeholderComment: "Comenta sobre el cumplimiento de cronogramas, capacidad de respuesta y nivel de supervisión requerida..."
  },
  {
    id: "cargo_obj_3",
    code: "OBJ-03",
    title: "Objetivo del cargo #3 — EJEMPLO, reemplazar según ficha del rol",
    description: "Aplicación rigurosa de estándares metodológicos, protocolos y herramientas propias de la organización.",
    placeholderComment: "Aporta evidencias del uso correcto de software, protocolos de entrega y normativas internas..."
  },
  {
    id: "cargo_obj_4",
    code: "OBJ-04",
    title: "Objetivo del cargo #4 — EJEMPLO, reemplazar según ficha del rol",
    description: "Resolución de problemas técnicos específicos y capacidad de aprendizaje/asimilación del contexto de los proyectos.",
    placeholderComment: "Indica cómo abordó contingencias técnicas o la curva de aprendizaje de nuevos proyectos..."
  }
];

/**
 * BLOQUE B: Cultural Add (Dimensiones de Competencias Transversales)
 * Anclas conductuales de 1 a 5 (PLACEHOLDER, a validar con gestión humana).
 */
const BLOCK_B_DIMENSIONS = [
  {
    id: "pensamiento_sistemico",
    code: "CUL-01",
    name: "Pensamiento Sistémico",
    subtitle: "Comprensión de interdependencias y visión global del impacto de las decisiones.",
    placeholderComment: "Registra ejemplos de situaciones donde consideró (o no) el impacto de sus entregas en otras disciplinas o fases...",
    anchors: {
      1: "Resuelve en silo, no considera impacto en otras áreas ni en etapas posteriores del flujo.",
      2: "Identifica impactos evidentes solo cuando se le señalan; tiende a enfocarse exclusivamente en su tarea inmediata.",
      3: "Considera las interdependencias habituales de su rol y consulta antes de generar cambios que afecten a otros.",
      4: "Comprende a fondo la cadena de valor, previendo cuellos de botella y coordinando con disciplinas adyacentes.",
      5: "Anticipa y comunica proactivamente el impacto de sus decisiones en otras disciplinas y propone soluciones integrales."
    }
  },
  {
    id: "adaptacion_cambio",
    code: "CUL-02",
    name: "Adaptación al Cambio",
    subtitle: "Flexibilidad, apertura ante transformaciones y adopción de nuevas metodologías.",
    placeholderComment: "Describe cómo reaccionó ante cambios de prioridades, nuevas herramientas o ajustes en el alcance...",
    anchors: {
      1: "Se resiste o necesita presión constante para adoptar cambios en procesos o herramientas.",
      2: "Acepta los cambios con lentitud y muestra fricción inicial ante modificaciones de prioridades.",
      3: "Se adapta de forma constructiva y en tiempos razonables a nuevas directrices y herramientas de trabajo.",
      4: "Muestra alta flexibilidad ante imprevistos, manteniendo el ritmo y calidad en escenarios dinámicos.",
      5: "Adopta cambios con autonomía y ayuda activamente a otros miembros del equipo a adaptarse rápidamente."
    }
  },
  {
    id: "colaboracion_interfuncional",
    code: "CUL-03",
    name: "Colaboración Interfuncional",
    subtitle: "Trabajo en equipo multidisciplinario, comunicación abierta y generosidad técnica.",
    placeholderComment: "Menciona evidencias de cómo interactúa con otras áreas, comparte información y apoya a sus compañeros...",
    anchors: {
      1: "Comparte información solo cuando se le exige formalmente; mantiene una postura aislada.",
      2: "Colabora de forma reactiva, esperando instrucciones directas para interactuar con otras áreas.",
      3: "Mantiene una comunicación fluida y oportuna con pares y disciplinas complementarias.",
      4: "Facilita activamente el trabajo de otras áreas, compartiendo insumos claros y brindando apoyo constructivo.",
      5: "Busca activamente coordinar con otras áreas sin que se lo pidan, construyendo puentes y sinergias sostenibles."
    }
  }
];

/**
 * OPCIONES DE RECOMENDACIÓN FINAL
 */
const RECOMMENDATION_OPTIONS = [
  {
    id: "aprobar",
    title: "Aprobar continuidad",
    badgeClass: "badge-success",
    color: "#16a34a",
    description: "El profesional ha demostrado las competencias y el desempeño requerido para continuar en la organización de forma indefinida."
  },
  {
    id: "extender",
    title: "Extender período de observación",
    badgeClass: "badge-warning",
    color: "#d97706",
    description: "Se requiere un plazo adicional acotado con un plan de seguimiento puntual en objetivos o competencias específicas antes de la decisión definitiva."
  },
  {
    id: "no_aprobar",
    title: "No aprobar continuidad",
    badgeClass: "badge-danger",
    color: "#dc2626",
    description: "El desempeño o la alineación con el perfil/cultura no alcanzan el estándar mínimo requerido para el cargo tras el período de prueba."
  }
];

// Exportar configuración para uso global en navegador
window.EVAL_CONFIG = {
  likertScale: LIKERT_SCALE,
  blockA: BLOCK_A_CRITERIA,
  blockB: BLOCK_B_DIMENSIONS,
  recommendations: RECOMMENDATION_OPTIONS
};
