export type CourseUnit = { id: number; stage: number; title: string; objective: string }
export type CourseStage = { id: number; title: string; range: string; units: CourseUnit[] }

const unitTitles = [
  ['英文句子的基本結構','英文詞性入門','Be 動詞 am / is / are','一般動詞與基本句型','肯定句與否定句','疑問句與疑問詞','第三人稱單數','名詞、冠詞與複數','人稱代名詞','所有格與指示代名詞','現在簡單式','現在進行式','過去簡單式','未來式 will / be going to','時間介系詞 in / on / at','地點介系詞 in / on / at','數量詞 much / many / some','形容詞與副詞','比較級與最高級','基礎句型總複習'],
  ['日常作息與習慣','家庭與人際關係','食物與餐廳點餐','購物與付款','交通工具與問路','旅遊計畫與訂房','天氣與休閒活動','健康與看診','電話與訊息溝通','時間安排與約定','頻率副詞與時間表達','現在完成式入門','不定詞與動名詞','情態助動詞','連接詞與原因結果','被動語態入門','比較與選擇','公告與簡短通知','電子郵件入門','生活情境綜合閱讀'],
  ['工作職稱與部門','辦公室日常溝通','會議安排與邀請','專案進度回報','工作分配與責任','問題描述與解決方案','數據與圖表描述','產品與服務介紹','客戶需求與回覆','供應商聯繫','商務郵件格式','簡報與口頭報告','條件句與假設','關係子句','分詞與修飾語','轉折與因果邏輯','正式語氣與委婉表達','長句拆解與理解','多段落閱讀策略','職場情境綜合應用'],
  ['TOEIC Part 1 照片描述','TOEIC Part 2 應答策略','TOEIC Part 3 對話理解','TOEIC Part 4 獨白理解','Part 5 詞性題','Part 5 動詞與時態','Part 5 介系詞與連接詞','Part 5 代名詞與限定詞','Part 5 句型與子句','Part 6 篇章填空','Part 7 單篇公告','Part 7 電子郵件','Part 7 廣告與通知','Part 7 表格與行程','Part 7 多段落文章','同義字與近義詞辨析','商務高頻搭配詞','閱讀定位與同義改寫','限時閱讀與答題節奏','TOEIC 進階綜合測驗'],
  ['高頻商務字彙強化','複雜句構與省略','高階動詞搭配','名詞與形容詞搭配','多義字與語境判斷','長篇郵件與附件整合','雙篇閱讀交叉比對','三篇閱讀資訊整合','公告與政策細節推論','會議紀錄與行動項目','採購與合約文件','人事與招募文件','財務與營運報告','物流與交期通知','產品規格與技術文件','聽力細節與暗示','聽力口音與語速適應','跨段落推論與目的','完整閱讀限時演練','TOEIC 800 衝刺總測驗']
]
const objectives = ['掌握核心單字與基本用法，並能在清楚的句型中正確應用。','理解本課文法重點，辨識句子結構並完成情境練習。','將本課字彙與句型運用於日常、職場或多益常見文本。','透過題目檢查理解程度，並依詳解修正錯誤觀念。']
export const courseStages: CourseStage[] = unitTitles.map((titles, i) => ({
  id: i + 1,
  title: ['國中基礎重建','日常英文溝通','中級與職場英文','TOEIC 專項訓練','TOEIC 800 衝刺'][i],
  range: ['A1–A2','A2–B1','B1–B2','B2','B2+'][i],
  units: titles.map((title, j) => ({ id: i * 20 + j + 1, stage: i + 1, title, objective: objectives[j % objectives.length] }))
}))
export const courseUnitCount = courseStages.reduce((n, stage) => n + stage.units.length, 0)
export const formalQuestionsPerUnit = 10
export const extensionQuestionsPerUnit = 10
export const plannedFormalQuestionCount = courseUnitCount * formalQuestionsPerUnit
export const plannedExtensionQuestionCount = courseUnitCount * extensionQuestionsPerUnit
