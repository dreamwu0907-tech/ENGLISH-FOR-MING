import {useEffect,useMemo,useState} from 'react'
import {ArrowLeft,BookOpen,CheckCircle2,ChevronRight,Clock3,GraduationCap,Home,RotateCcw,Target} from 'lucide-react'
import {courseStages,courseUnitCount,publishedUnitCount} from './data/courseV3Roadmap'
import {lessons,getLesson} from './data/courseV3Lessons'
import {questionBank,questionsForUnit,questionsForConcept,type Question} from './data/courseV3Questions'

type ConceptState={streak:number;recentIds:string[];mastered:boolean;attempts:number}
type Store={completedUnits:number[];concepts:Record<string,ConceptState>;answered:number;correct:number;studySeconds:number;attempts:number;wrong:number}
type Page='home'|'lesson'|'quiz'|'result'|'progress'
type Result={question:Question;answer:string;correct:boolean}
const STORAGE_KEY='english-for-ming-v3'
const emptyStore:Store={completedUnits:[],concepts:{},answered:0,correct:0,studySeconds:0,attempts:0,wrong:0}
const readStore=():Store=>{try{const raw=localStorage.getItem(STORAGE_KEY);return raw?{...emptyStore,...JSON.parse(raw)}:emptyStore}catch{return emptyStore}}
const normal=(s:string)=>s.trim().toLowerCase().replace(/[.!?]+$/,'')
const dueConcepts=(store:Store)=>Object.entries(store.concepts).filter(([,v])=>!v.mastered)
const reviewQuestions=(store:Store,limit=10)=>dueConcepts(store).slice(0,limit).map(([concept,state])=>{const pool=questionsForConcept(concept);const seen=state.recentIds||[];return pool.find(q=>!seen.includes(q.id))||pool[0]}).filter(Boolean) as Question[]

