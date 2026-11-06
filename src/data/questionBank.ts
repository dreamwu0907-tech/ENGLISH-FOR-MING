export type Question = {
 id:string; unitId:number; type:'choice'|'fill'; prompt:string; choices?:string[];
 answer:string; explanation:string; conceptId:string; chinese:string;
}
const q=(id:string,unitId:number,type:'choice'|'fill',prompt:string,answer:string,explanation:string,conceptId:string,chinese:string,choices?:string[]):Question=>({id,unitId,type,prompt,answer,explanation,conceptId,chinese,choices})
export const questionBank:Question[]=[
 // Unit 1: sentence structure and subject-verb agreement
 q('u1-1',1,'choice','Mia _____ a student.','is','Mia 是第三人稱單數，搭配 be 動詞 is。','be-verb','Mia 是一名學生。',['am','is','are','be']),
 q('u1-2',1,'choice','My friends _____ in the office.','are','主詞 friends 是複數，be 動詞使用 are。','be-verb','我的朋友們在辦公室。',['am','is','are','be']),
 q('u1-3',1,'fill','I _____ ready for the meeting.','am','主詞 I 固定搭配 am。','be-verb','我已經準備好開會了。'),
 q('u1-4',1,'choice','The engineer _____ the report every Friday.','checks','一般現在式中，第三人稱單數動詞加 -s。','basic-verb','這位工程師每星期五檢查報告。',['check','checks','checking','to check']),
 q('u1-5',1,'choice','We _____ the test results.','review','主詞 We 搭配原形動詞 review。','basic-verb','我們檢查測試結果。',['reviews','review','reviewing','reviewed']),
 q('u1-6',1,'fill','They _____ in Taipei.','work','主詞 They 搭配原形動詞 work。','basic-verb','他們在台北工作。'),
 // Unit 2: nouns and verbs
 q('u2-1',2,'choice','The _____ is on the desk.','notebook','此處需要名詞作主詞，notebook 是名詞。','parts-of-speech','筆記本在桌上。',['quickly','notebook','carefully','write']),
 q('u2-2',2,'choice','Please _____ the document.','open','Please 後面使用原形動詞。','parts-of-speech','請打開這份文件。',['opener','opening','open','opened']),
 q('u2-3',2,'fill','The _____ answers customer questions.','manager','空格需要表示人的名詞 manager。','parts-of-speech','經理回答客戶問題。'),
 q('u2-4',2,'choice','Which word is a verb?','deliver','deliver 表示「交付」，是動詞。','parts-of-speech','哪一個字是動詞？',['careful','delivery','deliver','useful']),
 q('u2-5',2,'choice','Our team will _____ the samples tomorrow.','ship','will 後面接原形動詞。','parts-of-speech','我們團隊明天會寄送樣品。',['shipment','ships','shipping','ship']),
 q('u2-6',2,'fill','Please _____ your name here.','write','Please 後面接原形動詞 write。','parts-of-speech','請在這裡寫下你的名字。'),
 // Unit 3: be verbs
 q('u3-1',3,'choice','I _____ an engineer.','am','I 與 be 動詞 am 搭配。','be-verb','我是一名工程師。',['is','are','am','be']),
 q('u3-2',3,'choice','The samples _____ ready.','are','samples 是複數，使用 are。','be-verb','樣品已經準備好了。',['is','am','are','be']),
 q('u3-3',3,'fill','The meeting _____ at 10 a.m.','is','meeting 是單數，使用 is。','be-verb','會議在上午十點。'),
 q('u3-4',3,'choice','She _____ not available today.','is','She + is not，縮寫為 isn’t。','be-verb','她今天沒有空。',['am','are','is','be']),
 q('u3-5',3,'choice','_____ they at the factory?','Are','一般疑問句將 Are 放在複數主詞 they 前。','be-verb','他們在工廠嗎？',['Is','Am','Are','Be']),
 q('u3-6',3,'fill','We _____ not late.','are','We 的否定句為 are not。','be-verb','我們沒有遲到。'),
 // Unit 4: simple present
 q('u4-1',4,'choice','He _____ to work by bus.','goes','第三人稱單數 he 的 go 變為 goes。','present-simple','他搭公車上班。',['go','goes','going','gone']),
 q('u4-2',4,'choice','They _____ lunch at noon.','eat','They 後面使用原形動詞。','present-simple','他們中午吃午餐。',['eats','eating','eat','ate']),
 q('u4-3',4,'fill','My supervisor _____ the schedule every morning.','checks','My supervisor 是第三人稱單數，check 加 -s。','present-simple','我的主管每天早上檢查時程。'),
 q('u4-4',4,'choice','She does not _____ coffee.','drink','does not 後面使用原形動詞。','present-simple','她不喝咖啡。',['drinks','drinking','drank','drink']),
 q('u4-5',4,'choice','_____ your team work on Fridays?','Does','your team 視為單數，疑問句使用 Does。','present-simple','你們團隊星期五工作嗎？',['Do','Does','Is','Are']),
 q('u4-6',4,'fill','The factory _____ at 8 a.m.','opens','工廠是單數主詞，open 加 -s。','present-simple','工廠上午八點開門。'),
 // Unit 5: negatives
 q('u5-1',5,'choice','We _____ have enough time.','do not','We 的一般動詞否定句使用 do not + 原形動詞。','negative','我們沒有足夠的時間。',['does not','do not','are not','is not']),
 q('u5-2',5,'choice','He _____ like spicy food.','does not','He 的否定句使用 does not，後接原形 like。','negative','他不喜歡辣的食物。',['do not','does not','is not','are not']),
 q('u5-3',5,'fill','I _____ understand this question.','do not','I + do not + 原形動詞。','negative','我不理解這個問題。'),
 q('u5-4',5,'choice','They _____ work on Sundays.','do not','They 是複數主詞，使用 do not。','negative','他們星期日不上班。',['does not','is not','do not','are not']),
 q('u5-5',5,'choice','Which sentence is correct?','She does not drive.','does not 後面接原形動詞 drive。','negative','哪個句子正確？',['She do not drives.','She does not drives.','She does not drive.','She not drive.']),
 q('u5-6',5,'fill','The machine _____ start.','does not','The machine 是單數，否定句使用 does not。','negative','這台機器無法啟動。'),
 // Unit 6: yes/no questions
 q('u6-1',6,'choice','_____ you speak English?','Do','一般動詞疑問句，you 使用 Do。','questions','你會說英文嗎？',['Does','Do','Are','Is']),
 q('u6-2',6,'choice','_____ he work here?','Does','he 是第三人稱單數，疑問句使用 Does。','questions','他在這裡工作嗎？',['Do','Does','Is','Are']),
 q('u6-3',6,'fill','_____ they need more time?','Do','they 的一般動詞疑問句使用 Do。','questions','他們需要更多時間嗎？'),
 q('u6-4',6,'choice','Does she _____ the report?','write','Does 後面接原形動詞 write。','questions','她寫這份報告嗎？',['writes','writing','wrote','write']),
 q('u6-5',6,'choice','_____ the samples ready?','Are','samples 是複數，be 動詞疑問句使用 Are。','questions','樣品準備好了嗎？',['Is','Am','Are','Do']),
 q('u6-6',6,'fill','Where _____ your manager work?','does','your manager 是第三人稱單數，疑問句使用 does。','questions','你的經理在哪裡工作？'),
 // Unit 7: third person singular
 q('u7-1',7,'choice','Amy _____ English every night.','studies','子音 + y 結尾，第三人稱單數改 y 為 ies。','third-person','Amy 每晚讀英文。',['study','studys','studies','studying']),
 q('u7-2',7,'choice','The bus _____ at 7:30.','arrives','一般動詞第三人稱單數加 -s。','third-person','公車七點半抵達。',['arrive','arrives','arriving','arrived']),
 q('u7-3',7,'fill','My brother _____ TV after dinner.','watches','watch 結尾為 ch，加 -es。','third-person','我哥哥晚餐後看電視。'),
 q('u7-4',7,'choice','Which is correct?','She has a new laptop.','have 的第三人稱單數是 has。','third-person','哪個句子正確？',['She have a new laptop.','She haves a new laptop.','She has a new laptop.','She having a new laptop.']),
 q('u7-5',7,'choice','The engineer _____ the data carefully.','checks','第三人稱單數動詞 check 加 -s。','third-person','工程師仔細檢查數據。',['check','checking','checks','checked']),
 q('u7-6',7,'fill','The store _____ at nine.','closes','close 加 -s，形成 closes。','third-person','商店九點關門。'),
 // Unit 8: plural nouns and articles
 q('u8-1',8,'choice','I have two _____.','boxes','box 加 -es 形成複數 boxes。','nouns-articles','我有兩個盒子。',['box','boxs','boxes','boxies']),
 q('u8-2',8,'choice','She is _____ engineer.','an','engineer 以母音音素開頭，使用 an。','nouns-articles','她是一名工程師。',['a','an','the','不需要冠詞']),
 q('u8-3',8,'fill','There are three _____ on the table.','books','three 後面可數名詞使用複數。','nouns-articles','桌上有三本書。'),
 q('u8-4',8,'choice','I need _____ umbrella.','an','umbrella 以母音音素開頭，使用 an。','nouns-articles','我需要一把雨傘。',['a','an','the','some']),
 q('u8-5',8,'choice','The _____ are in the meeting room.','chairs','are 前面需要複數主詞 chairs。','nouns-articles','椅子在會議室裡。',['chair','chairs','chairing','a chair']),
 q('u8-6',8,'fill','He bought a _____ yesterday.','camera','a 後面接單數可數名詞 camera。','nouns-articles','他昨天買了一台相機。'),
 // Unit 9: pronouns
 q('u9-1',9,'choice','_____ are my colleagues.','They','句首需要主格代名詞作主詞。','pronouns','他們是我的同事。',['Them','Their','They','Theirs']),
 q('u9-2',9,'choice','Please call _____.','me','call 後面需要受格 me。','pronouns','請打電話給我。',['I','my','me','mine']),
 q('u9-3',9,'fill','This is Anna. _____ is our manager.','She','Anna 是女性，使用主格 She。','pronouns','這是 Anna。她是我們的經理。'),
 q('u9-4',9,'choice','The customer sent _____ an email.','us','sent 後面表示「寄給我們」，使用受格 us。','pronouns','客戶寄了一封電子郵件給我們。',['we','our','ours','us']),
 q('u9-5',9,'choice','_____ is on the desk.','It','指代單數物品作主詞，使用 It。','pronouns','它在桌上。',['Its','It','They','Them']),
 q('u9-6',9,'fill','Tom and I work together. _____ are engineers.','We','Tom and I 可用 We 代替。','pronouns','Tom 和我一起工作。我們是工程師。'),
 // Unit 10: possessives and demonstratives
 q('u10-1',10,'choice','This is _____ laptop.','my','名詞 laptop 前面需要所有格 my。','possessives','這是我的筆記型電腦。',['I','me','my','mine']),
 q('u10-2',10,'choice','The blue bag is _____.','hers','be 動詞後可使用名詞性所有格 hers。','possessives','藍色的包包是她的。',['she','her','hers','herself']),
 q('u10-3',10,'fill','Is this _____ notebook? (you)','your','名詞 notebook 前面使用所有格 your。','possessives','這是你的筆記本嗎？'),
 q('u10-4',10,'choice','_____ books here are mine.','These','books 是複數且在近處，使用 These。','possessives','這些書是我的。',['This','That','These','It']),
 q('u10-5',10,'choice','_____ is our new office over there.','That','單數且距離較遠，使用 That。','possessives','那邊是我們的新辦公室。',['These','Those','That','They']),
 q('u10-6',10,'fill','The red car is _____. (he)','his','名詞性所有格 his 可獨立使用。','possessives','紅色汽車是他的。'),
 // Unit 11: present simple
 q('u11-1',11,'choice','Our office _____ at 9 a.m.','opens','單數主詞 office，動詞 open 加 -s。','present-simple','我們辦公室上午九點開門。',['open','opens','opening','opened']),
 q('u11-2',11,'choice','I usually _____ coffee in the morning.','drink','I 搭配原形動詞 drink。','present-simple','我通常早上喝咖啡。',['drinks','drinking','drink','drank']),
 q('u11-3',11,'fill','The supplier _____ parts every month.','delivers','supplier 是第三人稱單數，deliver 加 -s。','present-simple','供應商每個月交付零件。'),
 q('u11-4',11,'choice','How often _____ you exercise?','do','you 的一般現在式疑問句使用 do。','present-simple','你多久運動一次？',['does','do','are','is']),
 q('u11-5',11,'choice','He _____ work on Saturdays.','does not','He 的否定句使用 does not + 原形動詞。','present-simple','他星期六不上班。',['do not','does not','is not','not']),
 q('u11-6',11,'fill','Water _____ at 100 degrees Celsius.','boils','一般事實用現在簡單式，water 視為單數，boil 加 -s。','present-simple','水在攝氏 100 度沸騰。'),
 // Unit 12: present continuous
 q('u12-1',12,'choice','She _____ a report right now.','is writing','現在進行式：is + V-ing。','present-continuous','她現在正在寫報告。',['writes','is writing','write','wrote']),
 q('u12-2',12,'choice','They _____ the cold plate at the moment.','are testing','They + are + V-ing。','present-continuous','他們目前正在測試水冷板。',['test','tests','are testing','tested']),
 q('u12-3',12,'fill','I _____ for the bus now.','am waiting','I + am + V-ing，表示現在正在等待。','present-continuous','我現在正在等公車。'),
 q('u12-4',12,'choice','He is not _____ today.','working','be 動詞後接 not，再接 V-ing。','present-continuous','他今天沒有在工作。',['work','works','worked','working']),
 q('u12-5',12,'choice','_____ you listening to me?','Are','現在進行式疑問句將 be 動詞放在主詞前。','present-continuous','你正在聽我說話嗎？',['Do','Does','Are','Is']),
 q('u12-6',12,'fill','The engineers _____ the pressure drop. (measure)','are measuring','複數主詞 engineers + are + measuring。','present-continuous','工程師們正在測量壓降。')
]
export const getQuestionsForUnit=(unitId:number)=>questionBank.filter(item=>item.unitId===unitId)
export const getQuestionsForConcept=(conceptId:string)=>questionBank.filter(item=>item.conceptId===conceptId)
