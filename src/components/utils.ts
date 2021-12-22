import { Row, Column, ColumnSortMap } from './types'

export function getFieldValue(
  row: Row,
  key: string | ((row: Row) => any)
): any {
  if (typeof key === 'string') {
    return row[key]
  } else if (typeof key === 'function') {
    return key(row)
  } else {
    throw new Error('key must be a function or a string')
  }
}

export function getColumnValue(
  row: Row,
  column: Column,
  columns: Column[],
  rows: Row[],
  context: any
): any {
  if (column.getValue) {
    return column.getValue(row, column, columns, rows, context)
  } else {
    return row[column.id]
  }
}

export function getFormattedValue(
  row: Row,
  column: Column,
  columns: Column[],
  rows: Row[],
  context: any
): string {
  const value = getColumnValue(row, column, columns, rows, context)
  if (column.formatValue) {
    return column.formatValue(value, row, column, columns, rows, context)
  } else if (value == null) {
    return ''
  } else {
    // Ensure we return a string.
    return value + ''
  }
}

export function getRenderedValue(
  row: Row,
  column: Column,
  columns: Column[],
  rows: Row[],
  context: any
): React.ReactNode | string {
  if (column.renderValue) {
    return column.renderValue(
      getColumnValue(row, column, columns, rows, context),
      row,
      column,
      columns,
      rows,
      context
    )
  } else {
    return getFormattedValue(row, column, columns, rows, context)
  }
}
function compareRows(
  lhs: Row,
  rhs: Row,
  columns: Column[],
  columnSortMap: ColumnSortMap,
  rows: Row[],
  context: any
): number {
  for (const [id, sortDirection] of Object.entries(columnSortMap)) {
    const column = columns.find((x) => x.id === id)
    if (column) {
      if (column.compare) {
        const result = column.compare(lhs, rhs, column, columns, rows, context)
        if (result !== 0) {
          return result
        }
      } else {
        const lhsValue = getColumnValue(lhs, column, columns, rows, context)
        const rhsValue = getColumnValue(rhs, column, columns, rows, context)
        if (rhsValue < lhsValue) {
          return sortDirection === 'asc' ? 1 : -1
        } else if (rhsValue > lhsValue) {
          return sortDirection == 'asc' ? -1 : 1
        }
      }
    }
  }
  return 0
}

export function stableSort(
  rows: Row[],
  columns: Column[],
  columnSortMap: ColumnSortMap,
  context: any
): Row[] {
  const data = rows.map((row, index) => ({ row, index }))
  data.sort((lhs, rhs) => {
    const difference = compareRows(lhs.row, rhs.row, columns, columnSortMap, rows, context)
    return difference !== 0 ? difference : lhs.index - rhs.index
  })
  return data.map(({ row }) => row)
}

export function filterRows(
  rows: Row[],
  columns: Column[],
  filterText: string,
  context: any
): Row[] {
  if (!filterText) {
    return rows
  }
  const matchString = filterText.toLowerCase()
  return rows.filter((row) =>
    columns.some((column) =>
      column.search
        ? column.search(matchString, row, column, columns, rows, context)
        : getFormattedValue(row, column, columns, rows, context)
            .toLowerCase()
            .includes(matchString)
    )
  )
}

export function isRowSelected(
  row: Row,
  selected: Row[],
  compareRow?: (lhs: Row, rhs: Row) => boolean
): boolean {
  return compareRow == null
    ? selected.includes(row)
    : selected.find((x) => compareRow(row, x)) !== undefined
}
