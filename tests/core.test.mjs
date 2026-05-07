import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeItems, renderMarkdownReport } from '../extension/src/core.mjs';

test('valid sample passes required field checks', () => {
  const report = analyzeItems({ items: [{
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
}] });
  assert.equal(report.summary.result, 'passed');
  assert.equal(report.summary.errors, 0);
});

test('missing required field is reported', () => {
  const report = analyzeItems({ items: [{
  "id": "prepost-missing-required",
  "title": "必須項目不足サンプル",
  "checklist": [
    "タイトル確認",
    "画像確認",
    "リンク確認"
  ],
  "annotation": "ファーストビューの表記を確認",
  "status": "ready"
}] });
  assert.equal(report.summary.result, 'failed');
  assert.equal(report.summary.errors, 1);
  assert.match(renderMarkdownReport(report), /未設定/);
});
