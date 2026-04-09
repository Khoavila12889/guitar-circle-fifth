import { useState } from 'react'
import type { PracticeStep } from '../types'

interface Props {
  steps: PracticeStep[]
}

export default function PracticeGuide({ steps }: Props) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
      <h3 className="text-sm font-semibold text-slate-300 mb-3">📚 Hướng dẫn luyện tập</h3>
      <div className="space-y-2">
        {steps.map(step => (
          <div key={step.order} className="rounded-xl border border-white/10 overflow-hidden">
            <button
              onClick={() => setOpen(open === step.order ? null : step.order)}
              className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-white/5 transition-all"
            >
              <span className="w-6 h-6 rounded-full bg-indigo-600/40 text-indigo-300 text-xs flex items-center justify-center font-bold shrink-0">
                {step.order}
              </span>
              <span className="text-sm text-slate-200 font-medium flex-1">{step.title}</span>
              <span className="text-slate-500 text-xs">{open === step.order ? '▲' : '▼'}</span>
            </button>
            {open === step.order && (
              <div className="px-4 pb-3 text-sm text-slate-400 border-t border-white/5 pt-2">
                {step.description}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
