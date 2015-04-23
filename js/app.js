$(function(){
uuid = PUBNUB.uuid();
function pubinit(pubChannel, subchannel) {
      pubnub = PUBNUB.init({
          publish_key   : 'pub-c-cccc9d9c-50db-4aba-9f5f-11a800dd17b5',
          subscribe_key : 'sub-c-5e2f4258-e7dc-11e4-8e57-02ee2ddab7fe'
      });
      pubnub.subscribe({
         channel: subchannel,
         message: function(message){$('.well').text(message);},
         error: function (error) {
           // Handle error here
           console.log(JSON.stringify(error));
       }
      });
}

$('#todoapp').hide();
$('#connect').click(showApp);
function showApp() {
  $('#todoapp').show();
  $('#channel').hide();
  pubinit($('#me').val(), $('#friend').val());
}
$('#new-todo').keyup(chatOn);

function chatOn(e) {
  pubnub.publish({
      channel: $('#me').val(),
      message: $('#new-todo').val()
  });

  clearInput();
  //$('.well').text($('#new-todo').val());
}


var alarm = {
  remind: function(aMessage) {
    alert(aMessage);
    delete this.timeoutID;
  },

  clear: function(){
    $('#new-todo').val('');
    $('.well').text('');
  },

  setup: function() {
    this.cancel();
    var self = this;
    this.timeoutID = window.setTimeout(function(){self.clear();}, 2000, "Wake up!");
  },

  cancel: function() {
    if(typeof this.timeoutID == "number") {
      window.clearTimeout(this.timeoutID);
      delete this.timeoutID;
    }
  }
};
function clearInput() {
 alarm.setup();
}

});
