<?php

class EventticketsController extends Zend_Controller_Action
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
        $dbAdapter          =   Zend_Db_Table::getDefaultAdapter();
                
        $sql                =   "SELECT t.id, t.pid, t.ticket_title, t.ticket_quantity, t.ticket_price, IFNULL((SELECT SUM(tq) FROM orders_tickets ot WHERE ot.tid = t.id),0) AS ticket_sold   FROM tickets t WHERE pid = '".$_REQUEST['eid']."' ";      
        $result             =   $dbAdapter->fetchAll($sql);
        $this->view->result =   $result;   
        
        
        
    }


}

