interface ProjectPreviewPlaceholderProps {
  projectName: string;
  image?: string;
  aspect?: 'video' | 'wide';
  className?: string;
}

export default function ProjectPreviewPlaceholder({
  projectName,
  image,
  aspect = 'video',
  className = '',
}: ProjectPreviewPlaceholderProps) {
  if (image) {
    return (
      <div className={`overflow-hidden rounded-sm border border-border ${className}`}>
        <img
          src={image}
          alt={`${projectName} interface preview`}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const aspectClass = aspect === 'wide' ? 'aspect-[21/9]' : 'aspect-[16/10]';
  const lc = projectName.toLowerCase();

  return (
    <div
      className={`relative w-full ${aspectClass} rounded-sm border border-border bg-[#141210] overflow-hidden select-none ${className}`}
      aria-label={`${projectName} schematic interface preview`}
      role="img"
    >
      {/* Chrome Window Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-3 py-2 border-b border-border/70 bg-surface-raised/60 backdrop-blur-xs z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#3d3830]" />
          <span className="w-2 h-2 rounded-full bg-[#3d3830]" />
          <span className="w-2 h-2 rounded-full bg-[#3d3830]" />
          <span className="ml-2 font-mono text-[10px] text-text-muted/80 tracking-wider">
            {lc}.app / schematic
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-widest text-accent/70 px-1.5 py-0.5 rounded bg-accent/5 border border-accent/20">
          Wireframe
        </span>
      </div>

      {/* Wireframe Canvas */}
      <div className="absolute inset-0 top-7 flex items-center justify-center p-2">
        {lc.includes('fit') && <FitFlowWireframe />}
        {lc.includes('ghost') && <GhostTrafficWireframe />}
        {lc.includes('campus') && <CampusQueryWireframe />}
        {!lc.includes('fit') && !lc.includes('ghost') && !lc.includes('campus') && <GenericWireframe />}
      </div>
    </div>
  );
}

/** FitFlow: Workout tracking dashboard schematic with telemetry metrics and volume progress */
function FitFlowWireframe() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* Sidebar Navigation */}
      <rect x="0" y="0" width="68" height="200" fill="#181614" stroke="#2a2622" strokeWidth="0.75" />
      {[16, 38, 60, 82].map((y, i) => (
        <g key={y}>
          <rect
            x="8"
            y={y}
            width="10"
            height="10"
            rx="2"
            fill={i === 1 ? '#c8a96e' : '#4a433b'}
            opacity={i === 1 ? 0.9 : 0.4}
          />
          <rect
            x="24"
            y={y + 2.5}
            width={i === 1 ? 34 : 26}
            height="5"
            rx="1.5"
            fill={i === 1 ? '#c8a96e' : '#6b6158'}
            opacity={i === 1 ? 0.9 : 0.45}
          />
        </g>
      ))}

      {/* Metric Cards Top Row */}
      <g transform="translate(78, 12)">
        {/* Card 1: Volume */}
        <rect x="0" y="0" width="70" height="38" rx="3" fill="#1b1816" stroke="#2d2925" strokeWidth="0.75" />
        <rect x="8" y="8" width="28" height="4" rx="1" fill="#7a7065" />
        <rect x="8" y="16" width="40" height="9" rx="1.5" fill="#c8a96e" opacity="0.85" />
        <rect x="8" y="29" width="50" height="2" rx="1" fill="#423b34" />
        <rect x="8" y="29" width="32" height="2" rx="1" fill="#c8a96e" />

        {/* Card 2: Frequency */}
        <rect x="76" y="0" width="70" height="38" rx="3" fill="#1b1816" stroke="#2d2925" strokeWidth="0.75" />
        <rect x="84" y="8" width="32" height="4" rx="1" fill="#7a7065" />
        <rect x="84" y="16" width="36" height="9" rx="1.5" fill="#f0ece6" opacity="0.8" />
        <rect x="84" y="29" width="50" height="2" rx="1" fill="#423b34" />
        <rect x="84" y="29" width="42" height="2" rx="1" fill="#7fbf7f" />

        {/* Card 3: Intensity */}
        <rect x="152" y="0" width="70" height="38" rx="3" fill="#1b1816" stroke="#2d2925" strokeWidth="0.75" />
        <rect x="160" y="8" width="28" height="4" rx="1" fill="#7a7065" />
        <rect x="160" y="16" width="42" height="9" rx="1.5" fill="#f0ece6" opacity="0.8" />
        <rect x="160" y="29" width="50" height="2" rx="1" fill="#423b34" />
        <rect x="160" y="29" width="24" height="2" rx="1" fill="#e8a44a" />

        {/* Card 4: Active Split */}
        <rect x="228" y="0" width="82" height="38" rx="3" fill="#1b1816" stroke="#2d2925" strokeWidth="0.75" />
        <rect x="236" y="8" width="36" height="4" rx="1" fill="#7a7065" />
        <rect x="236" y="16" width="48" height="8" rx="1.5" fill="#c8a96e" opacity="0.7" />
      </g>

      {/* Main Chart Panel: Weekly Lift Progression */}
      <g transform="translate(78, 58)">
        <rect x="0" y="0" width="216" height="92" rx="3" fill="#1a1815" stroke="#2d2925" strokeWidth="0.75" />
        {/* Chart Header */}
        <rect x="10" y="10" width="56" height="5" rx="1" fill="#908579" />
        <rect x="70" y="10" width="30" height="5" rx="1" fill="#4a4239" />
        {/* Grid lines */}
        <line x1="10" y1="32" x2="206" y2="32" stroke="#26221e" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="10" y1="52" x2="206" y2="52" stroke="#26221e" strokeWidth="0.5" strokeDasharray="3 3" />
        <line x1="10" y1="72" x2="206" y2="72" stroke="#26221e" strokeWidth="0.5" strokeDasharray="3 3" />

        {/* Bars */}
        {[
          { h: 32, x: 20 },
          { h: 44, x: 38 },
          { h: 36, x: 56 },
          { h: 52, x: 74 },
          { h: 48, x: 92 },
          { h: 60, x: 110 },
          { h: 55, x: 128 },
          { h: 66, x: 146 },
          { h: 58, x: 164 },
          { h: 68, x: 182 },
        ].map((bar, i) => {
          const isHighlight = i === 7 || i === 9;
          return (
            <g key={i}>
              <rect
                x={bar.x}
                y={76 - bar.h}
                width="11"
                height={bar.h}
                rx="2"
                fill={isHighlight ? '#c8a96e' : '#453e36'}
                opacity={isHighlight ? 0.95 : 0.6}
              />
            </g>
          );
        })}
      </g>

      {/* Routine Sidebar / Log Panel */}
      <g transform="translate(302, 58)">
        <rect x="0" y="0" width="86" height="92" rx="3" fill="#1a1815" stroke="#2d2925" strokeWidth="0.75" />
        <rect x="8" y="10" width="46" height="5" rx="1" fill="#908579" />
        {[24, 40, 56, 72].map((y, i) => (
          <g key={y}>
            <circle cx="12" cy={y + 3} r="3" fill={i === 0 ? '#c8a96e' : '#453e36'} />
            <rect x="20" y={y} width="44" height="4" rx="1" fill="#6b6158" />
            <rect x="20" y={y + 5.5} width="28" height="3" rx="1" fill="#453e36" />
          </g>
        ))}
      </g>

      {/* Footer Track / Log strip */}
      <g transform="translate(78, 158)">
        <rect x="0" y="0" width="310" height="26" rx="3" fill="#181614" stroke="#2d2925" strokeWidth="0.75" />
        <rect x="10" y="8" width="70" height="5" rx="1" fill="#7a7065" />
        <rect x="100" y="8" width="50" height="5" rx="1" fill="#4a4239" />
        <rect x="170" y="8" width="60" height="5" rx="1" fill="#4a4239" />
        <rect x="260" y="6" width="40" height="12" rx="2" fill="#c8a96e" opacity="0.2" />
        <rect x="266" y="10" width="28" height="4" rx="1" fill="#c8a96e" />
      </g>
    </svg>
  );
}

