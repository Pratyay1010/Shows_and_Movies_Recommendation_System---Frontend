const shows_list = document.getElementById('shows-list')
const posterImg = document.getElementById('posterImg')
const toggleBtn = document.getElementById('toggleMenu')



toggleBtn.addEventListener("click", () => {

  sideMenu.classList.toggle('hidden');
  main.classList.toggle('hidden');

});


function recommended_list(){
    
    var selectedName = localStorage.getItem('selectedName');

    fetch('https://shows-and-movies-recommendation-system.onrender.com/recommend-amazon-prime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ variable: selectedName })
      })
      .then(response => response.json())
      .then(data => {

        var poster = data.variable1;
        var showList = data.variable2;

        showNames(poster, showList);
      });
      
}

recommended_list();

function showNames(poster, showList){

  var img = `<img src="${poster}" alt="" class="w-3/5 md:w-1/5">`;
  posterImg.insertAdjacentHTML("beforeend", img);

  for (var item in showList) {
    if (showList.hasOwnProperty(item)) {
      var url = showList[item];
      
      let poster_div = `<div class="flex flex-col items-center">
      <img src="${url}" alt="" onerror="this.src='/Assets/Image_not_available.png'" class="w-5/6">
      <li class="px-3">${item}</li>
      </div>`;

      shows_list.insertAdjacentHTML("beforeend", poster_div);
    }
  }
}

