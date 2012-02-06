define(function() {
    return function() {
        var set = function(eqCb) {
            eqCb = eqCb || function(a, b) {return a == b};

            return {
                _obs: {},
                _len: 0,
                add: function(a) {
                    if(this.get(a)) {
                        return;
                    }

                    this._obs[this._len] = a;
                    this._len++;
                },
                remove: function(a) {
                    var b = this.get(a);

                    if(b) {
                        delete b;
                        this._len--;
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
                        for(var i = 0, len = this._len; i < len; i++) {
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
            add: function(a) {
                this.nodes.add(a);
            },
            remove: function(a) {
                this.nodes.remove(a);
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
});

