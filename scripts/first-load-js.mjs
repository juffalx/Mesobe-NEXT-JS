import { readFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'

const route = process.argv[2] ?? 'menu'
const html = readFileSync(`.next/server/app/${route}.html`, 'utf8')

const paths = [
  ...new Set(
    [...html.matchAll(/\/_next\/static\/[^"'\s]+\.js/g)].map((m) => m[0]),
  ),
]

let raw = 0
let gzip = 0

for (const path of paths) {
  const file = readFileSync(`.next/${path.replace('/_next/', '')}`)
  raw += file.length
  gzip += gzipSync(file).length
  console.log(`${(gzipSync(file).length / 1024).toFixed(1).padStart(7)} kB  ${path}`)
}

console.log(`\n/${route}: ${paths.length} scripts, ${(raw / 1024).toFixed(1)} kB raw, ${(gzip / 1024).toFixed(1)} kB gzip`)
