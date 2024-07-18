<template>
   <div class="container">
      <h1>Farms:</h1>
      <div class="controls">
        <!--Agiungo un bottone per fare un get add e un update alla pagina-->
        <a href="">Aggiungi Farm🌿</a>   <!-- tolta la chiamata a http://localhost:8080/farm/add-->
        <button @click="addFarm" class="farm_button">Add Farm</button>
      </div>

      <ul class="farm-list" >
        <li v-for="farm in farms" :key="farm.id" class="farm-item">
          {{ farm.name }}
          {{ farm.city }}
        </li>
      </ul>

      

      <a href="http://localhost:5173">Back to Home 🥀</a>
    </div>
</template>

<script setup>
//DIPENDENZE
import { onMounted, ref } from 'vue'
import axios from 'axios'

//VARIABILI
const farms = ref([])

const addFarm = () => {
  axios.get('http://localhost:8080/farm/add').then(updateData)
}
const updateData = () => {
  axios
    .get('http://localhost:8080/farm/all')
    .then((response) => {
      farms.value = response.data
    })
    .catch(() => {
      console.log('Error')
    })
}
onMounted(updateData)

/* Questa era una chiamata sola alla het all- Sopra abbiamo un add e get all 
onMounted(() => {
  axios
    .get('http://localhost:8080/farm/all')
    .then((res) => {
      console.log(JSON.stringify(res.data, null, 2))

      farms.value = res.data
    })

    // eslint-disable-next-line no-unused-vars
    .catch((error) => {
      console.log('error!!!!!!!!!')
    })
})
*/
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.farm_button {
  padding: 10px 20px; /* Dimensioni fisse per il bottone */
  font-size: 16px;    /* Dimensione del testo fissa */
  background-color: #28a745; /* Colore di sfondo */
  color: white; /* Colore del testo */
  border: none; /* Rimuove i bordi */
  border-radius: 5px; /* Aggiunge bordi arrotondati */
  cursor: pointer; /* Cambia il cursore quando si passa sopra */
  flex-shrink: 0; /* Impedisce al bottone di ridimensionarsi */
}

.farm_button:hover {
  background-color: #218838; /* Cambia il colore di sfondo al passaggio del mouse */
}

.farm-list {
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
}

.farm-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}
</style>
