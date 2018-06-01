_.templateSettings = {
    evaluate: /\{\[([\s\S]+?)\]\}/g,
    interpolate: /\{\{([\s\S]+?)\}\}/g
};

jQuery.fn.cardGame = function(data) {
    var $self = $(this),
        questionsData = data.questionsData,
        answersData = data.answersData,
        $card = $("#card", $self),
        $front = $("#card-front", $card),
        $back = $("#card-back", $card),
        questionTmpl = _.template($("#question__tmpl").html()),
        answerTmpl = _.template($("#answer__tmpl").html()),
        flipDirection = true,
        answers = new Array(7);

    $card.flip({
        trigger: 'manual',
        axis: 'y'
    });

    $card.on("click.cardGame", ".js-to-question, .js-to-answer", function(e) {
        var $this = $(e.currentTarget),
            questionId = $this.data("question"),
            answerIndex = $this.data("answerIndex"),
            answerValue= $this.data("answerValue"),
            $side = flipDirection ? $front : $back;

        flipDirection = !flipDirection;

        if (answerIndex != null) {

            answers[answerIndex] = answerValue;

        }

        if (questionId <= 7) {
            $side.html(questionTmpl(_.extend(questionsData[questionId], {id: questionId})));
        } else {
            var tmplData = {
                answers: answers,
                answersData: answersData,
                count: _.reduce(answers, function(memo, num){ return memo + num; }, 0)
            };

            $side.html(answerTmpl(tmplData));
        }




        $card.flip(flipDirection);

    });


    return {
        init: function () {
            setTimeout(function () {
                $card.flip(flipDirection);
            }, 1000);
        }
    }


};


$("#cardgame").cardGame(data).init();






