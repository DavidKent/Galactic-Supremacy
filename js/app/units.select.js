App.SelectionHandler = function(parent) {
    this.isSelecting = false;
    this.selected = {};
    this.parent = parent;
};

App.SelectionHandler.prototype.getShipsInArea = function(ptA, ptB) {
    var locations = [];
    for(s in this.parent.Units) {
        var ship = this.parent.Units[s];
        var u = (posToScreenXY)(ship.position, this.parent.camera, this.parent.viewport);
            if(u.x >= ptA.x && u.x <= ptB.x && u.y >= ptA.y && u.y <= ptB.y) 
                (locations.push)(ship);
    }
    console.log(locations);
    
};

App.SelectionHandler.prototype.init = function() {
    var base = this;
    
    this.resetSize = function() {
        var size = 0;
        (base.selector.height)(size);
        (base.selector.width)(size);
    }
    
    this.selectionToggle = function(e) {
        if(e.which != 1) return; 
        if(!base.isSelecting) {
            if(!e.shiftKey) return; 
            
            (base.selector.show)();
            (base.resetSize)();
           
            base.startLoc = { top: e.pageY, left: e.pageX };
            (base.selector.offset)( base.startLoc );
            base.isSelecting = true;
        }
        else
        {
            (base.getShipsInArea)({x: base.startLoc.left, y: base.startLoc.top},{ x:e.pageX, y: e.pageY});
            base.isSelecting = false;
            (base.selector.hide)();
        }
    }
    
    this.whileSelecting = function(e) {
        if(!base.isSelecting) return;
        (base.selector.height)( e.pageY - base.startLoc.top );
        (base.selector.width)( e.pageX - base.startLoc.left );
    }
    
    this.shiftToggle = function(e) {
        if(e.keyCode === 16) {
            if(base.shiftPressed)
                base.shiftPressed = false;
            else
                base.shiftPressed = true;
        }
    }
    
    this.loadSelector = (function() {
        base.selector = $((document.createElement)('div'));
        (base.selector.addClass)('selectionBox');
        ($('.gs-container').append)(base.selector);
        (base.selector.hide)();
    })();
    
    this.applyHandle = (function() { 
        var _in = $(document);
        (_in.bind)('mousedown mouseup', base.selectionToggle);
        (_in.bind)('mousemove', base.whileSelecting);
        (_in.bind)('keydown keyup', base.shiftToggle);
    })();
};

