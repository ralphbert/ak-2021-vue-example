<template>
  <div>
    <h2>Todos</h2>
    <button :disabled="loading" class="btn btn-primary" @click="load">Load</button>

    <ul class="list-group">
      <li class="list-group-item" v-for="todo in todos" :key="todo.id">
        {{ todo.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Todos",
  data() {
    return {
      todos: [],
      loading: false,
      error: null,
    }
  },
  methods: {
    load() {
      this.loading = true;
      this.error = null;

      axios.get('https://jsonplaceholder.typicode.com/todos').then(response => {
        console.log('response', response);
        this.todos = response.data;
        this.loading = false;
      }, error => {
        this.loading = false;
        this.todos = [];
        this.error = error;
      })
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style scoped>

</style>
