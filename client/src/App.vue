<script setup>

import { onMounted } from 'vue'


import NewStudentForm from './components/NewStudentForm.vue'
import StudentTable from './components/StudentTable.vue'
import StudentMessage from './components/StudentMessage.vue'

import { useStudentStore } from './stores/StudentStore'

const studentStore = useStudentStore() 


// It is used here to trigger the getAllStudents method from your studentStore as soon as the component is rendered
onMounted( () => {
  //whatever is in here will run when the component is first displayed
  studentStore.getAllStudents() 
//callling the getallstudent method of the studentsotre 
//will fetch the lsit of all student to display the student data

})

</script>

<template>

  <h1>Student Sign In Application</h1>
  
  <NewStudentForm></NewStudentForm>
  <StudentTable></StudentTable>
  <StudentMessage></StudentMessage>
  
</template>

<style scoped>

h1 {
  text-align: center;
}
</style>