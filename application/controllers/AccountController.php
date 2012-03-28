<?php

class AccountController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
        $sql                        =   "SELECT * FROM themes WHERE `default` = '1' ";      
        $result                     =   $dbAdapter->fetchRow($sql);    
                
        $this->view->layout()->customstyleccs   = '<link href="/static/themes/'.$result['type'].'/'.$result['folder'].'/css/custom-style.css" rel="stylesheet" type="text/css" />';
        $this->view->layout()->pagetitle        = 'Account';
        $this->view->layout()->pagebreadcumb    = 'home &nbsp; &raquo; &nbsp; account';
        
        if(!Zend_Auth::getInstance()->getIdentity()->id)
        {
            $this->_redirect('/index');    
            
        }
    }

    public function indexAction()
    {
        // action body
        $this->view->accountemail   =   Zend_Auth::getInstance()->getIdentity()->email;
    }

    public function processAction()
    {
        //print_r($_REQUEST);die;
        
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
                          
        
        $Response['error']          =	false;
        $Response['message']        =   '';
               
                
        $insdata                    =   array();
        
        $std_user = new stdClass();

       
        foreach($_POST as $key => $value)
        {
           $insdata[$key]   =   $value; 
            
        }
        
        unset($insdata['t']);
        unset($insdata['changeaddress']);     
        unset($insdata['changeaddress']);        
        unset($insdata['home_state_dis']);
        unset($insdata['bill_state_dis']);
        unset($insdata['ship_state_dis']);
        unset($insdata['work_state_dis']);
        
        
        $where  =   "id = '".Zend_Auth::getInstance()->getIdentity()->id."'";
        
        
        
        $numRows = $dbAdapter->update('members', $insdata, $where);
        $id = $dbAdapter->lastInsertId();
        
        
        $std_user = new stdClass();
        
        $std_user->id   =   Zend_Auth::getInstance()->getIdentity()->id;
        
        foreach ($insdata as $keyuser => $valueuser)
        {
           $std_user->$keyuser = $valueuser;
        }
        
                
        Zend_Auth::getInstance()->getStorage()->write($std_user);
        
        
        unset($insdata);
        
        $Response['error']		=	false;
        $Response['message']	=	'Your Information has been updated';                
        echo json_encode($Response);exit();
        
        /**
         * $insdata['pid']             =   $id;
         *         $insdata['ticket_title']    =   $_POST['ticket_category'][1];
         *         $insdata['ticket_number']   =   $_POST['ticket_quantity'][1];        
         *         $insdata['ticket_price']    =   $_POST['ticket_price'][1];
         *         $insdata['date_created']    =   date("Y-m-d H:i:s");
         *         
         *         
         *         $numRows = $dbAdapter->insert('tickets', $insdata);
         *         $id = $dbAdapter->lastInsertId();
         */        
        //$this->_redirect('/account');
                
        if(!$id)
        {
            $Response['error']		=	true;
            $Response['message']	=	'Error';
        }
        else
        {
            $Response['error']		=	false;
            $Response['message']	=	'Complete';
        }       

        echo $Response['message'];exit();
        echo json_encode($Response);exit();
    }
    
    
    public function changeemailprocessAction()
    {
                
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
        
        $Response['error']          =	false;
        $Response['message']        =   '';
        
        if(empty($_REQUEST['newemail']) && empty($_REQUEST['newpassword'])) {
            $Response['error']		=	true;
            $Response['message']	=	'Please Provide Email And Password';
	       
            echo json_encode($Response);exit();
        }    
               
        $sql                        =   "Select * FROM members WHERE id = '".Zend_Auth::getInstance()->getIdentity()->id."' AND password  = MD5('".$_REQUEST['newpassword']."') ";
        $result                     =   $dbAdapter->fetchRow($sql);        
        if($result)
        {
            
            $insdata                =   array();
        
            $insdata['email']       =   $_REQUEST['newemail'];              
                   
            
            $where                  =   "id = '".$result['id']."'";
            
            $numRows                =   $dbAdapter->update('members', $insdata, $where);
            

                           
            if(!$numRows)
            {
                $Response['error']		=	true;
                $Response['message']	=	'Error';
            }
            else
            {
                Zend_Auth::getInstance()->getIdentity()->email  =   $_REQUEST['newemail'];

                $Response['error']		=	false;
                $Response['message']	=	'Complete';
            }       
    
            
                    
                            
                
        }
        else
        {
            $Response['error']		=	true;
            $Response['message']	=	'Sql';
            
        }
        
        echo json_encode($Response);exit();
        
        
    }


}