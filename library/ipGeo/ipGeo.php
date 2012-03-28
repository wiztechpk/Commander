<?php
/*#####################################################
#
#
#
#                       IPGEO PARSE
#
#                          v 1.0
#
#                    By: John Calabrese
#                        (xchapter7x)
#                        
#           a million thanks to the people at 
#                      hostip.info
#         for providing free access to information
#
################################################x7x##*/
class geoReturn
{
    function geoReturn()
    {
        $this->ipadd='';
        $this->city='';
        $this->state='';
        $this->country_code='';
        $this->country_name='';
        $this->longitude='';
        $this->latitude='';
        $this->timeoffset='';
        $this->timezone='';
    }
}
class ipGeo
{
    function ipGeo()
    {
        //nothing to do
    }
    function getGeo($ipadd)
    {
        $this->xml_parser = xml_parser_create();
        $this->rss_parser = new IPGEO_PARSE();
        xml_set_object($this->xml_parser,$this->rss_parser);
        xml_set_element_handler($this->xml_parser, "startElement", "endElement");
        xml_set_character_data_handler($this->xml_parser, "characterData");
        $res = new geoReturn();
		
		//$fp = fopen("http://stonito.com/script/geoip/?ip=".$ipadd,"r");
        $fp = fopen("http://api.hostip.info/?ip=".$ipadd,"r")
            or die("Error reading RSS data.");
        while ($data = fread($fp, 4096))
        {
            xml_parse($this->xml_parser, $data, feof($fp))
                or die(sprintf("XML error: %s at line %d",
                xml_error_string(xml_get_error_code($this->xml_parser)),
                xml_get_current_line_number($this->xml_parser)));
        }
        
        if (strlen($this->rss_parser->latitude) > 0 && strlen($this->rss_parser->longitude) > 0) {
            // pass this lat and long to http://www.earthtools.org/ API to get Timezone Offset in xml
            $tz_xml = file_get_contents('http://www.earthtools.org/timezone-1.1/'.$this->rss_parser->latitude.'/'.$this->rss_parser->longitude);
            // lets parse out the timezone offset from the xml using regex
            if (preg_match("/<offset>([^<]+)<\/offset>/i", $tz_xml, $match)) {
                $zonelist = array('Kwajalein' => -12.00, 'Pacific/Midway' => -11.00, 'Pacific/Honolulu' => -10.00, 'America/Anchorage' => -9.00, 'America/Los_Angeles' => -8.00, 'America/Denver' => -7.00, 'America/Tegucigalpa' => -6.00, 'America/New_York' => -5.00, 'America/Caracas' => -4.30, 'America/Halifax' => -4.00, 'America/St_Johns' => -3.30, 'America/Argentina/Buenos_Aires' => -3.00, 'America/Sao_Paulo' => -3.00, 'Atlantic/South_Georgia' => -2.00, 'Atlantic/Azores' => -1.00, 'Europe/Dublin' => 0, 'Europe/Belgrade' => 1.00, 'Europe/Minsk' => 2.00, 'Asia/Kuwait' => 3.00, 'Asia/Tehran' => 3.30, 'Asia/Muscat' => 4.00, 'Asia/Yekaterinburg' => 5.00, 'Asia/Kolkata' => 5.30, 'Asia/Katmandu' => 5.45, 'Asia/Dhaka' => 6.00, 'Asia/Rangoon' => 6.30, 'Asia/Krasnoyarsk' => 7.00, 'Asia/Brunei' => 8.00, 'Asia/Seoul' => 9.00, 'Australia/Darwin' => 9.30, 'Australia/Canberra' => 10.00, 'Asia/Magadan' => 11.00, 'Pacific/Fiji' => 12.00, 'Pacific/Tongatapu' => 13.00);
                $index = array_keys($zonelist, $match[1]);
                $timeoffset = $match[1];
                $timezone   = str_replace("/"," / ", $index[0]) ;
                
            }
        }

        
        $res->city = $this->rss_parser->city;
        $res->state = $this->rss_parser->state;
        $res->country_code = $this->rss_parser->country_code;
        $res->country_name = $this->rss_parser->country_name;
        $res->longitude = $this->rss_parser->longitude;
        $res->latitude = $this->rss_parser->latitude;
        $res->timeoffset = $timeoffset;
        $res->timezone = $timezone;
        fclose($fp);
        xml_parser_free($this->xml_parser);
        return $res;
    }
}
class IPGEO_PARSE {

    function IPGEO_PARSE()
    {
        $this->gml_name = 0;
        $this->countryName = 0;
        $this->countryAbbrev = 0;
        $this->gml_coordinates = 0;
        $this->hostip = 0;
        $this->city = '';
        $this->state = '';
        $this->country_name = '';
        $this->country_code = '';
        $this->longitude = '';
        $this->latitude = '';
        $this->timeoffset = '';
        $this->timezone = '';
        $this->noresult = 0;
    }

    function startElement($parser, $tagName, $attrs) {
         if($tagName == strtoupper("Hostip")){
             $this->hostip = 1;
             $this->noresult=0;
         }elseif($tagName == strtoupper("gml:name")){
             $this->gml_name = 1;
         }elseif($tagName == strtoupper("countryName")){
             $this->countryName = 1;
         }elseif($tagName == strtoupper("countryAbbrev")){
             $this->countryAbbrev = 1;
         }elseif($tagName == strtoupper("gml:coordinates")){
             $this->gml_coordinates = 1;
         }
    }

    function endElement($parser, $tagName) {
        if($tagName == strtoupper("Hostip")){
             $this->hostip = 0;
         }elseif($tagName == strtoupper("gml:name")){
             $this->gml_name = 0;
         }elseif($tagName == strtoupper("countryName")){
             $this->countryName = 0;
         }elseif($tagName == strtoupper("countryAbbrev")){
             $this->countryAbbrev = 0;
         }elseif($tagName == strtoupper("gml:coordinates")){
             $this->gml_coordinates = 0;
         }
    }

    function characterData($parser, $data) {
        if($this->hostip){
            if($this->gml_name){
                $info = explode(",",$data);
                if(isset($info[1])){
                    $this->city = $info[0];
                    $this->state = str_replace(" ","",$info[1]);
                }else{
                    $this->state = '';
                    $this->city = '';
                    $this->noresult = 1;
                }
            }elseif($this->countryName){
                if($this->noresult){
                    $this->country_name = '';
                }else{
                    $this->country_name = $data;
                    
                }
            }elseif($this->countryAbbrev){
                if($this->noresult){
                    $this->country_code = '';
                }else{
                    $this->country_code = $data;
                }
            }elseif($this->gml_coordinates){
                $info = explode(",",$data);
                $this->longitude = $info[0];
                $this->latitude = $info[1];
            }
        }
    }
} 
?>

