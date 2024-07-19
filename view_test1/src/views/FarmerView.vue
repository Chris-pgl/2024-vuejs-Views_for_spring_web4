<template>
  <div v-if="!newFarmerShow && !updateFarmerShow" class="container">
    <h1>Farmers:</h1>  
    <button @click="addFarmer" class="farmer_button">/Add Farmers🤠</button>
    <button @click="toggleNewFarmerShow">Add new Farmer🤠</button>
     <ul class="farmers_list">
      <li v-for="farmer in farmers" :key="farmer.id" class="farmer-item">
        <div v-if="farmer && farmer.farm">
          {{ farmer.name }}
          {{ farmer.surname }}
          {{ farmer.age }}
          <br />
          {{ farmer.farm.name }} ({{ farmer.farm.city }})
          <br />
          <button @click="editFarmer(farmer.id)">Edit</button>
          <button @click="deleteFarmer(farmer.id)">Delete</button>
        </div>
        <div v-else>
          <p>Farmer data is incomplete.</p>
        </div>
      </li>
    </ul>
  </div>

  <RouterLink to="/"> Back to Home 💫 </RouterLink>

  <div v-if="newFarmerShow">
    <h1>New Farmer</h1>
    <label>Name</label>
    <br />
    <input type="text" v-model="newFarmerData.name" />
    <br />    
    <label>Surname</label>
    <br />
    <input type="text" v-model="newFarmerData.surname" />
    <br />
    <label>Age</label>
    <br />
    <input type="number" v-model="newFarmerData.age" />
    <br />
    <label>Farm</label>
    <br />
    <select v-model="newFarmerData.farmId">
      <option v-for="farm in farms" :key="farm.id" :value="farm.id">
        {{ farm.name }} ({{ farm.city }})
      </option>
    </select>
    <br />
    <button @click="toggleNewFarmerShow">CANCEL</button>
    <button @click="saveNewFarmer">SAVE</button>
  </div>

  <div v-if="updateFarmerShow">
    <h1>Update Farmer</h1>
    <label>Name</label>
    <br />
    <input type="text" v-model="updateFarmerData.name" />
    <br />
    <label>Surname</label>
    <br />
    <input type="text" v-model="updateFarmerData.surname" />
    <br />
    <label>Age</label>
    <br />
    <input type="number" v-model="updateFarmerData.age" />
    <br />
    <label>Farm</label>
    <br />
    <select v-model="updateFarmerData.farmId">
      <option v-for="farm in farms" :key="farm.id" :value="farm.id">
        {{ farm.name }} ({{ farm.city }})
      </option>
    </select>
    <br />
    <button @click="toggleUpdateFarmerShow">CANCEL</button>
    <button @click="updateFarmer">SAVE</button>
  </div>
</template>

<script setup>
//DIPENDENZE
import { onMounted, ref } from 'vue'
import axios from 'axios'

// VARIABILI
const newFarmerShow = ref(false)
const updateFarmerShow = ref(false)
const farms = ref([])
const farmers = ref([])

const newFarmerData = ref({
  name: '',
  surname: '',
  age: 0,
  farmId: 0
})

const updateFarmerData = ref({})

// EVENTI
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
  axios.get("http://localhost:8080/farm/all").then((res) => {
    farms.value = res.data
  })
}

// FUNCTIONS
const toggleNewFarmerShow = () => {
  newFarmerShow.value = !newFarmerShow.value
}

const toggleUpdateFarmerShow = () => {
  updateFarmerShow.value = !updateFarmerShow.value
}

const saveNewFarmer = () => {
  if (!newFarmerData.value.farmId) {
    console.log("Please select a farm for the new farmer.")
    return
  }

  console.log(JSON.stringify(newFarmerData.value, null, 2))

  axios
    .post('http://localhost:8080/farmer/create', newFarmerData.value)
    .then((res) => {
      const savedFarmer = res.data

      farmers.value.push(savedFarmer)

      newFarmerData.value = {
        name: '',
        surname: '',
        age: 0,
        farmId: 0
      }

      toggleNewFarmerShow()
    })
    .catch((err) => {
      console.log('Error: ' + err)
    })
}

const editFarmer = (id) => {
  for (let x = 0; x < farmers.value.length; x++) {
    const farmer = farmers.value[x]

    if (farmer.id === id) {
      updateFarmerData.value = farmer
      console.log('updateFarmerData: ' + JSON.stringify(updateFarmerData.value, null, 2))

      updateFarmerData.value.farmId = farmer.farm.id
      break
    }
  }

  console.log('updateFarmerData: ' + JSON.stringify(updateFarmerData.value, null, 2))

  updateFarmerShow.value = true
}

const updateFarmer = () => {
  const axiosData = {
    name: updateFarmerData.value.name,
    surname: updateFarmerData.value.surname,
    age: updateFarmerData.value.age,
    farmId: updateFarmerData.value.farmId
  }

  axios
    .patch('http://localhost:8080/farmer/update/' + updateFarmerData.value.id, axiosData)
    .then(() => {
      updateData()
      updateFarmerShow.value = false
    })
    .catch((err) => {
      console.log('Error: ' + err)
    })
}

const deleteFarmer = (id) => {
  axios
    .delete('http://localhost:8080/farmer/delete/' + id)
    .then(() => {
      farmers.value = farmers.value.filter((farmer) => farmer.id !== id)
    })
    .catch((err) => {
      console.log('Error: ' + err)
    })
}

onMounted(updateData)
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
