var Selection = {};


Selection.onReady = function() {
    Selection.buildSelector();
    $(document).mousedown(Selection.onMouseDown);
};

Selection.onMouseDown = function(e) { 
    Selection.selector.show();
    Selection.selector.position.left = $(e.target).position.left;
    Selection.selector.position.top = $(e.target).position.top;

};

Selection.buildSelector = function() {
    Selection.selector = $(document.createElement('div'));
    Selection.selector.addClass('selector');
    Selection.selector.css('width','100px');
    Selection.selector.css('height','100px');    
    $('.gs-viewport').append(Selection.selector);
};

$(document).ready(Selection.onReady);