import { SyncProblemRounded } from "@material-ui/icons"
import { Row, Column, ColumnMap, ColumnSortMap } from "./types"

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

export function getColumnValue(row: Row, id: string, column: Column, columns: ColumnMap): any {
  if (column.getValue) {
    return column.getValue(row, column, columns)
  } else {
    return row[id]
  }
}

export function getFormattedValue(row: Row, id: string, column: Column, columns: ColumnMap): string {
  const value = getColumnValue(row, id, column, columns)
  if (column.formatValue) {
    return column.formatValue(value, row, column, columns)
  } else if (value == null) {
    return ""
  } else {
    // Ensure we return a string.
    return value + ""
  }
}

export function getRenderedValue(row: Row, id: string, column: Column, columns: ColumnMap): React.ReactNode | string {
  if (column.renderValue) {
    return column.renderValue(getColumnValue(row, id, column, columns), row, column, columns)
  } else {
    return getFormattedValue(row, id, column, columns)
  }

}
function compareRows(
  lhs: Row,
  rhs: Row,
  columns: ColumnMap,
  columnSortMap: ColumnSortMap
): number {
  for (const [id, sortDirection] of Object.entries(columnSortMap)) {
    const column = columns[id]
    if (column) {
      if (column.compare) {
        const result = column.compare(lhs, rhs, column, columns)
        if (result !== 0) {
          return result
        }
      } else {
        const lhsValue = getColumnValue(lhs, id, column, columns)
        const rhsValue = getColumnValue(rhs, id, column, columns)
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
  columns: ColumnMap,
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
  columns: ColumnMap,
  filterText: string
): Row[] {
  if (!filterText) {
    return rows
  }
  const matchString = filterText.toLowerCase()
  return rows.filter((row) =>
    Object.entries(columns).some(([id, column]) => column.search
      ? column.search(matchString, row, column, columns)
      : getFormattedValue(row, id, column, columns).toLowerCase().includes(matchString)
    )
  )
}

export function sortColumnMap(columns: ColumnMap): Column[] {
  return Object.entries(columns)
    .sort((
      [_lhsId, {order:lhsOrder}],
      [_rhsId, {order: rhsOrder}]) =>
      lhsOrder - rhsOrder)
    .map(([_id, column]) => column)
}