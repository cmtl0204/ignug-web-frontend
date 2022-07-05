import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ValidationErrors} from '@angular/forms';
import {ConfirmationService, Message} from "primeng/api";
import {ConfirmEventType, MessageService as MessagePNService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {PaginatorModel} from '@models/core';
import {ServerResponse} from '@models/http-response';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private messageService: MessagePNService,
              private confirmationService: ConfirmationService,
              public dialogService: DialogService) {
  }

  showLoading() {
    //return Swal.showLoading();
  }

  hideLoading() {
    // return Swal.hideLoading();
  }

  error(error: HttpErrorResponse) {
    switch (error.status) {
      case 400:
        if (error.error.msg.code === '23505') {
          this.confirmationService.confirm({
            key: 'messageDialog',
            // icon: 'pi pi-exclamation-circle',
            header: error.error.msg.summary,
            message: error.error.msg.detail,
            acceptLabel: 'Entiendo',
            rejectVisible: false,
            dismissableMask: true,
            accept: () => {

            }
          });
        }
        break;
      case 404:
        this.confirmationService.confirm({
          key: 'messageDialog',
          // icon: 'pi pi-exclamation-circle',
          header: error.error.msg.summary,
          message: error.error.msg.detail,
          acceptLabel: 'Entiendo',
          rejectVisible: false,
          dismissableMask: true,
          accept: () => {

          }
        });
        break;
      case 422:
        let i;
        const fields = Object.values(error.error.msg.detail).toString().split('.,');
        let html = '<ul>';
        for (i = 0; i < fields.length - 1; i++) {
          html += `<li>${fields[i]}.</li>`;
        }
        html += `<li>${fields[i]}</li>`;
        html += '</ul>';
        this.confirmationService.confirm({
          key: 'messageDialog',
          // icon: 'pi pi-exclamation-circle',
          header: error.error.msg.summary,
          message: html,
          acceptLabel: 'Entiendo',
          rejectVisible: false,
          dismissableMask: true,
          accept: () => {

          }
        });
        break;
      default:
        this.confirmationService.confirm({
          key: 'messageDialog',
          // icon: 'pi pi-exclamation-circle',
          header: error.error.msg.summary,
          message: error.error.msg.detail,
          acceptLabel: 'Entiendo',
          rejectVisible: false,
          dismissableMask: true,
          accept: () => {

          }
        });
    }
  }

  success(serverResponse: ServerResponse) {
    this.confirmationService.confirm({
      key: 'messageDialog',
      // icon: 'pi pi-exclamation-circle',
      header: serverResponse.msg?.summary,
      message: serverResponse.msg?.detail,
      acceptLabel: 'Entiendo',
      rejectVisible: false,
      dismissableMask: true,
      accept: () => {

      }
    });
  }

  errorRequired() {
    this.messageService.add({severity: 'error', summary: 'No se puede eliminar', detail: 'El campo es requerido'});
  }

  suspendUser({title = '¿Está seguro de suspender al usuario?', text = 'El usuario no tendrá acceso al sistema!'}) {
    this.confirmationService.confirm({
      key: 'messageDialog',
      // icon: 'pi pi-exclamation-circle',
      header: title,
      message: text,
      acceptLabel: 'Entiendo',
      rejectVisible: false,
      dismissableMask: true,
      accept: () => {

      },
      reject: (type: number) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({severity: 'error', summary: 'Rejected', detail: 'You have rejected'});
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled'});
            break;
        }
      }
    });
  }

  questionDelete({title = '¿Está seguro de eliminar?', text = 'No podrá recuperar esta información!'}) {
    /*
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#eeeeee',
      confirmButtonText: '<i class="pi pi-trash"> Si, eliminar</i>'
    });
     */
  }

  questionOnExit({title = '¿Está seguro de salir?', text = 'Se perderá la información que no haya guardado!'}) {
    /*
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: '<i class="pi pi-sign-out"> Si, salir</i>'
    });
     */
  }

  get fieldRequired(): string {
    return 'El campo es obligatorio.';
  }

  get fieldEmail(): string {
    return 'Correo electrónico no válido.';
  }

  get fieldWeb(): string {
    return 'Página web no válida.';
  }

  get fieldNumber(): string {
    return 'El campo solo debe contener numeros.';
  }

  fieldMinLength(errors: ValidationErrors) {
    return `Debe contener como mínimo de caracteres ${errors['minlength']['requiredLength']}.`;
  }

  fieldMaxLength(errors: ValidationErrors): string {
    return `Debe contener como máximo de caracteres ${errors['maxlength']['requiredLength']}.`;
  }

  fieldMin(errors: ValidationErrors) {
    return `Numero mínimo permitido es ${errors['min']['requiredMin']}.`;
  }

  fieldMax(errors: ValidationErrors): string {
    return `Numero maximo permitido es ${errors['max']['requiredMax']}.`;
  }

  get fieldPattern() {
    return `No cumple con el formato.`;
  }

  get fieldIdentification() {
    return `No cumple con el formato de una cédula Ecuatoriana.`;
  }

  get fieldNoPasswordMatch(): string {
    return 'Las contraseñas no coinciden.';
  }

  get fieldUserNotAvailable(): string {
    return 'Este usuario ya se encuentra registrado.';
  }

  get fieldUserAvailable(): string {
    return 'Usuario está disponible.';
  }

  get fieldEmailNotAvailable(): string {
    return 'Este correo electrónico no está disponible.';
  }

  get fieldPhoneNotAvailable(): string {
    return 'Este teléfono no está disponible.';
  }

  paginatorTotalRegisters(paginator: PaginatorModel): string {
    return 'En total hay ' + (paginator?.totalItems ? paginator.totalItems : 0) + ' registros.';
  }

  get paginatorNoRecordsFound(): string {
    return 'No se encontraron registros.';
  }

  get buttonFormSaveOrUpdate(): string {
    return `Guardar`;
  }

  get buttonFormClose(): string {
    return `Cerrar`;
  }

  get progressBarProcess(): string {
    return `Procesando...`;
  }

  get progressBarSaveOrUpdate(): string {
    return `Guardando...`;
  }

  get progressBarDownload(): string {
    return `Descargando...`;
  }

  get progressBarUpload(): string {
    return `Cargando...`;
  }

  get progressBarLogin(): string {
    return `Ingresando...`;
  }

  get progressBarRequestPasswordReset(): string {
    return `Enviando correo...`;
  }

  get progressBarDelete(): string {
    return `Eliminando...`;
  }

  get messagesDelete(): Message[] {
    return [{
      severity: 'success', summary: 'Success', detail: 'Message Content'
    }];
  }


  get messageSuccessDelete(): string {
    return `Se eliminó correctamente`;
  }
}
