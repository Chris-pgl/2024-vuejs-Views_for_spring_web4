<template>
  <div class="container">
    <h1>Farmers:</h1>
    <div class="button_div">
      <!-- chiamata all'api per aggiunta di farmer-->
      <a href="">Aggiungi Farmer🤠</a> <!-- tolta la chiamata a -->
      <button @click="addFarmer" class="farmer_button">Add Farmers</button>
    </div>
    
    
    <ul class="farmers_list">
      <li v-for="farmer in farmers" :key="farmer.id" class="farmer-item">
        {{ farmer.name }}
        {{ farmer.surname }}
        {{ farmer.age }}
      </li>
    </ul>

    <a href="http://localhost:5173">Back to Home</a>
</div>
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



<style>


.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button_div {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}


.farmer_button{
  padding: 10px 20px; /* Dimensioni fisse per il bottone */
  font-size: 16px;    /* Dimensione del testo fissa */
  background-color: #28a745; /* Colore di sfondo */
  color: white; /* Colore del testo */
  border: none; /* Rimuove i bordi */
  border-radius: 5px; /* Aggiunge bordi arrotondati */
  cursor: pointer; /* Cambia il cursore quando si passa sopra */
  flex-shrink: 0; /* Impedisce al bottone di ridimensionarsi */
}

.farmer_button:hover {
  background-color: #2e7d32;
}

.farmers_list {
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 600px;
}

.farmer-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
}

</style>
