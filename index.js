var num =

  $(document).ready(function () {
    //this is just bcoz of firefox ....just looping video
    $("#vid").bind('ended', function () {
      this.play();
    });



    $("#gen").change(function () {
      $('#funz').html("");
      genrename = $(this).val()
      if (genrename == "") {

      }
      else {
        fetch(`https://rawg.io/api/games?genres=${genrename}&page_size=150&key=d74114e051a44b7da1ecf514805ae2c1`)
          .then(response => response.json())
          .then(data => {
            $(".hide").css("display", "none");
            for (let i of data.results) {
              if (i.rating >= 5) {
                continue;
              }
              const genredetails = `
        <div class="card hov genre-card" style="width: 18rem;border:none;">
        <img src="${i.background_image}" class="card-img-top poster" alt="notavailable.webp">
        <div class="card-body">
        <h5 class="card-title">${i.name}</h5>
        <p class="card-text">${i.genres[0].name}</p>
        <button style="border:none;"onclick='(function(){num=${i.id};})(); $.fn.det();' class="btn btn-primary">Show details</button>
        </div>
        </div>`
              $('.container').prepend(genredetails);
            }
            selectedgenre = `<h6 class="index-title">best ${genrename} games</h6>`
            $('#funz').prepend(selectedgenre);
            console.log(data.results);
          })
      }
    })











    $("#searchbtn").on("click", function () {
      if ($('#searchtext').val() == "") {

      }
      else {

        $(".hide").css("display", "none");
        const name = $('#searchtext').val()
        fetch(`https://rawg.io/api/games?search=${name}&key=d74114e051a44b7da1ecf514805ae2c1`)
          .then(response => response.json())
          .then(data => {
            let genreerror
            if ($(".container").html() == "") {
              for (let i of data.results) {
                console.log(i.genres.length)
                if (i.genres.length) {
                  genreerror = i.genres[0].name;
                }
                else {
                  genreerror = "Action"
                }
                const game = `
          <div class="card hov" style="width: 18rem;border:none;">
          <img src="${i.background_image}" class="card-img-top poster" alt="${i.name}">
          <div class="card-body">
          <h5 class="card-title">${i.name}</h5>
          <p class="card-text">${genreerror}</p>
          <button style="border:none;"onclick='(function(){num=${i.id};})(); $.fn.det();' class="btn btn-primary">Show details</button>
          </div>
          </div>`
                $('.container').prepend(game);
              }
            }
            else {
              let genreerror
              $(".container").html("")
              for (let i of data.results) {
                if (i.genres.length) {
                  genreerror = i.genres[0].name;
                }
                else {
                  genreerror = "Action"
                }
                const game = `
          <div class="card" style="width: 18rem;border:none;">
          <img src="${i.background_image}" class="card-img-top poster" alt="...">
          <div class="card-body">
          <h5 class="card-title">${i.name}</h5>
          <p class="card-text">${genreerror}</p>
          <button style="border:none;"onclick='(function(){num=${i.id};})(); $.fn.det();' class="btn btn-primary">Show details</button>
          </div>
          </div>`
                $('.container').prepend(game);
              }
            }
          })
      }
    })
  })



$.fn.det = function () {
  $(".hide").css("display", "none");
  $(".container").css("display", "flex");
  fetch(`https://rawg.io/api/games/${num}?key=d74114e051a44b7da1ecf514805ae2c1`)
    .then(response => response.json())
    .then(data => {
      let genreer
      if (data.genres.length) {
        genreer = data.genres[0].name;
      }
      else {
        genreer = "Action"
      }


      platform = ""
      for (let i of data.platforms) {
        platform = platform + `<li>${i.platform.name}</li>`
      }

      available = ""
      for (let i of data.stores) {
        available = available + `<li>${i.store.name}</li>`
      }
      let playtim
      if (data.playtime == 0) {
        playtim = "Less than an hour"
      }
      else {
        playtim = data.playtime + " hr"
      }

      if (data.name == "Cyberpunk") {
        source = "cyb.jpg";
      }
      else {
        source = data.background_image;
      }
      htm = `
      
       <div class="detail-container">
       <img src="${source}" alt="sowwy" id="poste">
       <h2 id="dname" class="plz">${data.name}</h2>
       <h4 id="dgenre">${genreer}</h4>
       <h4 class="titl">Description:</h4>
       <p id="ddescription">${data.description}</p>
       <h4 id="dplatforms">Platforms Available</h4>
       <ul>
       ${platform}
       </ul>
       <h4 id="dplaytime">Playtime : ${playtim}</h4>
       <h4 id="drating">Rating : ${data.rating} / 5</h4>
       <h4 id="davailable">Available on : </h4><ul>${available}</ul>`
      $(".container").html(htm)

    }
    )
}

//this is for back button only I just copied the search buttons IGNORE!!!!!
$(".back-btn").on("click", function () {
  $("#funz").html("");
  $(".container").html("");
  $(".hide").css("display", "block");

})



$(".darkmode").on("click", function () {
  if ($("body").hasClass("dark")) {
    $("body").addClass("light")
    $("body").removeClass("dark")
    $(".darkmode").html(`dark  mode <img src="brightness-light-up-day-mode-512.webp" class="png" alt="sorry">`);
  }
  else if ($("body").hasClass("light")) {
    $("body").addClass("dark")
    $("body").removeClass("light")
    $(".darkmode").html(`light mode <img src="dark.png" class="png" alt="sorry">`);

  }
})




