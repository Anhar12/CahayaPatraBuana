import { AgGridReact } from "ag-grid-react"

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"

function DataTable({ rowData, columnDefs }) {
  return (
    <div
      className="ag-theme-quartz custom-grid"
      style={{ width: "100%", height: 420 }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination
        paginationPageSize={5}
        headerHeight={48}
        defaultColDef={{
          sortable: true,
          filter: true,
          suppressMovable: true,
        }}
        rowSelection="multiple"
      />
    </div>
  )
}

export default DataTable
