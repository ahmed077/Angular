(function() {
    var selected = false;
    var quiz = angular.module('quiz', []);
    quiz.controller('QuizController', ['$scope', '$http', function ($scope, $http) {
        $scope.question = 0;
        $scope.score = 0;
        $scope.start = function() {
            $('.intro').fadeOut('slow',function(){
                $scope.begin = true;
                $(this).remove();
                $('.container').removeClass('ng-hide').animate({top:0},1000, function() {
                    $('.progress span').eq(0).animate({width:$scope.spanWidth},1000);
                });
            });
        };
        $http.get('js/data.json').then(function (q) {
            $scope.myQuiz = q.data;
            $scope.spanWidth = 100 / $scope.myQuiz.length + '%';
        });
        $scope.submit = function () {
            selected = true;
            $('.answers').addClass('select');
            $('.submit').fadeOut(400,function(){$('.next').fadeIn();});
            if (($('.selected').index() - 1) == $scope.myQuiz[$scope.question].correct) {
                $('.selected').addClass('correct');
                $scope.score++;
            }
             else {
                $('.progress span').eq($scope.question).css({'background':'darkred'});
                $('.selected').addClass('wrong');
                $('.answers').eq($scope.myQuiz[$scope.question].correct).addClass('correct');
            }
        };
        $scope.next = function() {
            var x = $scope.question + 1;
            selected = false;
            $('.answers').removeClass('select');
            if(x >= $scope.myQuiz.length) {
                $('.container').animate({top:$('.main-container').outerHeight()},1000,function() {
                    $(this).remove();
                    $scope.end = true;
                    $scope.begin = false;
                    $('.finish').removeClass('ng-hide').animate({top:0},1000);
                });
            } else {
                $scope.question++;
                $('.container').css('color','transparent').animate({left : '-700px'},1000,function(){$('.next').hide();});
                setTimeout(function () {
                    $('.submit').show();
                    $('.container').css('color','black').animate({left: '700px'}, 0).animate({left: '0'}, 1000,function() {
                        $('.progress span').eq($scope.question).animate({width:$scope.spanWidth},1000);
                    });}, 1000);
            }
        };
        $scope.sel = function (e) {
            if(!selected) {
                var obj = e.target;
                if ($('.selected').length > 0) {
                    $('.selected').removeClass('selected');
                }
                obj.className += " selected";
            }
        };
    }]);
})();
