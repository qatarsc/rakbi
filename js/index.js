// A $( document ).ready() block.
$( document ).ready(function() {
	console.log( "ready!" );
    
	var slider_val = 0;

    // Slider
    $('#ex1').slider({
		formatter: function(value) {
			slider_val = value;
		}
	});

	var context = document.querySelector("canvas").getContext("2d");
	var canvasWidth = 300;
	var canvasHeight = 150;
	var Marker = function () {
	    this.Sprite = new Image();
	    this.Sprite.src = "img/marker.png"
	    this.Width = 30;
	    this.Height = 50;
	    this.XPos = 0;
	    this.YPos = 0;
	    this.index = 0;
	}
	var marker = new Marker();
	marker.XPos = path[0][0];
	marker.YPos = path[0][1];

	var speed = 10;
	var timer = null;

	/**
	* Clears the canvas.
	*/
	function clearCanvas()
	{
		context.clearRect(0, 0, canvasWidth, canvasHeight);
	}

	/**
	* Redraws the canvas.
	*/
	function redraw()
	{	
		// console.log('redrawing');
		clearCanvas();

		// Track
		
		if(path.length > 0){

			for(var i=1; i < path.length; i++){
			   // console.log("x:", path[i][0], "y: ", path[i][1]);
			   context.beginPath();
			   context.moveTo(path[i-1][0], path[i-1][1]);
			   context.lineTo(path[i][0], path[i][1]);
			   context.closePath();
			   context.lineJoin = "round";
			   context.lineWidth = 3;
			   context.stroke();
			}

			context.drawImage(marker.Sprite, marker.XPos, marker.YPos - 50, marker.Width, marker.Height);

		}

	}

	function update(){
		if(marker.index < path.length - 1){
			marker.index = marker.index + 1;
		}
		else{
			marker.index = 0;
		}
		marker.XPos = path[marker.index][0];
		marker.YPos = path[marker.index][1];
		redraw()
	}


	$("#hit").click(function() {
	  console.log("hit!");

	  var bpm = 90 + (slider_val/500 * (180-90));
	  $("#bpm_val").text(bpm);

	  var heart_speed = 2.5 - (slider_val/500 * 2.3);
	  $("#heart img.bottom").css("animation-duration", heart_speed + "s");

	  var camel_speed = slider_val/500 * 55;
	  $("#camel_speed").text(camel_speed);

      if (timer !== null){
      	clearInterval(timer);
      	timer = null;
      }
      timer = setInterval(update, 550 - slider_val); 
    });

    setTimeout(redraw, 500);



    
});