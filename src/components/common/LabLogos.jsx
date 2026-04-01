// Lab Logo Options for Suárez-Fariñas Lab

// Idea A: The Inflamed Node — digital/organic hybrid network
export function InflamedNode({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Central node — warm gradient */}
      <defs>
        <radialGradient id="nodeGrad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#c0483a" />
          <stop offset="100%" stopColor="#8b3028" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="14" fill="url(#nodeGrad)" />
      <circle cx="50" cy="50" r="14" stroke="#d4594b" strokeWidth="1.5" fill="none" opacity="0.5" />

      {/* Geometric/digital connections (right side) */}
      <line x1="64" y1="50" x2="88" y2="50" stroke="#c0483a" strokeWidth="1.5" opacity="0.7" />
      <line x1="60" y1="38" x2="80" y2="22" stroke="#c0483a" strokeWidth="1.5" opacity="0.6" />
      <line x1="60" y1="62" x2="80" y2="78" stroke="#c0483a" strokeWidth="1.5" opacity="0.6" />
      <circle cx="88" cy="50" r="4" fill="#c0483a" opacity="0.8" />
      <circle cx="80" cy="22" r="3.5" fill="#c0483a" opacity="0.6" />
      <circle cx="80" cy="78" r="3.5" fill="#c0483a" opacity="0.6" />

      {/* Organic/biological connections (left side) */}
      <path d="M36 50 Q25 45 14 48" stroke="#2c9e8c" strokeWidth="1.5" fill="none" opacity="0.7" />
      <path d="M40 38 Q30 28 18 25" stroke="#2c9e8c" strokeWidth="1.5" fill="none" opacity="0.6" />
      <path d="M40 62 Q30 72 18 75" stroke="#2c9e8c" strokeWidth="1.5" fill="none" opacity="0.6" />
      <circle cx="14" cy="48" r="4" fill="#2c9e8c" opacity="0.7" />
      <circle cx="18" cy="25" r="3" fill="#2c9e8c" opacity="0.5" />
      <circle cx="18" cy="75" r="3" fill="#2c9e8c" opacity="0.5" />

      {/* Small inner structure */}
      <circle cx="50" cy="50" r="6" fill="#8b3028" opacity="0.5" />
    </svg>
  )
}

// Idea B: The Sigmoid Cell — ML activation function as biology
export function SigmoidCell({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="sigGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2c9e8c" />
          <stop offset="50%" stopColor="#c0483a" />
          <stop offset="100%" stopColor="#8b3028" />
        </linearGradient>
      </defs>

      {/* Cell membrane circle */}
      <circle cx="50" cy="50" r="38" stroke="#a08070" strokeWidth="1.5" fill="none" opacity="0.3" />

      {/* Sigmoid curve — the S */}
      <path
        d="M15 72 C15 72 30 72 38 62 C46 52 42 48 50 38 C58 28 62 28 70 28 C78 28 85 28 85 28"
        stroke="url(#sigGrad)"
        strokeWidth="3.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Nucleus at inflection point */}
      <circle cx="50" cy="50" r="7" fill="#c0483a" opacity="0.3" />
      <circle cx="50" cy="50" r="4" fill="#6b3535" opacity="0.6" />

      {/* Data points along curve */}
      <circle cx="22" cy="70" r="2.5" fill="#2c9e8c" opacity="0.7" />
      <circle cx="35" cy="64" r="2" fill="#2c9e8c" opacity="0.6" />
      <circle cx="65" cy="32" r="2" fill="#c0483a" opacity="0.6" />
      <circle cx="78" cy="28" r="2.5" fill="#8b3028" opacity="0.7" />

      {/* Axis whiskers */}
      <line x1="10" y1="78" x2="10" y2="22" stroke="#a08070" strokeWidth="0.5" opacity="0.2" />
      <line x1="10" y1="78" x2="90" y2="78" stroke="#a08070" strokeWidth="0.5" opacity="0.2" />
    </svg>
  )
}

