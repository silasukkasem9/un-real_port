import { useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { ExternalLink, ShieldAlert } from 'lucide-react';
import { HARD_SKILLS, SHABULAB_CASE_STUDY, SOFT_SKILLS, PULL_QUOTE } from '../data/capabilities';
import type { HardSkill, SourceReference } from '../data/capabilities';
import styles from './Capabilities.module.css';

const REPOSITORY_URLS = {
  frontend: 'https://github.com/silasukkasem9/SHABULAB.frontend',
  backend: 'https://github.com/silasukkasem9/SHABULAB.backend',
};

function SourceLinks({ references }: { references: SourceReference[] }) {
  return (
    <ul className={styles.sourceLinks} aria-label="Source files">
      {references.map(({ repository, path }) => (
        <li key={`${repository}:${path}`}>
          <a
            href={`${REPOSITORY_URLS[repository]}/blob/main/${path}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{repository}</span>
            <code>{path}</code>
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Capabilities() {
  const [activeSkillId, setActiveSkillId] = useState<'system-design' | 'reverse-engineering'>('system-design');
  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-60px' });
  const shouldReduceMotion = useReducedMotion();

  const currentSkill: HardSkill =
    HARD_SKILLS.find((s) => s.id === activeSkillId) ?? HARD_SKILLS[0];

  return (
    <section id="capabilities" className={styles.capabilities} aria-labelledby="capabilities-heading">
      <div className={styles.inner} ref={containerRef}>
        {/* Section Header */}
        <div className={styles.sectionHeader}>
          <div>
            <div className={styles.headerMeta}>
              <span className="label">02 / Capabilities</span>
            </div>
            <motion.h2
              id="capabilities-heading"
              className={styles.sectionTitle}
              tabIndex={-1}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Architectural Core &amp;<br />Cognitive Vectors
            </motion.h2>
          </div>

          <motion.p
            className={styles.headerSubtitle}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Engineering capability evidenced through real codebases, strict subsystem boundaries,
            and self-aware mental execution patterns.
          </motion.p>
        </div>

        {/* ── PART 1: HARD SKILLS & SHABULABX CASE STUDY ───────────────────── */}
        <div className={styles.hardSkillsSection}>
          <div className={styles.subHeadingBlock}>
            <span className={styles.subHeadingTitle}>01. Verified Technical Disciplines</span>
            <div className={styles.subHeadingLine} />
          </div>

          {/* Tab Selector */}
          <div className={styles.skillTabBar} role="tablist" aria-label="Technical Disciplines">
            {HARD_SKILLS.map((skill) => {
              const isActive = skill.id === activeSkillId;
              return (
                <button
                  key={skill.id}
                  type="button"
                  role="tab"
                  id={`tab-${skill.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${skill.id}`}
                  tabIndex={isActive ? 0 : -1}
                  className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ''}`}
                  onKeyDown={(event) => {
                    const currentIndex = HARD_SKILLS.findIndex((item) => item.id === skill.id);
                    let nextIndex: number | null = null;

                    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % HARD_SKILLS.length;
                    if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + HARD_SKILLS.length) % HARD_SKILLS.length;
                    if (event.key === 'Home') nextIndex = 0;
                    if (event.key === 'End') nextIndex = HARD_SKILLS.length - 1;

                    if (nextIndex !== null) {
                      event.preventDefault();
                      const nextSkill = HARD_SKILLS[nextIndex];
                      setActiveSkillId(nextSkill.id);
                      setSelectedLayerIndex(0);
                      document.getElementById(`tab-${nextSkill.id}`)?.focus();
                    }
                  }}
                  onClick={() => {
                    setActiveSkillId(skill.id);
                    setSelectedLayerIndex(0);
                  }}
                >
                  <span className={styles.tabIndex}>{skill.index}</span>
                  <span>{skill.title}</span>
                </button>
              );
            })}
          </div>

          {/* Hard Skill Detail Pane */}
          <div
            id={`panel-${currentSkill.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${currentSkill.id}`}
            className={styles.hardSkillGrid}
          >
            {/* Left: Metadata & Narrative */}
            <div className={styles.skillMetaCol}>
              <div>
                <span className={styles.categoryTag}>{currentSkill.category}</span>
                <h3 className={styles.skillTitle}>{currentSkill.title}</h3>
              </div>

              <p className={styles.skillTagline}>{currentSkill.tagline}</p>

              <p className={styles.skillDesc}>{currentSkill.description}</p>

              {/* Guiding Principles */}
              <div className={styles.principlesGroup}>
                <span className="label">Governing Architectural Tenets</span>
                {currentSkill.principles.map((p, pIdx) => (
                  <div key={`principle-${p.label || pIdx}`} className={styles.principleItem}>
                    <span className={styles.principleLabel}>{p.label}</span>
                    <span className={styles.principleDetail}>{p.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Technical Blueprint & Artifact Inspector */}
            <div className={styles.blueprintCol}>
              <div className={styles.blueprintHeader}>
                <span className="label">
                  {activeSkillId === 'system-design' ? 'Case Study // ShabuLabX Evidence' : 'Methodology // Behavioral Inspection'}
                </span>
                <span className={styles.blueprintBadge}>
                  {activeSkillId === 'system-design' ? 'SOURCE-VERIFIED BOUNDARIES' : 'STRUCTURAL SCOPE'}
                </span>
              </div>

              <div className={styles.blueprintTerminal}>
                {activeSkillId === 'system-design' && currentSkill.confirmedWork && (
                  <>
                    <div className={styles.confirmedWorkHeader}>
                      <div className={styles.workNameRow}>
                        <h4 className={styles.workName}>{currentSkill.confirmedWork.name}</h4>
                        <span className={styles.workRole}>{currentSkill.confirmedWork.role}</span>
                      </div>

                      <p className={styles.workContext}>{currentSkill.confirmedWork.context}</p>

                      {/* Verified Dual Source Links */}
                      <div className={styles.repoButtonsRow}>
                        <a
                          href={currentSkill.confirmedWork.frontendRepoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.repoBtn}
                          aria-label="Explore ShabuLab frontend repository on GitHub (opens in new tab)"
                        >
                          <span>Explore Frontend Source</span>
                          <ExternalLink size={12} aria-hidden="true" />
                        </a>
                        <a
                          href={currentSkill.confirmedWork.backendRepoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.repoBtn}
                          aria-label="Explore ShabuLab backend repository on GitHub (opens in new tab)"
                        >
                          <span>Explore Backend Source</span>
                          <ExternalLink size={12} aria-hidden="true" />
                        </a>
                      </div>
                    </div>

                    <section className={styles.caseStudySection} aria-labelledby="shabulab-problem">
                      <h5 id="shabulab-problem" className={styles.caseStudyHeading}>Problem &amp; scope</h5>
                      <p>{SHABULAB_CASE_STUDY.problem}</p>
                      <p className={styles.attributionNote}>{SHABULAB_CASE_STUDY.attributionNote}</p>
                    </section>

                    <section className={styles.caseStudySection} aria-labelledby="shabulab-architecture">
                      <h5 id="shabulab-architecture" className={styles.caseStudyHeading}>Verified architecture map</h5>
                      <p className={styles.sectionIntro}>
                        The matching product route path is product service → REST API → persistence.
                        Select a layer to inspect its responsibility, boundary, and source files.
                      </p>
                      <ol className={styles.architectureFlow}>
                        {SHABULAB_CASE_STUDY.architectureLayers.map((layer, idx) => {
                          const isSelected = selectedLayerIndex === idx;
                          return (
                            <li key={layer.layer}>
                              <button
                                id={`architecture-layer-${layer.layer}`}
                                type="button"
                                className={`${styles.layerCard} ${isSelected ? styles.layerCardSelected : ''}`}
                                onClick={() => setSelectedLayerIndex(idx)}
                                aria-controls="architecture-layer-detail"
                                aria-expanded={isSelected}
                              >
                                <span className={styles.layerBadge}>{layer.layer}</span>
                                <span className={styles.layerTitle}>{layer.title}</span>
                                <span className={`${styles.layerStatus} ${styles[`status_${layer.status}`]}`}>
                                  {layer.statusLabel}
                                </span>
                              </button>
                              {idx < SHABULAB_CASE_STUDY.architectureLayers.length - 1 && (
                                <span className={styles.flowConnector} aria-hidden="true">↓</span>
                              )}
                            </li>
                          );
                        })}
                      </ol>
                      {SHABULAB_CASE_STUDY.architectureLayers[selectedLayerIndex] && (
                        <div
                          id="architecture-layer-detail"
                          className={styles.activeLayerDetail}
                          aria-labelledby={`architecture-layer-${SHABULAB_CASE_STUDY.architectureLayers[selectedLayerIndex].layer}`}
                        >
                          <p>{SHABULAB_CASE_STUDY.architectureLayers[selectedLayerIndex].details}</p>
                          <p className={styles.boundaryNote}>
                            <strong>Boundary &amp; limitation:</strong>{' '}
                            {SHABULAB_CASE_STUDY.architectureLayers[selectedLayerIndex].boundary}
                          </p>
                          <SourceLinks
                            references={SHABULAB_CASE_STUDY.architectureLayers[selectedLayerIndex].sourceReferences}
                          />
                        </div>
                      )}
                    </section>

                    <section className={styles.caseStudySection} aria-labelledby="shabulab-examples">
                      <h5 id="shabulab-examples" className={styles.caseStudyHeading}>Engineering examples</h5>
                      {SHABULAB_CASE_STUDY.engineeringExamples.map((example) => (
                        <article key={example.title} className={styles.evidenceExample}>
                          <div className={styles.evidenceTitleRow}>
                            <h6>{example.title}</h6>
                            {example.status === 'partial' && (
                              <span className={`${styles.layerStatus} ${styles.status_partial}`}>
                                PARTIAL INTEGRATION
                              </span>
                            )}
                          </div>
                          <p><strong>Problem:</strong> {example.problem}</p>
                          <p><strong>Implementation:</strong> {example.implementation}</p>
                          <p><strong>Why it matters:</strong> {example.significance}</p>
                          <p><strong>Trade-off / limit:</strong> {example.tradeoff}</p>
                          {example.personalNote && (
                            <p className={styles.personalNote}>{example.personalNote}</p>
                          )}
                          <SourceLinks references={example.sourceReferences} />
                        </article>
                      ))}
                    </section>

                    <section className={styles.caseStudySection} aria-labelledby="shabulab-decisions">
                      <h5 id="shabulab-decisions" className={styles.caseStudyHeading}>Decisions &amp; trade-offs</h5>
                      <p className={styles.sectionIntro}>
                        These are retrospective readings of the code, not claims about documented historical deliberations.
                      </p>
                      {SHABULAB_CASE_STUDY.decisions.map((decision) => (
                        <article key={decision.title} className={styles.evidenceExample}>
                          <h6>{decision.title}</h6>
                          <p><strong>Selected approach:</strong> {decision.selected}</p>
                          <p><strong>Alternative:</strong> {decision.alternatives}</p>
                          <p><strong>Cost:</strong> {decision.tradeoff}</p>
                          <p><strong>Next iteration:</strong> {decision.futureIteration}</p>
                          <SourceLinks references={decision.sourceReferences} />
                        </article>
                      ))}
                    </section>

                    <section className={styles.caseStudySection} aria-labelledby="shabulab-limitations">
                      <h5 id="shabulab-limitations" className={styles.caseStudyHeading}>Evidence gaps &amp; limitations</h5>
                      <ul className={styles.limitationsList}>
                        {SHABULAB_CASE_STUDY.limitations.map((limitation) => (
                          <li key={limitation}>{limitation}</li>
                        ))}
                      </ul>
                      <p className={styles.lessonNote}><strong>Lesson:</strong> {SHABULAB_CASE_STUDY.lesson}</p>
                    </section>
                  </>
                )}

                {activeSkillId === 'reverse-engineering' && (
                  <div className={styles.revEngPanel}>
                    {/* Clear Scope Boundary */}
                    <div className={styles.scopeBox}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ShieldAlert size={16} style={{ color: 'var(--col-accent)' }} aria-hidden="true" />
                        <span className={styles.scopeTitle}>Defined Operational Scope</span>
                      </div>
                      <p className={styles.scopeDesc}>
                        Methodical structural exploration, network behavior tracing, and black-box payload
                        reconstruction. Focuses on system interoperability and state deduction. Explicitly
                        excludes offensive vulnerability research, binary exploitation, or malware analysis.
                      </p>
                    </div>

                    <div className={styles.inspectionSummary} aria-label="Inspection methodology">
                      <p className={styles.inspectionIntro}>
                        A careful black-box review separates observed behavior from assumptions.
                      </p>
                      <dl className={styles.inspectionList}>
                        <div className={styles.inspectionRow}>
                          <dt>Transport</dt>
                          <dd>Trace request and response structures, including failure boundaries.</dd>
                        </div>
                        <div className={styles.inspectionRow}>
                          <dt>Payload</dt>
                          <dd>Infer data shapes from observed inputs and outputs; label uncertainty.</dd>
                        </div>
                        <div className={styles.inspectionRow}>
                          <dt>Lifecycle</dt>
                          <dd>Follow state transitions across the client and service boundary.</dd>
                        </div>
                        <div className={styles.inspectionRow}>
                          <dt>Scope</dt>
                          <dd>Interoperability analysis, not exploitation or malware research.</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ── PART 2: SOFT SKILLS & THINKING PATTERNS ──────────────────────── */}
        <div className={styles.softSkillsSection}>
          <div className={styles.subHeadingBlock}>
            <span className={styles.subHeadingTitle}>02. Cognitive Patterns &amp; Working Tendencies</span>
            <div className={styles.subHeadingLine} />
          </div>

          {/* Editorial Pull Quote */}
          <div className={styles.pullQuoteBanner}>
            <blockquote className={styles.pullQuoteText}>
              &ldquo;{PULL_QUOTE}&rdquo;
            </blockquote>
            <span className={styles.pullQuoteAuthor}>
              // Architectural Philosophy &amp; Self-Awareness Constraint
            </span>
          </div>

          {/* 4 Cards Matrix */}
          <div className={styles.thinkingGrid}>
            {SOFT_SKILLS.map((trait) => {
              const isStrength = trait.type === 'STRENGTH';
              return (
                <div
                  key={trait.id}
                  className={`${styles.thinkingCard} ${isStrength ? styles.cardStrength : styles.cardTendency}`}
                >
                  <div className={styles.cardTop}>
                    <div className={styles.cardHeaderRow}>
                      <span className={styles.cardIndex}>{trait.index}</span>
                      <span
                        className={`${styles.typeBadge} ${
                          isStrength ? styles.typeBadgeStrength : styles.typeBadgeTendency
                        }`}
                      >
                        {trait.type}
                      </span>
                    </div>

                    <h4 className={styles.cardTitle}>{trait.title}</h4>
                    <span className={styles.cardVector}>{trait.vector}</span>

                    <p className={styles.cardDesc}>{trait.description}</p>
                  </div>

                  <div className={styles.cardDialectic}>
                    <div className={styles.dialecticRow}>
                      <span className={styles.dialecticLabel}>Analytical Yield</span>
                      <span className={styles.dialecticImpact}>{trait.analyticalImpact}</span>
                    </div>

                    <div className={styles.dialecticRow}>
                      <span className={styles.dialecticLabel}>Engineering Risk</span>
                      <span className={styles.dialecticRisk}>{trait.engineeringRisk}</span>
                    </div>

                    <div className={styles.mitigationBox}>
                      <span className={styles.mitigationLabel}>Active Countermeasure</span>
                      <span className={styles.mitigationText}>{trait.mitigation}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
