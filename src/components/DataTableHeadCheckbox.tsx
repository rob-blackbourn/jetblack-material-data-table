import * as React from 'react'

import { Theme } from '@mui/material/styles'
import { SxProps } from '@mui/system'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import Tooltip from '@mui/material/Tooltip'

type DataTableHeadCheckboxProps = {
  numSelected: number
  rowCount: number
  disabled: boolean
  onSelectAllClick: (isInvert: boolean, isChecked: boolean) => void
  sx?: SxProps<Theme>
}

const DataTableHeadCheckbox = ({
  numSelected,
  rowCount,
  disabled,
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
        disabled={disabled}
      />
    </Tooltip>
  </TableCell>
)

export default DataTableHeadCheckbox
