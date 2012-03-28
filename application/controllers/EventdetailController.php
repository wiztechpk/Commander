<?php

class EventdetailController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        if($_REQUEST['id'])
        {
            $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
            $sql                        =   "SELECT th.* FROM themes th INNER JOIN events e ON th.id=e.theme  WHERE e.id = '".$_REQUEST['id']."' ";      
            $result                     =   $dbAdapter->fetchRow($sql);     
                        
            $this->view->layout()->customstyleccs = '<link href="/static/themes/'.$result['type'].'/'.$result['folder'].'/css/custom-style.css" rel="stylesheet" type="text/css" />';
            $this->view->layout()->pagetitle        = 'Create Event';
            $this->view->layout()->pagebreadcumb    = 'home &nbsp; &raquo; &nbsp; create event';	

            
        }
        else
        {
            $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
            $sql                        =   "SELECT * FROM themes WHERE `default` = '1' ";      
            $result                     =   $dbAdapter->fetchRow($sql);    
                
            $this->view->layout()->customstyleccs = '<link href="/static/themes/'.$result['type'].'/'.$result['folder'].'/css/custom-style.css" rel="stylesheet" type="text/css" />';
            $this->view->layout()->pagetitle        = 'Create Event';
            $this->view->layout()->pagebreadcumb    = 'home &nbsp; &raquo; &nbsp; create event';
            
        }
        
        
        
        
    }

    public function indexAction()
    {
             
        
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
        
        $sql                        =   "SELECT * FROM events WHERE id = '".$_REQUEST['id']."' ";      
        $resulteventdetail          =   $dbAdapter->fetchRow($sql);        
        $this->view->eventdetail    =   $resulteventdetail;
        
        //echo $this->ImageResizer('event_logos/'.$resulteventdetail['logo'].'');
         
        
        $sql                        =   "SELECT * FROM organization WHERE id = '".$resulteventdetail['oid']."' ";      
        $result                     =   $dbAdapter->fetchRow($sql);        
        $this->view->orgdetail      =   $result; 
        
        
        $sql                        =   "SELECT t.* , IFNULL((SELECT SUM(tq) FROM orders_tickets ot WHERE ot.tid = t.id),0) AS ticket_sold FROM tickets t WHERE t.pid = '".$_REQUEST['id']."' ";      
        $result                     =   $dbAdapter->fetchAll($sql);        
        $this->view->ticketdetail   =   $result;
        
        
        $this->view->layout()->pagetitle        = $resulteventdetail['title'];
        $this->view->layout()->pagebreadcumb    = 'home &nbsp; &raquo; &nbsp; '.strtolower($resulteventdetail['title']);
    }
    
}