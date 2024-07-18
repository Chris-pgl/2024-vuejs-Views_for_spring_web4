<template>
  <h1>Farmers:</h1>
  <button @click="addFarmer">Add Test Data</button>
  <ul>
    <li v-for="farmer in farmers" :key="farmer.id">
      {{ farmer.name }}
      {{ farmer.surname }}
      {{ farmer.age }}
    </li>
  </ul>

  <a href="http://localhost:5173">Back to Home</a>
</template>

<script setup>
//DIPENDENZE
import { onMounted, ref } from 'vue'
import axios from 'axios'

//VARIABILI
const farmers = ref([])

//EVENTI
const addFarmer = () => {
  axios.get('http://localhost:8080/farmer/add').then(updateData)
}
const updateData = () => {
  axios
    .get('http://localhost:8080/farmer/all')
    .then((response) => {
      farmers.value = response.data
    })
    .catch(() => {
      console.log('Errore nella richiesta')
    })
}
onMounted(updateData)
//mentre col metodo di sopra facciamo sia un get add che un aggiornamento
//-----------------------------------------------------------------------------------
//con il metodo sotto
//Facciamo una get al back_end all'endpoint che vogliamo
/*   
onMounted(() => {
  axios
    .get('http://localhost:8080/farmer/all')
    //Se va bene continua e mi torna una res
    .then((res) => {
      //console.log(res.data) <-- così torniamo il dato

      //Ma anche così possiamo tornare il dato e leggerli meglio con JSON.strinify()data, null, 2)
      console.log(JSON.stringify(res.data, null, 2))
      //questa è costum, a secondo il data e la struttura dati
      farmers.value = res.data
    })
    //se va male mi chiamo un errore
    // eslint-disable-next-line no-unused-vars
    .catch((error) => {
      console.log('error!!!!!!!!!')
    })
})
*/
</script>
