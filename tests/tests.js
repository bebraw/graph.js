define(['bunit', 'assert', 'graph'], function(bunit, assert, graph) {
    bunit('Graph', {
        setUp: function() {
            return [graph(), {x: 0, y: 0}, {x: 10, y: 20}, {x: -3, y: -5}];
        },
        empty: function(a) {
            this._len(a, 'nodes', 0);
            this._len(a, 'links', 0);
        },
        add: function(a, n) {
            a.add(n);
            this._len(a, 'nodes', 1);
        },
        addSame: function(a, n) {
            this.add(a, n);
            this.add(a, n);
        },
        remove: function(a, n) {
            a.add(n);
            a.remove(n);
            this.empty(a);
        },
        removeOther: function(a, n) {
            a.remove(n);
            this.empty(a);
        },
        link: function(a, n1, n2) {
            this._link(a, n1, n2);
            this._len(a, 'links', 1);
        },
        linkBidi: function(a, n1, n2) {
            this.link(a, n1, n2);
            this._link(a, n2, n1);
            this._len(a, 'links', 2);
        },
        linkItself: function(a, n) {
            a.add(n);
            a.link(n, n);
            this._len(a, 'links', 0);
        },
        linkOther: function(a, n1, n2) {
            a.link(n1, n2);
            this._len(a, 'links', 0);
        },
        unlink: function(a, n1, n2) {
            this.link(a, n1, n2);
            a.unlink(n1, n2);
            this._len(a, 'links', 0);
        },
        unlinkInverse: function(a, n1, n2) {
            this.link(a, n1, n2);
            a.unlink(n2, n1);
            this._len(a, 'links', 1);
        },
        unlinkBidi: function(a, n1, n2) {
            this.linkBidi(a, n1, n2);
            a.unlink(n1, n2);
            this._len(a, 'links', 1);
        },
        unlinkOther: function(a, n1, n2, other) {
            this.link(a, n1, n2);
            a.unlink(n1, other);
            this._len(a, 'links', 1);
        },
        access: function(a, n1) {
            a.add(n1);
            assert(a.nodes.get(0)).equals(n1);
        },
        getLink: function(a, n1, n2) {
            this.link(a, n1, n2);
            assert(a.links.get(n1, n2)).equals([n1, n2]);
        },
        getInvalidLink: function(a, n1, n2) {
            assert(a.links.get(n1, n2)).not().isDefined();
        },
        _link: function(a, n1, n2) {
            a.add(n1);
            a.add(n2);
            a.link(n1, n2);
        },
        _len: function(a, attr, val) {
            assert(a[attr].length()).equals(val || 0);
        }
    });
});
