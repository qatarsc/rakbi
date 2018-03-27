// A $( document ).ready() block.
$( document ).ready(function() {
	console.log( "ready!" );
    
	var slider_val = 0;
	var slider_val_final = 0;

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
	var speed_slider = null;
	var camel_angle = 0;

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

		// Old Track
		
		// if(path.length > 0){

		// 	for(var i=1; i < path.length; i++){
		// 	   // console.log("x:", path[i][0], "y: ", path[i][1]);
		// 	   context.beginPath();
		// 	   context.moveTo(path[i-1][0], path[i-1][1]);
		// 	   context.lineTo(path[i][0], path[i][1]);
		// 	   context.closePath();
		// 	   context.lineJoin = "round";
		// 	   context.lineWidth = 3;
		// 	   context.stroke();
		// 	}

		// 	context.drawImage(marker.Sprite, marker.XPos, marker.YPos - 50, marker.Width, marker.Height);

		// }
		

		// Track
		//outer circle
		context.beginPath();
		context.ellipse(150, 80, 120, 60, 0, 0, 2 * Math.PI);
		context.fillStyle = "black";
		context.closePath();
		context.fill();

		//inner circle
		context.beginPath();
		context.ellipse(150, 80, 100, 45, 0, 0, 2 * Math.PI);
		context.fillStyle = "white";
		context.closePath();
		context.fill();

		//dotted path
		context.save();
		context.beginPath();
		context.ellipse(150, 80, 110, 52.5, 0, 0, 2 * Math.PI);
		context.closePath();
		context.setLineDash([5,5]);
		context.strokeStyle = "yellow";
		context.lineWidth = 2;
		context.stroke();
		context.restore();

		//start line
		context.beginPath();
		context.moveTo(250, 80);
		context.lineTo(270, 80);
		context.strokeStyle = "white";
		context.lineWidth = 3;
		context.stroke();

		//texts
		context.font = "12px Arial";
		context.fillStyle = 'black';
		context.fillText("Start",280,85);

		var angle = (2 * Math.PI) / 6000 * 1000;
		var x = 140 + (140 * Math.cos(angle));
		var y = 85 + (75 * Math.sin(angle));
		context.fillText("1km", x, y);

		var angle = (2 * Math.PI) / 6000 * 2000;
		var x = 140 + (140 * Math.cos(angle));
		var y = 85 + (75 * Math.sin(angle));
		context.fillText("2km", x, y);

		var angle = (2 * Math.PI) / 6000 * 3000;
		var x = 140 + (140 * Math.cos(angle));
		var y = 85 + (75 * Math.sin(angle));
		context.fillText("3km", x, y);

		var angle = (2 * Math.PI) / 6000 * 4000;
		var x = 140 + (140 * Math.cos(angle));
		var y = 85 + (75 * Math.sin(angle));
		context.fillText("4km", x, y);

		var angle = (2 * Math.PI) / 6000 * 5000;
		var x = 140 + (140 * Math.cos(angle));
		var y = 85 + (75 * Math.sin(angle));
		context.fillText("5km", x, y);

		context.font = "10px Arial";
		var angle = (2 * Math.PI) / 6000 * 5500;
		var x = 140 + (140 * Math.cos(angle));
		var y = 85 + (75 * Math.sin(angle));
		context.fillText("500m", x, y);

		var angle = (2 * Math.PI) / 6000 * 5750;
		var x = 140 + (140 * Math.cos(angle));
		var y = 85 + (75 * Math.sin(angle));
		context.fillText("250m", x, y);



		// Camel
		var x = 150 + (110 * Math.cos(camel_angle));
		var y = 80 + (52.5 * Math.sin(camel_angle));

		context.beginPath();
		context.ellipse(x, y, 7, 7, 0, 0, 2 * Math.PI);
		context.fillStyle = "red";
		context.closePath();
		context.fill();

	}

	function update() {
		// if(marker.index < path.length - 1){
		// 	marker.index = marker.index + 1;
		// }
		// else{
		// 	marker.index = 0;
		// }
		// marker.XPos = path[marker.index][0];
		// marker.YPos = path[marker.index][1];
		
		camel_angle += 0.02;
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
	  console.log("stop!");

	  // if(!hitting){
	  // 	hitting = true;
	  // 	$("#hit").text("Stop Hitting");
	  // 	$("#hit").removeClass("btn-success");
	  // 	$("#hit").addClass("btn-danger");
	  // 	if (timer2 != null){
	  //     	clearInterval(timer2);
	  //     	timer2 = null;
	  //   } 
	  //   timer2 = setInterval(update2, 500);
	  // }
	  // else{
	  // 	hitting = false;
	  // 	$("#hit").text("Start Hitting");
	  // 	$("#hit").removeClass("btn-danger");
	  // 	$("#hit").addClass("btn-success");
	  	// if (timer !== null){
	   //    	clearInterval(timer);
	   //    	timer = null;
	   //  }
	   //  if (timer2 != null){
	   //    	clearInterval(timer2);
	   //    	timer2 = null;
	   //  }
	 //    var slider_val = 0;
		// var slider_val_final = 0;

		// var bpm = 90 + (slider_val_final/500 * (180-90));
		// $("#bpm_val").text(Math.round(bpm));

		// var heart_speed = 2.5 - (slider_val_final/500 * 2.3);
		// $("#heart_img").css("animation-duration", heart_speed + "s");
		// $(".mobile-detail #heart_img").css("animation-duration", heart_speed + "s");

		// var camel_speed = slider_val_final/500 * 55;
		// $("#camel_speed").text(Math.round(camel_speed)); 

		// speed_slider.slider('setValue', 0);
		slider_val = 0;
		$(".speed_btns").removeClass("active");
  //       $(".speed_btns").addClass("btn-primary");

	  // }
    });

    // Slider
    speed_slider = $('#ex1').slider({
		formatter: function(value) {
			slider_val = value;
			if (timer2 != null){
		      	clearInterval(timer2);
		      	timer2 = null;
		    } 
		    timer2 = setInterval(update2, 500);
		}
	});

	$("#spd1").click(function() {
	  console.log("spd1!");
	  slider_val = 167;
	  if (timer2 != null){
        	clearInterval(timer2);
        	timer2 = null;
      } 
      timer2 = setInterval(update2, 500);

      $(".speed_btns").removeClass("active");
      // $(".speed_btns").addClass("btn-primary");
      // $("#spd1").removeClass("btn-primary");
      $("#spd1").addClass("active");

	});

	$("#spd2").click(function() {
	  console.log("spd2!");
	  slider_val = 334;
	  if (timer2 != null){
        	clearInterval(timer2);
        	timer2 = null;
      } 
      timer2 = setInterval(update2, 500);
      $(".speed_btns").removeClass("active");
      // $(".speed_btns").addClass("btn-primary");
      // $("#spd2").removeClass("btn-primary");
      $("#spd2").addClass("active");
	});

	$("#spd3").click(function() {
	  console.log("spd3!");
	  slider_val = 501;
	  if (timer2 != null){
        	clearInterval(timer2);
        	timer2 = null;
      } 
      timer2 = setInterval(update2, 500);
      $(".speed_btns").removeClass("active");
      // $(".speed_btns").addClass("btn-primary");
      // $("#spd3").removeClass("btn-primary");
      $("#spd3").addClass("active");
	});

    setTimeout(redraw, 500);

    



    
});