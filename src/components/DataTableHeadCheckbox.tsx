import * as React from 'react'
import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import Tooltip from '@material-ui/core/Tooltip'

type DataTableHeadCheckboxProps = {
  numSelected: number
  rowCount: number
  onSelectAllClick: (isInvert: boolean, isChecked: boolean) => void
}

const DataTableHeadCheckbox = ({
  numSelected,
  rowCount,
  onSelectAllClick
}: DataTableHeadCheckboxProps) => (
  <TableCell key='head-checkbox' padding='checkbox'>
    <Tooltip title='To invert press shift and click'>
      <Checkbox
        checked={numSelected === rowCount}
        indeterminate={numSelected > 0 && numSelected < rowCount}
        onChange={(event) =>
          onSelectAllClick(
            (event.nativeEvent as MouseEvent).shiftKey,
            event.target.checked
          )
        }
      />
    </Tooltip>
  </TableCell>
)

export default DataTableHeadCheckbox
