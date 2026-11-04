export type SkillKey = 'vocabulary' | 'grammar' | 'reading' | 'application' | 'review'

export type LearningStage = {
  id: number
  code: string
  title: string
  range: string
  goal: string
  chapters: string[]
  skills: { key: SkillKey; title: string; focus: string[] }[]
}

export const learningStages: LearningStage[] = [
  { id: 1, code: 'A1–A2', title: '英文基礎', range: 'Junior-high foundation', goal: '建立基本句型、常用字彙與基礎閱讀能力。', chapters: ['自我介紹與基本句型', '日常作息與時間', '家庭、飲食與購物', '基礎閱讀與生活訊息'], skills: [
    { key: 'vocabulary', title: 'Vocabulary', focus: ['生活高頻單字', '基本片語與搭配'] },
    { key: 'grammar', title: 'Grammar', focus: ['be / do 動詞', '基本時態', '疑問句與否定句', '詞性與句型'] },
    { key: 'reading', title: 'Reading', focus: ['短句理解', '簡短公告與訊息'] },
    { key: 'application', title: 'Application', focus: ['自我介紹', '日常生活情境'] },
    { key: 'review', title: 'Review', focus: ['錯題訂正', '高頻字彙複習'] },
  ]},
  { id: 2, code: 'A2–B1', title: '生活應用', range: 'Everyday English', goal: '將文法與字彙應用於旅遊、購物、交通及日常閱讀。', chapters: ['交通與旅遊', '餐廳與住宿', '購物與生活服務', '通知、公告與電子郵件'], skills: [
    { key: 'vocabulary', title: 'Vocabulary', focus: ['主題字彙', '常用搭配詞'] },
    { key: 'grammar', title: 'Grammar', focus: ['完成式', '被動語態', '比較與連接詞', '不定詞與動名詞'] },
    { key: 'reading', title: 'Reading', focus: ['短篇文章', '通知與電子郵件'] },
    { key: 'application', title: 'Application', focus: ['旅遊與交通', '餐廳與購物'] },
    { key: 'review', title: 'Review', focus: ['易錯文法', '間隔複習'] },
  ]},
  { id: 3, code: 'B1–B2', title: '進階與職場', range: 'Workplace English', goal: '理解較長句構、職場溝通及多段落閱讀。', chapters: ['工作日常與職場溝通', '會議與簡報', '專案進度與問題回報', '商務郵件與報告'], skills: [
    { key: 'vocabulary', title: 'Vocabulary', focus: ['商務字彙', '同義字與搭配詞'] },
    { key: 'grammar', title: 'Grammar', focus: ['條件句', '關係子句', '分詞與複合句'] },
    { key: 'reading', title: 'Reading', focus: ['長篇閱讀', '推論與改寫'] },
    { key: 'application', title: 'Application', focus: ['會議與郵件', '工作流程與報告'] },
    { key: 'review', title: 'Review', focus: ['弱項補強', '高難度題型'] },
  ]},
  { id: 4, code: 'B2', title: 'TOEIC 進階', range: 'TOEIC 700–800+', goal: '強化多益閱讀速度、準確度與限時應試能力。', chapters: ['Part 5 詞性與文法', 'Part 6 篇章填空', 'Part 7 單篇閱讀', 'Part 7 多篇閱讀與限時模考'], skills: [
    { key: 'vocabulary', title: 'Vocabulary', focus: ['商務高頻字彙', '片語與近義詞辨析'] },
    { key: 'grammar', title: 'Grammar', focus: ['Part 5 文法與詞彙題'] },
    { key: 'reading', title: 'Reading', focus: ['Part 6 篇章填空', 'Part 7 單篇與多篇閱讀'] },
    { key: 'application', title: 'Application', focus: ['職場文件整合閱讀', '限時答題策略'] },
    { key: 'review', title: 'Review', focus: ['模擬測驗檢討', '個人弱點分析'] },
  ]},
]
