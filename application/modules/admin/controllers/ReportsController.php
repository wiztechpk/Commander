<?php

class Admin_ReportsController extends Zend_Controller_Action
{

    public $requestdata = null;

    public function init()
    {
        /* Initialize action controller here */
        $this->requestdata= Zend_Registry::get('requestdata');
        $this->_helper->layout->setLayout('admin');       
        
    }

    public function indexAction()
    {
        // action body
    }

    public function membersreportAction()
    {
        // action body
    }
    
    public function membersreportdataAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();        
        
        $month = array (
            1 => 'January',
            2 => 'February',
            3 => 'March',
            4 => 'April',
            5 => 'May',
            6 => 'June',
            7 => 'July',
            8 => 'August',
            9 => 'September',
            10 => 'October',
            11 => 'November',
            12 => 'December'
        );


        $data = array();
        
        
        for($i=1; $i<=12; $i++)
        {
            
                $month  = date("Y-m-d", mktime(0, 0, 0, $i,   1 ,   date("Y")));   
                $sql    = " SELECT MONTHNAME('".$month."') AS month,COUNT(id) AS `data` FROM members WHERE type = 'Member' AND MONTH(date_created) = '".$i."' ";      
                $result = $dbAdapter->fetchAll($sql);
                //print_r($result);
            $data[]   =   $result[0];
            
        }                   
        
        
        echo json_encode(array(            
            'result'      => $data
        ));
    }
    
    public function membersfilterreportdataAction()
    {
               
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();        
        
        $data           =   array();
        
        $StartDate      =   gmdate("Y-m-d", strtotime($_REQUEST['startdate']));
        $EndDate        =   gmdate("Y-m-d", strtotime($_REQUEST['enddate']));
        
        while($StartDate < $EndDate){
            // Add a day to the current date
            $StartDate  =   gmdate("Y-m-d", strtotime("+1 day", strtotime($StartDate)));
            $sql        =   "SELECT '".$StartDate."' AS date, COUNT(id) AS `data` FROM members WHERE type = 'Member' AND DATE(date_created) = '".$StartDate."'";      
            $result     =   $dbAdapter->fetchRow($sql);                                      
            $data[]     =   $result;
                    
        }      
        
        echo json_encode(array(            
            'result'      => $data
        ));
                
    }
    
    public function coordinatorsreportdataAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();        
        
        $month = array (
            1 => 'January',
            2 => 'February',
            3 => 'March',
            4 => 'April',
            5 => 'May',
            6 => 'June',
            7 => 'July',
            8 => 'August',
            9 => 'September',
            10 => 'October',
            11 => 'November',
            12 => 'December'
        );


        $data = array();
        
        
        for($i=1; $i<=12; $i++)
        {
            
                $month  = date("Y-m-d", mktime(0, 0, 0, $i,   1 ,   date("Y")));   
                $sql    = " SELECT MONTHNAME('".$month."') AS month,COUNT(id) AS `data` FROM members WHERE type = 'Coordinator' AND MONTH(date_created) = '".$i."' ";      
                $result = $dbAdapter->fetchAll($sql);
                //print_r($result);
            $data[]   =   $result[0];
            
        }                   
        
        
        echo json_encode(array(            
            'result'      => $data
        ));
    }
    
    public function coordinatorsfilterreportdataAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();        
        
        $data           =   array();
        
        $StartDate      =   gmdate("Y-m-d", strtotime($_REQUEST['startdate']));
        $EndDate        =   gmdate("Y-m-d", strtotime($_REQUEST['enddate']));
        
        while($StartDate < $EndDate){
            // Add a day to the current date
            $StartDate  =   gmdate("Y-m-d", strtotime("+1 day", strtotime($StartDate)));
            $sql        =   "SELECT '".$StartDate."' AS date, COUNT(id) AS `data` FROM members WHERE type = 'Coordinator' AND DATE(date_created) = '".$StartDate."'";      
            $result     =   $dbAdapter->fetchRow($sql);                                      
            $data[]     =   $result;
                    
        }      
        
        echo json_encode(array(            
            'result'      => $data
        ));
    }
    
    public function eventsreportdataAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();        
        
        $month = array (
            1 => 'January',
            2 => 'February',
            3 => 'March',
            4 => 'April',
            5 => 'May',
            6 => 'June',
            7 => 'July',
            8 => 'August',
            9 => 'September',
            10 => 'October',
            11 => 'November',
            12 => 'December'
        );


        $data = array();
        
        
        for($i=1; $i<=12; $i++)
        {
            
                $month  = date("Y-m-d", mktime(0, 0, 0, $i,   1 ,   date("Y")));   
                $sql    = " SELECT MONTHNAME('".$month."') AS month,COUNT(id) AS `data` FROM events WHERE MONTH(date_created) = '".$i."' ";      
                $result = $dbAdapter->fetchAll($sql);
                //print_r($result);
            $data[]   =   $result[0];
            
        }                   
        
        
        echo json_encode(array(            
            'result'      => $data
        ));
    }
    
    public function eventsfilterreportdataAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();        
        
        $data           =   array();
        
        $StartDate      =   gmdate("Y-m-d", strtotime($_REQUEST['startdate']));
        $EndDate        =   gmdate("Y-m-d", strtotime($_REQUEST['enddate']));
        
        while($StartDate < $EndDate){
            // Add a day to the current date
            $StartDate  =   gmdate("Y-m-d", strtotime("+1 day", strtotime($StartDate)));
            $sql        =   "SELECT '".$StartDate."' AS date, COUNT(id) AS `data` FROM events WHERE DATE(date_created) = '".$StartDate."'";      
            $result     =   $dbAdapter->fetchRow($sql);                                      
            $data[]     =   $result;
                    
        }      
        
        echo json_encode(array(            
            'result'      => $data
        ));
    }
    public function ticketsreportdataAction()
    {
        
        
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();        
        
        $month = array (
            1 => 'January',
            2 => 'February',
            3 => 'March',
            4 => 'April',
            5 => 'May',
            6 => 'June',
            7 => 'July',
            8 => 'August',
            9 => 'September',
            10 => 'October',
            11 => 'November',
            12 => 'December'
        );


        $data = array();
        
        
        for($i=1; $i<=12; $i++)
        {
            
                $month  = date("Y-m-d", mktime(0, 0, 0, $i,   1 ,   date("Y")));   
                $sql    = " SELECT MONTHNAME('".$month."') AS month,COUNT(id) AS `data` FROM tickets WHERE MONTH(date_created) = '".$i."' ";      
                $result = $dbAdapter->fetchAll($sql);
                //print_r($result);
            $data[]   =   $result[0];
            
        }                   
        
        
        echo json_encode(array(            
            'result'      => $data
        ));
    }
    
    public function ticketsfilterreportdataAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();        
        
        $data           =   array();
        
        $StartDate      =   gmdate("Y-m-d", strtotime($_REQUEST['startdate']));
        $EndDate        =   gmdate("Y-m-d", strtotime($_REQUEST['enddate']));
        
        while($StartDate < $EndDate){
            // Add a day to the current date
            $StartDate  =   gmdate("Y-m-d", strtotime("+1 day", strtotime($StartDate)));
            $sql        =   "SELECT '".$StartDate."' AS date, COUNT(id) AS `data` FROM tickets WHERE DATE(date_created) = '".$StartDate."'";      
            $result     =   $dbAdapter->fetchRow($sql);                                      
            $data[]     =   $result;
                    
        }      
        
        echo json_encode(array(            
            'result'      => $data
        ));       
        
    }    
    
    
    public function transactionsreportdataAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();        
        
        $month = array (
            1 => 'January',
            2 => 'February',
            3 => 'March',
            4 => 'April',
            5 => 'May',
            6 => 'June',
            7 => 'July',
            8 => 'August',
            9 => 'September',
            10 => 'October',
            11 => 'November',
            12 => 'December'
        );


        $data = array();
        
        
        for($i=1; $i<=12; $i++)
        {
            
                $month  = date("Y-m-d", mktime(0, 0, 0, $i,   1 ,   date("Y")));   
                $sql    = " SELECT MONTHNAME('".$month."') AS month,COUNT(id) AS `data` FROM orders WHERE MONTH(date_created) = '".$i."' ";      
                $result = $dbAdapter->fetchAll($sql);
                //print_r($result);
            $data[]   =   $result[0];
            
        }                   
        
        
        echo json_encode(array(            
            'result'      => $data
        ));
    }
    
    public function transactionsfilterreportdataAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();        
        
        $data           =   array();
        
        $StartDate      =   gmdate("Y-m-d", strtotime($_REQUEST['startdate']));
        $EndDate        =   gmdate("Y-m-d", strtotime($_REQUEST['enddate']));
        
        while($StartDate < $EndDate){
            // Add a day to the current date
            $StartDate  =   gmdate("Y-m-d", strtotime("+1 day", strtotime($StartDate)));
            $sql        =   "SELECT '".$StartDate."' AS date, COUNT(id) AS `data` FROM orders WHERE DATE(date_created) = '".$StartDate."'";      
            $result     =   $dbAdapter->fetchRow($sql);                                      
            $data[]     =   $result;
                    
        }      
        
        echo json_encode(array(            
            'result'      => $data
        ));       
        
               
    }
    
    
    public function transactionschartportletdataAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();        
        
        $month = array (
            1 => 'January',
            2 => 'February',
            3 => 'March',
            4 => 'April',
            5 => 'May',
            6 => 'June',
            7 => 'July',
            8 => 'August',
            9 => 'September',
            10 => 'October',
            11 => 'November',
            12 => 'December'
        );


        $data = array();
        
                
        for($i=date("n")-3; $i<=date("n"); $i++)
        {
            
                $month  = date("Y-m-d", mktime(0, 0, 0, $i,   1 ,   date("Y")));   
                $sql    = " SELECT MONTHNAME('".$month."') AS month,COUNT(id) AS `data` FROM orders WHERE MONTH(date_created) = '".$i."' ";      
                $result = $dbAdapter->fetchAll($sql);
                //print_r($result);
            $data[]   =   $result[0];
            
        }                   
        
        
        echo json_encode(array(            
            'result'      => $data
        ));
    }


}


