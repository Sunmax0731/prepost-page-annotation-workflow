import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeItems, buildReviewModel, renderHtmlReport } from '../extension/src/core.mjs';

test('review model exposes status cards and next actions', () => {
  const report = analyzeItems({ items: [{
  "id": "prepost-page-annotation-workflow-missing-required",
  "title": "必須項目不足サンプル",
  "status": "ready",
  "checklist": [
    "タイトル確認",
    "画像確認",
    "リンク確認"
  ],
  "annotation": "公開前レビューで確認した注釈"
}] });
  const model = buildReviewModel(report);
  assert.equal(model.statusLabel, '修正が必要');
  assert.ok(model.completionRate < 100);
  assert.ok(model.cards.length >= 4);
  assert.match(renderHtmlReport(report), /Next Actions/);
});
