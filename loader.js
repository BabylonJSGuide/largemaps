var onmessage = function(e) {	
	var row = e.data[0];
	var col = e.data[1];
	var mapRow = e.data[2];
	var mapCol = e.data[3];
	var nbRows = e.data[4];
	var nbCols = e.data[5];	
	var url = "block" + ((nbRows + row + mapRow) % nbRows) + "_" + ((nbCols + col + mapCol) % nbCols) + ".babylon";	
	fetch(url, function(xhr) {
		postMessage([xhr.responseText, row, col]);
		
	});
};


	//simple XHR request in pure raw JavaScript
	function fetch(url, callback) {
		var xhr;
		
		//console.log(url);

		if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
		else {
			var versions = ["MSXML2.XmlHttp.5.0", 
			 				"MSXML2.XmlHttp.4.0",
			 			    "MSXML2.XmlHttp.3.0", 
			 			    "MSXML2.XmlHttp.2.0",
			 				"Microsoft.XmlHttp"]

			 for(var i = 0, len = versions.length; i < len; i++) {
			 	try {
			 		xhr = new ActiveXObject(versions[i]);
			 		break;
			 	}
			 	catch(e){}
			 } // end for
		}
		
		xhr.onreadystatechange = ensureReadiness;
		
		function ensureReadiness() {
			if(xhr.readyState < 4) {
				return;
			}
			
			if(xhr.status !== 200) {
				return;
			}

			// all is well	
			if(xhr.readyState === 4) {
				callback(xhr);
			}			
		}
		
		xhr.open('GET', url, true);
		xhr.send('');
	}