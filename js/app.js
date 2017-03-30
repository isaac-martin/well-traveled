

//////////////////////////////////////////////////// RELATED TO KEEN.IO ////////////////////////////////////////

var client = new Keen({
	projectId: '58ac48a78db53dfda8a885e1', // String (required always)
	writeKey: '31e5cf8e0dd308948a36e0be4158577f4f8ad589c1a07939608977f23add7f50b7bdfebc9bab874611ab8477fff5134a82c64d1bef38afb56ca18cfe964ccf09024ad474b97ac4b12de413002d560c5fb7be7d9648993f73cafc2a0e17e01dca',   // String (required for sending data)
	readKey: '632ebb3407ddb2047e0f7c505c097e2af55b13479a606e44142920ae2f1284db72cca1817cce8cbaa16620f4e3dadd719fb8972e5cd20f585b2094f160f0da68082e8388b97dc82a026caea995e3f6c33e8b3440e4703050dcddbac8af704a82'      // String (required for querying data)

  });
  // Create a data object with the properties you want to send

	var purchaseEvent = {
	  "data": [
	    {
		  item: "golden gadget",
		  price: 2550, // track dollars as cents
		  referrer: document.referrer,
		  keen: {
			timestamp: new Date().toISOString()
		  }
		}
	  ]
	};

	var multipleEvent = {
	  "purchases": [
		{ item: "golden gadget the new ", price: 2550, transaction_id: "f029342" },
		{ item: "a different gadget the new", price: 1775, transaction_id: "f029342" }
	  ],
	  "transactions": [
		{
		  id: "f02934212",
		  items: 2,
		  total: 4325
		}
	  ]
	};

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
		/*var userdata = {

			"data": [

				{
				  page: window.location.href,
				  platform: navigator.platform,
				  vendor: navigator.vendor,
				  language: navigator.language,
				  languages: navigator.languages,
				  referrer: document.referrer,
				  timestamp: new Date().toISOString()
				}
			]
		};*/
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
		//console.log(userdata);
		//send(userdata);
		//console.log("Sent", cookiedata);
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

$(document).ready(function(){

	$("a").click(function(){

		localStorage.setItem("nextUrl",this.href);
	});
});
/*
window.onunload = function(){

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
	  cookie: getCookie("WT")
	};
	send(userdata);
	console.log("Unload",userdata);
};
*/
