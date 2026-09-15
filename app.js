/**
 * ==============================================================================
 * APLICACIÓN DE DIAGNÓSTICO DE MADUREZ BIM (BIm³) — CONTROLADOR PRINCIPAL
 * ==============================================================================
 * Autor institucional: Julian López | Arquitecto • Especialista BIM - BIM Management - 2026
 * Metodología: Matriz de Madurez BIM v1.22 (Dr. Bilal Succar / BIMe Initiative / trad. Víctor Roig)
 * ==============================================================================
 */

const BIMApp = (function() {
  "use strict";

  // Estado central de la aplicación
  const state = {
    config: {
      orgName: "",
      facilitatorName: "",
      sessionDate: new Date().toISOString().split("T")[0],
      phoneCountryCode: "+57",
      contactPhone: "",
      contactEmail: "",
      participants: "",
      includeMacro: false
    },
    answers: {},   // { areaId: 'a' | 'b' | 'c' | 'd' | 'e' }
    comments: {},  // { areaId: 'observación de taller...' }
    currentStep: 0,
    radarChart: null
  };

  const STORAGE_KEY = "bim3_diagnostic_session_v2";

  // Elementos DOM
  let dom = {};

  /**
   * Inicialización al cargar el DOM
   */
  function init() {
    cacheDom();
    loadSession();
    renderAllAreaCards();
    bindEvents();
    validateConfig();
    updateUI();
  }

  function cacheDom() {
    dom.stepperNav = document.getElementById("stepper-nav");
    dom.progressBar = document.getElementById("global-progress-bar");
    dom.progressText = document.getElementById("global-progress-text");
    dom.orgNameInput = document.getElementById("org-name");
    dom.facilitatorInput = document.getElementById("facilitator-name");
    dom.sessionDateInput = document.getElementById("session-date");
    dom.phoneCountryCodeSelect = document.getElementById("phone-country-code");
    dom.contactPhoneInput = document.getElementById("contact-phone");
    dom.contactEmailInput = document.getElementById("contact-email");
    dom.participantsInput = document.getElementById("participants-list");
    dom.includeMacroToggle = document.getElementById("include-macro-toggle");
    dom.btnStart = document.getElementById("btn-start-evaluation");
    dom.btnExportPdf = document.getElementById("btn-export-pdf");
    dom.disclaimerText = document.getElementById("res-disclaimer-text");
    dom.feedbackBox = document.getElementById("config-status-feedback");
    dom.feedbackMsg = document.getElementById("config-feedback-msg");
    dom.feedbackIcon = document.getElementById("config-feedback-icon");
  }

  function bindEvents() {
    // Sincronización y validación en tiempo real de configuración inicial
    if (dom.orgNameInput) {
      dom.orgNameInput.addEventListener("input", (e) => {
        state.config.orgName = e.target.value;
        saveSession();
        validateConfig();
      });
    }

    if (dom.facilitatorInput) {
      dom.facilitatorInput.addEventListener("input", (e) => {
        state.config.facilitatorName = e.target.value;
        saveSession();
        validateConfig();
      });
    }

    if (dom.sessionDateInput) {
      dom.sessionDateInput.addEventListener("change", (e) => {
        state.config.sessionDate = e.target.value;
        saveSession();
        validateConfig();
      });
      dom.sessionDateInput.addEventListener("input", (e) => {
        state.config.sessionDate = e.target.value;
        saveSession();
        validateConfig();
      });
    }

    if (dom.phoneCountryCodeSelect) {
      dom.phoneCountryCodeSelect.addEventListener("change", (e) => {
        state.config.phoneCountryCode = e.target.value;
        saveSession();
        validateConfig();
      });
    }

    if (dom.contactPhoneInput) {
      dom.contactPhoneInput.addEventListener("input", (e) => {
        state.config.contactPhone = e.target.value;
        saveSession();
        validateConfig();
      });
    }

    if (dom.contactEmailInput) {
      dom.contactEmailInput.addEventListener("input", (e) => {
        state.config.contactEmail = e.target.value;
        saveSession();
        validateConfig();
      });
    }

    if (dom.participantsInput) {
      dom.participantsInput.addEventListener("input", (e) => {
        state.config.participants = e.target.value;
        saveSession();
        validateConfig();
      });
    }

    if (dom.includeMacroToggle) {
      dom.includeMacroToggle.addEventListener("change", (e) => {
        state.config.includeMacro = e.target.checked;
        renderAllAreaCards();
        saveSession();
        updateUI();
      });
    }

    if (dom.btnStart) {
      dom.btnStart.addEventListener("click", () => {
        if (!isConfigValid()) {
          validateConfig(true);
          return;
        }
        navigateToStep(1);
      });
    }

    // Navegación por stepper con protección de configuración
    const stepButtons = document.querySelectorAll(".step-btn");
    stepButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const step = parseInt(btn.dataset.step, 10);
        if (step > 0 && !isConfigValid()) {
          validateConfig(true);
          alert("Por favor diligencia completamente todos los campos de la Configuración Inicial (incluyendo datos de contacto) antes de acceder a las secciones del cuestionario.");
          navigateToStep(0);
          return;
        }
        navigateToStep(step);
      });
    });

    // Generar PDF
    if (dom.btnExportPdf) {
      dom.btnExportPdf.addEventListener("click", generatePDFReport);
    }
  }

  /**
   * Validación de campos de Configuración Inicial
   */
  function isConfigValid() {
    const org = (dom.orgNameInput ? dom.orgNameInput.value : state.config.orgName || "").trim();
    const fac = (dom.facilitatorInput ? dom.facilitatorInput.value : state.config.facilitatorName || "").trim();
    const date = (dom.sessionDateInput ? dom.sessionDateInput.value : state.config.sessionDate || "").trim();
    const phone = (dom.contactPhoneInput ? dom.contactPhoneInput.value : state.config.contactPhone || "").trim();
    const email = (dom.contactEmailInput ? dom.contactEmailInput.value : state.config.contactEmail || "").trim();
    const part = (dom.participantsInput ? dom.participantsInput.value : state.config.participants || "").trim();

    const isEmailOk = email.length > 3 && email.includes("@") && email.includes(".");

    return Boolean(org && fac && date && phone && isEmailOk && part);
  }

  function validateConfig(showFieldErrors = false) {
    const org = (dom.orgNameInput ? dom.orgNameInput.value : state.config.orgName || "").trim();
    const fac = (dom.facilitatorInput ? dom.facilitatorInput.value : state.config.facilitatorName || "").trim();
    const date = (dom.sessionDateInput ? dom.sessionDateInput.value : state.config.sessionDate || "").trim();
    const phone = (dom.contactPhoneInput ? dom.contactPhoneInput.value : state.config.contactPhone || "").trim();
    const email = (dom.contactEmailInput ? dom.contactEmailInput.value : state.config.contactEmail || "").trim();
    const part = (dom.participantsInput ? dom.participantsInput.value : state.config.participants || "").trim();

    const isEmailOk = email.length > 3 && email.includes("@") && email.includes(".");

    const missingFields = [];
    if (!org) missingFields.push("Organización");
    if (!fac) missingFields.push("Facilitador");
    if (!date) missingFields.push("Fecha");
    if (!phone) missingFields.push("Teléfono");
    if (!isEmailOk) missingFields.push("Correo electrónico válido");
    if (!part) missingFields.push("Participantes");

    const isValid = missingFields.length === 0;

    // Habilitar / Deshabilitar botón
    if (dom.btnStart) {
      dom.btnStart.disabled = !isValid;
      if (isValid) {
        dom.btnStart.removeAttribute("disabled");
      } else {
        dom.btnStart.setAttribute("disabled", "disabled");
      }
    }

    // Actualizar caja de retroalimentación
    if (dom.feedbackBox && dom.feedbackMsg && dom.feedbackIcon) {
      if (isValid) {
        dom.feedbackBox.className = "config-feedback-box valid";
        dom.feedbackIcon.textContent = "✓";
        dom.feedbackMsg.textContent = "Configuración completa. Listo para comenzar la evaluación.";
      } else {
        dom.feedbackBox.className = "config-feedback-box";
        dom.feedbackIcon.textContent = "⚠️";
        dom.feedbackMsg.textContent = `Pendiente por diligenciar: ${missingFields.join(", ")}. Completa todos los campos para habilitar el botón.`;
      }
    }

    // Indicadores visuales en inputs si se solicita
    if (dom.orgNameInput) {
      dom.orgNameInput.classList.toggle("is-valid", !!org);
      if (showFieldErrors) dom.orgNameInput.classList.toggle("is-invalid", !org);
    }
    if (dom.facilitatorInput) {
      dom.facilitatorInput.classList.toggle("is-valid", !!fac);
      if (showFieldErrors) dom.facilitatorInput.classList.toggle("is-invalid", !fac);
    }
    if (dom.sessionDateInput) {
      dom.sessionDateInput.classList.toggle("is-valid", !!date);
      if (showFieldErrors) dom.sessionDateInput.classList.toggle("is-invalid", !date);
    }
    if (dom.contactPhoneInput) {
      dom.contactPhoneInput.classList.toggle("is-valid", !!phone);
      if (showFieldErrors) dom.contactPhoneInput.classList.toggle("is-invalid", !phone);
    }
    if (dom.contactEmailInput) {
      dom.contactEmailInput.classList.toggle("is-valid", isEmailOk);
      if (showFieldErrors) dom.contactEmailInput.classList.toggle("is-invalid", !isEmailOk);
    }
    if (dom.participantsInput) {
      dom.participantsInput.classList.toggle("is-valid", !!part);
      if (showFieldErrors) dom.participantsInput.classList.toggle("is-invalid", !part);
    }

    return isValid;
  }

  /**
   * Persistencia en Session / LocalStorage
   */
  function saveSession() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        config: state.config,
        answers: state.answers,
        comments: state.comments,
        currentStep: state.currentStep
      }));
    } catch (e) {
      console.warn("No se pudo guardar en almacenamiento local:", e);
    }
  }

  function loadSession() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.config) state.config = { ...state.config, ...data.config };
        if (data.answers) state.answers = data.answers || {};
        if (data.comments) state.comments = data.comments || {};
        if (typeof data.currentStep === "number") state.currentStep = data.currentStep;
      }
    } catch (e) {
      console.warn("Error al cargar sesión previa:", e);
    }

    // Poblar campos de formulario
    if (dom.orgNameInput) dom.orgNameInput.value = state.config.orgName || "";
    if (dom.facilitatorInput) dom.facilitatorInput.value = state.config.facilitatorName || "";
    if (dom.sessionDateInput) dom.sessionDateInput.value = state.config.sessionDate || new Date().toISOString().split("T")[0];
    if (dom.phoneCountryCodeSelect) dom.phoneCountryCodeSelect.value = state.config.phoneCountryCode || "+57";
    if (dom.contactPhoneInput) dom.contactPhoneInput.value = state.config.contactPhone || "";
    if (dom.contactEmailInput) dom.contactEmailInput.value = state.config.contactEmail || "";
    if (dom.participantsInput) dom.participantsInput.value = state.config.participants || "";
    if (dom.includeMacroToggle) dom.includeMacroToggle.checked = !!state.config.includeMacro;
  }

  /**
   * Renderizado dinámico de tarjetas de cada categoría
   */
  function renderAllAreaCards() {
    BIM_MATURITY_DATA.categories.forEach((cat, index) => {
      const containerId = `areas-container-${index + 1}`;
      const container = document.getElementById(containerId);
      if (!container) return;

      container.innerHTML = "";

      cat.areas.forEach(area => {
        // Si es macro y está desactivada, omitir
        if (area.optional && !state.config.includeMacro) {
          return;
        }

        const card = createAreaCardElement(cat, area);
        container.appendChild(card);
      });
    });
  }

  function createAreaCardElement(cat, area) {
    const card = document.createElement("div");
    card.className = `area-card ${state.answers[area.id] ? "answered" : ""}`;
    card.id = `area-card-${area.id}`;

    const selectedLevel = state.answers[area.id] || null;
    const commentVal = state.comments[area.id] || "";

    let statusText = "Pendiente";
    let statusClass = "pending";
    if (selectedLevel) {
      const lvlInfo = BIM_MATURITY_DATA.levels[selectedLevel];
      statusText = `Nivel ${selectedLevel.toUpperCase()} — ${lvlInfo.name} (${lvlInfo.points} pts)`;
      statusClass = "selected";
    }

    // Header del área
    let cardHtml = `
      <div class="area-card-header">
        <div>
          <div class="area-title">
            <span class="area-code-badge">${area.code}</span>
            ${area.name}
          </div>
          <div class="area-subtitle">${area.subtitle}</div>
        </div>
        <div class="area-status-pill ${statusClass}" id="status-pill-${area.id}">
          ${statusText}
        </div>
      </div>
      <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 16px;">${area.description}</p>
    `;

    if (area.optional) {
      cardHtml += `
        <div class="info-callout warning" style="padding: 8px 12px; margin-bottom: 12px; font-size: 0.8rem;">
          <strong>Nota de alcance:</strong> ${area.optionalDisclaimer}
        </div>
      `;
    }

    // Grilla de niveles (a, b, c, d, e)
    cardHtml += `<div class="levels-grid">`;

    ["a", "b", "c", "d", "e"].forEach(lvlCode => {
      const lvlInfo = BIM_MATURITY_DATA.levels[lvlCode];
      const isSelected = selectedLevel === lvlCode;
      const textContent = area.levels[lvlCode];

      cardHtml += `
        <div class="level-option ${isSelected ? "selected" : ""}" data-area="${area.id}" data-level="${lvlCode}" onclick="BIMApp.selectLevel('${area.id}', '${lvlCode}')">
          <input type="radio" name="radio_${area.id}" value="${lvlCode}" ${isSelected ? "checked" : ""} aria-label="Nivel ${lvlCode}">
          <div class="level-badge-header">
            <span class="level-letter">${lvlCode}</span>
            <div>
              <div class="level-name-tag">${lvlInfo.name}</div>
              <div class="level-points">${lvlInfo.points} pts</div>
            </div>
          </div>
          <div class="level-body-text">${textContent}</div>
        </div>
      `;
    });

    cardHtml += `</div>`;

    // Campo de notas/comentarios del taller
    cardHtml += `
      <div class="area-comment-box">
        <label for="comment-${area.id}">Notas del Facilitador / Evidencias consensuadas:</label>
        <input type="text" id="comment-${area.id}" placeholder="Registra observaciones, consensos o justificaciones del taller..." value="${escapeHtml(commentVal)}" oninput="BIMApp.updateComment('${area.id}', this.value)">
      </div>
    `;

    card.innerHTML = cardHtml;
    return card;
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  /**
   * Selección de Nivel en un Área
   */
  function selectLevel(areaId, levelCode) {
    state.answers[areaId] = levelCode;
    saveSession();

    // Actualizar visual de la tarjeta
    const card = document.getElementById(`area-card-${areaId}`);
    if (card) {
      card.classList.add("answered");
      const options = card.querySelectorAll(".level-option");
      options.forEach(opt => {
        const isTarget = opt.dataset.level === levelCode;
        opt.classList.toggle("selected", isTarget);
        const radio = opt.querySelector("input[type='radio']");
        if (radio) radio.checked = isTarget;
      });

      const pill = document.getElementById(`status-pill-${areaId}`);
      if (pill) {
        const lvlInfo = BIM_MATURITY_DATA.levels[levelCode];
        pill.textContent = `Nivel ${levelCode.toUpperCase()} — ${lvlInfo.name} (${lvlInfo.points} pts)`;
        pill.className = "area-status-pill selected";
      }
    }

    updateUI();
  }

  function updateComment(areaId, text) {
    state.comments[areaId] = text;
    saveSession();
  }

  /**
   * Navegación entre Pantallas
   */
  function navigateToStep(stepIndex) {
    // Si intenta ir a pasos posteriores sin completar la configuración, bloquear
    if (stepIndex > 0 && !isConfigValid()) {
      validateConfig(true);
      alert("Por favor completa todos los datos obligatorios de la Configuración Inicial antes de continuar.");
      return;
    }

    state.currentStep = stepIndex;
    saveSession();

    // Actualizar paneles visibles
    const panels = document.querySelectorAll(".screen-panel");
    panels.forEach((p, idx) => {
      p.classList.toggle("active", idx === stepIndex);
    });

    // Actualizar botones de stepper
    const stepBtns = document.querySelectorAll(".step-btn");
    stepBtns.forEach((btn, idx) => {
      btn.classList.toggle("active", idx === stepIndex);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });

    if (stepIndex === 6) {
      renderDiagnosticScreen();
    }

    updateUI();
  }

  /**
   * Actualización de indicadores y progreso
   */
  function updateUI() {
    const activeAreas = getActiveAreas();
    const totalActive = activeAreas.length;
    let answeredCount = 0;

    activeAreas.forEach(a => {
      if (state.answers[a.id]) answeredCount++;
    });

    const percent = totalActive > 0 ? Math.round((answeredCount / totalActive) * 100) : 0;
    if (dom.progressBar) dom.progressBar.style.width = `${percent}%`;
    if (dom.progressText) dom.progressText.textContent = `${answeredCount} de ${totalActive} áreas completadas (${percent}%)`;

    // Actualizar badges del stepper por categoría
    BIM_MATURITY_DATA.categories.forEach((cat, idx) => {
      const stepIdx = idx + 1;
      const catAreas = cat.areas.filter(a => !a.optional || state.config.includeMacro);
      const catAnswered = catAreas.filter(a => state.answers[a.id]).length;
      const badge = document.getElementById(`step-badge-${stepIdx}`);
      const btn = document.getElementById(`step-btn-${stepIdx}`);
      if (badge) {
        badge.textContent = `${catAnswered}/${catAreas.length} áreas`;
      }
      if (btn) {
        btn.classList.toggle("completed", catAnswered === catAreas.length && catAreas.length > 0);
      }
    });

    if (dom.disclaimerText) {
      dom.disclaimerText.textContent = BIM_MATURITY_DATA.methodologicalDisclaimer;
    }
  }

  function getActiveAreas() {
    const areas = [];
    BIM_MATURITY_DATA.categories.forEach(cat => {
      cat.areas.forEach(area => {
        if (!area.optional || state.config.includeMacro) {
          areas.push({ ...area, categoryName: cat.name, categoryId: cat.id, categoryColor: cat.color });
        }
      });
    });
    return areas;
  }

  /**
   * Motor de Ponderación Metodológico (Módulo 3)
   */
  function calculateMetrics() {
    const activeAreas = getActiveAreas();
    const catScores = [];
    let totalScoreSum = 0;
    let answeredAreasCount = 0;
    const answeredLevels = [];
    const criticalAreas = []; // Nivel 'a'

    BIM_MATURITY_DATA.categories.forEach(cat => {
      const catAreas = cat.areas.filter(a => !a.optional || state.config.includeMacro);
      let catSum = 0;
      let catAnswered = 0;
      const catLevels = [];

      catAreas.forEach(a => {
        const lvl = state.answers[a.id];
        if (lvl) {
          const pts = BIM_MATURITY_DATA.levels[lvl].points;
          catSum += pts;
          catAnswered++;
          catLevels.push(lvl);
          answeredLevels.push(lvl);
          totalScoreSum += pts;
          answeredAreasCount++;

          if (lvl === "a") {
            criticalAreas.push({ ...a, categoryName: cat.name });
          }
        }
      });

      const avg = catAnswered > 0 ? (catSum / catAnswered) : 0;
      const modalLevel = calculateModalLetter(catLevels);

      catScores.push({
        id: cat.id,
        name: cat.name,
        color: cat.color,
        average: parseFloat(avg.toFixed(1)),
        answeredCount: catAnswered,
        totalCount: catAreas.length,
        modalLevel: modalLevel
      });
    });

    const globalAvg = answeredAreasCount > 0 ? parseFloat((totalScoreSum / answeredAreasCount).toFixed(1)) : 0;
    const globalModal = calculateModalLetter(answeredLevels);
    const globalApproxLevel = getLevelFromScore(globalAvg);

    // Identificar más fuerte y más débil entre categorías que tengan al menos 1 respuesta
    const evaluatedCats = catScores.filter(c => c.answeredCount > 0);
    let strongestCat = null;
    let weakestCat = null;

    if (evaluatedCats.length > 0) {
      evaluatedCats.sort((a, b) => b.average - a.average);
      strongestCat = evaluatedCats[0];
      weakestCat = evaluatedCats[evaluatedCats.length - 1];
    }

    return {
      globalAvg,
      globalModal,
      globalApproxLevel,
      catScores,
      strongestCat,
      weakestCat,
      criticalAreas,
      answeredAreasCount,
      totalActiveCount: activeAreas.length
    };
  }

  function calculateModalLetter(letterArray) {
    if (!letterArray || letterArray.length === 0) return "—";
    const counts = { a: 0, b: 0, c: 0, d: 0, e: 0 };
    letterArray.forEach(l => {
      if (counts[l] !== undefined) counts[l]++;
    });

    let maxCount = -1;
    let modalLetter = "a";
    // Ordenar de mayor a menor para preferir nivel más avanzado en caso de empate
    ["a", "b", "c", "d", "e"].forEach(l => {
      if (counts[l] >= maxCount && counts[l] > 0) {
        maxCount = counts[l];
        modalLetter = l;
      }
    });

    return modalLetter;
  }

  function getLevelFromScore(score) {
    if (score <= 5) return "a";
    if (score <= 15) return "b";
    if (score <= 25) return "c";
    if (score <= 35) return "d";
    return "e";
  }

  /**
   * Renderizado de la Pantalla de Diagnóstico
   */
  function renderDiagnosticScreen() {
    const metrics = calculateMetrics();

    // Actualizar tarjetas de métricas
    const lvlKey = metrics.globalApproxLevel;
    const lvlData = BIM_MATURITY_DATA.levels[lvlKey] || { name: "Inicial", points: 0 };
    
    const metricLevelEl = document.getElementById("res-metric-level");
    if (metricLevelEl) {
      metricLevelEl.textContent = `Nivel ${lvlKey.toUpperCase()} — ${lvlData.name}`;
      metricLevelEl.style.color = lvlData.tagColor || "#38BDF8";
    }

    const metricPointsEl = document.getElementById("res-metric-points");
    if (metricPointsEl) {
      metricPointsEl.textContent = `Promedio orientativo: ${metrics.globalAvg} / 40 pts (Moda: ${metrics.globalModal.toUpperCase()})`;
    }

    const metricStrongEl = document.getElementById("res-metric-strongest");
    const metricStrongVal = document.getElementById("res-metric-strongest-val");
    if (metricStrongEl && metricStrongVal) {
      if (metrics.strongestCat) {
        metricStrongEl.textContent = metrics.strongestCat.name;
        metricStrongVal.textContent = `Promedio: ${metrics.strongestCat.average} pts (Nivel ${metrics.strongestCat.modalLevel.toUpperCase()})`;
      } else {
        metricStrongEl.textContent = "Sin datos";
        metricStrongVal.textContent = "Completa la evaluación";
      }
    }

    const metricWeakEl = document.getElementById("res-metric-weakest");
    const metricWeakVal = document.getElementById("res-metric-weakest-val");
    if (metricWeakEl && metricWeakVal) {
      if (metrics.weakestCat) {
        metricWeakEl.textContent = metrics.weakestCat.name;
        metricWeakVal.textContent = `Promedio: ${metrics.weakestCat.average} pts (Nivel ${metrics.weakestCat.modalLevel.toUpperCase()})`;
      } else {
        metricWeakEl.textContent = "Sin datos";
        metricWeakVal.textContent = "Completa la evaluación";
      }
    }

    // Párrafo de Resumen Ejecutivo Dinámico
    const execSummaryEl = document.getElementById("res-exec-summary");
    if (execSummaryEl) {
      const orgName = state.config.orgName || "la organización evaluada";
      const facilitator = state.config.facilitatorName || "el equipo facilitador";
      const totalAnswered = metrics.answeredAreasCount;
      const totalAreas = metrics.totalActiveCount;

      let summaryHtml = `La autoevaluación de madurez BIM realizada para <strong>${escapeHtml(orgName)}</strong> `;
      summaryHtml += `(facilitada por <em>${escapeHtml(facilitator)}</em>) comprende un total de <strong>${totalAnswered} de ${totalAreas} áreas</strong> analizadas. `;
      summaryHtml += `El diagnóstico arroja una <strong>lectura global orientativa de Nivel ${lvlKey.toUpperCase()} (${lvlData.name})</strong>, con una media agregada de <strong>${metrics.globalAvg} / 40 puntos</strong> y una moda de nivel <strong>${metrics.globalModal.toUpperCase()}</strong>. `;

      if (metrics.strongestCat && metrics.weakestCat) {
        summaryHtml += `La dimensión con mayor grado de madurez consolidada corresponde a <strong>${metrics.strongestCat.name}</strong> (${metrics.strongestCat.average} pts), `;
        summaryHtml += `mientras que la principal brecha técnica y oportunidad de desarrollo se ubica en <strong>${metrics.weakestCat.name}</strong> (${metrics.weakestCat.average} pts). `;
      }

      if (metrics.criticalAreas.length > 0) {
        summaryHtml += `Se identificaron <strong>${metrics.criticalAreas.length} área(s) en Nivel Inicial (a)</strong> que constituyen puntos de partida prioritarios en la hoja de ruta de implementación.`;
      }

      execSummaryEl.innerHTML = summaryHtml;
    }

    // Renderizar gráfico Radar
    renderRadarChart(metrics.catScores);

    // Renderizar tabla detallada de resultados
    renderResultsTable();

    // Renderizar recomendaciones
    renderRecommendations(metrics);
  }

  /**
   * Renderizado de Radar Chart con Chart.js
   */
  function renderRadarChart(catScores) {
    const canvas = document.getElementById("radarChartCanvas");
    if (!canvas) return;

    const labels = catScores.map(c => c.name);
    const dataValues = catScores.map(c => c.average);

    if (state.radarChart) {
      state.radarChart.destroy();
    }

    const ctx = canvas.getContext("2d");
    state.radarChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: labels,
        datasets: [{
          label: "Promedio de Madurez (0-40 pts)",
          data: dataValues,
          backgroundColor: "rgba(2, 132, 199, 0.25)",
          borderColor: "#0284C7",
          borderWidth: 2.5,
          pointBackgroundColor: "#0F172A",
          pointBorderColor: "#FFFFFF",
          pointHoverBackgroundColor: "#FFFFFF",
          pointHoverBorderColor: "#0284C7",
          pointRadius: 4.5,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 40,
            ticks: {
              stepSize: 10,
              callback: function(val) {
                if (val === 0) return "a (0)";
                if (val === 10) return "b (10)";
                if (val === 20) return "c (20)";
                if (val === 30) return "d (30)";
                if (val === 40) return "e (40)";
                return val;
              },
              font: {
                family: "'Roboto Condensed', sans-serif",
                size: 11
              },
              color: "#64748B",
              backdropColor: "transparent"
            },
            grid: {
              color: "#E2E8F0"
            },
            angleLines: {
              color: "#CBD5E1"
            },
            pointLabels: {
              font: {
                family: "'Roboto Condensed', sans-serif",
                size: 12,
                weight: "bold"
              },
              color: "#0F172A"
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const val = context.raw;
                const lvl = getLevelFromScore(val);
                return ` Puntaje: ${val} pts — Nivel ${lvl.toUpperCase()}`;
              }
            }
          }
        }
      }
    });
  }

  /**
   * Renderizado de la Tabla de Resultados Detallada
   */
  function renderResultsTable() {
    const tbody = document.getElementById("results-table-body");
    if (!tbody) return;

    tbody.innerHTML = "";
    const activeAreas = getActiveAreas();

    activeAreas.forEach(area => {
      const selectedLvl = state.answers[area.id];
      const comment = state.comments[area.id] || "—";

      let lvlTagHtml = `<span style="color: var(--text-light); font-style: italic;">Pendiente</span>`;
      let ptsText = "—";

      if (selectedLvl) {
        const lvlInfo = BIM_MATURITY_DATA.levels[selectedLvl];
        lvlTagHtml = `
          <span class="level-tag-result" style="background-color: ${lvlInfo.bgLight}; color: ${lvlInfo.textDark}; border: 1px solid ${lvlInfo.tagColor};">
            <strong>${selectedLvl.toUpperCase()}</strong> — ${lvlInfo.name}
          </span>
        `;
        ptsText = `<strong>${lvlInfo.points}</strong> pts`;
      }

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong style="color: var(--accent-tech);">${area.code}</strong></td>
        <td>
          <div style="font-weight: 700; color: var(--text-main);">${area.name}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted);">${area.subtitle}</div>
        </td>
        <td><span style="font-size: 0.82rem; font-weight: 700; color: #475569;">${area.categoryName}</span></td>
        <td>${lvlTagHtml}</td>
        <td>${ptsText}</td>
        <td style="font-size: 0.82rem; color: var(--text-muted);">${escapeHtml(comment)}</td>
      `;

      tbody.appendChild(tr);
    });
  }

  /**
   * Generación Dinámica de Recomendaciones
   */
  function renderRecommendations(metrics) {
    const container = document.getElementById("recommendations-container");
    if (!container) return;

    container.innerHTML = "";

    const activeRules = [];

    // Evaluar reglas del banco heurístico
    BIM_MATURITY_DATA.recommendationRules.forEach(rule => {
      try {
        if (rule.condition(state.answers, metrics.globalAvg)) {
          activeRules.push({
            title: rule.title,
            desc: rule.recommendation
          });
        }
      } catch (e) {
        console.warn("Error evaluando regla:", rule.id, e);
      }
    });

    // Agregar recomendación para áreas críticas 'a'
    if (metrics.criticalAreas.length > 0) {
      const areaNames = metrics.criticalAreas.map(a => `${a.name} (${a.categoryName})`).join(", ");
      activeRules.unshift({
        title: "Atención Prioritaria en Áreas de Nivel Inicial (a)",
        desc: `Las áreas identificadas en punto de partida [ ${areaNames} ] deben ser priorizadas en el plan de acción inmediato para evitar cuellos de botella en la adopción global.`
      });
    }

    // Si no hay reglas disparadas, recomendación general
    if (activeRules.length === 0) {
      activeRules.push({
        title: "Consolidación de Estándares y Mejora Continua",
        desc: "Mantener los flujos documentados, realizar auditorías de modelos periódicas y revisar la evolución de los roles en el próximo ciclo de evaluación."
      });
    }

    // Limitar a 4-5 recomendaciones clave
    const finalRules = activeRules.slice(0, 5);

    finalRules.forEach(rule => {
      const card = document.createElement("div");
      card.className = "rec-card";
      card.innerHTML = `
        <div class="rec-card-title">${rule.title}</div>
        <div class="rec-card-desc">${rule.desc}</div>
      `;
      container.appendChild(card);
    });
  }

  /**
   * Generación y Descarga del Reporte PDF Oficial
   * Mantiene rigurosamente la paleta y el pie de página institucional de la app
   */
  async function generatePDFReport() {
    if (typeof window.jspdf === "undefined") {
      alert("Error: La librería de generación PDF no está cargada en el navegador.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const metrics = calculateMetrics();
    const activeAreas = getActiveAreas();
    const orgName = state.config.orgName || "Organización";
    const facilitator = state.config.facilitatorName || "Julian López";
    const sessionDate = state.config.sessionDate || new Date().toISOString().split("T")[0];
    const phoneCountry = state.config.phoneCountryCode || "+57";
    const phoneNum = state.config.contactPhone || "No especificado";
    const fullPhone = `${phoneCountry} ${phoneNum}`;
    const emailStr = state.config.contactEmail || "No especificado";
    const participants = state.config.participants || "Equipo de evaluación multidisciplinario";
    const globalLvlInfo = BIM_MATURITY_DATA.levels[metrics.globalApproxLevel] || { name: "Inicial", points: 0 };

    // Paleta oficial de la app
    const primaryDark = [15, 23, 42];     // #0F172A (Slate 900)
    const accentSky = [2, 132, 199];      // #0284C7 (Sky 600)
    const slateMuted = [71, 85, 105];     // #475569 (Slate 600)
    const slateLight = [100, 116, 139];   // #64748B (Slate 500)
    const bgPaper = [248, 250, 252];      // #F8FAFC

    // Función auxiliar para pie de página institucional EXACTO al de la app
    function addAppFooterToPDF(docInstance, pageNum, totalPages) {
      const pageHeight = docInstance.internal.pageSize.getHeight();
      const pageWidth = docInstance.internal.pageSize.getWidth();

      // Línea divisoria sutil
      docInstance.setDrawColor(203, 213, 225);
      docInstance.setLineWidth(0.35);
      docInstance.line(14, pageHeight - 16, pageWidth - 14, pageHeight - 16);

      // Fila 1: Firma de autoridad destacada y paginación
      docInstance.setFont("helvetica", "bold");
      docInstance.setFontSize(7.8);
      docInstance.setTextColor(...primaryDark);
      docInstance.text("Julian López | Arquitecto • Especialista BIM - BIM Management - 2026", 14, pageHeight - 11);

      docInstance.setFont("helvetica", "normal");
      docInstance.setFontSize(7.5);
      docInstance.setTextColor(...slateLight);
      docInstance.text(`Página ${pageNum} de ${totalPages}`, pageWidth - 14, pageHeight - 11, { align: "right" });

      // Fila 2: Atribución metodológica y datos de contacto
      docInstance.setFontSize(6.8);
      docInstance.setTextColor(...slateMuted);
      docInstance.text("Metodología BIm³ v1.22: Dr. Bilal Succar / BIMe Initiative • Licencia CC BY-NC-SA 3.0 • Trad. Víctor Roig", 14, pageHeight - 6.5);

      const contactInfoStr = `Contacto: ${fullPhone} • ${emailStr}`;
      docInstance.text(contactInfoStr, pageWidth - 14, pageHeight - 6.5, { align: "right" });
    }

    // =========================================================================
    // PÁGINA 1: PORTADA, RESUMEN EJECUTIVO Y GRÁFICO RADAR
    // =========================================================================

    // Header institucional superior
    doc.setFillColor(...primaryDark);
    doc.rect(0, 0, 210, 32, "F");

    // Acento de línea técnica Sky 600
    doc.setFillColor(...accentSky);
    doc.rect(0, 32, 210, 2.5, "F");

    // Títulos de cabecera
    doc.setFont("helvetica", "bold");
    doc.setFontSize(15.5);
    doc.setTextColor(255, 255, 255);
    doc.text("INFORME DE AUTOEVALUACIÓN DE MADUREZ BIM (BIm³)", 14, 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(148, 163, 184);
    doc.text("Metodología: Dr. Bilal Succar / BIMe Initiative v1.22 • Trad. Víctor Roig / BIMETRIC", 14, 23);

    let yPos = 41;

    // Ficha técnica del taller con datos de contacto
    doc.setFillColor(...bgPaper);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(14, yPos, 182, 40, 2, 2, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(...primaryDark);
    doc.text("DATOS DE LA SESIÓN DE EVALUACIÓN Y CONTACTO", 18, yPos + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...slateMuted);

    // Columna 1
    doc.text(`Organización Evaluada:`, 18, yPos + 13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryDark);
    doc.text(`${orgName}`, 58, yPos + 13);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...slateMuted);
    doc.text(`Facilitador Líder:`, 18, yPos + 19);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryDark);
    doc.text(`${facilitator}`, 58, yPos + 19);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...slateMuted);
    doc.text(`Fecha del Taller:`, 18, yPos + 25);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryDark);
    doc.text(`${sessionDate}`, 58, yPos + 25);

    // Columna 2: Contacto
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...slateMuted);
    doc.text(`Teléfono / Móvil:`, 115, yPos + 13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryDark);
    doc.text(`${fullPhone}`, 145, yPos + 13);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...slateMuted);
    doc.text(`Correo Electrónico:`, 115, yPos + 19);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryDark);
    doc.text(`${emailStr}`, 145, yPos + 19);

    // Fila inferior: Participantes
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...slateMuted);
    doc.text(`Participantes / Equipo:`, 18, yPos + 33);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...primaryDark);
    const splitParts = doc.splitTextToSize(participants, 138);
    doc.text(splitParts, 58, yPos + 33);

    yPos += 46;

    // Métricas globales destacadas en tarjetas institucionales
    doc.setFillColor(...primaryDark);
    doc.roundedRect(14, yPos, 58, 22, 2, 2, "F");
    doc.roundedRect(76, yPos, 58, 22, 2, 2, "F");
    doc.roundedRect(138, yPos, 58, 22, 2, 2, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.2);
    doc.setTextColor(148, 163, 184);
    doc.text("LECTURA GLOBAL ORIENTATIVA", 18, yPos + 6);
    doc.text("CATEGORÍA DESTACADA", 80, yPos + 6);
    doc.text("PRINCIPAL BRECHA", 142, yPos + 6);

    doc.setFontSize(10.5);
    doc.setTextColor(56, 189, 248);
    doc.text(`NIVEL ${metrics.globalApproxLevel.toUpperCase()} (${globalLvlInfo.name})`, 18, yPos + 13);

    doc.setTextColor(52, 211, 153);
    const strongName = metrics.strongestCat ? metrics.strongestCat.name : "N/A";
    doc.text(`${strongName}`, 80, yPos + 13);

    doc.setTextColor(248, 113, 113);
    const weakName = metrics.weakestCat ? metrics.weakestCat.name : "N/A";
    doc.text(`${weakName}`, 142, yPos + 13);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(203, 213, 225);
    doc.text(`Media: ${metrics.globalAvg} / 40 pts | Moda: ${metrics.globalModal.toUpperCase()}`, 18, yPos + 18);
    doc.text(`Promedio: ${metrics.strongestCat ? metrics.strongestCat.average : 0} pts`, 80, yPos + 18);
    doc.text(`Promedio: ${metrics.weakestCat ? metrics.weakestCat.average : 0} pts`, 142, yPos + 18);

    yPos += 27;

    // Resumen Ejecutivo
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...primaryDark);
    doc.text("1. Resumen Ejecutivo del Diagnóstico", 14, yPos);

    yPos += 4.5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.2);
    doc.setTextColor(...slateMuted);

    let summaryText = `La autoevaluación de madurez BIM realizada para ${orgName}, facilitada por ${facilitator}, `;
    summaryText += `comprende un total de ${metrics.answeredAreasCount} de ${metrics.totalActiveCount} áreas analizadas. `;
    summaryText += `El diagnóstico sitúa a la entidad en un nivel orientativo global ${metrics.globalApproxLevel.toUpperCase()} (${globalLvlInfo.name}), con un puntaje medio de ${metrics.globalAvg} sobre 40 puntos. `;
    if (metrics.strongestCat && metrics.weakestCat) {
      summaryText += `Se observa una mayor consolidación en la categoría ${metrics.strongestCat.name} (${metrics.strongestCat.average} pts), mientras que la dimensión ${metrics.weakestCat.name} (${metrics.weakestCat.average} pts) representa la prioridad de intervención más urgente. `;
    }
    if (metrics.criticalAreas.length > 0) {
      summaryText += `Asimismo, se registran ${metrics.criticalAreas.length} área(s) en Nivel Inicial (a) como puntos de partida prioritarios en la hoja de ruta.`;
    }

    const splitSummary = doc.splitTextToSize(summaryText, 182);
    doc.text(splitSummary, 14, yPos);
    yPos += (splitSummary.length * 4.0) + 2;

    // Descargo metodológico obligatorio
    doc.setFillColor(254, 243, 199);
    doc.setDrawColor(245, 158, 11);
    doc.roundedRect(14, yPos, 182, 12, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.2);
    doc.setTextColor(146, 64, 14);
    doc.text("NOTA DE HONESTIDAD METODOLÓGICA BIm³:", 17, yPos + 4.2);
    doc.setFont("helvetica", "normal");
    doc.text(BIM_MATURITY_DATA.methodologicalDisclaimer, 17, yPos + 8.2, { maxWidth: 176 });

    yPos += 16;

    // Gráfico de Radar
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10.5);
    doc.setTextColor(...primaryDark);
    doc.text("2. Perfil Gráfico de Madurez por Categorías (Spider Chart)", 14, yPos);

    yPos += 3.5;
    const canvas = document.getElementById("radarChartCanvas");
    if (canvas) {
      try {
        const imgData = canvas.toDataURL("image/png", 1.0);
        doc.addImage(imgData, "PNG", 35, yPos, 140, 78);
      } catch (e) {
        console.warn("No se pudo exportar el canvas del gráfico radar:", e);
      }
    }

    addAppFooterToPDF(doc, 1, 3);

    // =========================================================================
    // PÁGINA 2: TABLA DETALLADA DE LAS 16 ÁREAS
    // =========================================================================
    doc.addPage();

    // Header superior de página 2
    doc.setFillColor(...primaryDark);
    doc.rect(0, 0, 210, 16, "F");
    doc.setFillColor(...accentSky);
    doc.rect(0, 16, 210, 1.5, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("3. Tabla Detallada de Áreas Evaluadas (Matriz BIm³ v1.22)", 14, 10.5);

    const tableRows = activeAreas.map(area => {
      const selectedLvl = state.answers[area.id];
      const comment = state.comments[area.id] || "—";
      let lvlStr = "Pendiente";
      let ptsStr = "—";

      if (selectedLvl) {
        const lvlInfo = BIM_MATURITY_DATA.levels[selectedLvl];
        lvlStr = `${selectedLvl.toUpperCase()} - ${lvlInfo.name}`;
        ptsStr = `${lvlInfo.points} pts`;
      }

      return [
        area.code,
        area.name,
        area.categoryName,
        lvlStr,
        ptsStr,
        comment
      ];
    });

    doc.autoTable({
      startY: 23,
      head: [["Cód.", "Área de Capacidad", "Categoría", "Nivel", "Puntos", "Notas del Taller"]],
      body: tableRows,
      theme: "grid",
      styles: {
        font: "helvetica",
        fontSize: 7.5,
        cellPadding: 2.2,
        textColor: [15, 23, 42],
        lineColor: [226, 232, 240],
        lineWidth: 0.2
      },
      headStyles: {
        fillColor: [15, 23, 42],
        textColor: [255, 255, 255],
        fontStyle: "bold",
        fontSize: 8
      },
      columnStyles: {
        0: { cellWidth: 16, fontStyle: "bold", halign: "center" },
        1: { cellWidth: 42, fontStyle: "bold" },
        2: { cellWidth: 26 },
        3: { cellWidth: 28, fontStyle: "bold" },
        4: { cellWidth: 16, halign: "center" },
        5: { cellWidth: 54 }
      },
      didParseCell: function(data) {
        if (data.section === "body" && data.column.index === 3) {
          const text = data.cell.raw || "";
          if (text.startsWith("A")) {
            data.cell.styles.fillColor = [254, 226, 226];
            data.cell.styles.textColor = [185, 28, 28];
          } else if (text.startsWith("B")) {
            data.cell.styles.fillColor = [254, 243, 199];
            data.cell.styles.textColor = [180, 83, 9];
          } else if (text.startsWith("C")) {
            data.cell.styles.fillColor = [224, 242, 254];
            data.cell.styles.textColor = [3, 105, 161];
          } else if (text.startsWith("D")) {
            data.cell.styles.fillColor = [238, 242, 255];
            data.cell.styles.textColor = [67, 56, 202];
          } else if (text.startsWith("E")) {
            data.cell.styles.fillColor = [209, 250, 229];
            data.cell.styles.textColor = [4, 120, 87];
          }
        }
      }
    });

    addAppFooterToPDF(doc, 2, 3);

    // =========================================================================
    // PÁGINA 3: RECOMENDACIONES ORIENTATIVAS, LICENCIAS Y ATRIBUCIÓN
    // =========================================================================
    doc.addPage();

    doc.setFillColor(...primaryDark);
    doc.rect(0, 0, 210, 16, "F");
    doc.setFillColor(...accentSky);
    doc.rect(0, 16, 210, 1.5, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("4. Recomendaciones Orientativas para la Hoja de Ruta BIM", 14, 10.5);

    let p3Y = 24;

    // Obtener recomendaciones activas
    const activeRules = [];
    BIM_MATURITY_DATA.recommendationRules.forEach(rule => {
      if (rule.condition(state.answers, metrics.globalAvg)) {
        activeRules.push({ title: rule.title, desc: rule.recommendation });
      }
    });

    if (metrics.criticalAreas.length > 0) {
      const areaNames = metrics.criticalAreas.map(a => `${a.name} (${a.categoryName})`).join(", ");
      activeRules.unshift({
        title: "Atención Prioritaria en Áreas de Nivel Inicial (a)",
        desc: `Las áreas identificadas en punto de partida [ ${areaNames} ] deben ser priorizadas en el plan de acción inmediato para evitar cuellos de botella en la adopción global.`
      });
    }

    if (activeRules.length === 0) {
      activeRules.push({
        title: "Consolidación de Estándares y Mejora Continua",
        desc: "Mantener los flujos documentados, realizar auditorías de modelos periódicas y revisar la evolución de los roles en el próximo ciclo de evaluación."
      });
    }

    const finalRules = activeRules.slice(0, 5);

    finalRules.forEach((rule, idx) => {
      doc.setFillColor(...bgPaper);
      doc.setDrawColor(2, 132, 199);
      doc.roundedRect(14, p3Y, 182, 18, 1.5, 1.5, "FD");

      doc.setFillColor(...accentSky);
      doc.rect(14, p3Y, 2.5, 18, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(...primaryDark);
      doc.text(`${idx + 1}. ${rule.title}`, 20, p3Y + 5.5);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.8);
      doc.setTextColor(...slateMuted);
      doc.text(rule.desc, 20, p3Y + 10, { maxWidth: 170 });

      p3Y += 22;
    });

    p3Y += 6;

    // Recordatorio de reevaluación
    doc.setFillColor(240, 253, 244);
    doc.setDrawColor(167, 243, 208);
    doc.roundedRect(14, p3Y, 182, 14, 1.5, 1.5, "FD");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(6, 95, 70);
    doc.text("RECORDATORIO DE PERIODICIDAD RECOMENDADA:", 18, p3Y + 5);
    doc.setFont("helvetica", "normal");
    doc.text(BIM_MATURITY_DATA.retestRecommendation, 18, p3Y + 9.5, { maxWidth: 174 });

    p3Y += 22;

    // Sección de Atribución Metodológica y Licencia
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...primaryDark);
    doc.text("5. Atribución Metodológica y Licenciamiento", 14, p3Y);

    p3Y += 6;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...slateMuted);

    const licenseLines = [
      "• Contenido metodológico basado en: Succar, B. (2010). Building Information Modelling maturity matrix, y BIMe Initiative, 301in.ES Matriz de Madurez BIM v1.22.",
      "• Traducción al español: Víctor Roig (BIMETRIC Laboratorio de Procesos SL).",
      "• Licencia del documento original: Creative Commons Attribution - NonCommercial - ShareAlike 3.0 Unported (CC BY-NC-SA 3.0).",
      "• Aviso legal: " + BIM_MATURITY_DATA.methodologyNotice
    ];

    licenseLines.forEach(line => {
      const split = doc.splitTextToSize(line, 182);
      doc.text(split, 14, p3Y);
      p3Y += (split.length * 3.8);
    });

    p3Y += 6;

    // Recuadro de Autoría de la Herramienta
    doc.setFillColor(15, 23, 42);
    doc.roundedRect(14, p3Y, 182, 16, 2, 2, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text("DIAGNÓSTICO ESTRUCTURADO Y FACILITADO POR:", 18, p3Y + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(56, 189, 248);
    doc.text("Julian López | Arquitecto • Especialista BIM - BIM Management - 2026", 18, p3Y + 11.5);

    addAppFooterToPDF(doc, 3, 3);

    // Descargar el archivo
    const safeOrgName = orgName.replace(/[^a-zA-Z0-9_-]/g, "_");
    doc.save(`Diagnostico_Madurez_BIM_${safeOrgName}_${sessionDate}.pdf`);
  }

  /**
   * Reiniciar Taller
   */
  function resetWorkshop() {
    if (confirm("¿Estás seguro de que deseas reiniciar el taller? Se borrarán las respuestas actuales para iniciar una nueva sesión.")) {
      localStorage.removeItem(STORAGE_KEY);
      state.answers = {};
      state.comments = {};
      state.config.orgName = "";
      state.config.facilitatorName = "";
      state.config.phoneCountryCode = "+57";
      state.config.contactPhone = "";
      state.config.contactEmail = "";
      state.config.participants = "";
      state.currentStep = 0;
      loadSession();
      renderAllAreaCards();
      validateConfig();
      navigateToStep(0);
      updateUI();
    }
  }

  // Inicializar al cargar la ventana
  window.addEventListener("DOMContentLoaded", init);

  return {
    selectLevel,
    updateComment,
    navigateToStep,
    resetWorkshop,
    generatePDFReport
  };
})();