/** GhostTraffic: Real-time traffic analysis, packet flow telemetry, network inspection */
function GhostTrafficWireframe() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* Top Filter & Protocol Toolbar */}
      <rect x="10" y="6" width="380" height="22" rx="2" fill="#181613" stroke="#2d2924" strokeWidth="0.75" />
      {[
        { label: 'ALL FLOWS', w: 46, active: true },
        { label: 'TCP/IP', w: 36, active: false },
        { label: 'UDP', w: 26, active: false },
        { label: 'HTTP/S', w: 38, active: false },
        { label: 'ANOMALIES', w: 56, active: false },
      ].map((tab, i) => {
        const xOffsets = [18, 72, 116, 150, 196];
        return (
          <rect
            key={i}
            x={xOffsets[i]}
            y="10"
            width={tab.w}
            height="14"
            rx="2"
            fill={tab.active ? '#e8a44a' : '#282420'}
            opacity={tab.active ? 0.9 : 0.6}
          />
        );
      })}

      {/* Traffic Table Header */}
      <rect x="10" y="34" width="380" height="16" fill="#1f1b17" stroke="#2d2924" strokeWidth="0.5" />
      <rect x="18" y="39" width="32" height="5" rx="1" fill="#756b60" />
      <rect x="68" y="39" width="56" height="5" rx="1" fill="#756b60" />
      <rect x="146" y="39" width="56" height="5" rx="1" fill="#756b60" />
      <rect x="224" y="39" width="40" height="5" rx="1" fill="#756b60" />
      <rect x="286" y="39" width="36" height="5" rx="1" fill="#756b60" />
      <rect x="344" y="39" width="36" height="5" rx="1" fill="#756b60" />

      {/* Traffic Rows */}
      {[
        { time: '0.001', flag: false, status: 'pass' },
        { time: '0.014', flag: false, status: 'pass' },
        { time: '0.029', flag: true, status: 'anomaly' },
        { time: '0.045', flag: false, status: 'pass' },
        { time: '0.061', flag: false, status: 'pass' },
        { time: '0.082', flag: true, status: 'warning' },
        { time: '0.098', flag: false, status: 'pass' },
      ].map((row, idx) => {
        const y = 54 + idx * 16;
        const isAnomaly = row.flag;
        return (
          <g key={idx}>
            {isAnomaly && (
              <rect x="10" y={y - 2} width="380" height="15" fill="#e8a44a" opacity="0.08" />
            )}
            {/* Timestamp */}
            <rect x="18" y={y + 2} width="28" height="4" rx="1" fill="#595046" />
            {/* Source IP */}
            <rect x="68" y={y + 2} width="52" height="4" rx="1" fill={isAnomaly ? '#e8a44a' : '#857a6e'} />
            {/* Destination */}
            <rect x="146" y={y + 2} width="52" height="4" rx="1" fill="#6e6459" />
            {/* Protocol tag */}
            <rect
              x="224"
              y={y + 1}
              width="26"
              height="7"
              rx="1.5"
              fill={isAnomaly ? '#e8a44a' : '#3d3730'}
              opacity={isAnomaly ? 0.85 : 0.5}
            />
            {/* Packet Size */}
            <rect x="286" y={y + 2} width="28" height="4" rx="1" fill="#6e6459" />
            {/* Status dot */}
            <circle
              cx="356"
              cy={y + 4.5}
              r="2.5"
              fill={row.status === 'anomaly' ? '#e8a44a' : row.status === 'warning' ? '#c8a96e' : '#7fbf7f'}
            />
          </g>
        );
      })}

      {/* Waveform / Telemetry Frequency Bar at Bottom */}
      <g transform="translate(10, 168)">
        <rect x="0" y="0" width="380" height="24" rx="2" fill="#181613" stroke="#2d2924" strokeWidth="0.75" />
        {Array.from({ length: 38 }).map((_, i) => {
          const h = Math.abs(Math.sin(i * 0.45)) * 12 + Math.cos(i * 1.1) * 3 + 4;
          const isSpike = i === 14 || i === 27;
          return (
            <rect
              key={i}
              x={6 + i * 9.8}
              y={20 - h}
              width="5.5"
              height={h}
              rx="1"
              fill={isSpike ? '#e8a44a' : '#453e36'}
              opacity={isSpike ? 0.9 : 0.5}
            />
          );
        })}
      </g>
    </svg>
  );
}

