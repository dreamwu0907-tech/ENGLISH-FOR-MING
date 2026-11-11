import type { Question } from './courseV3Questions'

const c=(id:string,u:number,p:string,a:string,e:string,k:string,z:string,o:string[])=>({id,unitId:u,type:'choice' as const,prompt:p,answer:a,explanation:e,conceptId:k,chinese:z,choices:o})
const f=(id:string,u:number,p:string,a:string,e:string,k:string,z:string)=>({id,unitId:u,type:'fill' as const,prompt:p,answer:a,explanation:e,conceptId:k,chinese:z})

export const highSchoolQuestions: Question[] = [
c('13a',13,'We _____ the meeting yesterday.','attended','yesterday 表示過去，attend 加 -ed。','past','我們昨天參加了會議。',['attend','attended','attending','attends']),
c('13b',13,'She _____ a new laptop last week.','bought','buy 的不規則過去式是 bought。','past','她上週買了一台新筆電。',['buy','buyed','bought','buys']),
c('13c',13,'Did you _____ the report?','submit','Did 後面接原形動詞。','past','你提交報告了嗎？',['submitted','submitting','submit','submits']),
f('13d',13,'The shipment _____ (arrive) two days ago.','arrived','two days ago 表示過去，arrive 加 -ed。','past','貨物兩天前抵達。'),
c('13e',13,'Which sentence is correct?','We did not finish the test.','did not 後面使用原形 finish。','past','哪個句子正確？',['We did not finished the test.','We did not finish the test.','We do not finished the test.','We not finish the test.']),
f('13f',13,'I _____ (take) the bus to work yesterday.','took','take 的不規則過去式是 took。','past','我昨天搭公車上班。'),

c('14a',14,'Look at those dark clouds. It _____ rain.','is going to','已有明顯跡象，使用 be going to 表示預測。','future','看看那些烏雲。快要下雨了。',['will','is going to','was','does']),
c('14b',14,'The phone is ringing. I _____ answer it.','will','當下決定接電話，常用 will。','future','電話響了。我來接。',['am going','will','did','have']),
c('14c',14,'We _____ test the new design next Monday.','are going to','已安排的計畫使用 be going to。','future','我們下星期一打算測試新設計。',['are going to','is going to','going','will to']),
f('14d',14,'I think the meeting _____ (start) on time.','will start','對未來的看法或預測使用 will + 原形動詞。','future','我認為會議會準時開始。'),
c('14e',14,'Which sentence is correct?','She will arrange the meeting.','will 後面直接接原形動詞 arrange。','future','哪個句子正確？',['She will arranges the meeting.','She will to arrange the meeting.','She will arrange the meeting.','She going to arrange the meeting.']),
f('14f',14,'They _____ (visit) the factory next week.','are going to visit','主詞 they 搭配 are going to + 原形動詞。','future','他們下週打算拜訪工廠。'),

c('15a',15,'The meeting starts _____ 9:30 a.m.','at','明確時間點使用 at。','time-prep','會議上午九點半開始。',['in','on','at','by']),
c('15b',15,'My birthday is _____ October.','in','月份前使用 in。','time-prep','我的生日在十月。',['in','on','at','to']),
c('15c',15,'The inspection is _____ Friday.','on','星期前使用 on。','time-prep','檢查安排在星期五。',['in','on','at','for']),
f('15d',15,'We usually have lunch _____ noon.','at','固定時間點 noon 前使用 at。','time-prep','我們通常中午吃午餐。'),
c('15e',15,'Which phrase is correct?','in the morning','一天中的早上通常使用 in。','time-prep','哪個片語正確？',['at the morning','on the morning','in the morning','in Monday']),
f('15f',15,'The project will finish _____ 2027.','in','年份前使用 in。','time-prep','這個專案將於 2027 年完成。'),

c('16a',16,'The documents are _____ the drawer.','in','文件位於抽屜內部，使用 in。','place-prep','文件在抽屜裡。',['in','on','at','to']),
c('16b',16,'Our office is _____ the third floor.','on','表示位於某一樓層，使用 on。','place-prep','我們的辦公室在三樓。',['in','on','at','under']),
c('16c',16,'Please wait _____ the entrance.','at','明確位置或地點使用 at。','place-prep','請在入口等候。',['in','on','at','between']),
f('16d',16,'The sample is _____ the table.','on','物品位於桌面上，使用 on。','place-prep','樣品在桌上。'),
c('16e',16,'She lives _____ Taiwan.','in','國家或較大區域前使用 in。','place-prep','她住在台灣。',['at','on','in','to']),
f('16f',16,'I will meet you _____ the station.','at','車站作為明確會合地點，使用 at。','place-prep','我會在車站跟你碰面。'),

c('17a',17,'She _____ arrives late for work.','rarely','頻率副詞通常放在一般動詞 arrives 前。','frequency','她很少上班遲到。',['arrives rarely','rarely','is rarely arrive','rare']),
c('17b',17,'He is _____ on time.','usually','be 動詞後面放頻率副詞。','frequency','他通常很準時。',['usually','usual','often is','be usually']),
c('17c',17,'We _____ review the test data.','often','often 放在一般動詞 review 前。','frequency','我們經常檢查測試資料。',['review oftenly','often','are often review','oftens']),
f('17d',17,'I _____ (occasionally) work from home.','occasionally','頻率副詞放在一般動詞 work 前。','frequency','我偶爾在家工作。'),
c('17e',17,'Which sentence is correct?','They sometimes take the train.','sometimes 放在一般動詞 take 前。','frequency','哪個句子正確？',['They take sometimes the train.','They sometimes take the train.','They are sometimes take the train.','Sometimes they takes the train.']),
f('17f',17,'The manager is _____ busy on Mondays.','often','be 動詞 is 後面放頻率副詞 often。','frequency','經理星期一經常很忙。'),

c('18a',18,'We need more _____.','information','information 是不可數名詞，不加複數 -s。','countable','我們需要更多資訊。',['informations','information','an information','many information']),
c('18b',18,'The _____ is ready for testing.','equipment','equipment 通常視為不可數名詞，搭配單數動詞 is。','countable','設備已經準備好測試。',['equipments','equipment','many equipment','an equipments']),
c('18c',18,'How _____ samples do we need?','many','samples 是可數複數名詞，使用 many。','countable','我們需要多少個樣品？',['much','many','little','any']),
f('18d',18,'We do not have much _____.','time','time 在表示時間總量時通常是不可數名詞。','countable','我們沒有太多時間。'),
c('18e',18,'Which noun is usually uncountable?','advice','advice 通常為不可數名詞，不使用 advices。','countable','哪個名詞通常不可數？',['chair','sample','advice','box']),
f('18f',18,'There are a few _____ on the desk.','tools','a few 後面接可數名詞複數。','countable','桌上有幾個工具。'),

c('19a',19,'There are _____ options available.','many','options 是可數複數名詞，使用 many。','quantifiers','目前有很多可用選項。',['much','many','a little','any']),
c('19b',19,'We do not have _____ time.','much','time 是不可數名詞，否定句可用 much。','quantifiers','我們沒有太多時間。',['many','much','several','few']),
c('19c',19,'Do you have _____ questions?','any','一般疑問句通常使用 any。','quantifiers','你有任何問題嗎？',['some','any','much','a little']),
f('19d',19,'We need _____ additional parts.','some','肯定句中表示一些零件，使用 some。','quantifiers','我們需要一些額外零件。'),
c('19e',19,'A small _____ of coolant leaked.','amount','a small amount of 用於不可數名詞。','quantifiers','少量冷卻液洩漏了。',['number','amount','many','few']),
f('19f',19,'How _____ information do you need?','much','information 是不可數名詞，使用 much。','quantifiers','你需要多少資訊？'),

c('20a',20,'Please check the connector _____.','carefully','修飾動詞 check，使用副詞 carefully。','adj-adv','請仔細檢查接頭。',['careful','carefully','care','more careful']),
c('20b',20,'The measurement is _____.','accurate','be 動詞後描述 measurement 的性質，使用形容詞。','adj-adv','這項測量很準確。',['accurately','accuracy','accurate','accurateness']),
c('20c',20,'She explained the process _____.','clearly','修飾動詞 explained，使用副詞 clearly。','adj-adv','她清楚地說明了流程。',['clear','clearly','clearness','clears']),
f('20d',20,'This is an _____ process.','efficient','名詞 process 前面使用形容詞 efficient。','adj-adv','這是一個有效率的流程。'),
c('20e',20,'Which sentence is correct?','He works carefully.','carefully 修飾動詞 works。','adj-adv','哪個句子正確？',['He works careful.','He works carefully.','He carefully is work.','He works care.']),
f('20f',20,'Please record the data _____. (accurate)','accurately','修飾動詞 record，accurate 改為副詞 accurately。','adj-adv','請準確記錄數據。'),

c('21a',21,'This pump is _____ than the old one.','quieter','比較兩台泵浦，quiet 的比較級為 quieter。','comparison','這台泵浦比舊款安靜。',['quiet','quietest','quieter','more quietest']),
c('21b',21,'This is the _____ reliable option.','most','三個以上選項的最高級使用 the most reliable。','comparison','這是最可靠的選項。',['more','most','much','many']),
c('21c',21,'The new design is _____ expensive than the old one.','more','長形容詞 expensive 的比較級使用 more。','comparison','新設計比舊設計昂貴。',['most','more','much','very']),
f('21d',21,'This option has a _____ pressure drop. (low)','lower','low 的比較級為 lower。','comparison','這個方案的壓降較低。'),
c('21e',21,'Which sentence is correct?','This is the best solution.','good 的最高級是不規則變化 best。','comparison','哪個句子正確？',['This is the goodest solution.','This is the better solution of all.','This is the best solution.','This is most good solution.']),
f('21f',21,'Our latest model is _____ (reliable) than the previous one.','more reliable','reliable 是較長形容詞，使用 more + 原級。','comparison','我們最新的型號比前一代更可靠。'),

c('22a',22,'You _____ use this computer; it is available.','can','can 表示能力或允許。','modals','你可以使用這台電腦，它目前可用。',['must','can','should to','are']),
c('22b',22,'We _____ check the pressure before the test.','should','should 表示建議，後面接原形動詞。','modals','測試前我們應該檢查壓力。',['should','should to','must to','can checking']),
c('22c',22,'All visitors _____ wear safety glasses.','must','must 表示規定或必要義務。','modals','所有訪客都必須配戴安全眼鏡。',['can to','must','should to','are must']),
f('22d',22,'You must _____ (follow) the safety rules.','follow','must 後面直接接原形動詞。','modals','你必須遵守安全規則。'),
c('22e',22,'Which sentence means「你不可以進入」?','You must not enter.','must not 表示禁止，不只是沒有必要。','modals','哪個句子表示「你不可以進入」？',['You do not must enter.','You must not enter.','You must to not enter.','You not can enter.']),
f('22f',22,'We _____ finish the inspection today. (必要義務)','must','表示必要義務，使用 must + 原形動詞。','modals','我們今天必須完成檢查。'),

c('23a',23,'We decided _____ the material.','to change','decide 後面常接 to + 原形動詞。','infinitive-gerund','我們決定更換材料。',['changing','change','to change','changed']),
c('23b',23,'Please avoid _____ the hot surface.','touching','avoid 後面接動名詞 V-ing。','infinitive-gerund','請避免觸摸高溫表面。',['to touch','touch','touches','touching']),
c('23c',23,'I want _____ my English.','to improve','want 後面接不定詞 to + 原形動詞。','infinitive-gerund','我想提升我的英文。',['improving','improve','to improve','improved']),
f('23d',23,'She enjoys _____ (read) before bed.','reading','enjoy 後面接動名詞 reading。','infinitive-gerund','她喜歡睡前閱讀。'),
c('23e',23,'Which sentence is correct?','We plan to visit the factory.','plan 後面接 to + 原形動詞。','infinitive-gerund','哪個句子正確？',['We plan visit the factory.','We plan visiting the factory.','We plan to visit the factory.','We planning to visit the factory.']),
f('23f',23,'They are considering _____ (change) the schedule.','changing','consider 後面接動名詞 changing。','infinitive-gerund','他們正在考慮更改時程。'),

c('24a',24,'Read: "The office will close at 3 p.m. on Friday for maintenance. Employees should take their personal items home before leaving." When will the office close?','At 3 p.m. on Friday.','題目直接詢問關閉時間，從通知中定位 at 3 p.m. on Friday。','reading','閱讀：辦公室星期五下午三點因維護而關閉。員工離開前應將個人物品帶回家。辦公室何時關閉？',['At noon on Friday.','At 3 p.m. on Friday.','At 5 p.m. on Thursday.','All day on Monday.']),
c('24b',24,'In the notice, why will the office close early?','For maintenance.','for maintenance 表示因維護作業。','reading','在這份通知中，辦公室為什麼提早關閉？',['For a meeting.','For maintenance.','For a holiday.','For staff training.']),
c('24c',24,'Read: "Ming booked a table for two at 7 p.m. The restaurant called to say the reservation had moved to 7:30 p.m." What changed?','The reservation time.','電話通知調整的是訂位時間。','reading','Ming 預約晚上七點兩人座位。餐廳來電表示訂位改為七點半。改變了什麼？',['The number of guests.','The restaurant location.','The reservation time.','The menu.']),
f('24d',24,'Read: "The meeting room is unavailable this afternoon. Please contact Lisa to reschedule the meeting." Who should you contact?','Lisa','通知明確要求聯絡 Lisa。','reading','會議室今天下午無法使用。請聯絡 Lisa 重新安排會議。你應該聯絡誰？'),
c('24e',24,'Read: "The supplier delivered 20 samples on Tuesday. The engineering team will inspect them on Wednesday." How many samples arrived?','20','短文明確指出供應商交付 20 個樣品。','reading','供應商星期二交付 20 個樣品。工程團隊星期三將進行檢查。收到多少個樣品？',['12','15','20','30']),
f('24f',24,'Read: "The train leaves at 8:15. Please arrive at the station 10 minutes early." What time should you arrive?','8:05','比 8:15 提早 10 分鐘，應於 8:05 抵達。','reading','火車 8:15 出發。請提前 10 分鐘抵達車站。你應該幾點抵達？')
]

export const highSchoolQuestionsForUnit=(id:number)=>highSchoolQuestions.filter(q=>q.unitId===id)
