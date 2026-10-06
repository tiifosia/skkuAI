// 콘텐츠(js/content/w*.js)를 읽어 JSON으로 내보낸다.
// 사용: node tools/export_content.js > /tmp/content.json
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..', 'js', 'content');
const sandbox = { window: {} };
sandbox.window.PQ = { worlds: [], traces: {} };
sandbox.PQ = sandbox.window.PQ;
vm.createContext(sandbox);
for (const f of ['w1.js', 'w2.js', 'w3.js', 'w4.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, f), 'utf8'), sandbox, { filename: f });
}
process.stdout.write(JSON.stringify(sandbox.PQ.worlds, null, 1));
