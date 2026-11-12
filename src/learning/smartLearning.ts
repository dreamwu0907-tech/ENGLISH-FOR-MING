export type AdaptiveConceptState = {
  streak: number;
  recentIds: string[];
  mastered: boolean;
  attempts: number;
  correctCount: number;
  wrongCount: number;
  masteryScore: number;
  intervalDays: number;
  dueAt: number;
  lastReviewedAt: number;
};

const clamp = (value:number,min:number,max:number) => Math.max(min,Math.min(max,value));

export function normalizeConceptState(value: Partial<AdaptiveConceptState> & {streak?:number;recentIds?:string[];mastered?:boolean;attempts?:number}): AdaptiveConceptState {
  return {
    streak:value.streak ?? 0,
    recentIds:value.recentIds ?? [],
    mastered:value.mastered ?? false,
    attempts:value.attempts ?? 0,
    correctCount:value.correctCount ?? 0,
    wrongCount:value.wrongCount ?? 0,
    masteryScore:value.masteryScore ?? (value.mastered ? 85 : 0),
    intervalDays:value.intervalDays ?? 0,
    dueAt:value.dueAt ?? (value.mastered ? Date.now()+30*86400000 : 0),
    lastReviewedAt:value.lastReviewedAt ?? 0,
  };
}

/** Lightweight spaced-repetition update. A repeated copy of the same question cannot inflate the mastery streak. */
export function recordConceptAnswer(
  previous: Partial<AdaptiveConceptState> & {streak?:number;recentIds?:string[];mastered?:boolean;attempts?:number},
  questionId:string,
  correct:boolean,
  now=Date.now(),
): AdaptiveConceptState {
  const state=normalizeConceptState(previous);
  const isNewQuestion=!state.recentIds.includes(questionId);
  const streak=correct ? state.streak+(isNewQuestion?1:0) : 0;
  const masteryScore=clamp(state.masteryScore+(correct?8:-18),0,100);
  const intervalDays=correct
    ? (streak<=1?1:streak===2?3:streak===3?7:streak===4?14:Math.min(30,Math.max(14,state.intervalDays*2||30)))
    : 0;
  const dueAt=correct ? now+intervalDays*86400000 : now+10*60000;
  const recentIds=[...state.recentIds.filter(id=>id!==questionId),questionId].slice(-6);
  return {
    streak,recentIds,mastered:correct ? (state.mastered || (streak>=3 && masteryScore>=24)) : false,
    attempts:state.attempts+1,
    correctCount:state.correctCount+(correct?1:0),
    wrongCount:state.wrongCount+(correct?0:1),
    masteryScore,intervalDays,dueAt,lastReviewedAt:now,
  };
}

export function dueConceptEntries<T extends {dueAt?:number;mastered?:boolean}>(concepts:Record<string,T>,now=Date.now()) {
  return Object.entries(concepts)
    .filter(([,state])=>(state.dueAt ?? 0)<=now)
    .sort((a,b)=>(a[1].dueAt??0)-(b[1].dueAt??0));
}
