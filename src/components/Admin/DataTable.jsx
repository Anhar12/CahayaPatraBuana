import { AgGridReact } from "ag-grid-react"

import "ag-grid-community/styles/ag-grid.css"
import "ag-grid-community/styles/ag-theme-quartz.css"

function DataTable({ rowData, columnDefs }) {
  return (
    <div
      className="ag-theme-quartz custom-grid"
      style={{ width: "100%", height: 475 }}
    >
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        pagination
        paginationPageSize={10}
        domLayout="normal"
        headerHeight={48}
        floatingFiltersHeight={40}
        rowHeight={38}
        alwaysShowHorizontalScroll
        defaultColDef={{
          sortable: false,
          filter: true,
          suppressMovable: true,
          cellClass: "ag-cell-center",
        }}
      />
    </div>
  )
}

export default DataTable
