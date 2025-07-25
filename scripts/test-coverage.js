/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

// Run tests with coverage
console.log('Running tests with coverage...')
execSync('npm run test:coverage', { stdio: 'inherit' })

// Read coverage report
const coveragePath = path.join(__dirname, '../coverage/coverage-summary.json')
if (fs.existsSync(coveragePath)) {
  const coverage = JSON.parse(fs.readFileSync(coveragePath, 'utf8'))
  
  console.log('\n📊 Coverage Summary:')
  console.log('==================')
  
  Object.entries(coverage.total).forEach(([key, value]) => {
    const percentage = value.pct
    const emoji = percentage >= 80 ? '✅' : percentage >= 60 ? '⚠️' : '❌'
    console.log(`${emoji} ${key.padEnd(12)}: ${percentage}%`)
  })
  
  // Check if coverage meets threshold
  const meetsThreshold = Object.values(coverage.total).every(metric => metric.pct >= 80)
  
  if (meetsThreshold) {
    console.log('\n🎉 All coverage thresholds met!')
    process.exit(0)
  } else {
    console.log('\n⚠️  Some coverage thresholds not met')
    process.exit(1)
  }
} else {
  console.log('Coverage report not found')
  process.exit(1)
}