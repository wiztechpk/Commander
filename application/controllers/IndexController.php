<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */        
        //$this->view->layout()->styleccs = '<link href="/static/css/style.css" rel="stylesheet" type="text/css" />';
        
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
        $sql                        =   "SELECT * FROM themes WHERE `default` = '1' ";      
        $result                     =   $dbAdapter->fetchRow($sql);    
                
        $this->view->layout()->customstyleccs = '<link href="/static/themes/'.$result['type'].'/'.$result['folder'].'/css/custom-style.css" rel="stylesheet" type="text/css" />';
        $this->view->layout()->websitetitle     = 'EventCommandCenter';
        $this->view->layout()->headtitle        = 'EventCommandCenter';
        $this->view->layout()->pagetitle        = 'Home';
        $this->view->layout()->pagebreadcumb    = 'home';
        
    }

    public function indexAction()
    {
        
        require_once("functions_strings.php");
        
        $dbAdapter          =   Zend_Db_Table::getDefaultAdapter();
        
        $sql                = "SELECT * FROM categories WHERE status = 'Active' ORDER BY id DESC ";      
        $result             = $dbAdapter->fetchAll($sql);        
        $this->view->result = $result;   
        
       
        $sql                = "SELECT * FROM events WHERE event_status = 'Published' AND status = 'Active' ORDER BY id DESC ";
        $result1             = $dbAdapter->fetchAll($sql);        
        $this->view->result1 = $result1;     
        
    }   


}