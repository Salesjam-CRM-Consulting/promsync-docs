#!/usr/bin/env node
/**
 * Copy legal/help markdown from prom/docs/ into prom/docs/site/_content/
 * Run after editing USER_GUIDE_EN.md, PRIVACY_POLICY.md, or TERMS_OF_SERVICE.md
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));
const docsDir = path.join(root, '..');
const siteContent = path.join(root, '_content');

function stripTitle(md) {
  return md.replace(/^# [^\n]+\n\n/, '');
}

function patchHelp(md) {
  return stripTitle(md)
    .replace(
      /\(MARKETPLACE_LISTING\.md#edition-compatibility\)/,
      '(/))',
    )
    .replace(/\(PRIVACY_POLICY\.md\)/g, '(/privacy/)')
    .replace(/\(TERMS_OF_SERVICE\.md\)/g, '(/terms/)')
    .replace(/- \[Marketplace listing & editions\]\([^)]+\)\n/, '');
}

function patchPrivacy(md) {
  return md.replace(/^# [^\n]+\n\n/, '');
}

function patchTerms(md) {
  return stripTitle(md)
    .replace(/\(PRIVACY_POLICY\.md\)/g, '(/privacy/)');
}

const pairs = [
  ['USER_GUIDE_EN.md', 'help_body.md', patchHelp],
  ['PRIVACY_POLICY.md', 'privacy_body.md', patchPrivacy],
  ['TERMS_OF_SERVICE.md', 'terms_body.md', patchTerms],
];

for (const [src, dest, patch] of pairs) {
  const raw = fs.readFileSync(path.join(docsDir, src), 'utf8');
  fs.writeFileSync(path.join(siteContent, dest), patch(raw));
  console.log(`updated _content/${dest} from ${src}`);
}
