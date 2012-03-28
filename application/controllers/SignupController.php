<?php

class SignupController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        
        
    }

    public function processAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
                
        $members        =   new Application_Model_Members();
        
        
        $Response['error'] 		=	false;
        $Response['message'] 	=	'';
        
        if(!filter_var($_POST['user_email'], FILTER_VALIDATE_EMAIL)) {
            $Response['error']		=	true;
            $Response['message']	=	'Please Provide A Valid Email Address';
	       
            echo json_encode($Response);exit();
        }
        
        if($members->checkUnique($_POST['user_email'])){
            $Response['error']		=	true;
            $Response['message']	=	'Email Adress Already Exits in Our Database';
	       
            echo json_encode($Response);exit();
        }
        
        if(!filter_var($_POST['user_password'], FILTER_SANITIZE_STRING)) {
            $Response['error']		=	true;
            $Response['message']	=	'Please Provide Password';
	       
            echo json_encode($Response);exit();
        }
        
              
        
        
                
        $insdata                    =   array();
        $insdata['membership_id']   =   $_POST['membership_id'];
        $insdata['first_name']      =   $_POST['user_first_name'];
        $insdata['last_name']       =   $_POST['user_last_name'];
        $insdata['email']           =   $_POST['user_email'];
        $insdata['password']        =   md5($_POST['user_password']); 
        $insdata['type']            =   'Coordinator';
        $insdata['date_created']    =   date("Y-m-d H:i:s");
        
        $members->signupmember($insdata);        
        $id = $members->signupmemberid();
        
        //$this->_redirect('/login/index');
        
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

        //echo $Response['message'];exit();
        echo json_encode($Response);exit();
        
    }

    public function thanksAction()
    {
        // action body
    }


}

