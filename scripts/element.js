window.Element = {

  isChecked: function(el) {
    return el.is(':checked');
  },

  isEmpty: function(el) {
    return el.is(':empty');
  },

  isActive: function(el) {
    return el.hasClass('active');
  },

  activate: function(el) {
    el.addClass('active');
    return Element;
  },

  deactivate: function(el) {
    el.removeClass('active');
    return Element;
  },

  show: function(el) {
    el.show();
    return Element;
  },

  hide: function(el) {
    el.hide();
    return Element;
  },

  getClosestSetting: function(el) {
    return el.closest('.setting');
  },
};
