import type { SkillKey } from '../data/curriculum'

export type PlannerQuestion = { id: string; kind: string; level: number; topic: string }
export type PlannerHistory = Record<string, { streak?: number; tries?: number; due?: number; mastered?: boolean }>
export type DailyMissionItem = { skill: SkillKey; title: string; questionIds: string[]; reason: string }
export type DailyMission = { stageId: number; items: DailyMissionItem[]; questionIds: string[]; estimatedMinutes: number }

/** A suggested core lesson, never a daily time or progress cap. */
export function buildDailyMission(bank: PlannerQuestion[], history: PlannerHistory, stageId: number, now = Date.now()): DailyMission {
  const eligible = bank.filter(q => q.level <= Math.min(stageId, 4))
  const due = eligible.filter(q => { const h = history[q.id]; return !!h && !h.mastered && (h.due ?? 0) <= now })
  const fresh = eligible.filter(q => !history[q.id]?.mastered).sort((a,b) => (history[a.id]?.tries ?? 0) - (history[b.id]?.tries ?? 0) || a.level - b.level)
  const unique = (items: PlannerQuestion[], limit: number) => {
    const seen = new Set<string>()
    return items.filter(q => !seen.has(q.id) && !!seen.add(q.id)).slice(0, limit)
  }
  const select = (kind: string, limit: number) => unique([...due.filter(q => q.kind === kind), ...fresh.filter(q => q.kind === kind)], limit)
  const vocabulary = select('單字', 3)
  const grammar = select('文法', 3)
  const fill = select('填空', 3)
  const reading = select('閱讀', 3)
  const review = due.filter(q => !['單字','文法','填空','閱讀'].includes(q.kind)).slice(0, 2)
  const items: DailyMissionItem[] = ([
    { skill:'vocabulary', title:'核心單字', questionIds:vocabulary.map(q=>q.id), reason:'依照目前程度安排尚未熟悉的高頻字彙。' },
    { skill:'grammar', title:'文法觀念', questionIds:grammar.map(q=>q.id), reason:'循序練習目前程度的文法重點。' },
    { skill:'reading', title:'閱讀與填空', questionIds:[...reading,...fill].map(q=>q.id), reason:'透過短文與句子填空練習理解及應用。' },
    { skill:'review', title:'弱項複習', questionIds:review.map(q=>q.id), reason:'優先安排已到複習時間的弱項。' },
  ] as DailyMissionItem[]).filter(x=>x.questionIds.length>0)
  const questionIds = [...new Set(items.flatMap(x=>x.questionIds))]
  return { stageId, items, questionIds, estimatedMinutes:Math.max(5,Math.ceil(questionIds.length*1.4)) }
}
