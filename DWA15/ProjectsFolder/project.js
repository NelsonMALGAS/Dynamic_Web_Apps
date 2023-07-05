

/*
Challenge: Starting from scratch, build and render the 
HTML for our section project. Check the Google slide for 
what you're trying to build.

We'll be adding styling to it later.

Hints:
* The React logo is a file in the project tree, so you can
  access it by using `src="./react-logo.png" in your image
  element
* You can also set the `width` attribute of the image element
  just like in HTML. In the slide, I have it set to 40px
 */


  const ReactPage = (
    <div>
     <img src = "./react-logo.png" width = "70px"/>
     <h1>Fun facts about React </h1>
     <ul>
     <li>Was first released in 2013</li>
     <li>Was origionally created by Jordan Walke</li>
     <li>Has well over 100K stars on GitHub</li>
     <li>Is maintained by Facebook</li>
     <li>Powers thousands of enterprise apps,including mobile apps</li>
     </ul>
     <h5>----------------------------------------------------------------------</h5>
    </div>
)

console.log(ReactPage)

// ReactDOM.render(ReactPage, document.querySelector("#root"))
ReactDOM.createRoot(document.querySelector("#root")).render(ReactPage )


/**
Challenge: 

Part 1: Create a page of your own using a custom Page component

It should return an ordered list with the reasons why you're
excited to be learning React :)

Render your list to the page

 */


/**
Challenge: 

Part 2: 
- Add a `header` element with a nested `nav` element. Inside the `nav`,
  include a `img` element with the image of the React logo inside
  (src="./react-logo.png") and make sure to set the width to something
  more manageable so it doesn't take up the whole screen
- Add an `h1` with some text describing the page. (E.g. "Reasons
  I'm excited to learn React"). Place it above the ordered list.
- Add a `footer` after the list that says: 
    "© 20xx <last name here> development. All rights reserved."

 */

function NelsonComponent(){
  return (
    <>
    <header>
      <nav>
       <img src ="./react-logo.png" width ="70px"/>
    </nav>
    </header>
    <h1>Reasons why I'm excited to be learning React</h1>
    <ol>
      <li>Reason 1</li>
      <li>Reason 2</li>
      <li>Reason 3</li>
      <li>Reason 4</li>
    </ol>
    <footer>
      <h5>© 20xx Nelson Malgas development. All rights reserved.</h5>
    </footer>
    <h5>----------------------------------------------------------------------</h5>
    </>
  )
}

ReactDOM.createRoot( document.querySelector("#challenge")).render(<NelsonComponent/>)

/**
Mini Challenge:
Move the `header` element from Page into 
its own component called "Header"
*/


/* 
Challenge: Place the gray react logo in the background

Don't use an `img` element, but rather set it as the
`background-image` of the `main` element.

Hint: you'll need to use the following properties:
- background-image
- background-repeat
- background-position

(Or the shorthand `background` property with values for all
those other properties)
*/

function Header(){
  return (
    <>
     <header>
      <nav>
       <img src ="./react-logo.png" width ="70px"/>
      </nav>
     </header>
    </>
  )
}

function NelsonMiniChallenge(){
  return (
    <>
    <Header/>
    <h1>Reasons why I'm excited to be learning React</h1>
    <ol>
      <li>Reason 1</li>
      <li>Reason 2</li>
      <li>Reason 3</li>
      <li>Reason 4</li>
    </ol>
    <footer>
      <h5>© 20xx Nelson Malgas development. All rights reserved.</h5>
    </footer>
    <h5>----------------------------------------------------------------------</h5>
    </>
  )
}

ReactDOM.createRoot(document.querySelector("#mini-challenge")).render(<NelsonMiniChallenge/> )


/**
Challenge: 

- Move the `footer` into its own component called "Footer" 
  and render that component inside the Page component.
- Move the `h1` and `ol` together into another component
  called "MainContent" and render inside Page as well.
*/

function MainHeader(){
  return (
    <>
     <header className ="header">
      <nav>
       <img src ="./react-logo.png"/>
       <ul className="li">
      <li>Pricing</li>
      <li>About</li>
      <li>Contact</li>
       </ul>
      </nav>
     </header>
    </>
  )
}


function Content(){
  return (
    <>
    <h1 className="h1">Reasons why I'm excited to be learning React</h1>
    <ol>
      <li>Reason 1</li>
      <li>Reason 2</li>
      <li>Reason 3</li>
      <li>Reason 4</li>
    </ol>
    </>
  )
}

function Footer(){
  return (
    <footer>
      <a href="#">Facebook</a>
      <a href="#">Twitter</a>
      <a href="#">LinkedIn</a>
    <h5>© 20xx Nelson Malgas development. All rights reserved.</h5>
  </footer>
  )
}

function Underliner(){
  return (
    <h5>---------------------------------------------------------------------------------------------------------------------------------------</h5>
  )
}

function MainContent(){
  return (
    <>
    <MainHeader className="logo"/>
    <Content/>
    <Footer/>
    <Underliner/>
    </>
  )
}

ReactDOM.createRoot(document.querySelector("#components")).render(<MainContent/> )


function App() {
  const firstName = "Joe"
  const lastName = "Schmoe"
  const age = 30
  const count =[
    "banana" , "Apple" ,"orange" ,"Tomatoe"
  ]

  const date = (new Date().getHours() % 12)
  
  /**
   * Challenge: finish off the h1 below so it says
   * "Hello Joe Schmoe!"
   */
  return (
      <>
      <h1>Hello {firstName} {lastName}!</h1>
      <p>How old are you sir?</p>
      <p>I am {age} years of age </p>
      {count.map((number ,index)=>(<p key={index}>{number}</p>))}
      <h4>It is currently {date} o'clock</h4>

      <Underliner/>
      </>
  )
}

