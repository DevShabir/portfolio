document.addEventListener("DOMContentLoaded", initCVGenerator);

function initCVGenerator() {
  const button = document.getElementById("downloadCV");
  if (!button) return;

  button.addEventListener("click", () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      window.alert("Please allow pop-ups for this site to open your CV.");
      return;
    }

    const cvDocument = buildCVDocument();
    printWindow.document.open();
    printWindow.document.write(cvDocument);
    printWindow.document.close();

    const openPrintDialog = () => {
      printWindow.focus();
      printWindow.print();
    };

    const preparePrintDialog = () => {
      if (printWindow.document.fonts && printWindow.document.fonts.ready) {
        printWindow.document.fonts.ready.then(() => printWindow.requestAnimationFrame(openPrintDialog));
      } else {
        printWindow.requestAnimationFrame(openPrintDialog);
      }
    };

    if (printWindow.document.readyState === "complete") {
      preparePrintDialog();
    } else {
      printWindow.addEventListener("load", preparePrintDialog, { once: true });
    }
  });
}

function buildCVDocument() {
  const fullName = getInfoValue("Name");
  const email = document.querySelector('#contact a[href^="mailto:"]');
  const github = document.querySelector('#contact a[href*="github.com"]');
  const phone = document.querySelector('#contact a[href*="wa.me"]');
  const about = document.querySelector("#about .row > .col-lg-7 .glass-card");
  const summary = about
    ? [...about.querySelectorAll("p")].slice(0, 3).map((paragraph) => paragraph.textContent.trim()).join(" ")
    : "";
  const skills = [...document.querySelectorAll("#skills .row > div")].map((group) => {
    const category = group.querySelector("h3")?.textContent.trim();
    const items = [...group.querySelectorAll(".skill-item-list li")].map((item) => {
      const details = item.querySelector("span");
      const name = [...item.childNodes]
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.textContent)
        .join("")
        .trim();
      return details ? `${name} (${details.textContent.trim()})` : name;
    }).filter(Boolean);

    return { category, items };
  }).filter((group) => group.category && group.items.length);
  const education = [...document.querySelectorAll("#education .timeline-item")].slice(0, 3).map((item, index) => {
    const title = item.querySelector("h3")?.textContent.trim();
    const detail = item.querySelectorAll("p");
    return {
      title: index === 0 ? [getInfoValue("University"), title].filter(Boolean).join(" — ") : title,
      subtitle: detail.length > 1 ? detail[0].textContent.trim() : "",
      description: detail[detail.length - 1]?.textContent.trim() || ""
    };
  }).filter((item) => item.title && item.description);
  const services = [...document.querySelectorAll("#services .glass-card")].map((card) => ({
    title: card.querySelector("h3")?.textContent.trim(),
    description: card.querySelector("p")?.textContent.trim()
  })).filter((service) => service.title && service.description);
  const completedProjects = projects.filter((project) =>
    String(project.status || "").trim().toLowerCase().replace(/[\s_]+/g, "-") === "completed"
  );

  const contactLinks = [
    email && { type: "EMAIL", label: email.textContent.trim(), href: email.href },
    phone && { type: "PHONE", label: phone.textContent.trim(), href: phone.href },
    github && { type: "GITHUB", label: github.textContent.trim(), href: github.href }
  ].filter(Boolean);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeCV(fullName || "Professional CV")}</title>
  <style>
    :root {
      color-scheme: light;
      font-family: "Segoe UI", Arial, sans-serif;
      color: #1d2939;
      background: #e8edf4;
      font-synthesis: none;
      --navy: #142b4a;
      --blue: #2f67a8;
      --teal: #167d82;
      --muted: #596b80;
      --line: #dce5ee;
      --soft: #f3f7fa;
    }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 28px 16px; }
    .cv-document {
      position: relative;
      width: min(100%, 210mm);
      min-height: 297mm;
      margin: 0 auto;
      padding: 16mm 17mm;
      overflow: hidden;
      background: #fff;
      box-shadow: 0 16px 48px rgba(20, 43, 74, .16);
    }
    .cv-document::before {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      height: 7px;
      background: linear-gradient(90deg, var(--navy) 0 68%, var(--teal) 68% 100%);
      content: "";
    }
    .cv-header {
      position: relative;
      padding: 7px 0 19px;
      border-bottom: 1px solid var(--line);
    }
    .cv-kicker {
      margin: 0 0 8px;
      color: var(--teal);
      font-size: 9px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
    h1 { margin: 0; color: var(--navy); font-size: 32px; letter-spacing: -.8px; line-height: 1.12; }
    .cv-title { margin: 8px 0 17px; color: var(--blue); font-size: 15px; font-weight: 650; }
    .cv-contact { display: flex; flex-wrap: wrap; gap: 8px; }
    .contact-item {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      max-width: 100%;
      padding: 6px 9px;
      border: 1px solid var(--line);
      border-radius: 5px;
      background: #fff;
      color: var(--navy);
      font-size: 9px;
      overflow-wrap: anywhere;
    }
    .contact-mark { color: var(--teal); font-size: 9px; font-weight: 800; }
    a { color: var(--blue); text-decoration: none; overflow-wrap: anywhere; }
    .cv-layout { display: grid; grid-template-columns: minmax(0, 1fr) 56mm; gap: 10mm; padding-top: 19px; }
    .cv-main, .cv-sidebar { min-width: 0; }
    .cv-sidebar {
      padding: 15px 13px;
      border: 1px solid #e3ebf2;
      border-top: 3px solid var(--teal);
      border-radius: 5px;
      background: var(--soft);
    }
    section + section { margin-top: 21px; }
    .section-heading {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 0 0 10px;
      color: var(--navy);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 1.15px;
      text-transform: uppercase;
    }
    .section-heading::before {
      width: 3px;
      height: 15px;
      border-radius: 2px;
      background: var(--teal);
      content: "";
    }
    .section-heading::after { height: 1px; flex: 1; background: var(--line); content: ""; }
    p { margin: 0; font-size: 10px; line-height: 1.62; }
    .summary { color: #405168; }
    .skill-group + .skill-group { margin-top: 13px; }
    .skill-group strong {
      display: block;
      margin-bottom: 6px;
      color: var(--navy);
      font-size: 9px;
      letter-spacing: .25px;
    }
    .skill-tags { display: flex; flex-wrap: wrap; gap: 5px; }
    .skill-tag {
      display: inline-block;
      padding: 4px 6px;
      border: 1px solid #d8e4ed;
      border-radius: 4px;
      background: #fff;
      color: #405168;
      font-size: 8px;
      line-height: 1.25;
    }
    .project, .education-item, .service { break-inside: avoid; page-break-inside: avoid; }
    .project {
      padding: 0 0 12px 11px;
      border-left: 2px solid #b7d8d8;
    }
    .project + .project { margin-top: 13px; }
    .entry-heading { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 4px 10px; }
    h3 { margin: 0; color: var(--navy); font-size: 11px; line-height: 1.4; }
    .project p, .education-item p, .service p { margin-top: 4px; color: #485a70; font-size: 9.5px; }
    .project-tech { margin-top: 7px; color: var(--muted); font-size: 8.5px; line-height: 1.5; }
    .project-tech strong { color: var(--navy); }
    ul { margin: 6px 0 0; padding-left: 14px; }
    li { margin: 3px 0; color: #485a70; font-size: 8.8px; line-height: 1.45; }
    .project-links { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 7px; font-size: 8.5px; font-weight: 700; }
    .project-links a::before { margin-right: 4px; color: var(--teal); content: "↗"; }
    .education-item + .education-item { margin-top: 13px; }
    .education-item { padding-left: 10px; border-left: 1px solid #b7d8d8; }
    .education-item h3, .service h3 { font-size: 9.5px; }
    .education-item p { font-size: 8.5px; line-height: 1.5; }
    .service + .service { margin-top: 10px; }
    .service p { font-size: 8.5px; line-height: 1.5; }
    .cv-actions { display: flex; justify-content: center; gap: 10px; margin: 18px auto 0; }
    .cv-actions button {
      padding: 10px 18px;
      border: 0;
      border-radius: 5px;
      background: var(--navy);
      color: #fff;
      cursor: pointer;
      font: inherit;
      font-size: 13px;
      font-weight: 650;
      transition: background .2s ease, transform .2s ease;
    }
    .cv-actions button:hover { transform: translateY(-1px); background: var(--blue); }
    @media (max-width: 650px) {
      body { padding: 0; }
      .cv-document { min-height: 100vh; padding: 25px 22px; box-shadow: none; }
      h1 { font-size: 27px; }
      .cv-layout { grid-template-columns: 1fr; gap: 20px; }
      .cv-sidebar { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 18px; }
      .cv-sidebar section + section { margin-top: 0; }
      .contact-item { white-space: normal; }
    }
    @page { size: A4; margin: 12mm 13mm; }
    @media print {
      :root, body { background: #fff; color: #1d2939; }
      body { padding: 0; }
      .cv-document { width: auto; min-height: 0; margin: 0; padding: 0; overflow: visible; box-shadow: none; }
      .cv-actions { display: none !important; }
      .cv-layout { grid-template-columns: minmax(0, 1fr) 56mm; gap: 8mm; }
      .cv-sidebar { background: #f3f7fa !important; }
      a { color: #24589d; text-decoration: underline; }
      section, .section-heading { break-after: avoid-page; page-break-after: avoid; }
      .project, .education-item, .service, .skill-group { break-inside: avoid-page; page-break-inside: avoid; }
      * { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    }
  </style>
</head>
<body>
  <main class="cv-document">
    <header class="cv-header">
      <p class="cv-kicker">Curriculum Vitae</p>
      <h1>${escapeCV(fullName)}</h1>
      <p class="cv-title">Backend Developer | Web Developer</p>
      <div class="cv-contact">${contactLinks.map((link) =>
        `<a class="contact-item" href="${escapeCV(link.href)}"><span class="contact-mark" aria-hidden="true">${escapeCV(link.type)}</span>${escapeCV(link.label)}</a>`
      ).join("")}</div>
    </header>
    <div class="cv-layout">
      <div class="cv-main">
        ${summary ? `<section><h2 class="section-heading">Professional Summary</h2><p class="summary">${escapeCV(summary)}</p></section>` : ""}
        ${completedProjects.length ? `<section><h2 class="section-heading">Selected Projects</h2>${completedProjects.map((project) => `
          <article class="project">
            <div class="entry-heading"><h3>${escapeCV(project.title)}</h3></div>
            <p>${escapeCV(project.shortDescription || project.fullDescription || "")}</p>
            ${project.technologies?.length ? `<div class="project-tech"><strong>Stack</strong> &nbsp;${project.technologies.map(escapeCV).join(" · ")}</div>` : ""}
            ${project.features?.length ? `<ul>${project.features.slice(0, 3).map((feature) => `<li>${escapeCV(feature)}</li>`).join("")}</ul>` : ""}
            <div class="project-links">
              ${project.github ? `<a href="${escapeCV(project.github)}">GitHub repository</a>` : ""}
              ${project.demo ? `<a href="${escapeCV(project.demo)}">Live demo</a>` : ""}
            </div>
          </article>
        `).join("")}</section>` : ""}
      </div>
      <aside class="cv-sidebar">
        ${skills.length ? `<section><h2 class="section-heading">Technical Skills</h2>${skills.map((group) =>
          `<div class="skill-group"><strong>${escapeCV(group.category)}</strong><div class="skill-tags">${group.items.map((skill) => `<span class="skill-tag">${escapeCV(skill.split(" (")[0])}</span>`).join("")}</div></div>`
        ).join("")}</section>` : ""}
        ${education.length ? `<section><h2 class="section-heading">Education &amp; Learning</h2>${education.map((item) => `
          <article class="education-item">
            <div class="entry-heading"><h3>${escapeCV(item.title)}</h3></div>
            ${item.subtitle ? `<p><strong>${escapeCV(item.subtitle)}</strong></p>` : ""}
            <p>${escapeCV(item.description)}</p>
          </article>
        `).join("")}</section>` : ""}
        ${services.length ? `<section><h2 class="section-heading">Services</h2>${services.map((service) => `
          <article class="service"><h3>${escapeCV(service.title)}</h3><p>${escapeCV(service.description)}</p></article>
        `).join("")}</section>` : ""}
      </aside>
    </div>
  </main>
  <div class="cv-actions"><button type="button" onclick="window.print()">Print / Save as PDF</button></div>
</body>
</html>`;
}

function getInfoValue(label) {
  const item = [...document.querySelectorAll("#about .info-list li")].find((entry) =>
    entry.querySelector(".fw-semibold")?.textContent.includes(label)
  );
  return item?.querySelector(".text-secondary-custom")?.textContent.trim() || "";
}

function escapeCV(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
    return entities[character];
  });
}
