(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals
        root.graph = factory();
    }
}(this, function () {
    return function() {
        var set = function(eqCb) {
            eqCb = eqCb || function(a, b) {return a == b};

            return {
                _obs: {},
                _len: 0,
                add: function() {
                    for(var i = 0, len = arguments.length; i < len; i++) {
                        var v = arguments[i];

                        if(this.get(v)) {
                            continue;
                        }

                        this._obs[this._len] = v;
                        this._len++;
                    }
                },
                remove: function() {
                    for(var i = 0, len = arguments.length; i < len; i++) {
                        var v = arguments[i];
                        var n = this.get(v);

                        if(n) {
                            delete n;
                            this._len--;
                        }
                    }
                },
                contains: function(a) {
                    return this.get(a)? true: false;
                },
                get: function(a) {
                    if(typeof(a) == 'number') {
                        if(a in this._obs) {
                            return this._obs[a];
                        }
                    }
                    else {
                        for(var i in this._obs) {
                            var k = this._obs[i];

                            if(eqCb(a, k)) {
                                return a;
                            }
                        }
                    }
                },
                length: function() {
                    return this._len;
                }
            };
        };

        var links = {
            _pairs: set(function(a, b) {
                return a[0] == b[0] && a[1] == b[1];
            }),
            add: function(from, to) {
                this._pairs.add([from, to]);
            },
            remove: function(from, to) {
                this._pairs.remove([from, to]);
            },
            get: function(from, to) {
                return this._pairs.get([from, to]);
            },
            length: function() {
                return this._pairs.length();
            }
        };

        return {
            nodes: set(),
            links: links,
            length: 0,
            add: function() {
                this.nodes.add.apply(this.nodes, arguments);
            },
            remove: function() {
                this.nodes.remove.apply(this.nodes, arguments);
            },
            link: function(from, to) {
                if(from != to && this.nodes.contains(from) && this.nodes.contains(to)) {
                    this.links.add(from, to);
                }
            },
            unlink: function(from, to) {
                this.links.remove(from, to);
            }
        };
    };
}));

