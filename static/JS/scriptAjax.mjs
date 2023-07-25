/**
 * Challenge: Add a new element
 * - In JavaScript, create a new element to hold a navigation menu
 * - Add an unordered list and a series of no less than five links to the list
 * - Use single words like “home”, “about”, etc for the list items and set the src attribute to # for simplicity
 * - Add the new navigation element to the DOM directly after the header
 * - Write basic CSS and add classes as necessary to create a horizontal layout for the menu.
 * - A tip: Use either display flex or display grid to create the horizontal menu.
 */

import Backpack from "./Backpack.mjs"


const everydayPack = new Backpack(
  "Everyday Backpack",
  30,
  "grey",
  15,
  26,
  26,
  false,
  "December 5, 2018 15:00:00 PST",

  /* 
  1) "{{ image_url }} "  
          passing jinga variable cannot work! The have already been rendered
  
  2)
   "/static/images/everyday.svg" 
      Thiw works and it is the best solution. However I tried to use a bit of AJAX Code

  3). fetch() 
    We need to use AJAX to get the address from the server
    However the variable content it is rendered before the fetch functio nis called!
    so I had to move all the code inside the fetch
  
  */
  "/" //To be replaced by the fetch call

)

//We use AJAX to request the url to the server
      
fetch('/get_image_url')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {

    everydayPack.image = data.image_url;
    console.log('Image URL successfully fetched:', data.image_url);
    const content = `
  
    <figure class="backpack__image">
      <img src=${everydayPack.image} alt="" />
    </figure>
    <h1 class="backpack__name">Everyday Backpack</h1>
    <ul class="backpack__features">
      <li class="packprop backpack__volume">Volume:<span> ${
        everydayPack.volume
      }l</span></li>
      <li class="packprop backpack__color">Color:<span> ${
        everydayPack.color
      }</span></li>
      <li class="backpack__age">Age:<span> ${everydayPack.backpackAge()} days old</span></li>
      <li class="packprop backpack__pockets">Number of pockets:<span> ${
        everydayPack.pocketNum
      }</span></li>
      <li class="packprop backpack__strap">Left strap length:<span> ${
        everydayPack.strapLength.left
      } inches</span></li>
      <li class="packprop backpack__strap">Right strap length:<span> ${
        everydayPack.strapLength.right
      } inches</span></li>
      <li class="packprop backpack__lid">Lid status:<span> ${
        everydayPack.lidOpen
      }</span></li>
    </ul>
    `
    const main = document.querySelector(".maincontent")
    const newArticle = document.createElement("article")
    newArticle.classList.add("backpack")
    newArticle.setAttribute("id", "everyday")
    newArticle.innerHTML = content
    main.append(newArticle)
    
  })
  .catch(error => {
    console.error('Error fetching image URL:', error);
  });


//Everthing that goes between <nav id="menu"> ... </nav>
const navMenuContentList = `

        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact Us</a></li>
        <li><a href="#">Blog</a></li>

`
// We first create a new element, set the id, and Inner Content
const navMenu = document.createElement("nav")
navMenu.setAttribute("id", "main-nav=id")
navMenu.classList.add("main-nav")
const navList = document.createElement("ul")
navList.innerHTML = navMenuContentList
navMenu.append(navList)
console.log(navMenu)

const header = document.querySelector("header")
header.append(navMenu)
console.log(header)

