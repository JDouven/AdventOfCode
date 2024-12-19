async function readInput() {
  const input = await Deno.readTextFile('input.txt')
  const lines = input.trim().split('\n')
  return lines.map((line) => line.split(/\s+/).map(Number))
}

function calculateDifference(a: number, b: number) {
  if (a > b) {
    return a - b
  }
  return b - a
}

function isReportSafe(report: number[]) {
  const directions = report.slice(0, -1).map((n, i) => {
    if (n > report[i + 1]) {
      return 'increasing'
    } else if (n < report[i + 1]) {
      return 'decreasing'
    }
    return 'equal'
  })

  const hasIncreasing = directions.includes('increasing')
  const hasDecreasing = directions.includes('decreasing')
  const hasEqual = directions.includes('equal')
  if (hasIncreasing && hasDecreasing) {
    return false
  }
  if (hasEqual) {
    return false
  }

  const maxDiff = report
    .slice(0, -1)
    .map((n, i) => calculateDifference(n, report[i + 1]))
    .reduce((acc, diff) => Math.max(acc, diff), 0)

  if (maxDiff > 3) {
    return false
  }

  return true
}

function checkIfUnsafeReportCanBeDampened(report: number[]) {
  for (let i = 0; i < report.length; i++) {
    const modifiedReport = report.slice()
    modifiedReport.splice(i, 1)
    if (isReportSafe(modifiedReport)) {
      return true
    }
  }
  return false
}

if (import.meta.main) {
  const input = await readInput()

  const safeReportCount = input.filter((report) => isReportSafe(report)).length
  console.log('Safe reports: ', safeReportCount)

  const unsafeReports = input.filter((report) => !isReportSafe(report))
  const dampenedReports = unsafeReports.filter((report) =>
    checkIfUnsafeReportCanBeDampened(report)
  )
  console.log('Dampened reports: ', dampenedReports.length)
  console.log('Total safe reports: ', safeReportCount + dampenedReports.length)
}
