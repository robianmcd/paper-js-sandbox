// Only executed our code once the DOM is ready.
window.onload = function () {
    paper.install(window);

    var canvas = document.getElementById('myCanvas');
    paper.setup(canvas);

    var nodes = [];

    for (var i = 0; i < 20; i++) {
        var x = Math.random() * 500;
        var y = Math.random() * 500;
        var node = new Point(x, y);
        var path = new Path.Circle(node, 3);
        path.strokeColor = 'black';
        path.fillColor = 'blue';

        if(Math.random() > 0.5) {
            var closest = findClosest(node, nodes);
            if(closest.point) {
                var randomLine = new Path([node, closest.point]);
                randomLine.strokeColor = 'black';
                console.log(closest);
            }
        }

        nodes.push(node);

        var dude = new Path.Rectangle(new Point(node.x + 6, node.y + 6), new Size(2, 2));
        dude.strokeColor = 'green';
        (function(d, n){
            var speed = Math.random() * 5;

            d.onFrame = function () {
                d.rotate(1 + speed, n);
            };
        })(dude, node);
    }



    function findClosest(targetPoint, points) {
        var closestPoint = null;
        var closestDistance = null;

        points.forEach(function (point) {
            var path = new Path([targetPoint, point]);
            if (closestDistance === null || path.length < closestDistance) {
                closestPoint = point;
                closestDistance = path.length;
            }
        });

        return {point: closestPoint, distance: closestDistance};
    }


    var tool = new Tool();
    tool.data = {};
    // Define a mousedown and mousedrag handler
    tool.onMouseDown = function (event) {
        tool.data.path = new Path();
        tool.data.path.strokeColor = 'black';

        var closest = findClosest(event.point, nodes);

        tool.data.path.add(closest.point);
        tool.data.path.add(closest.point);

    };

    tool.onMouseDrag = function (event) {
        tool.data.path.removeSegment(1);

        var closest = findClosest(event.point, nodes);

        var endPoint = null;

        if (closest.distance < 20) {
            endPoint = closest.point;
            tool.data.endPoint = closest.point;
        } else {
            endPoint = event.point;
            tooldata.endPoint = null;
        }

        tool.data.path.add(endPoint);
    };

    tool.onMouseDrag = function (event) {
        tool.data.path.removeSegment(1);

        var closest = findClosest(event.point, nodes);

        var endPoint = null;

        if (closest.distance < 20) {
            endPoint = closest.point;
            tool.data.endPoint = closest.point;
        } else {
            endPoint = event.point;
            tool.data.endPoint = null;
        }

        tool.data.path.add(endPoint);
    };

    tool.onMouseUp = function (event) {
        if (!tool.data.endPoint) {
            tool.data.path.removeSegments(0, 1);
        }
    };

    paper.view.draw();
};