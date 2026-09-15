/**
 * ==============================================================================
 * DATOS DE LA MATRIZ DE MADUREZ BIM (BIm³) — v1.22
 * ==============================================================================
 * Fuente metodológica:
 * - Succar, B. (2010). Building Information Modelling maturity matrix.
 * - BIMe Initiative / BIM Excellence, 301in.ES Matriz de Madurez BIM v1.22.
 * - Traducción al español: Víctor Roig (BIMETRIC Laboratorio de Procesos SL).
 * 
 * Licencia original: Creative Commons Attribution - NonCommercial - ShareAlike 3.0 Unported.
 * ==============================================================================
 */

const BIM_MATURITY_DATA = {
  version: "1.22",
  toolVersion: "2.0.0",
  year: 2026,
  authorSignature: "Julian López | Arquitecto • Especialista BIM - BIM Management - 2026",
  
  methodologyNotice: "Herramienta de autoevaluación basada en la Matriz de Madurez BIM (BIm³). Uso bajo licencia CC BY-NC-SA 3.0. Si esta herramienta se utiliza para evaluar organizaciones de terceros como parte de un servicio comercial, verificar los requisitos de licencia con ChangeAgents AEC (info@changeagents.com.au).",
  
  methodologicalDisclaimer: "El método original desaconseja sumar puntuaciones entre filas/columnas por considerarlas resultados engañosos; este agregado es una síntesis orientativa de apoyo a la discusión del taller, no una certificación ni una calificación oficial.",
  
  retestRecommendation: "Se recomienda repetir la autoevaluación cada 6-12 meses para contrastar avances, validar mejoras implementadas y ajustar la hoja de ruta.",

  levels: {
    a: { code: "a", name: "Inicial", maxPoints: 0, points: 0, tagColor: "#EF4444", bgLight: "#FEE2E2", textDark: "#991B1B", description: "Bajo o nulo nivel de formalización; dependiente de iniciativas individuales ad-hoc." },
    b: { code: "b", name: "Definido", maxPoints: 10, points: 10, tagColor: "#F59E0B", bgLight: "#FEF3C7", textDark: "#92400E", description: "Procesos básicos identificados y estructurados con estándares iniciales definidos." },
    c: { code: "c", name: "Gestionado", maxPoints: 20, points: 20, tagColor: "#0284C7", bgLight: "#E0F2FE", textDark: "#075985", description: "Procesos controlados, documentados, monitoreados y con seguimiento riguroso." },
    d: { code: "d", name: "Integrado", maxPoints: 30, points: 30, tagColor: "#6366F1", bgLight: "#EEF2FF", textDark: "#3730A3", description: "Alineado con los objetivos estratégicos globales del negocio y flujos integrados." },
    e: { code: "e", name: "Optimizado", maxPoints: 40, points: 40, tagColor: "#10B981", bgLight: "#D1FAE5", textDark: "#065F46", description: "Mejora continua sistemática, innovación proactiva y alta adaptabilidad." }
  },

  categories: [
    {
      id: "tecnologia",
      name: "Tecnología",
      subtitle: "Basada en una Serie de Capacidades v5",
      description: "Infraestructura tecnológica, soluciones de software, hardware y conectividad de red que soportan los flujos BIM.",
      color: "#0284C7",
      areas: [
        {
          id: "software",
          code: "TEC-01",
          name: "Software",
          subtitle: "Aplicaciones, entregables y datos",
          description: "Gestión de herramientas de modelado, aplicaciones analíticas, compatibilidad de formatos e interoperabilidad de datos.",
          levels: {
            a: "Uso de aplicaciones de software no monitorizado ni regulado. Los Modelos 3D se usan como base para generar principalmente representaciones 2D / entregables precisos. El uso, almacenamiento e intercambio de datos no se definen dentro de las organizaciones o equipos de proyectos. Los intercambios sufren de una falta grave de interoperabilidad.",
            b: "El uso / introducción de Software se unifica dentro de una organización o equipos de proyecto (múltiples organizaciones). Los Modelos 3D se utilizan como base para generar tanto entregables 2D como 3D. El uso, almacenamiento e intercambio de datos están bien definidos dentro de las organizaciones y equipos de proyecto. Los intercambios de datos interoperables están definidos y priorizados.",
            c: "La selección de software y su uso se controla y gestiona de acuerdo con los entregables definidos. Los modelos son la base para las vistas 3D, representaciones 2D, cuantificación, especificación y estudios analíticos. El uso, almacenamiento e intercambio de datos son monitoreados y controlados. El flujo de datos está documentado y bien gestionado. Los intercambios de datos interoperables son obligatorios y se controlan con rigor.",
            d: "La selección e implementación de software sigue objetivos estratégicos, no sólo necesidades operacionales. Los entregables del modelado están bien sincronizados a través de proyectos y estrechamente integrados con los procesos de negocio. El uso, almacenamiento e intercambio de datos interoperables están regulados y se llevan a cabo como parte de una estrategia global de la organización o equipo de proyecto.",
            e: "La selección / uso de herramientas de software se revisa continuamente para mejorar la productividad y se alinea con los objetivos estratégicos. Los entregables del modelado se revisan / optimizan cíclicamente para beneficiarse de las nuevas funcionalidades y extensiones disponibles de software. Todos los asuntos relacionados con el almacenamiento, uso e intercambio de datos interoperables están documentados, controlados, reflexionados y mejorados de forma proactiva."
          }
        },
        {
          id: "hardware",
          code: "TEC-02",
          name: "Hardware",
          subtitle: "Equipos, entregables y localización/movilidad",
          description: "Equipamiento físico, capacidad de cómputo, dispositivos móviles y estaciones de trabajo dedicadas a BIM.",
          levels: {
            a: "Los equipos BIM son inadecuados; las especificaciones son demasiado bajas o inconsistentes en toda la organización. La sustitución o mejora de equipos se considera un coste y sólo se realiza cuando es inevitable.",
            b: "Las especificaciones de los equipos - adecuados para la realización de productos y servicios BIM - se definen, presupuestan y estandarizan en toda la organización. Las sustituciones y actualizaciones de hardware son partidas de coste bien definidas.",
            c: "Se dispone de una estrategia para documentar, gestionar y mantener los equipos BIM con transparencia. La inversión en hardware está bien orientada para mejorar la movilidad del personal (en caso necesario) y ampliar la productividad BIM.",
            d: "Los despliegues de equipos se tratan como facilitadores BIM. La inversión en equipos se integra perfectamente con los planes financieros, estrategias de negocio y los objetivos de desempeño.",
            e: "Los equipos existentes y las soluciones innovadoras se prueban, actualizan y despliegan continuamente. El hardware BIM se convierte en parte de la ventaja competitiva de la organización o del equipo de proyecto."
          }
        },
        {
          id: "red",
          code: "TEC-03",
          name: "Red",
          subtitle: "Soluciones, entregables y control de seguridad/acceso",
          description: "Infraestructura de comunicaciones, canales de intercambio en la nube, intranets, extranets y protocolos de seguridad.",
          levels: {
            a: "Las soluciones de red no existen o son ad-hoc. Profesionales, organizaciones (en un lugar/ disperso) y equipos de proyecto usan cualquier herramienta para comunicarse o compartir datos. Las partes interesadas carecen de la infraestructura de red necesaria para recopilar, almacenar y compartir conocimientos.",
            b: "Se identifican soluciones de red para compartir información y controlar su acceso en y entre organizaciones. A nivel de proyecto, los agentes identifican sus requerimientos para compartir datos/información. Las organizaciones y equipos de proyecto dispersos están conectados a través de conexiones de ancho de banda relativamente bajo.",
            c: "Las soluciones de red para recopilar, almacenar y compartir el conocimiento en y entre organizaciones se gestionan bien a través de plataformas comunes (por ejemplo: intranets o extranets). Se despliegan herramientas de gestión de contenidos y activos para regular los datos estructurados y no estructurados compartidos a través de conexiones de banda ancha.",
            d: "Las soluciones de red permiten la integración de múltiples facetas del proceso BIM a través del intercambio en tiempo real continuo de datos, información y conocimientos. Las soluciones incluyen redes / portales específicos del proyecto que permiten el intercambio de datos intensivos (intercambio) interoperable entre las partes interesadas.",
            e: "Las soluciones de red se evalúan continuamente y se sustituyen por las últimas innovaciones probadas. Las redes facilitan la adquisición, almacenar y compartir conocimientos entre todas las partes interesadas. La optimización de datos integrados, los procesos y los canales de comunicación es implacable."
          }
        }
      ]
    },
    {
      id: "proceso",
      name: "Proceso",
      subtitle: "Basado en una Serie de Capacidades v5",
      description: "Dinámicas operativas, roles, infraestructura de conocimiento, especificación de entregables y liderazgo organizacional.",
      color: "#0F766E",
      areas: [
        {
          id: "recursos",
          code: "PRO-01",
          name: "Recursos",
          subtitle: "Infraestructura física y de conocimiento",
          description: "Entorno de trabajo, reconocimiento del conocimiento BIM como activo tangible y gestión del capital intelectual.",
          levels: {
            a: "El entorno de trabajo, o bien no se reconoce como un factor de la satisfacción del personal o puede no ser propicio para la productividad. El conocimiento no es reconocido como un activo; el conocimiento BIM suele compartirse de manera informal entre el personal (a través de consejos, técnicas y lecciones aprendidas).",
            b: "El entorno de trabajo y las herramientas en el lugar de trabajo se identifican como factores que influyen en la motivación y la productividad. Del mismo modo, el conocimiento es reconocido como un activo; el conocimiento compartido es recopilado, documentado y después transferido de tácito a explícito.",
            c: "El entorno de trabajo es controlado, modificado y sus criterios gestionados para aumentar la motivación del personal, la satisfacción y la productividad. Además, el conocimiento documentado se almacena adecuadamente.",
            d: "Los factores ambientales se integran en las estrategias de desempeño. El conocimiento se integra en los sistemas de organización; el conocimiento almacenado se hace accesible y fácilmente recuperable.",
            e: "Los factores físicos del lugar de trabajo se revisan constantemente para asegurar la satisfacción del personal y un entorno propicio para la productividad. Del mismo modo, las estructuras de conocimiento responsables de la adquisición, representación y difusión se revisan y modifican sistémicamente."
          }
        },
        {
          id: "actividades_flujos",
          code: "PRO-02",
          name: "Actividades & Flujos de trabajo",
          subtitle: "Conocimiento, habilidades, experiencia, roles y dinámicas",
          description: "Definición de roles BIM, flujos de trabajo interdisciplinares, consistencia operativa y cultura de equipo.",
          levels: {
            a: "No hay procesos definidos; los roles son ambiguos y estructuras de equipo / dinámicas son inconsistentes. El rendimiento es impredecible y la productividad depende de heroicidades individuales. Florece una mentalidad de \"trabajo en torno al sistema\".",
            b: "Los roles BIM se definen informalmente y los equipos se forman en consecuencia. Cada proyecto BIM se planifica de forma independiente. Se identifican las competencias BIM y se objetivan; el heroísmo BIM se desvanece a medida que aumenta la competencia, pero la productividad sigue siendo impredecible.",
            c: "La cooperación en las organizaciones aumenta a medida que se ponen a disposición las herramientas para la comunicación entre proyectos. Flujo de información constante; los roles BIM son visibles y los objetivos se consiguen de forma más consistente.",
            d: "Los roles BIM y los objetivos de competencia se arraigan en la organización. Los equipos tradicionales son sustituidos por otros orientados a BIM a medida que los nuevos procesos se convierten en parte de la cultura de la organización / del equipo del proyecto. La productividad es ahora consistente y predecible.",
            e: "Los objetivos de competencia BIM mejoran de manera continua para que coincidan con los avances tecnológicos y se alineen con los objetivos organizacionales. Las prácticas de recursos humanos se revisan de forma proactiva para asegurar que el capital intelectual coincida con las necesidades del proceso."
          }
        },
        {
          id: "productos_servicios",
          code: "PRO-03",
          name: "Productos & Servicios",
          subtitle: "Especificación, diferenciación e I+D",
          description: "Definición y control de calidad de entregables, niveles de desarrollo (LOD/LOI) y retroalimentación de productos BIM.",
          levels: {
            a: "Los entregables de modelos 3D (un producto BIM) sufren de niveles de detalle demasiado altos, demasiado bajos o inconsistentes.",
            b: "Se dispone una \"declaración que defina la estructuración de los objetos del modelo 3D\".",
            c: "Adopción de especificaciones de productos / servicios similares a Especificaciones de Progreso del Modelo, 'niveles de información' BIPS o similares.",
            d: "Los productos y servicios se especifican y diferencian en función de las Especificaciones de Progreso del Modelo o similar.",
            e: "Los productos y servicios BIM son evaluados constantemente; los bucles de retroalimentación promueven la mejora continua."
          }
        },
        {
          id: "liderazgo_gestion",
          code: "PRO-04",
          name: "Liderazgo & Gestión",
          subtitle: "Estrategia, comunicación, innovación y visión",
          description: "Compromiso de la directiva, alineación estratégica, planes de acción y aprovechamiento comercial de BIM.",
          levels: {
            a: "Los líderes / gerentes tienen varias visiones sobre BIM. La implementación de BIM (según los requisitos BIM de la etapa) se lleva a cabo sin una estrategia. En este nivel de madurez, BIM se trata como una corriente tecnológica; la innovación no se reconoce como un valor independiente y no se reconocen las oportunidades de negocios que surgen de BIM.",
            b: "Los líderes / gerentes adoptan una visión común sobre BIM. La estrategia de implementación de BIM carece de datos procesables. BIM se trata como un proceso de cambio, una corriente tecnológica. Se reconocen las innovaciones de producto y proceso; Se identifican las oportunidades de negocio derivadas de BIM, pero no se explotan.",
            c: "Se comunica la visión de implementar BIM y es entendida por la mayoría del personal. La estrategia de implementación BIM va de la mano con planes de acción detallados y un régimen de vigilancia. BIM es reconocido como una serie de tecnología, procesos y cambios en las políticas que deben ser gestionados sin poner trabas a la innovación. Se reconocen las oportunidades de negocio derivadas de BIM y se utilizan en las acciones de marketing.",
            d: "La visión es compartida por el personal de toda la organización y / o los socios del proyecto. La implementación de BIM, sus requisitos y la innovación de procesos / productos están integrados en los canales organizativos, estratégicos, de gestión y de comunicación. Las oportunidades de negocio derivadas de BIM son parte de la ventaja competitiva del equipo, organización o del equipo de proyectos y se utilizan para atraer y mantener a los clientes.",
            e: "Las partes interesadas han internalizado la visión BIM y se logra activamente. La estrategia de implementación de BIM y sus efectos en los modelos de organización se revisa de forma continua y alineada con otras estrategias. Si son necesarias modificaciones, se implementan de forma proactiva. El producto innovador / las soluciones de procesos y las oportunidades de negocio son codiciados y se persiguen de forma implacable."
          }
        }
      ]
    },
    {
      id: "politica",
      name: "Política",
      subtitle: "Basada en una Serie de Capacidades v5",
      description: "Directrices de formación, marcos regulatorios, normativas, estándares de calidad y modelos contractuales de colaboración.",
      color: "#7C3AED",
      areas: [
        {
          id: "preparatorio",
          code: "POL-01",
          name: "Preparatorio",
          subtitle: "Investigación, formación y entregables",
          description: "Programas de capacitación, desarrollo de habilidades del personal y aprendizaje continuo institucional.",
          levels: {
            a: "Muy poca o ninguna formación a disposición del personal BIM. Los medios educativos / formativos no son adecuadas para alcanzar los resultados buscados.",
            b: "Se definen los requisitos de formación y por lo general se proporcionan sólo cuando es necesario. Los medios de formación son diversos, permitiendo flexibilidad en la distribución de contenidos.",
            c: "Los requisitos de formación se gestionan para cumplir con las competencias pre-establecidas y los objetivos de desempeño. Los medios de formación se adaptan a los alumnos y para alcanzar los objetivos de aprendizaje de una manera rentable.",
            d: "La formación se integra en las estrategias de organización y objetivos de desempeño. La formación se basa típicamente en las funciones del personal y los objetivos de competencia respectivos. Los medios de formación se incorporan en los canales de conocimiento y comunicación.",
            e: "La formación se evalúa y mejora de forma continua. La disponibilidad de formación y los métodos de entrega se diseñan para permitir el aprendizaje continuo multimodal."
          }
        },
        {
          id: "regulador",
          code: "POL-02",
          name: "Regulador",
          subtitle: "Códigos, estándares, guías y control de calidad",
          description: "Estandarización de modelos (BEP, manuales), protocolos de calidad y adopción de normativas del sector.",
          levels: {
            a: "No hay directrices BIM, protocolos de documentación o estándares de modelado. No hay estándares de documentación y modelado. Los planes de control de calidad son informales o no existen; tampoco para los modelos 3D o la documentación. No hay referencias para procesos, productos o servicios.",
            b: "Existen unas directrices BIM disponibles (ex: manual de formación y estándares de ejecución BIM). Los estándares de Modelado y documentación están bien definidos, de acuerdo con los estándares aceptados del mercado. Se fijan los objetivos de calidad y las referencias de desempeño.",
            c: "Hay unas directrices BIM detalladas disponibles (formación, estándares, flujos, excepciones...). El modelado, la representación, la cuantificación, las especificaciones y las propiedades analíticas de los modelos 3D se gestionan mediante estándares de modelado detallado y planes de calidad. Se monitoriza y controla estrechamente el desempeño frente a referencias del mercado.",
            d: "Las directrices BIM están integradas en las políticas globales y las estrategias de negocio. Los estándares BIM y las referencias de desempeño se incorporan en los sistemas de gestión de calidad y de mejora de ejecución.",
            e: "Las directrices BIM se redefinen continua y proactivamente para reflejar las lecciones aprendidas y las mejores prácticas de la industria. Se alinean continuamente la mejora de calidad y el cumplimiento de normativa y regulaciones. Las referencias se revisan de forma reiterada para asegurar la mayor calidad en procesos, productos y servicios."
          }
        },
        {
          id: "contractual",
          code: "POL-03",
          name: "Contractual",
          subtitle: "Responsabilidades, riesgos y beneficios compartidos",
          description: "Estructuras contractuales, propiedad intelectual de los modelos y mecanismos de resolución de controversias.",
          levels: {
            a: "La dependencia de los acuerdos contractuales pre-BIM. No se reconocen los riesgos relacionados con la colaboración basada en el modelo o se ignoran.",
            b: "Se reconocen los requisitos BIM. \"La declaración que define la responsabilidad de cada una de las partes interesadas en relación con la gestión de la información\" ya está disponibles.",
            c: "Existe un mecanismo para la gestión compartida de la propiedad intelectual BIM, la confidencialidad, la responsabilidad y un sistema para la resolución de conflictos BIM.",
            d: "Las organizaciones están alineadas a través de la confianza y la dependencia mutua más allá de las barreras contractuales.",
            e: "Las responsabilidades, riesgos y beneficios se analizan de forma continua y readaptan al esfuerzo. Se modifican los modelos contractuales para lograr mejores prácticas y mayor valor para todas las partes interesadas."
          }
        }
      ]
    },
    {
      id: "etapas",
      name: "Etapas BIM",
      subtitle: "Hitos de Capacidad BIM Progresiva",
      description: "Evolución de la madurez a través de las 3 etapas clave: Modelado individual, Colaboración y Red Integrada.",
      color: "#2563EB",
      areas: [
        {
          id: "etapa1",
          code: "ETA-01",
          name: "Etapa 1 — Modelado basado en objetos",
          subtitle: "Uso en una sola disciplina en una fase del ciclo de vida",
          description: "Transición del CAD tradicional 2D al modelado 3D paramétrico por disciplinas independientes.",
          levels: {
            a: "Implementación de una herramienta basada en objetos. No se identifican cambios de proceso o en las políticas para acompañar esta implementación.",
            b: "Se han acabado los proyectos piloto. Se identifican los requisitos del proceso y de la política BIM. Se prepara la estrategia de implementación y los planes de detalle.",
            c: "Se instigan, estandarizan y controlan los procesos y la política BIM.",
            d: "Las tecnologías, procesos y política BIM están integradas en las estrategias de organización y alineadas con los objetivos de negocio.",
            e: "Las tecnologías, procesos y política BIM se revisan continuamente para beneficiarse de la innovación y alcanzar los objetivos de desempeño más altos."
          }
        },
        {
          id: "etapa2",
          code: "ETA-02",
          name: "Etapa 2 — Colaboración basada en el Modelo",
          subtitle: "Multidisciplinar, intercambio por vía rápida de modelos",
          description: "Intercambio federado y coordinación de modelos entre arquitectura, estructura e instalaciones.",
          levels: {
            a: "Colaboración Ad-hoc BIM; las capacidades internas de colaboración son incompatibles con los socios del proyecto. Puede faltar confianza y respeto entre los participantes en el proyecto.",
            b: "Colaboración BIM uno a uno, bien definida todavía reactiva. Hay señales identificables de la confianza mutua y el respeto entre los participantes del proyecto.",
            c: "Colaboración proactiva entre las múltiples partes; los protocolos están bien documentados y gestionados. Existe confianza mutua, respeto y riesgos y beneficios compartidos entre los participantes del proyecto.",
            d: "Colaboración entre las múltiples partes que incluye a los actores aguas abajo. Se caracteriza por la participación de los actores clave durante las fases iniciales del ciclo de vida del proyecto.",
            e: "Equipo integrado por múltiples partes que incluye a todos los actores clave en un entorno caracterizado por la buena voluntad, la confianza y el respeto."
          }
        },
        {
          id: "etapa3",
          code: "ETA-03",
          name: "Etapa 3 — Integración basada en la red",
          subtitle: "Intercambio concurrente interdisciplinario de modelos nD",
          description: "Integración completa en la nube y ciclo de vida de proyectos mediante modelos nD y bases de datos compartidas.",
          levels: {
            a: "Los modelos integrados son generados por una serie limitada de participantes en el proyecto - posiblemente bajo barreras corporativas. La integración se produce con guías de procesos, normas o protocolos de intercambio poco o no pre-definidas. No hay una propuesta formal de las funciones y responsabilidades de los participantes.",
            b: "Los modelos integrados son generados por un gran subconjunto de los participantes en el proyecto. La integración sigue guías de proceso, normas y protocolos de intercambio pre-definidas. Se distribuyen las responsabilidades y los riesgos se mitigan a través de medios contractuales.",
            c: "Los modelos integrados (o partes de) son generados y gestionados por la mayoría de los participantes en el proyecto. Las responsabilidades dentro de alianzas temporales de proyecto o asociaciones a más largo plazo son claras. Los riesgos y beneficios se gestionan y distribuyen de forma activa.",
            d: "Los modelos integrados son generados y gestionados por todos los participantes clave del proyecto. La integración basada en la red es la norma y el foco no está en la forma de integrar modelos / flujos de trabajo, sino en la detección y resolución proactiva de los desajustes de tecnología, procesos y políticas.",
            e: "Se revisa y optimiza continuamente la integración de modelos y flujos de trabajo. Un equipo de proyecto interdisciplinar, estrechamente unido, persigue de forma activa nuevas eficiencias, entregables y alineaciones. Los modelos integrados son resultado de la aportación de muchos participantes en la cadena de suministro de la construcción."
          }
        }
      ]
    },
    {
      id: "escala_org",
      name: "Escala Organizacional",
      subtitle: "Dinámicas Micro, Meso y Macro",
      description: "Alcance organizacional de la adopción BIM, desde la firma individual hasta la interacción con el mercado.",
      color: "#0891B2",
      areas: [
        {
          id: "micro",
          code: "ESC-01",
          name: "Micro — Organizaciones",
          subtitle: "Dinámicas y entregables BIM internos",
          description: "Liderazgo y gobernanza interna de la empresa para la adopción y despliegue continuo de BIM.",
          levels: {
            a: "No existe un liderazgo BIM; la implementación depende de los campeones de la tecnología.",
            b: "Se formaliza el liderazgo BIM; los diferentes roles en el proceso de implementación están definidos.",
            c: "Los roles BIM Pre-definidos se complementan entre ellos en la gestión del proceso de implementación.",
            d: "Los roles BIM están integrados en las estructuras de liderazgo de la organización.",
            e: "El liderazgo BIM muta continuamente para permitir nuevas tecnologías, procesos y entregables."
          }
        },
        {
          id: "meso",
          code: "ESC-02",
          name: "Meso — Equipos de Proyecto",
          subtitle: "Múltiples organizaciones e inter-organizacional",
          description: "Mecanismos y protocolos de colaboración entre múltiples firmas que intervienen en un mismo proyecto.",
          levels: {
            a: "Cada proyecto se ejecuta de forma independiente. No existe ningún acuerdo entre los agentes que intervienen para colaborar más allá del proyecto común actual.",
            b: "Los participantes piensan más allá de un solo proyecto. Se definen y documentan los protocolos de colaboración entre participantes del proyecto.",
            c: "La colaboración entre múltiples organizaciones en varios proyectos se gestiona a través de alianzas temporales entre participantes.",
            d: "Los proyectos de colaboración los realizan organizaciones interdisciplinares o equipos de proyectos multidisciplinares; una alianza entre muchos actores clave.",
            e: "Los proyectos de colaboración son realizados por equipos de proyectos interdisciplinares auto - optimizados, que incluyen a la mayoría de los participantes."
          }
        },
        {
          id: "macro",
          code: "ESC-03",
          name: "Macro — Mercados",
          subtitle: "Dinámicas y entregables del sector / proveedores",
          description: "Disponibilidad de componentes virtuales de fabricantes e integración dinámica en la cadena de suministro.",
          optional: true,
          optionalDisclaimer: "Aplicar este asunto sólo si es asistido por un asesor formado (según metodología BIMe v1.22).",
          levels: {
            a: "Muy pocos componentes BIM generados por proveedores (productos y materiales virtuales que representan a los físicos). La mayoría de los componentes los preparan los desarrolladores de software y los usuarios finales.",
            b: "Los componentes BIM generados por proveedores cada vez son más asequibles a medida que los fabricantes / proveedores identifican los beneficios del negocio.",
            c: "Los componentes BIM están disponibles a través de repositorios centrales de muy fácil acceso / búsqueda. Los componentes no están conectados de forma interactiva a las bases de datos de los proveedores.",
            d: "El acceso a los repositorios de componentes está integrado en el software BIM. Los componentes están vinculados a bases de datos fuente de forma interactiva (por precio, disponibilidad, etc ...).",
            e: "La generación e intercambio de componentes BIM dinámica, por múltiples vías (productos y materiales virtuales) entre todos los interesados en el proyecto a través de repositorios centrales o en red."
          }
        }
      ]
    }
  ],

  recommendationRules: [
    {
      id: "rule_software_red",
      title: "Consolidación de Interoperabilidad y Canales de Red",
      condition: function(answers) {
        return (answers.software === "a" || answers.software === "b") && answers.red === "a";
      },
      recommendation: "Priorizar la definición formal de protocolos de intercambio y formatos interoperables (IFC / BCF) antes de implementar plataformas avanzadas de red o repositorios en la nube."
    },
    {
      id: "rule_liderazgo_estrategico",
      title: "Formalización de la Estrategia y Visión Directiva",
      condition: function(answers) {
        return answers.liderazgo_gestion === "a" || answers.liderazgo_gestion === "b";
      },
      recommendation: "Establecer un plan estratégico BIM con objetivos de negocio cuantificables y respaldo de la alta dirección, evitando que la adopción recaiga únicamente en esfuerzos técnicos aislados."
    },
    {
      id: "rule_capacitacion_formal",
      title: "Plan Estructurado de Capacitación y Competencias",
      condition: function(answers) {
        return answers.preparatorio === "a" || answers.preparatorio === "b";
      },
      recommendation: "Diseñar una malla de formación continua por roles (modeladores, coordinadores, directores), superando la curva autodidacta y estandarizando las buenas prácticas del equipo."
    },
    {
      id: "rule_regulador_estandares",
      title: "Estandarización y Protocolos de Control de Calidad",
      condition: function(answers) {
        return answers.regulador === "a" || answers.regulador === "b";
      },
      recommendation: "Redactar e implementar el Manual de Estándares BIM interno y plantillas de Plan de Ejecución BIM (BEP), incluyendo listas de chequeo para control de calidad de modelos 3D."
    },
    {
      id: "rule_etapas_colaboracion",
      title: "Evolución de Modelado Individual a Colaboración Multidisciplinar",
      condition: function(answers) {
        return (answers.etapa1 === "c" || answers.etapa1 === "d" || answers.etapa1 === "e") && (answers.etapa2 === "a" || answers.etapa2 === "b");
      },
      recommendation: "Aprovechar la sólida base en modelado disciplinar (Etapa 1) para instaurar sesiones periódicas de detección de interferencias y coordinación interdisciplinar temprana (Etapa 2)."
    },
    {
      id: "rule_meso_alianzas",
      title: "Extensión de Estándares a Socios y Contratistas (Meso)",
      condition: function(answers) {
        return (answers.micro === "c" || answers.micro === "d") && (answers.meso === "a" || answers.meso === "b");
      },
      recommendation: "Desarrollar guías de intercambio colaborativo para contratistas y consultores externos, alineando los requisitos de entrega entre todas las firmas participantes del proyecto."
    },
    {
      id: "rule_contractual_claridad",
      title: "Actualización de Cláusulas Contractuales y Propiedad Intelectual",
      condition: function(answers) {
        return answers.contractual === "a" || answers.contractual === "b";
      },
      recommendation: "Incorporar anexos BIM en los contratos de consultoría y obra, delimitando con precisión las responsabilidades de autoría, niveles de información y uso legítimo de los modelos."
    },
    {
      id: "rule_mejora_continua",
      title: "Institucionalización de la Mejora Continua e Innovación",
      condition: function(answers, avgScore) {
        return avgScore >= 25;
      },
      recommendation: "Institucionalizar revisiones periódicas de lecciones aprendidas al cierre de cada proyecto y explorar automatizaciones / nD para mantener la ventaja competitiva organizacional."
    }
  ]
};

if (typeof window !== "undefined") {
  window.BIM_MATURITY_DATA = BIM_MATURITY_DATA;
}
