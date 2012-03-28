<?php

class EventattendeController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
        $sql                        =   "SELECT * FROM themes WHERE `default` = '1' ";      
        $result                     =   $dbAdapter->fetchRow($sql);    
                
        $this->view->layout()->customstyleccs = '<link href="/static/themes/'.$result['type'].'/'.$result['folder'].'/css/custom-style.css" rel="stylesheet" type="text/css" />';
        $this->view->layout()->pagetitle        = 'Event Attendee';
        $this->view->layout()->pagebreadcumb    = 'home &nbsp; &raquo; &nbsp; evemt attendee';
        
        if(!Zend_Auth::getInstance()->getIdentity()->id)
        {
            $this->_redirect('/index');    
            
        }
    }

    public function indexAction()
    {
        
        $dbAdapter          =   Zend_Db_Table::getDefaultAdapter();
                
        //$sql                =   "SELECT * FROM `orders` WHERE eid = '".$_REQUEST['eid']."' ";
        $sql                =   "SELECT (SELECT id FROM tickets t WHERE  t.id = ot.tid ) AS tid, (SELECT ticket_title FROM tickets t WHERE  t.id = ot.tid ) AS ticket_title, o.id AS oid, ot.id AS otid, od.id AS odid, od.attende_name, od.attende_email, od.attende_cell_phone  FROM `orders` o INNER JOIN `orders_tickets` ot ON o.id=ot.oid INNER JOIN `orders_detail` od ON ot.id=od.otid WHERE o.eid = '".$_REQUEST['eid']."' ";
        if($_REQUEST['tid'])
        {
            $sql    .=  " AND ot.tid   =   '".$_REQUEST['tid']."'";
            
        }                   
        $result             =   $dbAdapter->fetchAll($sql);
        $this->view->result =   $result;        
        
    }


}

