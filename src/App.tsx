import {useEffect,useMemo,useState} from 'react'
import {BookOpen,Brain,ChartNoAxesCombined,Check,ChevronRight,Home} from 'lucide-react'
import { learningStages } from './data/curriculum'
import { buildDailyMission } from './learning/dailyPlanner'
import { bank, type Q } from './data/questionBank'

type H={streak:number;tries:number;due:number;mastered:boolean}
type SavedWord={word:string;meaning:string;example:string;addedAt:number}
const dictionary:Record<string,string>={amy:'艾美（人名）',junior:'初中的',high:'高的；高級的',school:'學校',student:'學生',likes:'喜歡',music:'音樂',every:'每一個',sunday:'星期日',goes:'去；前往',park:'公園',with:'和；與',brother:'兄弟',plays:'玩；打（球）',badminton:'羽毛球',engineer:'工程師',engineering:'工程',team:'團隊',completed:'完成',thermal:'熱的；熱能的',test:'測試',monday:'星期一',data:'資料；數據',being:'正在；處於',reviewed:'已審查',now:'現在',final:'最終的',report:'報告',scheduled:'預定的',sent:'寄送；送出',customer:'客戶',wednesday:'星期三',morning:'早上',supplier:'供應商',informed:'通知',copper:'銅',material:'材料',did:'做（do 的過去式）',not:'不；沒有',pass:'通過',incoming:'進料的',inspection:'檢驗',replacement:'替換品；替代的',batch:'批次',prepared:'已準備',prototype:'原型；樣品',delivery:'交貨；配送',delayed:'延遲的',two:'二；兩個',days:'天',the:'這個；那個',is:'是；在',a:'一個',she:'她',he:'他',it:'它；這',and:'和；而且',to:'到；向',on:'在（某一天）',by:'藉由；由',because:'因為',of:'……的',so:'所以',will:'將會',that:'那個；引導子句',we:'我們',us:'我們（受格）',they:'他們',are:'是；在',was:'是；在（過去式）','didn’t':'沒有'}
const KEY='english-for-ming-v2'
const exampleTranslations:Record<string,string>={
eat:'我通常七點吃早餐。',taller:'我哥哥比我高。',three:'桌上有三顆蘋果。',close:'請把門關上。',goes:'她每天搭公車上學。',recycle:'我們應該回收塑膠瓶。',traffic:'今天路上車很多。',weather:'明天天氣會晴朗。',healthy:'吃蔬菜有助於保持健康。',travel:'我明年想去日本旅行。',online:'我通常在線上閱讀新聞。',message:'我傳了一則訊息給朋友。',arrive:'火車幾點抵達？',popular:'這部電影很受青少年歡迎。',important:'充足的睡眠很重要。',energy:'太陽能是一種潔淨能源。',protect:'我們應該保護環境。',reduce:'我們需要減少塑膠廢棄物。',schedule:'請確認會議行程。',purchase:'公司計畫購買新設備。',available:'你明天上午有空開會嗎？',confirm:'請透過電子郵件確認你的預約。',department:'請聯絡業務部門。',equipment:'所有安全設備都必須檢查。',delay:'航班因為長時間延誤而取消。'
}
const chapters=[
{id:1,title:'日常生活',subtitle:'Daily Life',description:'從自我介紹、日常習慣到生活對話，建立英文基礎。',grammar:['2','4','6','9'],fill:['21','22','23','24','25','26','27','28','29','30','31','32','34','35'],integrated:['1','3','5','7','8','10','56','64'],scenario:[]},
{id:2,title:'交通與旅遊',subtitle:'Travel & Transportation',description:'練習交通、住宿、購物與旅遊時常見的英文。',grammar:['13','16','18'],fill:['33','45','69','70','71','72','73'],integrated:['57','58','80','81'],scenario:[]},
{id:3,title:'工作與職場',subtitle:'Workplace English',description:'進入會議、工作安排、報告與商務溝通情境。',grammar:['11','74','75','76'],fill:['36','37','38','39','40','41','42','43','44'],integrated:['12','14','15','17','19','20','59','60','61','62','63','65'],scenario:[]}
]
const dialoguePool=[
{scene:'Restaurant Reservation',lines:['Woman: Good evening. I’d like to make a reservation for two.','Man: Certainly. What time would you prefer?','Woman: Around seven thirty, please.','Man: We have a table available at 7:30. May I have your name?','Woman: It’s Ming. Thank you.'],question:'What is the woman calling to do?',opts:['Cancel a reservation','Make a reservation','Order dinner','Ask for directions'],answer:1,why:'She says she would like to make a reservation for two, so she is booking a table.'},
{scene:'Public Transportation',lines:['Man: Excuse me. Does this bus go to the city center?','Woman: Yes, it does. You should get off at the Central Station.','Man: How long does it take?','Woman: About twenty minutes, depending on traffic.'],question:'Where should the man get off?',opts:['At the airport','At the Central Station','At the museum','At the bus terminal'],answer:1,why:'The woman tells him to get off at Central Station.'},
{scene:'Work Meeting',lines:['Woman: Have you finished the test report?','Man: Almost. I’m checking the pressure-drop data now.','Woman: Please send it to the customer before noon.','Man: No problem. I’ll email it as soon as I finish.'],question:'What will the man do next?',opts:['Repeat the thermal test','Call the supplier','Email the report','Schedule a meeting'],answer:2,why:'He says he will email the report as soon as he finishes checking the data.'},
{scene:'Hotel Check-in',lines:['Man: Hello. I have a reservation under the name Wu.','Woman: Welcome. May I see your passport, please?','Man: Of course. Is breakfast included?','Woman: Yes. Breakfast is served from six thirty to ten.'],question:'What does the man want to know?',opts:['The Wi-Fi password','The breakfast time','The room price','The checkout date'],answer:1,why:'He asks whether breakfast is included with the room.'},
{scene:'Office Scheduling',lines:['Woman: Are you available for a meeting tomorrow morning?','Man: I’m afraid I’m busy until ten.','Woman: How about ten thirty?','Man: That works for me. Please send me an invitation.'],question:'When can the man attend the meeting?',opts:['At 9:00','At 9:30','At 10:00','At 10:30'],answer:3,why:'They agree to meet at 10:30.'}
,
{scene:'Airport Check-in',lines:['Agent: May I see your passport and ticket?','Traveler: Certainly. Here they are.','Agent: Are you checking any bags today?','Traveler: Yes, one suitcase.'],question:'What does the traveler need to show?',opts:['A hotel booking','A passport and ticket','A driving license','A boarding pass only'],answer:1,why:'The agent asks to see the traveler’s passport and ticket.'},
{scene:'Train Information',lines:['Passenger: What time does the next train leave for Taichung?','Staff: It leaves at 9:15 from platform three.','Passenger: How much is a one-way ticket?','Staff: It costs 250 dollars.'],question:'Which platform does the passenger need?',opts:['Platform one','Platform two','Platform three','Platform four'],answer:2,why:'The staff member says the train leaves from platform three.'}
]
let activeSpeech:SpeechSynthesisUtterance|null=null

