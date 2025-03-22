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
    <button onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white ">${cat.category}</button>
    `;
    categoryContainer.appendChild(categoryDiv);

}
}
loadCategory();

function loadVideos(){
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res)=> res.json())
    .then((data)=> displayVideos(data.videos));
}

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  console.log(url)
  fetch(url)
  .then((res)=> res.json())
  .then((data) => displayVideos(data.category))
  }
  

const displayVideos=(videos)=>{
const videoContainer = document.getElementById("video-container");
videoContainer.innerHTML = "";
videos.forEach(video=>{
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
<div class="card bg-base-100">
            <figure class="relative ">
              <img class= "w-full h-[200px] object-cover"
                src="${video.thumbnail}" />
                <span class="absolute bottom-2 right-2 text-white bg-black px-2 rounded text-sm shadow-sm">3hrs 56 min ago</span>
            </figure>
            <div class="flex gap-3 px-0 py-5">
              <div class="profile">
                <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                      <img src="${video.authors[0].profile_picture}" />
                    </div>
                  </div>
              </div>
              <div class="details">
                <h2 class="text-base font-bold">${video.title}</h2>
                <div class="flex gap-2">
                    <p class="text-sm text-gray-500 mt-1">${video.authors[0].profile_name}</p>
                    ${video.authors[0].verified? `<img class="w-5" src="assets/download.png" alt="">` : ""}
                    
                </div>
                <p class="text-sm text-gray-500 mt-1">${video.others.views} views</p>
                

              </div>
            </div>
          </div>
    `;
    videoContainer.appendChild(videoCard);
})
}
