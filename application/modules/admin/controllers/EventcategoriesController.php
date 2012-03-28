<?php

class Admin_EventcategoriesController extends Zend_Controller_Action
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

    public function viewAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                
        $sql = " SELECT * FROM categories ";      
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
        
        
        $insdata                    =   array();                                      
        //$insdata['parent_id']       =   $_REQUEST['parent_id'];
        $insdata['category']        =   $_REQUEST['category'];
        $insdata['status']          =   'Active';     
        $insdata['date_created']    =   date("Y-m-d H:i:s");
        
        // try insert with data array
        $numRows = $dbAdapter->insert('categories', $insdata);
        
        $id = $dbAdapter->lastInsertId();
                                
        $result = $dbAdapter->fetchRow('SELECT * FROM categories WHERE id = '.$id.'');                     
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));         
        
                      
          
    }

    public function updateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $insdata                    =   array();
        //$insdata['parent_id']       =   $_REQUEST['parent_id'];
        $insdata['category']        =   $_REQUEST['category'];
        $insdata['status']          =   'Active'; 
        
               
        $where  =   "id = '".$_REQUEST['id']."'";
        
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows = $dbAdapter->update('categories', $insdata , $where);
        
        
        
             
                      
        $sql = "SELECT * FROM categories ";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $data
            
        ));                 
    }

    public function destroyAction()
    {
        // action body
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
        print_r($_REQUEST);die;        
        $data = $this->requestdata;       
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows = $dbAdapter->delete('categories',$data->id);
        
        $sql = "SELECT * FROM categories ";      
        $result= $dbAdapter->fetchAll($sql);
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));                 
    }
    
    public function exportexcelAction()
    {
        // action body
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
                                
        
        $data = $this->requestdata;       
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        
        
        $file       =   time()."export.csv";
        $file_path  =   "csv/".$file;
        $output     =   "";
        $fh         =   fopen($file_path,"w+") or die ("unable to open file");
              
        
        $sql            =   "SELECT * FROM categories ";      
        $result_excel   =   $dbAdapter->fetchAll($sql);        
        
        $output         =   "";
        
        if($result_excel)
        {
            $columns    =   count($result_excel[0]);
            
            foreach($result_excel[0] as $key=>$value)
            {
                $output .= "".$key.",";
            }
            $output .= "\n";
            
            foreach($result_excel as $value)            
            {
                foreach($value as $cell)
                {
                    $output .= "".$cell.",";
                }
                $output .= "\n";
            }
                        
            
            fwrite($fh, $output, strlen($output));
            
            echo $file;die;
            
            echo Zend_Json::encode(array(
                'success'   => 'true',
                'message'   => 'Loaded data1', 
                'data'      => $file
                
            ));  
            
            
        }
        else
        {
            echo "";die;
            echo Zend_Json::encode(array(
                'success'   => 'true',
                'message'   => 'Loaded data1', 
                'data'      => ''
                
            ));
        }
        die;
                              
    }
    
    
    
    public function downloadAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        
        $file   =   $_REQUEST['file'];
        $file_path  =   "csv/".$file;
        header("Content-disposition: attachment; filename=$file");
        header("Content-Type: application/force-download");
        header("Content-Transfer-Encoding: binary");
       
        header("Pragma: no-cache");
        header("Expires: 0");
        readfile($file_path);die;          
        
        
    }    
    
    

}