// Idea C: The Heatmap Eye — gene expression heatmap in a circle
export function HeatmapEye({ size = 40 }) {
  // Generate heatmap grid colors (teal=healthy → coral=inflamed)
  const colors = [
    ['#2c9e8c', '#3aaa96', '#5bb8a6', '#8bc4b0', '#c0483a'],
    ['#3aaa96', '#5bb8a6', '#d4a574', '#c06a4a', '#a83d30'],
    ['#5bb8a6', '#d4a574', '#c0483a', '#a83d30', '#8b3028'],
    ['#8bc4b0', '#c06a4a', '#a83d30', '#c0483a', '#d4594b'],
    ['#2c9e8c', '#3aaa96', '#d4a574', '#c06a4a', '#a83d30'],
  ]

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <clipPath id="circClip">
          <circle cx="50" cy="50" r="38" />
        </clipPath>
      </defs>

      {/* Heatmap grid clipped to circle */}
      <g clipPath="url(#circClip)">
        {colors.map((row, ri) =>
          row.map((color, ci) => (
            <rect
              key={`${ri}-${ci}`}
              x={12 + ci * 15.2}
              y={12 + ri * 15.2}
              width="15.2"
              height="15.2"
              fill={color}
              opacity="0.85"
            />
          ))
        )}
      </g>

      {/* Circle border */}
      <circle cx="50" cy="50" r="38" stroke="#5a4a3a" strokeWidth="2" fill="none" opacity="0.4" />

      {/* Subtle "eye" highlight */}
      <circle cx="50" cy="50" r="8" fill="white" opacity="0.15" />
      <circle cx="50" cy="50" r="3" fill="white" opacity="0.25" />
    </svg>
  )
}

// Idea D: The Dendritic Network — immune cell = neural network
export function DendriticNetwork({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <radialGradient id="dcGrad" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#d4961a" />
          <stop offset="100%" stopColor="#a87110" />
        </radialGradient>
      </defs>

      {/* Dendrite arms with branching — also looks like neural net */}
      {/* Arm 1: top */}
      <path d="M50 36 Q48 22 40 12" stroke="#c0483a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M45 20 Q38 14 30 16" stroke="#c0483a" strokeWidth="1.2" fill="none" opacity="0.6" />
      <circle cx="40" cy="12" r="3" fill="#c0483a" opacity="0.7" />
      <circle cx="30" cy="16" r="2" fill="#c0483a" opacity="0.5" />

      {/* Arm 2: top-right */}
      <path d="M60 40 Q72 30 82 24" stroke="#2c9e8c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M78 28 Q84 18 90 14" stroke="#2c9e8c" strokeWidth="1.2" fill="none" opacity="0.6" />
      <circle cx="82" cy="24" r="3" fill="#2c9e8c" opacity="0.7" />
      <circle cx="90" cy="14" r="2" fill="#2c9e8c" opacity="0.5" />

      {/* Arm 3: right */}
      <path d="M64 52 Q78 54 88 58" stroke="#c0483a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="88" cy="58" r="3" fill="#c0483a" opacity="0.7" />

      {/* Arm 4: bottom-right */}
      <path d="M58 62 Q68 74 76 84" stroke="#2c9e8c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M72 80 Q80 86 86 82" stroke="#2c9e8c" strokeWidth="1.2" fill="none" opacity="0.6" />
      <circle cx="76" cy="84" r="3" fill="#2c9e8c" opacity="0.7" />

      {/* Arm 5: bottom-left */}
      <path d="M42 62 Q32 74 22 80" stroke="#c0483a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M26 78 Q16 82 12 76" stroke="#c0483a" strokeWidth="1.2" fill="none" opacity="0.6" />
      <circle cx="22" cy="80" r="3" fill="#c0483a" opacity="0.7" />
      <circle cx="12" cy="76" r="2" fill="#c0483a" opacity="0.5" />

      {/* Arm 6: left */}
      <path d="M36 48 Q22 44 12 42" stroke="#2c9e8c" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="12" cy="42" r="3" fill="#2c9e8c" opacity="0.7" />

      {/* Central cell body */}
      <circle cx="50" cy="50" r="16" fill="url(#dcGrad)" opacity="0.9" />
      <circle cx="50" cy="50" r="16" stroke="#a87110" strokeWidth="1.5" fill="none" opacity="0.4" />

      {/* Nucleus */}
      <circle cx="50" cy="50" r="7" fill="#6b4510" opacity="0.6" />
      <circle cx="52" cy="48" r="2.5" fill="#4a3010" opacity="0.5" />
    </svg>
  )
}

