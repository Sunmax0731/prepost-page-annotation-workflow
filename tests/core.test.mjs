import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeItems, renderMarkdownReport } from '../extension/src/core.mjs';

test('valid sample passes required field checks', () => {
  const report = analyzeItems({ items: [{
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
}] });
  assert.equal(report.summary.result, 'passed');
  assert.equal(report.summary.errors, 0);
});

test('missing required field is reported', () => {
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
  assert.equal(report.summary.result, 'failed');
  assert.equal(report.summary.errors, 1);
  assert.match(renderMarkdownReport(report), /未設定/);
});
