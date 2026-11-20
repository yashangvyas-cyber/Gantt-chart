// Save the rendered HTML of a running prototype screen, for _tools/verify_fidelity.py.  node scripts/dump.cjs <url> <out.html>
const p = require('/home/yashang/web-crawl-kit/node_modules/puppeteer-core');
(async () => {
  const [url, out] = process.argv.slice(2); if (!url || !out) { console.log('usage: node scripts/dump.cjs <url> <out.html>'); process.exit(1) }
  const b = await p.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] }); const pg = await b.newPage()
  await pg.setViewport({ width: 1680, height: 1000 }); await pg.goto(url, { waitUntil: 'networkidle0' })
  require('fs').writeFileSync(out, await pg.content()); console.log('saved', out); await b.close()
})()
