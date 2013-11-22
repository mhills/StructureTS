
/// <reference path="create/easeljs.d.ts" />
/// <reference path="Game.ts" />

// Author : Samuel Girardin- http://www.visualiser.fr


window.onload = () => {

    var manifest = [];
    manifest = [
               { src: "GettingStarted/assets/j0.png", id: "j0" }           
    ];


    var start = new Game(manifest);

};

