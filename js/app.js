

//////////////////////////////////////////////////// RELATED TO KEEN.IO ////////////////////////////////////////

var client = new Keen({
	projectId: '58e54fdc0935ce40a59fa8ff', // String (required always)
	writeKey: 'F4A8F46FB5C476650013EC18CF2AF7917C898719949ED4C2F1384E72976913A6F6C73C75827CD46AC5F1E679FADB748423CCE26EA256DE5C2F85A2DF4259799CDE6119740D3F2C36AF59E89CDCAD9F4A6DF50A11E012BEDB017267C40FE94E59',   // String (required for sending data)
	readKey: 'CD473F0686A222EA4BD7AA92C846FE721A9222EB06AC738BD4A39DEF01F883AD03B8FEF831E8016226B6B65F84CFC35C82C056FC56292A54A359F52997BDCABB9AD0D02F476931BF82439C7EDF5F52A9BE7DFECA303D46B8720CF5531D90B29C'      // String (required for querying data)

  });
  // Create a data object with the properties you want to send
 
	
	function send(userdata){

		console.log("Sending");
		// Send it to the "purchases" collection
		client.addEvent("single",userdata, function(err, res){
		  if (err) {
			// there was an error!
			console.log(err);
			return;
		  }
		  else {
			// see sample response below
			r = res;
			console.log("Response",res);
			return;
		  }
		});
	}

	function fetch(){
		
		Keen.ready(function(){

		  // Create a query instance
		  var count = new Keen.Query("count", {
			event_collection: "single",				// for multiple group_by, change event_collection to multiple
			group_by: ["page", "platform", "vendor", "language"],						// for multiple group_by, add the name from data to the array here eg: ["data1", "data2"..]
			timeframe: "this_1_hour"
		  });

		  // Send query
		  client.run(count, function(err, res){
			if (err) {
			  console.log(err);
			}
			else {
			  //console.log("Response: ",res.result[0].result);
			  console.log("Response: ", res);
			  //console.log(res.result[0].data[0].language);
			}
		  });

		});
	}
	
	function fetchJava(){
		
		Keen.ready(function(){

		  // Create a query instance
		  var count = new Keen.Query("count", {
			event_collection: "fromJava",				// for multiple group_by, change event_collection to multiple
			group_by: ["page", "time"],						// for multiple group_by, add the name from data to the array here eg: ["data1", "data2"..]
			timeframe: "this_1_hour"
		  });

		  // Send query
		  client.run(count, function(err, res){
			if (err) {
			  console.log(err);
			}
			else {
			  //console.log("Response: ",res.result[0].result);
			  console.log("Response: ", res);
			  //console.log(res.result[0].data[0].language);
			}
		  });

		});
	}
///////////////////////////////////////  RELATED TO COOKIE  ////////////////////////////////////////////////////////

	function findMobile(){
		
		if( navigator.userAgent.match(/Android/i))
			return "Android";
		else if(navigator.userAgent.match(/webOS/i))
			return "webOS";
		else if(navigator.userAgent.match(/iPhone/i))
			return "iPhone";
		else if(navigator.userAgent.match(/iPad/i))
			return "iPad";
		else if(navigator.userAgent.match(/iPod/i))
			return "iPod";
		else if(navigator.userAgent.match(/BlackBerry/i))
			return "BlackBerry";
		else if(navigator.userAgent.match(/Windows Phone/i))
			return "Windows Phone";
		else
			return "No Mobile device identified";
	}
	function browserType(){
		
		if(window.opr)
			return "Opera";
		else if(typeof InstallTrigger !== 'undefined')
			return "Firefox";
		else if(navigator.vendor !== '')
			return navigator.vendor;
		else if(!!window.StyleMedia)
			return "IE";
		else
			return "Other";
	}
	document.addEventListener("click",fn,true);
	// ===== Method to run when the page is loaded  ===== //
	window.onpageshow = function(){
		
		console.log("ON load running");

		// Step 1: Check for the Cookie		--> Currently we are manually creating the cookie, 
		checkCookie("WT");
		
		localStorage.setItem("wt_time", new Date());
		var userdata = {
			
		  page: window.location.href,  
		  platform: navigator.platform, 
		  vendor: browserType(),
		  language: navigator.language,
		  languages: navigator.languages,
		  referrer: document.referrer,
		  timestamp: localStorage.getItem("wt_time").toString(),
		  duration: 0,
		  cookie: getCookie("WT")
		};
		
		console.log(localStorage.getItem("wt_time"));

	};
	
	// ===== Method to set cookie in the browser if does not exists ===== //
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	// ===== Method to get cookie from browser ===== //
	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	}

	// ===== Method to check for cookie in browser ===== //
	function checkCookie(cname) {
		var wt = getCookie(cname);
		if (wt != "") {
			//alert("Welcome again " + user);
			console.log("Cookie Exists time to go back");
		} else {
			console.log("Cookie does not exists");
			if (wt != "" || wt != null) {
				setCookie(cname, createHash(), 365);
			}
		}
		return "";
	}
	function createHash(){
		
		return calculateHash()+""+calculateHash()+""+calculateHash()+""+calculateHash();
	}
	function calculateHash(){
		
		var time = new Date().toISOString();
		var url = window.location.href;
		var random = Math.random();
		var hash = 0;
		var str = url+""+time+""+random;
		for(var i=0;i<str.length;i++){
			
			var ch = str.charAt(i);
			hash = ((hash<<5)-hash)+ch;
			hash = hash & hash;
		}
		return hash;
	}
	function fn(){
		
		console.log("Clicked");
	}
	
////////////// To send details when moving away from page ////////////////////////

window.onbeforeunload = function(e) {
    
	//return "Going?";
	var d1 = new Date(localStorage.getItem("wt_time"));
	var d2 = new Date();
	var timespent = d2 - d1;
	localStorage.setItem("duration", timespent);
	var userdata = {
			
	  page: window.location.href,  
	  platform: navigator.platform, 
	  vendor: browserType(),
	  language: navigator.language,
	  languages: navigator.languages,
	  referrer: document.referrer,
	  timestamp: localStorage.getItem("wt_time").toString(),
	  duration: timespent,
	  nextUrl: localStorage.getItem("nextUrl"),
	  mobile: findMobile(),
	  scrolled: localStorage.getItem("%scroll"),
	  cookie: getCookie("WT")
	};
	localStorage.removeItem("nextUrl");
	client.addEvent("single",userdata, function(err, res){
	  if (err) {
		// there was an error!
		console.log(err);
	  }
	  else {
		// see sample response below
		console.log("Response",res);
	  }
	});

	for(var i=0;i<1000;i++){
		
		console.log(i);
	}
	//send(userdata);
}
if($(window).height()!=document.body.scrollHeight){

	$(document).scroll(function(){

		if(window.scrollY+ $(window).height() > parseInt(localStorage.getItem("scroll"))){

			localStorage.setItem("scroll",(window.scrollY + $(window).height()));
			localStorage.setItem("%scroll",parseFloat(localStorage.getItem("scroll"))/(document.body.scrollHeight)*100);
		}	
	});
}
$(document).ready(function(){
	
	if($(window).height()!=document.body.scrollHeight){

		console.log("Logs",window.scrollY,$(window).height());
		localStorage.setItem("scroll",(window.scrollY + $(window).height()));
		localStorage.setItem("%scroll",parseFloat(localStorage.getItem("scroll"))/(document.body.scrollHeight)*100);
	}
	$("a").click(function(){
		
		localStorage.setItem("nextUrl",this.href);
	});
});