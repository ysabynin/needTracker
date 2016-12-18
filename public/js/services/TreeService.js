app.service('TreeService',  function (LocationService) {
    var margin, width, height;
    var i, duration, root;
    var radius;
    var tree, diagonal, svg, div;

    var init = function () {
        margin = {top: 10, right: 10, bottom: 10, left: 70};
        width = 960 - margin.right - margin.left;
        height = 500 - margin.top - margin.bottom;

        i = 0;
        duration = 750;

        radius = 30;

        tree = d3.layout.tree()
            .size([height, width]);

        diagonal = d3.svg.diagonal()
            .projection(function (d) {
                return [d.y, d.x];
            });

        svg = d3.select("#tree svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        div = d3.select("#tree .tooltip")
            .style("opacity", 0);
    };

    var render = function (needToInit) {
        if(needToInit)
            init();

        d3.json("http://localhost:8080/api/v1/users/ysabynin/tree/needs"/*"graph.json"*/, function (error, data) {

            if (error) throw error;
            var flare = {};
            flare["title"] = "Needs";
            flare["children"] = data.children["needs"];

            root = flare;
            root.x0 = height / 2;
            root.y0 = 0;

            function collapse(d) {
                if (d.children) {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }
            }

            root.children.forEach(collapse);
            update(root);
            d3.select("#tree").style("height", "500px");

        });
    };

    function update(source) {

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function (d) {
            d.y = d.depth * 180;
        });

        // Update the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function (d) {
                return d.id || (d.id = ++i);
            });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on("dblclick", click)
            .on("click", hover)
            .on("mouseover", function (d) {
                if(d.cost){
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html(/*d.name + "<br/>" + */d.cost +" руб.")
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 58) + "px");
                }
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(5000)
                    .style("opacity", 0);
            });

        nodeEnter.append("circle")
            .attr("r", radius)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeEnter.append("text")
            .attr("x", function (d) {
                return d.children || d._children ? 10 : -25;
            })
            .attr("y", function (d) {
                return -5;
            })
            .attr("dy", ".7em")
            .attr("text-anchor", function (d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function (d) {
                return d.title/* + " " + d.cost*/;
            })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        nodeUpdate.select("circle")
            .attr("r", radius)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        nodeExit.select("circle")
            .attr("r", radius);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = svg.selectAll("path.link")
            .data(links, function (d) {
                return d.target.id;
            });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function (d) {
                var o = {x: source.x0, y: source.y0};
                return diagonal({source: o, target: o});
            });

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function (d) {
                var o = {x: source.x, y: source.y};
                return diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

// Toggle children on click.
    function click(d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }

    function hover(d) {
        var uri = d._id ? '/needs/'+ d._id : '/needs';
        LocationService.changeLocation(uri);
    }

    return {
        render: render
    }
});
