import * as React from 'react'
import { withStyles, Theme } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import LastPageIcon from '@material-ui/icons/LastPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import { TablePaginationActionsProps } from '@material-ui/core/TablePagination/TablePaginationActions'

// type TablePaginationActionsProps = {
//   count: number
//   onChangePage: (page: number) => void
//   page: number
//   rowsPerPage: number
//   classes: { [key: string]: any }
//   theme: Theme
// }
const styles = (theme: Theme) => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5)
  }
})

const TablePaginationActions = ({
  count,
  onChangePage,
  page,
  rowsPerPage,
  classes,
  theme
}: TablePaginationActionsProps & {
  theme: Theme
  classes: { [key: string]: any }
}) => (
  <div className={classes.root}>
    <IconButton
      onClick={(event) => onChangePage(event, 0)}
      disabled={page === 0}
      aria-label='First Page'
    >
      {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
    </IconButton>
    <IconButton
      onClick={(event) => onChangePage(event, page - 1)}
      disabled={page === 0}
      aria-label='Previous Page'
    >
      {theme.direction === 'rtl' ? (
        <KeyboardArrowRight />
      ) : (
        <KeyboardArrowLeft />
      )}
    </IconButton>
    <IconButton
      onClick={(event) => onChangePage(event, page + 1)}
      disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      aria-label='Next Page'
    >
      {theme.direction === 'rtl' ? (
        <KeyboardArrowLeft />
      ) : (
        <KeyboardArrowRight />
      )}
    </IconButton>
    <IconButton
      onClick={(event) =>
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
      }
      disabled={page >= Math.ceil(count / rowsPerPage) - 1}
      aria-label='Next Page'
    >
      {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
    </IconButton>
  </div>
)

export default withStyles(styles, { withTheme: true })(TablePaginationActions)
