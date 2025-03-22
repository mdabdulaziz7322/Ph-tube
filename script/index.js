
function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}


function loadCategory() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories))
}

function displayCategory(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (let cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
    <button id= "${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white ">${cat.category}</button>
    `;
    categoryContainer.appendChild(categoryDiv);

  }
}
loadCategory();

function loadVideos(searchText = "") {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active")
      displayVideos(data.videos)

    });
}

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`${id}`);
      clickedButton.classList.add("active");
      displayVideos(data.category)
    })

}

const loadVideoDetails = (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayVideoDetails(data.video))
}

const displayVideoDetails = (video) => {
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML=`
  <div class="card bg-base-100">
  <figure class="px-10 pt-10">
    <img
      src="${video.thumbnail}"
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.authors[0].profile_name}</p>
  </div>
</div>
  
  `
}


const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  const hero = document.getElementById("hero");
  hero.style.display = " none";
  if (videos.length == 0) {
    videoContainer.innerHTML = `
  <div class="col-span-full flex flex-col justify-center items-center gap-3 py-20">
            <img class="w-[130px]" src="assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!! Sorry, There is no content here</h2>
        </div>
  `
    return;
  }
  videos.forEach(video => {
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
                    ${video.authors[0].verified ? `<img class="w-5 h-5" src="assets/download.png" alt="">` : ""}
                    
                </div>
                <p class="text-sm text-gray-500 mt-1">${video.others.views} views</p>
                

              </div>
            </div>
            <button onclick=loadVideoDetails('${video.video_id}') class="btn btn-block">Details</button>
          </div>
    `;
    videoContainer.appendChild(videoCard);
  });
};

document.getElementById("search-input").addEventListener("keyup", (e) => {
const input = e.target.value;
loadVideos(input);
});

