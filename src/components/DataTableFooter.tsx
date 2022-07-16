import * as React from 'react'

import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'
import TableRow from '@mui/material/TableRow'
import TableFooter from '@mui/material/TableFooter'
import TablePagination from '@mui/material/TablePagination'

import DataTablePaginationActions from './DataTablePaginationActions'
import { Row } from './types'

export interface DataTableFooterProps<TRow> {
  colSpan: number
  rows: TRow[]
  page: number
  rowsPerPage: number
  rowsPerPageOptions: number[]
  onPageChange: (page: number) => void
  onRowsPerPageChange: (rowsPerPage: number) => void
  sx?: SxProps<Theme>
}

export default function DataTableFooter<TRow extends Row>({
  colSpan,
  rows,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  onPageChange,
  onRowsPerPageChange,
}: DataTableFooterProps<TRow>) {
  return (
    <TableFooter>
      <TableRow>
        <TablePagination
          colSpan={colSpan}
          count={rows.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          page={page}
          onPageChange={(_event, page) => onPageChange(page)}
          onRowsPerPageChange={event =>
            onRowsPerPageChange(parseInt(event.target.value))
          }
          ActionsComponent={DataTablePaginationActions}
        />
      </TableRow>
    </TableFooter>
  )
}
