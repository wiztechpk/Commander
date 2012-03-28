<?php

class Admin_CoordinatorsController extends Zend_Controller_Action
{

    public $requestdata = null;

    public function init()
    {
        /* Initialize action controller here */
        $this->requestdata= Zend_Registry::get('requestdata');
        $this->_helper->layout->setLayout('admin');       
        
    }
    
    public function viewAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                
        $sql = "SELECT *,CONCAT(first_name,' ',last_name) as name FROM members WHERE type = 'Coordinator'";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
        
               
          
    }

    public function indexAction()
    {
        // action body
        //$dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        //$sql = "SELECT * FROM admin";      
        //$result= $dbAdapter->fetchAll($sql);
        //print_r($result); 
        
          
    }
    
        

    public function createAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
           
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
          
        $insdata        =   array();        
            
        $insdata['membership_id']   =   $_REQUEST['membership_id'];
        $insdata['first_name']      =   $_REQUEST['first_name'];      
        $insdata['last_name']       =   $_REQUEST['last_name'];
        $insdata['email']           =   $_REQUEST['email'];
        $insdata['password']        =   MD5($_REQUEST['password']);
        $insdata['type']            =   "Coordinator";
        $insdata['status']          =   $_REQUEST['status'];     
        $insdata['date_created']    =   date("Y-m-d H:i:s");
        $insdata['confirmed']       =   1;
        
        // try insert with data array
        $numRows = $dbAdapter->insert('members', $insdata);
        
        $id = $dbAdapter->lastInsertId();
               
        $result_email_template      = $dbAdapter->fetchRow('SELECT * FROM email_templates WHERE id = 2');
        $subject                    = $result_email_template['subject'];
        $message                    = $result_email_template['message'];       
        
        $result = $dbAdapter->fetchRow('SELECT * FROM members WHERE id = '.$id.'');
        
		foreach($result as $key => $value)
		{		
			$message	= str_replace("{".$key."}", html_entity_decode($value), $message);
		}  
        
        $mail = new Zend_Mail();
        $mail->setBodyText('Dear Co Ordinator');
        $mail->setBodyHtml($message);
        $mail->setFrom('support@event.com', 'Event Command Center');
        $mail->addTo(''.$result['email'].'', $result['first_name']." ".$result['last_name']);
        $mail->setSubject($subject);      
        echo "{
                'success': true,
                'msg': 'Form submission complete.'
            }";die;
            
        if(!$mail->send())
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
               
        $where  =   "id = '".$_REQUEST['id']."'";
        
                  
        $numRows = $dbAdapter->update('members', $insdata , $where);
        
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

    public function destroyAction()
    {
        // action body
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
                
        $data = $this->requestdata;       
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows = $dbAdapter->delete('members',$data->id);
        
        $sql = "SELECT *,CONCAT(first_name,' ',last_name) as name FROM members WHERE type = 'Coordinator'";      
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
              
        
        $sql            =   "SELECT id, first_name, last_name, email FROM members WHERE type = 'Coordinator'";      
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

