// Stretch:
// Make the images clickable, playing them in a lightbox
// Show a link for more from the channel that each video came from
// Show buttons to get more results (using the previous and next page links from the JSON)

'use strict';

var YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getSearchData(query, callback) {
    var query = {
        part: 'snippet',
        maxResults: 10,
        key: 'AIzaSyBTNjgDxhK8Valx49hGTSgVJ0wkjCYaqwk',
        q: query
    };
    $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderSearchResults(JSON) {
    var resultElement = '';
    if (JSON.items) {
        JSON.items.forEach(function(item){
            var link = '<a href="https://www.youtube.com/watch?v='
                    + item.id.videoId + '" target="_blank">';
            var pic = '<img src="'+ item.snippet.thumbnails.medium.url
                +'" alt="search_result_pic"/>';

            var desc = '<p class="vid-desc">'+item.snippet.title+'</p>';
            var element = '<div class="pic-container">' + link + pic + desc +'</div>';
            resultElement += element;
        });
    } else {
        resultElement += '<p>No results for your query</p>';
    }
    $('section').html(resultElement);
}

function watchSubmit() {
    $('.js-search-form').submit(function(e){
        e.preventDefault();
        var query = $(this).find('.js-query').val();
        getSearchData(query, renderSearchResults);
    });
}

$(function(){watchSubmit();});
