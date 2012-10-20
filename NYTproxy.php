<?php
//this is a copy of th proxy file being used. actual file can be found at https://people.ischool.berkeley.edu/~nkhalawi/NYTproxy.php
header('Content-type: application/json; charset: utf-8');
header('Access-Control-Allow-Origin: *');  

//get the current tag name from Quora and replace spaces with %20
$tagquery= $_GET["tagname"];
$tagqueryStr = str_replace(" ", "%20", $tagquery);

//pull related articles from NYT API 
//using NAILAS key
$url = "http://api.nytimes.com/svc/search/v1/article?api-key=f6fcb7d8529cc6f75a5686e2496a3348:3:66738105&query=".$tagqueryStr;

//using Qianqian's key
// $url = "http://api.nytimes.com/svc/search/v1/article?api-key=6c48161f61e832770b7ca35e5085d44a:12:65302157&query=".$tagqueryStr;

// Fetch the URL using cURL
$ch = curl_init();
$timeout = 5; // set to zero for no timeout
curl_setopt ($ch, CURLOPT_URL, $url);
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
$rsp = curl_exec($ch);
$curl_error = curl_errno($ch);
curl_close($ch);

if ($curl_error == 28) {
	// Connection timeout
	CURLE_OPERATION_TIMEDOUT 28
	$errors->add('Request to NYT API timed out');
} else {
	// Convert XML response to JSON
	$xml = simplexml_load_string($rsp);
	$json['request_url'] = $url;
    $json['xml'] = $rsp;
    $json['result_code'] = (string) $xml['code'];
}

$json = str_replace("\n", '', json_encode($json));

// If a callback is specified send the response wrapped in the callback. Otherwise, just send the response.
if (isset($_GET['callback'])) {
    echo $_GET['callback'] . '(' . $json . ')';
} else {
    echo $json;
}

print file_get_contents($JSON);
?>