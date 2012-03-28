<?php

class PublisheventController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
        $sql                        =   "SELECT * FROM themes WHERE `default` = '1' ";      
        $result                     =   $dbAdapter->fetchRow($sql);    
                
        $this->view->layout()->customstyleccs = '<link href="/static/themes/'.$result['type'].'/'.$result['folder'].'/css/custom-style.css" rel="stylesheet" type="text/css" />';
    }

    public function indexAction()
    {
        // action body        
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        
        $Response['error'] 		=	false;
        $Response['message'] 	=	'';
        
       
        $dbAdapter              =   Zend_Db_Table::getDefaultAdapter();
        $sql                    =   "SELECT * FROM events WHERE id = '".$_REQUEST['eid']."'";      
        $result                 =   $dbAdapter->fetchRow($sql);   
        
        if($result['event_status']=="Draft")
        {
            
            if($result['title'] == "")
            {
                $Response['error']		=	true;
                $Response['message']	=	'Please Provide A Event Title ';
                echo json_encode($Response);exit();    	       
                
            }
            
            
            if($result['start_date'] == "" || $result['start_date'] == "0000-00-00") {
                $Response['error']		=	true;
                $Response['message']	=	'Please Provide Event Start Date';
                echo json_encode($Response);exit();
    	       
                
            }
            
            if($result['end_date'] == "" || $result['end_date'] == "0000-00-00") {
                $Response['error']		=	true;
                $Response['message']	=	'Please Provide Event End Date';
                echo json_encode($Response);exit();
    	       
                
            }
            
            
            if($result['country'] == "" || $result['country'] == "0") {
                $Response['error']		=	true;
                $Response['message']	=	'Please Provide A Event Country ';
                echo json_encode($Response);exit();
    	       
                
            }
            
            if($result['category'] == "" || $result['category'] == "0" ) {
                $Response['error']		=	true;
                $Response['message']	=	'Please Provide A Event Category ';
                echo json_encode($Response);exit();
    	       
                
            }
            
            
            $sql                    =   "SELECT * FROM tickets WHERE pid = '".$_REQUEST['eid']."'";
            $result_tickets         =   $dbAdapter->fetchAll($sql);
            
            if(empty($result_tickets) || count($result_tickets) < 1 ) {
                $Response['error']		=	true;
                $Response['message']	=	'Please Make Event Tickets ';
    	       
                
            }        
            
            if(!$Response['error'])
            {
                                     
               
                
                foreach($result_tickets as $key => $value)
                {
                    $insdata                            =   array();
					$insdata['ticket_start_sale_date']  =   ($value['ticket_start_sale_date']=="0000-00-00") ? $result['start_date'] : $value['ticket_start_sale_date'];
                    $insdata['ticket_end_sale_date']    =   ($value['ticket_end_sale_date']=="0000-00-00") ? $result['end_date'] : $value['ticket_end_sale_date'];
                    $where                              =   "id = '".$value['id']."'";
                    $dbAdapter->update('tickets', $insdata , $where);
                    unset($insdata);
                    
                }    
                
                $insdata                    =   array();
                $insdata['event_status']    =   $_REQUEST['event_status'];
                $insdata['status']          =   'Active';        
                    
                $where                      =   "id = '".$_REQUEST['eid']."'";
                        
                  
                $dbAdapter->update('events', $insdata , $where);
                
                
                
                $Response['error']		=	false;
                $Response['message']	=	'Good News! <br />Your event has been published and now the visitors can access your event page @ http://commander.wiztechpk.com/eventdetail/?id='.$_REQUEST['eid'].' and start purchasing tickets for your events. ';
                        
                /*
                if($numRows)
                {
                    //echo "Error"; exit();
                    $Response['error']		=	true;
                    $Response['message']	=	'Error';            
                }
                else
                {
                    //$this->_redirect('/myevents/index'); exit();
                    $Response['error']		=	false;
                    $Response['message']	=	'Good News! <br />Your event has been published and now the visitors can access your event page @ http://commander.wiztechpk.com/eventdetail/?id='.$_REQUEST['eid'].' and start purchasing tickets for your events. ';            
                }   
                */    
            }   
            
            
            
            
            
        }
        else
        {
            $insdata                    =   array();
            $insdata['event_status']    =   $_REQUEST['event_status'];
            $insdata['status']          =   'Active';        
                  
            $where                      =   "id = '".$_REQUEST['eid']."'";
                        
                  
            $dbAdapter->update('events', $insdata , $where);
                
            $Response['error']		=	false;
            $Response['message']	=	'Event is set as draft ';
        }        
        
        
        
        echo json_encode($Response);exit();
    }


}

