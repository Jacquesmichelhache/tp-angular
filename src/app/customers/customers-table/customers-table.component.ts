import { Component, OnInit,ViewChild  } from '@angular/core';
import { ServerApiService } from '../../server-api.service';
import { of, pipe } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
import { AgGridAngular } from 'ag-grid-angular';
import { AuthService } from 'src/app/auth/auth.service';
import {editRowComponent} from '../../shared/ag-grid-helpers/editRowComponent'
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component'
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { CustomersTableService } from '../customers-table.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EditDialogComponent} from '../edit-dialog/edit-dialog.component'



interface tableState {
  colState:any,
  groupState :any,
  sortState:any,
  filterState :any
}

@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.scss']
})
export class CustomersTableComponent implements OnInit {
  deleteDialogRef: MatDialogRef<ConfirmationDialogComponent>
  editDialogRef: MatDialogRef<EditDialogComponent>

  constructor(private serverApi:ServerApiService, 
    private authService: AuthService,
    public dialog:MatDialog,
    private customersTableService:CustomersTableService,
    private _snackBar: MatSnackBar) { }


  @ViewChild('agGrid') agGrid: AgGridAngular;
  tableStateId:string = "customers-tablestate-user-";
  isTablePersistent:boolean = false;  

  ngOnInit(): void {   
    this.enablePersistentTableState();  
    this.getCustomers(); 
    
    this.customersTableService.refreshTable$.subscribe(()=>{      
      this.refreshTable();
    });
  }

  refreshTable(){
    this.getCustomers();
  }

  async deleteButtonCallback(params){
    this.deleteDialogRef = this.dialog.open(ConfirmationDialogComponent, {disableClose:false});
    this.deleteDialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?";
    this.deleteDialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.serverApi.deleteCustomer(params.data.id).subscribe(response=>{
          if(response.status === "success"){
            this.refreshTable();   
            this._snackBar.open("Successfully deleted a Customer!", "Good job",{duration:2000})
          }else if(response.status === "error")   {
            this._snackBar.open(response.data.message, "Error",{duration:2000})
          } else{
            this._snackBar.open("Could not delete customer for unknown reason", "Fatal error",{duration:2000})
          }  
        })
       
      }
      this.deleteDialogRef = null;
    });
  }
  async ediButtonCallback(params){
    this.editDialogRef = this.dialog.open(EditDialogComponent, {disableClose:false});
    this.editDialogRef.componentInstance.customerId = params.data.id;
    this.editDialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.refreshTable();  
      }
    })
  }

  defaultColumnDefs = {
    filter:true,
    sortable:true,
    resizable:true,
    flex:2
  }

  tableComponents = {
    ControlsCellRenderer:editRowComponent(this.deleteButtonCallback.bind(this),this.ediButtonCallback.bind(this))
  }
  
  columnDefs = [
    {field:'id', hide:true},
    {headerName:"Name", field: 'name'},
    {headerName:"Start Date", field: 'relationshipstart', valueFormatter:this.dateFormatter, comparator:this.dateComparator },
    {headerName:"Activity Type", field: 'activitytype'},
    {headerName:"E-mail", field: 'infoemail'},
    {headerName:"",width:90, cellRenderer:"ControlsCellRenderer", pinned:"left", lockPosition:true,
      resizable:false,filter:false,sortable:false,flex:2, cellStyle:{padding:"0px",margin:"0px"}}
  ];

  rowData:any;

  enablePersistentTableState(){  
    this.isTablePersistent = true;

    window.addEventListener("beforeunload",()=>{
      this.saveTableState();
    },{once:true})
  }

  saveTableState(){
    let state:tableState = {
      colState: this.agGrid.gridOptions.columnApi.getColumnState(),
      groupState: this.agGrid.gridOptions.columnApi.getColumnGroupState(),
      sortState: this.agGrid.gridOptions.api.getSortModel(),
      filterState: this.agGrid.gridOptions.api.getFilterModel(),
    }

    if(localStorage){
      localStorage.setItem(this.tableStateId + this.authService.userId,JSON.stringify(state))
    }
  }

  restoreTableState(){
    let stateString = localStorage.getItem(this.tableStateId + this.authService.userId)

    if(stateString){
      let state:tableState = JSON.parse(stateString) as tableState;
      let gridOptions = this.agGrid.gridOptions;

      gridOptions.columnApi.setColumnState(state.colState)
      gridOptions.columnApi.setColumnGroupState(state.groupState)
      gridOptions.api.setSortModel(state.sortState)
      gridOptions.api.setFilterModel(state.filterState)

      console.log("table was restored")
    }
  }

  dateFormatter(params){
    let dateAsString = params.data.relationshipstart   
    let dateAsObject = new Date(Date.parse(dateAsString)); 

    return dateAsObject.getUTCDate() + "/" + (dateAsObject.getUTCMonth() + 1) + "/" + dateAsObject.getUTCFullYear();
  }  

  dateComparator(date1, date2) {
    let dateObject1 = new Date(date1);
    let dateObject2 = new Date(date2);   

    return dateObject1.getTime() - dateObject2.getTime();
  }

  onGridReady(){
    if(this.isTablePersistent) this.restoreTableState();      
      

  }

  getCustomers(){
    this.rowData =  this.serverApi.getCustomers().pipe(
      map(customers=>{   
        
        //console.log(customers)

        let agGridRows = customers.map(customer=>{
          return {
            'id':customer.id,
            'name':customer.name, 
            'relationshipstart':customer.relationshipstart, 
            'activitytype': customer.activitytype,
            'infoemail':customer.infoemail 
          }
        });

        return agGridRows;     

      }),
      catchError(err=>of([]))      
    );     
    
  }
}

