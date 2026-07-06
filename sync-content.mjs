#!/usr/bin/env node
/**
 * Copy legal/help markdown from prom/docs/ into prom/docs/site/_content/
 * Run after editing USER_GUIDE_EN.md, USER_GUIDE.md, PRIVACY_POLICY.md, or TERMS_OF_SERVICE.md
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

function patchHelpEn(md) {
  return stripTitle(md)
    .replace(
      /\(MARKETPLACE_LISTING\.md#edition-compatibility\)/,
      '(../#edition-compatibility)',
    )
    .replace(/\(PRIVACY_POLICY\.md\)/g, '(../privacy/)')
    .replace(/\(TERMS_OF_SERVICE\.md\)/g, '(../terms/)')
    .replace(/- \[Marketplace listing & editions\]\([^)]+\)\n/, '')
    + '\n- [Інструкція українською](../help-uk/)\n';
}

function patchHelpUk(md) {
  const body = stripTitle(md)
    .replace(
      /## Підключення/,
      `## Вимоги

| Пункт | Деталі |
|-------|--------|
| **Акаунт Prom.ua** | Активний кабінет продавця з API-токеном |
| **Редакція Zoho CRM** | Standard або вище (див. [Сумісність редакцій](../#edition-compatibility)) |
| **Модуль Inventory** | Потрібен лише для **Sales Orders** з рядками або синку **Products** |
| **Одноразова авторизація Zoho** | Дозвіл на фоновий запис у CRM (крон) |

---

## Підключення`,
    );

  return (
    body
    + `\n---\n\n## Підтримка\n\n**Contact support** у віджеті (Settings → PromSync for Zoho CRM) або контакти Salesjam у marketplace listing.\n\n---\n\n## Пов’язані документи\n\n- [Privacy Policy](../privacy/)\n- [Terms of Service](../terms/)\n- [User guide (EN)](../help/)\n`
  );
}

function patchPrivacy(md) {
  return md.replace(/^# [^\n]+\n\n/, '');
}

function patchTerms(md) {
  return stripTitle(md)
    .replace(/\(PRIVACY_POLICY\.md\)/g, '(../privacy/)');
}

const pairs = [
  ['USER_GUIDE_EN.md', 'help_body.md', patchHelpEn],
  ['USER_GUIDE.md', 'help_uk_body.md', patchHelpUk],
  ['PRIVACY_POLICY.md', 'privacy_body.md', patchPrivacy],
  ['TERMS_OF_SERVICE.md', 'terms_body.md', patchTerms],
];

for (const [src, dest, patch] of pairs) {
  const raw = fs.readFileSync(path.join(docsDir, src), 'utf8');
  fs.writeFileSync(path.join(siteContent, dest), patch(raw));
  console.log(`updated _content/${dest} from ${src}`);
}
