define(['bunit', 'assert', 'graph'], function(bunit, assert, graph) {
    var common = {
        setUp: function() {
            return [graph(), {x: 0, y: 0}, {x: 10, y: 20}, {x: -3, y: -5}];
        },
        _link: function(a, n1, n2) {
            a.add(n1, n2);
            a.link(n1, n2);
        },
        _len: function(a, attr, val) {
            assert(a[attr].length()).equals(val || 0);
        },
        _empty: function(a) {
            this._len(a, 'nodes', 0);
            this._len(a, 'links', 0);
        },
    };

    function extend(a, b) {
        var ret = {};

        for(var k in a) {
            ret[k] = a[k];
        }

        for(k in b) {
            ret[k] = b[k];
        }

        return ret;
    }

    bunit('Graph', extend(common, {
        empty: function(a) {
            this._empty(a);
        },
        access: function(a, n1) {
            a.add(n1);
            assert(a.nodes.get(0)).equals(n1);
        },
        each: function(a, n1, n2) {
            var is = 0;
            var ns = 0;

            a.add(n1, n2);
            a.nodes.each(function(n, i) {
                ns++;
                is++;
            });

            assert(is).equals(2);
            assert(ns).equals(2);
        }
    }));

    bunit('Add', extend(common, {
        add: function(a, n) {
            a.add(n);
            this._len(a, 'nodes', 1);
        },
        addSame: function(a, n) {
            this.add(a, n);
            this.add(a, n);
        },
        addMultiple: function(a, n1, n2) {
            a.add(n1, n2);
            this._len(a, 'nodes', 2);
        },
        addSameWithMultiple: function(a, n1, n2) {
            this.add(a, n1);
            this.addMultiple(a, n1, n2);
        }
    }));

    bunit('Remove', extend(common, {
        remove: function(a, n) {
            a.add(n);
            a.remove(n);
            this._empty(a);
        },
        removeMultiple: function(a, n1, n2) {
            a.add(n1, n2);
            a.remove(n1, n2);
            this._empty(a);
        },
        removeOther: function(a, n) {
            a.remove(n);
            this._empty(a);
        }
    }));

    bunit('Link', extend(common, {
        link: function(a, n1, n2) {
            this._link(a, n1, n2);
            this._len(a, 'links', 1);
        },
        linkBidi: function(a, n1, n2) {
            this._link(a, n1, n2);
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
        getLink: function(a, n1, n2) {
            this._link(a, n1, n2);
            assert(a.links.get(n1, n2)).equals([n1, n2]);
        },
        getInvalidLink: function(a, n1, n2) {
            assert(a.links.get(n1, n2)).not().isDefined();
        },
    }));

    bunit('Unlink', extend(common, {
        unlink: function(a, n1, n2) {
            this._link(a, n1, n2);
            a.unlink(n1, n2);
            this._len(a, 'links', 0);
        },
        unlinkInverse: function(a, n1, n2) {
            this._link(a, n1, n2);
            a.unlink(n2, n1);
            this._len(a, 'links', 1);
        },
        unlinkBidi: function(a, n1, n2) {
            this._link(a, n1, n2);
            this._link(a, n2, n1);
            a.unlink(n1, n2);
            this._len(a, 'links', 1);
        },
        unlinkOther: function(a, n1, n2, other) {
            this._link(a, n1, n2);
            a.unlink(n1, other);
            this._len(a, 'links', 1);
        }
    }));
});
