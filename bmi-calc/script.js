const form = document.querySelector( 'form' );

form.addEventListener('submit', function ( e ) {

    e.preventDefault();

const height = parseInt(document.querySelector( '#height' ).value);
const weight = parseInt(document.querySelector('#weight').value);
const result = document.querySelector('#result');

if(height<= 0 || weight<= 0){
    alert("Please enter a valid number for height and weight");
}
else{ const bmi = (weight / ((height * height) / 10000)).toFixed(2);

    result.innerHTML = `<div> Your BMI Value is ${bmi} <\div>`

}
})