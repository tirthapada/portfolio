import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Github, Linkedin, LockKeyhole, Menu, ScanLine, ShieldCheck, Terminal, X } from 'lucide-react';
import './index.css';

const skills = ['Python', 'Java', 'C', 'C++', 'JavaScript', 'React.js', 'HTML', 'CSS', 'Tailwind CSS', 'Git', 'GitHub', 'AI/ML', 'Machine Learning', 'Cybersecurity', 'Data Structures & Algorithms', 'Computer Vision', 'NLP'];
const skillDescriptions: Record<string, string> = {
  Python: 'Programming, automation and a working language for AI/ML experiments.',
  'AI/ML': 'Currently learning by turning models, data and curiosity into useful systems.',
  Cybersecurity: 'Exploring defensive thinking, secure systems and the mechanics of attacks.',
  'Data Structures & Algorithms': 'The fundamentals I use to reason about efficient software.',
};
const projects = [
  { number: '01', title: 'AI-POWERED VOICE CLONING DETECTION', desc: 'An AI-powered system focused on detecting and preventing voice-cloning impersonation attacks.', tags: ['AI', 'Machine Learning', 'Cybersecurity', 'Deep Learning', 'Audio Analysis'] },
  { number: '02', title: 'D-FUSE', desc: 'A featured technical project. Details are being documented and will be added here as the project evolves.', tags: ['Technical Project', 'Editable details'] },
  { number: '03', title: 'QUICKBITE', desc: 'A smart food ordering platform focused on a modern digital ordering experience.', tags: ['React', 'JavaScript', 'Web Development', 'UI/UX'] },
  { number: '04', title: 'NEW PROJECT', desc: 'Editable placeholder — project details will be added here when available.', tags: ['Placeholder', 'Details pending'] },
];
const expertise = [
  ['01', 'ARTIFICIAL INTELLIGENCE', 'Currently learning and building with intelligent systems, model behavior and practical AI applications.'],
  ['02', 'MACHINE LEARNING', 'Exploring data, features and training workflows through hands-on projects.'],
  ['03', 'CYBERSECURITY', 'Learning secure-by-design thinking and the systems behind digital trust.'],
  ['04', 'SOFTWARE DEVELOPMENT', 'Building practical software and full-stack web experiences from idea to interface.'],
  ['05', 'DATA STRUCTURES & ALGORITHMS', 'Strengthening the foundations that make software efficient and understandable.'],
  ['06', 'WEB DEVELOPMENT', 'Creating responsive digital experiences with JavaScript, React and CSS.'],
];
const nodes = [
  { name: 'AI', x: '49%', y: '22%' }, { name: 'ML', x: '25%', y: '38%' }, { name: 'DEEP LEARNING', x: '70%', y: '35%' },
  { name: 'VISION', x: '31%', y: '67%' }, { name: 'NLP', x: '71%', y: '64%' }, { name: 'DATA', x: '49%', y: '52%' },
  { name: 'ALGORITHMS', x: '17%', y: '76%' }, { name: 'SECURITY', x: '84%', y: '80%' },
];
const orbSkills = ['AI', 'ML', 'CYBERSECURITY', 'PYTHON', 'C++', 'REACT'];

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Loader({ done }: { done: boolean }) {
  return <div className={`loader ${done ? 'done' : ''}`} aria-hidden={done}>
    <div className="loader-inner">
      <div className="loader-mark">TIRTHAPADA<span>.</span></div>
      <div className="loader-log"><div><b>01</b> / INITIALIZING...</div><div><b>02</b> / LOADING PORTFOLIO...</div><div><b>03</b> / LOADING AI CORE...</div><div><b>04</b> / SYSTEM READY.</div></div>
      <div className="loader-bar"><span /></div>
    </div>
  </div>;
}

