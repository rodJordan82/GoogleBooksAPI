import { getBooks } from "./api.js";

let pageNumber = 0;
let searchMade = false;
let searchTerm = "";
let searchTotal = 0;




const pageForm = document.querySelector("#pageForm");

const createBookCard = (bookObj) => {


         return `
    <div class="card">
      <img src=${bookObj.volumeInfo.imageLinks ? bookObj.volumeInfo.imageLinks.smallThumbnail : "./imageNotFound.svg"} />
      <h2>${ bookObj.volumeInfo.title ? bookObj.volumeInfo.title : "Title Unavailable" }</h2>
      <p>${ bookObj.volumeInfo.authors ? bookObj.volumeInfo.authors.join(", ") : "Author Unavailable" }</p>
      <p class="desc">${bookObj.volumeInfo.description ? bookObj.volumeInfo.description : "Summary Unavailable"}</p>
  
    </div>
    `;
};






const previous = async () => {
if (searchMade === true && pageNumber > 0){

    const bookResponse = await getBooks(searchTerm, pageNumber - 1);

    console.log(bookResponse);
  
    const bookCards = bookResponse.items.map( book => createBookCard(book));

    const booksOutputElement = document.querySelector("#books");
    booksOutputElement.innerHTML = bookCards.join("");

    pageNumber--;
};

};

const next = async () => {
if (searchMade === true && pageNumber < Math.ceil(searchTotal/10)){

    const bookResponse = await getBooks(searchTerm, pageNumber + 1);

    console.log(bookResponse);
  
    const bookCards = bookResponse.items.map( book => createBookCard(book));

    const booksOutputElement = document.querySelector("#books");
    booksOutputElement.innerHTML = bookCards.join("");

    pageNumber++;
};

};

document.getElementById('next').addEventListener("click", next);



document.getElementById('previous').addEventListener("click", previous);



pageForm.addEventListener("submit", async (event) => {
   pageNumber = 0;
    event.preventDefault();
    searchMade = true;
    const formData = new FormData(event.target);

    
    console.log(event.target);
    searchTerm = formData.get("searchTerm");


    const bookResponse = await getBooks(searchTerm, pageNumber);
    console.log(bookResponse);
  
    const bookCards = bookResponse.items.map( book => createBookCard(book));

    const booksOutputElement = document.querySelector("#books");
    booksOutputElement.innerHTML = bookCards.join("");
    searchTotal = bookResponse.totalItems;
});

