<template xmlns="http://www.w3.org/1999/html">
  <div>
  <nav class="navbar navbar-light bg-light">
    <a href="/" class="navbar-brand">Inicio</a>
  </nav>
    <div class="container">
      <div class="col-md-5">
      </div>
      <div class="col-md-7">
        <table class="table table-bordered">
          <thead>
           <tr>
             <th>Tarea</th>
             <th>Descripción</th>
           </tr>
          </thead>
          <tbody>
           <tr v-for="tarea of tareas" >
             <td>{{ tarea.titulo }}</td>
             <td>{{ tarea.descripcion }}</td>
             <td>
               <button @click="bajaTarea(tarea._id)" class="btn btn-danger">Eliminar</button>&nbsp;
               <button @click="editaTarea(tarea._id)" class="btn btn-secondary">Editar</button>
             </td>
           </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="container">
      <div class="row pt-5">
        <div class="col-mod-5">
          <div class="card">
            <div class="card-body">
              <form @submit.prevent="altaTarea">
                <div class="form-group">
                  <input type="text" v-model="tarea.titulo" placeholder="Nueva Tarea"
                  class="form-control">
                </div>
                <br>
                <div class="form-group">
                  <textarea v-model="tarea.descripcion" cols="30" rows="10"
                         class="form-control" placeholder="Descripción Tarea"></textarea>
                </div>
                <br>
                <template v-if="editar === false">
                  <button class="btn btn-primary btn-block">Guardar</button>
                </template>
                <template v-else>
                  <button class="btn btn-primary btn-success">Actualizar</button>&nbsp;
                  <button @click="listTareas()" class="btn btn-primary btn-warning">Cancelar</button>
                </template>
              </form>
            </div>
           </div>
          </div>
      </div>
    </div>
  </div>
</template>

<!--zona de scripts-->
<script>
//creamos un clase Tarea
  class Tarea{
    constructor(titulo, descripcion) {
      this.titulo = titulo;
      this.descripcion = descripcion;
        }
    }
  export  default {
    data(){
      return{
        tarea: new Tarea(),//instacionamos una tarea cada vez que lo necesitemos
        tareas: [], //almacena las tareas al recargar
        editar: false,  //variable que cambia la vista de formulario a editar
        tareaEditarid: '' //almacena el id del registro a editar
      }
      },
    created() {
      this.listTareas();   //se carga al iniciar la aplicación
    },
    methods: {
      listTareas() {
        fetch('api/tareas')
            .then(res => res.json())   //formato respuesta
            .then(data => {
              this.tareas = data;
              console.log(this.tareas)
            });
      },
      bajaTarea(id) {
        fetch('/api/tareas/' + id, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
          }
        })
            .then(res => res.json())
            .then(data => {
              this.listTareas();
            });
      },
      editaTarea(id) {
        fetch('/api/tareas/' + id)
            .then(res => res.json())
            .then(data => {
              this.tarea = new Tarea(data.titulo, data.descripcion);
              this.editar = true;
              this.tareaEditarid = data._id;
            });
      },
      altaTarea() {//método que conecta con submit
        if (this.editar === false) {
          fetch('/api/tareas', {
            method: 'POST',
            body: JSON.stringify(this.tarea),
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          })
              .then(res => res.json())
              .then(data => {  //para ver los datos
                this.listTareas();  //refresca el formulario
              })
        } else {
          fetch('/api/tareas/' + this.tareaEditarid, {
            method: 'PUT',
            body: JSON.stringify(this.tarea),  //los datos de la tarea a Editar
            headers: {
              'Accept': 'application/json',
              'Content-type': 'application/json'
            }
          })
              .then(res => res.json())
              .then(data => {
                this.listTareas(); //refresca el listado
                this.editar = false; // para volver al estado inicial
              });
        }
        this.tarea = new Tarea();
        }
      }
    }
</script>