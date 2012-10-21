<?php
header('Content-type: application/json; charset: utf-8');
header('Access-Control-Allow-Origin: *');  

//get the current tag name from Quora
$tagquery= $_GET["tagname"];
$tagqueryStr = str_replace(" ", "%20", $tagquery);

//pull related articles from NYT API
$url = "http://api.nytimes.com/svc/search/v1/article?api-key=f6fcb7d8529cc6f75a5686e2496a3348:3:66738105&query=".$tagqueryStr;
// $url = "http://api.nytimes.com/svc/search/v1/article?api-key=f6fcb7d8529cc6f75a5686e2496a3348:3:66738105&query=title:If%20I%20like%20X,%20will%20I%20like%20Y?&rank=closest";
// $url ='http://api.nytimes.com/svc/search/v1/article?query=lakes%20ice%20org_facet:[ENVIRONMENTAL%20PROTECTION%20AGENCY]&rank=closest&api-key=f6fcb7d8529cc6f75a5686e2496a3348:3:66738105'

// Final response
$json = array();

// Fetch the URL using cURL
// Uses cURL becuase allow_url_fopen may be disabled
// This will fail if the current PHP installation does not include cURL
$ch = curl_init();
$timeout = 5; // set to zero for no timeout
curl_setopt ($ch, CURLOPT_URL, $url);
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
// curl_setopt ($ch, CURLOPT_USERPWD, $username . ':' . $password);
$rsp = curl_exec($ch);
$curl_error = curl_errno($ch);
curl_close($ch);

if ($curl_error == 28) {
	// Connection timeout
	// CURLE_OPERATION_TIMEDOUT 28
	$errors->add('Request to NYT API timed out');
} else {
	// Convert XML response to JSON
	$xml = simplexml_load_string($rsp);
	$json['request_url'] = $url;
    $json['xml'] = $rsp;
    $json['result_code'] = (string) $xml['code'];
}

$json = str_replace("\n", '', json_encode($json));

/* If a callback is specified that means the request is being processed
 * across domains using JSONP. Send the response wrapped in the callback.
 * Otherwise, just send the response. It doesn't make sense to set a callback
 * via POST, so we just check GET.
 */
if (isset($_GET['callback'])) {
    echo $_GET['callback'] . '(' . $json . ')';
} else {
    echo $json;
}

print file_get_contents($JSON);
// echo file_get_contents($json);
?>