// Idea E: The Volcano Plot — iconic genomics visualization
export function VolcanoPlot({ size = 40 }) {
  // Scattered dots: x = fold change, y = significance
  const dots = [
    // Left significant (teal — downregulated)
    { x: 15, y: 18, r: 2.5, color: '#2c9e8c', op: 0.8 },
    { x: 20, y: 22, r: 2, color: '#2c9e8c', op: 0.7 },
    { x: 12, y: 28, r: 2.5, color: '#2c9e8c', op: 0.6 },
    { x: 18, y: 32, r: 1.8, color: '#2c9e8c', op: 0.5 },
    // Right significant (coral — upregulated/inflamed)
    { x: 82, y: 16, r: 3, color: '#c0483a', op: 0.9 },
    { x: 78, y: 24, r: 2.5, color: '#c0483a', op: 0.8 },
    { x: 85, y: 20, r: 2, color: '#c0483a', op: 0.7 },
    { x: 75, y: 30, r: 2, color: '#c0483a', op: 0.6 },
    { x: 88, y: 28, r: 2.5, color: '#c0483a', op: 0.7 },
    // Non-significant (gray — middle/bottom)
    { x: 42, y: 60, r: 1.5, color: '#a09080', op: 0.3 },
    { x: 48, y: 55, r: 1.5, color: '#a09080', op: 0.3 },
    { x: 52, y: 58, r: 1.5, color: '#a09080', op: 0.25 },
    { x: 55, y: 65, r: 1.5, color: '#a09080', op: 0.3 },
    { x: 45, y: 68, r: 1.5, color: '#a09080', op: 0.25 },
    { x: 50, y: 72, r: 1.5, color: '#a09080', op: 0.2 },
    { x: 38, y: 52, r: 1.5, color: '#a09080', op: 0.3 },
    { x: 58, y: 50, r: 1.5, color: '#a09080', op: 0.3 },
    { x: 35, y: 62, r: 1.5, color: '#a09080', op: 0.25 },
    { x: 62, y: 64, r: 1.5, color: '#a09080', op: 0.25 },
    { x: 40, y: 75, r: 1.5, color: '#a09080', op: 0.2 },
    { x: 60, y: 74, r: 1.5, color: '#a09080', op: 0.2 },
    { x: 50, y: 45, r: 1.5, color: '#a09080', op: 0.35 },
    { x: 44, y: 42, r: 1.5, color: '#a09080', op: 0.3 },
    { x: 56, y: 40, r: 1.5, color: '#a09080', op: 0.3 },
    // Borderline
    { x: 30, y: 38, r: 1.8, color: '#a09080', op: 0.35 },
    { x: 68, y: 36, r: 1.8, color: '#a09080', op: 0.35 },
  ]

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* Circular boundary */}
      <circle cx="50" cy="50" r="42" stroke="#a08070" strokeWidth="1" fill="none" opacity="0.2" />

      <defs>
        <clipPath id="volcClip">
          <circle cx="50" cy="50" r="41" />
        </clipPath>
      </defs>

      <g clipPath="url(#volcClip)">
        {/* Significance threshold line */}
        <line x1="8" y1="35" x2="92" y2="35" stroke="#a08070" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.3" />

        {/* Fold change threshold lines */}
        <line x1="30" y1="8" x2="30" y2="92" stroke="#a08070" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.2" />
        <line x1="70" y1="8" x2="70" y2="92" stroke="#a08070" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.2" />

        {/* Dots */}
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.r} fill={d.color} opacity={d.op} />
        ))}
      </g>
    </svg>
  )
}

