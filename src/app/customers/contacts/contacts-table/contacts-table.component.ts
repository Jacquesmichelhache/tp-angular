import { Component, OnInit,ViewChild  } from '@angular/core';
import { ServerApiService } from '../../../server-api.service';
import { of, pipe } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
import { AgGridAngular } from 'ag-grid-angular';
import { AuthService } from 'src/app/auth/auth.service';
import {editRowComponent} from '../../../shared/ag-grid-helpers/editRowComponent'
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog/confirmation-dialog.component'
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { ContactsTableService } from '../contacts-table.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EditContactDialogComponent} from '../edit-contact-dialog/edit-contact-dialog.component'
import { CustomersTableService } from '../../customers-table.service';

interface tableState {
  colState:any,
  groupState :any,
  sortState:any,
  filterState :any
}


@Component({
  selector: 'app-contacts-table',
  templateUrl: './contacts-table.component.html',
  styleUrls: ['./contacts-table.component.scss']
})
export class ContactsTableComponent implements OnInit {
  deleteDialogRef: MatDialogRef<ConfirmationDialogComponent>
  editDialogRef: MatDialogRef<EditContactDialogComponent>

  constructor(private serverApi:ServerApiService, 
    private authService: AuthService,
    public dialog:MatDialog,
    private ContactsTableService:ContactsTableService,
    private _snackBar: MatSnackBar,
    private customersTableService:CustomersTableService) { }

  @ViewChild('agGridContacts') agGrid: AgGridAngular;
  tableStateId:string = "contacts-tablestate-user-";
  isTablePersistent:boolean = false;  

  ngOnInit(): void {   
    this.enablePersistentTableState();  
    this.getContacts(); 
    
    this.ContactsTableService.refreshTable$.subscribe(()=>{      
      this.refreshTable();
    });

    this.ContactsTableService.filterTable$.subscribe(filterValue=>{
      if(this.agGrid) this.agGrid.gridOptions.api.setQuickFilter(filterValue);
    });

  }

  refreshTable(){
    this.getContacts();
  }

  async deleteButtonCallback(params){
    this.deleteDialogRef = this.dialog.open(ConfirmationDialogComponent, {disableClose:false});
    this.deleteDialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?";
    this.deleteDialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.serverApi.deleteContact(this.customersTableService.selectedCustomerId,params.data.id).subscribe(response=>{
          if(response.status === "success"){
            this.refreshTable();   
            this._snackBar.open("Successfully deleted a Contact!", "Good job",{duration:2000})
          }else if(response.status === "error")   {
            this._snackBar.open(response.data.message, "Error",{duration:2000})
          } else{
            this._snackBar.open("Could not delete contact for unknown reason", "Fatal error",{duration:2000})
          }  
        })
       
      }
      this.deleteDialogRef = null;
    });
  }
  async editButtonCallback(params){
    this.ContactsTableService.selectedContactId = params.data.id;

    this.editDialogRef = this.dialog.open(EditContactDialogComponent, {disableClose:false});
    this.editDialogRef.componentInstance.contactId = params.data.id;
    this.editDialogRef.afterClosed().subscribe(result =>{
        this.refreshTable();      
    })
  }

  defaultColumnDefs = {
    filter:true,
    sortable:true,
    resizable:true,
    flex:2
  }

  tableComponents = {
    ControlsCellRenderer:editRowComponent(this.deleteButtonCallback.bind(this),this.editButtonCallback.bind(this))
  }
  
  columnDefs = [
    {field:'id', hide:true},
    {headerName:"Name", field: 'name'},
    {headerName:"First Name", field: 'firstname'},
    {headerName:"Tel.", field: 'tel'},
    {headerName:"Ext", field: 'ext'},
    {headerName:"E-mail", field:'email'},
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
    }
  }  

  onGridReady(){
    if(this.isTablePersistent) this.restoreTableState();   
  }

  getContacts(){
    this.rowData =  this.serverApi.getContacts(this.customersTableService.selectedCustomerId).pipe(
      map(response=>{   
        if(response.status === "success"){
          let contacts = response.data.value

          let agGridRows = contacts.map(contact=>{
            return {
              'id':contact.id,
              'name':contact.name, 
              'firstname':contact.firstname, 
              'ext': contact.ext,
              'email':contact.email ,
              'tel':contact.tel 
            }
          });

          return agGridRows;    
        } 
      }),
      catchError(err=>of([]))      
    );     
    
  }

}
