<?php

class Admin_MembershipController extends Zend_Controller_Action
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
        //$dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        //$sql = "SELECT * FROM admin";      
        //$result= $dbAdapter->fetchAll($sql);
        //print_r($result);       
          
    }
    
    public function viewAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                
        $sql = " SELECT * FROM membership ";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
        
               
          
    }

    public function createAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
                        
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
          
        $insdata        =   array();
        
        foreach($_REQUEST as $key => $value)
        {
           $insdata[$key]   =   $value; 
            
        }             
         
        $insdata['date_created']   =   date("Y-m-d H:i:s");
        
        
        // try insert with data array
        $numRows = $dbAdapter->insert('membership', $insdata);
        $id = $dbAdapter->lastInsertId();
        
        if(!$id)
        {
            echo "{
                'success': false,
                'msg': 'An error occured, please try again later.'
            }";
        }
        else
        {
            echo "{
                'success': true,
                'msg': 'Form submission complete.'
            }";
        }             
                             
          
    }

    public function updateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
          
        $insdata        =   array();
        
        foreach($_REQUEST as $key => $value)
        {
           $insdata[$key]   =   $value; 
            
        }   
                       
        $where  =   "id = '".$data['id']."'";
                
          
        $numRows        = $dbAdapter->update('events', $data , $where);
        
        if(!$numRows)
        {
            echo "{
                'success': false,
                'msg': 'An error occured, please try again later.'
            }";
        }
        else
        {
            echo "{
                'success': true,
                'msg': 'Form submission complete.'
            }";
        }                    
                    
    }   


}