// Idea F: The Cuban Tile Cell — geometric mosaic pattern
export function CubanTileCell({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <clipPath id="tileClip">
          <circle cx="50" cy="50" r="40" />
        </clipPath>
      </defs>

      <g clipPath="url(#tileClip)">
        {/* Background */}
        <circle cx="50" cy="50" r="40" fill="#faf7f4" />

        {/* Cuban tile pattern — geometric star */}
        {/* Center diamond */}
        <polygon points="50,20 80,50 50,80 20,50" fill="#c0483a" opacity="0.7" />

        {/* Corner triangles */}
        <polygon points="10,10 50,20 20,50" fill="#2c9e8c" opacity="0.6" />
        <polygon points="90,10 80,50 50,20" fill="#d4961a" opacity="0.6" />
        <polygon points="90,90 50,80 80,50" fill="#2c9e8c" opacity="0.6" />
        <polygon points="10,90 20,50 50,80" fill="#d4961a" opacity="0.6" />

        {/* Inner diamond */}
        <polygon points="50,32 68,50 50,68 32,50" fill="#faf7f4" opacity="0.8" />

        {/* Center dot — nucleus */}
        <circle cx="50" cy="50" r="6" fill="#6b3535" opacity="0.5" />
        <circle cx="50" cy="50" r="3" fill="#4a2020" opacity="0.4" />
      </g>

      {/* Border */}
      <circle cx="50" cy="50" r="40" stroke="#8b7060" strokeWidth="2" fill="none" opacity="0.4" />
    </svg>
  )
}

