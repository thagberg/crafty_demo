define([], function() {
    var maths = {};

    maths.angleBetweenPoints = function(p1, p2) {
        var dX = p2.x - p1.x;
        var dY = p2.y - p1.y;

        return Math.atan2(dY, dX) * 180 / Math.PI;
    }

    return maths;
})