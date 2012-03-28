<?php

class MyticketsController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
        $sql                        =   "SELECT * FROM themes WHERE `default` = '1' ";      
        $result                     =   $dbAdapter->fetchRow($sql);    
                
        $this->view->layout()->customstyleccs = '<link href="/static/themes/'.$result['type'].'/'.$result['folder'].'/css/custom-style.css" rel="stylesheet" type="text/css" />';
        $this->view->layout()->pagetitle        = 'My Tickets';
        $this->view->layout()->pagebreadcumb    = 'home &nbsp; &raquo; &nbsp; my tickets';
        
        if(!Zend_Auth::getInstance()->getIdentity()->id)
        {
            $this->_redirect('/index');    
            
        }
    }

    public function indexAction()
    {
        $dbAdapter          =   Zend_Db_Table::getDefaultAdapter();        
           
        //$sql                =   "SELECT * FROM `events` e INNER JOIN orders o ON e.id=o.eid LEFT JOIN orders_detail od ON o.id=od.oid WHERE mid  = '".Zend_Auth::getInstance()->getIdentity()->id."'";
        $sql                =   "SELECT e.*,o.*, o.id AS oid FROM `events` e INNER JOIN orders o ON e.id=o.eid WHERE `mid`  = '".Zend_Auth::getInstance()->getIdentity()->id."'";
        $result             =   $dbAdapter->fetchAll($sql);
        
        $this->view->result =   $result;
        
    }


}

