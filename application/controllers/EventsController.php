<?php

class EventsController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        
        /* Initialize action controller here */
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
        $sql                        =   "SELECT * FROM themes WHERE `default` = '1' ";      
        $result                     =   $dbAdapter->fetchRow($sql);    
                
        $this->view->layout()->customstyleccs = '<link href="/static/themes/'.$result['type'].'/'.$result['folder'].'/css/custom-style.css" rel="stylesheet" type="text/css" />';
        $this->view->layout()->pagetitle        = 'Events';
        $this->view->layout()->pagebreadcumb    = 'home &nbsp; &raquo; &nbsp; events';
    }

    public function indexAction()
    {
        $dbAdapter          =   Zend_Db_Table::getDefaultAdapter();
        
        if($_REQUEST['cid'])
        {
            $sql                = "SELECT * FROM events WHERE event_status = 'Published' AND status = 'Active' AND category = '".$_REQUEST['cid']."' ";
        }
        else
        {
            $sql                = "SELECT * FROM events WHERE event_status = 'Published' AND status = 'Active' ";    
        }
              
        $result             = $dbAdapter->fetchAll($sql);        
        $this->view->result = $result;  
    }


}

