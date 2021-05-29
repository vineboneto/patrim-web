const { execSync } = require('child_process')

console.log('Setting Husky...')
const scripts = [
  'npx rimraf .husky',
  'npx husky install ',
  'npx husky add .husky/pre-commit "yarn lint-staged --config .lintstagedrc.json"',
  'npx husky add .husky/pre-push "yarn test:ci"',
  'npx husky add .husky/commit-msg ".git/hooks/commit-msg $1"'
]

for (const script of scripts) {
  try {
    console.log(script + '👀')
    execSync(script)
    console.log('✔')
  } catch (error) {
    console.error()
  }
}
