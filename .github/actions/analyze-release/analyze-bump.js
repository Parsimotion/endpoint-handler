const { execSync } = require('child_process')

const FROM_TAG = process.env.FROM_TAG
if (!FROM_TAG) {
  console.error('FROM_TAG environment variable not set')
  process.exit(1)
}

let commits
try {
  const log = execSync(`git log ${FROM_TAG}..HEAD --pretty=format:%H%n%s%n%b%n==END==`, {
    encoding: 'utf-8',
  })
  commits = log
    .split('==END==')
    .map((entry) => entry.trim())
    .filter(Boolean)
} catch (err) {
  console.error('Error getting git log', err)
  process.exit(1)
}

// Define bump levels
const levels = {
  none: 0,
  patch: 1,
  minor: 2,
  major: 3,
}

let currentLevel = levels.none

for (const entry of commits) {
  const [shaLine, subject, ...bodyLines] = entry.split('\n')
  const body = bodyLines.join('\n')

  const isBreaking = subject.match(/^feat!(\(.+\))?:/) || body.includes('BREAKING CHANGE')

  if (isBreaking) {
    currentLevel = levels.major
    break
  } else if (/^feat(\(.+\))?:/.test(subject)) {
    currentLevel = Math.max(currentLevel, levels.minor)
  } else if (/^(fix|perf)(\(.+\))?:/.test(subject)) {
    currentLevel = Math.max(currentLevel, levels.patch)
  }
}

const bumpMap = {
  0: '',
  1: 'patch',
  2: 'minor',
  3: 'major',
}

const bump = bumpMap[currentLevel]
console.log(`Determined bump: ${bump}`)
console.log(`::set-output name=bump::${bump}`) // for GitHub Actions (legacy)

process.exit(0)