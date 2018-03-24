// A $( document ).ready() block.
$( document ).ready(function() {
	console.log( "ready!" );
    
	var slider_val = 0;
	var slider_val_final = 0;

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
	var timer2 = null;
	var hitting = false;

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

	function update() {
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

	function update2() {
      if(slider_val > slider_val_final){
      	slider_val_final = slider_val_final + 20;
      }
      if(slider_val < slider_val_final){
      	slider_val_final = slider_val_final - 20;
      }
      var bpm = 90 + (slider_val_final/500 * (180-90));
	  $("#bpm_val").text(Math.round(bpm));

	  var heart_speed = 2.5 - (slider_val_final/500 * 2.3);
	  $("#heart_img").css("animation-duration", heart_speed + "s");
	  $(".mobile-detail #heart_img").css("animation-duration", heart_speed + "s");

	  var camel_speed = slider_val_final/500 * 55;
	  $("#camel_speed").text(Math.round(camel_speed));

	  if (timer !== null){
      	clearInterval(timer);
      	timer = null;
      }
      timer = setInterval(update, 550 - slider_val);

    }


	$("#hit").click(function() {
	  console.log("hit!");

	  if(!hitting){
	  	hitting = true;
	  	$("#hit").text("Stop Hitting");
	  	$("#hit").removeClass("btn-success");
	  	$("#hit").addClass("btn-danger");
	  	if (timer2 != null){
	      	clearInterval(timer2);
	      	timer2 = null;
	    } 
	    timer2 = setInterval(update2, 500);
	  }
	  else{
	  	hitting = false;
	  	$("#hit").text("Start Hitting");
	  	$("#hit").removeClass("btn-danger");
	  	$("#hit").addClass("btn-success");
	  	if (timer !== null){
	      	clearInterval(timer);
	      	timer = null;
	    }
	    if (timer2 != null){
	      	clearInterval(timer2);
	      	timer2 = null;
	    }
	    var slider_val = 0;
		var slider_val_final = 0;

		var bpm = 90 + (slider_val_final/500 * (180-90));
		$("#bpm_val").text(Math.round(bpm));

		var heart_speed = 2.5 - (slider_val_final/500 * 2.3);
		$("#heart_img").css("animation-duration", heart_speed + "s");
		$(".mobile-detail #heart_img").css("animation-duration", heart_speed + "s");

		var camel_speed = slider_val_final/500 * 55;
		$("#camel_speed").text(Math.round(camel_speed)); 

	  }
    });

    setTimeout(redraw, 500);

    



    
});