Image Search API project

Objective: Build a full stack JavaScript app that allows you to search for images like this: 
https://cryptic-ridge-9197.herokuapp.com/api/imagesearch/lolcats%20funny?offset=10 
and browse recent search queries like this: 
https://cryptic-ridge-9197.herokuapp.com/api/latest/imagesearch/. Then deploy it to Heroku.


User Story: I can get the image URLs, alt text and page urls for a set of images relating to a given search string.

User Story: I can paginate through the responses by adding a ?offset=2 parameter to the URL.

User Story: I can get a list of the most recently submitted search strings.


Resources:
http://stackoverflow.com/questions/21530274/format-for-a-url-that-goes-to-google-image-search
https://stenevang.wordpress.com/2013/02/22/google-advanced-power-search-url-request-parameters/
http://jwebnet.net/advancedgooglesearch.html#advImageSearchURI
http://stackoverflow.com/questions/5797852/in-node-js-how-do-i-include-functions-from-my-other-files

example query:
https://www.google.com/search?hl=en&as_st=y&site=imghp&tbm=isch&q=lol%20cat