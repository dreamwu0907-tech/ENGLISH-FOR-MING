export type CourseUnit = { id:number; stage:number; title:string; objective:string; available:boolean }
export type CourseStage = { id:number; title:string; range:string; goal:string; units:CourseUnit[] }
const titles = [
 ['英文句子的基本結構','詞性入門：名詞與動詞','Be 動詞 am / is / are','一般動詞與基本句型','肯定句、否定句與縮寫','疑問句與 Yes/No 問答','第三人稱單數','名詞單複數與冠詞','人稱代名詞與受格','所有格與指示代名詞','現在簡單式','現在進行式'],
 ['過去簡單式','未來式 will / be going to','時間介系詞 in / on / at','地點介系詞 in / on / at','頻率副詞','可數與不可數名詞','some / any / much / many','形容詞與副詞','比較級與最高級','情態助動詞 can / should / must','不定詞與動名詞入門','生活情境短篇閱讀'],
 ['現在完成式','被動語態','連接詞與因果關係','條件句入門','關係代名詞','分詞形容詞與修飾語','間接問句','動詞時態整合','介系詞與片語動詞','商務郵件基本結構','公告與通知閱讀','多段落閱讀入門'],
 ['TOEIC Part 1 圖片描述字彙','Part 2 疑問句與應答','Part 3 短篇對話理解','Part 4 簡短獨白理解','Part 5 詞性判斷','Part 5 動詞時態與語態','Part 5 介系詞與連接詞','Part 5 代名詞與限定詞','Part 5 句型與子句','Part 6 篇章填空','Part 7 單篇公告與廣告','Part 7 電子郵件閱讀'],
 ['商務高頻字彙與搭配','動詞與介系詞搭配','名詞與形容詞搭配','同義字與近義字辨析','複雜句構與省略','長篇電子郵件理解','雙篇閱讀資訊比對','三篇閱讀整合','會議紀錄與行動項目','採購與合約文件','人事與招募文件','財務、物流與技術文件'],
 ['高階字彙語境判斷','進階文法混合題','Part 5 限時精準度','Part 6 篇章邏輯','Part 7 細節定位','Part 7 推論與目的','多文件交叉比對','長篇閱讀速度訓練','聽力題型預備知識','閱讀模擬測驗一','閱讀模擬測驗二','TOEIC 800 目標總複習']
]
const meta=[['國中基礎','A1','建立基本句型、常用字彙與簡單閱讀能力。'],['高中基礎','A2','掌握主要時態、常見句型及生活情境溝通。'],['中級英文','B1','理解較長句構、進階文法與職場文本。'],['多益入門','B1–B2','熟悉 TOEIC 題型、商務情境及解題基礎。'],['多益進階','B2','強化商務字彙、長篇閱讀及跨文件理解。'],['多益 800 衝刺','B2+','提升速度、準確度、推論能力與應試穩定度。']]
export const courseStages:CourseStage[]=titles.map((list,i)=>({id:i+1,title:meta[i][0],range:meta[i][1],goal:meta[i][2],units:list.map((title,j)=>({id:i*12+j+1,stage:i+1,title,objective:meta[i][2],available:i<=1}))}))
export const courseUnitCount=72
export const publishedUnitCount=24
