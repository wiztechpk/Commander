<?php

class Admin_EventsController extends Zend_Controller_Action
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
        
        unset($insdata['ticket_title']);
        unset($insdata['ticket_quantity']);
        unset($insdata['ticket_price']);
        unset($insdata['ticket_start_sale_date']);
        unset($insdata['ticket_end_sale_date']);
        unset($insdata['ticket_min_order']);
        unset($insdata['ticket_max_order']);        
        unset($insdata['ticket_status']);        
                
        // try insert with data array
        $numRows = $dbAdapter->insert('events', $insdata);
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
            unset($insdata);
            $insdata['pid']            =   $id;
            $insdata['ticket_title']   =   $_POST['ticket_title'];
            $insdata['ticket_quantity']=   $_POST['ticket_quantity'];
            $insdata['ticket_price']   =   $_POST['ticket_price'];
            $insdata['ticket_start_sale_date']   =   $_POST['ticket_start_sale_date'];
            $insdata['ticket_end_sale_date']   =   $_POST['ticket_end_sale_date'];
            $insdata['ticket_min_order']   =   $_POST['ticket_min_order'];
            $insdata['ticket_max_order']   =   $_POST['ticket_max_order'];
            $insdata['ticket_status']  =   $_POST['ticket_status'];
            $insdata['date_created']   =   date("Y-m-d H:i:s");
            
            $numRows = $dbAdapter->insert('tickets', $insdata);
            $tid = $dbAdapter->lastInsertId();
            
            if(!$tid)
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
         
                
        unset($insdata['tid']);
        unset($insdata['ticket_title']);
        unset($insdata['ticket_quantity']);
        unset($insdata['ticket_price']);
        unset($insdata['ticket_start_sale_date']);
        unset($insdata['ticket_end_sale_date']);
        unset($insdata['ticket_min_order']);
        unset($insdata['ticket_max_order']);        
        unset($insdata['ticket_status']);   
                
        $where  =   "id = '".$_REQUEST['id']."'";  
        $numRows        = $dbAdapter->update('events', $insdata , $where);
        
        
        unset($insdata);
        $insdata['pid']            =   $_REQUEST['id'];
        $insdata['ticket_title']   =   $_POST['ticket_title'];
        $insdata['ticket_quantity']=   $_POST['ticket_quantity'];
        $insdata['ticket_price']   =   $_POST['ticket_price'];
        $insdata['ticket_start_sale_date']   =   $_POST['ticket_start_sale_date'];
        $insdata['ticket_end_sale_date']   =   $_POST['ticket_end_sale_date'];
        $insdata['ticket_min_order']   =   $_POST['ticket_min_order'];
        $insdata['ticket_max_order']   =   $_POST['ticket_max_order'];
        $insdata['ticket_status']  =   $_POST['ticket_status'];
        $insdata['date_created']   =   date("Y-m-d H:i:s");
        
        $where  =   "id = '".$_REQUEST['tid']."'";
        
        $numRows = $dbAdapter->update('tickets', $insdata, $where);
        
        
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
        
        $sql    =   " INSERT INTO devents SELECT * FROM events WHERE id =  '".$data->id."' ";
        $event  =   $dbAdapter->query($sql);
                 
        /*
        $sql    = " INSERT INTO devents SELECT * FROM events WHERE coordinator '".$data->id."' ";
        $dbAdapter->fetchRow($sql);
        
        $sql    = " INSERT INTO dtickets SELECT * FROM tickets WHERE id '".$data->id."' ";
        $dbAdapter->fetchRow($sql);        
        */
         
        $numRows = $dbAdapter->delete('events',$data->id);
        
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            
            
        ));                 
    }
    
    public function sendinvitationAction()
    {
        // action body
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
          
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        
        foreach($_REQUEST as $key => $value)
        {
           $insdata[$key]   =   $value; 
            
        }
        $insdata['status'] = 'Sent';
        $insdata['date_created'] = date( 'Y-m-d H:i:s');            
        
        // try insert with data array
        $numRows = $dbAdapter->insert('member_invitation', $insdata);
        
        $id = $dbAdapter->lastInsertId();
               
        return true;
               
                      
    }
    
    
    public function viewquestionsAction()
    {
        // action body
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                
        $sql = "SELECT p.*,IF(p.coordinator>0,CONCAT(m.first_name,' ',m.last_name),'N/A') AS co_ordinator FROM events p LEFT JOIN members m ON p.coordinator=m.id";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
                   
    }            
    
    
    public function sellticketAction()
    {
        // action body
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
          
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        
        for($i=0; $i < $_REQUEST['no']; $i++)
        {
            
            $insdata['pid']     = $_REQUEST['pid']  =   1;
            $insdata['tid']     = $_REQUEST['tid']  =   1;
            //$insdata['no']      = $_REQUEST['no'];
            $insdata['mid']     = $_REQUEST['member'];
            $insdata['same']    = $_REQUEST['copy_info'];
            $insdata['name']    = $_REQUEST['name'][$i];
            //$insdata['barcode'] = $_REQUEST['pid'].$_REQUEST['tid'].$_REQUEST['member'].str_replace(" ","_",$_REQUEST['name'][$i]);
            $insdata['barcode'] = $_REQUEST['pid'].$_REQUEST['tid'].$_REQUEST['member'].time();
            
            
            $barcodeOptions = array('text' => $insdata['barcode']);        
            // No required options
            $rendererOptions = array();        
            // Draw the barcode in a new image,
            $imageResource = Zend_Barcode::draw(
            'code39', 'image', $barcodeOptions, $rendererOptions
            );        
            imagejpeg($imageResource, 'barcode/'.$insdata['barcode'].'.jpg', 100);
            
            $numRows = $dbAdapter->insert('sell_tickets', $insdata);
            
            return true;
            
        }
        
                
                      
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
              
        
        $sql            =   "SELECT p.id,(SELECT CONCAT(m.first_name,' ',m.last_name) FROM members m WHERE m.id=p.coordinator)AS coordinator,p.title,p.description,p.keywords,p.status  FROM events p ";      
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
    
    
    public function eventscoordinatorsAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
       
        if($_REQUEST['coordinator'])
        {
            $sql    =   "SELECT e.id AS id, e.title AS title FROM events e LEFT JOIN members m ON e.coordinator=m.id WHERE m.id='".$_REQUEST['coordinator']."' ";            
        }
        else
        {
            $sql    =   "SELECT e.id AS id, e.title AS title FROM events e LEFT JOIN members m ON e.coordinator=m.id ";    
        }        
                      
        $result= $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
        
               
          
    }


}

