import {useEffect,useMemo,useState} from 'react'
import {BookOpen,Brain,ChartNoAxesCombined,Check,ChevronRight,Headphones,Home,Volume2} from 'lucide-react'
type Q={id:string;kind:string;level:number;q:string;passage?:string;opts:string[];a:number;answerText?:string;meaning?:string;why:string;topic:string;word?:string}
const bank:Q[]=[
{id:'1',kind:'單字',level:1,q:'I _____ a student.',opts:['am','is','are','be'],a:0,why:'I 搭配 be 動詞 am，表示「我是學生」。',topic:'be 動詞'},
{id:'2',kind:'文法',level:1,q:'He _____ my friend.',opts:['am','is','are','be'],a:1,why:'He 是第三人稱單數，be 動詞使用 is。',topic:'be 動詞'},
{id:'3',kind:'單字',level:1,q:'What is the opposite of “big”?',opts:['small','long','tall','old'],a:0,why:'small 是 big 的相反詞，表示小的。',topic:'反義詞',word:'small'},
{id:'4',kind:'文法',level:1,q:'They _____ soccer after school.',opts:['plays','play','playing','played'],a:1,why:'They 是複數主詞，現在簡單式使用 play。',topic:'現在簡單式'},
{id:'5',kind:'單字',level:1,q:'I drink a glass of _____ every morning.',opts:['milk','chair','book','shirt'],a:0,why:'milk 是牛奶，drink milk 是常見搭配。',topic:'生活單字',word:'milk'},
{id:'6',kind:'文法',level:1,q:'There _____ two cats in the room.',opts:['is','am','are','be'],a:2,why:'two cats 是複數，There are 用來表示「有……」。',topic:'There be'},
{id:'7',kind:'閱讀',level:1,q:'What does Amy do on Sunday?',passage:'Amy is a junior high school student. She likes music. Every Sunday, she goes to the park with her brother and plays badminton.',opts:['She studies at the library','She plays badminton','She watches a movie','She visits her teacher'],a:1,why:'文章最後一句提到她和哥哥去公園打羽毛球。',topic:'閱讀主旨'},
{id:'8',kind:'單字',level:1,q:'My father drives a _____ to work.',opts:['car','banana','window','water'],a:0,why:'car 是汽車；drive a car 表示開車。',topic:'生活單字',word:'car'},
{id:'9',kind:'文法',level:1,q:'We _____ TV last night.',opts:['watch','watches','watched','watching'],a:2,why:'last night 是過去時間，watch 的過去式是 watched。',topic:'過去簡單式'},
{id:'10',kind:'單字',level:1,q:'The weather is very _____. Let’s go swimming.',opts:['hot','hungry','young','busy'],a:0,why:'hot 表示炎熱；天氣很熱適合去游泳。',topic:'生活形容詞',word:'hot'},
{id:'11',kind:'文法',level:2,q:'If the flow rate increases, the pressure drop usually _____.',opts:['increase','increases','increased','increasing'],a:1,why:'一般事實使用現在簡單式。主詞 the pressure drop 為第三人稱單數，因此用 increases。',topic:'主詞動詞一致'},
{id:'12',kind:'單字',level:2,q:'The team is currently _____ the new pump.',opts:['evaluate','evaluated','evaluating','evaluation'],a:2,why:'is currently + V-ing，表示目前正在進行的動作。evaluate 是評估。',topic:'evaluate',word:'evaluate'},
{id:'13',kind:'文法',level:2,q:'The new design is more efficient _____ the previous one.',opts:['then','than','that','as'],a:1,why:'比較級 more efficient 後面使用 than，表示「比……更有效率」。',topic:'比較級'},
{id:'14',kind:'閱讀',level:2,q:'When will the customer receive the report?',passage:'The engineering team completed the thermal test on Monday. The data is being reviewed now, and the final report is scheduled to be sent to the customer on Wednesday morning.',opts:['Monday','Tuesday morning','Wednesday morning','Friday afternoon'],a:2,why:'最後一句明確指出 final report 將於 Wednesday morning 寄給客戶。',topic:'閱讀細節'},
{id:'15',kind:'單字',level:2,q:'The engineer identified a potential _____ in the test setup.',opts:['issue','issueing','issued','issues'],a:0,why:'a potential 後面需要單數名詞。issue 是問題、議題。',topic:'issue',word:'issue'},
{id:'16',kind:'文法',level:2,q:'Neither the pump nor the fans _____ available.',opts:['is','are','be','was'],a:1,why:'neither...nor... 的動詞通常依靠近動詞的主詞決定。fans 是複數，因此用 are。',topic:'neither...nor...'},
{id:'17',kind:'單字',level:2,q:'Please _____ the two simulation results.',opts:['compare','complete','contain','considering'],a:0,why:'compare A and B / compare A with B，表示比較。',topic:'compare',word:'compare'},
{id:'18',kind:'文法',level:2,q:'By the time we arrived, the meeting _____.',opts:['starts','has started','had started','starting'],a:2,why:'過去某個時間點之前已完成的動作，使用過去完成式 had + 過去分詞。',topic:'過去完成式'},
{id:'19',kind:'閱讀',level:2,q:'Why was the delivery delayed?',passage:'The supplier informed us that the copper material did not pass the incoming inspection. A replacement batch is being prepared, so the prototype delivery will be delayed by two days.',opts:['The drawing was incomplete','The pump failed','The copper material failed inspection','The customer changed the schedule'],a:2,why:'原文指出 copper material did not pass the incoming inspection，因此交期延後。',topic:'閱讀因果'},
{id:'20',kind:'單字',level:2,q:'The test results are _____ with the simulation.',opts:['consistent','consist','consistency','consisting'],a:0,why:'be consistent with 表示「與……一致」。be 動詞後面需要形容詞 consistent。',topic:'consistent',word:'consistent'},
{id:'21',kind:'填空',level:1,q:'I usually _____ breakfast at seven.',opts:[],a:-1,answerText:'eat',meaning:'吃',why:'eat 是「吃」。eat breakfast 表示吃早餐。',topic:'eat',word:'eat'},
{id:'22',kind:'填空',level:1,q:'My brother is _____ than me.',opts:[],a:-1,answerText:'taller',meaning:'比較高的',why:'tall 的比較級是 taller，表示「比較高」。',topic:'tall',word:'taller'},
{id:'23',kind:'填空',level:1,q:'There are _____ apples on the table.',opts:[],a:-1,answerText:'three',meaning:'三',why:'three 是數字 3。There are 後面可接複數名詞。',topic:'three',word:'three'},
{id:'24',kind:'填空',level:1,q:'Please _____ the door.',opts:[],a:-1,answerText:'close',meaning:'關上',why:'close 是動詞，表示關上。Please + 原形動詞可形成禮貌請求。',topic:'close',word:'close'},
{id:'25',kind:'填空',level:1,q:'She _____ to school by bus every day.',opts:[],a:-1,answerText:'goes',meaning:'去（第三人稱單數）',why:'主詞 She 是第三人稱單數，現在簡單式 go 要加 -es，變成 goes。',topic:'go',word:'goes'},
{id:'26',kind:'填空',level:1,q:'We should _____ plastic bottles.',opts:[],a:-1,answerText:'recycle',meaning:'回收',why:'recycle 是回收，常用於環保與垃圾分類。',topic:'環保',word:'recycle'},
{id:'27',kind:'填空',level:1,q:'There is a lot of _____ on the road today.',opts:[],a:-1,answerText:'traffic',meaning:'交通；車流',why:'traffic 是交通或車流量，常用於描述路況。',topic:'交通',word:'traffic'},
{id:'28',kind:'填空',level:1,q:'The _____ will be sunny tomorrow.',opts:[],a:-1,answerText:'weather',meaning:'天氣',why:'weather 是天氣，常見於天氣預報。',topic:'生活',word:'weather'},
{id:'29',kind:'填空',level:1,q:'Eating vegetables helps us stay _____.',opts:[],a:-1,answerText:'healthy',meaning:'健康的',why:'healthy 是形容詞，表示健康的。',topic:'健康',word:'healthy'},
{id:'30',kind:'填空',level:1,q:'I want to _____ to Japan next year.',opts:[],a:-1,answerText:'travel',meaning:'旅行',why:'travel 是旅行、旅遊。',topic:'旅遊',word:'travel'},
{id:'31',kind:'填空',level:1,q:'I usually read the news _____.',opts:[],a:-1,answerText:'online',meaning:'線上的',why:'online 表示在線上、透過網路。',topic:'數位生活',word:'online'},
{id:'32',kind:'填空',level:1,q:'I sent a _____ to my friend.',opts:[],a:-1,answerText:'message',meaning:'訊息',why:'message 是訊息；send a message 表示傳訊息。',topic:'數位生活',word:'message'},
{id:'33',kind:'填空',level:1,q:'What time will the train _____?',opts:[],a:-1,answerText:'arrive',meaning:'抵達',why:'arrive 是抵達；arrive at/in 表示抵達某地。',topic:'交通旅遊',word:'arrive'},
{id:'34',kind:'填空',level:1,q:'This movie is very _____ with teenagers.',opts:[],a:-1,answerText:'popular',meaning:'受歡迎的',why:'popular 是受歡迎的、流行的。',topic:'娛樂',word:'popular'},
{id:'35',kind:'填空',level:1,q:'Getting enough sleep is _____.',opts:[],a:-1,answerText:'important',meaning:'重要的',why:'important 是重要的，常用於表達重要性。',topic:'健康生活',word:'important'},
{id:'36',kind:'填空',level:2,q:'Solar power is a kind of clean _____.',opts:[],a:-1,answerText:'energy',meaning:'能源；精力',why:'energy 可表示能源或精力；clean energy 是潔淨能源。',topic:'環境科技',word:'energy'},
{id:'37',kind:'填空',level:2,q:'We should _____ the environment.',opts:[],a:-1,answerText:'protect',meaning:'保護',why:'protect 是保護，常用於環境與安全議題。',topic:'環境',word:'protect'},
{id:'38',kind:'填空',level:2,q:'We need to _____ plastic waste.',opts:[],a:-1,answerText:'reduce',meaning:'減少',why:'reduce 是減少；reduce waste 表示減少廢棄物。',topic:'環境',word:'reduce'},
{id:'39',kind:'填空',level:2,q:'Please check the meeting _____.',opts:[],a:-1,answerText:'schedule',meaning:'行程；時程',why:'schedule 是行程或時程，常見於工作與日常安排。',topic:'工作生活',word:'schedule'},
{id:'40',kind:'填空',level:2,q:'The company plans to _____ new equipment.',opts:[],a:-1,answerText:'purchase',meaning:'購買',why:'purchase 是較正式的「購買」，常見於商務英文。',topic:'商務',word:'purchase'},
{id:'41',kind:'填空',level:3,q:'Are you _____ for a meeting tomorrow?',opts:[],a:-1,answerText:'available',meaning:'可取得的；有空的',why:'available 可表示有空、可取得，常見於多益通知。',topic:'多益商務',word:'available'},
{id:'42',kind:'填空',level:3,q:'Please _____ your reservation by email.',opts:[],a:-1,answerText:'confirm',meaning:'確認',why:'confirm 是確認，常見於訂位、預約與商務郵件。',topic:'多益商務',word:'confirm'},
{id:'43',kind:'填空',level:3,q:'Please contact the sales _____.',opts:[],a:-1,answerText:'department',meaning:'部門',why:'department 是部門，常見於公司組織與職場情境。',topic:'職場',word:'department'},
{id:'44',kind:'填空',level:3,q:'All the safety _____ must be checked.',opts:[],a:-1,answerText:'equipment',meaning:'設備',why:'equipment 是設備，通常為不可數名詞。',topic:'職場科技',word:'equipment'},
{id:'45',kind:'填空',level:3,q:'The flight was canceled because of a long _____.',opts:[],a:-1,answerText:'delay',meaning:'延誤',why:'delay 是延誤；常見於航班、交貨與專案情境。',topic:'多益生活',word:'delay'},
{id:'46',kind:'聽力',level:1,q:'What time does the store open?',passage:'The store opens at nine a.m. every weekday.',opts:['8:00 a.m.','9:00 a.m.','10:00 a.m.','11:00 a.m.'],a:1,why:'聽力內容提到店家平日早上九點開門。',topic:'聽力：時間'},
{id:'47',kind:'聽力',level:1,q:'Where will the speakers meet?',passage:'Let’s meet in front of the station at six thirty.',opts:['At the office','At the station','At the restaurant','At the airport'],a:1,why:'對話提到在車站前方碰面。',topic:'聽力：地點'},
{id:'48',kind:'聽力',level:2,q:'Why is the meeting postponed?',passage:'The manager is still traveling, so the meeting has been moved to Friday afternoon.',opts:['The room is unavailable','The manager is traveling','The report is incomplete','The customer canceled'],a:1,why:'主管仍在出差，因此會議延到星期五下午。',topic:'聽力：原因'},
{id:'49',kind:'聽力',level:2,q:'What does the man need to do?',passage:'Please send the updated test report to the customer before noon.',opts:['Call the supplier','Book a meeting room','Send the test report','Prepare a new sample'],a:2,why:'對話要求他中午前將更新後的測試報告寄給客戶。',topic:'聽力：行動'},
{id:'50',kind:'聽力',level:1,q:'How will the woman travel to work?',passage:'My car is being repaired, so I will take the bus to work this week.',opts:['By car','By train','By bus','By taxi'],a:2,why:'她的車正在維修，因此這週會搭公車上班。',topic:'聽力：交通'},
{id:'51',kind:'聽力',level:1,q:'What is the weather forecast?',passage:'It will rain this afternoon, so remember to bring an umbrella.',opts:['Sunny','Rainy','Snowy','Windy'],a:1,why:'內容提醒下午會下雨，要記得帶雨傘。',topic:'聽力：天氣'},
{id:'52',kind:'聽力',level:2,q:'When is the deadline?',passage:'Please submit your application by the end of the day on Thursday.',opts:['Wednesday morning','Thursday evening','Friday morning','Next Monday'],a:1,why:'by the end of the day on Thursday 表示星期四當天結束前。',topic:'聽力：期限'},
{id:'53',kind:'聽力',level:2,q:'What does the woman want to order?',passage:'I would like a small coffee and a cheese sandwich, please.',opts:['Tea and cake','A large coffee','A small coffee and sandwich','Juice and salad'],a:2,why:'她點了一杯小杯咖啡和起司三明治。',topic:'聽力：點餐'},
{id:'54',kind:'聽力',level:2,q:'Why is the customer calling?',passage:'I am calling to ask whether my order can be delivered before Friday.',opts:['To cancel an order','To ask about delivery','To request a refund','To change an address'],a:1,why:'客戶來電詢問訂單能否在星期五前送達。',topic:'聽力：目的'},
{id:'55',kind:'聽力',level:3,q:'What will the engineering team do next?',passage:'The initial test results look acceptable. The team will repeat the test at a higher flow rate tomorrow.',opts:['Release the product today','Repeat the test at higher flow','Change the customer','Stop the project'],a:1,why:'團隊明天會以更高流量重新測試。',topic:'聽力：工作流程'},
{id:'56',kind:'閱讀',level:1,q:'What does the notice ask visitors to do?',passage:'NOTICE: The library will close at 5 p.m. today for maintenance. Please return all books before leaving.',opts:['Buy a new book','Return books before leaving','Visit tomorrow morning','Pay a late fee'],a:1,why:'公告要求訪客離開前歸還所有書籍。',topic:'閱讀：公告'},
{id:'57',kind:'閱讀',level:1,q:'Where can people buy tickets?',passage:'Tickets for the city museum are available online or at the front desk. Children under six can enter for free.',opts:['At the train station','At the front desk or online','At the school','By phone only'],a:1,why:'文章指出可在線上或服務櫃台購票。',topic:'閱讀：資訊查找'},
{id:'58',kind:'閱讀',level:1,q:'What is included with the hotel room?',passage:'The room rate includes breakfast and free Wi-Fi. Parking is available for an additional fee.',opts:['Free parking','Lunch','Breakfast and Wi-Fi','Airport transportation'],a:2,why:'房價包含早餐和免費 Wi-Fi，停車需額外付費。',topic:'閱讀：細節'},
{id:'59',kind:'閱讀',level:2,q:'Why has the workshop been moved?',passage:'Due to the large number of participants, the product training workshop will be held in Conference Room B instead of Room A.',opts:['Room A is too small','The speaker is late','The equipment is broken','The event is canceled'],a:0,why:'參加人數較多，因此改到較大的 B 會議室。',topic:'閱讀：原因'},
{id:'60',kind:'閱讀',level:2,q:'What should employees do before Friday?',passage:'All employees are asked to complete the online safety course and print the certificate before Friday afternoon.',opts:['Attend a meeting','Submit a travel request','Complete the safety course','Update their passwords'],a:2,why:'員工必須在星期五下午前完成線上安全課程。',topic:'閱讀：指示'},
{id:'61',kind:'閱讀',level:2,q:'What is the main purpose of the email?',passage:'Dear team, The monthly sales meeting has been moved from Tuesday to Thursday at 10 a.m. Please update your calendars. Best, Linda',opts:['To announce a schedule change','To introduce a new employee','To request sales data','To cancel a meeting'],a:0,why:'郵件主要通知月度銷售會議改期。',topic:'閱讀：主旨'},
{id:'62',kind:'閱讀',level:3,q:'What can be inferred about the shipment?',passage:'The supplier confirmed that the replacement parts passed inspection this morning. They are expected to leave the factory tomorrow and arrive at our site early next week.',opts:['The parts failed inspection','The shipment has already arrived','The parts will be shipped tomorrow','The supplier canceled the order'],a:2,why:'零件已通過檢驗，預計明天從工廠出貨。',topic:'閱讀：推論'},
{id:'63',kind:'閱讀',level:3,q:'Which statement is true about the new policy?',passage:'Starting next month, employees may work remotely up to two days per week with manager approval. Requests must be submitted at least three business days in advance.',opts:['Remote work is unlimited','Manager approval is required','Requests can be made on the same day','The policy starts this week'],a:1,why:'新政策明確要求遠端工作須經主管核准。',topic:'閱讀：政策細節'},
{id:'64',kind:'閱讀',level:2,q:'What is the purpose of the notice?',passage:'The office cafeteria will be closed for cleaning on Saturday. Employees may use the café on the first floor during this time.',opts:['To announce a temporary closure','To introduce a new menu','To invite employees to a meeting','To change office hours'],a:0,why:'公告通知員工餐廳星期六因清潔暫停開放。',topic:'閱讀：公告目的'},
{id:'65',kind:'閱讀',level:3,q:'What must happen before the product launch date is confirmed?',passage:'The marketing team has completed the product brochure. However, the launch date will not be confirmed until the final safety review is finished next week.',opts:['The brochure must be rewritten','The safety review must be completed','The product must be shipped','The customer must approve the price'],a:1,why:'上市日期要等下週完成最終安全審查後才能確認。',topic:'閱讀：推論'}]
type H={streak:number;tries:number;due:number;mastered:boolean}
type SavedWord={word:string;meaning:string;example:string;addedAt:number}
const dictionary:Record<string,string>={amy:'艾美（人名）',junior:'初中的',high:'高的；高級的',school:'學校',student:'學生',likes:'喜歡',music:'音樂',every:'每一個',sunday:'星期日',goes:'去；前往',park:'公園',with:'和；與',brother:'兄弟',plays:'玩；打（球）',badminton:'羽毛球',engineer:'工程師',engineering:'工程',team:'團隊',completed:'完成',thermal:'熱的；熱能的',test:'測試',monday:'星期一',data:'資料；數據',being:'正在；處於',reviewed:'已審查',now:'現在',final:'最終的',report:'報告',scheduled:'預定的',sent:'寄送；送出',customer:'客戶',wednesday:'星期三',morning:'早上',supplier:'供應商',informed:'通知',copper:'銅',material:'材料',did:'做（do 的過去式）',not:'不；沒有',pass:'通過',incoming:'進料的',inspection:'檢驗',replacement:'替換品；替代的',batch:'批次',prepared:'已準備',prototype:'原型；樣品',delivery:'交貨；配送',delayed:'延遲的',two:'二；兩個',days:'天',the:'這個；那個',is:'是；在',a:'一個',she:'她',he:'他',it:'它；這',and:'和；而且',to:'到；向',on:'在（某一天）',by:'藉由；由',because:'因為',of:'……的',so:'所以',will:'將會',that:'那個；引導子句',we:'我們',us:'我們（受格）',they:'他們',are:'是；在',was:'是；在（過去式）','didn’t':'沒有'}
const KEY='english-for-ming-v2'
const exampleTranslations:Record<string,string>={
eat:'我通常七點吃早餐。',taller:'我哥哥比我高。',three:'桌上有三顆蘋果。',close:'請把門關上。',goes:'她每天搭公車上學。',recycle:'我們應該回收塑膠瓶。',traffic:'今天路上車很多。',weather:'明天天氣會晴朗。',healthy:'吃蔬菜有助於保持健康。',travel:'我明年想去日本旅行。',online:'我通常在線上閱讀新聞。',message:'我傳了一則訊息給朋友。',arrive:'火車幾點抵達？',popular:'這部電影很受青少年歡迎。',important:'充足的睡眠很重要。'
}
const chapters=[
{id:1,title:'日常生活',subtitle:'Daily Life',description:'從自我介紹、日常習慣到生活對話，建立英文基礎。',grammar:['2','4','6','9'],fill:['21','22','23','24','25','26','27','28','29','30','31','32','33','34','35'],integrated:['1','3','5','7','8','10','56','57','58'],listening:['46','47','50','51','53']},
{id:2,title:'交通與旅遊',subtitle:'Travel & Transportation',description:'練習交通、住宿、購物與旅遊時常見的英文。',grammar:['13','16','18'],fill:['33','39','40','42','45'],integrated:['14','19','20','57','59','60','61'],listening:['52','54','46','47','50']},
{id:3,title:'工作與職場',subtitle:'Workplace English',description:'進入會議、工作安排、報告與商務溝通情境。',grammar:['11','13','16','18'],fill:['36','37','38','39','40','41','42','43','44','45'],integrated:['14','19','20','62','63','65'],listening:['48','49','55']}
]
const dialoguePool=[
{scene:'餐廳訂位',lines:['Woman: Good evening. I’d like to make a reservation for two.','Man: Certainly. What time would you prefer?','Woman: Around seven thirty, please.','Man: We have a table available at 7:30. May I have your name?','Woman: It’s Ming. Thank you.'],question:'What is the woman calling to do?',opts:['Cancel a reservation','Make a reservation','Order dinner','Ask for directions'],answer:1,why:'她說 “I’d like to make a reservation for two”，表示想預約兩個人的座位。'},
{scene:'搭乘交通工具',lines:['Man: Excuse me. Does this bus go to the city center?','Woman: Yes, it does. You should get off at the Central Station.','Man: How long does it take?','Woman: About twenty minutes, depending on traffic.'],question:'Where should the man get off?',opts:['At the airport','At the Central Station','At the museum','At the bus terminal'],answer:1,why:'對方明確告訴他在 Central Station 下車。'},
{scene:'工作會議',lines:['Woman: Have you finished the test report?','Man: Almost. I’m checking the pressure-drop data now.','Woman: Please send it to the customer before noon.','Man: No problem. I’ll email it as soon as I finish.'],question:'What will the man do next?',opts:['Repeat the thermal test','Call the supplier','Email the report','Schedule a meeting'],answer:2,why:'他表示完成檢查後會立即用 email 寄出報告。'},
{scene:'飯店入住',lines:['Man: Hello. I have a reservation under the name Wu.','Woman: Welcome. May I see your passport, please?','Man: Of course. Is breakfast included?','Woman: Yes. Breakfast is served from six thirty to ten.'],question:'What does the man want to know?',opts:['The Wi-Fi password','The breakfast time','The room price','The checkout date'],answer:1,why:'他詢問早餐是否包含，櫃台回答早餐供應時間。'},
{scene:'辦公室行程',lines:['Woman: Are you available for a meeting tomorrow morning?','Man: I’m afraid I’m busy until ten.','Woman: How about ten thirty?','Man: That works for me. Please send me an invitation.'],question:'When can the man attend the meeting?',opts:['At 9:00','At 9:30','At 10:00','At 10:30'],answer:3,why:'雙方最後確認十點三十分開會。'}
]
function speak(text:string,rate=0.82){
 if(typeof window==='undefined'||!('speechSynthesis'in window)){alert('目前瀏覽器不支援語音播放。');return}
 const synth=window.speechSynthesis
 synth.cancel()
 synth.resume()
 const utterance=new SpeechSynthesisUtterance(text)
 utterance.lang='en-US'
 utterance.rate=rate
 utterance.pitch=1
 const voices=synth.getVoices()
 const voice=voices.find(v=>v.lang.toLowerCase()==='en-us')||voices.find(v=>v.lang.toLowerCase().startsWith('en-'))
 if(voice) utterance.voice=voice
 utterance.onerror=()=>{console.warn('Speech playback error')}
 synth.speak(utterance)
}
export default function App(){
 const [store,setStore]=useState<any>(()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch{return {}}})
 const [page,setPage]=useState<'home'|'quiz'|'result'|'progress'|'vocab'>('home')
 const [chapterId,setChapterId]=useState(1)
 const [module,setModule]=useState<'grammar'|'fill'|'integrated'|'listening'>('grammar')
 const [list,setList]=useState<Q[]>([])
 const [idx,setIdx]=useState(0)
 const [answers,setAnswers]=useState<(number|string|null)[]>([])
 const [choice,setChoice]=useState<number|null>(null)
 const [inputAnswer,setInputAnswer]=useState('')
 const [result,setResult]=useState<any[]|null>(null)
 const [dialogue,setDialogue]=useState<any>(null)
 const [sessionStart,setSessionStart]=useState(0)
 const [selectedWord,setSelectedWord]=useState<{word:string;meaning:string;example:string}|null>(null)
 const history:Record<string,H>=store.history||{}
 useEffect(()=>{localStorage.setItem(KEY,JSON.stringify(store))},[store])
 useEffect(()=>{if('speechSynthesis'in window){const synth=window.speechSynthesis;const load=()=>synth.getVoices();load();synth.addEventListener?.('voiceschanged',load);return()=>synth.removeEventListener?.('voiceschanged',load)}},[])
 const chapter=chapters.find(c=>c.id===chapterId)||chapters[0]
 const progress=store.chapterProgress||{}
 const chapterStatus=(id:number)=>progress[id]||{}
 const isUnlocked=(id:number)=>id===1||chapters.slice(0,id-1).every(c=>['grammar','fill','integrated','listening'].every(k=>chapterStatus(c.id)[k]))
 const completedModules=['grammar','fill','integrated','listening'].filter(k=>chapterStatus(chapterId)[k]).length
 const savedWords:SavedWord[]=store.vocab||[]
 const due=useMemo(()=>bank.filter(q=>history[q.id]&&!history[q.id].mastered&&history[q.id].due<=Date.now()),[store])
 const vocabWords=useMemo(()=>chapter.fill.map(id=>bank.find(q=>q.id===id)).filter(Boolean).slice(0,15) as Q[],[chapterId])
 const begin=(kind:'grammar'|'fill'|'integrated'|'listening')=>{
  setModule(kind);setSelectedWord(null);setSessionStart(Date.now());setIdx(0);setAnswers([]);setChoice(null);setInputAnswer('');setResult(null);setDialogue(null)
  if(kind==='listening'){
   const pool=dialoguePool.filter((d:any)=>chapterId===1?['餐廳訂位','搭乘交通工具','飯店入住'].includes(d.scene):chapterId===2?['搭乘交通工具','飯店入住','餐廳訂位'].includes(d.scene):['工作會議','辦公室行程'].includes(d.scene))
   const d=pool[Math.floor(Math.random()*pool.length)]||dialoguePool[0];setDialogue(d)
   const q:Q={id:'dialogue-'+Date.now(),kind:'聽力',level:chapterId,q:d.question,passage:d.lines.join('\n'),opts:d.opts,a:d.answer,why:d.why,topic:d.scene}
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
  const elapsed=Math.min(20*60,Math.max(0,Math.round((Date.now()-(sessionStart||Date.now()))/1000)))
  const day=new Date().toDateString()
  const allCorrect=rs.length>0&&rs.every(x=>x.correct)
  setStore((s:any)=>({...s,history:h,completed:(s.completed||0)+1,answered:(s.answered||0)+rs.length,correct:(s.correct||0)+rs.filter(x=>x.correct).length,studySeconds:(s.studySeconds||0)+elapsed,dailyStudy:{...(s.dailyStudy||{}),[day]:((s.dailyStudy||{})[day]||0)+elapsed},chapterProgress:{...(s.chapterProgress||{}),[chapterId]:{...(s.chapterProgress||{})[chapterId],[module]:allCorrect||((s.chapterProgress||{})[chapterId]||{})[module]||false}}}))
 }
 const mastered=Object.values(history).filter(x=>x.mastered).length
 const answered=store.answered||0,correct=store.correct||0,studyMinutes=Math.floor((store.studySeconds||0)/60)
 const q=list[idx]
 const speakDialogue=()=>{if(dialogue)speak(dialogue.lines.join('. '))}
 const markWord=(word:string)=>{const meaning=dictionary[word.toLowerCase()]||'請依照上下文理解';setSelectedWord({word,meaning,example:q?.passage||q?.q||''})}
 const addWord=()=>{if(!selectedWord)return;const exists=savedWords.some(w=>w.word.toLowerCase()===selectedWord.word.toLowerCase());if(!exists)setStore((s:any)=>({...s,vocab:[...(s.vocab||[]),{...selectedWord,addedAt:Date.now()}]}))}
 const finishQuestion=(value:number|string|null)=>{
  if(idx+1<list.length){setAnswers(a=>[...a,value]);setIdx(i=>i+1);setChoice(null);setInputAnswer('')}
  else{const prior=[...answers,value];const rs=list.map((item,i)=>({q:item,choice:prior[i]??null,correct:item.answerText?String(prior[i]??'').trim().toLowerCase()===item.answerText.toLowerCase():prior[i]===item.a}));setAnswers(prior);submitWith(rs)}
 }
 const submitWith=(rs:any[])=>{
  setResult(rs);setPage('result')
  const h={...history};rs.forEach(({q:item,correct:ok})=>{const old=h[item.id]||{streak:0,tries:0,due:Date.now(),mastered:false};const streak=ok?old.streak+1:0;h[item.id]={streak,tries:old.tries+1,due:Date.now()+(ok?[1,3,7,14,30][Math.min(streak-1,4)]:0)*86400000,mastered:streak>=5}})
  const elapsed=Math.min(1200,Math.max(0,Math.round((Date.now()-(sessionStart||Date.now()))/1000))),day=new Date().toDateString()
  const allCorrect=rs.length>0&&rs.every(x=>x.correct)
  setStore((s:any)=>({...s,history:h,completed:(s.completed||0)+1,answered:(s.answered||0)+rs.length,correct:(s.correct||0)+rs.filter(x=>x.correct).length,studySeconds:(s.studySeconds||0)+elapsed,dailyStudy:{...(s.dailyStudy||{}),[day]:((s.dailyStudy||{})[day]||0)+elapsed},chapterProgress:{...(s.chapterProgress||{}),[chapterId]:{...(s.chapterProgress||{})[chapterId],[module]:allCorrect||((s.chapterProgress||{})[chapterId]||{})[module]||false}}}))
 }
 const startReview=()=>{const pool=due.length?due:bank.filter(x=>history[x.id]&&!history[x.id].mastered);if(!pool.length){alert('目前沒有待複習題目。');return}setList(pool.slice(0,20));setModule('integrated');setSessionStart(Date.now());setIdx(0);setAnswers([]);setChoice(null);setInputAnswer('');setResult(null);setPage('quiz')}
 return <div className="shell">
  <header><div className="logo">EN</div><div><b>ENGLISH FOR MING</b><small>Chapter-based English Learning</small></div><button className="sound" aria-label="測試英文語音" onClick={()=>speak('Welcome to your English learning journey.')}><Volume2/></button></header>
  <main>
   {page==='home'&&<div className="stack">
    <section className="goal-card"><div><small>YOUR LEARNING PATH</small><h2>TOEIC 800</h2><p>先建立生活英文基礎，再逐步進入職場與多益情境。</p></div><div className="milestones"><b>基礎</b><span>550</span><span>650</span><span>750</span><span>800</span></div></section>
    <section className="chapter-card"><div className="chapter-heading"><div><small>YOUR CURRENT CHAPTER</small><h1>Chapter ${chapter.id}｜${chapter.title}</h1><p>${chapter.subtitle}・${chapter.description}</p></div><span className="chapter-count">${completedModules}/4</span></div><div className="goal-progress"><i style={{width:(completedModules/4*100)+'%'}}/></div><p className="chapter-hint">完成文法、填空、綜合練習與聽力四個單元，即可解鎖下一章。</p></section>
    <section className="home-vocab"><div className="home-vocab-head"><div><label>CHAPTER VOCABULARY</label><h2>本章核心單字</h2><p>單字、例句與中文翻譯；點擊喇叭即可播放美式英文。</p></div><span>${vocabWords.length} 個</span></div><div className="chapter-vocab-list">{vocabWords.map((word,i)=>{const text=(word.q||'').replace('_____ ',(word.answerText||'')+' ');return <article className="chapter-vocab-item" key={word.id}><div className="vocab-title"><b>{word.answerText}</b><span>{word.meaning}</span><button className="audio" onClick={()=>speak(word.answerText||'')} aria-label="播放單字"><Volume2/></button></div><p className="example-en">{text}</p><p className="example-zh">{exampleTranslations[word.answerText||'']||'請先理解英文句子的整體意思。'}</p><button className="audio example-audio" onClick={()=>speak(text)}><Volume2/>播放例句</button></article>})}</div></section>
    <h2>本章練習</h2><div className="tiles chapter-tiles">
     <button onClick={()=>begin('grammar')}><BookOpen/><b>文法</b><small>句型與文法觀念</small><em>{chapterStatus(chapterId).grammar?'已完成':'開始練習'}</em></button>
     <button onClick={()=>begin('fill')}><BookOpen/><b>填空</b><small>單字與句型應用</small><em>{chapterStatus(chapterId).fill?'已完成':'開始練習'}</em></button>
     <button onClick={()=>begin('integrated')}><Brain/><b>綜合練習</b><small>混合題型與閱讀理解</small><em>{chapterStatus(chapterId).integrated?'已完成':'開始練習'}</em></button>
     <button onClick={()=>begin('listening')}><Headphones/><b>聽力</b><small>情境對話與理解測驗</small><em>{chapterStatus(chapterId).listening?'已完成':'開始練習'}</em></button>
    </div>
    <section className="chapter-list"><h2>課程章節</h2>{chapters.map(c=>{const unlocked=isUnlocked(c.id),done=['grammar','fill','integrated','listening'].every(k=>chapterStatus(c.id)[k]);return <button key={c.id} className={'chapter-row '+(c.id===chapterId?'selected':'')} disabled={!unlocked} onClick={()=>setChapterId(c.id)}><span className="chapter-number">${String(c.id).padStart(2,"0")}</span><span className="chapter-info"><b>{c.title}</b><small>{c.subtitle}</small></span><span className="chapter-state">{done?'已完成':unlocked?'可學習':'🔒 未解鎖'}</span></button>})}</section>
    <div className="stats"><article><small>累積學習時間</small><b>{studyMinutes}</b><small>分鐘</small></article><article><small>已熟悉題目</small><b>{mastered}</b><small>連續答對 5 次</small></article></div>
    <div className="tiles"><button onClick={startReview}><Brain/><b>錯題複習</b><small>目前待複習 {due.length} 題</small></button><button onClick={()=>setPage('progress')}><ChartNoAxesCombined/><b>學習分析</b><small>查看累積紀錄</small></button><button onClick={()=>setPage('vocab')}><BookOpen/><b>個人單字本</b><small>收藏 {savedWords.length} 個單字</small></button></div>
   </div>}
   {page==='quiz'&&q&&<div className="stack">
    <div className="qtop"><button className="link" onClick={()=>setPage('home')}>← 返回章節</button><span>{idx+1} / {list.length}</span></div><div className="track"><i style={{width:((idx+1)/list.length*100)+'%'}}/></div>
    <div><span className="pill">{module==='grammar'?'文法':module==='fill'?'填空':module==='integrated'?'綜合練習':'聽力'}</span><span className="pill muted">Chapter {chapterId}</span></div>
    {q.kind==='聽力'&&<section className="passage"><div className="passagehead">LISTENING｜{q.topic}<button className="audio" onClick={()=>dialogue?speakDialogue():speak(q.passage||'')}><Volume2/>播放對話</button></div><p className="listen-note">先聽完整段對話，再回答問題。作答後才會顯示逐字稿與中文翻譯。</p></section>}
    {q.kind!=='聽力'&&q.passage&&<section className="passage"><div className="passagehead">READING PASSAGE</div>{q.passage.split(/(\b[\w'-]+\b)/g).map((part,i)=>{const meaning=dictionary[part.toLowerCase()];return meaning?<button key={i} className="passage-word" onClick={()=>markWord(part)}>{part}</button>:<span key={i}>{part}</span>})}</section>}
    {selectedWord&&<section className="word-detail"><div><small>WORD DETAILS</small><h3>{selectedWord.word}</h3><p>{selectedWord.meaning}</p></div><button className="audio" onClick={addWord}>加入單字本</button></section>}
    <section className="question"><small>QUESTION {idx+1}</small><h2>{q.q}</h2>{module!=='listening'&&<button className="audio" onClick={()=>speak(q.q)}><Volume2/>聽題目</button>}</section>
    {q.kind==='填空'?<div className="blank-answer"><label>請輸入英文答案</label><p className="meaning-hint">中文提示：{q.meaning}</p><input value={inputAnswer} onChange={e=>setInputAnswer(e.target.value)} placeholder="Type your answer" autoComplete="off"/></div>:<div className="options">{q.opts.map((o,i)=><button className={choice===i?'chosen':''} onClick={()=>setChoice(i)} key={o}><span>{'ABCD'[i]}</span>{o}{choice===i&&<Check/>}</button>)}</div>}
    <div className="actions"><button className="link" onClick={()=>{setChoice(null);setInputAnswer('')}}>清除答案</button><button className="primary" onClick={()=>finishQuestion(module==='fill'?(inputAnswer.trim()||null):choice)}>{idx+1===list.length?'提交答案':'下一題'} <ChevronRight/></button></div><small className="hint">跳過會記為錯題，系統會安排複習。</small>
   </div>}
   {page==='result'&&result&&<div className="stack"><section className="score"><div className="ring">{Math.round(result.filter(x=>x.correct).length/result.length*100)}<small>%</small></div><h1>練習完成</h1><p>答對 {result.filter(x=>x.correct).length} 題・共 {result.length} 題</p></section>{result.map((r,i)=><article className="explain" key={r.q.id}><div className="explainhead">第 {i+1} 題・{r.q.kind}<b className={r.correct?'green':'red'}>{r.correct?'答對':'答錯／跳過'}</b></div><h3>{r.q.q}</h3>{r.q.kind==='聽力'&&<><p><b>對話逐字稿：</b></p>{(r.q.passage||'').split('\n').map((line:string)=><p>{line}</p>)}<p><b>中文翻譯：</b>{dialogue?.scene==='餐廳訂位'?'女士想預約兩個人的座位，並確認晚上七點半是否有空位。':dialogue?.scene==='搭乘交通工具'?'男子詢問公車是否前往市中心，以及應該在哪一站下車。':dialogue?.scene==='工作會議'?'同事確認測試報告進度，並要求中午前寄給客戶。':'雙方正在確認行程與服務資訊。'}</p></>}{r.q.kind!=='聽力'&&r.q.passage&&<p>{r.q.passage}</p>}<p><b>正確答案：</b>{r.q.answerText||r.q.opts[r.q.a]}</p>{r.q.why}</article>)}<button className="primary wide" onClick={()=>setPage('home')}>返回章節</button></div>}
   {page==='progress'&&<div className="stack"><div className="row"><h1>學習分析</h1><button className="link" onClick={()=>setPage('home')}>返回首頁</button></div><section className="scorecard"><small>TOEIC 學習目標</small><h2>550 → 800</h2><p>目前紀錄反映練習表現，不等同正式多益分數。</p></section><div className="stats"><article><small>完成單元</small><b>{store.completed||0}</b></article><article><small>累積答題</small><b>{answered}</b></article><article><small>累積正確率</small><b>{answered?Math.round(correct/answered*100):0}%</b></article><article><small>已熟悉題目</small><b>{mastered}</b></article></div><h2>章節完成狀態</h2>{chapters.map(c=><div className="mastery" key={c.id}><b>{c.title}</b><span>{['grammar','fill','integrated','listening'].filter(k=>chapterStatus(c.id)[k]).length}/4 單元</span></div>)}<h2>題目熟悉度</h2>{bank.filter(item=>history[item.id]).map(item=><div className="mastery" key={item.id}><div><b>{item.topic}</b><small>{item.kind}・作答 {history[item.id].tries} 次</small></div><span>{history[item.id].mastered?'已熟悉':'連續答對 '+history[item.id].streak+'/5'}</span></div>)}</div>}
   {page==='vocab'&&<div className="stack"><div className="row"><h1>個人單字本</h1><button className="link" onClick={()=>setPage('home')}>返回首頁</button></div>{savedWords.length?savedWords.map(w=><article className="saved-word" key={w.word}><div><b>{w.word}</b><p>{w.meaning}</p><small>{w.example}</small></div><button className="audio" onClick={()=>speak(w.word)}><Volume2/></button></article>):<aside>目前還沒有收藏的單字。</aside>}</div>}
  </main>
  <nav><button className={page==='home'?'active':''} onClick={()=>setPage('home')}><Home/>章節</button><button className={page==='progress'?'active':''} onClick={()=>setPage('progress')}><ChartNoAxesCombined/>分析</button></nav>
 </div>
}
