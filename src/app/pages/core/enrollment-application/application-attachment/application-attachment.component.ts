import {Component, OnInit} from '@angular/core';
import {CataloguesHttpService, SubjectsService} from "@services/core";
import {CatalogueModel, SubjectModel} from "@models/core";
import {CatalogueCoreTypeEnum} from "@shared/enums";

@Component({
  selector: 'app-application-attachment',
  templateUrl: './application-attachment.component.html',
  styleUrls: ['./application-attachment.component.scss']
})
export class ApplicationAttachmentComponent implements OnInit{
// Flag upload files is enabled
  protected isFileList: boolean = false;
  protected fileTypes: CatalogueModel[] = [];

  constructor(protected readonly subjectsService: SubjectsService,
              private cataloguesHttpService: CataloguesHttpService,) {

  }

  ngOnInit(): void {
    this.loadFileTypes();
  }

  loadFileTypes(): void {
    this.fileTypes = this.cataloguesHttpService.findByType(CatalogueCoreTypeEnum.DISABILITY_TYPE);
  }
}
