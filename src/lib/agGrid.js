import { ModuleRegistry } from "ag-grid-community"
import { ClientSideRowModelModule } from "ag-grid-community"
import { TextFilterModule } from "ag-grid-community"
import { NumberFilterModule } from "ag-grid-community"
import { PaginationModule } from "ag-grid-community"

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  TextFilterModule,
  NumberFilterModule,
  PaginationModule,
])
