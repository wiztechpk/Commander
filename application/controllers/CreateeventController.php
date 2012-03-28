<?php

class CreateeventController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
        $sql                        =   "SELECT * FROM themes WHERE `default` = '1' ";      
        $result                     =   $dbAdapter->fetchRow($sql);    
                
        $this->view->layout()->customstyleccs   = '<link href="/static/themes/'.$result['type'].'/'.$result['folder'].'/css/custom-style.css" rel="stylesheet" type="text/css" />';
        $this->view->layout()->pagetitle        = 'Create Event';
        $this->view->layout()->pagebreadcumb    = 'home &nbsp; &raquo; &nbsp; create event';
        
        if(!Zend_Auth::getInstance()->getIdentity()->id)
        {
            $this->_redirect('/index');    
            
        }        
        
                
                
    }
    
    public function getcountriesAction()
    {
       $this->getHelper('layout')->disableLayout();  
       $this->_helper->viewRenderer->setNoRender(true);
        
       $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
               
       $sql                         =   "SELECT DISTINCT(country_name), country_code FROM countries ORDER BY country_name ASC";      
       $result                      =   $dbAdapter->fetchAll($sql);
       $this->view->countries       =   $result;  
       
    }
    
    public function getstatesAction()
    {
       $this->getHelper('layout')->disableLayout();  
       $this->_helper->viewRenderer->setNoRender(true);
        
       $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
               
       $sql                         =   "SELECT DISTINCT(state_name),state_code FROM states WHERE country_code = '".$_REQUEST['country_code']."'  ORDER BY state_name ASC";      
       $result                      =   $dbAdapter->fetchAll($sql);
       
       if($result)
       {
           echo '<select  name="state" id="state">';
           echo '<option value="">Select State</option>';
           foreach($result as $key=>$value) {
           echo '<option value="'.$value['state_code'].'">'.$value['state_name'].'</option>';
           }
           echo '</select>';
        
       }
       else
       {
           echo '<input type="text" onfocus="if (this.value == \'State/province...\') {this.value = \'\';}" onblur="if (this.value == \'\') {this.value = \'State/province...\';}" class="date_loc_field" id="state" name="state"> ';
        
       }  
         
       
    }
    
    public function getcitiesAction()
    {
       $this->getHelper('layout')->disableLayout();  
       $this->_helper->viewRenderer->setNoRender(true);
        
       $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
               
       $sql                         =   "SELECT DISTINCT(country_name), country_code FROM countries ORDER BY country_name ASC";      
       $result                      =   $dbAdapter->fetchRow($sql);
       $this->view->countries       =   $result;  
       
    }

    public function indexAction()
    {
       $dbAdapter                   =   Zend_Db_Table::getDefaultAdapter();
       
       $sql                         =   "SELECT msh.number AS total_events, (SELECT COUNT(e.id) FROM `events` e WHERE e.coordinator = m.id ) AS event_posted FROM members m INNER JOIN membership msh ON m.membership_id=msh.id WHERE m.id = '".Zend_Auth::getInstance()->getIdentity()->id."' ";
       $result                      =   $dbAdapter->fetchRow($sql);       
       if(($result['total_events']-$result['event_posted']) <= 0)
       {
       $this->view->create          =   1;       
       }
       else
       {
       $this->view->create          =   0;
       }
              
       $sql                         =   "SELECT IFNULL( MAX(id),0 ) + 1 AS eid    FROM events";      
       $result                      =   $dbAdapter->fetchRow($sql);
       $this->view->eid             =   $result['eid'];
       
       
         
       $numRows                     =   $dbAdapter->delete('tickets', array('pid  = ?' => $result['eid']));
       
       $sql                         =   "SELECT IFNULL( COUNT(id),0 ) AS ticket_count    FROM tickets WHERE pid = '".$result['eid']."'";      
       $result                      =   $dbAdapter->fetchRow($sql);
       $this->view->ticket_count    =   $result['ticket_count'];
       
       
       $sql                         =   "SELECT * FROM organization WHERE mid = '".Zend_Auth::getInstance()->getIdentity()->id."' ";      
       $result                      =   $dbAdapter->fetchAll($sql);        
       $this->view->orgdetail       =   $result;
       
       $sql                         =   "SELECT * FROM categories ";      
       $result                      =   $dbAdapter->fetchAll($sql);        
       $this->view->categoriesdetail=   $result;
       
       
       $sql                         =   "SELECT *,CONCAT('http://commander.wiztechpk.com/assets/themes_preview/',type,'/',folder,'/',image) AS image_url, CONCAT('http://commander.wiztechpk.com/assets/themes_preview/',type,'/',folder,'/',thumb) AS thumb_url FROM themes ";      
       $result                      =   $dbAdapter->fetchAll($sql);        
       $this->view->themesdetail    =   $result;
       
            
       
       
        include("ipGeo/ipGeo.php");
        $ipadd = $_SERVER['REMOTE_ADDR'];
        //$ipadd                      =   '119.155.152.238';
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
       
       
        
       
       
    }
    
    public function processAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                        
            
        $Response['data'] 		=	'';
        $Response['error'] 		=	false;
        $Response['message'] 	=	'';
        
            
                       
        $insdata                    =   array();
        
        
        $insdata['category']        =   $_POST['category'];
        $insdata['coordinator']     =   Zend_Auth::getInstance()->getIdentity()->id;
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
        
        $insdata['event_status']    =   'Draft';
        $insdata['status']          =   'Active';
        $insdata['date_created']    =   date("Y-m-d H:i:s");
        
        
        $numRows = $dbAdapter->insert('events', $insdata);
        $id = $dbAdapter->lastInsertId();
                        
        unset($insdata);
        /*
        $sql                        =   "SELECT * FROM tickets WHERE pid = '".$id."'";     
        $result                     =   $dbAdapter->fetchAll($sql);
        foreach($result AS $key => $value)
        {
                        
            if($value['ticket_start_sale_type'] == 0 && $value['ticket_end_sale_type'] == 1)
            {
                
                $insdata['ticket_start_sale_date']          =   date("Y-m-d H:i:s");
                $insdata['ticket_start_sale_time']          =   date("H:i:s");
                $insdata['ticket_end_sale_date']            =   $_POST['end_date'];
                $insdata['ticket_end_sale_time']            =   date("H:i:s", strtotime( ($_POST['end_time'] - $insdata['ticket_end_sale_time'] ) ) ); 
                
            }            
            if($value['ticket_start_sale_type'] == 1 && $value['ticket_end_sale_type'] == 0)
            {
                
                $insdata['ticket_start_sale_date']          =   $_POST['start_date'];
                $insdata['ticket_start_sale_time']          =   $_POST['start_time'];       
                
                $insdata['ticket_end_sale_date']            =   $_POST['end_date'];
                $insdata['ticket_end_sale_time']            =   $_POST['end_time'];
                
            } 
           
            $where  =   "id = '".$value['id']."'";        
            $numRows = $dbAdapter->update('tickets', $insdata, $where);  
            
        }
        */
        
        unset($insdata);   
        
        if(isset($_REQUEST['savedOrganizers']))
        {
            $insdata['oid']        =   $_POST['savedOrganizers'];
            
            $where  =   "id = '".$id."'";
            
            $numRows = $dbAdapter->update('events', $insdata, $where);
                
            
            
        }
        else
        {          
            $insdata['mid']                      =   Zend_Auth::getInstance()->getIdentity()->id;   
            $insdata['organization_name']        =   $_POST['organization_name'];
            $insdata['organization_description'] =   $_POST['organization_desc'];            
            $insdata['status']          =   'Active';
            $insdata['date_created']    =   date("Y-m-d H:i:s");
            
            $numRows    =   $dbAdapter->insert('organization', $insdata);
            $oid        =   $dbAdapter->lastInsertId();  
            
            
            
            unset($insdata);            
            $insdata['oid']        =   $oid;            
            $where  =   "id = '".$id."'";
                        
            $numRows = $dbAdapter->update('events', $insdata, $where);           
            
        }
        
                
        //$this->_redirect('/myevents');
                
        if(!$id)
        {
            $Response['error']		=	true;
            $Response['message']	=	'Error';
        }
        else
        {
            $Response['data']		=	$id;
            $Response['error']		=	false;
            $Response['message']	=	'Complete';
        }       

        //echo $Response['message'];exit();
        echo json_encode($Response);exit();
        
    }
       


}
