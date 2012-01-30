require(
    {
        paths: {
            assert: 'lib/assert',
            bunit: 'lib/bunit',
            graph: 'src/graph'
        }
    },
    ['bunit', 'tests/tests'],
    function(bunit, tests) {
        require.ready(function() {
            var r = bunit.runner();

            r.defaultUI();
            r.run();
        });
    }
);
