
//////////////////////////////////////////////////// RELATED TO KEEN.IO ////////////////////////////////////////

var client = new Keen({
	projectId: '58ac414f8db53dfda8a885d3', // String (required always)
	writeKey: 'B9207BB668E4A37CCEF39253F8CBF891EB7EE856E9CCCF66970A782B1AE4CB0370ED3AD4F68C2CDE4236E0CACEFCC7C40CC459A355F28D96981CD3E2FD81954F2D1D1072CDF503CA21BA9CF711B4C3F835A3C67B8D27A0DF6DFF36C7CDDCA753',   // String (required for sending data)
	readKey: '12F3D0E6BA16F21DF09BFE72A52AACB56ECD1247C8FDD8F9C18504A3EDD85BE1DEC8A937E01A83C9186C8DEE3A7A6218F020DFEBA64EC6D9D5C184A0EE4D10D1003997B3F38E11318B4CE8BA8AB5BE7D8136187112B1262F9A55884AE6A0F369'      // String (required for querying data)

  });

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
		send(userdata);
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
/*
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
*/
