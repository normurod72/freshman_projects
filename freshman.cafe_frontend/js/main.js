/*!
  Inha University in Tashkent
  Student name: Normurod Mamasoliev;
  Freshman year  project 2016 April
  simple bootstrap based cafe project (only frontend)
*/


var Product={
	MakingContainer: function(page,id,name,cost,image){
		$("."+page).append("<div class='product' id='"+id+"'><div id='title-bar-container'><div class='product-title-bar'><span>"+name+"<br />"+cost+" sums</span><br /><button id='btn-add-to-wishlist'>+Add to wishlist</button></div></div><p class='book-btn' id='"+id+"'>Book</p></div>");
		$("#"+id+"").css({
	    "background":image,
        "-webkit-background-size": "cover",
        "-moz-background-size": "cover",
        "-o-background-size": "cover",
        "background-size": "cover"
			});		
	},

	AddingStyle: function(){
		$(".book-btn").click(function(){
			if($(this).hasClass("booked-btn")){}else
			{Product.addBill(data.fastFoods.cost[this.id-1]);}

			$(this).removeClass();
			$(this).empty();
			$(this).addClass("booked-btn");
			$(".booked-btn").attr("title","Press double click to remove Booked elements");
			$(".booked-btn").text("Booked").css("font-size","20px");
			$(".booked-btn").dblclick(function(){
				Product.subBill(fastfood.cost[this.id-1]);
				$(this).removeClass("booked-btn");
				console.log("!");
				$(this).addClass("book-btn");
				//$(this).empty();
				//$(".booked-btn").attr("title","Press");
				$(".book-btn").text("Book").css("font-size","24px");
				return 0;
			});
		});

		//return this;
	},

	AddingAnimation: function(){
		$(".main-bar .product").mouseover(function(){
			$(this).css({"cursor":"pointer", "box-shadow":"0px 0px 10px Black","transition":"0.3s"});
			$(".product-title-bar",this).css({ "opacity":"1","clear": "both","transition": "border .8s ease-in-out",
  			"line-height": "1.42857143","white-space": "nowrap","-webkit-background-clip": "padding-box",
          	"background-clip": "padding-box"});

				});
		$(".main-bar .product").mouseout(function(){
		$(this).css({"cursor":"default","box-shadow":"none"});
		$(".product-title-bar",this).css({"opacity":"0.7","-webkit-background-clip": "padding-box",
          "background-clip": "padding-box"});
		});
		return this;
	},

	SideButtons:function(){
		$("body").append("<ul id='side-bar'><li onclick='Product.ForAdmin()'>Admin</li><li>Wishlist</li><li>Unselect</li><li>Order</li><li>Comment</li><li>Join</li><input type='submit' placeholder='cash...' id='cash' /></ul>");
		return this;
	},

	AddHR: function(class_name,sentence){
		$("."+class_name).append("<table class='text-bar-child'><tr><td>"+sentence+"</td></tr></table>");
		$("."+class_name+" td").css({"width":screen.width/1.1});
	},

	OpenDialog: function(){
		$("body").append("<div class='dialog-background'></div>");
		$(".text-bar").append("<div class='dialog-window'><div class='title-for-dialog-window'><p>Title of the window</p><button>x</button></div><div class='container-for-dialog'></div></div>");
		$(".dialog-window").css({
			"position":"absolute",
			"top":screen.availHeight/12,
			"left":screen.availWidth/5
		});
		$(".title-for-dialog-window button").click(function(){$(".dialog-window").remove();$(".dialog-background").remove();});
	},

	ForAdmin:function(){
		this.OpenDialog();
		$(".container-for-dialog").append("<p>Username: <input type='user' placeholder='type...' title='at least 6 chars' /></p><p>Password: <input type='password' placeholder='type...' title='at least 6 chars' /></p><p><input type='Submit' /></p>");
	},

	SetDefaultParameters:function(){
		//$("#btn-add-to-wishlist").click(function(){$(this).removeId(); $(this).addClass(".btn-add-to-wishlist-active");});
		if(screen.width<768){
			$("#wowslider-container2").remove(); $(".main-bar").css({"height":"2910px"});}
		$(".cash-bar input").val(0);
	},

	addBill:function(arg){
		var sum=parseInt($(".cash-bar input").val());
		parseInt(arg);
		sum+=arg;
		$(".cash-bar input").val(sum);
	},

	subBill:function(arg1){
		//console.log(arg1);
		var sum1=parseInt($(".cash-bar input").val());
		//console.log(sum1);
		parseInt(arg1);
		sum1=sum1-arg1;
	//	console.log(sum1);
		$(".cash-bar input").val(sum1);
	}
};

