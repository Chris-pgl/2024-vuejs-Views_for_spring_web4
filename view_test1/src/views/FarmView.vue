<template>
  <h1>Farms:</h1>
  <!--Agiungo un bottone per fare un get add e un update alla pagina-->
  <button @click="addFarm">Add Farm</button>

  <ul>
    <li v-for="farm in farms" :key="farm.id">
      {{ farm.name }}
      {{ farm.city }}
    </li>
  </ul>

  <a href="http://localhost:5173">Back to Home 🥀</a>
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
