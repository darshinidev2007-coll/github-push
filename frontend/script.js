/* =========================================================================
   CITEVERIFY — COMPLETE ANIMATION ENGINE & LIVE VERIFICATION CLIENT
   - Crimson Embers + Hero + 3D Ring Workflow
   - 3D Z-Tunnel Upload + Live Backend (/api/verify) Integration
   - 3D Hinge Extract + Gyro-Orbit Retrieve + Counter-Shear Compare
   - GSAP Hyper-Prism Report + Pendulum Dossier Demo & Trust
   ========================================================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const API_BASE_URL = "http://127.0.0.1:8000";

  /**
   * Safely fetch an element by ID.
   * @param {string} id
   * @returns {HTMLElement|null}
   */
  const $ = function (id) {
    return document.getElementById(id);
  };

  /**
   * Safely set textContent on an element if it exists.
   * @param {string} id
   * @param {string} value
   */
  const setText = function (id, value) {
    const el = $(id);
    if (el && value !== undefined && value !== null) {
      el.textContent = String(value);
    }
  };

  /**
   * Safely set innerHTML on an element if it exists.
   * @param {string} id
   * @param {string} html
   */
  const setHtml = function (id, html) {
    const el = $(id);
    if (el && html !== undefined && html !== null) {
      el.innerHTML = String(html);
    }
  };

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* =======================================================================
     AMBIENT CRIMSON EMBERS (DARK BACKGROUND)
     ======================================================================= */
  const emberField = $("emberField");
  if (emberField && !reduceMotion) {
    try {
      const emberCount = window.innerWidth < 650 ? 14 : 26;
      const frag = document.createDocumentFragment();

      for (let i = 0; i < emberCount; i++) {
        const ember = document.createElement("span");
        ember.className = "crimson-ember";
        const size = 3 + (i % 5) * 1.4;
        const leftPos = (i * 37) % 100;
        const duration = 9 + (i % 7) * 2.2;
        const delay = -((i * 1.9) % duration);
        const driftX = ((i % 2 === 0 ? 1 : -1) * (14 + (i % 4) * 10)) + "px";

        ember.style.width = size + "px";
        ember.style.height = size + "px";
        ember.style.left = leftPos + "%";
        ember.style.animationDuration = duration + "s";
        ember.style.animationDelay = delay + "s";
        ember.style.setProperty("--drift-x", driftX);
        frag.appendChild(ember);
      }

      emberField.appendChild(frag);
    } catch (emberErr) {
      console.error("Ember initialization error:", emberErr);
    }
  }

  /* =======================================================================
     PAGE 1 — HERO ANIMATION
     ======================================================================= */
  const hero = $("hero");
  if (hero) {
    const wm = $("wm");
    const word = "CiteVerify";

    if (wm) {
      wm.innerHTML = word
        .split("")
        .map(function (letter) {
          return '<span aria-hidden="true"><i>' + letter + "</i></span>";
        })
        .join("");
    }

    const letters = wm ? wm.querySelectorAll("i") : [];
    const particles = document.querySelectorAll("#px .p");
    const connectionLines = document.querySelectorAll("#ci .dr");
    const connectionDots = document.querySelectorAll("#ci .e");

    function segment(progress, start, end) {
      return Math.min(1, Math.max(0, (progress - start) / (end - start)));
    }

    function animateHero() {
      try {
        const rect = hero.getBoundingClientRect();
        const total = hero.offsetHeight - window.innerHeight;
        const progress = reduceMotion
          ? 1
          : Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));

        const shield = segment(progress, 0, 0.16);
        const lock = segment(progress, 0.12, 0.28);
        const particlesProgress = segment(progress, 0.20, 0.38);
        const textProgress = segment(progress, 0.40, 0.64);
        const finalProgress = segment(progress, 0.68, 0.84);

        if ($("sh")) $("sh").style.strokeDashoffset = 1 - shield;
        if ($("sk")) $("sk").style.strokeDashoffset = 1 - lock;
        if ($("bd")) $("bd").style.opacity = segment(lock, 0.4, 1);

        particles.forEach(function (element, index) {
          const p = segment(particlesProgress, index * 0.08, index * 0.08 + 0.45);
          element.style.opacity = p;
          element.style.transform = "translateX(" + (1 - p) * -36 + "px)";
        });

        connectionLines.forEach(function (element) {
          element.style.strokeDashoffset = 1 - particlesProgress;
        });

        connectionDots.forEach(function (element) {
          element.style.opacity = segment(particlesProgress, 0.7, 1);
        });

        if ($("glow")) $("glow").style.opacity = Math.min(1, particlesProgress * 1.2);
        if ($("mark")) $("mark").style.transform = "scale(" + (1.3 - 0.3 * textProgress) + ")";

        letters.forEach(function (element, index) {
          const p = segment(textProgress, index * 0.07, index * 0.07 + 0.4);
          element.style.transform = "translateY(" + (1 - p) * 105 + "%)";
        });

        if ($("tag")) {
          $("tag").style.opacity = finalProgress;
          $("tag").style.transform = "translateY(" + (1 - finalProgress) * 16 + "px)";
        }

        if ($("cta")) {
          $("cta").style.opacity = finalProgress;
          $("cta").style.transform = "translateY(" + (1 - finalProgress) * 16 + "px)";
        }

        if ($("hint")) {
          $("hint").style.opacity = 1 - segment(progress, 0, 0.06);
        }
      } catch (heroErr) {
        console.error("Hero animation error:", heroErr);
      }
    }

    window.addEventListener("scroll", animateHero, { passive: true });
    window.addEventListener("resize", animateHero);
    animateHero();
  }

  /* =======================================================================
     PAGE 2 — 3D RING WORKFLOW
     ======================================================================= */
  const how = $("how");
  if (how) {
    const ring = $("ring");
    const slides = how.querySelectorAll(".slide");
    const pillContainer = $("pills");
    const progressBar = $("pb");
    const title = $("st");
    const description = $("sd");

    const workflow = [
      ["Upload", "Upload your paper", "Drop a research paper or paste the text."],
      ["Extract", "Find claims and citations", "Every claim is pulled out with its citation attached to it."],
      ["Retrieve", "Find the original paper", "The cited paper is located by title, author, or DOI."],
      ["Compare", "Read claim against source", "The claim is checked against the source passage, scope and limitations."],
      ["Report", "Get an evidence-backed report", "A verdict, confidence and source link for every claim. You make the final call."]
    ];

    let previousStep = -1;
    let radius = 0;

    if (pillContainer) {
      pillContainer.innerHTML = workflow
        .map(function (item, index) {
          return '<span class="pill">' + (index + 1) + " " + item[0] + "</span>";
        })
        .join("");
    }

    const pills = pillContainer ? pillContainer.querySelectorAll(".pill") : [];

    function arrangeRing() {
      if (!slides.length) return;
      const width = slides[0].offsetWidth;
      radius = width / 2 / Math.tan(Math.PI / 5) + 14;
      slides.forEach(function (slide, index) {
        slide.style.transform =
          "rotateY(" + index * 72 + "deg) " + "translateZ(" + radius + "px)";
      });
    }

    function animateWorkflow() {
      try {
        const rect = how.getBoundingClientRect();
        const total = how.offsetHeight - window.innerHeight;
        const progress = reduceMotion
          ? 1
          : Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));

        const position = progress * 4;
        const currentStep = Math.min(4, Math.max(0, Math.round(position)));

        if (ring) {
          ring.style.transform = !reduceMotion
            ? "translateZ(" + -radius + "px) " + "rotateY(" + -position * 72 + "deg)"
            : "translateZ(" + -radius + "px)";
        }

        slides.forEach(function (slide, index) {
          const distance = Math.abs(index - position);
          slide.style.opacity = Math.max(0.15, 1 - distance * 0.6);
        });

        if (currentStep !== previousStep) {
          previousStep = currentStep;
          if (title) title.textContent = workflow[currentStep][1];
          if (description) description.textContent = workflow[currentStep][2];

          [title, description].forEach(function (element) {
            if (!element) return;
            element.classList.remove("swap");
            void element.offsetWidth;
            element.classList.add("swap");
          });

          pills.forEach(function (pill, index) {
            pill.className = "pill";
            if (index < currentStep) pill.classList.add("done");
            if (index === currentStep) pill.classList.add("on");
          });
        }

        if (progressBar) {
          progressBar.style.width = progress * 100 + "%";
        }
      } catch (wfErr) {
        console.error("Workflow animation error:", wfErr);
      }
    }

    arrangeRing();
    window.addEventListener("scroll", animateWorkflow, { passive: true });
    window.addEventListener("resize", function () {
      arrangeRing();
      animateWorkflow();
    });
    animateWorkflow();
  }

  /* =======================================================================
     UPLOAD SECTION — 3D Z-TUNNEL SLIDES + LIVE BACKEND VERIFICATION
     ======================================================================= */
  const uploadSec = $("upload");
  if (uploadSec) {
    const upHead = $("upHead");
    const upSlides = uploadSec.querySelectorAll(".up-3d-slide");
    const upTabs = uploadSec.querySelectorAll(".up-tab");
    const upProgressBar = $("upProgressBar");
    const upSlideCounter = $("upSlideCounter");
    const upScrollHint = $("upScrollHint");

    const SAMPLE_PAPER_TEXT =
      "A particular study found that a learning app improved test scores by 30% [3]. " +
      "Structured retrieval practice over eight weeks improved delayed recall in introductory biology [1].\n\n" +
      "References\n" +
      "[1] Lin, H., & Gomez, M. (2023). Spaced Retrieval Schedules in Introductory Biology Labs.\n" +
      "[3] Smith, J., & Patel, R. (2021). Classroom Mobile Learning Pilot & Assessment Outcomes.";

    const manuscriptArea = $("manuscriptArea");
    const paperInput = $("paperInput");
    const dropZone = $("dropZone");
    let uploadedFileObj = null;

    uploadSec.querySelectorAll("form").forEach(function (frm) {
      frm.addEventListener("submit", function (e) {
        e.preventDefault();
      });
    });

    /**
     * Format status strings cleanly for badges and pills.
     * @param {string} st
     * @returns {string}
     */
    function formatStatus(st) {
      return String(st || "insufficient_evidence")
        .replace(/_/g, " ")
        .toUpperCase();
    }

    /**
     * Render a clean claim-by-claim summary list inside #liveClaimsList
     * if that container exists in index.html.
     * @param {Array<object>} claims
     */
    function renderLiveClaimsList(claims) {
      const container = $("liveClaimsList");
      if (!container) return;

      if (!Array.isArray(claims) || !claims.length) {
        container.innerHTML = "<p>No claims extracted from the submitted text.</p>";
        return;
      }

      container.innerHTML = claims
        .slice(0, 6)
        .map(function (c, idx) {
          const verdict = formatStatus(c.verification_status);
          const conf = Math.max(0, Math.min(100, Number(c.confidence || 50)));
          const cites =
            Array.isArray(c.citations) && c.citations.length
              ? " [" + c.citations.join(", ") + "]"
              : "";
          return (
            '<div class="live-claim-item">' +
            "<strong>#" +
            (c.claim_id || idx + 1) +
            cites +
            " · " +
            verdict +
            " (" +
            conf +
            "%)</strong>" +
            "<p>" +
            (c.claim || "") +
            "</p>" +
            "<small>" +
            (c.reason || "") +
            "</small>" +
            "</div>"
          );
        })
        .join("");
    }

    /**
     * Client-side fallback parser so UI remains responsive even if the
     * FastAPI server is stopped during a browser preview.
     * @param {string} sourceName
     * @param {string} rawText
     * @returns {object}
     */
    function buildLocalFallbackReport(sourceName, rawText) {
      const clean = (rawText || "").trim();
      const sentences = clean
        ? clean
            .split(/(?<=[.!?])\s+/)
            .map(function (s) {
              return s.trim();
            })
            .filter(function (s) {
              return s.length > 15;
            })
        : [];

      const extractedClaims = (sentences.length ? sentences : [
        "Uploaded document (" + sourceName + ") staged for claim and citation review."
      ])
        .slice(0, 6)
        .map(function (sentence, idx) {
          const bracketMatches = [];
          const regex = /\[(\d+(?:\s*,\s*\d+)*)\]/g;
          let m;
          while ((m = regex.exec(sentence)) !== null) {
            m[1].split(",").forEach(function (num) {
              bracketMatches.push(num.trim());
            });
          }

          const hasNumber = /\d+%|\d+\.\d+/.test(sentence);
          const status = bracketMatches.length
            ? hasNumber
              ? "partially_supported"
              : "supported"
            : "insufficient_evidence";

          return {
            claim_id: idx + 1,
            claim: sentence,
            citations: bracketMatches,
            matching_status: bracketMatches.length ? "matched" : "unmatched",
            verification_status: status,
            verification_completed: true,
            reason: bracketMatches.length
              ? "Citation marker detected; verify quantitative scope against source text."
              : "No explicit inline citation marker found in this sentence.",
            evidence:
              "Local browser preview for " +
              sourceName +
              " (start uvicorn server on port 8000 for Crossref + Gemini audit).",
            source_title: bracketMatches.length
              ? "Reference [" + bracketMatches[0] + "] in " + sourceName
              : "Unmatched Reference",
            source_doi: "",
            confidence: bracketMatches.length ? (hasNumber ? 68 : 80) : 35
          };
        });

      return {
        project: "CiteVerify",
        report_generated: new Date().toISOString().replace("T", " ").slice(0, 19),
        summary: {
          total_claims: extractedClaims.length,
          total_citations: extractedClaims.reduce(function (acc, c) {
            return acc + (c.citations ? c.citations.length : 0);
          }, 0),
          total_references: 0,
          matched_claims: extractedClaims.filter(function (c) {
            return c.matching_status === "matched";
          }).length,
          unmatched_claims: extractedClaims.filter(function (c) {
            return c.matching_status !== "matched";
          }).length,
          verified_claims: extractedClaims.length,
          supported_claims: extractedClaims.filter(function (c) {
            return c.verification_status === "supported";
          }).length,
          partially_supported_claims: extractedClaims.filter(function (c) {
            return c.verification_status === "partially_supported";
          }).length,
          unsupported_claims: extractedClaims.filter(function (c) {
            return c.verification_status === "unsupported";
          }).length,
          insufficient_evidence_claims: extractedClaims.filter(function (c) {
            return c.verification_status === "insufficient_evidence";
          }).length
        },
        claims: extractedClaims
      };
    }

    /**
     * Populate all 3D workflow slides (Upload, Extract, Retrieve, Compare, Report, Demo)
     * with real report data returned by the backend.
     * @param {string} filename
     * @param {object} report
     */
    function applyBackendReportToSlides(filename, report) {
      if (!report || !Array.isArray(report.claims)) return;

      const claims = report.claims;
      const summary = report.summary || {};
      const primary = claims[0] || {};
      const secondary = claims[1] || primary;

      renderLiveClaimsList(claims);

      // 1. Upload & Staged Summary (Slide 01 - 03)
      setText("selectedFileName", filename);
      setText("summaryDocName", filename);
      setText(
        "summaryMode",
        "Verified (" + (summary.total_claims || claims.length) + " claims)"
      );
      if (primary.claim) {
        setText(
          "summarySnippet",
          "Top Claim: “" +
            primary.claim +
            "” — Verdict: " +
            formatStatus(primary.verification_status)
        );
      }
      setText(
        "docBadge",
        filename + " · " + (summary.total_claims || claims.length) + " claims verified"
      );
      setText(
        "readyChip",
        "Verified (" + (summary.total_claims || claims.length) + " claims)"
      );

      // 2. Step 2: Extract Reference Card & Token Map
      const exRefCard = $("exRefCard");
      if (exRefCard && primary.claim) {
        const citeLabel =
          primary.citations && primary.citations.length
            ? "[" + primary.citations.join(", ") + "]"
            : "[UNLINKED]";
        exRefCard.innerHTML =
          '<div class="ex-ref-id">REF ' +
          citeLabel +
          " · " +
          String(primary.matching_status || "checked").toUpperCase() +
          "</div>" +
          "<h4>" +
          (primary.source_title || "Extracted Claim #1") +
          "</h4>" +
          "<p><em>“" +
          primary.claim +
          "”</em></p>" +
          '<span class="ex-ref-status">' +
          (primary.reason || "Extracted from document") +
          "</span>";
      }

      const tokenCards = document.querySelectorAll(".ex-token-card");
      window.__LIVE_REF_MAP = {};
      tokenCards.forEach(function (card, idx) {
        const item = claims[idx] || primary;
        const key = card.getAttribute("data-ref") || String(idx);
        const citeTag =
          item.citations && item.citations.length
            ? "[" + item.citations.join(", ") + "]"
            : "[CLAIM #" + (item.claim_id || idx + 1) + "]";

        window.__LIVE_REF_MAP[key] = {
          id:
            "REF " +
            citeTag +
            " · " +
            String(item.matching_status || "EXTRACTED").toUpperCase(),
          title: item.source_title || "Extracted Claim #" + (item.claim_id || idx + 1),
          desc: "“" + (item.claim || "No claim text") + "”",
          status: item.reason || "Extracted from uploaded document"
        };

        const strongEl = card.querySelector("strong");
        const spanEl = card.querySelector("span");
        if (strongEl) {
          strongEl.textContent =
            citeTag + " " + String(item.source_title || "Claim #" + (idx + 1)).slice(0, 42);
        }
        if (spanEl) {
          spanEl.textContent = String(item.claim || "").slice(0, 90) + "...";
        }
      });

      // 3. Step 3: Retrieve Source Metadata
      setText(
        "retMatchBadge",
        primary.matching_status === "matched"
          ? "Primary Source Located"
          : "Bibliography Audit Complete"
      );
      if (primary.source_title) {
        setText("retPaperTitle", primary.source_title);
      }
      setText("retAuthor", filename);
      setText("retYear", String(report.report_generated || "2026").slice(0, 4));
      setText("retYearBadge", (summary.total_claims || 0) + " CLAIMS");
      setText(
        "retPageSec",
        "Claims: " +
          (summary.total_claims || 0) +
          " · Citations: " +
          (summary.total_citations || 0) +
          " · Matched: " +
          (summary.matched_claims || 0)
      );

      const retDoiLink = $("retDoiLink");
      if (retDoiLink) {
        if (primary.source_doi) {
          const doiUrl = String(primary.source_doi).startsWith("http")
            ? primary.source_doi
            : "https://doi.org/" + primary.source_doi;
          retDoiLink.textContent = doiUrl + " ↗";
          retDoiLink.setAttribute("href", doiUrl);
        } else {
          retDoiLink.textContent = "Source audited from " + filename;
          retDoiLink.removeAttribute("href");
        }
      }

      window.__LIVE_SOURCE_CATALOG = {
        smith2021: {
          badge:
            primary.matching_status === "matched"
              ? "Primary Source Located"
              : "Claim #1 Audited",
          title: primary.source_title || filename,
          author: filename,
          year: String(report.report_generated || "2026").slice(0, 4),
          pageSec: "Claim #1 · Confidence " + (primary.confidence || 50) + "%",
          doiText: primary.source_doi
            ? "https://doi.org/" + primary.source_doi + " ↗"
            : "Extracted from " + filename,
          doiHref: primary.source_doi ? "https://doi.org/" + primary.source_doi : "#retrieve"
        },
        lin2023: {
          badge:
            secondary.matching_status === "matched"
              ? "Secondary Source Located"
              : "Claim #2 Audited",
          title: secondary.source_title || filename,
          author: filename,
          year: String(report.report_generated || "2026").slice(0, 4),
          pageSec: "Claim #2 · Confidence " + (secondary.confidence || 50) + "%",
          doiText: secondary.source_doi
            ? "https://doi.org/" + secondary.source_doi + " ↗"
            : "Extracted from " + filename,
          doiHref: secondary.source_doi ? "https://doi.org/" + secondary.source_doi : "#retrieve"
        }
      };

      // 4. Step 4: Compare Claim vs Source Panes
      const cmpClaimPane = $("cmpClaimPane");
      const cmpSourcePane = $("cmpSourcePane");
      if (cmpClaimPane && primary.claim) {
        const claimP = cmpClaimPane.querySelector("p");
        if (claimP) claimP.textContent = "“" + primary.claim + "”";
      }
      if (cmpSourcePane) {
        const srcP = cmpSourcePane.querySelector("p");
        if (srcP) {
          srcP.textContent =
            primary.evidence || primary.reason || "Verified against uploaded document.";
        }
      }

      // 5. Step 5: Structured Report Cases & Fields
      function buildCaseObj(item) {
        const stLabel = formatStatus(item.verification_status);
        const conf = Math.max(0, Math.min(100, Number(item.confidence || 50)));
        const citeStr =
          item.citations && item.citations.length
            ? "[" + item.citations.join(", ") + "] "
            : "";
        const doiLink = item.source_doi
          ? String(item.source_doi).startsWith("http")
            ? item.source_doi
            : "https://doi.org/" + item.source_doi
          : "#report";

        return {
          prismVerdict: stLabel,
          claim: "“" + (item.claim || "No claim text extracted.") + "”",
          citation: citeStr + (item.source_title || "Unmatched Reference"),
          pub:
            "Matched Claims: " +
            (summary.matched_claims || 0) +
            "/" +
            (summary.total_claims || 0) +
            " · Citations: " +
            (summary.total_citations || 0),
          evidence: item.evidence || item.reason || "No source passage available.",
          verdictPill: stLabel,
          verdictShort: item.reason || stLabel,
          confScore: conf + "% CALIBRATED",
          confWidth: conf + "%",
          confNote:
            "Verification report for " +
            filename +
            " (" +
            (report.report_generated || "now") +
            ").",
          loc:
            "Claim #" +
            (item.claim_id || 1) +
            " · " +
            String(item.matching_status || "").toUpperCase(),
          traceText: item.source_doi
            ? "Inspect DOI: " + item.source_doi + " ↗"
            : "No DOI linked in bibliography",
          traceHref: doiLink
        };
      }

      window.__LIVE_REPORT_CASES = {
        c1: buildCaseObj(primary),
        c2: buildCaseObj(secondary)
      };

      const c1 = window.__LIVE_REPORT_CASES.c1;
      setText("repPrismVerdict", c1.prismVerdict);
      setText("repFieldClaim", c1.claim);
      setText("repFieldCitation", c1.citation);
      setText("repFieldPub", c1.pub);
      setHtml("repFieldEvidence", c1.evidence);
      setText("repFieldVerdictPill", c1.verdictPill);
      setText("repFieldVerdictShort", c1.verdictShort);
      setText("repFieldConfScore", c1.confScore);
      if ($("repFieldConfFill")) $("repFieldConfFill").style.width = c1.confWidth;
      setText("repFieldConfNote", c1.confNote);
      setText("repFieldLoc", c1.loc);

      const traceLink = $("repFieldTraceLink");
      if (traceLink) {
        traceLink.textContent = c1.traceText;
        traceLink.setAttribute("href", c1.traceHref);
      }

      // 6. Live Demo Walkthrough Stages
      window.__LIVE_DEMO_STAGES = {
        ingest: {
          badge: "STAGE 01 / INPUT & PARSE",
          status: "DOCUMENT PARSED",
          title: "Parsed: " + filename,
          desc:
            "Extracted " +
            (summary.total_claims || 0) +
            " claims and " +
            (summary.total_citations || 0) +
            " inline citations.",
          log:
            "• Source: " +
            filename +
            " · References found: " +
            (summary.total_references || 0)
        },
        extract: {
          badge: "STAGE 02 / EXTRACTED CLAIMS",
          status: (summary.total_claims || 0) + " CLAIMS FOUND",
          title: "Extracted Claims & Matched Citations",
          desc: primary.claim || "No claims detected in text.",
          log:
            "• Matching: " +
            (summary.matched_claims || 0) +
            " matched, " +
            (summary.unmatched_claims || 0) +
            " unmatched."
        },
        compare: {
          badge: "STAGE 03 / EVIDENCE & FLAGS",
          status: formatStatus(primary.verification_status),
          title: "Evidence Comparison Result",
          desc: primary.reason || "Verification complete.",
          log: "• Evidence: " + (primary.evidence || "N/A")
        },
        history: {
          badge: "STAGE 04 / REVIEW REPORT",
          status: "REPORT READY",
          title: "Summary Breakdown (" + (summary.total_claims || 0) + " Claims)",
          desc:
            "Supported: " +
            (summary.supported_claims || 0) +
            " · Partly Supported: " +
            (summary.partially_supported_claims || 0) +
            " · Unsupported: " +
            (summary.unsupported_claims || 0) +
            " · Insufficient Evidence: " +
            (summary.insufficient_evidence_claims || 0),
          log:
            "• Report generated at " + (report.report_generated || "just now")
        }
      };

      setText("dtInspBadge", window.__LIVE_DEMO_STAGES.ingest.badge);
      setText("dtInspStatus", window.__LIVE_DEMO_STAGES.ingest.status);
      setText("dtInspTitle", window.__LIVE_DEMO_STAGES.ingest.title);
      setText("dtInspDesc", window.__LIVE_DEMO_STAGES.ingest.desc);
      setText("dtInspLog", window.__LIVE_DEMO_STAGES.ingest.log);
    }

    /**
     * Send uploaded file or pasted text to the FastAPI backend, with graceful
     * fallback if the backend server is not running.
     * @param {File|null} fileObj
     * @param {string} rawText
     */
    async function runLiveBackendVerification(fileObj, rawText) {
      const formData = new FormData();
      const labelName = fileObj ? fileObj.name : "Pasted Manuscript Text";

      if (fileObj) {
        formData.append("file", fileObj);
      } else if (rawText && rawText.trim()) {
        formData.append("text", rawText.trim());
      } else {
        return;
      }

      setText("readyChip", "Verifying with Backend...");
      setText("docBadge", "Analyzing claims & citations...");

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(function () {
          controller.abort();
        }, 25000);

        const res = await fetch(API_BASE_URL + "/api/verify", {
          method: "POST",
          body: formData,
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          const errData = await res.json().catch(function () {
            return {};
          });
          throw new Error(errData.detail || "Backend returned status " + res.status);
        }

        const payload = await res.json();
        applyBackendReportToSlides(
          payload.filename || labelName,
          payload.report
        );
        scrollToUpSlide(2);
      } catch (err) {
        console.warn("Backend unavailable, using local preview report:", err);
        const fallbackReport = buildLocalFallbackReport(
          labelName,
          rawText || (manuscriptArea ? manuscriptArea.value : "")
        );
        applyBackendReportToSlides(labelName, fallbackReport);
        setText("readyChip", "Local preview (start port 8000 for full audit)");
        scrollToUpSlide(2);
      }
    }

    function syncIngestionSummary(docLabel, modeLabel) {
      const text = manuscriptArea ? manuscriptArea.value.trim() : "";
      const words = text ? text.split(/\s+/).filter(Boolean).length : 0;
      const chars = text.length;

      setText("wordCountChip", words + " words · " + chars + " chars");
      if (docLabel) {
        setText("selectedFileName", docLabel);
        setText("docBadge", docLabel + " · Ready");
        setText("summaryDocName", docLabel);
      }
      if (modeLabel) {
        setText("summaryMode", modeLabel);
      }
      setText(
        "summarySnippet",
        text || "No text pasted yet. Click Load Sample Paper or drop a file."
      );
      setText(
        "readyChip",
        words > 0 ? "Staged (" + words + " words)" : "Waiting for input"
      );
    }

    function loadSamplePaper() {
      uploadedFileObj = null;
      if (manuscriptArea) {
        manuscriptArea.value = SAMPLE_PAPER_TEXT;
      }
      syncIngestionSummary("sample-learning-study.pdf", "1-Click Sample Paper");
      runLiveBackendVerification(null, SAMPLE_PAPER_TEXT);
    }

    function scrollToUpSlide(slideIdx) {
      const scrollable = Math.max(uploadSec.offsetHeight - window.innerHeight, 1);
      const targetProgress = slideIdx / 2;
      const y = uploadSec.offsetTop + targetProgress * scrollable;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    function animateUploadZTunnel() {
      if (window.innerWidth <= 650 || reduceMotion) {
        if (upHead) {
          upHead.style.opacity = 1;
          upHead.style.transform = "none";
        }
        return;
      }

      const rect = uploadSec.getBoundingClientRect();
      const total = Math.max(uploadSec.offsetHeight - window.innerHeight, 1);
      const p = Math.min(1, Math.max(0, -rect.top / total));

      const headTrigger = Math.min(1, Math.max(0, p / 0.16));
      if (upHead) {
        upHead.style.opacity = headTrigger;
        upHead.style.transform =
          "translate3d(0," + (1 - headTrigger) * 28 + "px,0)";
      }

      const slidePos = p * 2;
      const activeIdx = Math.min(2, Math.max(0, Math.round(slidePos)));

      upSlides.forEach(function (slide, idx) {
        const delta = idx - slidePos;
        const absDelta = Math.abs(delta);

        const tz = delta < 0 ? Math.abs(delta) * 280 : -delta * 420;
        const ty = delta * -28;
        const rx = delta * 14;
        const scale = Math.max(0.72, 1 - absDelta * 0.16);
        const opacity = Math.max(0, 1 - absDelta * 0.85);

        slide.style.opacity = opacity;
        slide.style.pointerEvents = absDelta < 0.45 ? "auto" : "none";
        slide.style.zIndex = String(20 - Math.round(absDelta * 8));
        slide.style.transform =
          "perspective(1700px) " +
          "translate3d(0, " +
          ty +
          "px, " +
          tz +
          "px) " +
          "rotateX(" +
          rx +
          "deg) " +
          "scale(" +
          scale +
          ")";
      });

      upTabs.forEach(function (tab, idx) {
        tab.classList.toggle("active", idx === activeIdx);
      });

      if (upProgressBar) upProgressBar.style.width = p * 100 + "%";
      if (upSlideCounter) upSlideCounter.textContent = "SLIDE 0" + (activeIdx + 1) + " / 03";
      if (upScrollHint) {
        upScrollHint.textContent =
          activeIdx < 2
            ? "SCROLL FOR 3D Z-WARP SLIDES ↓"
            : "DOCUMENT READY FOR EXTRACTION ↓";
      }
    }

    if ($("loadSampleBtn")) {
      $("loadSampleBtn").addEventListener("click", function (e) {
        e.preventDefault();
        loadSamplePaper();
      });
    }

    if ($("loadSampleBtn2")) {
      $("loadSampleBtn2").addEventListener("click", function (e) {
        e.preventDefault();
        loadSamplePaper();
      });
    }

    if ($("toSlide2Btn")) {
      $("toSlide2Btn").addEventListener("click", function (e) {
        e.preventDefault();
        scrollToUpSlide(1);
      });
    }

    if ($("toSlide3Btn")) {
      $("toSlide3Btn").addEventListener("click", function (e) {
        e.preventDefault();
        const docName =
          ($("selectedFileName") && $("selectedFileName").textContent) ||
          "manuscript.pdf";
        const textVal = manuscriptArea ? manuscriptArea.value.trim() : "";
        syncIngestionSummary(
          docName,
          uploadedFileObj ? "Uploaded File" : "Pasted Manuscript Text"
        );
        scrollToUpSlide(2);
        runLiveBackendVerification(uploadedFileObj, textVal);
      });
    }

    if ($("backSlide1Btn")) {
      $("backSlide1Btn").addEventListener("click", function (e) {
        e.preventDefault();
        scrollToUpSlide(0);
      });
    }

    upTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        scrollToUpSlide(Number(tab.getAttribute("data-up-slide")));
      });
    });

    if (manuscriptArea) {
      manuscriptArea.addEventListener("input", function () {
        uploadedFileObj = null;
        syncIngestionSummary(
          ($("selectedFileName") && $("selectedFileName").textContent) ||
            "manuscript.pdf",
          "Pasted Manuscript Text"
        );
      });
    }

    if (paperInput) {
      paperInput.addEventListener("change", function (e) {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        uploadedFileObj = file;
        syncIngestionSummary(file.name, "Uploaded File");

        if (/\.txt|\.md$/i.test(file.name)) {
          const reader = new FileReader();
          reader.onload = function () {
            if (manuscriptArea) {
              manuscriptArea.value = String(reader.result || "").slice(0, 2000);
            }
            syncIngestionSummary(file.name, "Uploaded Text File");
          };
          reader.readAsText(file);
        }

        paperInput.value = "";
        runLiveBackendVerification(file, "");
      });
    }

    if (dropZone) {
      ["dragenter", "dragover"].forEach(function (evtName) {
        dropZone.addEventListener(evtName, function (e) {
          e.preventDefault();
          dropZone.classList.add("dragover");
        });
      });

      ["dragleave", "drop"].forEach(function (evtName) {
        dropZone.addEventListener(evtName, function (e) {
          e.preventDefault();
          dropZone.classList.remove("dragover");
        });
      });

      dropZone.addEventListener("drop", function (e) {
        const files = e.dataTransfer && e.dataTransfer.files;
        if (!files || !files.length) return;
        const file = files[0];
        uploadedFileObj = file;
        syncIngestionSummary(file.name, "Dropped File");
        runLiveBackendVerification(file, "");
      });
    }

    window.addEventListener("scroll", animateUploadZTunnel, { passive: true });
    window.addEventListener("resize", animateUploadZTunnel);

    syncIngestionSummary("manuscript.pdf", "Awaiting Upload or Sample");
    animateUploadZTunnel();
  }

  /* =======================================================================
     4TH PAGE — STEP 2: 3D HINGE-FOLD SLIDES
     ======================================================================= */
  const extractSec = $("extract");
  if (extractSec) {
    const exHead = $("exHead");
    const ex3DTag = $("ex3DTag");
    const exSlides = extractSec.querySelectorAll(".ex-3d-slide");
    const exTabs = extractSec.querySelectorAll(".ex-tab");
    const exProgressBar = $("exProgressBar");
    const exSlideCounter = $("exSlideCounter");
    const exScrollHint = $("exScrollHint");
    const exRefCard = $("exRefCard");

    const REF_MAP = {
      "3": {
        id: "REF [3] · MATCHED TO 30% CLAIM",
        title: "Smith, J., & Patel, R. (2021)",
        desc: "Classroom Mobile Learning Pilot & Assessment Outcomes, Journal of Educational Practice, Vol. 18, pp. 41–56.",
        status: "Ready for Source Retrieval"
      },
      "1": {
        id: "REF [1] · MATCHED TO RECALL CLAIM",
        title: "Lin, H., & Gomez, M. (2023)",
        desc: "Spaced Retrieval Schedules in Introductory Biology Labs, Quarterly Review of STEM Pedagogy, pp. 112–128.",
        status: "Ready for Source Retrieval"
      },
      ay: {
        id: "REF (SMITH, 2021) · AUTHOR-YEAR LINKED",
        title: "Smith, J. (2021)",
        desc: "Matched by author surname and publication year against bibliography entry #3.",
        status: "Author-Year Citation Resolved"
      }
    };

    document.querySelectorAll(".ex-token-card").forEach(function (card) {
      card.addEventListener("click", function () {
        document.querySelectorAll(".ex-token-card").forEach(function (c) {
          c.classList.remove("active-token");
        });
        card.classList.add("active-token");

        const key = card.getAttribute("data-ref");
        const activeRefMap = window.__LIVE_REF_MAP || REF_MAP;
        const ref = activeRefMap[key];
        if (ref && exRefCard) {
          exRefCard.innerHTML =
            '<div class="ex-ref-id">' +
            ref.id +
            "</div>" +
            "<h4>" +
            ref.title +
            "</h4>" +
            "<p><em>" +
            ref.desc +
            "</em></p>" +
            '<span class="ex-ref-status">' +
            ref.status +
            "</span>";
        }
      });
    });

    function scrollToExSlide(slideIdx) {
      const scrollable = Math.max(extractSec.offsetHeight - window.innerHeight, 1);
      const targetProgress = slideIdx / 2;
      const y = extractSec.offsetTop + targetProgress * scrollable;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    function animateExtractHingeFold() {
      if (window.innerWidth <= 650 || reduceMotion) {
        if (exHead) {
          exHead.style.opacity = 1;
          exHead.style.transform = "none";
        }
        return;
      }

      const rect = extractSec.getBoundingClientRect();
      const total = Math.max(extractSec.offsetHeight - window.innerHeight, 1);
      const p = Math.min(1, Math.max(0, -rect.top / total));

      const headTrigger = Math.min(1, Math.max(0, p / 0.16));
      if (exHead) {
        exHead.style.opacity = headTrigger;
        exHead.style.transform =
          "translate3d(0," +
          (1 - headTrigger) * 32 +
          "px," +
          (1 - headTrigger) * -40 +
          "px) " +
          "rotateX(" +
          (1 - headTrigger) * 8 +
          "deg)";
      }

      if (ex3DTag) {
        ex3DTag.style.transform =
          "translate3d(" +
          -p * 42 +
          "px," +
          p * 18 +
          "px,0) " +
          "rotateY(" +
          (-10 + p * 45) +
          "deg)";
      }

      const slidePos = p * 2;
      const activeIdx = Math.min(2, Math.max(0, Math.round(slidePos)));

      exSlides.forEach(function (slide, idx) {
        const diff = idx - slidePos;
        const absDiff = Math.abs(diff);

        const hingeAngle = diff < 0 ? diff * 78 : diff * 22;
        const tz = diff < 0 ? 40 : -absDiff * 110;
        const scale = Math.max(0.86, 1 - absDiff * 0.08);
        const opacity = diff < -0.95 ? 0 : Math.max(0, 1 - absDiff * 0.85);

        slide.style.opacity = opacity;
        slide.style.pointerEvents = absDiff < 0.45 ? "auto" : "none";
        slide.style.zIndex = String(30 - Math.round(absDiff * 10));
        slide.style.transform =
          "perspective(1750px) " +
          "translate3d(0, 0, " +
          tz +
          "px) " +
          "rotateY(" +
          hingeAngle +
          "deg) " +
          "scale(" +
          scale +
          ")";
      });

      exTabs.forEach(function (tab, idx) {
        tab.classList.toggle("active", idx === activeIdx);
      });

      if (exProgressBar) exProgressBar.style.width = p * 100 + "%";
      if (exSlideCounter) exSlideCounter.textContent = "SLIDE 0" + (activeIdx + 1) + " / 03";
      if (exScrollHint) {
        exScrollHint.textContent =
          activeIdx < 2 ? "SCROLL FOR 3D HINGE-FOLD SLIDES ↓" : "CLAIMS & CITATIONS EXTRACTED ↓";
      }
    }

    exTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        scrollToExSlide(Number(tab.getAttribute("data-ex-slide")));
      });
    });

    if ($("exToSlide2Btn")) {
      $("exToSlide2Btn").addEventListener("click", function () {
        scrollToExSlide(1);
      });
    }

    if ($("exToSlide3Btn")) {
      $("exToSlide3Btn").addEventListener("click", function () {
        scrollToExSlide(2);
      });
    }

    if ($("exBackSlide1Btn")) {
      $("exBackSlide1Btn").addEventListener("click", function () {
        scrollToExSlide(0);
      });
    }

    if ($("exBackSlide2Btn")) {
      $("exBackSlide2Btn").addEventListener("click", function () {
        scrollToExSlide(1);
      });
    }

    window.addEventListener("scroll", animateExtractHingeFold, { passive: true });
    window.addEventListener("resize", animateExtractHingeFold);

    animateExtractHingeFold();
  }

  /* =======================================================================
     5TH PAGE — STEP 3: 3D DIAGONAL GYRO-ORBIT SLIDES
     ======================================================================= */
  const retrieveSec = $("retrieve");
  if (retrieveSec) {
    const retHead = $("retHead");
    const retGyroBadge = $("retGyroBadge");
    const retSlides = retrieveSec.querySelectorAll(".ret-3d-slide");
    const retTabs = retrieveSec.querySelectorAll(".ret-tab");
    const retProgressBar = $("retProgressBar");
    const retSlideCounter = $("retSlideCounter");
    const retScrollHint = $("retScrollHint");

    const SOURCE_CATALOG = {
      smith2021: {
        badge: "Primary Source Located",
        title: "Classroom Mobile Learning Pilot & Assessment Outcomes",
        author: "Smith, J., & Patel, R.",
        year: "2021",
        pageSec: "Page 4 · Section 2.1 (pp. 41–56)",
        doiText: "https://doi.org/10.1080/edup.2021.0419 ↗",
        doiHref: "https://doi.org/10.1080/edup.2021.0419"
      },
      lin2023: {
        badge: "Primary Source Located",
        title: "Spaced Retrieval Schedules in Introductory Biology Labs",
        author: "Lin, H., & Gomez, M.",
        year: "2023",
        pageSec: "Page 115 · Section 3.2 (pp. 112–128)",
        doiText: "https://doi.org/10.1016/j.stemped.2023.08.004 ↗",
        doiHref: "https://doi.org/10.1016/j.stemped.2023.08.004"
      }
    };

    document.querySelectorAll(".ret-pick-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".ret-pick-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");

        const key = btn.getAttribute("data-source");
        const activeCatalog = window.__LIVE_SOURCE_CATALOG || SOURCE_CATALOG;
        const item = activeCatalog[key];
        if (!item) return;

        setText("retMatchBadge", item.badge);
        setText("retPaperTitle", item.title);
        setText("retAuthor", item.author);
        setText("retYear", item.year);
        setText("retYearBadge", item.year);
        setText("retPageSec", item.pageSec);

        const doiEl = $("retDoiLink");
        if (doiEl) {
          doiEl.textContent = item.doiText;
          if (item.doiHref) {
            doiEl.setAttribute("href", item.doiHref);
          }
        }
      });
    });

    function scrollToRetSlide(slideIdx) {
      const scrollable = Math.max(retrieveSec.offsetHeight - window.innerHeight, 1);
      const targetProgress = slideIdx / 2;
      const y = retrieveSec.offsetTop + targetProgress * scrollable;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    function animateRetrieveGyroOrbit() {
      if (window.innerWidth <= 650 || reduceMotion) {
        if (retHead) {
          retHead.style.opacity = 1;
          retHead.style.transform = "none";
        }
        return;
      }

      const rect = retrieveSec.getBoundingClientRect();
      const total = Math.max(retrieveSec.offsetHeight - window.innerHeight, 1);
      const p = Math.min(1, Math.max(0, -rect.top / total));

      const headTrigger = Math.min(1, Math.max(0, p / 0.16));
      if (retHead) {
        retHead.style.opacity = headTrigger;
        retHead.style.transform =
          "translate3d(0," +
          (1 - headTrigger) * 34 +
          "px," +
          (1 - headTrigger) * -50 +
          "px) " +
          "rotateX(" +
          (1 - headTrigger) * 10 +
          "deg)";
      }

      if (retGyroBadge) {
        retGyroBadge.style.transform =
          "translate3d(" +
          -p * 55 +
          "px," +
          p * 24 +
          "px,0) " +
          "rotateZ(" +
          p * 32 +
          "deg) rotateY(" +
          (-18 + p * 50) +
          "deg)";
      }

      const slidePos = p * 2;
      const activeIdx = Math.min(2, Math.max(0, Math.round(slidePos)));

      retSlides.forEach(function (slide, idx) {
        const diff = idx - slidePos;
        const absDiff = Math.abs(diff);

        const tx = diff * 52;
        const ty = diff * -34;
        const tz = -absDiff * 290;
        const rx = diff * -18;
        const ry = diff * 28;
        const rz = diff * -5;
        const scale = Math.max(0.76, 1 - absDiff * 0.15);
        const opacity = Math.max(0, 1 - absDiff * 0.78);

        slide.style.opacity = opacity;
        slide.style.pointerEvents = absDiff < 0.45 ? "auto" : "none";
        slide.style.zIndex = String(25 - Math.round(absDiff * 8));
        slide.style.transform =
          "perspective(1850px) " +
          "translate3d(" +
          tx +
          "%, " +
          ty +
          "px, " +
          tz +
          "px) " +
          "rotateX(" +
          rx +
          "deg) " +
          "rotateY(" +
          ry +
          "deg) " +
          "rotateZ(" +
          rz +
          "deg) " +
          "scale(" +
          scale +
          ")";
      });

      retTabs.forEach(function (tab, idx) {
        tab.classList.toggle("active", idx === activeIdx);
      });

      if (retProgressBar) retProgressBar.style.width = p * 100 + "%";
      if (retSlideCounter) retSlideCounter.textContent = "SLIDE 0" + (activeIdx + 1) + " / 03";
      if (retScrollHint) {
        retScrollHint.textContent =
          activeIdx < 2 ? "SCROLL FOR 3D GYRO-ORBIT SLIDES ↓" : "PRIMARY SOURCES RETRIEVED ↓";
      }
    }

    retTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        scrollToRetSlide(Number(tab.getAttribute("data-ret-slide")));
      });
    });

    if ($("retToSlide2Btn")) {
      $("retToSlide2Btn").addEventListener("click", function () {
        scrollToRetSlide(1);
      });
    }

    if ($("retToSlide3Btn")) {
      $("retToSlide3Btn").addEventListener("click", function () {
        scrollToRetSlide(2);
      });
    }

    if ($("retBackSlide1Btn")) {
      $("retBackSlide1Btn").addEventListener("click", function () {
        scrollToRetSlide(0);
      });
    }

    if ($("retBackSlide2Btn")) {
      $("retBackSlide2Btn").addEventListener("click", function () {
        scrollToRetSlide(1);
      });
    }

    window.addEventListener("scroll", animateRetrieveGyroOrbit, { passive: true });
    window.addEventListener("resize", animateRetrieveGyroOrbit);

    animateRetrieveGyroOrbit();
  }

  /* =======================================================================
     6TH PAGE — STEP 4: 3D GUILLOTINE COUNTER-SHEAR SLIDES
     ======================================================================= */
  const compareSec = $("compare");
  if (compareSec) {
    const cmpHead = $("cmpHead");
    const cmpDialBadge = $("cmpDialBadge");
    const cmpShearRail = $("cmpShearRail");
    const cmpSlides = compareSec.querySelectorAll(".cmp-3d-slide");
    const cmpTabs = compareSec.querySelectorAll(".cmp-tab");
    const cmpProgressBar = $("cmpProgressBar");
    const cmpSlideCounter = $("cmpSlideCounter");
    const cmpScrollHint = $("cmpScrollHint");
    const cmpClaimPane = $("cmpClaimPane");
    const cmpSourcePane = $("cmpSourcePane");

    function scrollToCmpSlide(slideIdx) {
      const scrollable = Math.max(compareSec.offsetHeight - window.innerHeight, 1);
      const targetProgress = slideIdx / 2;
      const y = compareSec.offsetTop + targetProgress * scrollable;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    function animateCompareCounterShear() {
      if (window.innerWidth <= 650 || reduceMotion) {
        if (cmpHead) {
          cmpHead.style.opacity = 1;
          cmpHead.style.transform = "none";
        }
        return;
      }

      const rect = compareSec.getBoundingClientRect();
      const total = Math.max(compareSec.offsetHeight - window.innerHeight, 1);
      const p = Math.min(1, Math.max(0, -rect.top / total));

      const headTrigger = Math.min(1, Math.max(0, p / 0.16));
      if (cmpHead) {
        cmpHead.style.opacity = headTrigger;
        cmpHead.style.transform =
          "translate3d(" +
          (1 - headTrigger) * -28 +
          "px," +
          (1 - headTrigger) * 32 +
          "px,0) " +
          "rotateX(" +
          (1 - headTrigger) * 10 +
          "deg)";
      }

      if (cmpDialBadge) {
        const rock = Math.cos(p * Math.PI * 2) * 16;
        cmpDialBadge.style.transform =
          "translate3d(" +
          -p * 44 +
          "px," +
          p * 20 +
          "px,0) " +
          "rotateZ(" +
          rock +
          "deg) rotateX(" +
          (14 - p * 28) +
          "deg)";
      }

      if (cmpShearRail) {
        cmpShearRail.style.transform =
          "translate3d(" + (p - 0.5) * 90 + "px, " + (p - 0.5) * -60 + "px, 0)";
      }

      const slidePos = p * 2;
      const activeIdx = Math.min(2, Math.max(0, Math.round(slidePos)));

      cmpSlides.forEach(function (slide, idx) {
        const diff = idx - slidePos;
        const absDiff = Math.abs(diff);

        const ty = diff < 0 ? diff * 140 : diff * 95;
        const tz = -absDiff * 260;
        const rx = diff * -22;
        const rz = diff * 6;
        const scale = Math.max(0.78, 1 - absDiff * 0.14);
        const opacity = Math.max(0, 1 - absDiff * 0.82);

        slide.style.opacity = opacity;
        slide.style.pointerEvents = absDiff < 0.45 ? "auto" : "none";
        slide.style.zIndex = String(28 - Math.round(absDiff * 9));
        slide.style.transform =
          "perspective(2050px) " +
          "translate3d(0, " +
          ty +
          "px, " +
          tz +
          "px) " +
          "rotateX(" +
          rx +
          "deg) " +
          "rotateZ(" +
          rz +
          "deg) " +
          "scale(" +
          scale +
          ")";
      });

      if (cmpClaimPane && cmpSourcePane) {
        const shearWave = Math.sin(p * Math.PI);
        cmpClaimPane.style.transform =
          "perspective(1300px) " +
          "translate3d(" +
          -shearWave * 14 +
          "px, " +
          -shearWave * 8 +
          "px, " +
          shearWave * 18 +
          "px) " +
          "rotateY(" +
          shearWave * 11 +
          "deg) rotateZ(" +
          -shearWave * 1.4 +
          "deg)";

        cmpSourcePane.style.transform =
          "perspective(1300px) " +
          "translate3d(" +
          shearWave * 14 +
          "px, " +
          shearWave * 8 +
          "px, " +
          shearWave * 18 +
          "px) " +
          "rotateY(" +
          -shearWave * 11 +
          "deg) rotateZ(" +
          shearWave * 1.4 +
          "deg)";
      }

      cmpTabs.forEach(function (tab, idx) {
        tab.classList.toggle("active", idx === activeIdx);
      });

      if (cmpProgressBar) cmpProgressBar.style.width = p * 100 + "%";
      if (cmpSlideCounter) cmpSlideCounter.textContent = "SLIDE 0" + (activeIdx + 1) + " / 03";
      if (cmpScrollHint) {
        cmpScrollHint.textContent =
          activeIdx < 2 ? "SCROLL FOR 3D COUNTER-SHEAR SLIDES ↓" : "EVIDENCE & SCOPE AUDIT COMPLETE ↓";
      }
    }

    cmpTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        scrollToCmpSlide(Number(tab.getAttribute("data-cmp-slide")));
      });
    });

    if ($("cmpToSlide2Btn")) {
      $("cmpToSlide2Btn").addEventListener("click", function () {
        scrollToCmpSlide(1);
      });
    }

    if ($("cmpToSlide3Btn")) {
      $("cmpToSlide3Btn").addEventListener("click", function () {
        scrollToCmpSlide(2);
      });
    }

    if ($("cmpBackSlide1Btn")) {
      $("cmpBackSlide1Btn").addEventListener("click", function () {
        scrollToCmpSlide(0);
      });
    }

    if ($("cmpBackSlide2Btn")) {
      $("cmpBackSlide2Btn").addEventListener("click", function () {
        scrollToCmpSlide(1);
      });
    }

    window.addEventListener("scroll", animateCompareCounterShear, { passive: true });
    window.addEventListener("resize", animateCompareCounterShear);

    animateCompareCounterShear();
  }

  /* =======================================================================
     7TH PAGE — STEP 5: GSAP + SCROLLTRIGGER 3D HYPER-PRISM REPORT SLIDES
     ======================================================================= */
  const reportSec = $("report");
  if (reportSec) {
    const repHead = $("repHead");
    const rep3DPrism = $("rep3DPrism");
    const repPrismWire = $("repPrismWire");
    const repSlides = reportSec.querySelectorAll(".rep-3d-slide");
    const repFieldBoxes = reportSec.querySelectorAll(".rep-field-box");
    const repTabs = reportSec.querySelectorAll(".rep-tab");
    const repProgressBar = $("repProgressBar");
    const repSlideCounter = $("repSlideCounter");
    const repScrollHint = $("repScrollHint");

    const REPORT_CASES = {
      c1: {
        prismVerdict: "PARTLY SUPPORTED",
        claim: "“A particular study found that a learning app improved test scores by 30% [3].”",
        citation: "[3] Smith, J., & Patel, R. (2021)",
        pub: "Journal of Educational Practice · Vol. 18, pp. 41–56 (Sec. 2.1)",
        evidence:
          "Source reports score gains in a <u>small pilot group</u>, with <u>no 30% increase</u> observed; limited sample size and pilot scope.",
        verdictPill: "PARTLY SUPPORTED",
        verdictShort: "Partly Supported — Direction matches, 30% figure unverified.",
        confScore: "68% CALIBRATED",
        confWidth: "68%",
        confNote: "Evidence strength & uncertainty indicator—not a guarantee.",
        loc: "Page 4 · Section 2.1 · Paragraph 2",
        traceText: "Inspect DOI: 10.1080/edup.2021.0419 ↗",
        traceHref: "https://doi.org/10.1080/edup.2021.0419"
      },
      c2: {
        prismVerdict: "SUPPORTED · PILOT SCOPE",
        claim:
          "“Structured retrieval practice over eight weeks improved delayed recall in introductory biology [1].”",
        citation: "[1] Lin, H., & Gomez, M. (2023)",
        pub: "Quarterly Review of STEM Pedagogy · pp. 112–128 (Sec. 3.2)",
        evidence:
          "Passage confirms delayed-recall gains over an <u>8-week lab schedule</u> in introductory biology students.",
        verdictPill: "SUPPORTED",
        verdictShort: "Supported — Matches 8-week recall finding within study scope.",
        confScore: "82% CALIBRATED",
        confWidth: "82%",
        confNote: "Strong passage alignment; reviewer should verify lab cohort details.",
        loc: "Page 115 · Section 3.2 · Table 2",
        traceText: "Inspect DOI: 10.1016/j.stemped.2023.08.004 ↗",
        traceHref: "https://doi.org/10.1016/j.stemped.2023.08.004"
      }
    };

    function applyReportCase(caseKey) {
      const sourceMap = window.__LIVE_REPORT_CASES || REPORT_CASES;
      const data = sourceMap[caseKey];
      if (!data) return;

      setText("repPrismVerdict", data.prismVerdict);
      setText("repFieldClaim", data.claim);
      setText("repFieldCitation", data.citation);
      setText("repFieldPub", data.pub);
      setHtml("repFieldEvidence", data.evidence);
      setText("repFieldVerdictPill", data.verdictPill);
      setText("repFieldVerdictShort", data.verdictShort);
      setText("repFieldConfScore", data.confScore);
      if ($("repFieldConfFill")) $("repFieldConfFill").style.width = data.confWidth;
      setText("repFieldConfNote", data.confNote);
      setText("repFieldLoc", data.loc);

      const traceEl = $("repFieldTraceLink");
      if (traceEl) {
        traceEl.textContent = data.traceText;
        traceEl.setAttribute("href", data.traceHref);
      }
    }

    document.querySelectorAll(".rep-case-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        document.querySelectorAll(".rep-case-btn").forEach(function (b) {
          b.classList.remove("active");
        });
        btn.classList.add("active");
        applyReportCase(btn.getAttribute("data-case"));
      });
    });

    function scrollToRepSlide(slideIdx) {
      const scrollable = Math.max(reportSec.offsetHeight - window.innerHeight, 1);
      const targetProgress = slideIdx / 2;
      const y = reportSec.offsetTop + targetProgress * scrollable;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    function updateReportFromProgress(p) {
      if (window.innerWidth <= 650 || reduceMotion) {
        if (repHead) {
          repHead.style.opacity = 1;
          repHead.style.transform = "none";
        }
        return;
      }

      const headTrigger = Math.min(1, Math.max(0, p / 0.16));
      if (repHead) {
        repHead.style.opacity = headTrigger;
        repHead.style.transform =
          "translate3d(0," +
          (1 - headTrigger) * 34 +
          "px," +
          (1 - headTrigger) * -50 +
          "px) " +
          "rotateX(" +
          (1 - headTrigger) * 10 +
          "deg)";
      }

      if (rep3DPrism) {
        rep3DPrism.style.transform =
          "translate3d(" +
          -p * 52 +
          "px," +
          p * 20 +
          "px,0) " +
          "rotateY(" +
          (-20 + p * 60) +
          "deg) rotateX(" +
          (16 - p * 32) +
          "deg)";
      }

      if (repPrismWire) {
        repPrismWire.style.transform =
          "translate3d(" +
          (0.5 - p) * 70 +
          "px," +
          (p - 0.5) * 50 +
          "px,0) " +
          "rotateZ(" +
          (p - 0.5) * 6 +
          "deg)";
      }

      const slidePos = p * 2;
      const activeIdx = Math.min(2, Math.max(0, Math.round(slidePos)));

      repSlides.forEach(function (slide, idx) {
        const diff = idx - slidePos;
        const absDiff = Math.abs(diff);

        const ry = diff * -34;
        const rx = absDiff * 14;
        const tz = -absDiff * 270;
        const tx = diff * 26;
        const scale = Math.max(0.78, 1 - absDiff * 0.14);
        const opacity = Math.max(0, 1 - absDiff * 0.82);

        slide.style.opacity = opacity;
        slide.style.pointerEvents = absDiff < 0.45 ? "auto" : "none";
        slide.style.zIndex = String(28 - Math.round(absDiff * 9));
        slide.style.transform =
          "perspective(2150px) " +
          "translate3d(" +
          tx +
          "%, 0, " +
          tz +
          "px) " +
          "rotateX(" +
          rx +
          "deg) " +
          "rotateY(" +
          ry +
          "deg) " +
          "scale(" +
          scale +
          ")";
      });

      if (repFieldBoxes.length) {
        const wave = Math.sin(p * Math.PI);
        repFieldBoxes.forEach(function (box, idx) {
          const offset = ((idx % 3) - 1) * wave * 7;
          const zLift = (idx % 2 === 0 ? 1 : -1) * wave * 10;
          box.style.transform =
            "perspective(1200px) translate3d(0," + offset + "px," + zLift + "px)";
        });
      }

      repTabs.forEach(function (tab, idx) {
        tab.classList.toggle("active", idx === activeIdx);
      });

      if (repProgressBar) repProgressBar.style.width = p * 100 + "%";
      if (repSlideCounter) repSlideCounter.textContent = "SLIDE 0" + (activeIdx + 1) + " / 03";
      if (repScrollHint) {
        repScrollHint.textContent =
          activeIdx < 2
            ? "SCROLL FOR 3D HYPER-PRISM REPORT SLIDES ↓"
            : "STRUCTURED VERIFICATION REPORT READY ↓";
      }
    }

    function animateReportFallback() {
      const rect = reportSec.getBoundingClientRect();
      const total = Math.max(reportSec.offsetHeight - window.innerHeight, 1);
      const p = Math.min(1, Math.max(0, -rect.top / total));
      updateReportFromProgress(p);
    }

    if (window.gsap && window.ScrollTrigger && !reduceMotion) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.ScrollTrigger.create({
        trigger: reportSec,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: function (self) {
          updateReportFromProgress(self.progress);
        }
      });
    } else {
      window.addEventListener("scroll", animateReportFallback, { passive: true });
    }

    window.addEventListener("resize", animateReportFallback);

    repTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        scrollToRepSlide(Number(tab.getAttribute("data-rep-slide")));
      });
    });

    if ($("repToSlide2Btn")) {
      $("repToSlide2Btn").addEventListener("click", function () {
        scrollToRepSlide(1);
      });
    }

    if ($("repToSlide3Btn")) {
      $("repToSlide3Btn").addEventListener("click", function () {
        scrollToRepSlide(2);
      });
    }

    if ($("repBackSlide1Btn")) {
      $("repBackSlide1Btn").addEventListener("click", function () {
        scrollToRepSlide(0);
      });
    }

    if ($("repBackSlide2Btn")) {
      $("repBackSlide2Btn").addEventListener("click", function () {
        scrollToRepSlide(1);
      });
    }

    animateReportFallback();
  }

  /* =======================================================================
     SLIDES 07 & 08 — LIVE DEMO WALKTHROUGH & ACADEMIC TRUST CLOSING
     ======================================================================= */
  const demoTrustSec = $("demo-trust");
  if (demoTrustSec) {
    const dtHead = $("dtHead");
    const dtPendulumTag = $("dtPendulumTag");
    const dtOrbitRing = $("dtOrbitRing");
    const dtSlides = demoTrustSec.querySelectorAll(".dt-3d-slide");
    const dtTabs = demoTrustSec.querySelectorAll(".dt-tab");
    const dtProgressBar = $("dtProgressBar");
    const dtSlideCounter = $("dtSlideCounter");
    const dtScrollHint = $("dtScrollHint");

    const DEMO_STAGES = {
      ingest: {
        badge: "STAGE 01 / INPUT & PARSE",
        status: "PROTOTYPE READY",
        title: "Upload or Paste Manuscript Text",
        desc: "Users drop a paper or paste draft text to immediately stage claims and inline citations for inspection.",
        log: "• Input staged: “A particular study found that a learning app improved test scores by 30% [3].”"
      },
      extract: {
        badge: "STAGE 02 / EXTRACTED CLAIMS",
        status: "2 CLAIMS MAPPED",
        title: "Inspect Extracted Claims & Matched Citations",
        desc: "Highlights quantitative claims and links inline markers like [3] to Smith & Patel (2021) and [1] to Lin & Gomez (2023).",
        log: "• Claim #01 [3] → 30% score claim linked to Ref [3] (Smith & Patel, 2021, p. 4)."
      },
      compare: {
        badge: "STAGE 03 / EVIDENCE & FLAGS",
        status: "EXAGGERATION FLAGGED",
        title: "Evidence Comparison & Flagged Issues",
        desc: "Compares the 30% claim against the cited paper's small pilot group—flagging that no 30% increase appears.",
        log: "• Flagged: Claim overstates small-pilot score improvement; no 30% figure in source."
      },
      history: {
        badge: "STAGE 04 / REVIEW HISTORY",
        status: "AUDIT TRAIL LOGGED",
        title: "Inspect Review History & Human Sign-Off",
        desc: "Tracks claim verdicts, calibrated confidence (68%), DOI/page traces, and human reviewer decisions.",
        log: "• History #04: Marked 'Partly Supported · Needs Human Review' with DOI link attached."
      }
    };

    document.querySelectorAll(".dt-step-pill").forEach(function (pill) {
      pill.addEventListener("click", function () {
        document.querySelectorAll(".dt-step-pill").forEach(function (p) {
          p.classList.remove("active-dt");
        });
        pill.classList.add("active-dt");

        const key = pill.getAttribute("data-demo");
        const demoMap = window.__LIVE_DEMO_STAGES || DEMO_STAGES;
        const stg = demoMap[key];
        if (!stg) return;

        setText("dtInspBadge", stg.badge);
        setText("dtInspStatus", stg.status);
        setText("dtInspTitle", stg.title);
        setText("dtInspDesc", stg.desc);
        setText("dtInspLog", stg.log);
      });
    });

    function scrollToDtSlide(slideIdx) {
      const scrollable = Math.max(demoTrustSec.offsetHeight - window.innerHeight, 1);
      const targetProgress = slideIdx;
      const y = demoTrustSec.offsetTop + targetProgress * scrollable;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    function updateDemoTrustFromProgress(p) {
      if (window.innerWidth <= 650 || reduceMotion) {
        if (dtHead) {
          dtHead.style.opacity = 1;
          dtHead.style.transform = "none";
        }
        return;
      }

      const headTrigger = Math.min(1, Math.max(0, p / 0.16));
      if (dtHead) {
        dtHead.style.opacity = headTrigger;
        dtHead.style.transform =
          "translate3d(0," +
          (1 - headTrigger) * 34 +
          "px," +
          (1 - headTrigger) * -50 +
          "px) " +
          "rotateX(" +
          (1 - headTrigger) * 10 +
          "deg)";
      }

      if (dtPendulumTag) {
        const swing = Math.sin(p * Math.PI * 2) * 18;
        dtPendulumTag.style.transform =
          "translate3d(" +
          -p * 48 +
          "px," +
          p * 18 +
          "px,0) " +
          "rotateZ(" +
          swing +
          "deg) rotateY(" +
          (-14 + p * 40) +
          "deg)";
      }

      if (dtOrbitRing) {
        dtOrbitRing.style.transform =
          "translate(-50%, -50%) rotateX(68deg) rotateZ(" + p * 140 + "deg)";
      }

      const slidePos = p;
      const activeIdx = Math.min(1, Math.max(0, Math.round(slidePos)));

      dtSlides.forEach(function (slide, idx) {
        const diff = idx - slidePos;
        const absDiff = Math.abs(diff);

        const rz = diff * -7;
        const ry = diff * 26;
        const tx = diff * 34;
        const tz = -absDiff * 240;
        const scale = Math.max(0.8, 1 - absDiff * 0.14);
        const opacity = Math.max(0, 1 - absDiff * 0.85);

        slide.style.opacity = opacity;
        slide.style.pointerEvents = absDiff < 0.45 ? "auto" : "none";
        slide.style.zIndex = String(26 - Math.round(absDiff * 8));
        slide.style.transform =
          "perspective(2250px) " +
          "translate3d(" +
          tx +
          "%, 0, " +
          tz +
          "px) " +
          "rotateY(" +
          ry +
          "deg) " +
          "rotateZ(" +
          rz +
          "deg) " +
          "scale(" +
          scale +
          ")";
      });

      dtTabs.forEach(function (tab, idx) {
        tab.classList.toggle("active", idx === activeIdx);
      });

      if (dtProgressBar) dtProgressBar.style.width = p * 100 + "%";
      if (dtSlideCounter) dtSlideCounter.textContent = "SLIDE 0" + (activeIdx + 7) + " / 08";
      if (dtScrollHint) {
        dtScrollHint.textContent =
          activeIdx === 0 ? "SCROLL TO SLIDE 08: ACADEMIC TRUST ↓" : "ACADEMIC TRUST CLOSING REACHED ↓";
      }
    }

    function animateDemoTrustFallback() {
      const rect = demoTrustSec.getBoundingClientRect();
      const total = Math.max(demoTrustSec.offsetHeight - window.innerHeight, 1);
      const p = Math.min(1, Math.max(0, -rect.top / total));
      updateDemoTrustFromProgress(p);
    }

    if (window.gsap && window.ScrollTrigger && !reduceMotion) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      window.ScrollTrigger.create({
        trigger: demoTrustSec,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: function (self) {
          updateDemoTrustFromProgress(self.progress);
        }
      });
    } else {
      window.addEventListener("scroll", animateDemoTrustFallback, { passive: true });
    }

    window.addEventListener("resize", animateDemoTrustFallback);

    dtTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        scrollToDtSlide(Number(tab.getAttribute("data-dt-slide")));
      });
    });

    if ($("dtToTrustBtn")) {
      $("dtToTrustBtn").addEventListener("click", function () {
        scrollToDtSlide(1);
      });
    }

    if ($("dtBackDemoBtn")) {
      $("dtBackDemoBtn").addEventListener("click", function () {
        scrollToDtSlide(0);
      });
    }

    animateDemoTrustFallback();
  }
});