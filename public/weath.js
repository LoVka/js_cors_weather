// Create the XHR object.
            function createCORSRequest(method, url) {
              var xhr = new XMLHttpRequest();
              if ("withCredentials" in xhr) {
                // XHR for Chrome/Firefox/Opera/Safari.
                xhr.open(method, url, true);
              } else if (typeof XDomainRequest != "undefined") {
                // XDomainRequest for IE.
                xhr = new XDomainRequest();
                xhr.open(method, url);
              } else {
                // CORS not supported.
                xhr = null;
              }
              return xhr;
            }

            var xhr = createCORSRequest('GET', "http://127.0.0.1:7000/todays_weather.json");

            if (xhr) {
              // Response handlers.
              xhr.onload = function() {
                var text = xhr.responseText;
                // alert('Response from CORS request: ' + text);
                var weather = JSON.parse(text);

                var weather_block = document.getElementById('weather-block');
                //weather_block.innerHTML += text;

                weather.collection.forEach(function(entry) {
                  weather_block.innerHTML += entry.date + " : " + entry.temperature + "<br/>";
                });
              };
              xhr.send();
            }