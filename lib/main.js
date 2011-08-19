
var workers = [];
 
var data = require("self").data;

function detachWorker(worker, workerArray) {
  var index = workerArray.indexOf(worker);
  if(index != -1) {
    workerArray.splice(index, 1);
  }
}
 
var pageMod = require("page-mod").PageMod({
  include: ['*.craigslist.ca'],
  contentScriptWhen: 'end',
  contentScript: 'self.on("message", function(data) { clPreviewInit() });',
  contentScriptFile: [data.url('jquery-1.6.2.min.js'), data.url('mod_script.js')],
  onAttach: function(worker) {
    workers.push(worker);
    worker.on('detach', function () {
      detachWorker(this, workers);
    });
    
    worker.postMessage('init');
    
  }
});
