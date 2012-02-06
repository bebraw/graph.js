define(['bunit', 'assert', 'graph'], function(bunit, assert, graph) {
    bunit('Graph', {
        setUp: function() {
            return [graph(), {}, {}];
        },
        empty: function(a) {
            this._len(a, 'nodes', 0);
        },
        add: function(a, n) {
            a.add(n);
            this._len(a, 'nodes', 1);
        },
        remove: function(a, n) {
            a.add(n);
            a.remove(n);
            this.empty(a);
        },
        link: function(a, n1, n2) {
            a.add(n1);
            a.add(n2);
            a.link(n1, n2);
            this._len(a, 'links', 1);
        },
        unlink: function(a) {
            this.link(a);
            a.unlink(a.nodes[0], a.nodes[1]);
            this._len(a, 'links', 0);
        },
        access: function(a, n1) {
            a.add(n1);
            assert(a.nodes[0]).equals(n1);
        },
        _len: function(a, attr, val) {
            assert(a[attr].length).equals(val || 0);
        }
    });
});
