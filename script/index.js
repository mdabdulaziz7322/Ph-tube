function loadCategory(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res)=> res.json())
    .then((data)=>displayCategory(data.categories))
}
function displayCategory(categories){
const categoryContainer = document.getElementById("category-container");
for(let cat of categories){
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML= `
    <button class="btn btn-sm">${cat.category}</button>
    `;
    categoryContainer.appendChild(categoryDiv);

}
}
loadCategory();