export default function App(){
 const [store,setStore]=useState<any>(()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return {}}})
 const [page,setPage]=useState<'home'|'quiz'|'result'|'progress'|'vocab'>('home')
 const [chapterId,setChapterId]=useState(1)
 const [module,setModule]=useState<'grammar'|'fill'|'integrated'|'scenario'|'review'|'daily'>('grammar')
 const [list,setList]=useState<Q[]>([])
 const [idx,setIdx]=useState(0)
 const [answers,setAnswers]=useState<(number|string|null)[]>([])
 const [choice,setChoice]=useState<number|null>(null)
 const [inputAnswer,setInputAnswer]=useState('')
 const [result,setResult]=useState<any[]|null>(null)
 const [dialogue,setDialogue]=useState<any>(null)
 const [reviewForChapter,setReviewForChapter]=useState(false)
 const [sessionStart,setSessionStart]=useState(0)
 const [selectedWord,setSelectedWord]=useState<{word:string;meaning:string;example:string}|null>(null)
 const history:Record<string,H>=store.history||{}
 useEffect(()=>{localStorage.setItem(KEY,JSON.stringify(store))},[store])
 
 const chapter=chapters.find(c=>c.id===chapterId)||chapters[0]
 const currentStageId=Math.min(4,chapterId)
 const currentStage=learningStages[currentStageId-1]
 const dailyMission=useMemo(()=>buildDailyMission(bank,history,currentStageId),[store,currentStageId])
 const progress=store.chapterProgress||{}
 const chapterStatus=(id:number)=>progress[id]||{}
 const chapterCompleted=(id:number)=>['grammar','fill','integrated'].every(k=>chapterStatus(id)[k])||!!chapterStatus(id).reviewPassed
 const isUnlocked=(id:number)=>id===1||chapters.slice(0,id-1).every(c=>chapterCompleted(c.id))
 const completedModules=['grammar','fill','integrated'].filter(k=>chapterStatus(chapterId)[k]).length
 const chapterQuestionIds=(c:any)=>[...new Set([...c.grammar,...c.fill,...c.integrated])]
 const chapterMistakeIds=(id:number)=>{const c=chapters.find(x=>x.id===id)||chapters[0];const saved=(store.chapterMistakes||{})[id]||[];const legacy=chapterQuestionIds(c).filter((qid:string)=>history[qid]?.tries>0&&history[qid]?.streak===0);return [...new Set([...saved,...legacy])]}
 const chapterReady=chapterCompleted(chapterId)
 const savedWords:SavedWord[]=store.vocab||[]
 const due=useMemo(()=>bank.filter(q=>history[q.id]&&!history[q.id].mastered&&history[q.id].due<=Date.now()),[store])
 const vocabWords=useMemo(()=>chapter.fill.map(id=>bank.find(q=>q.id===id)).filter(Boolean).slice(0,15) as Q[],[chapterId])
 const begin=(kind:'grammar'|'fill'|'integrated'|'scenario')=>{
  setModule(kind);setSelectedWord(null);setSessionStart(Date.now());setIdx(0);setAnswers([]);setChoice(null);setInputAnswer('');setResult(null);setDialogue(null)
  if(kind==='scenario'){
   const pool=dialoguePool.filter((d:any)=>chapterId===1?['Restaurant Reservation','Public Transportation','Hotel Check-in'].includes(d.scene):chapterId===2?['Airport Check-in','Train Information'].includes(d.scene):['Work Meeting','Office Scheduling'].includes(d.scene))
   const d=pool[Math.floor(Math.random()*pool.length)]||dialoguePool[0];setDialogue(d)
   const q:Q={id:'dialogue-'+Date.now(),kind:'情境對話',level:chapterId,q:d.question,passage:d.lines.join('\n'),opts:d.opts,a:d.answer,why:d.why,topic:d.scene}
   setList([q])
  }else{
   const ids=chapter[kind]
   const selected=ids.map(id=>bank.find(q=>q.id===id)).filter(Boolean) as Q[]
   setList(kind==='fill'?selected:selected.sort(()=>Math.random()-.5).slice(0,Math.min(10,selected.length)))
  }
  setPage('quiz')
 }
 const submit=()=>{
  if(!list.length)return
  const all=[...answers,module==='fill'?(inputAnswer.trim()||null):choice]
  const rs=list.map((q,i)=>({q,choice:all[i]??null,correct:q.answerText?String(all[i]??'').trim().toLowerCase()===q.answerText.toLowerCase():all[i]===q.a}))
  setResult(rs);setPage('result')
  const h={...history}
  rs.forEach(({q,correct})=>{const old=h[q.id]||{streak:0,tries:0,due:Date.now(),mastered:false};const streak=correct?old.streak+1:0;const days=[1,3,7,14,30];h[q.id]={streak,tries:old.tries+1,due:Date.now()+(correct?days[Math.min(streak-1,4)]:0)*86400000,mastered:streak>=5}})
  const elapsed=Math.max(0,Math.round((Date.now()-(sessionStart||Date.now()))/1000))
  const day=new Date().toDateString()
  const passed=rs.length>0&&rs.filter(x=>x.correct).length/rs.length>=0.7
  setStore((s:any)=>({...s,history:h,completed:(s.completed||0)+1,answered:(s.answered||0)+rs.length,correct:(s.correct||0)+rs.filter(x=>x.correct).length,studySeconds:(s.studySeconds||0)+elapsed,dailyStudy:{...(s.dailyStudy||{}),[day]:((s.dailyStudy||{})[day]||0)+elapsed},chapterProgress:{...(s.chapterProgress||{}),[chapterId]:{...(s.chapterProgress||{})[chapterId],[module]:passed||((s.chapterProgress||{})[chapterId]||{})[module]||false}}}))
 }
 const mastered=Object.values(history).filter(x=>x.mastered).length
 const answered=store.answered||0,correct=store.correct||0,studyMinutes=Math.floor((store.studySeconds||0)/60)
 const q=list[idx]
  const markWord=(word:string)=>{const meaning=dictionary[word.toLowerCase()]||'請依照上下文理解';setSelectedWord({word,meaning,example:q?.passage||q?.q||''})}
 const addWord=()=>{if(!selectedWord)return;const exists=savedWords.some(w=>w.word.toLowerCase()===selectedWord.word.toLowerCase());if(!exists)setStore((s:any)=>({...s,vocab:[...(s.vocab||[]),{...selectedWord,addedAt:Date.now()}]}))}
 const finishQuestion=(value:number|string|null)=>{
  if(idx+1<list.length){setAnswers(a=>[...a,value]);setIdx(i=>i+1);setChoice(null);setInputAnswer('')}
  else{const prior=[...answers,value];const rs=list.map((item,i)=>({q:item,choice:prior[i]??null,correct:item.answerText?String(prior[i]??'').trim().toLowerCase()===item.answerText.toLowerCase():prior[i]===item.a}));setAnswers(prior);submitWith(rs)}
 }
 const submitWith=(rs:any[])=>{
  setResult(rs);setPage('result')
  const h={...history}
  rs.forEach(({q:item,correct:ok})=>{const old=h[item.id]||{streak:0,tries:0,due:Date.now(),mastered:false};const streak=ok?old.streak+1:0;h[item.id]={streak,tries:old.tries+1,due:Date.now()+(ok?[1,3,7,14,30][Math.min(streak-1,4)]:0)*86400000,mastered:streak>=5}})
  const elapsed=Math.max(0,Math.round((Date.now()-(sessionStart||Date.now()))/1000)),day=new Date().toDateString()
  const passed=rs.length>0&&rs.filter(x=>x.correct).length/rs.length>=0.7
  const perfect=rs.length>0&&rs.every(x=>x.correct)
  setStore((s:any)=>{
   const mistakes={...(s.chapterMistakes||{})}
   const mistakeQuestions={...(s.chapterMistakeQuestions||{})}
   const dialoguePending=[...((mistakeQuestions[chapterId]||[]) as Q[])]
   if(module==='review'&&reviewForChapter){
    const legacy=chapterQuestionIds(chapters.find(x=>x.id===chapterId)||chapters[0]).filter((qid:string)=>history[qid]?.tries>0&&history[qid]?.streak===0)
    const pending=new Set([...(mistakes[chapterId]||[]),...legacy])
    rs.forEach(({q:item,correct:ok})=>{if(ok)pending.delete(item.id);else pending.add(item.id);if(item.kind==='情境對話'){const at=dialoguePending.findIndex(x=>x.id===item.id);if(ok&&at>=0)dialoguePending.splice(at,1);else if(!ok&&at<0)dialoguePending.push(item)}})
    mistakes[chapterId]=[...pending]
    mistakeQuestions[chapterId]=dialoguePending
   }else if(module!=='review'){
    const pending=new Set(mistakes[chapterId]||[])
    rs.forEach(({q:item,correct:ok})=>{if(!ok){pending.add(item.id);if(item.kind==='情境對話'&&!dialoguePending.some(x=>x.id===item.id))dialoguePending.push(item)}})
    mistakes[chapterId]=[...pending]
    mistakeQuestions[chapterId]=dialoguePending
   }
   const oldChapter=(s.chapterProgress||{})[chapterId]||{}
   const chapterProgress={...(s.chapterProgress||{}),[chapterId]:{...oldChapter,...(module==='review'&&reviewForChapter&&perfect&&mistakes[chapterId].length===0&&dialoguePending.length===0?{reviewPassed:true}:{}),...(module!=='review'?{[module]:passed||oldChapter[module]||false}:{})}}
   return {...s,history:h,chapterMistakes:mistakes,chapterMistakeQuestions:mistakeQuestions,completed:(s.completed||0)+1,answered:(s.answered||0)+rs.length,correct:(s.correct||0)+rs.filter(x=>x.correct).length,studySeconds:(s.studySeconds||0)+elapsed,dailyStudy:{...(s.dailyStudy||{}),[day]:((s.dailyStudy||{})[day]||0)+elapsed},chapterProgress}
  })
 }
 const startDailyMission=()=>{
  const pool=dailyMission.questionIds.map(id=>bank.find(q=>q.id===id)).filter(Boolean) as Q[]
  if(!pool.length){alert('目前題庫中沒有可安排的核心任務，請先進行自由練習。');return}
  setModule('daily' as any);setReviewForChapter(false);setList(pool);setSessionStart(Date.now());setIdx(0);setAnswers([]);setChoice(null);setInputAnswer('');setResult(null);setDialogue(null);setSelectedWord(null);setPage('quiz')
 }
 const startChapterReview=()=>{
  const ids=chapterMistakeIds(chapterId)
  const pool=[...ids.map((id:string)=>bank.find(x=>x.id===id)).filter(Boolean) as Q[],...(((store.chapterMistakeQuestions||{})[chapterId]||[]) as Q[])]
  if(!pool.length){alert('本章目前沒有需要訂正的錯題。');return}
  setModule('review');setReviewForChapter(true);setList(pool.slice(0,20));setSessionStart(Date.now());setIdx(0);setAnswers([]);setChoice(null);setInputAnswer('');setResult(null);setDialogue(null);setSelectedWord(null);setPage('quiz')
 }
 const startReview=()=>{const pool=due.length?due:bank.filter(x=>history[x.id]&&!history[x.id].mastered);if(!pool.length){alert('目前沒有待複習題目。');return}setReviewForChapter(false);setList(pool.slice(0,20));setModule('review');setSessionStart(Date.now());setIdx(0);setAnswers([]);setChoice(null);setInputAnswer('');setResult(null);setPage('quiz')}
 return <div className="shell">
  <header><div className="logo">EN</div><div><b>ENGLISH FOR MING</b><small>Chapter-based English Learning</small></div></header>
  <main>
   {page==='home'&&<div className="stack">
    <section className="goal-card"><div><small>YOUR LEARNING PATH</small><h2>TOEIC 800</h2><p>先建立生活英文基礎，再逐步進入職場與多益情境。</p></div><div className="milestones"><b>基礎</b><span>550</span><span>650</span><span>750</span><span>800</span></div></section>
    <section className="chapter-card"><div className="chapter-heading"><div><small>YOUR CURRENT CHAPTER</small><h1>Chapter {chapter.id}｜{chapter.title}</h1><p>{chapter.subtitle}・{chapter.description}</p></div><span className="chapter-count">{completedModules}/3</span></div><div className="goal-progress"><i style={{width:(completedModules/3*100)+'%'}}/></div><p className="chapter-hint">三個核心單元各達 70% 即可完成本章；情境對話為額外練習。錯題訂正可持續累積與複習。</p>{chapterReady&&chapterId<chapters.length&&<button className="primary wide next-chapter" onClick={()=>setChapterId(chapterId+1)}>前往下一章：{chapters[chapterId].title} <ChevronRight/></button>}</section>
    <section className="daily-mission-card"><div className="daily-mission-top"><div><small>ADAPTIVE DAILY MISSION</small><h2>今日核心任務</h2><p>{currentStage.code}・{currentStage.title}｜依照目前熟悉度自動安排</p></div><span>{dailyMission.questionIds.length} 題</span></div><div className="daily-mission-items">{dailyMission.items.map(item=><div className="daily-mission-item" key={item.skill}><b>{item.title}</b><small>{item.questionIds.length} 題</small><p>{item.reason}</p></div>)}</div><div className="daily-mission-bottom"><span>建議約 {dailyMission.estimatedMinutes} 分鐘，完成後仍可自由繼續學習。</span><button className="primary wide" onClick={startDailyMission}>開始今日任務 <ChevronRight/></button></div></section>
    <section className="home-vocab"><div className="home-vocab-head"><div><label>CHAPTER VOCABULARY</label><h2>本章核心單字</h2><p>單字、例句與中文翻譯。</p></div><span>{vocabWords.length} 個</span></div><div className="chapter-vocab-list">{vocabWords.map((word,i)=>{const text=(word.q||'').replace('_____ ',(word.answerText||'')+' ');return <article className="chapter-vocab-item" key={word.id}><div className="vocab-title"><b>{word.answerText}</b><span>{word.meaning}</span></div><p className="example-en">{text}</p><p className="example-zh">{exampleTranslations[word.answerText||'']||'請依照本句情境理解句意。'}</p></article>})}</div></section>
    <h2>本章練習</h2><div className="tiles chapter-tiles">
     <button onClick={()=>begin('grammar')}><BookOpen/><b>文法</b><small>句型與文法觀念</small><em>{chapterStatus(chapterId).grammar?'已完成':'開始練習'}</em></button>
     <button onClick={()=>begin('fill')}><BookOpen/><b>填空</b><small>單字與句型應用</small><em>{chapterStatus(chapterId).fill?'已完成':'開始練習'}</em></button>
     <button onClick={()=>begin('integrated')}><Brain/><b>綜合練習</b><small>混合題型與閱讀理解</small><em>{chapterStatus(chapterId).integrated?'已完成':'開始練習'}</em></button>
     <button onClick={()=>begin('scenario')}><BookOpen/><b>情境對話</b><small>Read and understand English dialogues</small><em>{chapterStatus(chapterId).scenario?'已完成':'開始練習'}</em></button>
     <button onClick={startChapterReview}><Brain/><b>錯題練習</b><small>本章待訂正 {chapterMistakeIds(chapterId).filter((id:string)=>bank.some(q=>q.id===id)).length+(((store.chapterMistakeQuestions||{})[chapterId]||[]).length)} 題；全對即可解鎖下一章</small><em>{chapterStatus(chapterId).reviewPassed?'已達 100%':'開始訂正'}</em></button>
    </div>
    <section className="chapter-list"><h2>課程章節</h2>{chapters.map(c=>{const unlocked=isUnlocked(c.id),done=chapterCompleted(c.id);return <button key={c.id} className={'chapter-row '+(c.id===chapterId?'selected':'')} disabled={!unlocked} onClick={()=>setChapterId(c.id)}><span className="chapter-number">{String(c.id).padStart(2,'0')}</span><span className="chapter-info"><b>{c.title}</b><small>{c.subtitle}</small></span><span className="chapter-state">{done?'已完成':unlocked?'可學習':'🔒 未解鎖'}</span></button>})}</section>
    <div className="stats"><article><small>累積學習時間</small><b>{studyMinutes}</b><small>分鐘</small></article><article><small>已熟悉題目</small><b>{mastered}</b><small>連續答對 5 次</small></article></div>
    <div className="tiles"><button onClick={startReview}><Brain/><b>錯題複習</b><small>目前待複習 {due.length} 題</small></button><button onClick={()=>setPage('progress')}><ChartNoAxesCombined/><b>學習分析</b><small>查看累積紀錄</small></button><button onClick={()=>setPage('vocab')}><BookOpen/><b>個人單字本</b><small>收藏 {savedWords.length} 個單字</small></button></div>
   </div>}
   {page==='quiz'&&q&&<div className="stack">
    <div className="qtop"><button className="link" onClick={()=>setPage('home')}>← 返回章節</button><span>{idx+1} / {list.length}</span></div><div className="track"><i style={{width:((idx+1)/list.length*100)+'%'}}/></div>
    <div><span className="pill">{module==='grammar'?'文法':module==='fill'?'填空':module==='integrated'?'綜合練習':module==='review'?'錯題練習':module==='daily'?'今日任務':'情境對話'}</span><span className="pill muted">Chapter {chapterId}</span></div>
    {q.kind==='情境對話'&&dialogue&&<section className="passage"><div className="passagehead">SITUATION DIALOGUE｜{dialogue.scene}</div><p className="dialogue-note">Read the dialogue and choose the best answer.</p><div className="dialogue-lines">{dialogue.lines.map((line:string,i:number)=><div className="dialogue-line" key={i}><b>{line}</b></div>)}</div></section>}
    {q.kind!=='情境對話'&&q.passage&&<section className="passage"><div className="passagehead">READING PASSAGE</div>{q.passage.split(/(\b[\w'-]+\b)/g).map((part,i)=>{const meaning=dictionary[part.toLowerCase()];return meaning?<button key={i} className="passage-word" onClick={()=>markWord(part)}>{part}</button>:<span key={i}>{part}</span>})}</section>}
    {selectedWord&&<section className="word-detail"><div><small>WORD DETAILS</small><h3>{selectedWord.word}</h3><p>{selectedWord.meaning}</p></div><button className="audio" onClick={addWord}>加入單字本</button></section>}
    <section className="question"><small>QUESTION {idx+1}</small><h2>{q.q}</h2></section>
    {q.kind==='填空'?<div className="blank-answer"><label>請輸入英文答案</label><p className="meaning-hint">中文提示：{q.meaning}</p><input value={inputAnswer} onChange={e=>setInputAnswer(e.target.value)} placeholder="Type your answer" autoComplete="off"/></div>:<div className="options">{q.opts.map((o,i)=><button className={choice===i?'chosen':''} onClick={()=>setChoice(i)} key={o}><span>{'ABCD'[i]}</span>{o}{choice===i&&<Check/>}</button>)}</div>}
    <div className="actions"><button className="link" onClick={()=>{setChoice(null);setInputAnswer('')}}>清除答案</button><button className="primary" onClick={()=>finishQuestion(q.kind==='填空'?(inputAnswer.trim()||null):choice)}>{idx+1===list.length?'提交答案':'下一題'} <ChevronRight/></button></div><small className="hint">跳過會記為錯題，系統會安排複習。</small>
   </div>}
   {page==='result'&&result&&<div className="stack"><section className="score"><div className="ring">{Math.round(result.filter(x=>x.correct).length/result.length*100)}<small>%</small></div><h1>練習完成</h1><p>答對 {result.filter(x=>x.correct).length} 題・共 {result.length} 題</p></section>{result.map((r,i)=><article className="explain" key={r.q.id}><div className="explainhead">第 {i+1} 題・{r.q.kind}<b className={r.correct?'green':'red'}>{r.correct?'答對':'答錯／跳過'}</b></div><h3>{r.q.q}</h3>{r.q.kind==='情境對話'&&<><p><b>Dialogue transcript:</b></p>{(r.q.passage||'').split('\n').map((line:string,i:number)=><p key={i}>{line}</p>)}</>}{r.q.kind!=='情境對話'&&r.q.passage&&<p>{r.q.passage}</p>}<p><b>正確答案：</b>{r.q.answerText||r.q.opts[r.q.a]}</p>{r.q.why}</article>)}{module==='review'&&reviewForChapter&&result.every(x=>x.correct)&&chapterId<chapters.length&&<button className="primary wide next-chapter" onClick={()=>{setChapterId(chapterId+1);setPage('home')}}>前往下一章：{chapters[chapterId].title} <ChevronRight/></button>}<button className="primary wide" onClick={()=>setPage('home')}>返回章節</button></div>}
   {page==='progress'&&<div className="stack"><div className="row"><h1>學習分析</h1><button className="link" onClick={()=>setPage('home')}>返回首頁</button></div><section className="scorecard"><small>TOEIC 學習目標</small><h2>550 → 800</h2><p>目前紀錄反映練習表現，不等同正式多益分數。</p></section><div className="stats"><article><small>完成單元</small><b>{store.completed||0}</b></article><article><small>累積答題</small><b>{answered}</b></article><article><small>累積正確率</small><b>{answered?Math.round(correct/answered*100):0}%</b></article><article><small>已熟悉題目</small><b>{mastered}</b></article></div><h2>章節完成狀態</h2>{chapters.map(c=><div className="mastery" key={c.id}><b>{c.title}</b><span>{['grammar','fill','integrated'].filter(k=>chapterStatus(c.id)[k]).length}/3 單元{chapterStatus(c.id).reviewPassed?'・錯題滿分解鎖':''}</span></div>)}<h2>題目熟悉度</h2>{bank.filter(item=>history[item.id]).map(item=><div className="mastery" key={item.id}><div><b>{item.topic}</b><small>{item.kind}・作答 {history[item.id].tries} 次</small></div><span>{history[item.id].mastered?'已熟悉':'連續答對 '+history[item.id].streak+'/5'}</span></div>)}</div>}
   {page==='vocab'&&<div className="stack"><div className="row"><h1>個人單字本</h1><button className="link" onClick={()=>setPage('home')}>返回首頁</button></div>{savedWords.length?savedWords.map(w=><article className="saved-word" key={w.word}><div><b>{w.word}</b><p>{w.meaning}</p><small>{w.example}</small></div></article>):<aside>目前還沒有收藏的單字。</aside>}</div>}
  </main>
  <nav><button className={page==='home'?'active':''} onClick={()=>setPage('home')}><Home/>章節</button><button className={page==='progress'?'active':''} onClick={()=>setPage('progress')}><ChartNoAxesCombined/>分析</button></nav>
 </div>
}
