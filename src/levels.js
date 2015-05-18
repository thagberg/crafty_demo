define([], function() {
    var levels = {};

    levels.loadLevel = function(levelName) {
        var level;
        switch(levelName) {
            default:
                level = [
                    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
                    ['w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'w'],
                    ['w', '0', 'a', '0', '0', '0', '0', '0', '0', '0', '0', 'w'],
                    ['w', '0', '0', 'w', '0', '0', '0', '0', '0', '0', '0', 'w'],
                    ['w', '0', '0', 'w', '0', '0', '0', '0', '0', '0', '0', 'w'],
                    ['w', '0', '0', 'w', '0', '0', '0', '0', '0', 'w', '0', 'w'],
                    ['w', '0', '0', '0', '0', 'w', 'w', 'w', 'w', 'w', '0', 'w'],
                    ['w', '0', '0', '0', '0', '0', '0', '0', '0', 'w', '0', 'w'],
                    ['w', '0', '0', 'w', '0', '0', '0', '0', '0', '0', '0', 'w'],
                    ['w', '0', '0', 'w', '0', '0', '0', '0', '0', '0', '0', 'w'],
                    ['w', '0', '0', '0', '0', '0', '0', '0', '0', 'b', '0', 'w'],
                    ['w', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', 'w'],
                    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']
                ];
        }

        return level;
    }

    return levels;
});