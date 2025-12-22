import { constants } from 'node:fs'
import { access, copyFile, mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

const src = resolve(process.cwd(), 'ai/GUIDELINES.md')
const targets = [
  '.github/copilot-instructions.md',
  '.cursor/rules/Core.md',
  '.junie/guidelines.md',
  '.windsurfrules',
  'CLAUDE.md',
].map(p => resolve(process.cwd(), p))

async function ensureDirFor(file: string) {
  await mkdir(dirname(file), { recursive: true })
}

async function safeCopy(from: string, to: string) {
  await ensureDirFor(to)
  await copyFile(from, to)
}

async function main() {
  try {
    await access(src, constants.R_OK)
  } catch {
    console.warn(`[sync-ai-guidelines] Source not found: ${src}. Skipping.`)
    return
  }

  await Promise.all(targets.map(t => safeCopy(src, t)))
}

main()
