import type { ScaleMode } from '../types'

// Circle of Fifths order (clockwise from top)
const MAJOR_ORDER = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'Db', 'Ab', 'Eb', 'Bb', 'F']
const MINOR_ORDER = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'D#m', 'Bbm', 'Fm', 'Cm', 'Gm', 'Dm']

// Map display label → key id used in data store
const MAJOR_ID_MAP: Record<string, string> = {
  'C': 'C', 'G': 'G', 'D': 'D', 'A': 'A', 'E': 'E', 'B': 'E',
  'F#': 'F#', 'Db': 'D', 'Ab': 'A', 'Eb': 'D', 'Bb': 'Bb', 'F': 'F',
}
const MINOR_ID_MAP: Record<string, string> = {
  'Am': 'Am', 'Em': 'Em', 'Bm': 'Bm', 'F#m': 'F#m', 'C#m': 'C#m',
  'G#m': 'G#m', 'D#m': 'D#m', 'Bbm': 'Bbm', 'Fm': 'Fm', 'Cm': 'Cm',
  'Gm': 'Gm', 'Dm': 'Dm',
}

// Vietnamese popular keys
const VN_MAJOR = new Set(['C', 'G', 'F'])
const VN_MINOR = new Set(['Am', 'Em', 'Dm'])

const CX = 200, CY = 200
const R_MAJOR_OUT = 170, R_MAJOR_IN = 108
const R_MINOR_OUT = 102, R_MINOR_IN = 52

function polarToXY(angleDeg: number, r: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) }
}

function sectorPath(startDeg: number, endDeg: number, rIn: number, rOut: number) {
  const s1 = polarToXY(startDeg, rOut)
  const e1 = polarToXY(endDeg, rOut)
  const s2 = polarToXY(endDeg, rIn)
  const e2 = polarToXY(startDeg, rIn)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return [
    `M ${s1.x} ${s1.y}`,
    `A ${rOut} ${rOut} 0 ${large} 1 ${e1.x} ${e1.y}`,
    `L ${s2.x} ${s2.y}`,
    `A ${rIn} ${rIn} 0 ${large} 0 ${e2.x} ${e2.y}`,
    'Z',
  ].join(' ')
}

interface Props {
  selectedKey: string
  currentMode: ScaleMode
  onKeySelect: (keyId: string, mode: ScaleMode) => void
}

export default function CircleOfFifths({ selectedKey, currentMode, onKeySelect }: Props) {
  const sliceAngle = 360 / 12

  return (
    <div className="flex flex-col items-center gap-4">
      <svg viewBox="0 0 400 400" width="340" height="340" className="drop-shadow-2xl">
        {/* Outer ring — Major keys */}
        {MAJOR_ORDER.map((label, i) => {
          const start = i * sliceAngle - sliceAngle / 2
          const end = start + sliceAngle
          const mid = (start + end) / 2
          const keyId = MAJOR_ID_MAP[label] ?? label
          const isSelected = currentMode === 'major' && selectedKey === keyId
          const isVN = VN_MAJOR.has(label)
          const textPos = polarToXY(mid, (R_MAJOR_OUT + R_MAJOR_IN) / 2)

          return (
            <g key={`major-${label}`} onClick={() => onKeySelect(keyId, 'major')} className="cursor-pointer">
              <path
                d={sectorPath(start, end, R_MAJOR_IN, R_MAJOR_OUT)}
                fill={
                  isSelected 
                    ? '#f59e0b' 
                    : isVN 
                      ? 'linear-gradient(135deg, #1e3a5f, #1e2a3a)' 
                      : 'linear-gradient(135deg, #1e293b, #0f172a)'
                }
                stroke={isSelected ? '#fbbf24' : '#334155'}
                strokeWidth={isSelected ? 2.5 : 1.2}
                className="transition-all duration-300 hover:brightness-125 hover:scale-[1.02]"
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />
              <text
                x={textPos.x} y={textPos.y}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="13" 
                fontWeight={isSelected ? 'bold' : '500'}
                fill={isSelected ? '#ffffff' : isVN ? '#fcd34d' : '#cbd5e1'}
                className="select-none"
              >
                {label}
              </text>
              {isVN && !isSelected && (
                <g transform={`translate(${textPos.x + 14}, ${textPos.y - 10})`}>
                  <circle r="4" fill="#ef4444" opacity="0.9" />
                  <circle r="1.5" fill="#ffffff" opacity="0.6" />
                </g>
              )}
            </g>
          )
        })}

        {/* Inner ring — Minor keys */}
        {MINOR_ORDER.map((label, i) => {
          const start = i * sliceAngle - sliceAngle / 2
          const end = start + sliceAngle
          const mid = (start + end) / 2
          const keyId = MINOR_ID_MAP[label] ?? label
          const isSelected = currentMode === 'minor' && selectedKey === keyId
          const isVN = VN_MINOR.has(label)
          const textPos = polarToXY(mid, (R_MINOR_OUT + R_MINOR_IN) / 2)

          return (
            <g key={`minor-${label}`} onClick={() => onKeySelect(keyId, 'minor')} className="cursor-pointer">
              <path
                d={sectorPath(start, end, R_MINOR_IN, R_MINOR_OUT)}
                fill={
                  isSelected 
                    ? '#8b5cf6' 
                    : isVN 
                      ? '#2d1b4e' 
                      : '#1a1f2e'
                }
                stroke={isSelected ? '#a78bfa' : '#334155'}
                strokeWidth={isSelected ? 2.5 : 1.2}
                className="transition-all duration-300 hover:brightness-125 hover:scale-[1.02]"
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              />
              <text
                x={textPos.x} y={textPos.y}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11" 
                fontWeight={isSelected ? 'bold' : '500'}
                fill={isSelected ? '#ffffff' : isVN ? '#d8b4fe' : '#94a3b8'}
                className="select-none"
              >
                {label}
              </text>
              {isVN && !isSelected && (
                <g transform={`translate(${textPos.x + 11}, ${textPos.y - 8})`}>
                  <circle r="3.5" fill="#ef4444" opacity="0.9" />
                  <circle r="1.2" fill="#ffffff" opacity="0.6" />
                </g>
              )}
            </g>
          )
        })}

        {/* Center label */}
        <circle cx={CX} cy={CY} r={R_MINOR_IN - 2} fill="#0a0f1a" stroke="#1e293b" strokeWidth="2" />
        <circle cx={CX} cy={CY} r={R_MINOR_IN - 6} fill="#0f1420" />
        <text x={CX} y={CY - 8} textAnchor="middle" fontSize="11" fontWeight="600" fill="#64748b" letterSpacing="1">
          Circle of
        </text>
        <text x={CX} y={CY + 8} textAnchor="middle" fontSize="11" fontWeight="700" fill="#8b5cf6" letterSpacing="2">
          FIFTHS
        </text>
      </svg>

      {/* Legend */}
      <div className="flex gap-6 text-xs">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg backdrop-blur-sm">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-sm"></div>
          <span className="text-slate-300 font-medium">Major</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg backdrop-blur-sm">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 shadow-sm"></div>
          <span className="text-slate-300 font-medium">Minor</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg backdrop-blur-sm">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-red-500 to-rose-600 shadow-sm"></div>
          <span className="text-slate-300 font-medium">🇻🇳 Nhạc Việt</span>
        </div>
      </div>
    </div>
  )
}
