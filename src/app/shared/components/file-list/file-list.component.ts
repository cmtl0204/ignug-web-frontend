import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {PrimeIcons} from "primeng/api";
import {ColumnModel, EventModel, ModelI, PaginatorModel, SelectEventDto} from "@models/core";
import {CoreService, FilesHttpService, MessageService} from "@services/core";

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss']
})
export class FileListComponent {
  protected readonly PrimeIcons = PrimeIcons;
  @Input() acceptAttributes = '.pdf,.txt,.doc,.docx,.xls,.xlsx,.csv,.ppt,.pptx,.zip,.rar,.7z,.tar, image/*';
  @Input() multiple = true;
  @Input() maxFileSize = 10240000 * 20;
  @Input() fileLimit = 20;
  @Input() flagUploadFilesIn: boolean = false;
  @Output() files = new EventEmitter<any[]>();
  @Input() modelId: string = '';
  protected columns: ColumnModel[] = this.buildColumns;
  protected paginator: PaginatorModel;
  protected search: FormControl = new FormControl('');
  protected selectedItem: SelectEventDto = {};
  protected selectedItems: EventModel[] = [];
  protected items: EventModel[] = [];
  protected model: ModelI = {};

  constructor(
    public coreService: CoreService,
    public filesHttpService: FilesHttpService,
    public messageService: MessageService
  ) {

    this.paginator = this.coreService.paginator;

    this.search.valueChanges.subscribe(value => {
      if (value.length === 0) {
        this.findByModel();
      }
    });
  }

  findByModel(page: number = 0) {
    this.filesHttpService.findByModel(this.modelId, page, this.search.value)
      .subscribe((response) => {
        this.paginator = response.pagination!;
        this.items = response.data;
      });
  }

  get buildColumns(): ColumnModel[] {
    return [
      {field: 'originalName', header: 'Nombre'},
      {field: 'description', header: 'Descripción'},
      {field: 'extension', header: 'Extensión'},
      {field: 'size', header: 'Tamaño'},
    ];
  }

  selectItem(item: EventModel) {
    this.selectedItem = item;
  }

  paginate(event: any) {
    this.findByModel(event.page);
  }

  upload(event:any, uploadFiles:any) {
    console.log(event);
    console.log(uploadFiles);
  }

}
