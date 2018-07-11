function addUrlParameter(url, param, value){
  var hash       = {};
  var parser     = document.createElement('a');

  parser.href    = url;

  var parameters = parser.search.split(/\?|&/);

  for(var i=0; i < parameters.length; i++) {
    if(!parameters[i])
      continue;

    var ary      = parameters[i].split('=');
    hash[ary[0]] = ary[1];
  }

  hash[param] = value;

  var list = [];
  Object.keys(hash).forEach(function (key) {
    list.push(key + '=' + hash[key]);
  });

  parser.search = '?' + list.join('&');
  return parser.href;
}

$.keepFormData={};(function(){var a={}.hasOwnProperty;$.keepFormData.Util={"extends":function(c,d){function b(){this.constructor=c}for(var e in d)a.call(d,e)&&(c[e]=d[e]);b.prototype=d.prototype;c.prototype=new b;c.__super__=d.prototype;return c}}})();
(function(){function a(a,d,b){this.form=a;this.node=d;this.save_events=b||"change paste keyup blur";this.attach_save_value_handler();this.load_value();this.node.data("keepFormDataInstance",this)}a.prototype.get_key=function(){this.key||(this.key=this.form.key(this.node.attr("name")));return this.key};a.prototype.clear_value=function(){localStorage.removeItem(this.get_key())};a.prototype.save_value=function(){localStorage.setItem(this.get_key(),this.get_value())};a.prototype.load_value=function(){var a=
  localStorage.getItem(this.get_key());this.set_value(a)};a.prototype.get_value=function(){return this.node.val()};a.prototype.set_value=function(a){void 0===a||null===a?this.node.val(this.node.attr("value")||this.node.text()):this.node.val(a)};a.prototype.attach_save_value_handler=function(){var a=this;this.node.on(this.save_events,function(){a.save_value()})};$.keepFormData.Input=a})();
(function(){function a(c,d){a.__super__.constructor.call(this,c,d,"change keyup blur")}$.keepFormData.Util["extends"](a,$.keepFormData.Input);a.prototype.set_value=function(a){void 0===a||null===a?$("option[selected]",this.node).prop("selected","selected"):this.node.val(a)};$.keepFormData.Select=a})();
(function(){function a(c,d){a.__super__.constructor.call(this,c,d,"change keyup blur")}$.keepFormData.Util["extends"](a,$.keepFormData.Input);a.prototype.get_value=function(){return this.node.is(":checked")?"1":"0"};a.prototype.set_value=function(a){switch(a){case "1":this.node.prop("checked",!0);break;case "0":this.node.prop("checked",!1);break;default:this.node.prop("checked",this.node.is("[checked]"))}};$.keepFormData.CheckBox=a})();
(function(){function a(c,d){a.__super__.constructor.call(this,c,d,"change keyup blur")}$.keepFormData.Util["extends"](a,$.keepFormData.Input);a.prototype.get_value=function(){return this.node.is(":checked")?this.node.val():void 0};a.prototype.set_value=function(a){this.node.prop("checked",a===this.node.val())};$.keepFormData.Radio=a})();
(function(){function a(a,b,c){this.node=a;this.prefix=b;this.name=this.guess_name(this.node);this.inputs=this.create_inputs(this.node);(this.clear_on_submit=this.clear_on_submit_value(c))&&this.attach_clear_handler()}var c={1:!0,"true":!0,on:!0,yes:!0};a.prototype.key=function(a){return this.prefix+"["+this.name+"]["+a+"]"};a.prototype.clear_on_submit_value=function(a){if(0<this.inputs.length){var b=this.node.data("keep-form-data-clear-on-submit");void 0!==b&&(b=b.toString().toLowerCase(),a=!0===
  c[b])}else a=!1;return a};a.prototype.guess_name=function(a){var b;if((b=a.attr("id"))&&0<b.length)return b;this.warn("Cannot use jQuery keepFormData \u2013 need id attr for <form>")};a.prototype.warn=function(a){console&&console.warn&&console.warn(a)};a.prototype.attach_clear_handler=function(){var a=this;this.node.on("submit",function(){a.clear_saved_values()})};a.prototype.clear=function(){this.clear_saved_values();for(var a=this.inputs,b=0,c=a.length;b<c;b++)a[b].load_value()};a.prototype.clear_saved_values=
  function(){for(var a=this.inputs,b=0,c=a.length;b<c;b++)a[b].clear_value()};a.prototype.create_inputs=function(a){var b=this;return $("input, textarea, select",a).map(function(){return b.input_factory($(this))})};a.prototype.input_factory=function(a){var b;if(this.available_to_keep(a))switch(a.attr("type")){case "checkbox":b=new $.keepFormData.CheckBox(this,a);break;case "radio":b=new $.keepFormData.Radio(this,a);break;case "hidden":break;default:b=a.is("select")?new $.keepFormData.Select(this,a):
  new $.keepFormData.Input(this,a)}return b};a.prototype.available_to_keep=function(a){a=a.attr("name");return void 0!==a&&0<a.length};$.keepFormData.Form=a})();
(function(a){a.keepFormData.defaults={storage_keys_prefix:"keepFormData",form_selector:"form.keepFormData",clear_on_submit:!0};var c=a.keepFormData.defaults;a.fn.keepFormData=function(d){var b=a.extend({},c,d);d=a(this);b=new a.keepFormData.Form(d,b.storage_keys_prefix,b.clear_on_submit);d.data("keepFormDataInstance",b);return d};c.form_selector&&a(document).ready(function(){a(c.form_selector).each(function(){a(this).keepFormData()})})})(jQuery);
