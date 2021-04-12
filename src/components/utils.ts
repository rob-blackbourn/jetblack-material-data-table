import { Row, Column, ColumnSortMap } from "./types"

export function getFieldValue(
  row: Row,
  key: string | ((row: Row) => any)
): any {
  if (typeof key === "string") {
    return row[key]
  } else if (typeof key === "function") {
    return key(row)
  } else {
    throw new Error("key must be a function or a string")
  }
}

export function getColumnValue(row: Row, column: Column): any {
  if (column.getValue) {
    return column.getValue(row, column)
  } else {
    return row[column.id]
  }
}

export function getFormattedValue(row: Row, column: Column): string {
  const value = getColumnValue(row, column)
  if (column.formatValue) {
    return column.formatValue(value, row, column)
  } else if (value == null) {
    return ""
  } else {
    // Ensure we return a string.
    return value + ""
  }
}

export function getRenderedValue(row: Row, column: Column): React.ReactNode | string {
  if (column.renderValue) {
    return column.renderValue(getColumnValue(row, column), row, column)
  } else {
    return getFormattedValue(row, column)
  }

}
function compareRows(
  a: Row,
  b: Row,
  columns: Column[],
  columnSortMap: ColumnSortMap
): number {
  for (const [id, sortDirection] of Object.entries(columnSortMap)) {
    const column = columns.find((x) => x.id === id)
    if (column) {
      const firstValue = getColumnValue(a, column)
      const secondValue = getColumnValue(b, column)
      if (secondValue < firstValue) {
        return sortDirection === "asc" ? 1 : -1
      } else if (secondValue > firstValue) {
        return sortDirection == "asc" ? -1 : 1
      }
    }
  }
  return 0
}

export function stableSort(
  rows: Row[],
  columns: Column[],
  columnSortMap: ColumnSortMap
): Row[] {
  const stablizedThis = rows.map((row, index) => ({ row, index }))
  stablizedThis.sort((a, b) => {
    const difference = compareRows(a.row, b.row, columns, columnSortMap)
    return difference !== 0 ? difference : a.index - b.index
  })
  return stablizedThis.map(({ row, index }) => row)
}

export function filterRows(
  rows: Row[],
  columns: Column[],
  filterText: string
): Row[] {
  if (!filterText) {
    return rows
  }
  const matchString = filterText.toLowerCase()
  return rows.filter((row) =>
    columns.some((column) =>
      getFormattedValue(row, column).toLowerCase().includes(matchString)
    )
  )
}
