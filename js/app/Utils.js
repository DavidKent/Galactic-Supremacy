//helpful functions
function degreesToRadians(degrees){
    return (eval(degrees))*(Math.PI/180);
};

function radiansToDegrees(radians){
    return (eval(radians))*(180/Math.PI);
};

function posToScreenXY(position, camera, viewport) {
    var pos = position.clone();
    projScreenMat = new THREE.Matrix4();
    projScreenMat.multiply( camera.projectionMatrix, camera.matrixWorldInverse );
    projScreenMat.multiplyVector3( pos );
    return { x: (( pos.x + 1 ) * viewport.width() / 2 + viewport.offset().left),
        y: (( - pos.y + 1) * viewport.height() / 2 + viewport.offset().top) };
};