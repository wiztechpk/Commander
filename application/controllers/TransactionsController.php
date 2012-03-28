<?php

class TransactionsController extends Zend_Controller_Action
{

    public function init()
    {
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
        $sql                        =   "SELECT * FROM themes WHERE `default` = '1' ";      
        $result                     =   $dbAdapter->fetchRow($sql);    
          
        $this->view->layout()->customstyleccs   = '<link href="/static/themes/'.$result['type'].'/'.$result['folder'].'/css/custom-style.css" rel="stylesheet" type="text/css" />';
        $this->view->layout()->pagetitle        = 'Transactions';
        $this->view->layout()->pagebreadcumb    = 'home &nbsp; &raquo; &nbsp; transactions';
        
        if(!Zend_Auth::getInstance()->getIdentity()->id)
        {
            $this->_redirect('/index');    
            
        }
    }

    public function indexAction()
    {
        
        $this->view->layout()->pagetitle        = 'Transactions';
        $this->view->layout()->pagebreadcumb    = 'home &nbsp; &raquo; &nbsp; transactions';
        
        if(!Zend_Auth::getInstance()->getIdentity()->id)
        {
            $this->_redirect('/index');    
            
        }
    }

    public function transactionsAction()
    {
        
        $this->view->layout()->pagetitle        = 'Transactions';
        $this->view->layout()->pagebreadcumb    = 'home &nbsp; &raquo; &nbsp; transactions';
        
        if(!Zend_Auth::getInstance()->getIdentity()->id)
        {
            $this->_redirect('/index');    
            
        }
    }

    public function receiptsAction()
    {
        
        $this->view->layout()->pagetitle        = 'Receipts';
        $this->view->layout()->pagebreadcumb    = 'home &nbsp; &raquo; &nbsp; transactions &nbsp; &raquo; &nbsp; recipts';
        
        if(!Zend_Auth::getInstance()->getIdentity()->id)
        {
            $this->_redirect('/index');    
            
        }
    }

    public function membershipstatusAction()
    {
        
        $this->view->layout()->pagetitle        = 'Membership Status';
        $this->view->layout()->pagebreadcumb    = 'home &nbsp; &raquo; &nbsp; transactions &nbsp; &raquo; &nbsp; membership status';
        
        if(!Zend_Auth::getInstance()->getIdentity()->id)
        {
            $this->_redirect('/index');    
            
        }
    }

    public function transactiondetailAction()
    {
        
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter              =   Zend_Db_Table::getDefaultAdapter();
        
        $sql                    =   "SELECT (SELECT ticket_title FROM tickets t WHERE  t.id = ot.tid ) AS ticket_title, IFNULL((SELECT CONCAT('$',ticket_price) FROM tickets t WHERE  t.id = ot.tid ),'Free') AS ticket_price, od.attende_name, od.attende_email, od.attende_cell_phone  FROM `orders` o INNER JOIN `orders_tickets` ot ON o.id=ot.oid INNER JOIN `orders_detail` od ON ot.id=od.otid WHERE o.id = '".$_REQUEST['tid']."'";
        $result                 =   $dbAdapter->fetchAll($sql);
        
        echo    '<div id="invoiceListing">                
                <div id="eventName">Ticket Title</div>
                <div id="eventPrice">Ticket Price</div>
                <div id="eventDate">Attende Name</div>
                <div id="eventDate">Attende Email</div>    
                <div id="eventDate">Attende Cell phone</div>    
                <div style="clear:both;"></div>';                
        foreach($result as $key=>$value)
        {     
            echo    '
                    <div class="" id="myevent'.$value['id'].'" >
                    <div class="eventUnderName">'.$value['ticket_title'].'</div>
                    <div class="eventUnderPrice">'.$value['ticket_price'].'</div>
                    <div class="eventUnderDate">'.$value['attende_name'].'</div>     
                    <div class="eventUnderDate">'.$value['attende_email'].'</div>
                    <div class="eventUnderDate">'.$value['attende_cell_phone'].'</div>
                    <div style="clear:both;"></div>
                    '; 
                
        
        }        
        echo    '</div>';
        echo    '<div style="clear:both;"></div>';
        //echo Zend_Json::encode($result);     
        
    }
    
    public function ordertransactiondetailAction()
    {
        
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter              =   Zend_Db_Table::getDefaultAdapter();
        
        $sql                    =   "SELECT (SELECT ticket_title FROM tickets t WHERE  t.id = ot.tid ) AS ticket_title, IFNULL((SELECT CONCAT('$',ticket_price) FROM tickets t WHERE  t.id = ot.tid ),'Free') AS ticket_price, od.attende_name, od.attende_email, od.attende_cell_phone  FROM `orders` o INNER JOIN `orders_tickets` ot ON o.id=ot.oid INNER JOIN `orders_detail` od ON ot.id=od.otid WHERE o.id = '".$_REQUEST['tid']."'";        
        $result                 =   $dbAdapter->fetchAll($sql);
        
        echo    '<div id="invoiceListing">                
                <div id="eventName">Ticket Title</div>
                <div id="eventPrice">Ticket Price</div>
                <div id="eventDate">Attende Name</div>
                <div id="eventDate">Attende Email</div>    
                <div id="eventDate">Attende Cell phone</div>                              
                <div style="clear:both;"></div>';                
        foreach($result as $key=>$value)
        {               
             
        echo    '
                <div class="" id="myevent'.$value['id'].'" >
                <div class="eventUnderName">'.$value['ticket_title'].'</div>
                <div class="eventUnderPrice">'.$value['ticket_price'].'</div>
                <div class="eventUnderDate">'.$value['attende_name'].'</div>     
                <div class="eventUnderDate">'.$value['attende_email'].'</div>
                <div class="eventUnderDate">'.$value['attende_cell_phone'].'</div>
                <div style="clear:both;"></div>
                ';
        }        
        echo    '</div>';
        echo    '<div style="clear:both;"></div>';
        //echo Zend_Json::encode($result);     
        
    }

    public function ticketsoldAction()
    {
        // action body
    }

    public function ticketorderAction()
    {
        // action body
    }


}











