$(document).ready(function() {

	// Manage menu clicks and page show/hide

	$(".menu-item").click(function() {
		if(!$(this).hasClass('active-menu')){ // Don't start page animations if an active menu item is clicked 
			$(".page").slideUp("fast"); // Hide all pages
			
			if($(this).data('page') == 'profile'){
				$("#nav-title").fadeOut(300); // Hide the nav-title on the profile page
			}
			else{
				$("#nav-title").fadeIn(300); // Show the nav-title on all other pages
			}
			
			$(".menu-item").removeClass('active-menu'); // Remove the active class from all menu-items
			
			$(this).addClass('active-menu'); // Add the active-menu class to the clicked menu item
			
			$('#'+$(this).data('page')).slideDown("fast"); // Show the page using the 'data-page' attribute
		}
		
	});
	
	$("#nav-title").click(function(){
		$(".page").hide(300); // Hide all pages	

		$("#nav-title").fadeOut(300); // Hide the nav-title on the profile page
		
		$(".menu-item").removeClass('active-menu'); // Remove the active class from all menu-items
		
		$("#profile-button").addClass('active-menu'); // Add the active-menu class to the clicked menu item
		
		$('#'+$(this).data('page')).show(); // Show the page using the 'data-page' attribute
	});

	
	// Initialize isotope masonry on portfolio click so that correct page dimensions are determined
	
	$("#portfolio-button").click(function() {

		
		$(function() {
		 
		  // Tweaked from: https://gist.github.com/mattstauffer/3835881
		  // No guarantees
		  // 1. include Isotope.js
		  // 2. include this file
		  // 3. customize Isotope options at the bottom of this file
		  // 4. add "margin: 0 auto" to the isotope container
		 
		  $.Isotope.prototype._getMasonryGutterColumns = function() {
			var gutter = this.options.masonry.gutterWidth || 0;
			containerWidth = this.element.parent().width();
			this.masonry.columnWidth = this.options && this.options.masonry.columnWidth ||
			  this.$filteredAtoms.outerWidth(true) ||
			  containerWidth;
			this.masonry.columnWidth += gutter;
			this.masonry.cols = Math.floor(containerWidth / this.masonry.columnWidth);
			this.masonry.cols = Math.max(this.masonry.cols, 1);
		  };
		 
		  $.Isotope.prototype._masonryReset = function() {
			this.masonry = {};
			this._getMasonryGutterColumns();
			var i = this.masonry.cols;
			this.masonry.colYs = [];
			while (i--) {
			  this.masonry.colYs.push( 0 );
			}
		  };
		 
		  $.Isotope.prototype._masonryResizeChanged = function() {
			var prevColCount = this.masonry.cols;
			this._getMasonryGutterColumns();
			return ( this.masonry.cols !== prevColCount );
		  };
		 
		  $.Isotope.prototype._masonryGetContainerSize = function() {
			var gutter = this.options.masonry.gutterWidth || 0;
			var unusedCols = 0,
			  i = this.masonry.cols;
			while ( --i ) {
			  if ( this.masonry.colYs[i] !== 0 ) {
				break;
			  }
			  unusedCols++;
			}
			return {
			  height : Math.max.apply( Math, this.masonry.colYs ),
			  width : ((this.masonry.cols - unusedCols) * this.masonry.columnWidth) - gutter
			};
		  };
		  
		  
		 
		 
		  $('#isotope-container').isotope({
			masonry: {
			  columnWidth: 170,
			  gutterWidth: 2
			}
		  });
		 
		});
			
			
		});
		
	
		
		
	// Isotope Filters:
	$('#filters a').click(function(){
	  var selector = $(this).attr('data-filter');
	  $('#isotope-container').isotope({ 
	  filter: selector
	  
	  });

	});
	
	$('#filters li').click(function(){
		
		$('#filters li').removeClass('filter-active');
		$(this).addClass('filter-active');
	});
	
	
	
	
	//Fancybox Portfolio Links Code:
	$(".fancybox").fancybox();
	
	
	
	
	//Tooltips Code:
	 $('.menu-item').tooltipster({
	 	delay: 0,
	 	speed: 100,
	 	touchDevices: false
	 });
	 
	
	//Contact Form Code:
	$(function (e) {
		$("#contact .form-button").click(function (e) {
			var $error = 0;
			var name = $("#form_name").val();
			var email = $("#form_email").val();
			var text = $("#msg_text").val();
			
			if(name == "" || email=="" || text=="" ){
				alert('Please ensure all fields are filled in correctly');
				$error = 1;
				
			}

			
			var dataString = 'name=' + name + '&email=' + email + '&text=' + text;
			
			if($error == 0){
				$.ajax({
					type: "POST",
					url: "mail.php",
					data: dataString,
					success: function () {
						$('.success').fadeIn(1000);
					}
				});
				return false;
			}
			
			e.preventDefault();
		});
	});





	



	

});