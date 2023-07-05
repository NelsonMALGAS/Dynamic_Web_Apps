
/*
Challenge 1:
Given an array of numbers, return an array of each number, squared
*/
const nums = [1, 2, 3, 4, 5]
const squaredNumbers = nums.map(num => num ** 2 )
console.log(squaredNumbers)

/*
Challenge 2:
Given an array of strings, return an array where 
the first letter of each string is capitalized
*/

const names = ["alice", "bob", "charlie", "danielle"]

const capitalizedNames = names.map(name => name[0].toUpperCase() + name.slice(1));
console.log(capitalizedNames )

/*
Challenge 3:
Given an array of strings, return an array of strings that wraps each
of the original strings in an HTML-like <p></p> tag.

E.g. given: ["Bulbasaur", "Charmander", "Squirtle"]
return: ["<p>Bulbasaur</p>", "<p>Charmander</p>", "<p>Squirtle</p>"]
*/

const pokemon = ["Bulbasaur", "Charmander", "Squirtle"]

const pokeChar = pokemon.map((pok)=>{
    console.log(`<p>${pok}</p>`)
})

/*
Challenge: complete the function below
Given a name, return "Good <timeOfDay>, <name>!" depending
on the current time of day.

4 am - 11:59 am, timeOfDay = "morning"
12 pm - 4:59 pm: timeOfDay = "afternoon"
5 pm - 7:59 pm: timeOfDay = "evening"
8 pm - 3:59 am: timeOfDay = "night"

E.g. if it's currently 1 pm, greeting("Jane") ==> "Good afternoon, Jane!"
*/

function greeting(name) {
    const hours = (new Date().getHours() )
    let timeOfDay;
    if(hours > 4 && hours < 12){
         timeOfDay = "Morning"
    }else if(hours > 13 && hours <= 17 ){
        timeOfDay = "Afternoon"
    }else if(hours > 17 && hours <=20){
        timeOfDay = "Evening"
    }else{
        timeOfDay = "Night"
    }
    
    return `Good ${timeOfDay} ${name}`

}

console.log(greeting("Bob"))
