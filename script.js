const API_URL= "https://makeup-api.herokuapp.com/api/v1/products.json";
const searchBtn = document.getElementById('search-btn');
const makeUpList = document.getElementById('makeup');
const makeUpDetailsContent = document.querySelector('.makeUp-details-content');
const makeUpCloseBtn = document.getElementById('makeup-close-btn');

// event listeners
searchBtn.addEventListener('click', getMakeUpList);
makeUpList.addEventListener('click', getMakeUpDetails);
makeUpCloseBtn.addEventListener('click', () => {
makeUpDetailsContent.parentElement.classList.remove('showMakeUp');
   
});


function getMakeUpList(){
    let searchInputTxt = document.getElementById(`search-input`).value.trim();
    fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
      let html = "";
        if(data){
             
             data.forEach( makeUp =>  {
                 html += `
                    
                    <div class = "makeup-item" data-id = "${makeUp.id}">
                     
                            <div class = "makeup-img">
                             <img src = "${makeUp.image_link}" alt src="img.jfif"> 
                            </div>
                         
                          <div class = "makeup-name">
                             <h3>${makeUp.name}</h3>
                             <h4 class="price">${makeUp.price_sign}${makeUp.price}</h4>
                             <a href = "#" class = "kit-btn">product details</a>
                             </div>
                          
                    </div>
                `;
             });
        
            makeUpList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any produts!";
            makeUpList.classList.add('notFound');
        }

         makeUpList.innerHTML = html;
   });
}




function getMakeUpDetails(e){
    e.preventDefault();
    if(e.target.classList.contains('kit-btn')){
        let makeItem = e.target.parentElement.parentElement;
       
        fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?${makeItem.id}`)
        .then(response => response.json())
        .then(makeUp => makeUpModal(makeUp));
    }
}


// create a modal
function makeUpModal(makeUp){
    console.log(makeUp)
    makeUp=makeUp[0];
    
   
    let html = `
        <h2 class = "makeup-title">${makeUp.name}</h2>
        <p class = "makeup-category">${makeUp.brand}</p>
        <div class = "makeup-instruct">
            <h3>Instructions:</h3>
            <p>${makeUp.description}</p>
        </div>
        <div class = "makeup-kit-img">
            <img src = "${makeUp.image_link}" alt = "">
        </div>
        <div class = "makeup-link">
            <a href = "${makeUp.product_link}" target = "_blank">product_link</a>
        </div>
    `;
    makeUpDetailsContent.innerHTML = html;
    makeUpDetailsContent.parentElement.classList.add('showMakeUp');
}

