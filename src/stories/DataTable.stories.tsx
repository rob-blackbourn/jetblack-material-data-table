import * as React from 'react'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import SimpleDataTable from './SimpleDataTable'
import ComplexDataTable from './ComplexDataTable'
import RowDetailDataTable from './RowDetailDataTable'
import NoPaginateDataTable from './NoPaginateDataTable'
import RenderDataTable from './RenderDataTable'
import SelectableDataTable from './SelectableDataTable'
import FilteredDataTable from './FilteredDataTable'
import ColumnSortDataTable from './ColumnSortDataTable'
import ColumnStyleDataTable from './ColumnStyleDataTable'

import { Meta } from '@storybook/react/types-6-0'
import Typography from '@mui/material/Typography'
import DataTable from '../components/DataTable'

export const Simple: React.VFC<{}> = () => <SimpleDataTable />

export const WithRowDetail: React.FC<{}> = () => <RowDetailDataTable />

export const WithoutPagination: React.FC<{}> = () => (
  <div>
    <div>
      <Typography variant="h2">A data table</Typography>
      <Typography variant="body1">Some text content</Typography>
    </div>

    <NoPaginateDataTable />

    <div>
      <Typography variant="body2">
        The quick brown fox jumped over the lazy dog. The quick brown fox jumped
        over the lazy dog. The quick brown fox jumped over the lazy dog. The
        quick brown fox jumped over the lazy dog. The quick brown fox jumped
        over the lazy dog. The quick brown fox jumped over the lazy dog. The
        quick brown fox jumped over the lazy dog. The quick brown fox jumped
        over the lazy dog.
      </Typography>
    </div>
  </div>
)

export const WithRender: React.FC<{}> = () => <RenderDataTable />

export const WithSelection: React.FC<{}> = () => <SelectableDataTable />

export const WithFilter: React.FC<{}> = () => <FilteredDataTable />

export const WithColumnSort: React.FC<{}> = () => <ColumnSortDataTable />

export const WithColumnStyle: React.FC<{}> = () => <ColumnStyleDataTable />

export const WithEverything: React.FC<{}> = () => <ComplexDataTable />

export default {
  title: 'DataTable examples', // Title of you main menu entry for this group of stories
  component: DataTable, // This is the component documented by this Storybook page
} as Meta
