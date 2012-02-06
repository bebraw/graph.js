define(function() {
    return function() {
        return {
            nodes: [],
            links: [],
            length: 0,
            add: function(a) {
                this.nodes.push(a);
            },
            remove: function(a) {
                this.nodes.pop();
            },
            link: function(from, to) {
                if(from != to) {
                    this.links.push([from, to]);
                }
            },
            unlink: function(a) {
                this.links.pop();
            }
        };
    };
});

