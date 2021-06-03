'use strict';
document.addEventListener('DOMContentLoaded', function () {
    function uhrzeit() {
		var days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
		var Monate = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"]
		var jetzt = new Date(),
			h = jetzt.getHours(),
			m = jetzt.getMinutes(),
			s = jetzt.getSeconds();
			var d = jetzt.getDay();
			var D = jetzt.getDate();
			var M = jetzt.getMonth();
			var y = jetzt.getFullYear();

		d = days[parseInt(d)]
		M = Monate[parseInt(M)]
		m = fuehrendeNull(m);
		s = fuehrendeNull(s);
		document.getElementById('uhr')
			.innerHTML = h + ':' + m;
		document.getElementById("date")
			.innerHTML = d + ", " + D + ". " + M + " " + y

		setTimeout(uhrzeit, 1000);

	}

	function FensterJungs(){
		
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				Anzeigen(this, "Fenster");
			}
		 };
		xmlHttp.open( "GET", "http://ccu3/config/xmlapi/state.cgi?device_id=1419&datapoint_id=1449", true);		//ccu3 Devicelist:http://ccu3/config/xmlapi/devicelist.cgi
		xmlHttp.send();

		setTimeout(FensterJungs, 1000);

	}

	function Anzeigen(xml, element) {
		var dings = document.getElementById(element);

		var xmlDoc = xml.responseXML;
		var x = xmlDoc.getElementsByTagName('datapoint');
		if (x[0].getAttribute('value') == "0") {
			dings.innerHTML = "Fenster geschlossen";
		}
		else {
			dings.innerHTML = "Fenster offen";
		}
	}

	function AnzeigenTemp(xml, element) {
		var dings = document.getElementById(element);

		var xmlDoc = xml.responseXML;
		var x = xmlDoc.getElementsByTagName('datapoint');
		var RealTemp = parseInt(x[0].getAttribute('value'));
		dings.innerHTML = "Temperatur: " + RealTemp + " °C"
	}

	function FensterMaya(){
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				Anzeigen(this, "FensterMaya");
			}
		 };
		xmlHttp.open( "GET", "http://ccu3/config/xmlapi/state.cgi?device_id=1511&datapoint_id=1541", true);
		xmlHttp.send();

		//console.log("WWW " + x[0].getAttribute('value'));
		setTimeout(FensterMaya, 1000);

	}

	function FensterKüche(){
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				Anzeigen(this, "FensterK");
			}
		 };
		xmlHttp.open( "GET", "http://ccu3/config/xmlapi/state.cgi?device_id=1269&datapoint_id=1299", true);
		xmlHttp.send();

		//console.log("WWW " + x[0].getAttribute('value'));
		setTimeout(FensterKüche, 1000);

	}

	function TempJungs(){
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				AnzeigenTemp(this, "TempJ");
			}
		 };
		xmlHttp.open( "GET", "http://ccu3/config/xmlapi/state.cgi?device_id=1357&datapoint_id=1388", true);
		xmlHttp.send();

		//console.log("TTT " + RealTemp);
		setTimeout(TempJungs, 60000);

	}

	function TempMaya(){
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				AnzeigenTemp(this, "TempM");
			}
		 };

		xmlHttp.open( "GET", "http://ccu3/config/xmlapi/state.cgi?device_id=1452&datapoint_id=1483", true);
		xmlHttp.send();

		//console.log("TTT " + RealTemp);
		setTimeout(TempMaya, 60000);

	}

	function TempKüche(){
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				AnzeigenTemp(this, "TempK");
			}
		 };
		xmlHttp.open( "GET", "http://ccu3/config/xmlapi/state.cgi?device_id=1542&datapoint_id=1564", true);
		xmlHttp.send();

		//console.log("TTT " + RealTemp);
		setTimeout(TempKüche, 60000);

	}

	function TempWozi(){
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				AnzeigenTemp(this, "TempW");
			}
		 };
		xmlHttp.open( "GET", "http://ccu3/config/xmlapi/state.cgi?device_id=1238&datapoint_id=1260", true);
		xmlHttp.send();

		//console.log("TTT " + RealTemp);
		setTimeout(TempKüche, 60000);

	}
	
	function TempTable(){
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {

				var xmlDoc = xmlHttp.responseXML;
				var x = xmlDoc.getElementsByTagName("time");
				for (var i = 0; i < x.length; i++) {
					

					var dings = document.getElementById("time" + i)

					var y = x[i].getAttribute('to');
					var Zeit = y.slice(-8, -3);
					dings.innerHTML = Zeit

					var dings = document.getElementById("temp" + i)

					var y = x[i].getElementsByTagName("temperature")
					var RTemp = y[0].getAttribute("value")
					var RRTemp = parseInt(RTemp)

					dings.innerHTML = RRTemp + " °C"

					var dings = document.getElementById("bild" + i)

					var y = x[i].getElementsByTagName("symbol")
					var RBild = y[0].getAttribute("var")
					dings.src = "http://openweathermap.org/img/wn/" + RBild + "@2x.png"

					var dings = document.getElementById("PoP" + i)

					var y = x[i].getElementsByTagName("precipitation")
					var PoP = y[0].getAttribute("probability")
					var o = Number(PoP) * 100
					dings.innerHTML = parseInt(o) + "%"

				}	
				
			}
		}
		xmlHttp.open( "GET", "http://api.openweathermap.org/data/2.5/forecast?q=Freyung&appid=31a6adf2cfb9695779003d5a283ce933&units=metric&mode=xml&cnt=15&lang=de", true);
		xmlHttp.send();

		setTimeout(TempTable, 3600000)
	}



	function fuehrendeNull(zahl) {
		zahl = (zahl < 10 ? '0' : '') + zahl;
		return zahl;
	}

    console.log("bla");
    uhrzeit();
	FensterJungs();
	TempJungs();
	FensterMaya()
	TempMaya();
	FensterKüche();
	TempKüche();
	TempWozi();
	TempTable();
 
});