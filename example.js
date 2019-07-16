const crypto = require("crypto")
const DateGenerator = require("random-date-generator")

const hash = data =>
  crypto
    .createHash("sha256")
    .update(data)
    .digest("hex")

function getFormattedDate(date) {
  let year = date.getFullYear()
  let month = (1 + date.getMonth()).toString().padStart(2, "0")
  let day = date
    .getDate()
    .toString()
    .padStart(2, "0")

  return day + "/" + month + "/" + year
}

const getRoot = (hashed_data = []) => {
  if (hashed_data.length === 0) {
    return null
  }

  if (hashed_data.length === 1) {
    return hashed_data[0]
  }

  if (hashed_data.length <= 3) {
    return hash(hashed_data.join(""))
  }

  const parentLevel = []

  for (let i = 0; i < hashed_data.length; i += 3) {
    parentLevel.push(hash(hashed_data.slice(i, i + 3).join("")))
  }

  return getRoot(parentLevel)
}

const dates = []

for (let j = 0; j < 16; j++) {
  dates.push(
    getFormattedDate(
      DateGenerator.getRandomDateInRange(
        new Date(2018, 0, 1),
        new Date(2018, 11, 31)
      )
    )
  )
  console.log(`${dates[j]} - ${hash(dates[j])}`)
}

var hashedDates = dates.map(hash)

let merkle_tree_root_hash = getRoot(hashedDates)

console.log(`Ternary merkle tree root hash - ${merkle_tree_root_hash}`)
