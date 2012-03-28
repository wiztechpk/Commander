<?php

class PasswordController extends Zend_Controller_Action
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
        // action body
    }

    public function processAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
                          
        
        $Response['error']          =	false;
        $Response['message']        =   '';
        
        if(empty($_REQUEST['oldpassword']) && empty($_REQUEST['newpassword1']) && empty($_REQUEST['newpassword2'])) {
            $Response['error']		=	true;
            $Response['message']	=	'Please Provide Old And New Passwords';
	       
            echo json_encode($Response);exit();
        }   
               
        $sql                        =   "Select * FROM members WHERE id = '".Zend_Auth::getInstance()->getIdentity()->id."' AND password  = MD5('".$_REQUEST['oldpassword']."') ";
        $result                     =   $dbAdapter->fetchRow($sql);        
        if($result)
        {
            
            $insdata                =   array();
        
            $insdata['password']    =   md5($_REQUEST['newpassword1']);              
            
            $where                  =   "id = '".$result['id']."'";
            
            $numRows                =   $dbAdapter->update('members', $insdata, $where);
            

                           
            if(!$numRows)
            {
                $Response['error']		=	true;
                $Response['message']	=	'Error';
            }
            else
            {
                //$this->_redirect('/password');
                $Response['error']		=	false;
                $Response['message']	=	'Password has been updated successfully';
            }       
    
            
                    
                            
                
        }
        else
        {
            $Response['error']		=	true;
            $Response['message']	=	'Old Password does not match';
            
        }        
        
        echo json_encode($Response);exit();
    }


}



