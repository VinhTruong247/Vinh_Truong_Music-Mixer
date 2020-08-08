(() => {
	const typeCon = document.querySelector('#container'),
		  type = document.querySelectorAll('.tankType div'),
          dropZones = document.querySelectorAll('.dropzone'),
          tanks = document.querySelectorAll('.tankImage'),
          env = document.querySelector('#dropbox');

	function placetanks() {
		const tankNo = ["panzer4", "tiger1", "b1", "t34"];
		
		tankNo.forEach((name, index) => {
			type[index].style.background = `transparent center/cover url(images/${name}.svg`;	
		});		


	}
	placetanks();

    function allowDrag(event) {
		event.dataTransfer.setData("text/plain", this.id);

		let tankNo = event.dataTransfer.getData("text/plain");

		var dragImage = new Image(); 
		dragImage.src = `images/${tankNo}.svg`; 
		event.dataTransfer.setDragImage(dragImage, 80, 80);

		
		
		
	}

	function allowDragOver(event) {
		event.preventDefault();
	}

	function allowDrop(event) {
        if (this.children.length >= 1) {
            return;
        }

		
        let currentTank = event.dataTransfer.getData("text/plain");
        
        event.target.appendChild(document.querySelector(`#${currentTank}`));

        let audio = document.createElement("audio");
        
        if (event.target.querySelector(`#${currentTank}`).children.length < 1) {
            event.target.querySelector(`#${currentTank}`).appendChild(audio);
            audio.src = `audio/${currentTank}.wav`;
            audio.play();
            audio.loop = true;
        }  
    }

    type.forEach(tank => tank.addEventListener('dragstart', allowDrag));
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', allowDragOver);
        zone.addEventListener('drop', allowDrop);
     });
})();