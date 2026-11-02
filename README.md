# ENGLISH-FOR-MING

手機優先的個人英文學習網站。

## 第一版功能
- 單字、文法、閱讀混合測驗，每回合最多 20 題
- 可跳過題目，跳過視為答錯
- 交卷後逐題顯示正確答案與中文解析
- LocalStorage 保存答題歷史、熟悉度與複習排程
- 連續答對 5 次標記熟悉；答錯重新安排複習
- 使用瀏覽器 Web Speech API 播放題目、單字及閱讀文章
- PWA manifest 與基本 Service Worker 快取

## 本機啟動
```bash
npm install
npm run dev
```

## GitHub Pages
已加入 GitHub Actions workflow。到 Repository 的 Settings > Pages，將 Source 設為 GitHub Actions。推送至 main 後會自動建置部署。

## 注意事項
- 題庫目前是示範題，後續需擴充與校對。
- TOEIC 分數只作極粗略練習參考，並非正式估分；正式估分需要足量、經校準的聽力與閱讀題。
- LocalStorage 只保存在目前瀏覽器及裝置；清除網站資料可能遺失。跨裝置同步需後續加入帳號及雲端資料庫。
- iPhone Safari 的語音種類依 iOS 系統可用語音而異，請以實機測試為準；基本發音使用裝置內建語音，不需付費 API。