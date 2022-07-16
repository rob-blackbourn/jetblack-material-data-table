import * as React from 'react'

import { Theme, SxProps } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'

import { Column, Row } from '../components/types'
import { DataTable } from '../index'

interface RockStar {
  name: string
  band: string
  founded: number
}

interface FilterTextFieldProps {
  text: string
  title: string
  onChange: (filterText: string) => void
}

const FilterTextField = ({
  text,
  title,
  onChange,
  sx,
}: FilterTextFieldProps & { sx: SxProps<Theme> }) => (
  <TextField
    sx={sx}
    label={title}
    value={text}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton onClick={() => onChange('')}>
            <ClearIcon />
          </IconButton>
        </InputAdornment>
      ),
    }}
    onChange={event => onChange(event.target.value)}
  />
)

interface FilteredDataTableProps {}

interface FilteredDataTableState {
  columns: Column<RockStar>[]
  rows: RockStar[]
  filterText: string
}

class FilteredDataTable extends React.Component<
  FilteredDataTableProps,
  FilteredDataTableState
> {
  state: FilteredDataTableState = {
    columns: [
      {
        id: 'name',
        title: 'Name',
        align: 'left',
      },
      {
        id: 'band',
        title: 'Band',
        align: 'left',
        getValue: (row, _column, _columns) => row['band'],
      },
      {
        id: 'founded',
        title: 'Founded',
        align: 'right',
        formatValue: (value, row, _column, _columns) =>
          `${row.band} founded in ${value}`,
      },
    ],
    rows: [
      { name: 'Jimmy Page', band: 'Led Zeppelin', founded: 1968 },
      { name: 'Marc Bolan', band: 'T. Rex', founded: 1967 },
    ],
    filterText: '',
  }

  render() {
    const { columns, rows, filterText } = this.state
    return (
      <div>
        <div>
          <FilterTextField
            sx={{ width: 300 }}
            title="Filter"
            text={filterText}
            onChange={filterText => this.setState({ filterText })}
          />
        </div>

        <DataTable<RockStar>
          columns={columns}
          rows={rows}
          filterText={filterText}
          paginate={false}
        />
      </div>
    )
  }
}

export default FilteredDataTable
