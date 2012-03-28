<?php

class EditeventController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
        $sql                        =   "SELECT * FROM themes WHERE `default` = '1' ";      
        $result                     =   $dbAdapter->fetchRow($sql);    
                
        $this->view->layout()->customstyleccs = '<link href="/static/themes/'.$result['type'].'/'.$result['folder'].'/css/custom-style.css" rel="stylesheet" type="text/css" />';
        $this->view->layout()->pagetitle        = 'Edit Event';
        $this->view->layout()->pagebreadcumb    = 'home &nbsp; &raquo; &nbsp; edit event';
        
        if(!Zend_Auth::getInstance()->getIdentity()->id)
        {
            $this->_redirect('/index');    
            
        }
    }

    public function indexAction()
    {
       
       $dbAdapter       =   Zend_Db_Table::getDefaultAdapter();  
       
       $this->view->eid             =   $_REQUEST['eid'];       
       
       $sql                         =   "SELECT * FROM events WHERE id = '".$_REQUEST['eid']."' ";      
       $result                      =   $dbAdapter->fetchRow($sql);
       
       $insdata                     =   array();                
       $insdata['category']         =   $result['category'];       
       $insdata['title']            =   $result['title'];
       $insdata['description']      =   $result['description'];
       $insdata['logo']             =   $result['logo'];        
       $insdata['capacity']         =   $result['capacity'];
       $insdata['start_date']       =   ($result['start_date']=="0000-00-00 00:00:00" || $result['start_date']=="0000-00-00") ? '' : $result['start_date'];
       $insdata['start_time']       =   ($result['start_time']=="00:00:00" || $result['start_time']=="00:00") ? '' : $result['start_time'];
       $insdata['end_date']         =   ($result['end_date']=="0000-00-00 00:00:00" || $result['end_date']=="0000-00-00") ? '' : $result['end_date'];
       $insdata['end_time']         =   ($result['end_time']=="00:00:00" || $result['end_time']=="00:00") ? '' : $result['end_time'];       
       $insdata['venue']            =   $result['venue'];
       $insdata['address1']         =   $result['address_1'];
       $insdata['address2']         =   $result['address_2'];
       $insdata['country']          =   $result['country'];
       $insdata['zip']              =   $result['postal_code'];
       $insdata['state']            =   ($result['state']=="State/province...") ? '' : $result['state']; 
       $insdata['city']             =   ($result['city']=="City...") ? '' : $result['city'];
       $insdata['zip']              =   ($result['zip']=="Zip Code...") ? '' : $result['zip']; 
       $insdata['hostname']         =   $result['organization_name'];
       $insdata['hostdescription']  =   $result['organization_desc'];
       $insdata['oid']              =   $result['oid'];
       $insdata['theme']            =   $result['theme'];
       $insdata['color']            =   $result['color'];
       
       
       
       
               
       $this->view->eventdetail     =   $insdata;
       
       $mid                         =   $result['coordinator'];
             
       $sql                         =   "SELECT IFNULL( COUNT(id),0 ) AS ticket_count    FROM tickets WHERE pid = '".$_REQUEST['eid']."'";      
       $result                      =   $dbAdapter->fetchRow($sql);
       $this->view->ticket_count    =   $result['ticket_count'];
       
       $sql                        =   "SELECT * FROM organization WHERE mid = '".$mid."' ";      
       $result                     =   $dbAdapter->fetchAll($sql);        
       $this->view->orgdetail      =   $result;
       
       $sql                         =   "SELECT * FROM organization WHERE mid = '".Zend_Auth::getInstance()->getIdentity()->id."' ";      
       $result                      =   $dbAdapter->fetchAll($sql);        
       $this->view->orgdetail       =   $result;
       
       $sql                         =   "SELECT * FROM categories ";      
       $result                      =   $dbAdapter->fetchAll($sql);        
       $this->view->categoriesdetail=   $result;
       
       
       $sql                         =   "SELECT *,CONCAT('http://commander.wiztechpk.com/assets/themes_preview/',type,'/',folder,'/',image) AS image_url, CONCAT('http://commander.wiztechpk.com/assets/themes_preview/',type,'/',folder,'/',thumb) AS thumb_url FROM themes ";      
       $result                      =   $dbAdapter->fetchAll($sql);        
       $this->view->themesdetail    =   $result;
       
       $sql                         =   "SELECT DISTINCT(country_name) , country_code FROM countries ORDER BY country_name ASC";      
       $result                      =   $dbAdapter->fetchAll($sql);
       $this->view->countries       =   $result; 
       
       
        include("ipGeo/ipGeo.php");
        //$ipadd = $_SERVER['REMOTE_ADDR'];
        $ipadd                      =   '64.233.187.99';
        $geo                        =   new ipGeo();
        $res                        =   $geo->getGeo($ipadd);
        
        $this->view->usercity                   =   $res->city;
        $this->view->userstate                  =   $res->state;
        $this->view->usercountryname            =   $res->country_name;
        $this->view->usercountrycode            =   $res->country_code;
        $this->view->usertimeoffset             =   $res->timeoffset;
        $this->view->usertimezone               =   $res->timezone; 
        
        $sql                         =   "SELECT DISTINCT(country_name) , country_code FROM countries ORDER BY country_name ASC";      
        $result                      =   $dbAdapter->fetchAll($sql);
        $this->view->countries       =   $result;
       
       
        $sql                         =   "SELECT DISTINCT(state_name),state_code FROM states ORDER BY state_name ASC";    
        $result                      =   $dbAdapter->fetchAll($sql);
        $this->view->states          =   $result;
        
        
        $sql                         =   "SELECT id FROM states WHERE state_code = '".$insdata['state']."' ORDER BY state_name ASC";            
        $result                      =   $dbAdapter->fetchAll($sql);
        if($result)
        {
            $this->view->stateindb   =   1;    
            
        }
        else
        {
            $this->view->stateindb   =   0;
        }
        
        
          
       
    }
    
    public function processAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();                       
            
        
        $Response['error']   		=	false;
        $Response['message']     	=	'';
                  
               
                
        $insdata                    =   array();
        $insdata['category']        =   $_POST['category'];
        
        $insdata['title']           =   $_POST['title'];
        $insdata['description']     =   $_POST['description'];
        $insdata['logo']            =   $_POST['event_logo'];        
        $insdata['capacity']        =   $_POST['capacity'];
        $insdata['start_date']      =   $_POST['start_date'];
        $insdata['start_time']      =   $_POST['start_time'];
        $insdata['end_date']        =   $_POST['end_date'];
        $insdata['end_time']        =   $_POST['end_time'];
        $insdata['venue']           =   $_POST['venue'];
        $insdata['address1']        =   $_POST['address_1'];
        $insdata['address2']        =   $_POST['address_2'];
        $insdata['country']         =   $_POST['country'];
                
        if($_POST['state']!='State/province...')
        {
            $insdata['state']       =   $_POST['state'];    
        }
        if($_POST['city']!='City...')
        {
            $insdata['city']        =   $_POST['city'];    
        }
        if($_POST['postal_code']!='Zip Code...')
        {
            $insdata['zip']         =   $_POST['postal_code'];    
        }
        
        $insdata['hostname']        =   $_POST['organization_name'];
        $insdata['hostdescription'] =   $_POST['organization_desc'];
        
        $insdata['theme']           =   $_POST['selected_theme'];
        
        $where  =   "id = '".$_REQUEST['eid']."'";
        
        $numRows = $dbAdapter->update('events', $insdata, $where);        
        
        unset($insdata);
        
        /*
        $insdata['organization_name']          =   $_POST['organization_name'];
        $insdata['organization_description']   =   $_POST['organization_desc'];
        
        $where  =   "mid = '".Zend_Auth::getInstance()->getIdentity()->id."'";        
        $numRows = $dbAdapter->update('organization', $insdata, $where);                         
        */
                
        //$this->_redirect('/myevents/index');
        
        if(isset($_REQUEST['savedOrganizers']))
        {
            $insdata['oid']        =   $_POST['savedOrganizers'];
            
            $where  =   "id = '".$_REQUEST['eid']."'";
            
            $numRows1 = $dbAdapter->update('events', $insdata, $where);
                
            
            
        }
        else
        {          
            $insdata['mid']                      =   Zend_Auth::getInstance()->getIdentity()->id;   
            $insdata['organization_name']        =   $_POST['organization_name'];
            $insdata['organization_description'] =   $_POST['organization_desc'];            
            $insdata['status']          =   'Active';
            $insdata['date_created']    =   date("Y-m-d H:i:s");
            
            $numRows1    =   $dbAdapter->insert('organization', $insdata);
            $oid        =   $dbAdapter->lastInsertId();  
            
            
            
            unset($insdata);            
            $insdata['oid']        =   $oid;            
            $where  =   "id = '".$oid."'";
                        
            $numRows1 = $dbAdapter->update('events', $insdata, $where);           
            
        }
        
        $Response['data']		=	$_REQUEST['eid'];
        $Response['error']		=	false;
        $Response['message']	=	'Complete';

        //echo $Response['message'];exit();
        echo json_encode($Response);exit();
        
    }


}