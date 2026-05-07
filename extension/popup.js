import { analyzeItems, renderMarkdownReport } from './src/core.mjs';

const sample = {
  "items": [
    {
      "id": "prepost-1",
      "title": "投稿前チェック・ページ注釈ワークフロー サンプル 1",
      "url": "https://example.com/post",
      "checklist": [
        "タイトル確認",
        "画像確認",
        "リンク確認"
      ],
      "annotation": "ファーストビューの表記を確認",
      "status": "ready"
    },
    {
      "id": "prepost-missing-required",
      "title": "必須項目不足サンプル",
      "checklist": [
        "タイトル確認",
        "画像確認",
        "リンク確認"
      ],
      "annotation": "ファーストビューの表記を確認",
      "status": "ready"
    }
  ]
};
const input = document.getElementById('input');
const result = document.getElementById('result');
input.value = JSON.stringify(sample, null, 2);

document.getElementById('analyze').addEventListener('click', async () => {
  try {
    const data = JSON.parse(input.value);
    const report = analyzeItems(data);
    result.textContent = renderMarkdownReport(report);
    await chrome.storage.local.set({ lastReport: report });
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) {
      await chrome.tabs.sendMessage(tab.id, { type: 'TOP20_REPORT', report }).catch(() => undefined);
    }
  } catch (error) {
    result.textContent = String(error?.message || error);
  }
});
