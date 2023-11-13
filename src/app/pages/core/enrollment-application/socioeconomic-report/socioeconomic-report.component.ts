import {Component, EventEmitter, Output} from '@angular/core';
import {FilesHttpService, StudentsHttpService} from "@services/core";
import {AuthService} from "@services/auth";
import {PrimeIcons} from "primeng/api";

@Component({
  selector: 'app-socioeconomic-report',
  templateUrl: './socioeconomic-report.component.html',
  styleUrls: ['./socioeconomic-report.component.scss']
})
export class SocioeconomicReportComponent {
  @Output() nextOut: EventEmitter<number> = new EventEmitter<number>();
  @Output() previousOut: EventEmitter<number> = new EventEmitter<number>();
  protected readonly PrimeIcons = PrimeIcons;
  protected pdfSrc: string = '';
  protected pdf!: Blob;

  constructor(private filesHttpService: FilesHttpService,
              private readonly authService: AuthService,
              private readonly studentsHttpService: StudentsHttpService
  ) {
    this.generateSocioeconomicForm();
  }

  generateSocioeconomicForm() {
    this.studentsHttpService.generateSocioeconomicForm(this.authService.auth.student.id).subscribe(pdf => {
      this.pdf = pdf;
      const reader = new FileReader();
      reader.readAsDataURL(pdf);
      reader.onloadend = () => {
        if (typeof reader.result === 'string')
          this.pdfSrc = reader.result;
      }
    });
  }

  download() {
    const filePath = URL.createObjectURL(new Blob([this.pdf]));
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    const fileName = 'Ficha_Socioeconomica_' + this.authService.auth.identification;
    downloadLink.setAttribute('download', fileName + '.pdf');
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  previous() {
    this.previousOut.emit(-1);
  }

  next() {
    this.nextOut.emit(1);
  }
}
