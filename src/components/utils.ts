import { SyncProblemRounded } from "@material-ui/icons"
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
  lhs: Row,
  rhs: Row,
  columns: Column[],
  columnSortMap: ColumnSortMap
): number {
  for (const [id, sortDirection] of Object.entries(columnSortMap)) {
    const column = columns.find((x) => x.id === id)
    if (column) {
      if (column.compare) {
        const result = column.compare(lhs, rhs, column)
        if (result !== 0) {
          return result
        }
      } else {
        const lhsValue = getColumnValue(lhs, column)
        const rhsValue = getColumnValue(rhs, column)
        if (rhsValue < lhsValue) {
          return sortDirection === "asc" ? 1 : -1
        } else if (rhsValue > lhsValue) {
          return sortDirection == "asc" ? -1 : 1
        }  
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
  const data = rows.map((row, index) => ({ row, index }))
  data.sort((lhs, rhs) => {
    const difference = compareRows(lhs.row, rhs.row, columns, columnSortMap)
    return difference !== 0 ? difference : lhs.index - rhs.index
  })
  return data.map(({ row }) => row)
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
    columns.some((column) => column.search
      ? column.search(matchString, row, column)
      : getFormattedValue(row, column).toLowerCase().includes(matchString)
    )
  )
}
