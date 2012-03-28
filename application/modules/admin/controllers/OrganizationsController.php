<?php

class Admin_OrganizationsController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }
    
    
    public function createAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);         
        
        $dbAdapter                              =   Zend_Db_Table::getDefaultAdapter();
        $insdata                                =   array(); 
        
        if (!empty($_FILES)) {
        	$FileName      =   $_FILES['organization_logo']['name'];
            $tempFile      =   $_FILES['organization_logo']['tmp_name'];
        	$targetPath    =   'organization_logos/';
        	$targetFile    =   str_replace('//','/',$targetPath) . $_FILES['organization_logo']['name'];
        	
            @mkdir(str_replace('//','/',$targetPath), 0755, true);		
        	if(move_uploaded_file($tempFile,$targetFile))
            {
                $insdata['organization_logo']   =   $FileName;                                         
            }
        }
        else
        {
                $insdata['organization_logo']   =   $insdata['organization_logo_old'];            
        }  
              
        $insdata['mid']                         =   $_REQUEST['coid'];
        $insdata['organization_name']           =   $_REQUEST['organization_name'];
        $insdata['organization_description']    =   $_REQUEST['organization_description'];
        $insdata['status']                      =   'Active';     
        $insdata['date_created']                =   date("Y-m-d H:i:s");        
        
        $numRows    =   $dbAdapter->insert('organization', $insdata);
        
        $id         =   $dbAdapter->lastInsertId();
        
        if($id)
        {            
            echo "{
                'success': true,
                'msg': 'Form submission complete.'
            }"; 
            
        }
        else
        {
            echo "{
                'success': false,
                'msg': 'An error occured, please try again later.'
            }";
        }         
                 
          
    }

    public function updateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter                              =   Zend_Db_Table::getDefaultAdapter();
          
        $insdata                                =   array(); 
        
        if (!empty($_FILES)) {
        	$FileName      =   $_FILES['organization_logo']['name'];
            $tempFile      =   $_FILES['organization_logo']['tmp_name'];
        	$targetPath    =   'organization_logos/';
        	$targetFile    =   str_replace('//','/',$targetPath) . $_FILES['organization_logo']['name'];
        	
            @mkdir(str_replace('//','/',$targetPath), 0755, true);		
        	if(move_uploaded_file($tempFile,$targetFile))
            {
                $insdata['organization_logo']   =   $FileName;                                         
            }
        }
        else
        {
                $insdata['organization_logo']   =   $insdata['organization_logo_old'];            
        }  
              
        $insdata['mid']                         =   $_REQUEST['coid'];
        $insdata['organization_name']           =   $_REQUEST['organization_name'];
        $insdata['organization_description']    =   $_REQUEST['organization_description'];          
        
        $where                                  =   "id = '".$_REQUEST['id']."'";
        
                  
        $numRows = $dbAdapter->update('organization', $insdata , $where);
        
        echo "{
                'success': true,
                'msg': 'Form submission complete.'
            }";
        /*            
        if($numRows)
        {            
            echo "{
                'success': true,
                'msg': 'Form submission complete.'
            }"; 
            
        }
        else
        {
            echo "{
                'success': false,
                'msg': 'An error occured, please try again later.'
            }";
        }         
        */
    }


}

