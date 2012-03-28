<?php
 
class MyprofileController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
        $sql                        =   "SELECT * FROM themes WHERE `default` = '1' ";      
        $result                     =   $dbAdapter->fetchRow($sql);    
                
        $this->view->layout()->customstyleccs = '<link href="/static/themes/'.$result['type'].'/'.$result['folder'].'/css/custom-style.css" rel="stylesheet" type="text/css" />';
        $this->view->layout()->pagetitle        = 'My Profile';
        $this->view->layout()->pagebreadcumb    = 'home &nbsp; &raquo; &nbsp; my profile';
        
        if(!Zend_Auth::getInstance()->getIdentity()->id)
        {
            $this->_redirect('/index');    
            
        }
    }

    public function indexAction()
    {
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        if($_REQUEST['oid'])
        {
            $sql    = "SELECT * FROM organization WHERE mid = '".Zend_Auth::getInstance()->getIdentity()->id."' ";      
            $result = $dbAdapter->fetchAll($sql);
            
            $this->view->orgdetail                      = $result;
            
            $sql    = "SELECT * FROM organization WHERE id = '".$_REQUEST['oid']."' ";      
            $result = $dbAdapter->fetchRow($sql);            
            
            
            
            $this->view->oid                            = $result['id'];
            $this->view->organization_logo              = $result['organization_logo'];
            $this->view->organization_name              = $result['organization_name'];
            $this->view->organization_description       = $result['organization_description'];
            $this->view->show_facebook                  = $result['show_facebook'];
            $this->view->facebook                       = $result['facebook'];
            $this->view->show_twitter                   = $result['show_twitter'];
            $this->view->show_twitter                   = $result['show_twitter'];
            $this->view->twitter_type                   = $result['twitter_type'];
            $this->view->twitter                        = $result['twitter'];   
            
            
        }
        else
        {
            
            $sql    = "SELECT * FROM organization WHERE mid = '".Zend_Auth::getInstance()->getIdentity()->id."' ";      
            $result = $dbAdapter->fetchAll($sql);
            
            
            
            $this->view->orgdetail                      = $result;
            
            $this->view->oid                            = $result[0]['id'];
            $this->view->organization_logo              = $result[0]['organization_logo'];
            $this->view->organization_name              = $result[0]['organization_name'];
            $this->view->organization_description       = $result[0]['organization_description'];
            $this->view->show_facebook                  = $result[0]['show_facebook'];
            $this->view->facebook                       = $result[0]['facebook'];
            $this->view->show_twitter                   = $result[0]['show_twitter'];
            $this->view->show_twitter                   = $result[0]['show_twitter'];
            $this->view->twitter_type                   = $result[0]['twitter_type'];
            $this->view->twitter                        = $result[0]['twitter'];    
            
        }
                
        
          
        
    }
    
    public function createAction()
    {
        // action body
    }

    public function processAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        //print_r($_REQUEST);die;
        
                
        $Response['error'] 		=	false;
        $Response['message'] 	=	''; 
                 
        
        $insdata                                =   array(); 
        $insdata['mid']                         =   Zend_Auth::getInstance()->getIdentity()->id;         
        $insdata['organization_name']           =   $_REQUEST['organization_name'];  
        $insdata['organization_logo']           =   $_REQUEST['event_logo'];
        $insdata['organization_description']    =   $_REQUEST['organization_description'];
        $insdata['show_facebook']               =   $_REQUEST['show_facebook'];
        $insdata['facebook']                    =   $_REQUEST['facebook'];
        $insdata['show_twitter']                =   $_REQUEST['show_twitter'];
        $insdata['twitter_type']                =   $_REQUEST['twitter_type'];
        $insdata['twitter']                     =   $_REQUEST['twitter'];       
        
              
        $insdata['date_created']                =   date("Y-m-d H:i:s");
        
        unset($insdata['single_desc']);
        unset($insdata['PHPSESSID']);
        
        if($_REQUEST['oid'])
        {
            $where  =   "id = '".$_REQUEST['oid']."'";
            $id     =   $dbAdapter->update('organization', $insdata , $where);
            
        }
        else
        {
            $numRows    =   $dbAdapter->insert('organization', $insdata);
            $id         =   $dbAdapter->lastInsertId();          
            
        }
        
        
        
              
               
        if(!$id)
        {
            $Response['error']		=	true;
            $Response['message']	=	'Error';            
        }
        else
        {
            $Response['error']		=	false;
            $Response['message']	=	'Complete';
            $Response['data']	=	$id;
        }       

        //echo $Response['message'];exit();
        echo json_encode($Response);exit();
        
    }

    


}