//json part
var data={
	"fastFoods":{
	"id":["1","2","3","4","5","6","7","8"],
	"name":["Hamburger","Hot-dog","Cheeseburger","Nonburger","Sandvich","Lavash","Rolton","Canadian hot-dog"],
	"cost":[5000,4000,6000,4000,6000,7000,3000,5000],
	"image":[
	"url('img/hamburger.jpg') no-repeat",
	"url('img/hotdog.jpg') no-repeat",
	"url('img/cheeseburger.jpg') no-repeat",
	"url('img/nonburger.jpg') no-repeat",
	"url('img/sandwich.jpg') no-repeat",
	"url('img/lavash.jpg') no-repeat",
	"url('img/rolton.jpg') no-repeat",
	"url('img/hotdog3.jpg') no-repeat",
	]
},
"drinks":{
	"id":["1","2","3","4","5","6","7","8"],
	"name":["Coca cola","Fanta","Green Tea","Black Tea","Sandvich","Lavash","Rolton","Canadian hot-dog"],
	"cost":[5000,4000,6000,4000,6000,7000,3000,5000],
	"image":["url('img/1.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/2.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat"
	]
},
"uzbekFoods":{
	"id":["1","2","3","4"],
	"name":["Honum","Osh","Kabob","Samsa"],
	"cost":[5500,6000,6000,4000],
	"image":["url('img/honum.jpg') no-repeat",
	"url('img/osh.jpg') no-repeat",
	"url('img/kabob.jpg') no-repeat",
	"url('img/samsa.jpg') no-repeat"
	]
},
"salads":{
	"id":["1","2","3","4","5","6","7","8"],
	"name":["Hamburger","Hot-dog","Cheeseburger","Nonburger","Sandvich","Lavash","Rolton","Canadian hot-dog"],
	"cost":[5000,4000,6000,4000,6000,7000,3000,5000],
	"image":["url('img/1.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/2.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat"
	]
},
"fruits":{
	"id":["1","2","3","4","5","6","7","8"],
	"name":["Hamburger","Hot-dog","Cheeseburger","Nonburger","Sandvich","Lavash","Rolton","Canadian hot-dog"],
	"cost":[5000,4000,6000,4000,6000,7000,3000,5000],
	"image":["url('img/1.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/2.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat"
	]
},
"others":{
	"id":["1","2","3","4","5","6","7","8"],
	"name":["Hamburger","Hot-dog","Cheeseburger","Nonburger","Sandvich","Lavash","Rolton","Canadian hot-dog"],
	"cost":[5000,4000,6000,4000,6000,7000,3000,5000],
	"image":["url('img/1.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/2.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat",
	"url('img/hamburger.jpg') no-repeat"
	]
}
}
$(function(){

//Calling each one, after downloading external elements
	
	Product.SetDefaultParameters();
			if($("#fast-foods").hasClass("active")){ 
				for (var i=0; i<data.fastFoods.id.length; i++){
						Product.MakingContainer("text-bar",data.fastFoods.id[i],data.fastFoods.name[i],data.fastFoods.cost[i],data.fastFoods.image[i]);
					if(i==3){
						Product.AddHR("text-bar","Cafe provides best and fastest services whenever you hungry, you order by <br />its website and they prepeare everything before you come! ");
					}
				}
					Product.AddHR("text-bar","<p id='title-for-social'>You can share this website with your precious friends if you want</p><br /><div id='social'><button> f </button><button>ok </button><button>in </button><button>vk</button><button>i</button><button>t</button></div>");
			}	
			else if($("#drinks").hasClass("active")){
				for (var i=0; i<data.drinks.id.length; i++){
					Product.MakingContainer("text-bar",data.drinks.id[i],data.drinks.name[i],data.drinks.cost[i],data.drinks.image[i]);
					if(i==3){
						Product.AddHR("text-bar","Cafe provides best and fastest services whenever you hungry, you order by <br />its website and they prepeare everything before you come! ");
					}
				}
				Product.AddHR("text-bar","<p id='title-for-social'>You can share this website with your precious friends if you want</p><br /><div id='social'><button> f </button><button>ok </button><button>in </button><button>vk</button><button>i</button><button>t</button></div>");
			}
			else if($("#uzbek-foods").hasClass("active")){
			 	for (var i=0; i<data.uzbekFoods.id.length; i++){
					Product.MakingContainer("text-bar",data.uzbekFoods.id[i],data.uzbekFoods.name[i],data.uzbekFoods.cost[i],data.uzbekFoods.image[i]);
				if(i==3){
					Product.AddHR("text-bar","Cafe provides best and fastest services whenever you hungry, you order by <br />its website and they prepeare everything before you come! ");
					$(".text-bar").append("<video id='vid' poster='../video/tea-cup1.jpg' preload controls loop> ><source src='../video/1.mp4'type='video/mp4; codecs='vp8, vorbis'' /><p>A cup of tea 1000 sums</p></video>");
				}
			}
				Product.AddHR("text-bar","<p id='title-for-social'>You can share this website with your precious friends if you want</p><br /><div id='social'><button> f </button><button>ok </button><button>in </button><button>vk</button><button>i</button><button>t</button></div>");
			}
			else if($("#salads").hasClass("active")){
				for (var i=0; i<data.salads.id.length; i++){
					Product.MakingContainer("text-bar",data.salads.id[i],data.salads.name[i],data.salads.cost[i],data.salads.image[i]);
					if(i==3){
						Product.AddHR("text-bar","Cafe provides best and fastest services whenever you hungry, you order by <br />its website and they prepeare everything before you come! ");
					}
				}
				Product.AddHR("text-bar","<p id='title-for-social'>You can share this website with your precious friends if you want</p><br /><div id='social'><button> f </button><button>ok </button><button>in </button><button>vk</button><button>i</button><button>t</button></div>");
			}
			else if($("#fruits").hasClass("active")){
				for (var i=0; i<data.fruits.id.length; i++){
					Product.MakingContainer("text-bar",data.fruits.id[i],data.fruits.name[i],data.fruits.cost[i],data.fruits.image[i]);
					if(i==3){
						Product.AddHR("text-bar","Cafe provides best and fastest services whenever you hungry, you order by <br />its website and they prepeare everything before you come! ");
					}
				}
				Product.AddHR("text-bar","<p id='title-for-social'>You can share this website with your precious friends if you want</p><br /><div id='social'><button> f </button><button>ok </button><button>in </button><button>vk</button><button>i</button><button>t</button></div>");
			
			}
			else if($("#others").hasClass("active")){
				for (var i=0; i<data.others.id.length; i++){
					Product.MakingContainer("text-bar",data.others.id[i],data.others.name[i],data.others.cost[i],data.others.image[i]);
					if(i==3){
						Product.AddHR("text-bar","Cafe provides best and fastest services whenever you hungry, you order by <br />its website and they prepeare everything before you come! ");
					}
				}
				Product.AddHR("text-bar","<p id='title-for-social'>You can share this website with your precious friends if you want</p><br /><div id='social'><button> f </button><button>ok </button><button>in </button><button>vk</button><button>i</button><button>t</button></div>");
			}	

	Product.SideButtons().AddingAnimation().AddingStyle();
});

window.onload=function(e){
	console.log('Loading finished!')
}
