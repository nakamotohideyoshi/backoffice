import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../../shared/service/options.service';
import { GridOptions } from 'ag-grid/main';
import { OptionRenderPrices } from '../option-render-prices/option-render-prices.component';

@Component({
  selector: 'options-list',
  styleUrls: [ './options-list.style.scss' ],
  templateUrl: './options-list.template.html'
})
export class OptionsListComponent implements OnInit {
  public options: any;
  public gridOptions: GridOptions;
  public rowData: any[];
  private dataSource: any;
  constructor (private optService: OptionsService) {
    this.gridOptions = <GridOptions>{
      columnDefs: this.createColumnDefs(),
      rowModelType: 'virtual',
      paginationPageSize: 30,
      enableColResize: true,
      enableServerSideSorting: true,
      enableServerSideFilter: true,
      rowHeight: 110,
      rowSelection: 'multiple',
      rowDeselection: true,
      showGrid: true
    };
  }
  ngOnInit(): void {
    this.update();
  }
  /* -------- */
  /* Ag-grid */
  /* ------- */
  public createColumnDefs() {
    return [
      {
        headerName: 'Internal name',
        field: 'internal_name',
        width: 200,
        cellRenderer: (params) => {
          if (params.data !== undefined) {
            return params.value;
          } else {
            return '<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>';
          }
        }
      },
      {
        headerName: 'Start cost name',
        field: 'start_cost_name',
        width: 150,
      },
      {
        headerName: 'Start cost',
        field: 'start_cost',
        width: 60,
      },
      {
        headerName: 'Price mode',
        field: 'price_mode',
        width: 100,
      },
      {
        headerName: 'Prices',
        field: 'prices',
        width: 400,
        cellRendererFramework: OptionRenderPrices,
        suppressMenu: true,
        suppressSorting: true
      },
      {
        headerName: 'Edit',
        field: 'edit',
        width: 100,
        suppressMenu: true,
        suppressSorting: true,
        cellRenderer: () => {
          return `<button class="btn btn-success" disabled>
                    <i class="fa fa-pencil"></i>Edit
                  </button>`;
        }
      }
    ];
  }
  public update() {
    this.rowData = [];
    this.optService.getListOptions().subscribe((res) => {
      res.forEach((item) => {
        this.rowData.push({
          internal_name: item.internal_name,
          total: item.total,
          start_cost_name: item.start_cost_name,
          start_cost: item.start_cost,
          price_mode: item.price_mode,
          prices: item.prices,
          edit: 'edit'
        });
      });
      this.dataSource = {
        rowCount: null,
        getRows: (params) => {
          let rowDataAfterSortingAndFilter = this.sortAndFilter(
            this.rowData, params.sortModel, params.filterModel);
          let rowsThisPage = rowDataAfterSortingAndFilter.slice(params.startRow, params.endRow);
          let lastRow = -1;
          if (rowDataAfterSortingAndFilter.length <= params.endRow) {
            lastRow = rowDataAfterSortingAndFilter.length;
          }
          params.successCallback(rowsThisPage, lastRow);
        }
      };
      this.gridOptions.rowData = this.rowData;
    });
  }
  public sortAndFilter(allOfTheData, sortModel, filterModel) {
    return this.sortData(sortModel, this.filterData(filterModel, allOfTheData));
  }

  private sortData(sortModel, data) {
    let sortPresent = sortModel && sortModel.length > 0;
    if (!sortPresent) {
      return data;
    }

    let resultOfSort = data.slice();
    resultOfSort.sort(function (a, b) {
      for (let k = 0; k < sortModel.length; k++) {
        let sortColModel = sortModel[k];
        let valueA = a[sortColModel.colId];
        let valueB = b[sortColModel.colId];
        if (valueA === valueB) {
          continue;
        }
        let sortDirection = sortColModel.sort === 'asc' ? 1 : -1;
        if (valueA > valueB) {
          return sortDirection;
        } else {
          return sortDirection * -1;
        }
      }
      return 0;
    });
    return resultOfSort;

  }

  private filterData(filterModel, data) {
    let filterPresent = filterModel && Object.keys(filterModel).length > 0;
    if (!filterPresent) {
      return data;
    }
    let resultOfFilter = [];
    let fieldFilter = Object.keys(filterModel);
    fieldFilter.forEach(field => {
      data.forEach((item) => {
        if (filterModel[field]) {
          let filterTotal = filterModel[field].filter.toString();
          let value: any;
          try {
            value = item[field].toString();
          } catch (e) {
            value = '';
          }
          switch (filterModel[field].type) {
            case 'contains': if (value.indexOf(filterTotal) === -1) return; break;
            case 'equals': if (value !== filterTotal) return; break;
            case 'notEquals': if (value === filterTotal) return; break;
            case 'startsWith': if (value.indexOf(filterTotal) !== 0) return; break;
            case 'endsWith': {
              let myReverse = function(str) {
                return str.split('').reverse().join();
              };
              if (myReverse(value).indexOf(myReverse(filterTotal)) !== 0) return;
            } break;
            default: break;
          }
        }
        resultOfFilter.push(item);
      });
    });
    return resultOfFilter;
  }
}