// Idea G: The Immune Network — immune system as neural network layers
// DC (input) → T-cells (hidden) → Response (output)
export function ImmuneNetwork({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      {/* === INPUT LAYER: Dendritic Cells (left) === */}
      {/* DC 1 — top */}
      <circle cx="14" cy="25" r="6" fill="#c4910f" opacity="0.85" />
      {/* DC dendrite arms */}
      <path d="M8 25 Q4 20 3 16" stroke="#c4910f" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M8 25 Q4 28 2 33" stroke="#c4910f" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M14 19 Q12 14 10 10" stroke="#c4910f" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      {/* DC nucleus */}
      <circle cx="14" cy="25" r="2.5" fill="#7a5a08" opacity="0.6" />

      {/* DC 2 — middle */}
      <circle cx="14" cy="50" r="6" fill="#c4910f" opacity="0.85" />
      <path d="M8 50 Q3 46 1 42" stroke="#c4910f" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M8 50 Q3 54 1 58" stroke="#c4910f" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <circle cx="14" cy="50" r="2.5" fill="#7a5a08" opacity="0.6" />

      {/* DC 3 — bottom */}
      <circle cx="14" cy="75" r="6" fill="#c4910f" opacity="0.85" />
      <path d="M8 75 Q4 72 2 67" stroke="#c4910f" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M8 75 Q4 78 2 83" stroke="#c4910f" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <path d="M14 81 Q12 86 10 90" stroke="#c4910f" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <circle cx="14" cy="75" r="2.5" fill="#7a5a08" opacity="0.6" />

      {/* === CONNECTIONS: DC → T-cells (cytokine signals) === */}
      {/* DC1 → Th2, Th17 */}
      <line x1="20" y1="25" x2="38" y2="22" stroke="#d4961a" strokeWidth="1" opacity="0.35" />
      <line x1="20" y1="25" x2="38" y2="40" stroke="#d4961a" strokeWidth="0.8" opacity="0.25" />
      {/* DC2 → all T-cells */}
      <line x1="20" y1="50" x2="38" y2="22" stroke="#d4961a" strokeWidth="0.8" opacity="0.2" />
      <line x1="20" y1="50" x2="38" y2="40" stroke="#d4961a" strokeWidth="1" opacity="0.35" />
      <line x1="20" y1="50" x2="38" y2="58" stroke="#d4961a" strokeWidth="1" opacity="0.35" />
      <line x1="20" y1="50" x2="38" y2="76" stroke="#d4961a" strokeWidth="0.8" opacity="0.2" />
      {/* DC3 → Th22, Th17 */}
      <line x1="20" y1="75" x2="38" y2="58" stroke="#d4961a" strokeWidth="0.8" opacity="0.25" />
      <line x1="20" y1="75" x2="38" y2="76" stroke="#d4961a" strokeWidth="1" opacity="0.35" />

      {/* === HIDDEN LAYER: T-cell subtypes (middle) === */}
      {/* Th2 — red (atopic dermatitis) */}
      <circle cx="44" cy="22" r="7" fill="#a82830" opacity="0.85" />
      <circle cx="44" cy="22" r="3" fill="#5a1518" opacity="0.6" />
      <text x="44" y="11" textAnchor="middle" fill="#a82830" fontSize="6" fontWeight="bold" fontFamily="Inter, sans-serif" opacity="0.7">Th2</text>

      {/* Th17 — blue (psoriasis) */}
      <circle cx="44" cy="40" r="7" fill="#2840a0" opacity="0.85" />
      <circle cx="44" cy="40" r="3" fill="#141f55" opacity="0.6" />
      <text x="44" y="51" textAnchor="middle" fill="#2840a0" fontSize="6" fontWeight="bold" fontFamily="Inter, sans-serif" opacity="0.7">Th17</text>

      {/* Th22 — amber */}
      <circle cx="44" cy="58" r="6.5" fill="#a87810" opacity="0.85" />
      <circle cx="44" cy="58" r="2.8" fill="#5a4008" opacity="0.6" />
      <text x="44" y="68" textAnchor="middle" fill="#a87810" fontSize="6" fontWeight="bold" fontFamily="Inter, sans-serif" opacity="0.7">Th22</text>

      {/* Treg — green (regulatory) */}
      <circle cx="44" cy="76" r="6" fill="#2a7a50" opacity="0.75" />
      <circle cx="44" cy="76" r="2.5" fill="#154028" opacity="0.5" />
      <text x="44" y="86" textAnchor="middle" fill="#2a7a50" fontSize="6" fontWeight="bold" fontFamily="Inter, sans-serif" opacity="0.7">Treg</text>

      {/* === CONNECTIONS: T-cells → Output (cytokines as weights) === */}
      {/* Th2 → Inflammation (strong) */}
      <line x1="51" y1="22" x2="74" y2="30" stroke="#a82830" strokeWidth="1.8" opacity="0.5" />
      <text x="63" y="22" fill="#a82830" fontSize="5" fontFamily="Inter, sans-serif" opacity="0.5">IL-4</text>
      {/* Th17 → Inflammation (strong) */}
      <line x1="51" y1="40" x2="74" y2="30" stroke="#2840a0" strokeWidth="1.8" opacity="0.5" />
      <text x="63" y="39" fill="#2840a0" fontSize="5" fontFamily="Inter, sans-serif" opacity="0.5">IL-17</text>
      {/* Th22 → Inflammation (medium) */}
      <line x1="50" y1="58" x2="74" y2="30" stroke="#a87810" strokeWidth="1" opacity="0.3" />
      {/* Th2 → Tolerance (weak) */}
      <line x1="51" y1="22" x2="74" y2="68" stroke="#a82830" strokeWidth="0.5" opacity="0.15" />
      {/* Treg → Tolerance (strong — suppressive) */}
      <line x1="50" y1="76" x2="74" y2="68" stroke="#2a7a50" strokeWidth="2" opacity="0.5" />
      <text x="63" y="76" fill="#2a7a50" fontSize="5" fontFamily="Inter, sans-serif" opacity="0.5">IL-10</text>
      {/* Treg → Inflammation (inhibitory — dashed) */}
      <line x1="50" y1="76" x2="74" y2="30" stroke="#2a7a50" strokeWidth="1" strokeDasharray="2,2" opacity="0.3" />

      {/* === OUTPUT LAYER (right) === */}
      {/* Inflammation output — flame shape */}
      <path d="M80 24 Q82 18 80 14 Q84 18 86 14 Q84 20 86 24 Q84 28 83 30 Q82 28 80 30 Q81 28 80 24Z" fill="#c0483a" opacity="0.75" />
      <circle cx="83" cy="30" r="5" fill="#c0483a" opacity="0.2" />
      <text x="83" y="40" textAnchor="middle" fill="#8b3028" fontSize="5" fontFamily="Inter, sans-serif" opacity="0.6">inflam.</text>

      {/* Tolerance/healthy output — shield/checkmark */}
      <circle cx="83" cy="64" r="8" fill="#2a7a50" opacity="0.15" />
      <path d="M77 64 L81 68 L89 60" stroke="#2a7a50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
      <text x="83" y="78" textAnchor="middle" fill="#2a7a50" fontSize="5" fontFamily="Inter, sans-serif" opacity="0.6">tolerance</text>

      {/* Layer labels */}
      <text x="14" y="97" textAnchor="middle" fill="#8b7060" fontSize="4.5" fontFamily="Inter, sans-serif" opacity="0.4">input</text>
      <text x="44" y="97" textAnchor="middle" fill="#8b7060" fontSize="4.5" fontFamily="Inter, sans-serif" opacity="0.4">hidden</text>
      <text x="83" y="97" textAnchor="middle" fill="#8b7060" fontSize="4.5" fontFamily="Inter, sans-serif" opacity="0.4">output</text>
    </svg>
  )
}