export default function App(){
 const [store,setStore]=useState<Store>(readStore)
 const [page,setPage]=useState<Page>('home')
 const [activeUnit,setActiveUnit]=useState(1)
 const [session,setSession]=useState<Question[]>([])
 const [sessionKind,setSessionKind]=useState<'unit'|'review'>('unit')
 const [index,setIndex]=useState(0)
 const [answer,setAnswer]=useState('')
 const [results,setResults]=useState<Result[]>([])
 const [sessionStart,setSessionStart]=useState(0)
 const [sessionScore,setSessionScore]=useState(0)
 const [showAll,setShowAll]=useState(false)
 useEffect(()=>{localStorage.setItem(STORAGE_KEY,JSON.stringify(store))},[store])
 const unit=getLesson(activeUnit)
 const current=session[index]
 const mastered=Object.values(store.concepts).filter(x=>x.mastered).length
 const pending=dueConcepts(store).length
 const accuracy=store.answered?Math.round(store.correct/store.answered*100):0
 const remainingUnits=Math.max(0,courseUnitCount-store.completedUnits.length)
 const remainingMinutes=remainingUnits*15+pending*2
 const totalQuestions=questionBank.length
 const bankPercent=Math.round(publishedUnitCount/courseUnitCount*100)
 const stageProgress=(id:number)=>{const s=courseStages[id-1];const done=s.units.filter(u=>store.completedUnits.includes(u.id)).length;return {done,total:s.units.length}}
 const beginUnit=(id:number)=>{
  setActiveUnit(id);setSessionKind('unit')
  const base=questionsForUnit(id)
  const due=reviewQuestions(store,2).filter(q=>!base.some(b=>b.id===q.id))
  setSession([...base,...due]);setIndex(0);setAnswer('');setResults([]);setSessionStart(Date.now());setPage('lesson')
 }
 const beginReview=()=>{
  const qs=reviewQuestions(store,12)
  if(!qs.length)return
  setSession(qs);setSessionKind('review');setIndex(0);setAnswer('');setResults([]);setSessionStart(Date.now());setPage('quiz')
 }
 const startQuiz=()=>{setIndex(0);setAnswer('');setPage('quiz')}
 const finish=(items:Result[])=>{
  setResults(items);const right=items.filter(x=>x.correct).length;setSessionScore(right)
  const elapsed=Math.max(0,Math.round((Date.now()-sessionStart)/1000))
  setStore(old=>{
   const concepts={...old.concepts}
   items.forEach(({question,correct})=>{
    const prev=concepts[question.conceptId]||{streak:0,lastId:null,mastered:false,attempts:0}
    const nextStreak=correct?(prev.lastId!==question.id?prev.streak+1:prev.streak):0
    concepts[question.conceptId]={streak:nextStreak,lastId:question.id,mastered:prev.mastered||nextStreak>=3,attempts:prev.attempts+1}
   })
   const passed=sessionKind==='unit'&&items.length>0&&right/items.length>=0.8
   const completed=passed?Array.from(new Set([...old.completedUnits,activeUnit])):old.completedUnits
   return {...old,concepts,completedUnits:completed,answered:old.answered+items.length,correct:old.correct+right,wrong:old.wrong+items.length-right,attempts:old.attempts+1,studySeconds:old.studySeconds+elapsed}
  })
  setPage('result')
 }
 const submitAnswer=(value:string)=>{
  const thisResult:Result={question:current,answer:value,correct:current.type==='fill'?normal(value)===normal(current.answer):value===current.answer}
  const all=[...results,thisResult]
  if(index+1<session.length){setResults(all);setIndex(index+1);setAnswer('')}
  else finish(all)
 }
 const goHome=()=>{setPage('home');setSession([]);setResults([]);setAnswer('')}
 const currentStage=courseStages[Math.floor((activeUnit-1)/12)]
 return <div className="shell">
  <header><div className="logo"><GraduationCap size={22}/></div><div><b>ENGLISH FOR MING</b><small>Junior High → TOEIC 800</small></div><div style={{marginLeft:'auto',fontSize:10,color:'#c9d8e5'}}>V3 COURSE</div></header>
  <main>
  {page==='home'&&<div className="stack">
   <section className="hero"><label>YOUR ENGLISH ROADMAP</label><h1>從英文基礎，穩定走向 TOEIC 800</h1><p>不設定每日限制。每個單元約 15–20 分鐘，依自己的時間完成；錯誤觀念會持續安排新題複習。</p><button className="primary" onClick={()=>beginUnit(Array.from({length:12},(_,i)=>i+1).find(id=>!store.completedUnits.includes(id))||1)}><BookOpen size={17}/> {store.completedUnits.length?'繼續學習':'開始第一單元'}</button></section>
   <div className="stats">
    <article><small>已完成單元</small><b>{store.completedUnits.length}<small style={{display:'inline',fontSize:12,color:'#8293a2'}}> / 72</small></b></article>
    <article><small>整體答題正確率</small><b>{accuracy}%</b></article>
    <article><small>已掌握觀念</small><b>{mastered}</b></article>
    <article><small>待複習觀念</small><b>{pending}</b></article>
   </div>
   <section className="goal-card"><div><small>COURSE PROGRESS</small><h2>{Math.round(store.completedUnits.length/courseUnitCount*100)}%</h2><p>課程完成度 · {store.completedUnits.length} / {courseUnitCount} 個單元</p></div><div className="goal-progress"><i style={{width:(store.completedUnits.length/courseUnitCount*100)+'%'}}/></div><div className="milestones"><span>國中基礎</span><b>TOEIC 800</b><span>彈性學習</span></div></section>
   <section className="goal-card"><div><small>QUESTION BANK STATUS</small><h2>{publishedUnitCount} / {courseUnitCount} 單元</h2><p>目前已上架第一階段完整題庫；其餘階段依序建置，不會把尚未完成的題目算成已完成。</p></div><div className="goal-progress"><i style={{width:bankPercent+'%'}}/></div><p style={{marginTop:8}}>題庫架構完成度 {bankPercent}% · 尚有 {courseUnitCount-publishedUnitCount} 個單元待編寫</p></section>
   <section className="goal-card"><div><small>ESTIMATED STUDY TIME LEFT</small><h2>{Math.floor(remainingMinutes/60)} 小時 {remainingMinutes%60} 分</h2><p>以每單元 15 分鐘估算，另計待複習觀念。因採彈性學習，不預設完成日期。</p></div><div className="row"><span style={{fontSize:11,color:'#718494'}}>累計學習時間</span><b>{Math.floor(store.studySeconds/3600)} 小時 {Math.floor(store.studySeconds%3600/60)} 分</b></div></section>
   {pending>0&&<section className="chapter-card"><div className="row"><div><h2>錯題觀念複習</h2><p className="chapter-hint">尚有 {pending} 個觀念未達連續答對 3 次。</p></div><RotateCcw color="#2676a8"/></div><button className="primary wide" onClick={beginReview}>開始錯題複習 <ChevronRight size={17}/></button></section>}
   <div className="row"><h2>完整課程地圖</h2><span className="pill">6 階段 · 72 單元</span></div>
   {courseStages.map(stage=>{const p=stageProgress(stage.id);return <section className="chapter-list" key={stage.id}><div className="chapter-heading"><div><small>LEVEL {stage.id} · {stage.range}</small><h1>{stage.title}</h1><p>{stage.goal}</p></div><div className="chapter-count">{p.done}/{p.total}</div></div><div className="goal-progress"><i style={{width:(p.done/p.total*100)+'%'}}/></div><div className="unit-list">{stage.units.map(u=><button key={u.id} className={'unit-row '+(u.available?'':'locked')} disabled={!u.available} onClick={()=>beginUnit(u.id)}><span className="unit-number">{String(u.id).padStart(2,'0')}</span><span className="unit-name">{u.title}<small>{u.available?'約 15–20 分鐘 · 單字、文法、選擇與填空':'題庫編寫中'}</small></span>{store.completedUnits.includes(u.id)?<CheckCircle2 className="green" size={18}/>:u.available?<ChevronRight size={18}/>:<span className="pill muted">未上架</span>}</button>)}</div></section>})}
   <aside>目前可練習：第一階段 12 個單元，共 {totalQuestions} 題。其餘 60 個單元已列入課程路線圖，題庫會分批完成。學習紀錄只保存在目前瀏覽器。</aside>
  </div>}
  {page==='lesson'&&unit&&<div className="stack">
   <button className="link" onClick={goHome}><ArrowLeft size={15}/> 返回課程地圖</button>
   <div className="chapter-card"><small>LEVEL {currentStage.id} · UNIT {activeUnit}</small><h1>{currentStage.title}：{courseStages.flatMap(s=>s.units).find(u=>u.id===activeUnit)?.title}</h1><p className="chapter-hint">建議時間 {unit.minutes} 分鐘 · 先學單字，再看文法，最後完成練習。</p></div>
   <section className="home-vocab"><div className="home-vocab-head"><div><label>TODAY'S VOCABULARY</label><h2>本單元核心單字</h2><p>先熟悉以下單字與例句，再開始作答。</p></div><span>{unit.words.length} WORDS</span></div>{unit.words.map((w,i)=><div className="vocab-entry" key={w.word}><div><b>{w.word}</b><small>{w.pos} · {w.meaning}</small></div><p>{w.example}</p><small>{w.translation}</small></div>)}</section>
   <section className="chapter-card"><small>GRAMMAR FOCUS</small><h2>{unit.grammarTitle}</h2><p className="lesson-text">{unit.grammar}</p><div className="lesson-example">{unit.examples.map(e=><p key={e}>{e}</p>)}</div><aside>本課目標：{unit.goal}</aside></section>
   <section className="chapter-card"><div className="row"><div><h2>單元練習</h2><p className="chapter-hint">6 題核心題 + 最多 2 題錯題複習；包含選擇題與填空題。</p></div><Clock3 color="#2676a8"/></div><button className="primary wide" onClick={startQuiz}>開始練習 <ChevronRight size={17}/></button></section>
  </div>}
  {page==='quiz'&&current&&<div className="stack">
   <div className="qtop"><button className="link" onClick={()=>setPage(sessionKind==='review'?'home':'lesson')}><ArrowLeft size={15}/> 返回</button><span>{sessionKind==='review'?'錯題複習':'UNIT '+activeUnit} · {index+1}/{session.length}</span></div>
   <div className="track"><i style={{width:((index+1)/session.length*100)+'%'}}/></div>
   <div className="question"><small>{current.type==='choice'?'MULTIPLE CHOICE':'FILL IN THE BLANK'} · {current.conceptId}</small><h2>{current.prompt}</h2><p className="question-zh">{current.chinese}</p></div>
   {current.type==='choice'?<div className="options">{current.choices?.map((option,i)=><button key={option} className={answer===option?'chosen':''} onClick={()=>setAnswer(option)}><span>{String.fromCharCode(65+i)}</span>{option}{answer===option&&<CheckCircle2 size={18}/>}</button>)}</div>:<div className="blank-answer"><label>輸入英文答案</label><input value={answer} onChange={e=>setAnswer(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&answer.trim())submitAnswer(answer)}} placeholder="Type your answer here" autoComplete="off"/><small>請輸入完整單字或正確動詞形式。</small></div>}
   <div className="actions"><button className="link" onClick={()=>submitAnswer('')}>跳過（視為答錯）</button><button className="primary" disabled={!answer.trim()} onClick={()=>submitAnswer(answer)}>{index===session.length-1?'完成作答':'下一題'} <ChevronRight size={17}/></button></div>
   <p className="hint">答錯的觀念會進入複習池；連續答對 3 道不同題目後才算掌握。</p>
  </div>}
  {page==='result'&&<div className="stack">
   <div className="score"><div className="ring">{Math.round(sessionScore/Math.max(1,results.length)*100)}<small>%</small></div><h1>{sessionScore}/{results.length} 題答對</h1><p>{sessionKind==='unit'?(sessionScore/Math.max(1,results.length)>=0.8?'達到單元通過標準。':'尚未達到 80% 通過標準，建議再練習一次。'):'錯題複習結果已更新。'}</p></div>
   {results.map((r,i)=><section className="explain" key={r.question.id}><div className="explainhead"><span>QUESTION {i+1} · {r.question.type==='fill'?'填空':'選擇'}</span><b className={r.correct?'green':'red'}>{r.correct?'CORRECT':'REVIEW'}</b></div><h3>{r.question.prompt}</h3><p>你的答案：<b>{r.answer||'未作答'}</b></p><p>正確答案：<b className="green">{r.question.answer}</b></p><p>{r.question.explanation}</p><p className="lesson-translation">{r.question.chinese}</p></section>)}
   <section className="chapter-card"><h2>觀念掌握狀態</h2>{Object.entries(store.concepts).filter(([id])=>results.some(r=>r.question.conceptId===id)).map(([id,v])=><div className="mastery" key={id}><div><b>{id}</b><small>連續答對 {v.streak}/3 次</small></div><span>{v.mastered?'已掌握':'待複習'}</span></div>)}</section>
   <button className="primary wide" onClick={goHome}>返回學習首頁</button>
   {pending>0&&<button className="link wide" onClick={beginReview}>繼續複習錯誤觀念 ({pending})</button>}
  </div>}
  {page==='progress'&&<div className="stack"><h1>學習進度</h1><section className="goal-card"><small>COURSE COMPLETION</small><h2>{store.completedUnits.length}/{courseUnitCount}</h2><div className="goal-progress"><i style={{width:(store.completedUnits.length/courseUnitCount*100)+'%'}}/></div><p>完成單元需達 80% 正確率。錯題觀念另外計算掌握度。</p></section><section className="goal-card"><small>QUESTION BANK</small><h2>{publishedUnitCount}/{courseUnitCount}</h2><p>已完成題庫建置的單元數；目前上架 {totalQuestions} 題。</p></section><section className="goal-card"><small>MASTERY</small><h2>{mastered} 個已掌握</h2><p>{pending} 個觀念仍需複習。每個觀念需連續答對 3 道不同題目。</p></section>{courseStages.map(s=>{const p=stageProgress(s.id);return <section className="chapter-list" key={s.id}><div className="row"><b>{s.title}</b><span>{p.done}/{p.total}</span></div><div className="goal-progress"><i style={{width:p.done/p.total*100+'%'}}/></div></section>})}<button className="reset" onClick={()=>{if(confirm('確定要清除 V3 的所有學習紀錄嗎？此操作無法復原。')){setStore(emptyStore);localStorage.removeItem(STORAGE_KEY)}}}>清除本版學習紀錄</button></div>}
  </main>
  <nav><button className={page==='home'?'active':''} onClick={goHome}><Home/><span>首頁</span></button><button className={page==='progress'?'active':''} onClick={()=>setPage('progress')}><Target/><span>進度</span></button><button onClick={beginReview}><RotateCcw/><span>錯題複習</span></button></nav>
 </div>
}
