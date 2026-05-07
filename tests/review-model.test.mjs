import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeItems, buildReviewModel, renderHtmlReport } from '../extension/src/core.mjs';

test('popup review model exposes cards and next actions', () => {
  const report = analyzeItems({ items: [{
  "id": "prepost-page-annotation-workflow-missing-required",
  "title": "必須項目不足サンプル",
  "status": "ready",
  "checklist": [
    "タイトル確認",
    "画像確認",
    "リンク確認"
  ],
  "annotation": "ファーストビューの表記を確認"
}] });
  const model = buildReviewModel(report);
  assert.equal(model.statusLabel, '要修正');
  assert.ok(model.cards.length >= 4);
  assert.match(renderHtmlReport(report), /Next Actions/);
});
