/* eslint-disable no-prototype-builtins */
import XLSX from 'xlsx'

export const generateExcelFromJSON = (docs) => {
  const workbook = XLSX.utils.book_new()
  const data = docs.map((doc) => {
    const { id, _id, createdAt, modifiedAt, ...others } = doc
    return flattenObject(others)
  })
  const sheet = XLSX.utils.json_to_sheet(data)
  XLSX.utils.book_append_sheet(workbook, sheet, 'Datos')
  XLSX.writeFile(workbook, `wally-report-${+new Date()}.xlsx`)
}

function flattenObject(ob) {
  const toReturn = {}

  for (const i in ob) {
    console.log(i)
    if (!ob.hasOwnProperty(i) || i === '_id') continue

    if (typeof ob[i] === 'object' && ob[i] !== null) {
      const flatObject = flattenObject(ob[i])
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue

        toReturn[i + '.' + x] = flatObject[x]
      }
    } else {
      toReturn[i] = ob[i]
    }
  }
  return toReturn
}
