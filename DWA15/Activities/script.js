ReactDOM.createRoot(document.querySelector("#root")).render(<ul>
    <li>Meat</li>
    <li>Cabbage</li>
    <li>Potatoes</li>
    <li>Tomatoes</li>
</ul>  )


function MainContent() {
    return (
        
           <div>
             <h1>Nelson Malgas</h1>
            <h2>Software Engineering Student</h2>
            <p>Nice to meet you</p>
           </div>
           
    )
}

ReactDOM.createRoot(document.getElementById("root2")).render( 
<div>
   <MainContent/>
</div>  )


const h1 = document.createElement('h1')
h1.textContent = 'My Name is Zongezile'   //Imperative coding
document.querySelector("#vanilla").append(h1)

const navBar = (
    <nav>
        <h1>Nelson Malgas' Website</h1>
        <ul>
            <li>Pricing</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
       <a href="#Pricing">Pricing</a>
       <a href="#About">About</a>
       <a href="#Contact">Contact</a>
    </nav>
)

ReactDOM.createRoot(document.querySelector("#nav")).render(navBar)


const items = ['Apple', 'Banana', 'Orange'];

const List = () => (
  <ul>
    {items.map((item) => (
      <li key={item}>{item}</li>  // Declarative coding
    ))}
  </ul>
);

ReactDOM.render(<List/> , document.querySelector("#list"))


function TemporaryName (){
    return (
       <>
        <h1>CodeSpace React Course</h1>
        <p>It is nice indeed to learn React</p>
       </>
    )
}

ReactDOM.render(<TemporaryName/>, document.querySelector("#temporary"))

