// ! query
/* 
const grid = document.querySelector(".grid");
const studentItems = document.querySelectorAll(".student");
const students = document.getElementById("studenti");
let maxWidthOfStudent = 0;

window.addEventListener('resize', function(){

    findMaxWidthOfStudent();

    let widthOfAllStudents = students.clientWidth

    let numOfFractions = Math.trunc(((students.clientWidth)/ maxWidthOfStudent));

    console.log("velicina kontejnera = " +  widthOfAllStudents)
    console.log("broj frakcija = " +  numOfFractions)

    let maxAllowedWidthOdStudent = (widthOfAllStudents - 20*(studentItems.length-1))/numOfFractions;

   

grid.style.gridTemplateColumns = "repeat(" + numOfFractions + ",1fr)"
})

function findMaxWidthOfStudent(){
    maxWidthOfStudent=0;
    for(let i = 0; i < studentItems.length; i++){
        console.log(studentItems[i].clientWidth);
        if(studentItems[i].offsetWidth > maxWidthOfStudent){
             maxWidthOfStudent = studentItems[i].clientWidth 
        }   
    }
}

findMaxWidthOfStudent();

let numOfFractions = students.offsetWidth / maxWidthOfStudent;

console.log(students.offsetWidth)
console.log("broj frakcija = " +  numOfFractions)

*/
// ! variables



// ! eventlisteners



// ! functions