// Idea H: The Activation Function Cell — neural network inside a cell
// A cell membrane containing a miniature neural net, with dendrites as I/O
export function ActivationCell({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <radialGradient id="acGrad" cx="50%" cy="45%">
          <stop offset="0%" stopColor="#f5efe8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#d8c4b0" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="acNucleus" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#6b3535" />
          <stop offset="100%" stopColor="#4a2020" />
        </radialGradient>
      </defs>

      {/* === INPUT DENDRITES (left side — biological arms) === */}
      <path d="M22 30 Q14 24 6 20" stroke="#c4910f" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M6 20 Q3 16 1 12" stroke="#c4910f" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M6 20 Q2 22 0 26" stroke="#c4910f" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <circle cx="6" cy="20" r="2" fill="#c4910f" opacity="0.6" />

      <path d="M20 50 Q12 50 4 48" stroke="#c4910f" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M4 48 Q1 44 0 40" stroke="#c4910f" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M4 48 Q1 52 0 56" stroke="#c4910f" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <circle cx="4" cy="48" r="2" fill="#c4910f" opacity="0.6" />

      <path d="M22 70 Q14 76 6 80" stroke="#c4910f" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <path d="M6 80 Q3 84 1 88" stroke="#c4910f" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M6 80 Q2 78 0 74" stroke="#c4910f" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <circle cx="6" cy="80" r="2" fill="#c4910f" opacity="0.6" />

      {/* === OUTPUT DENDRITES (right side) === */}
      <path d="M78 35 Q86 30 94 26" stroke="#c0483a" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <circle cx="94" cy="26" r="2.5" fill="#c0483a" opacity="0.6" />
      <text x="94" y="20" textAnchor="middle" fill="#c0483a" fontSize="5" fontWeight="bold" fontFamily="Inter, sans-serif" opacity="0.5">inflam.</text>

      <path d="M78 65 Q86 70 94 74" stroke="#2a7a50" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <circle cx="94" cy="74" r="2.5" fill="#2a7a50" opacity="0.6" />
      <text x="94" y="82" textAnchor="middle" fill="#2a7a50" fontSize="5" fontWeight="bold" fontFamily="Inter, sans-serif" opacity="0.5">healthy</text>

      {/* === CELL MEMBRANE === */}
      <ellipse cx="50" cy="50" rx="30" ry="32" fill="url(#acGrad)" stroke="#b09880" strokeWidth="2" opacity="0.85" />

      {/* === NEURAL NETWORK INSIDE THE CELL === */}
      {/* Input nodes (left inside cell) */}
      <circle cx="30" cy="35" r="3" fill="#c4910f" opacity="0.7" />
      <circle cx="30" cy="50" r="3" fill="#c4910f" opacity="0.7" />
      <circle cx="30" cy="65" r="3" fill="#c4910f" opacity="0.7" />

      {/* Hidden layer 1 */}
      <circle cx="44" cy="38" r="3.5" fill="#a82830" opacity="0.7" />
      <circle cx="44" cy="52" r="3.5" fill="#2840a0" opacity="0.7" />
      <circle cx="44" cy="64" r="3.5" fill="#a87810" opacity="0.7" />

      {/* Hidden layer 2 */}
      <circle cx="58" cy="42" r="3" fill="#7a3040" opacity="0.6" />
      <circle cx="58" cy="56" r="3" fill="#304080" opacity="0.6" />

      {/* Output nodes */}
      <circle cx="70" cy="40" r="3" fill="#c0483a" opacity="0.7" />
      <circle cx="70" cy="60" r="3" fill="#2a7a50" opacity="0.7" />

      {/* Connections — input to hidden1 */}
      <line x1="33" y1="35" x2="41" y2="38" stroke="#a08060" strokeWidth="0.6" opacity="0.4" />
      <line x1="33" y1="35" x2="41" y2="52" stroke="#a08060" strokeWidth="0.4" opacity="0.25" />
      <line x1="33" y1="50" x2="41" y2="38" stroke="#a08060" strokeWidth="0.4" opacity="0.25" />
      <line x1="33" y1="50" x2="41" y2="52" stroke="#a08060" strokeWidth="0.6" opacity="0.4" />
      <line x1="33" y1="50" x2="41" y2="64" stroke="#a08060" strokeWidth="0.4" opacity="0.25" />
      <line x1="33" y1="65" x2="41" y2="52" stroke="#a08060" strokeWidth="0.4" opacity="0.25" />
      <line x1="33" y1="65" x2="41" y2="64" stroke="#a08060" strokeWidth="0.6" opacity="0.4" />

      {/* Connections — hidden1 to hidden2 */}
      <line x1="47" y1="38" x2="55" y2="42" stroke="#a08060" strokeWidth="0.6" opacity="0.35" />
      <line x1="47" y1="38" x2="55" y2="56" stroke="#a08060" strokeWidth="0.4" opacity="0.2" />
      <line x1="47" y1="52" x2="55" y2="42" stroke="#a08060" strokeWidth="0.4" opacity="0.2" />
      <line x1="47" y1="52" x2="55" y2="56" stroke="#a08060" strokeWidth="0.6" opacity="0.35" />
      <line x1="47" y1="64" x2="55" y2="56" stroke="#a08060" strokeWidth="0.5" opacity="0.3" />

      {/* Connections — hidden2 to output */}
      <line x1="61" y1="42" x2="67" y2="40" stroke="#c0483a" strokeWidth="0.8" opacity="0.45" />
      <line x1="61" y1="42" x2="67" y2="60" stroke="#2a7a50" strokeWidth="0.4" opacity="0.2" />
      <line x1="61" y1="56" x2="67" y2="40" stroke="#c0483a" strokeWidth="0.4" opacity="0.2" />
      <line x1="61" y1="56" x2="67" y2="60" stroke="#2a7a50" strokeWidth="0.8" opacity="0.45" />

      {/* Nucleus — slightly off-center, overlapping the network */}
      <circle cx="48" cy="50" r="8" fill="url(#acNucleus)" opacity="0.35" />
      <circle cx="48" cy="50" r="8" stroke="#4a2020" strokeWidth="0.5" fill="none" opacity="0.2" />
    </svg>
  )
}
