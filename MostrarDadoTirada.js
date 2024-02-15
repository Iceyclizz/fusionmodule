Hooks.on("renderChatMessage", (message, html, messageData) => {
    console.log(html.html());
    var roll;
    if ($(html).find("ol.dice-rolls li").length) {
        roll = eval($(html).find("ol.dice-rolls li:eq(0)").html());
        $(html).find(".dice-total").prepend("<span style='float:left';>(" + roll + ")</span>");
    }
    else if ($(html).find("a.inline-roll.inline-result").length) {
        var objArray = $(html).find("a.inline-roll.inline-result");
        for (let index = 0; index < objArray.length; index++) {
            var roll = JSON.parse(decodeURIComponent(objArray.eq(index).attr("data-roll")));
            var found = -1;
            if (roll.dice.length > 0) {
                for (let i = 0; i < roll.dice.length; i++) {
                    if (roll.dice[i].class == "Die" && (found == -1))
                        found = roll.dice[i].results[0].result;
                }
            } else {
                for (let i = 0; i < roll.terms.length; i++) {
                    if (roll.terms[i].class == "Die" && (found == -1))
                        found = roll.terms[i].results[0].result;
                }
            }
            if (found != -1) roll = "(" + found + ") ";
            else roll = "";
            objArray.eq(index).find("i").after(roll);
        }
    }
    console.log(html.html());
});
