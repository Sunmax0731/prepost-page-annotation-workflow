# 競合・公式基準ベンチマーク

## 比較方針

投稿前後ページ注釈ワークフロー は、競合の全機能を再実装するのではなく、単なる保存ではなく、投稿前後の確認状態と注釈を同じ画面に残す。

| 参照先 | URL | 競合・公式標準の強み | 採用する評価基準 | 差別化 |
| --- | --- | --- | --- | --- |
| Chrome Extensions | https://developer.chrome.com/docs/extensions/ | Manifest V3、権限、service worker、content script の標準仕様を提供している。 | Manifest V3、権限、利用者データの扱いが説明されていること。 | 単なる保存ではなく、投稿前後の確認状態と注釈を同じ画面に残す。 |
| Chrome Web Store policies | https://developer.chrome.com/docs/webstore/program-policies/ | 権限、データ利用、配布前審査の基準を明文化している。 | Manifest V3、権限、利用者データの扱いが説明されていること。 | 単なる保存ではなく、投稿前後の確認状態と注釈を同じ画面に残す。 |
| Notion Web Clipper | https://www.notion.com/web-clipper | 閲覧中ページをワークスペースへ保存し、後続作業の資料化につなげられる。 | 利用者が短時間で判断に進めること。 | 単なる保存ではなく、投稿前後の確認状態と注釈を同じ画面に残す。 |

## 改善へ反映した点

- QCDS評価に競合比較と公式標準の確認を追加した。
- 実装だけでなく、README、導入手順、ユーザーガイド、手動テスト、リリース前資料を評価対象にした。
- 文字化けをQCDSのQuality/Satisfactionリスクとして検出する。
