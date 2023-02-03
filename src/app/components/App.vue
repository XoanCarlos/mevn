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
               <button @click="bajaTarea(tarea._id)" class="btn btn-danger">Eliminar</button>
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
                <div class="d-grid gap-2">
                <button class="btn btn-primary d-md-block">Guardar</button>
                </div>
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
        tareas: []  //almacena las tareas al recargar
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
      bajaTarea(id){
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
      altaTarea() {   //método que conecta con submit
        fetch('/api/tareas',{
          method: 'POST',
          body: JSON.stringify(this.tarea),
          headers: {
            'Accept':'application/json',
            'Content-type': 'application/json'
          }
        })
            .then(res => res.json())
            .then(data => console.log(data))  //para ver los datos
        this.tarea = new Tarea();  //refresca el formulario
      }
    }
  }
</script>