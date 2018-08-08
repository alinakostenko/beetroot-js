$(document).ready(function () {

    var appKey = '2874907-a41dc14b65a232bb76a0d6224',
        container = $('#pictures'),
        button = $('button'),
        input = $('input[type="text"]');

    button.click(function () {
        var words = input.val();
        sendVideoAjax(words);
    });

    function sendImagesAjax(words) {
        var request = $.ajax({
            url: 'https://pixabay.com/api/?orientation=horizontal&lang=ru&key=' + appKey + '&q=' + words.replace(/\s/g, '+'),
            method: 'GET'
        });

        request.done(function(result) {
            console.log(result);
            display(result.hits);
        });

        request.fail(function(ajax, error) {
            alert(error);
        });
    }

    function sendVideoAjax(words) {
        var request = $.ajax({
            url: 'https://pixabay.com/api/videos?lang=ru&key=' + appKey + '&q=' + words.replace(/\s/g, '+'),
            method: 'GET'
        });

        request.done(function(result) {
            console.log(result);
            displayVideos(result.hits);
        });

        request.fail(function(ajax, error) {
            alert(error);
        });
    }

    function display(pictures) {
        container.empty();

        var html = '';
        for(var i = 0; i < pictures.length; i++) {
            html += '<img src="' + pictures[i].webformatURL + '" alt="' + pictures[i].tags + '">';
        }
        container.html(html);
    }

    function displayVideos(videos) {
        container.empty();

        var html = '';
        for(var i = 0; i < videos.length; i++) {
            html += '<video src="' + videos[i].videos.small.url + '" controls></video>';
        }
        container.html(html);
    }

});