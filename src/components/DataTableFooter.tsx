import * as React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import DataTablePaginationActions from './DataTablePaginationActions'
import { Row } from './types'

type DataTableFooterProps = {
  colSpan: number
  rows: Row[]
  page: number
  rowsPerPage: number
  rowsPerPageOptions: number[]
  onChangePage: (page: number) => void
  onChangeRowsPerPage: (rowsPerPage: number) => void
}

const DataTableFooter = ({
  colSpan,
  rows,
  page,
  rowsPerPage,
  rowsPerPageOptions,
  onChangePage,
  onChangeRowsPerPage
}: DataTableFooterProps) => (
  <TableFooter>
    <TableRow>
      <TablePagination
        colSpan={colSpan}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        page={page}
        onChangePage={(_event, page) => onChangePage(page)}
        onChangeRowsPerPage={(event) =>
          onChangeRowsPerPage(parseInt(event.target.value))
        }
        ActionsComponent={DataTablePaginationActions}
      />
    </TableRow>
  </TableFooter>
)

export default DataTableFooter
