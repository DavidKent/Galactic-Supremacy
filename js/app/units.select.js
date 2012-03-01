App.Selections.applyHandle = function() { 
    $('.gs-container').mousedown(this.selectionStart);
    $('.gs-container').mousemove(this.whileSelecting);
    $('.gs-container').mouseup(this.selectionEnd);
};

App.Selections.selectionStart = function(e) {
    var parent = App.Selections;
    parent.startLoc = { top: e.pageY, left: e.pageX };
    parent.selector.offset( parent.startLoc );
    parent.isSelecting = true;
    parent.selector.show();
};

App.Selections.whileSelecting = function(e) {
    var parent = App.Selections;
    if(!parent.isSelecting) return;
    parent.selector.height( e.pageY - parent.startLoc.top );
    parent.selector.width( e.pageX - parent.startLoc.left );
};

App.Selections.selectionEnd = function(e) {
    var parent = App.Selections;
    parent.isSelecting = false;
    parent.selector.hide();
};

App.Selections.loadSelector = function() {
    this.selector = $(document.createElement('div'));
    this.selector.addClass('selectionBox');
    $('.gs-container').append(this.selector);
    this.selector.hide();
};

(function() {
    var parent = App.Selections;
    parent.loadSelector();
    parent.applyHandle();
})();
