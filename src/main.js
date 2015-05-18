define(['lib/crafty', 'src/levels'], function(crafty, levels) {
    Crafty.init(window.innerWidth, window.innerHeight, document.getElementById('game'));
    Crafty.background('#B0D2E7');

    Crafty.addEvent(this, Crafty.stage.elem, 'mousemove', function(e) {
        cursor.x = e.clientX - cursor.w;
        cursor.y = e.clientY - cursor.h;
    });

    Crafty.c("Wall", {
        init: function() {
            this.requires("2D, Canvas, Color, Collision, Solid");
        },
        Wall: function(attrs, color) {
            this.attr(attrs);
            this.color(color);
        }
    })

    Crafty.c("Player", {
        init: function() {
            this.requires("2D, Canvas, Color, Multiway, Collision")
        },
        Player: function(attrs, keyBindings, color, playerId, speed, maxHealth) {
            this.playerId = playerId;
            this.attr(attrs);
            this.color(color);
            this.multiway(speed, keyBindings);
            this.stopOnSolids();
            this.maxHealth = maxHealth;
            this.health = maxHealth;

            return this;
        },
        stopOnSolids: function() {
            this.onHit("Solid", function(collidedWith) {
                var n = collidedWith[0].normal;
                if (n.x != 0) {
                    this.x += collidedWith[0].overlap * (n.x > 0 ? -1 : 1);
                }
                if (n.y != 0) {
                    this.y += collidedWith[0].overlap * (n.y > 0 ? -1 : 1);
                }
            });
        },
        damage: function(damageDone) {
            if (damageDone > this.health) {
                this.health = 0;
            } else {
                this.health -= damageDone;
            }

            if (this.health <= 0) {
                console.log("Game over");
            }
        }
    });

    var level = levels.loadLevel("plain");
    var player1;
    var player2;
    var player1Hud;
    var player2Hud;
    for (var i = 0; i < level.length; i++) {
        var yOffset = i * 100;
        var row = level[i];
        for (var j = 0; j < row.length; j++) {
            var xOffset = j * 100;
            var column = row[j];

            switch(column) {
                case 'w':
                    Crafty.e('Wall')
                        .Wall({x: xOffset, y: yOffset, w: 100, h: 100}, 'brown');
                    break;
                case 'a':
                    player1 = Crafty.e('Player')
                        .Player({x: xOffset, y: yOffset, w: 50, h: 50}, 
                                {W: -90, A: 180, S: 90, D: 0},
                                "#F00", 
                                1, 
                                8,
                                100);
                    break;
                case 'b':
                    player2 = Crafty.e('Player')
                        .Player({x: xOffset, y: yOffset, w: 50, h: 50}, 
                                {I: -90, J: 180, K: 90, L: 0},
                                "green", 
                                2, 
                                8,
                                100);
                    break;
                default:
                    continue;
            }
        }
    }

    player1Hud = Crafty.e('2D, Canvas, Text')
        .attr({x: 100, y: 30, w: 200, h: 100})
        .text(function() { return "P1: " + player1.health})
        .textFont({size: '30px'});

    player2Hud = Crafty.e('2D, Canvas, Text')
        .attr({x: 500, y: 30, w: 200, h: 100})
        .text(function() {return "P2: " + player2.health})
        .textFont({size: '30px'});

    // var player = Crafty.e('Player')
    //     .Player({x: 0, y: 0, w: 50, h: 50}, "#F00", 8);

    // var w1 = Crafty.e('Wall')
    //     .Wall({x: 500, y: 200, w: 100, h: 100}, "brown");

    var cursor = Crafty.e('2D, Canvas, Color')
        .attr({
            x: 0,
            y: 0,
            w: 15,
            h: 15
        })
        .color('red');

    Crafty.c("rotmove", {
        init: function() {

        },
        rotmove: function(vec1, vec2) {
            this.vec1 = vec1;
            this.vec2 = vec2;
            this.movementRads = vec1.angleTo(vec2);
            this.movementAngle = Crafty.math.radToDeg(this.movementRads);
            this.rotation = 90 + this.movementAngle;
            this.movement = new Crafty.math.Vector2D(Math.cos(this.movementRads), Math.sin(this.movementRads));
            //this.movementAngle = maths.angleBetweenPoints(this.pos1, this.pos2);

            return this;
        }
    });

    Crafty.c("Projectile", {
        init: function() {
            this.requires("2D, Canvas, Color, rotmove, Collision");
        },
        Projectile: function(attrs, color, speed, vec1, vec2, playerId) {
            this.attr(attrs);
            this.color(color);
            this.speed = speed;
            this.rotmove(vec1, vec2);
            this.bind("EnterFrame", function(e) {
                this.x += this.movement.x * this.speed;
                this.y += this.movement.y * this.speed;
            });
            this.stopOnSolids();
            this.playerId = playerId;

            return this;
        },
        stopOnSolids: function() {
            this.onHit("Solid", function(collideWith) {
                this.destroy();
            });
            this.onHit("Player", function(collideWith) {
                if (collideWith[0].obj.playerId != this.playerId) {
                    player2.damage(10);
                    player2Hud.text(function() {return "P2: " + player2.health});
                    this.destroy();
                }
            });
        }
    });

    Crafty.addEvent(this, Crafty.stage.elem, 'mousedown', function(e) {
        Crafty.e('Projectile')
            .Projectile({
                x: player1.x + (player1.w / 2),
                y: player1.y + (player1.h / 2),
                w: 10,
                h: 40,
                origin: "center"
            }, 
            "#FF00E1",
            35,
            new Crafty.math.Vector2D(player1.x + (player1.w / 2), player1.y + (player1.h / 2)),
            new Crafty.math.Vector2D(cursor.x + (cursor.w / 2), cursor.y + (cursor.h / 2)),
            player1.playerId
        );
    });

    window.addEventListener("gamepadconnected", function(e) {
        console.log("Gamepad connected");
    });

    return this;
});