import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {

  tareas: Tarea[] = new Array();  //variable que almacena todas las tareas en la lista.
  tareasCheck: Tarea[] = [];      //variable que almacena todas las tareas que estan en estado de check.

  id = new FormControl('');
  titulo = new FormControl('');
  minutos = new FormControl('');
  selectAll = false;              //variable que almacena el valor de seleccion para todas las demas checkbox.

	constructor(
        public service: AppService,
	) { }

	ngOnInit() {
    this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();    //se obtienen los datos por defecto.
  }

  deleteRow(id: number){ //elimina la fila
    if(confirm("Esta seguro de eliminar la tarea con el Id: " + id)) {
      for(let i = 0; i < this.tareas.length; ++i){
        if (this.tareas[i].id === id) {
          this.tareas.splice(i, 1);
        }
      }
    }
  }

  addRow(){//agrega la nueva fila despues de ser verificada.
    if (this.verifyForm()){
      this.tareas.push(new Tarea(+this.id.value, this.titulo.value, +this.minutos.value, false, false));
      this.clearForm();
    }
  }

  verifyForm(): boolean{ //Verifica que los datos de la nueva tarea esten correctos.
    if (this.id.value == ''){
      alert(`Porfavor rellene la casilla: "Id" para agregar una nueva tarea.`);
    } else if (this.idDuplicates()){
      alert(`Porfavor cambie la casilla: "Id", el identificador ingresado ya esta en uso.`);
    } else if (this.titulo.value == ''){
      alert(`Porfavor rellene la casilla: "Titulo" para agregar una nueva tarea.`);
    } else if (this.minutos.value == ''){
      alert(`Porfavor rellene la casilla: "Minutos" para agregar una nueva tarea.`);
    } else if (!this.isNumber(this.id.value)){
      alert(`Porfavor modifique la casilla: "Id", esta debe ser un numero entero.`);
      this.id.setValue('');
    } else if (!this.isNumber(this.minutos.value)){
      alert(`Porfavor modifique la casilla: "Minutos", esta debe ser un numero entero.`);
      this.minutos.setValue('');
    } else {
      return true;
    }
    return false;
  }

  idDuplicates(){//recorre la lista de tareas y verifica que no se dupliquen identificadores.
    for (var i = 0; i < this.tareas.length; i++) {
      if(this.tareas[i].id == (+this.id.value)){
        return true;
      }
    }
    return false;
  }

  clearForm(){ //limpia el form de una nueva tareas.
    this.id.setValue('');
    this.titulo.setValue('');
    this.minutos.setValue('');
  }

  bubbleSort(){//ordenamiento burbuja para cada
    let n = this.tareas.length;
    for (let i = 0; i < n-1; i++) {
      for (let j = 0; j < n-i-1; j++) {
        if (this.tareas[j].minutos > this.tareas[j+1].minutos) {
          let temp = this.tareas[j];
          this.tareas[j] = this.tareas[j+1];
          this.tareas[j+1] = temp;
        }
      }
    }
  }

  isNumber(value: any): boolean{
   return ((value != null) && (value !== '') && !isNaN(Number(value.toString())));
  }

  selectUnselectAll() {//se cambia el valor de check de cada tareas al valor de la variable selectAll
    for (var i = 0; i < this.tareas.length; i++) {
      this.tareas[i].check = this.selectAll;
    }
    this.updateCheckList();
  }

  isAllSelected() { //se interan todas las tareas para asi poder verificar si todas estan seleccionadas y cambiar el valor d ela variable selectAll.
    this.selectAll = this.tareas.every(function(item:any) {
      return item.isSelected == true;
    })
    this.updateCheckList();
  }

  updateCheckList(){ //se de una nueva instancia a la variable tareaCheck y se llena con todas las tareas seleccionadas.
    this.tareasCheck = [];
    for (var i = 0; i < this.tareas.length; i++) {
      if(this.tareas[i].check)
      this.tareasCheck.push(this.tareas[i]);
    }
  }

  changeImportantValue(){ //se cambia el valor de la variable importante por su negacion y se cambia el valor de su checkbox
    for (let i = 0; i < this.tareasCheck.length; i++) {
      this.tareasCheck[i].importante = !this.tareasCheck[i].importante;
      this.tareasCheck[i].check = false;
    }
    this.tareasCheck = [];
    this.selectAll = false;
  }

}