function Navigation({ open, setOpen, onBrand }: { open: boolean; setOpen: (open: boolean) => void; onBrand: () => void }) {
  const links = [['ABOUT', 'about'], ['WORK', 'work'], ['SKILLS', 'skills'], ['ACHIEVEMENTS', 'achievements'], ['CONTACT', 'contact']];
  return <nav className="nav">
    <div className="container-wide nav-inner">
      <button className="brand" data-testid="button-brand" onClick={() => { onBrand(); scrollToId('top'); }}>TIRTHAPADA<span>.</span></button>
      <div className={`nav-links ${open ? 'open' : ''}`}>
        {links.map(([label, id]) => <a data-testid={`link-${id}`} key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button className="nav-ping" aria-label="Scroll to contact" data-testid="button-nav-contact" onClick={() => scrollToId('contact')}><span /></button>
        <button className="menu-toggle" aria-label="Toggle menu" data-testid="button-menu" onClick={() => setOpen(!open)}>{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </div>
  </nav>;
}

function Hero() {
  return <section className="container-wide hero" id="top">
    <div className="hero-copy">
      <div className="hero-kicker"><span className="status-dot" /> <span className="eyebrow">AI/ML · CYBERSECURITY · SOFTWARE</span></div>
      <h1>BUILDING<br /><span className="outline">INTELLIGENT</span><br />SYSTEMS.</h1>
      <p className="hero-description">I’m Tirthapada Panda, a computer science student passionate about Artificial Intelligence, Machine Learning, Cybersecurity and software development. I enjoy turning ideas into practical, intelligent and impactful projects.</p>
      <div className="actions">
        <a className="button button-primary" data-testid="link-view-work" href="#work">VIEW MY WORK <ArrowUpRight size={14} /></a>
        <a className="button button-ghost" data-testid="link-contact-hero" href="#contact"><span className="status-dot" /> CONTACT ME</a>
      </div>
    </div>
    <div className="id-stage">
      <div className="lanyard" />
      <div className="id-card" data-testid="card-profile">
        <img className="id-photo" src="/assets/full-body.jpeg" alt="Tirthapada Panda in a garden" />
        <div className="id-photo-overlay" />
        <div className="id-topline"><span>TP / 2026</span><div className="id-symbol">TP</div></div>
        <div className="id-bottom"><h3>TIRTHAPADA PANDA</h3><p>AI/ML · CYBERSECURITY · DEVELOPER</p></div>
      </div>
      <div className="scroll-note"><span className="scroll-line" /> SCROLL TO EXPLORE <ArrowDown size={12} /></div>
    </div>
  </section>;
}

function About({ selected, setSelected }: { selected: string; setSelected: (value: string) => void }) {
  return <section className="section" id="about">
    <div className="container-wide">
      <div className="section-heading"><div><div className="eyebrow">01 / ORIGIN</div><h2>BUILDING<br />WITH PURPOSE.</h2></div><p>A technical journey in progress — guided by curiosity, practice and the instinct to build.</p></div>
      <div className="about-grid">
        <div className="about-copy">
          <p>I’m currently exploring the intersection of Artificial Intelligence, Machine Learning, Cybersecurity and Software Development.</p>
          <p>I enjoy learning by building — from intelligent systems and AI-powered applications to cybersecurity-focused projects and full-stack web experiences.</p>
          <div className="stats"><div className="stat"><strong>9.02</strong><span>CURRENT CGPA</span></div><div className="stat"><strong>3</strong><span>HACKATHONS</span></div><div className="stat"><strong>1</strong><span>HACKATHON WIN</span></div></div>
        </div>
        <div className="toolkit" id="skills">
          <div className="toolkit-head"><span>02 / TOOLKIT</span><b>MY TOOLKIT</b></div>
          <div className="skill-chips">{skills.map((skill) => <button data-testid={`button-skill-${skill.replaceAll(' ', '-').replaceAll('&', 'and')}`} className={`skill-chip ${selected === skill ? 'selected' : ''}`} key={skill} onClick={() => setSelected(skill)}>{skill}</button>)}</div>
          <div className="skill-focus" data-testid="text-selected-skill"><strong>{selected}</strong><br />{skillDescriptions[selected] ?? 'A technology in the toolkit — selected for continued learning, building and experimentation.'}</div>
        </div>
      </div>
    </div>
  </section>;
}

function Projects() {
  const [active, setActive] = useState(0);
  const project = projects[active];
  return <section className="section" id="work">
    <div className="container-wide">
      <div className="section-heading"><div><div className="eyebrow">03 / OUTPUT</div><h2>SELECTED<br />PROJECTS.</h2></div><p>Projects are the lab notes: imperfect, practical and always moving forward.</p></div>
      <div className="projects-layout">
        <div>
          <div className="stack-wrap" data-testid="project-stack">
            {projects.map((item, index) => { const diff = (index - active + projects.length) % projects.length; return <button data-testid={`button-project-card-${item.number}`} key={item.number} className="project-card" onClick={() => setActive(index)} style={{ transform: `translateY(${diff * 35}px) scale(${1 - diff * .05}) rotateX(${diff * 2}deg)`, zIndex: projects.length - diff, opacity: diff > 2 ? .2 : 1, pointerEvents: diff > 2 ? 'none' : 'auto' }}><video src="/assets/ambient.mp4" autoPlay muted loop playsInline aria-hidden="true" /><div className="project-meta"><small>PROJECT / {item.number}</small><h3>{item.title}</h3></div></button>; })}
          </div>
          <div className="stack-controls"><button className="square-button" aria-label="Previous project" data-testid="button-project-prev" onClick={() => setActive((active - 1 + projects.length) % projects.length)}><ArrowLeft size={15} /></button><button className="square-button" aria-label="Next project" data-testid="button-project-next" onClick={() => setActive((active + 1) % projects.length)}><ArrowRight size={15} /></button><span className="mono muted" style={{ fontSize: 10, padding: '12px 5px' }}>CLICK A CARD TO BRING IT FORWARD</span></div>
        </div>
        <div className="project-info" data-testid="panel-project-info"><span className="info-num">PROJECT {project.number} / SELECTED</span><h3>{project.title}</h3><p>{project.desc}</p><div className="tag-row">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><button className="button button-ghost" data-testid="button-explore-project" onClick={() => alert('Project links will be added when available.')}>EXPLORE PROJECT <ArrowUpRight size={14} /></button></div>
      </div>
    </div>
  </section>;
}

function AiCore() {
  const [selected, setSelected] = useState('DATA');
  const activeNode = nodes.find((node) => node.name === selected);
  return <section className="section" id="core">
    <div className="container-wide core-wrap">
      <div className="core-copy"><div className="eyebrow">04 / INTELLIGENCE MAP</div><h2>THE<br /><span className="outline">AI CORE.</span></h2><p>A small map of the ideas currently connected in my head. Select a node to inspect its place in the system.</p><div className="tag-row"><span className="tag">MOUSE-RESPONSIVE</span><span className="tag">LIVE GRAPH</span></div></div>
      <div className="core-visual" data-testid="visual-ai-core">
        {nodes.slice(0, 7).map((node, index) => <span key={node.name} className={`node ${selected === node.name ? 'focused' : ''}`} data-name={node.name} style={{ left: node.x, top: node.y }} onClick={() => setSelected(node.name)} />)}
        {[['49%','22%','25%','38%'],['49%','22%','70%','35%'],['49%','22%','49%','52%'],['49%','52%','31%','67%'],['49%','52%','71%','64%'],['49%','52%','17%','76%'],['49%','52%','84%','80%']].map(([x1,y1,x2,y2], index) => { const dx = parseFloat(x2) - parseFloat(x1); const dy = parseFloat(y2) - parseFloat(y1); const length = Math.sqrt(dx*dx + dy*dy) * 3.15; const angle = Math.atan2(dy, dx) * 180 / Math.PI; return <span className="connection" key={index} style={{ left: x1, top: y1, width: `${length}%`, transform: `rotate(${angle}deg)` }} />; })}
        <div className="node-info" data-testid="text-node-info"><strong>{activeNode?.name ?? selected}</strong>{selected === 'DATA' ? 'The material every model, algorithm and useful decision depends on.' : 'A connected area I am actively learning, testing and building with.'}</div>
      </div>
    </div>
  </section>;
}

function Workstation({ selectedSkill, setSelectedSkill }: { selectedSkill: string; setSelectedSkill: (skill: string) => void }) {
  return <section className="workstation section" id="workstation">
    <div className="container-wide"><div className="eyebrow" style={{ textAlign: 'center' }}>05 / INTERFACE LAB</div><h2>WORKSTATION</h2><div className="desk"><div className="monitor" /><div className="monitor-stand" />{orbSkills.map((skill) => <button key={skill} data-testid={`button-orb-${skill}`} className="skill-orb" onClick={() => setSelectedSkill(selectedSkill === skill ? '' : skill)}>{skill}</button>)}</div><div className="workstation-detail" data-testid="text-workstation-detail">{selectedSkill ? <><strong>{selectedSkill}</strong> — {skillDescriptions[selectedSkill] ?? 'A tool, concept or system I am exploring through projects and practice.'} <button className="button button-ghost" style={{ marginTop: 14, minHeight: 34, padding: '0 12px' }} onClick={() => setSelectedSkill('')}>CLOSE</button></> : 'CLICK A SKILL TO PULL IT OUT OF THE SCREEN.'}</div></div>
  </section>;
}

function Expertise() {
  const [open, setOpen] = useState(0);
  return <section className="section" id="expertise">
    <div className="container-wide"><div className="section-heading"><div><div className="eyebrow">06 / DIRECTION</div><h2>AREAS OF<br /><span className="outline">EXPERTISE.</span></h2></div><p>Not a list of claims. A living syllabus of things I work with and want to understand better.</p></div><div>{expertise.map(([num, title, detail], index) => <div key={num} style={{ borderTop: '1px solid rgba(204,234,222,.15)' }}><button data-testid={`button-expertise-${num}`} onClick={() => setOpen(open === index ? -1 : index)} style={{ display: 'flex', width: '100%', justifyContent: 'space-between', alignItems: 'center', padding: '22px 0', color: open === index ? '#00df8f' : '#d9e6e0', background: 'none', border: 0, cursor: 'pointer', textAlign: 'left' }}><span className="mono" style={{ fontSize: 10 }}>{num}</span><strong style={{ flex: 1, marginLeft: 25, font: '600 clamp(21px, 3vw, 36px) var(--app-font-display)', letterSpacing: '-.05em' }}>{title}</strong><span style={{ fontSize: 20 }}>{open === index ? '−' : '+'}</span></button>{open === index && <div style={{ padding: '0 55px 25px', color: '#93a6a0', font: '13px/1.7 var(--app-font-mono)' }}>{detail}</div>}</div>)}</div></div>
  </section>;
}

function Achievements() {
  const [certOpen, setCertOpen] = useState('');
  const certs = ['AI / MACHINE LEARNING', 'CYBERSECURITY', 'PROGRAMMING'];
  return <section className="section" id="achievements">
    <div className="container-wide"><div className="section-heading"><div><div className="eyebrow">07 / PROOF OF WORK</div><h2>ACHIEVEMENTS.</h2></div><p>Milestones that reflect consistent learning, participation and showing up to build.</p></div><div className="achievements-grid"><article className="achievement featured"><span className="corner">01</span><div className="big">IIT<br />GUWAHATI</div><h3>HACKATHON PARTICIPATION</h3><p>A notable participation in an IIT Guwahati hackathon. Event specifics are intentionally left open until verified.</p></article><article className="achievement"><span className="corner">02</span><div className="big">9.02</div><h3>CURRENT CGPA</h3></article><article className="achievement"><span className="corner">03</span><div className="big">3</div><h3>HACKATHONS PARTICIPATED</h3></article><article className="achievement"><span className="corner">04</span><div className="big">1</div><h3>HACKATHON WIN</h3></article></div><div className="archive"><div className="archive-title"><h3>KNOWLEDGE ARCHIVE</h3><span className="eyebrow">CERTIFICATIONS / DETAILS PENDING</span></div><div className="cert-list">{certs.map((cert) => <button data-testid={`button-cert-${cert.split(' ')[0]}`} key={cert} className={`cert ${certOpen === cert ? 'open' : ''}`} onClick={() => setCertOpen(certOpen === cert ? '' : cert)}><small>ARCHIVE NODE</small><strong>{cert}</strong>{certOpen === cert && <p>Editable placeholder — certification name, issuer and verification link will be added when provided.</p>}</button>)}</div></div></div>
  </section>;
}

function TerminalSection() {
  return <section className="section" id="terminal"><div className="container-wide terminal-wrap"><div className="terminal-copy"><div className="eyebrow">08 / SIMULATION ONLY</div><h2>SECURITY<br /><span className="outline">TERMINAL.</span></h2><p>A visual command line for the habits behind the work. No commands execute here — the interface is theatre, the curiosity is real.</p><span className="mono" style={{ color: '#00df8f', fontSize: 11 }}>BUILD · LEARN · SECURE · CREATE</span></div><div className="terminal" data-testid="visual-terminal"><div className="terminal-bar"><i /><i /><i /><span style={{ marginLeft: 6 }}>tirthapada@local / portfolio</span><Terminal size={13} style={{ marginLeft: 'auto' }} /></div><div className="terminal-body"><div className="dim"># visual simulation — no commands are executed</div><div><span className="prompt">$</span> <span className="command">python analyze.py</span></div><div>→ scanning signal patterns... <span style={{ color: '#00df8f' }}>done</span></div><div><span className="prompt">$</span> <span className="command">nmap -sV target</span></div><div>→ learning the surface area of systems...</div><div><span className="prompt">$</span> <span className="command">git status</span></div><div>→ building / experimenting / iterating</div><div><span className="prompt">$</span> <span className="command">python train.py</span><span className="cursor" /></div></div></div></div></section>;
}

function Contact({ onResume }: { onResume: () => void }) {
  return <footer className="contact" id="contact"><div className="container-wide"><div className="contact-grid"><div className="contact-copy"><div className="eyebrow">09 / NEXT SIGNAL</div><h2>LET'S BUILD<br />SOMETHING.</h2><p>I’m always interested in learning, building meaningful projects, exploring new technologies and connecting with people who enjoy creating things.</p><div className="actions" style={{ marginTop: 28 }}><button className="button button-primary" data-testid="button-email" onClick={() => alert('Contact details will be added when available.')}>GET IN TOUCH <ArrowUpRight size={14} /></button><button className="button button-ghost" data-testid="button-resume" onClick={onResume}><ScanLine size={14} /> ACCESS RESUME</button></div></div><div className="contact-side"><div><h4>MENU</h4>{[['ABOUT','about'],['WORK','work'],['SKILLS','skills'],['ACHIEVEMENTS','achievements'],['CONTACT','contact']].map(([label,id]) => <a data-testid={`link-footer-${id}`} href={`#${id}`} key={id}>{label}</a>)}</div><div><h4>SOCIALS / PLACEHOLDER</h4><button data-testid="button-github" onClick={() => alert('GitHub link will be added when available.')}><Github size={13} style={{ verticalAlign: 'middle', marginRight: 6 }} /> GitHub</button><button data-testid="button-linkedin" onClick={() => alert('LinkedIn link will be added when available.')}><Linkedin size={13} style={{ verticalAlign: 'middle', marginRight: 6 }} /> LinkedIn</button></div></div></div><div className="footer-bottom"><span>© 2026 TIRTHAPADA PANDA. ALL RIGHTS RESERVED.</span><span className="mono">SYSTEM / READY</span></div></div></footer>;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('Python');
  const [egg, setEgg] = useState(false);
  const [brandClicks, setBrandClicks] = useState(0);
  const [resumeState, setResumeState] = useState(false);
  const reducedMotion = useMemo(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false, []);
  useEffect(() => { const timer = window.setTimeout(() => setLoading(false), reducedMotion ? 200 : 1200); return () => window.clearTimeout(timer); }, [reducedMotion]);
  useEffect(() => { if (brandClicks >= 5) { setEgg(true); setBrandClicks(0); window.setTimeout(() => setEgg(false), 3600); } }, [brandClicks]);
  const handleResume = () => { setResumeState(true); window.setTimeout(() => setResumeState(false), 2300); };
  return <div className="portfolio-shell grain">
    <Loader done={!loading} />
    <div className="video-backdrop"><video autoPlay muted loop playsInline src="/assets/ambient.mp4" aria-label="Cinematic ambient background video" /><div className="video-tint" /></div>
    <Navigation open={menuOpen} setOpen={setMenuOpen} onBrand={() => setBrandClicks((value) => value + 1)} />
    <main><Hero /><About selected={selectedSkill} setSelected={setSelectedSkill} /><Projects /><AiCore /><Workstation selectedSkill={selectedSkill} setSelectedSkill={setSelectedSkill} /><Expertise /><Achievements /><TerminalSection /><Contact onResume={handleResume} /></main>
    {resumeState && <div className="egg" data-testid="status-resume"><LockKeyhole size={13} style={{ verticalAlign: 'middle', marginRight: 8 }} /> ACCESS GRANTED — RESUME FILE PENDING</div>}
    {egg && <div className="egg" data-testid="status-easter-egg"><ShieldCheck size={13} style={{ verticalAlign: 'middle', marginRight: 8 }} /> ACCESS LEVEL: DEVELOPER</div>}
  </div>;
}

export default App;