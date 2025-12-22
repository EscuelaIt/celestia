import { spawnSync } from 'node:child_process'

if (process.env['CI'] === 'true') {
  console.log('[postinstall] CI detected — skipping local setup steps.')
  process.exit(0)
}

function run(cmd: string, args?: string[]) {
  console.log(`[postinstall] $ ${cmd} ${args?.join(' ')}`)
  const result = spawnSync(cmd, args, {
    stdio: 'inherit',
    cwd: process.cwd(),
    env: process.env,
    shell: process.platform === 'win32',
  })
  if (result.status !== 0) {
    const code = result.status == null ? 1 : result.status
    console.error(`[postinstall] Command failed: ${cmd} ${args?.join(' ')}`)
    process.exit(code)
  }
}

// 1) Install git hooks
run('husky')

// 2) Install Playwright browsers
run('npx', ['playwright', 'install'])

// 3) Sync AI guidelines
run('node', ['scripts/generate-ai-guidelines.ts'])

console.log('[postinstall] All steps completed.')
