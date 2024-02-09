Hooks.on("renderChatMessage", (message, html, messageData) => {
    var roll;
    if ($(html).find("ol.dice-rolls li").length) {
        roll = eval($(html).find("ol.dice-rolls li:eq(0)").html());
        $(html).find(".dice-total").prepend("<span style='float:left';>(" + roll + ")</span>");
    }
    else if ($(html).find("a.inline-roll.inline-result").length) {
        var objArray=$(html).find("a.inline-roll.inline-result");
        for (let index = 0; index < objArray.length; index++) {
            var roll = JSON.parse(decodeURIComponent(objArray.eq(index).attr("data-roll"))).terms[0].results[0].result;
            objArray.eq(index).find("i").append("(" + roll + ")");
        }
    }
});
