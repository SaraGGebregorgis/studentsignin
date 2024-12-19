import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mande } from 'mande'

const studentAPI = mande('api/students')

export const useStudentStore = defineStore('students', () => {

    const sortedStudents = ref( [] )

    const mostRecentStudent = ref( {} )

    const addNewStudentErrors = ref( [] )

    function getAllStudents() {
         //make an api request to get all students and save in store -studentlif
        return studentAPI.get().then( students => {
            sortedStudents.value = students
        })
    }

    function addNewStudent(student) {
        //make API call to add new student
        //call getAllStudent to re-quest list of students from Api server
        studentAPI.post(student).then( () => {
            getAllStudents()
        }).catch( err => {
            addNewStudentErrors.value = err.body
        })
    }

    function deleteStudent(studentToDelete) {
        const deleteStudentAPI = mande(`/api/students/${studentToDelete.id}`)
        deleteStudentAPI.delete().then( () => {
            mostRecentStudent.value = {} 
            getAllStudents()
        })
        
    }


    function arrivedOrLeft(student) {
    //TODO make api request
        const editStudentAPI = mande(`/api/students/${student.id}`)
        editStudentAPI.patch(student).then( () => {
            mostRecentStudent.value = student
            getAllStudents()
        })
    }

    //const sortedStudents = computed( () => {
    //    return studentList.value.toSorted( (s1, s2) => {
    //        return s1.name.localeCompare(s2.name)
    //   })
    //})

    const studentCount = computed( () => {
        return sortedStudents.value.length
    })

    return { 
        // reactive data
        //studentList, 
        sortedStudents,
        mostRecentStudent, 
       addNewStudentErrors,

        // functions
        addNewStudent, 
        deleteStudent, 
        arrivedOrLeft, 
        getAllStudents,

        // computed properties
        studentCount
    }

})