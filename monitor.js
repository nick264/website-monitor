http = require('http');
sms = require('./sms.js');

config = [
  {
    url: "http://www.publictheater.org/Programs--Events/Emerging-Writers-Group/About-EWG/",
    text: "The information below applies to the selection process for the 2015 class"
  },
  {
    url: "http://sohorep.org/lab-application",
    text: "through May 2015"
  }
];

checkUrl = function(url,text,onFail) {
  console.log("Checking url " + url + "...");
  http.get(url, function(response) {
    var body = '';
    
    response.on('data', function(chunk) {
      body += chunk;
    });

    response.on('end', function() {
      console.log("Fetched html for url " + url + ", now checking...");
      
      if(body.indexOf(text) == -1) {
        console.log("Failure for " + url);
        onFail();
      }
      else {
        console.log("Success for " + url);
      }
    });
  });
}

config.forEach(function(conf) {
  var timerId = setInterval( function() {
    checkUrl(conf.url,conf.text, function(){
      console.log("THIS IS WHERE I'D SEND A TEXT FOR " + conf.url);
      console.log("STOPPING TIMER FOR " + conf.url);
      sms.send('+14694714755', "Looks like the site for " + conf.url + " has changed!");
      sms.send('+16178380605', "Looks like the site for " + conf.url + " has changed!");
      clearInterval(timerId);
    });
  }, 1000 * 60 * 10);
} );