ReactDOM.createRoot(document.getElementById("joe")).render(<App /> )

function CatCards() {
  return (
    <>
      <div className="contacts">
      
          <div className="contact-card">
              <img src="./mr-whiskerson.png"/>
              <h3>Mr. Whiskerson</h3>
              <div className="info-group">
                  <img src="./phone-icon.png" />
                  <p>(212) 555-1234</p>
              </div>
              <div className="info-group">
                  <img src="./mail-icon.png" />
                  <p>mr.whiskaz@catnap.meow</p>
              </div>
          </div>
          
          <div className="contact-card">
              <img src="./fluffykins.png"/>
              <h3>Fluffykins</h3>
              <div className="info-group">
                  <img src="./phone-icon.png" />
                  <p>(212) 555-2345</p>
              </div>
              <div className="info-group">
                  <img src="./mail-icon.png" />
                  <p>fluff@me.com</p>
              </div>
          </div>
          
          <div className="contact-card">
              <img src="./felix.png"/>
              <h3>Felix</h3>
              <div className="info-group">
                  <img src="./phone-icon.png" />
                  <p>(212) 555-4567</p>
              </div>
              <div className="info-group">
                  <img src="./mail-icon.png" />
                  <p>thecat@hotmail.com</p>
              </div>
          </div>
          
          <div className="contact-card">
              <img src="./pumpkin.png"/>
              <h3>Pumpkin</h3>
              <div className="info-group">
                  <img src="./phone-icon.png" />
                  <p>(0800) CAT KING</p>
              </div>
              <div className="info-group">
                  <img src="./mail-icon.png" />
                  <p>pumpkin@scrimba.com</p>
              </div>
          </div>
      </div>
      <Underliner/>
      </>
  )
}

ReactDOM.createRoot( document.getElementById("cats")).render(<CatCards />)




function DeclarativeCatsCard(props){
  

  return(
    <>
    
    <div className="contact-card">
                <img src={props.img}/>
                <h3>{props.name}</h3>
                <div className="info-group">
                    <img src="./phone-icon.png" />
                    <p>{props.phone}</p>
                </div>
                <div className="info-group">
                    <img src={props.email} />
                    <p>mr.whiskaz@catnap.meow</p>
                </div>
            </div>
    
    </>
    
  )

}

ReactDOM.createRoot(document.getElementById("declarative")).render(
    

    <div>
            <DeclarativeCatsCard
                img="./mr-whiskerson.png" 
                name="Mr. Whiskerson"
                phone="(212) 555-1234"
                email="mr.whiskaz@catnap.meow"
            />
            <DeclarativeCatsCard 
                img="./fluffykins.png"
                name="Fluffykins"
                phone="(212) 555-2345"
                email="fluff@me.com"
            />
            <DeclarativeCatsCard
                img="./felix.png"
                name="Felix"
                phone="(212) 555-4567"
                email="thecat@hotmail.com"
            />
            <DeclarativeCatsCard
                img="./pumpkin.png"
                name="Pumpkin"
                phone="(0800) CAT KING"
                email="pumpkin@scrimba.com"
            />

    </div>
    )

    const Jokes = {
        numberOne: {
          Setup: "I got my daughter a fridge for her birthday.",
          Punchline: "I can't wait to see her face light up when she opens it."
        },
        numberTwo: {
          Setup: "How did the hacker escape the police?",
          Punchline: "He just ransomware!"
        },
        numberThree: {
          Setup: "Why do bees stay in the hive in the winter?",
          Punchline: "Swarm."
        },
        numberFour: {
          Setup: "What's the best thing about Switzerland?",
          Punchline: "I don't know, but the flag is a big plus!"
        }
    };
    
    function CommonJokes() {
      const jokeArray = Object.values(Jokes);
    
      return (
        <>
          {jokeArray.map((joke, index) => (
            <div key={index}>
              <h4>{joke.Setup}</h4>
              <p>{joke.Punchline}</p>
            </div>
          ))}
          <Underliner/>
        </>
      );
    }

    
    ReactDOM.createRoot(document.querySelector("#jokes")).render(<CommonJokes/>)


    function Card(props) {
      return (
          <div className="card">
              <img src={props.img} className="card--image" />
              <div className="card--stats">
                  <img src="../images/star.png" className="card--star" />
                  <span>{props.rating}</span>
                  <span className="gray">(6) • </span>
                  <span className="gray">{props.country}</span>
              </div>
              <p>{props.title}</p>
              <p><span className="bold">{props.price}</span> {props.perPerson}</p>
          </div>
      )
  }

  function AppP() {
    // <Hero />
return (
<div>
    <Card
    img = "../katie-zaferes.png"
    rating = "(5.0)"
    country = "(USA)"
    title = "Life Lessons with Katie Zaferes"
    price ="From (136)"
    perPerson = "/person"
    
     />
</div>
)
}

ReactDOM.createRoot(document.querySelector("#props")).render(<AppP/>)

function ColorTheme (){
  const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Indigo", "Violet"]
    const singleColor = colors.map(col => <h3 key={col}>{col}</h3>)
    return (
        <div>
            {singleColor}
        </div>
    )
}

ReactDOM.createRoot(document.querySelector("#colors")).render(<ColorTheme/>)


/*
Challenge:

- import the array of data from data.js
- map over the array to create <Card /> components
- display the array of card components under the navbar
  (in place of the current <Card /> component)

Note: We haven't styled the group of components yet, so they'll
still be block elements, stacked vertically. We'll add styling later.
*/
  




