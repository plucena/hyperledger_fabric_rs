var Service = require('node-service-linux').Service;
 
  // Create a new service object
  var svc = new Service({
    name:'Composer',
    description: 'The nodejs.org example web server.',
    script: '/root/.nvm/versions/node/v8.10.0/bin/composer-rest-server -c admin@events10 -p 80 -n never'
  });
 
  // Listen for the "install" event, which indicates the
  // process is available as a service.
  svc.on('install',function(){
    svc.start();
  });
 
  svc.install();
