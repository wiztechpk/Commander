<?php

class CreateticketController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
        $sql                        =   "SELECT * FROM themes WHERE `default` = '1' ";      
        $result                     =   $dbAdapter->fetchRow($sql);    
                
        $this->view->layout()->customstyleccs = '<link href="/static/themes/'.$result['type'].'/'.$result['folder'].'/css/custom-style.css" rel="stylesheet" type="text/css" />';
        $this->view->layout()->pagetitle        = 'Create Ticket';
        $this->view->layout()->pagebreadcumb    = 'home &nbsp; &raquo; &nbsp; create ticket';
        
        if(!Zend_Auth::getInstance()->getIdentity()->id)
        {
            $this->_redirect('/index');    
            
        }
    }

    public function indexAction()
    {
        // action body
    }
    
    public function loadticketsAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                
        $sql        =   "SELECT capacity FROM events WHERE id = '".$_REQUEST['event_id']."'";      
        $capacity   =   $dbAdapter->fetchRow($sql);
                
        
        $sql = "SELECT * FROM tickets WHERE pid = '".$_REQUEST['event_id']."'";      
        $result= $dbAdapter->fetchAll($sql);
        
        if(!empty($result))
        {
        echo '            
              <input type="hidden" id="has_ticket" value="'.count($result).'" name="has_ticket">
              <div id="heading1">Ticket Name</div>
              <div id="heading2">Price</div>
              <div id="heading3">Actions</div>
              <div style="clear:both;"></div> 
             ';
        foreach($result AS $key=>$value)
        {
        
        echo '      
              <div class="bar" id="bar'.$value['id'].'" onmouseover="ShowHoverBar('.$value['id'].')" onmouseout="HideHoverBar('.$value['id'].')"  >
              <div class="ticket_title"><input type="hidden" name="tid[]" value="'.$value['id'].'" >'.$value['ticket_title'].'</div>
              <div class="ticket_price">$'.$value['ticket_price'].'</div>
              <div class="actions" id="action'.$value['id'].'" style="display:none;">
              <div id="srch"><p><a class="press-it-btn"    alt="Preview Ticket" title="Preview Ticket"  href="javascript:void(0);" onClick="javascript:PreviewTicket('.$value['pid'].','.$value['id'].');return false;" >Press it</a></p></div>
              <div id="setting"><p><a class="press-it-btn" alt="Edit Ticket" title="Edit Ticket"  href="javascript:void(0);" onclick="javascript:EditTicket('.$value['pid'].','.$value['id'].');">Press it</a></p></div>
              <div id="recyle"><p><a class="press-it-btn"  alt="Delete Ticket" title="Delete Ticket"  href="javascript:void(0);" onclick="javascript:DeleteTicket('.$value['pid'].','.$value['id'].');">Press it</a></p></div>              
              </div>
              </div>
              <div style="clear:both;"></div>                        
              
             ';
        }
        echo ''; 
                
        }       
                
    }
    
    
    public function processAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
                         
        
        $Response['error']                  =	false;
        $Response['message'] 	            =	'';
                  
        $sql                    =   "SELECT * FROM events WHERE id = '".$_REQUEST['eid']."'";      
        $result                 =   $dbAdapter->fetchRow($sql);
        
        if(!$result)
        {
                $insdata                            =   array(); 
            
                $insdata['pid']                     =   $_POST['eid'];
                $insdata['ticket_title']            =   $_POST['ticket_title'];
                $insdata['ticket_description']      =   $_POST['ticket_description'];
                $insdata['ticket_price_type']       =   $_POST['ticket_price_type'];        
                $insdata['ticket_price']            =   $_POST['ticket_price'];
                $insdata['ticket_quantity']         =   $_POST['ticket_quantity'];
    
                $insdata['ticket_start_sale_date']  =   (empty($_POST['ticket_start_sale_date']) || $_POST['ticket_start_sale_date']=="0000-00-00" ) ? '0000-00-00' : $_POST['ticket_start_sale_date'];
                $insdata['ticket_end_sale_date']    =   (empty($_POST['ticket_end_sale_date'])   || $_POST['ticket_end_sale_date']=="0000-00-00") ? '0000-00-00' : $_POST['ticket_end_sale_date'];
                
                $insdata['ticket_min_order']        =   $_POST['ticket_min_order'];
                $insdata['ticket_max_order']        =   $_POST['ticket_max_order'];
                
                
                if(empty($_POST['tid']))
                {
                    
                    $insdata['date_created']            =   date("Y-m-d H:i:s");       
                    
                    $numRows = $dbAdapter->insert('tickets', $insdata);
                    echo $insdata['pid'];die;  
                    
                    
                }
                else
                {
                    
                    $where  =   "id = '".$_POST['tid']."'";
                
                    $numRows = $dbAdapter->update('tickets', $insdata, $where);
                    
                    echo $insdata['pid'];die;  
                }
                
                        
                
                
                $id = $dbAdapter->lastInsertId();      
                       
                        
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
            
        }
        else
        {
            
            if($result['event_status']=="Draft")
            {
               
                $insdata                            =   array();
            
                $insdata['pid']                     =   $_POST['eid'];
                $insdata['ticket_title']            =   $_POST['ticket_title'];
                $insdata['ticket_description']      =   $_POST['ticket_description'];
                $insdata['ticket_price_type']       =   $_POST['ticket_price_type'];        
                $insdata['ticket_price']            =   $_POST['ticket_price'];
                $insdata['ticket_quantity']         =   $_POST['ticket_quantity'];
                $insdata['ticket_start_sale_date']  =   $_POST['ticket_start_sale_date'];
                $insdata['ticket_end_sale_date']    =   $_POST['ticket_end_sale_date'];
                $insdata['ticket_min_order']        =   $_POST['ticket_min_order'];
                $insdata['ticket_max_order']        =   $_POST['ticket_max_order'];
                
               
                if(empty($_POST['tid']))
                {
                    
                    $insdata['date_created']            =   date("Y-m-d H:i:s");       
                    
                    $numRows = $dbAdapter->insert('tickets', $insdata);
                    echo $insdata['pid'];die;  
                    
                    
                }
                else
                {
                    
                    $where  =   "id = '".$_POST['tid']."'";
                
                    $numRows = $dbAdapter->update('tickets', $insdata, $where);
                    
                    echo $insdata['pid'];die;  
                }
                
                        
                
                
                $id = $dbAdapter->lastInsertId();      
                       
                        
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
            }
            else
            {
               
                $insdata                            =   array();
            
                $insdata['pid']                     =   $_POST['eid'];
                $insdata['ticket_title']            =   $_POST['ticket_title'];
                $insdata['ticket_description']      =   $_POST['ticket_description'];
                $insdata['ticket_price_type']       =   $_POST['ticket_price_type'];        
                $insdata['ticket_price']            =   $_POST['ticket_price'];
                $insdata['ticket_quantity']         =   $_POST['ticket_quantity'];
    
                $insdata['ticket_start_sale_date']  =   (empty($_POST['ticket_start_sale_date']) ||  $_POST['ticket_start_sale_date']=="0000-00-00") ? $result['start_date'] : $_POST['ticket_start_sale_date'];
                $insdata['ticket_end_sale_date']    =   (empty($_POST['ticket_end_sale_date'])   || $_POST['ticket_end_sale_date']=="0000-00-00") ? $result['end_date'] : $_POST['ticket_end_sale_date'];
                
                $insdata['ticket_min_order']        =   $_POST['ticket_min_order'];
                $insdata['ticket_max_order']        =   $_POST['ticket_max_order'];
                
                
                if(empty($_POST['tid']))
                {
                    
                    $insdata['date_created']            =   date("Y-m-d H:i:s");       
                    
                    $numRows = $dbAdapter->insert('tickets', $insdata);
                    echo $insdata['pid'];die;  
                    
                    
                }
                else
                {
                    
                    $where  =   "id = '".$_POST['tid']."'";
                
                    $numRows = $dbAdapter->update('tickets', $insdata, $where);
                    
                    echo $insdata['pid'];die;  
                }
                
                        
                
                
                $id = $dbAdapter->lastInsertId();      
                       
                        
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
            }
            
        }
           
        
                       
        
        
        

        //echo $Response['message'];exit();
        echo json_encode($Response);exit();
        
    }
    
    
    public function previewticketsAction()
    {
       $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
        
        $sql                        =   "SELECT * FROM tickets WHERE id = '".$_REQUEST['tid']."' ";      
        $result                     =   $dbAdapter->fetchRow($sql);
        
        $insdata['pid']                     =   $result['pid'];
        $insdata['ticket_title']            =   $result['ticket_title'];
        $insdata['ticket_description']      =   $result['ticket_description'];
        $insdata['ticket_price']            =   ($result['ticket_price']=="0") ? '' : $result['ticket_price'];
        $insdata['ticket_quantity']         =   ($result['ticket_quantity']=="0") ? '' : $result['ticket_quantity'];
        $insdata['ticket_start_sale_date']  =   ($result['ticket_start_sale_date']=="0000-00-00 00:00:00" || $result['ticket_start_sale_date']=="0000-00-00" ) ? '' : $result['ticket_start_sale_date'];
        $insdata['ticket_end_sale_date']    =   ($result['ticket_end_sale_date']=="0000-00-00 00:00:00" || $result['ticket_end_sale_date']=="0000-00-00") ? '' : $result['ticket_end_sale_date'];
        $insdata['ticket_min_order']        =   ($result['ticket_min_order']=="0") ? '' : $result['ticket_min_order'];
        $insdata['ticket_max_order']        =   ($result['ticket_max_order']=="0") ? '' : $result['ticket_max_order'];
        
        echo json_encode($insdata);die;       
       
       
       $this->getHelper('layout')->disableLayout();  
       $this->_helper->viewRenderer->setNoRender(true);  
        
       $dbAdapter       =   Zend_Db_Table::getDefaultAdapter();  
       $numRows         =   $dbAdapter->delete('tickets', array('id  = ?' => $_REQUEST['tid']));
       
        if(!$numRows)
        {
            echo ""; exit();
            $Response['error']		=	true;
            $Response['message']	=	'Error';            
        }
        else
        {
            echo $_REQUEST['eid']; exit();
            $Response['error']		=	false;
            $Response['message']	=	'Complete';            
        }       
        
        echo json_encode($Response);exit();
       
       
    }
    
    public function deleteticketsAction()
    {
       
       $this->getHelper('layout')->disableLayout();  
       $this->_helper->viewRenderer->setNoRender(true);  
        
       $dbAdapter       =   Zend_Db_Table::getDefaultAdapter();  
       $numRows         =   $dbAdapter->delete('tickets', array('id  = ?' => $_REQUEST['tid']));
       
        if(!$numRows)
        {
            echo ""; exit();
            $Response['error']		=	true;
            $Response['message']	=	'Error';            
        }
        else
        {
            echo $_REQUEST['eid']; exit();
            $Response['error']		=	false;
            $Response['message']	=	'Complete';            
        }       
        
        echo json_encode($Response);exit();
       
       
    }


}

