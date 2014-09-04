window.Key = {

  getKeyCode: function(e) {
    return (e.keyCode || e.which);
  },

  isCharacter: function(code) {
    // 65 = a
    // 90 = z
    return code > 64 && code < 91;
  },

  isNumber: function(code) {
    // 48 = 0
    // 57 = 9
    return code > 47 && code < 58;
  },

  isBackspace: function(code) {
    return code == 8;
  },

  isArrow: function(code) {
    return this.isLeftRightArrow(code) || this.isUpDownArrow(code);
  },

  isLeftArrow: function(code) {
    return code == 37;
  },

  isRightArrow: function(code) {
    return code == 39;
  },

  isLeftRightArrow: function(code) {
    return this.isLeftArrow(code) || this.isRightArrow(code);
  },

  isUpArrow: function(code) {
    return code == 38;
  },

  isDownArrow: function(code) {
    return code == 40;
  },

  isUpDownArrow: function(code) {
    return this.isUpArrow(code) || this.isDownArrow(code);
  },
};
