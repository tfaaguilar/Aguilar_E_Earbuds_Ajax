(() => {

  //variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");

  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");
 
  //spinner

  
  //functions
  function modelLoaded() {
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }

  function loadInfoBoxes() {

    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    .then(infoBoxes => {
      console.log(infoBoxes);

      infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index+1}`);
      
      const titleElement = document.createElement('h3');
      titleElement.textContent = infoBox.heading;

      const imgElement = document.createElement('img');
      imgElement.src = `images/${infoBox.thumbnail}`;
      
      const textElement = document.createElement('p');
      textElement.textContent = infoBox.description;

      selected.appendChild(imgElement);
      selected.appendChild(titleElement);
      selected.appendChild(textElement);
        });
   })
    .catch(error => console.error(error)); 
  }

  loadInfoBoxes();

  function loadMaterialInfo(){
    fetch("https://swiftpixel.com/earbud/api/materials")
      .then(response => response.json())
      .then(material_list => {
  
        materialList.forEach(material => {
      
          const clone = materialTemplate.content.cloneNode(true);

          const materialHeading = clone.querySelector(".material-heading");
          materialHeading.textContent = material.heading;

          const materialDescription = clone.querySelector(".material-description");
          materialDescription.textContent = material.description;

          materialList.appendChild(clone);
        });

      })

    }
    
  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

