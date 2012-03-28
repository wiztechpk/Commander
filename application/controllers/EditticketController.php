<?php

class EditticketController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
        $sql                        =   "SELECT * FROM themes WHERE `default` = '1' ";      
        $result                     =   $dbAdapter->fetchRow($sql);    
                
        $this->view->layout()->customstyleccs = '<link href="/static/themes/'.$result['type'].'/'.$result['folder'].'/css/custom-style.css" rel="stylesheet" type="text/css" />';
        $this->view->layout()->pagetitle        = 'Edit Ticket';
        $this->view->layout()->pagebreadcumb    = 'home &nbsp; &raquo; &nbsp; edit ticket';
        
        if(!Zend_Auth::getInstance()->getIdentity()->id)
        {
            $this->_redirect('/index');    
            
        }
    }

    public function indexAction()
    {
        // action body
        
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter                          =   Zend_Db_Table::getDefaultAdapter();
        
        $sql                                =   "SELECT * FROM tickets WHERE id = '".$_REQUEST['tid']."' ";      
        $result                             =   $dbAdapter->fetchRow($sql);
        
        $insdata                            =   array();
        
        $insdata['id']                      =   $result['id'];
        $insdata['pid']                     =   $result['pid'];
        $insdata['ticket_title']            =   $result['ticket_title'];
        $insdata['ticket_description']      =   $result['ticket_description'];
        $insdata['ticket_price_type']       =   $result['ticket_price_type'];
        $insdata['ticket_price']            =   ($result['ticket_price']=="0") ? '' : $result['ticket_price'];
        $insdata['ticket_quantity']         =   ($result['ticket_quantity']=="0") ? '' : $result['ticket_quantity'];
        $insdata['ticket_start_sale_date']  =   ($result['ticket_start_sale_date']=="0000-00-00 00:00:00" || $result['ticket_start_sale_date']=="0000-00-00" ) ? '' : $result['ticket_start_sale_date'];
        $insdata['ticket_end_sale_date']    =   ($result['ticket_end_sale_date']=="0000-00-00 00:00:00" || $result['ticket_end_sale_date']=="0000-00-00") ? '' : $result['ticket_end_sale_date'];
        $insdata['ticket_min_order']        =   ($result['ticket_min_order']=="0") ? '' : $result['ticket_min_order'];
        $insdata['ticket_max_order']        =   ($result['ticket_max_order']=="0") ? '' : $result['ticket_max_order'];
        
        echo json_encode($insdata);die;
        
        $this->view->ticketdetail   =   $result;
        
        /*
         echo $sql                        =   "SELECT start_date,start_time,end_date,end_time FROM events WHERE id = '".$_REQUEST['eid']."'";die;     
                 $result                     =   $dbAdapter->fetchRow($sql);
                 print_r($result);die;
                 $this->view->start_date     =   $result['start_date'];
                 $this->view->start_time     =   $result['start_time'];
                 $this->view->end_date       =   $result['end_date'];
                 $this->view->end_time       =   $result['end_time']; 
         */
        
        
    }

    public function processAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
                            
        
        $Response['error'] 		=	false;
        $Response['message'] 	=	'';          
        
        $insdata                =   array();
        
        foreach($_POST AS $key => $value)
        {
           if($key != 't' || $key != 'eid' || $key != 'tcid' || $key != 'num_sold' )
           {
                $insdata[$key]           =   $value; 
           }
              
            
        }       
                
        unset($insdata['tid']);        
        unset($insdata['is_donation']);
        unset($insdata['PHPSESSID']);
        
        $where  =   "id = '".$_REQUEST['tid']."'";
        
        $numRows = $dbAdapter->update('tickets', $insdata, $where);
        
        
        echo $insdata['pid'];die;
        
        $id = $dbAdapter->lastInsertId();      
               
                
        if(!$id)
        {
            $Response['error']		=	true;
            $Response['message']	=	'Error';            
        }
        else
        {
            $Response['error']		=	false;
            $Response['message']	=	'Complete';
            $Response['data']	=	$id;
        }       

        //echo $Response['message'];exit();
        echo json_encode($Response);exit();
        
    }


}



