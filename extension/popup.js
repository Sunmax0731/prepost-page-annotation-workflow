import { analyzeItems, buildReviewModel, renderMarkdownReport } from './src/core.mjs';

const sample = {
  "items": [
    {
      "id": "prepost-page-annotation-workflow-1",
      "title": "投稿前後ページ注釈ワークフロー サンプル1",
      "status": "ready",
      "url": "https://example.com/post",
      "checklist": [
        "タイトル確認",
        "画像確認",
        "リンク確認"
      ],
      "annotation": "公開前レビューで確認した注釈"
    },
    {
      "id": "prepost-page-annotation-workflow-missing-required",
      "title": "必須項目不足サンプル",
      "status": "ready",
      "checklist": [
        "タイトル確認",
        "画像確認",
        "リンク確認"
      ],
      "annotation": "公開前レビューで確認した注釈"
    }
  ]
};
const input = document.getElementById('input');
const result = document.getElementById('result');
const badge = document.getElementById('badge');
const cards = document.getElementById('cards');

function setSample() {
  input.value = JSON.stringify(sample, null, 2);
}

function renderCards(model) {
  cards.innerHTML = model.cards.map((card) => `<div class="card"><span>${escapeHtml(card.label)}</span><b>${escapeHtml(card.value)}</b></div>`).join('');
}

document.getElementById('sample').addEventListener('click', setSample);
document.getElementById('analyze').addEventListener('click', async () => {
  try {
    const report = analyzeItems(JSON.parse(input.value));
    const model = buildReviewModel(report);
    badge.textContent = model.statusLabel;
    renderCards(model);
    result.textContent = renderMarkdownReport(report);
    await chrome.storage.local.set({ lastReport: report });
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) await chrome.tabs.sendMessage(tab.id, { type: 'TOP19_REPORT', title: '投稿前後ページ注釈ワークフロー', report }).catch(() => undefined);
  } catch (error) {
    badge.textContent = '入力エラー';
    result.textContent = String(error?.message || error);
  }
});

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[char]));
}

setSample();
renderCards(buildReviewModel(analyzeItems(sample)));
