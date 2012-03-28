<?php

class Admin_RestfullController extends Zend_Controller_Action
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
    
    
    public function eventcategoriesviewAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
          
        $sql    =   "SELECT * FROM categories";        
        //$sql = "SELECT p.*,IF(p.coordinator>0,CONCAT(m.first_name,' ',m.last_name),'N/A') AS co_ordinator FROM events p LEFT JOIN members m ON p.coordinator=m.id";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));               
          
    }
    

    public function eventcategoriescreateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
            
        
        $data = $this->requestdata;       
         
         
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        
        foreach($data as $key => $value)
        {
           $insdata[$key]   =   $value; 
            
        }
        
        $insdata['date_created']   =   date("Y-m-d H:i:s");           
        
        // try insert with data array
        $numRows = $dbAdapter->insert('events', $insdata);
        
        $id = $dbAdapter->lastInsertId();
        
        $result = $dbAdapter->fetchRow("SELECT * FROM categories WHERE id = '.$id.'");
                
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));         
        
                      
          
    }

    public function eventcategoriesupdateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        foreach($this->requestdata as $key => $value)
        {
            $data[$key] = $value;
        }        
        
               
        $where  =   "id = '".$data['id']."'";
        
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows = $dbAdapter->update('categories', $data , $where);
        
        
                   
                      
        $sql = "SELECT * FROM categories";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));                 
    }

    public function eventcategoriesdestroyAction()
    {
        // action body
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
                
        $data = $this->requestdata;               
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        $where          =   "id = '".$data->id."'";  
        $numRows        =   $dbAdapter->delete('categories',$where);
        
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            
            
        ));                 
    }
    
    
    
    
    
    public function eventsviewAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        $sql            =   "SELECT e.id AS eid, (SELECT c.category FROM categories c WHERE c.id=e.category ) AS category, IF(e.coordinator > 0, CONCAT(m.first_name,' ',m.last_name),'N/A') AS coordinator, e.coordinator AS coordinator_id, e.title, e.start_date, (SELECT IFNULL( SUM(total_quantity) , 0) FROM orders o WHERE o.eid=e.id ) AS ticket_sold ,e.event_status AS `status`   FROM `events` e INNER JOIN `members` m ON e.coordinator = m.id";  
        //$sql    =   "SELECT e.id AS eid, e.*, t.*,t.id AS tid, (SELECT c.category FROM categories c WHere c.id=e.category ) AS category, IF(e.coordinator>0,CONCAT(m.first_name,' ',m.last_name),'N/A') AS co_ordinator FROM events e INNER JOIN tickets t ON e.id=t.pid LEFT JOIN members m ON e.coordinator=m.id";        
        //$sql = "SELECT p.*,IF(p.coordinator>0,CONCAT(m.first_name,' ',m.last_name),'N/A') AS co_ordinator FROM events p LEFT JOIN members m ON p.coordinator=m.id";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));               
          
    }
    

    public function eventscreateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);  
        
        $data                       =   $this->requestdata;   
        $insdata                    =   array();
        $insdata['id']              =   $data->eid;    
        $insdata['category']        =   $data->category;        
        $insdata['coordinator']     =   $data->coordinator;
        $insdata['title']           =   $data->title;
        $insdata['start_date']      =   $data->start_date;
        $insdata['event_status']    =   $data->status;
        $insdata['date_created']    =   date("Y-m-d H:i:s");           
        
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();        
        $numRows                    =   $dbAdapter->insert('events', $insdata);        
        $id                         =   $dbAdapter->lastInsertId();
        
        $result = $dbAdapter->fetchRow("SELECT e.id AS eid, (SELECT c.category FROM categories c WHERE c.id=e.category ) AS category, IF(e.coordinator > 0, CONCAT(m.first_name,' ',m.last_name),'N/A') AS coordinator, e.coordinator AS coordinator_id, e.title, e.start_date, (SELECT IFNULL( SUM(total_quantity) , 0) FROM orders o WHERE o.eid=e.id ) AS ticket_sold ,e.event_status AS `status`   FROM `events` e INNER JOIN `members` m ON e.coordinator = m.id WHERE e.id = '".$id."'");
                
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));         
        
                      
          
    }

    public function eventsupdateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $data                       =   $this->requestdata;   
        $insdata                    =   array();            
        $insdata['category']        =   $data->category;        
        $insdata['coordinator']     =   $data->coordinator;
        $insdata['title']           =   $data->title;
        $insdata['start_date']      =   $data->start_date;
        $insdata['event_status']    =   $data->status;
        $where                      =   "id = '".$data->eid."'";                        
        
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();        
        $numRows                    =   $dbAdapter->update('events', $data , $where);                  
                      
        $sql            =   "SELECT e.id AS eid, (SELECT c.category FROM categories c WHERE c.id=e.category ) AS category, IF(e.coordinator > 0, CONCAT(m.first_name,' ',m.last_name),'N/A') AS coordinator, e.coordinator AS coordinator_id, e.title, e.start_date, (SELECT IFNULL( SUM(total_quantity) , 0) FROM orders o WHERE o.eid=e.id ) AS ticket_sold ,e.event_status AS `status`   FROM `events` e INNER JOIN `members` m ON e.coordinator = m.id";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));                 
    }

    public function eventsdestroyAction()
    {
        // action body
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
                
        $data           =   $this->requestdata;       
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows        =   $dbAdapter->delete('events',$data->id);
        
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            
            
        ));                 
    }
    
    
    public function eventticketsviewAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
             
        $sql = "SELECT t.id, t.id AS tid, t.pid AS eid, t.ticket_title, t.ticket_quantity, (SELECT IFNULL( SUM(tq) , 0) FROM orders_tickets ot WHERE ot.tid=t.id ) AS ticket_sold, t.ticket_price, t.ticket_status FROM tickets t WHERE pid = '".$_REQUEST['eid']."'";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));             
          
    }
    

    public function eventticketscreateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
        
        
        $data = $this->requestdata;      
         
         
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        
        foreach($data as $key => $value)
        {
           $insdata[$key]   =   $value; 
            
        }
        
        $insdata['date_created']   =   date("Y-m-d H:i:s");           
        
        // try insert with data array
        $numRows = $dbAdapter->insert('tickets', $insdata);
        
        $id = $dbAdapter->lastInsertId();
        
        $result = $dbAdapter->fetchRow('SELECT * FROM tickets WHERE id = '.$id.'');
                
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        )); 
        
                      
          
    }

    public function eventticketsupdateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        foreach($this->requestdata as $key => $value)
        {
            $data[$key] = $value;
        }        
        
               
        $where  =   "id = '".$data['id']."'";
        
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows = $dbAdapter->update('tickets', $data , $where);
        
        
        
             
                      
        $sql = "SELECT * FROM tickets";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));                   
    }

    public function eventticketsdestroyAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
                
        $data = $this->requestdata;       
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows = $dbAdapter->delete('tickets',$data->id);
        
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            
            
        ));                 
    }
    
    
    public function membershipplansviewAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                
        $sql = "SELECT * FROM membership";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
        
               
          
    }

    public function membershipplanscreateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
        
        
        $data = $this->requestdata;       
         
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        
        foreach($data as $key => $value)
        {
           $insdata[$key]   =   $value; 
            
        } 
       
        //$insdata['type']   =   "Member";      
            
        $insdata['date_created']   =   date("Y-m-d H:i:s");
        // try insert with data array
        $numRows = $dbAdapter->insert('membership', $insdata);
        
        $id = $dbAdapter->lastInsertId();
        
        $result = $dbAdapter->fetchRow('SELECT * FROM membership WHERE id = '.$id.'');
        
               
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));         
        
                      
          
    }

    public function membershipplansupdateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        foreach($this->requestdata as $key => $value)
        {
            $data[$key] = $value;
        }        
        
               
        $where  =   "id = '".$data['id']."'";
        
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows = $dbAdapter->update('membership', $data , $where);
        
        
        
             
                      
        $sql = "SELECT *  FROM membership";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $data
            
        ));                 
    }

    public function membershipplansdestroyAction()
    {
        // action body
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
                
        $data = $this->requestdata;       
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
       
       
        $numRows = $dbAdapter->delete('membership',$data->id);
        
        $sql = "SELECT * FROM membership";      
        $result= $dbAdapter->fetchAll($sql);
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));                 
    }
    
    
    
    public function coordinatorsviewAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                
        $sql = "SELECT m.id, (SELECT mb.title FROM membership mb WHERE  mb.id = m.membership_id ) AS membership, m.membership_id, m.first_name, m.last_name, m.email, m.status FROM members m WHERE m.type = 'Coordinator'";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
        
               
          
    }
    
    public function coordinatorscreateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
        
        
        $data = $this->requestdata;       
         
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        
        foreach($data as $key => $value)
        {
           $insdata[$key]   =   $value; 
            
        } 
              
        $insdata['type']            =   "Coordinator";     
        $insdata['date_created']    =   date("Y-m-d H:i:s");
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
        $mail->send();
                       
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));         
        
                      
          
    }

    public function coordinatorsupdateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        foreach($this->requestdata as $key => $value)
        {
            $data[$key] = $value;
        }        
        
               
        $where  =   "id = '".$data['id']."'";
        
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows = $dbAdapter->update('members', $data , $where);
        
        
        
             
                      
        $sql = "SELECT *,CONCAT(first_name,' ',last_name) as name FROM members WHERE type = 'Coordinator'";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $data
            
        ));                 
    }

    public function coordinatorsdestroyAction()
    {
        // action body
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
                
        $data = $this->requestdata;       
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        
        $sql    =   " INSERT INTO devents SELECT * FROM events WHERE coordinator =  '".$data->id."' ";
        $event  =   $dbAdapter->query($sql);
                 
        /*
        $sql    = " INSERT INTO devents SELECT * FROM events WHERE coordinator '".$data->id."' ";
        $dbAdapter->fetchRow($sql);
        
        $sql    = " INSERT INTO dtickets SELECT * FROM tickets WHERE id '".$data->id."' ";
        $dbAdapter->fetchRow($sql);        
        */ 
        
        $numRows = $dbAdapter->delete('members', "id = '".$data->id."'");
        
        $sql = "SELECT *,CONCAT(first_name,' ',last_name) as name FROM members WHERE type = 'Coordinator'";      
        $result= $dbAdapter->fetchAll($sql);
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));                 
    }
    
    
    
    
    public function organizationsviewAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter  =   Zend_Db_Table::getDefaultAdapter();
                
        $sql        =   "SELECT * FROM organization WHERE mid = '".$_REQUEST['coid']."' ";      
        $result     =   $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
        
               
          
    }
    
    public function organizationscreateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
        
        
        $data = $this->requestdata;       
         
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        
        foreach($data as $key => $value)
        {
           $insdata[$key]   =   $value; 
            
        } 
              
           
        $insdata['date_created']    =   date("Y-m-d H:i:s");
        // try insert with data array
        $numRows = $dbAdapter->insert('organization', $insdata);
        
        $id = $dbAdapter->lastInsertId();
                                
                              
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));         
        
                      
          
    }

    public function organizationsupdateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        foreach($this->requestdata as $key => $value)
        {
            $data[$key] = $value;
        }        
        
               
        $where  =   "id = '".$data['id']."'";
        
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows = $dbAdapter->update('organization', $data , $where);
        
        
        
             
                      
        $sql = "SELECT *  FROM organization ";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $data
            
        ));                 
    }

    public function organizationsdestroyAction()
    {
        // action body
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
                
        $data = $this->requestdata;       
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows = $dbAdapter->delete('organization',$data->id);
        
        $sql = "SELECT *  FROM organization ";      
        $result= $dbAdapter->fetchAll($sql);
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));                 
    }
    
    
    
    
    public function subcoordinatorsviewAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                
        if(isset($_REQUEST['coid']) && !empty($_REQUEST['coid']) && $_REQUEST['coid'] != 0 )
        {
            $sql                    =   " SELECT *,CONCAT(first_name,' ',last_name) as name FROM members WHERE type = 'SubCoordinator'  WHERE id = '".$_REQUEST['coid']."' ";
        }
        else
        {
            $sql                    =   " SELECT *,CONCAT(first_name,' ',last_name) as name FROM members WHERE type = 'SubCoordinator' ";
        }

        $result= $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
        
               
          
    }

    public function subcoordinatorscreateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
        
        
        $data = $this->requestdata;       
         
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        
        foreach($data as $key => $value)
        {
           $insdata[$key]   =   $value; 
            
        } 
              
        $insdata['type']            =   "SubCoordinator";     
        $insdata['date_created']    =   date("Y-m-d H:i:s");
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
        $mail->setBodyText('Dear SubCoordinator');
        $mail->setBodyHtml($message);
        $mail->setFrom('support@event.com', 'Event Command Center');
        $mail->addTo(''.$result['email'].'', $result['first_name']." ".$result['last_name']);
        $mail->setSubject($subject);
        $mail->send();
                       
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));         
        
                      
          
    }

    public function subcoordinatorsupdateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        foreach($this->requestdata as $key => $value)
        {
            $data[$key] = $value;
        }        
        
               
        $where  =   "id = '".$data['id']."'";
        
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows = $dbAdapter->update('members', $data , $where);
        
        
        
             
                      
        $sql = "SELECT *,CONCAT(first_name,' ',last_name) as name FROM members WHERE type = 'SubCoordinator'";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $data
            
        ));                 
    }

    public function subcoordinatorsdestroyAction()
    {
        // action body
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
                
        $data = $this->requestdata;       
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter(); 
        
        $sql    =   " INSERT INTO devents SELECT * FROM events WHERE coordinator =  '".$data->id."' ";
        $event  =   $dbAdapter->query($sql);
                 
        /*
        $sql    = " INSERT INTO devents SELECT * FROM events WHERE coordinator '".$data->id."' ";
        $dbAdapter->fetchRow($sql);
        
        $sql    = " INSERT INTO dtickets SELECT * FROM tickets WHERE id '".$data->id."' ";
        $dbAdapter->fetchRow($sql);        
        */
        
         
        $numRows = $dbAdapter->delete('members',$data->id);
        
        $sql = "SELECT *,CONCAT(first_name,' ',last_name) as name FROM members WHERE type = 'SubCoordinator'";      
        $result= $dbAdapter->fetchAll($sql);
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));                 
    }
    
    
    public function membersviewAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                
        $sql = "SELECT m.id, (SELECT mb.title FROM membership mb WHERE  mb.id = m.membership_id ) AS membership, m.first_name, m.last_name, m.email, m.status FROM members m WHERE m.type = 'Member'";       
        $result= $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
        
               
          
    }

    public function memberscreateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
        
        
        $data = $this->requestdata;       
         
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        
        foreach($data as $key => $value)
        {
           $insdata[$key]   =   $value; 
            
        } 
              
        $insdata['type']            =   "Member";     
        $insdata['date_created']    =   date("Y-m-d H:i:s");
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
        $mail->setBodyText('Dear Member');
        $mail->setBodyHtml($message);
        $mail->setFrom('support@event.com', 'Event Command Center');
        $mail->addTo(''.$result['email'].'', $result['first_name']." ".$result['last_name']);
        $mail->setSubject($subject);
        $mail->send();
                       
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));         
        
                      
          
    }

    public function membersupdateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        foreach($this->requestdata as $key => $value)
        {
            $data[$key] = $value;
        }        
        
               
        $where  =   "id = '".$data['id']."'";
        
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows = $dbAdapter->update('members', $data , $where);
        
        
        
             
                      
        $sql = "SELECT *,CONCAT(first_name,' ',last_name) as name FROM members WHERE type = 'Member'";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $data
            
        ));                 
    }

    public function membersdestroyAction()
    {
        // action body
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
                
        $data = $this->requestdata;       
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        $sql    =   " INSERT INTO devents SELECT * FROM events WHERE coordinator =  '".$data->id."' ";
        $event  =   $dbAdapter->query($sql);
                 
        /*
        $sql    = " INSERT INTO devents SELECT * FROM events WHERE coordinator '".$data->id."' ";
        $dbAdapter->fetchRow($sql);
        
        $sql    = " INSERT INTO dtickets SELECT * FROM tickets WHERE id '".$data->id."' ";
        $dbAdapter->fetchRow($sql);        
        */
          
        $numRows = $dbAdapter->delete('members',$data->id);
        
        $sql = "SELECT *,CONCAT(first_name,' ',last_name) as name FROM members WHERE type = 'Member'";      
        $result= $dbAdapter->fetchAll($sql);
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));                 
    }
    
    
    
    
    
    public function emailtemplatesviewAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                
        $sql = "SELECT * FROM email_templates ";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
        
               
          
    }

    public function emailtemplatescreateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
        
        
        $data = $this->requestdata;       
         
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        
        foreach($data as $key => $value)
        {
           $insdata[$key]   =   $value; 
            
        } 
              
            
        
        // try insert with data array
        $numRows = $dbAdapter->insert('email_templates', $insdata);
        
        $id = $dbAdapter->lastInsertId();
        
        $result = $dbAdapter->fetchRow('SELECT * FROM email_templates WHERE id = '.$id.'');
                
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));         
        
                      
          
    }

    public function emailtemplatesupdateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        foreach($this->requestdata as $key => $value)
        {
            $data[$key] = $value;
        }        
        
               
        $where  =   "id = '".$data['id']."'";
        
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows = $dbAdapter->update('email_templates', $data , $where);
        
        
        
             
                      
        $sql = "SELECT *  FROM email_templates";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));                 
    }

    public function emailtemplatesdestroyAction()
    {
        // action body
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
                
        $data = $this->requestdata;       
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows = $dbAdapter->delete('email_templates',$data->id);
        
        $sql = "SELECT * FROM email_templates ";      
        $result= $dbAdapter->fetchAll($sql);
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));                 
    }
    
    
    public function administratorsviewAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                
        $sql = "SELECT a.*, ag.group_name AS `group` FROM admin a LEFT JOIN admin_roles ag ON(a.group=ag.group_id) WHERE a.group != 0 ";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
        
               
          
    }

    public function administratorscreateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
        
        
        $data = $this->requestdata;       
         
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        
        foreach($data as $key => $value)
        {
           $insdata[$key]   =   $value; 
            
        } 
              
        $insdata['date_created']   =   date("Y-m-d H:i:s");    
        
        // try insert with data array
        $numRows = $dbAdapter->insert('admin', $insdata);
        
        $id = $dbAdapter->lastInsertId();
        
        $result = $dbAdapter->fetchRow('SELECT a.*, ag.group_name AS `group` FROM admin a LEFT JOIN admin_roles ag ON(a.group=ag.group_id) WHERE a.id = '.$id.'');
                
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));         
        
                      
          
    }

    public function administratorsupdateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        foreach($this->requestdata as $key => $value)
        {
            $data[$key] = $value;
        }        
        
               
        $where  =   "id = '".$data['id']."'";
        
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows = $dbAdapter->update('admin', $data , $where);
        
        
        
             
                      
        $sql = "SELECT a.*, ag.group_name AS `group` FROM admin a LEFT JOIN admin_roles ag ON(a.group=ag.group_id) WHERE a.group != 0";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $data
            
        ));                 
    }

    public function administratorsdestroyAction()
    {
        // action body
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
                
        $data = $this->requestdata;       
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows = $dbAdapter->delete('admin',$data->id);
        
        $sql = "SELECT a.*, ag.group_name AS `group` FROM admin a LEFT JOIN admin_roles ag ON(a.group=ag.group_id) WHERE a.group != 0";      
        $result= $dbAdapter->fetchAll($sql);
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));                 
    }
    
    
    public function viewadministratorsgroupsAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                
        $sql = " SELECT ag.group_id AS id, ag.group_name AS `group`, ag.group_modules AS modules, ag.group_actions AS actions  FROM admin_roles ag ";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
        
               
          
    }

    public function createadministratorsgroupsAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
        
        
        $data = $this->requestdata;       
         
        //print_r($data);die;
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
                      
        $insdata['group_name']      =   $data->group;
        
        foreach($data->modules AS $key=>$value)
        {
            $explode    =   explode("-", $value);
            
            $gm         .=   $explode[0].",";
            $ga         .=   $explode[1].",";
            
        }
        
        $insdata['group_modules']   =   substr($gm,0,-1);
        $insdata['group_actions']   =   substr($ga,0,-1);
          
               
        
        // try insert with data array
        $numRows = $dbAdapter->insert('admin_roles', $insdata);
        
        $id = $dbAdapter->lastInsertId();
        
        $result = $dbAdapter->fetchRow('SELECT ag.group_id AS id, ag.group_name AS `group`, ag.group_modules AS modules, ag.group_actions AS actions  FROM admin_roles ag WHERE ag.group_id = '.$id.'');
                
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));         
        
                      
          
    }

    public function updateadministratorsgroupsAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        foreach($this->requestdata as $key => $value)
        {
            $data[$key] = $value;
        }        
        
               
        $where  =   "group_id = '".$data['id']."'";
        
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows = $dbAdapter->update('admin', $data , $where);
        
        
        
             
                      
        $sql = " SELECT ag.group_id AS id, ag.group_name AS `group`, ag.group_modules AS modules, ag.group_actions AS actions  FROM admin_roles ag ";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));                 
    }

    public function destroyadministratorsgroupsAction()
    {
        // action body
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
                
        $data = $this->requestdata;       
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows = $dbAdapter->delete('admin_roles',$data->id);
        
        $sql = " SELECT ag.group_id AS id, ag.group_name AS `group`, ag.group_modules AS modules, ag.group_actions AS actions  FROM admin_roles ag ";      
        $result= $dbAdapter->fetchAll($sql);
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));                 
    }
    
    public function viewgroupsAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                
        $sql = "SELECT * FROM admin_roles";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
        
               
          
    }
    
    
    
    public function viewbillingsAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                
        $sql                    =   "SELECT * FROM `events` e LEFT JOIN `orders` o ON e.id=o.eid ";      
        $result         =   $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
        
               
          
    }
    
    
    public function viewtransactionsAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        if(isset($_REQUEST['eid']) && !empty($_REQUEST['eid']) && $_REQUEST['eid'] != 0 )
        {
            $sql                    =   " SELECT e.id, e.title, e.start_date, o.id AS oid, o.total_quantity, o.total_amount, DATE_FORMAT(o.date_created, '%m/%d/%Y') AS order_date FROM `events` e INNER JOIN `orders` o ON e.id=o.eid  WHERE e.id = '".$_REQUEST['eid']."' ";
        }
        else
        {
            $sql                    =   " SELECT e.id, e.title, e.start_date, o.id AS oid, o.total_quantity, o.total_amount, DATE_FORMAT(o.date_created, '%m/%d/%Y') AS order_date FROM `events` e INNER JOIN `orders` o ON e.id=o.eid ";
        }        
              
        $result         =   $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
        
               
          
    }
    
    
    public function transactiondetailsviewAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        if(isset($_REQUEST['tid']) && !empty($_REQUEST['tid']) && $_REQUEST['tid'] != 0 )
        {
            $sql                    =   "SELECT (SELECT id FROM tickets t WHERE  t.id = ot.tid ) AS tid, o.id AS oid, ot.id AS otid, od.id AS odid, (SELECT ticket_title FROM tickets t WHERE  t.id = ot.tid ) AS ticket_title, (SELECT ticket_price FROM tickets t WHERE  t.id = ot.tid ) AS ticket_price, od.attende_name, od.attende_email, od.attende_cell_phone, DATE_FORMAT(o.date_created, '%m-%d-%Y') AS order_date  FROM `orders` o INNER JOIN `orders_tickets` ot ON o.id=ot.oid INNER JOIN `orders_detail` od ON ot.id=od.otid WHERE o.id = '".$_REQUEST['tid']."' ";
            //$sql                    =   " SELECT e.id, e.title, e.start_date, o.id AS oid, o.total_quantity, o.total_amount, DATE_FORMAT(o.date_created, '%m/%d/%Y') AS order_date FROM `events` e INNER JOIN `orders` o ON e.id=o.eid  WHERE o.id = '".$_REQUEST['tid']."' ";
        }
        else
        {
            $sql                    =   "SELECT (SELECT id FROM tickets t WHERE  t.id = ot.tid ) AS tid, o.id AS oid, ot.id AS otid, od.id AS odid, (SELECT ticket_title FROM tickets t WHERE  t.id = ot.tid ) AS ticket_title, (SELECT ticket_price FROM tickets t WHERE  t.id = ot.tid ) AS ticket_price, od.attende_name, od.attende_email, od.attende_cell_phone, DATE_FORMAT(o.date_created, '%m-%d-%Y') AS order_date  FROM `orders` o INNER JOIN `orders_tickets` ot ON o.id=ot.oid INNER JOIN `orders_detail` od ON ot.id=od.otid ";
            //$sql                    =   " SELECT e.id, e.title, e.start_date, o.id AS oid, o.total_quantity, o.total_amount, DATE_FORMAT(o.date_created, '%m/%d/%Y') AS order_date FROM `events` e INNER JOIN `orders` o ON e.id=o.eid ";
        }        
              
        $result         =   $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
        
               
          
    }
    
    public function viewinvoicesAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                
        //$sql                    =   " SELECT * FROM `events` e INNER JOIN `orders` o ON e.id=o.eid LEFT JOIN orders_detail od ON o.id=od.oid LEFT JOIN `tickets` t ON od.tid=t.id ";
        $sql            =   "SELECT o.id, (SELECT (CONCAT(m.first_name,' ',m.last_name)) FROM members m WHERE  m.id = o.mid ) AS member_name, e.title, e.start_date, o.total_quantity, o.total_amount  FROM `events` e INNER JOIN `orders` o ON e.id=o.eid";      
        $result         =   $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
        
               
          
    }
    
    
    public function invoicedetailsviewAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                
        //$sql                    =   " SELECT * FROM `events` e INNER JOIN `orders` o ON e.id=o.eid LEFT JOIN orders_detail od ON o.id=od.oid LEFT JOIN `tickets` t ON od.tid=t.id ";
        $sql            =   "SELECT o.id AS tid, (SELECT ticket_title FROM tickets t WHERE  t.id = ot.tid ) AS ticket_title, (SELECT ticket_price FROM tickets t WHERE  t.id = ot.tid ) AS ticket_price, ot.tq AS ticket_quantity, ((SELECT ticket_price FROM tickets t WHERE  t.id = ot.tid ) * ot.tq )AS ticket_total_amount, DATE_FORMAT(o.date_created, '%m-%d-%Y') AS order_date  FROM `orders` o INNER JOIN `orders_tickets` ot ON o.id=ot.oid WHERE o.id = '".$_REQUEST['tid']."' ";      
        $result         =   $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
        
               
          
    }
    
    public function viewmembershipsAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                
        $sql                    =   "SELECT * FROM `events` e LEFT JOIN `orders` o ON e.id=o.eid ";      
        $result         =   $dbAdapter->fetchAll($sql);
        
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));
        
               
          
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    
    public function eventattendeesviewAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        $sql                =   "SELECT (SELECT id FROM tickets t WHERE  t.id = ot.tid ) AS tid, o.id AS oid, ot.id AS otid, od.id AS odid, (SELECT ticket_title FROM tickets t WHERE  t.id = ot.tid ) AS ticket_title, (SELECT ticket_price FROM tickets t WHERE  t.id = ot.tid ) AS ticket_price, od.attende_name, od.attende_email, od.attende_cell_phone, DATE_FORMAT(o.date_created, '%m-%d-%Y') AS order_date  FROM `orders` o INNER JOIN `orders_tickets` ot ON o.id=ot.oid INNER JOIN `orders_detail` od ON ot.id=od.otid WHERE o.eid = '".$_REQUEST['eid']."' ";
        if($_REQUEST['tid'] != 0)
        {
            $sql    .=  " AND ot.tid   =   '".$_REQUEST['tid']."'";
            
        }                   
        $result             =   $dbAdapter->fetchAll($sql);
                
        echo json_encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data',
            'data'      => $result
        ));               
          
    }
    

    public function eventattendeescreateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);  
        
        $data                       =   $this->requestdata;   
        $insdata                    =   array();
        $insdata['id']              =   $data->eid;    
        $insdata['category']        =   $data->category;        
        $insdata['coordinator']     =   $data->coordinator;
        $insdata['title']           =   $data->title;
        $insdata['start_date']      =   $data->start_date;
        $insdata['event_status']    =   $data->status;
        $insdata['date_created']    =   date("Y-m-d H:i:s");           
        
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();        
        $numRows                    =   $dbAdapter->insert('eventattendee', $insdata);        
        $id                         =   $dbAdapter->lastInsertId();
        
        $result = $dbAdapter->fetchRow("SELECT e.id AS eid, (SELECT c.category FROM categories c WHERE c.id=e.category ) AS category, IF(e.coordinator > 0, CONCAT(m.first_name,' ',m.last_name),'N/A') AS coordinator, e.coordinator AS coordinator_id, e.title, e.start_date, (SELECT IFNULL( SUM(total_quantity) , 0) FROM orders o WHERE o.eid=e.id ) AS ticket_sold ,e.event_status AS `status`   FROM `eventattendee` e INNER JOIN `members` m ON e.coordinator = m.id WHERE e.id = '".$id."'");
                
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));         
        
                      
          
    }

    public function eventattendeesupdateAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $data                       =   $this->requestdata;   
        $insdata                    =   array();            
        $insdata['category']        =   $data->category;        
        $insdata['coordinator']     =   $data->coordinator;
        $insdata['title']           =   $data->title;
        $insdata['start_date']      =   $data->start_date;
        $insdata['event_status']    =   $data->status;
        $where                      =   "id = '".$data->eid."'";                        
        
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();        
        $numRows                    =   $dbAdapter->update('eventattendee', $data , $where);                  
                      
        $sql            =   "SELECT e.id AS eid, (SELECT c.category FROM categories c WHERE c.id=e.category ) AS category, IF(e.coordinator > 0, CONCAT(m.first_name,' ',m.last_name),'N/A') AS coordinator, e.coordinator AS coordinator_id, e.title, e.start_date, (SELECT IFNULL( SUM(total_quantity) , 0) FROM orders o WHERE o.eid=e.id ) AS ticket_sold ,e.event_status AS `status`   FROM `eventattendee` e INNER JOIN `members` m ON e.coordinator = m.id";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            'data'      => $result
            
        ));                 
    }

    public function eventattendeedestroyAction()
    {
        // action body
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
         
                
        $data           =   $this->requestdata;       
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();  
        $numRows        =   $dbAdapter->delete('eventattendee',$data->id);
        
               
        echo Zend_Json::encode(array(
            'success'   => 'true',
            'message'   => 'Loaded data1', 
            
            
        ));                 
    }
    

    
}    