/** Campus Query: RAG-based campus knowledge chatbot schematic */
function CampusQueryWireframe() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      {/* Sidebar: Knowledge Indices */}
      <rect x="10" y="8" width="90" height="184" rx="2" fill="#181616" stroke="#2b2628" strokeWidth="0.75" />
      <rect x="18" y="18" width="58" height="5" rx="1" fill="#9b8ec4" opacity="0.8" />
      {[32, 48, 64, 80, 96, 112].map((y, i) => (
        <g key={y}>
          <rect
            x="18"
            y={y}
            width={i === 0 ? 64 : 50}
            height="8"
            rx="1.5"
            fill={i === 0 ? '#2a2430' : '#1e1a20'}
          />
          <circle cx="24" cy={y + 4} r="2" fill={i === 0 ? '#9b8ec4' : '#52495a'} />
          <rect
            x="32"
            y={y + 2.5}
            width={i === 0 ? 44 : 32}
            height="3"
            rx="0.5"
            fill={i === 0 ? '#9b8ec4' : '#6b6170'}
          />
        </g>
      ))}

      {/* Query Header / Retrieval Context */}
      <g transform="translate(110, 8)">
        <rect x="0" y="0" width="280" height="32" rx="2" fill="#19171a" stroke="#2b2628" strokeWidth="0.75" />
        <rect x="12" y="8" width="160" height="5" rx="1" fill="#f0ece6" opacity="0.8" />
        <rect x="12" y="18" width="100" height="4" rx="1" fill="#756b78" />
        <circle cx="260" cy="16" r="6" fill="#9b8ec4" opacity="0.2" />
        <circle cx="260" cy="16" r="3" fill="#9b8ec4" />
      </g>

      {/* RAG Retrieval Document Snippets */}
      <g transform="translate(110, 46)">
        <rect x="0" y="0" width="280" height="74" rx="2" fill="#171518" stroke="#2b2628" strokeWidth="0.75" />
        <rect x="10" y="8" width="70" height="4" rx="1" fill="#9b8ec4" opacity="0.7" />
        {[20, 32, 44, 56].map((y, i) => (
          <rect
            key={y}
            x="10"
            y={y}
            width={[240, 260, 210, 130][i]}
            height="4"
            rx="1"
            fill="#5e5564"
            opacity={i === 0 ? 0.9 : 0.6}
          />
        ))}
      </g>

      {/* Retrieved Source Citations */}
      <g transform="translate(110, 126)">
        {['Syllabus DB', 'Academic Regs', 'Campus FAQ'].map((src, i) => (
          <g key={src} transform={`translate(${i * 92}, 0)`}>
            <rect x="0" y="0" width="86" height="18" rx="2" fill="#1e1a22" stroke="#2b2628" strokeWidth="0.5" />
            <circle cx="8" cy="9" r="2" fill="#9b8ec4" />
            <rect x="14" y="6.5" width="58" height="4" rx="1" fill="#84788c" />
          </g>
        ))}
      </g>

      {/* Interactive Input Prompt Bar */}
      <g transform="translate(110, 152)">
        <rect x="0" y="0" width="280" height="28" rx="3" fill="#1a181b" stroke="#3d3446" strokeWidth="0.75" />
        <rect x="12" y="11" width="160" height="5" rx="1" fill="#665b6e" />
        <rect x="250" y="6" width="22" height="16" rx="2" fill="#9b8ec4" opacity="0.85" />
      </g>
    </svg>
  );
}

/** Generic fallback wireframe */
function GenericWireframe() {
  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 400 200"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <rect x="20" y="20" width="360" height="160" rx="3" fill="#181614" stroke="#2d2925" strokeWidth="0.75" />
      <rect x="36" y="36" width="180" height="7" rx="1.5" fill="#7a7065" />
      <rect x="36" y="52" width="120" height="5" rx="1" fill="#4a4239" />
      <rect x="36" y="68" width="140" height="5" rx="1" fill="#4a4239" />
    </svg>
  );
}