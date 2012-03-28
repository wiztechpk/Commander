<?php

class OrderstartController extends Zend_Controller_Action
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
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
                
        $sql                        =   "SELECT * FROM events WHERE id = '".$_REQUEST['eid']."' ";  
        $resulteventdetail          =   $dbAdapter->fetchRow($sql);        
        $this->view->eventdetail    =   $resulteventdetail; 
        
        $sql                        =   "SELECT * FROM organization WHERE id = '".$resulteventdetail['oid']."' ";      
        $result                     =   $dbAdapter->fetchRow($sql);        
        $this->view->orgdetail      =   $result; 
        
        
        $sql                        =   "SELECT * FROM tickets WHERE pid = '".$_REQUEST['eid']."' ";      
        $result                     =   $dbAdapter->fetchAll($sql);        
        $this->view->ticketdetail   =   $result;
        
        
        $this->view->layout()->pagetitle        = $resulteventdetail['title'];
        $this->view->layout()->pagebreadcumb    = 'home &nbsp; &raquo; &nbsp; '.strtolower($resulteventdetail['title']);        
       
    }

    public function reviewAction()
    {
        
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
        
        $sql                        =   "SELECT * FROM events WHERE id = '".$_REQUEST['eid']."' ";      
        $result                     =   $dbAdapter->fetchRow($sql);        
        $this->view->eventdetail    =   $result; 
        
        $sql                        =   "SELECT * FROM organization WHERE id = '".$_REQUEST['oid']."' ";      
        $result                     =   $dbAdapter->fetchRow($sql);        
        $this->view->orgdetail      =   $result; 
        
        
        $sql                        =   "SELECT * FROM tickets WHERE pid = '".$_REQUEST['eid']."' ";      
        $result                     =   $dbAdapter->fetchAll($sql);        
        $this->view->ticketdetail   =   $result;
    }

    public function processAction()
    {
        
        
        
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                        
            
        
        $Response['error'] 		=	false;
        $Response['message'] 	=	'';
        
          
        //print_r($_REQUEST);die;       
        
        $insdata                    =   array();
        
        if(Zend_Auth::getInstance()->hasIdentity())
        {
            $mid    =   Zend_Auth::getInstance()->getIdentity()->id;
            
        }
        else
        {
            $insdata['first_name']      =   $_REQUEST['first_name'];
            $insdata['last_name']       =   $_REQUEST['last_name'];
            $insdata['email']           =   $_REQUEST['email_address'];
            $insdata['password']        =   $_REQUEST['passwd1'];
                         
                    
            $numRows    =   $dbAdapter->insert('members', $insdata);
            $mid        =   $dbAdapter->lastInsertId();
            
            unset($insdata); 
            
        }
        
              
                
        
        $insdata['eid']             =  $_REQUEST['eid'];
        $insdata['mid']             =  $mid;
        $insdata['total_quantity']  =  $_REQUEST['total_quantity'];
        $insdata['total_amount']    =  $_REQUEST['total_amount'];
        $insdata['data']            =  serialize($_REQUEST);             
        $insdata['status']          =  'Active';
        $insdata['date_created']    =   date("Y-m-d H:i:s");
        
        $numRows = $dbAdapter->insert('orders', $insdata);
        $id = $dbAdapter->lastInsertId();        
               
        unset($insdata);
        
        
        
        
        $sql                        =   "SELECT * FROM tickets WHERE pid = '".$_REQUEST['eid']."' ";      
        $result                     =   $dbAdapter->fetchAll($sql);
        
        foreach($result as $key => $value)
        {
            if($_REQUEST['quant_'.$value['id']] > 0)
            {
                $insdata                    =   array();
                $insdata['oid']             =  $id;
                $insdata['eid']             =  $_REQUEST['eid'];
                $insdata['mid']             =  $mid;
                $insdata['tid']             =  $value['id'];
                $insdata['tq']              =  $_REQUEST['quant_'.$value['id']];                        
                $numRows = $dbAdapter->insert('orders_tickets', $insdata);
                
                $otid = $dbAdapter->lastInsertId(); 
                
                unset($insdata);
                
                
                for($i=1; $i <= $_REQUEST['quant_'.$value['id']]; $i++)
                {
                    $insdata                    =   array();                             
                    $insdata['oid']             =  $id;
                    $insdata['eid']             =  $_REQUEST['eid'];
                    $insdata['otid']            =  $otid;
                    $insdata['mid']             =  $mid;
                    $insdata['tid']             =  $value['id'];
                    $insdata['attende_name']    =  $_REQUEST['attendee_'.$value['id'].'_'.$_REQUEST['quant_'.$value['id']].'_first_name']." ".$_REQUEST['attendee_'.$value['id'].'_'.$_REQUEST['quant_'.$value['id']].'_last_name'];             
                    $insdata['attende_email']    =  $_REQUEST['attendee_'.$value['id'].'_'.$_REQUEST['quant_'.$value['id']].'_email_address'];
                    $insdata['attende_cell_phone']    =  $_REQUEST['attendee_'.$value['id'].'_'.$_REQUEST['quant_'.$value['id']].'_cell_phone'];
                    
                
                    $numRows = $dbAdapter->insert('orders_detail', $insdata);
                    unset($insdata);
                }
            }    
            
        }
        
        if($_REQUEST['total_amount']==0)
        {
            $this->_redirect('/orderstart/printticket/?oid='.$id);die;
            
        }
                     
        
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
        $this->_redirect('/orderstart/printticket/?oid='.$id); 
        //$this->_redirect('/orderstart/paypal/?oid='.$id);
        
                 
        //$this->_redirect('/orderstart/printticket/?oid='.$id);
                
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
    
    
    public function paypalAction()
    {
        
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        
        require_once('paypal.class.php');  // include the class file
        
        $p = new paypal_class;             // initiate an instance of the class
        $p->paypal_url = 'https://www.sandbox.paypal.com/cgi-bin/webscr';   // testing paypal url
        //$p->paypal_url = 'https://www.paypal.com/cgi-bin/webscr';     // paypal url
                    
        // setup a variable for this script (ie: 'http://www.micahcarrick.com/paypal.php')
        $this_script = 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'];
        $this_url    = 'http://'.$_SERVER['HTTP_HOST'];
        
        // if there is not action variable, set the default action of 'process'
        if (empty($_GET['action'])) $_GET['action'] = 'process';  
        
        switch ($_GET['action']) {
            
           case 'process':      // Process and order...
        
              // There should be no output at this point.  To process the POST data,
              // the submit_paypal_post() function will output all the HTML tags which
              // contains a FORM which is submited instantaneously using the BODY onload
              // attribute.  In other words, don't echo or printf anything when you're
              // going to be calling the submit_paypal_post() function.
         
              // This is where you would have your form validation  and all that jazz.
              // You would take your POST vars and load them into the class like below,
              // only using the POST values instead of constant string expressions.
         
              // For example, after ensureing all the POST variables from your custom
              // order form are valid, you might have:
              //
              
              if(Zend_Auth::getInstance()->hasIdentity())
              {
                                       
                    $sql                        =   "SELECT * FROM members WHERE id = '".Zend_Auth::getInstance()->getIdentity()->id."' ";      
                    $result                     =   $dbAdapter->fetchRow($sql);
                    
                    $p->add_field('first_name',     $result['first_name']);
                    $p->add_field('last_name',      $result['last_name']);                         
                    
                    
                    
              }
              else
              {
                    $insdata['first_name']      =   $_REQUEST['first_name'];
                    $insdata['last_name']       =   $_REQUEST['last_name'];
                                 
                    
              }
              
              
              
              $p->add_field('first_name', $_POST['first_name']);
              $p->add_field('last_name', $_POST['last_name']);
              
              $p->add_field('business', 'memon.haseeb@hotmail.com');
              $p->add_field('return', $this_url.'/orderstart/printticket/?oid='.$_REQUEST['oid']);
              $p->add_field('cancel_return', $this_script.'?action=cancel');
              $p->add_field('notify_url', $this_script.'?action=ipn');
              
                           
              $p->add_field('rm', '2');
              $p->add_field('cmd', '_cart');
              
              $sql      =   "SELECT t.ticket_title,t.ticket_price FROM orders_detail od INNER JOIN tickets t ON od.tid = t.id WHERE od.oid = '".$_REQUEST['oid']."' ";      
              $result   =   $dbAdapter->fetchRow($sql);
              $i        =   1;               
              foreach($result as $key=>$value)
              {
                $p->add_field('item_name_'.$i.'', $value['ticket_title']);
                $p->add_field('item_number_'.$i.'', $i);
                $p->add_field('quantity_'.$i.'', '1');
                $p->add_field('amount_'.$i.'', $value['ticket_price']);  
                
              } 
              
                            
              $p->add_field('upload', '1');
              $p->add_field('cn', '1');
              $p->add_field('tx', 'TransactionID');
              $p->add_field('currency_code', 'USD');
              $p->add_field('no_shipping', '1');
              
                           
              
               
              $p->submit_paypal_post(); // submit the fields to paypal
              //$p->dump_fields();      // for debugging, output a table of all the fields
              break;
              
           case 'success':      // Order was successful...
           
              // This is where you would probably want to thank the user for their order
              // or what have you.  The order information at this point is in POST 
              // variables.  However, you don't want to "process" the order until you
              // get validation from the IPN.  That's where you would have the code to
              // email an admin, update the database with payment status, activate a
              // membership, etc.  
         
              echo "<html><head><title>Success</title></head><body><h3>Thank you for your order.</h3>";
              foreach ($_POST as $key => $value) { echo "$key: $value<br>"; }
              echo "</body></html>";
              
              // You could also simply re-direct them to another page, or your own 
              // order status page which presents the user with the status of their
              // order based on a database (which can be modified with the IPN code 
              // below).
              
              break;
              
           case 'cancel':       // Order was canceled...
        
              // The order was canceled before being completed.
         
              echo "<html><head><title>Canceled</title></head><body><h3>The order was canceled.</h3>";
              echo "</body></html>";
              
              break;
              
           case 'ipn':          // Paypal is calling page for IPN validation...
           
              // It's important to remember that paypal calling this script.  There
              // is no output here.  This is where you validate the IPN data and if it's
              // valid, update your database to signify that the user has payed.  If
              // you try and use an echo or printf function here it's not going to do you
              // a bit of good.  This is on the "backend".  That is why, by default, the
              // class logs all IPN data to a text file.
              
              if ($p->validate_ipn()) {
                  
                 // Payment has been recieved and IPN is verified.  This is where you
                 // update your database to activate or process the order, or setup
                 // the database with the user's order details, email an administrator,
                 // etc.  You can access a slew of information via the ipn_data() array.
          
                 // Check the paypal documentation for specifics on what information
                 // is available in the IPN POST variables.  Basically, all the POST vars
                 // which paypal sends, which we send back for validation, are now stored
                 // in the ipn_data() array.
          
                 // For this example, we'll just email ourselves ALL the data.
                 $subject = 'Instant Payment Notification - Recieved Payment';
                 $to = 'YOUR EMAIL ADDRESS HERE';    //  your email
                 $body =  "An instant payment notification was successfully recieved\n";
                 $body .= "from ".$p->ipn_data['payer_email']." on ".date('m/d/Y');
                 $body .= " at ".date('g:i A')."\n\nDetails:\n";
                 
                 foreach ($p->ipn_data as $key => $value) { $body .= "\n$key: $value"; }
                 mail($to, $subject, $body);
              }
              break;
         }     
        
        
        $dbAdapter                  =   Zend_Db_Table::getDefaultAdapter();
        
        $sql                        =   "SELECT * FROM events WHERE id = '".$_REQUEST['eid']."' ";      
        $result                     =   $dbAdapter->fetchRow($sql);        
        $this->view->eventdetail    =   $result; 
        
        $sql                        =   "SELECT * FROM organization WHERE id = '".$_REQUEST['eid']."' ";      
        $result                     =   $dbAdapter->fetchRow($sql);        
        $this->view->orgdetail      =   $result; 
        
        
        $sql                        =   "SELECT * FROM tickets WHERE pid = '".$_REQUEST['eid']."' ";      
        $result                     =   $dbAdapter->fetchAll($sql);        
        $this->view->ticketdetail   =   $result;
    }

    public function printticketAction()
    {
        //print_r($_REQUEST);die;
        // action body
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        $result         =   $dbAdapter->fetchRow('SELECT * FROM orders WHERE id = '.$_REQUEST['oid'].'');
        
        $orderdata      =   unserialize($result['data']);
                
        $sql            =   "SELECT * FROM events WHERE id = '".$orderdata['eid']."' ";      
        $eventdetail    =   $dbAdapter->fetchRow($sql);        
        
        
        $sql            =   "SELECT * FROM tickets WHERE pid = '".$orderdata['eid']."' ";      
        $ticketdetail   =   $dbAdapter->fetchAll($sql);
        
        $echo = '<div style="float:left;"><input type="button" name="print" value="Print Tickets" onClick="window.print()"></div><br /><br />';
        
        foreach($ticketdetail as $key=>$value)
        {
            
            if($orderdata['quant_'.$value['id']] > 0)
            {
               for($i=1; $i<=$orderdata['quant_'.$value['id']]; $i++ ) {
                // Only the text to draw is required
                $barcodeOptions = array('text' => '95638521');        
                // No required options
                $rendererOptions = array();        
                // Draw the barcode in a new image,
                $imageResource = Zend_Barcode::draw(
                    'code39', 'image', $barcodeOptions, $rendererOptions
                );        
                imagejpeg($imageResource, 'barcode/barcode.jpg', 100);       
                
                
                       
                $echo .= '
                                
                <div class="ticket_bg">
                <div class="event_title">'.$value['ticket_title'].'</div>
                <div class="barcode"><img src="/assets/images/barcode.jpg" /></div>
                <div class="bottom_margin"><table width="500" border="0">
                  <tr>
                    <td width="290"></td>
                    <td width="270" align="right"><span class="title1">'.date("F j, Y", strtotime($eventdetail['start_date'])).'</span> <span class="sub_title">Timing: '.date("h:i A", strtotime($this->eventdetail['start_time'])).'</span><br />
                      <span class="title1">'.date("F j, Y", strtotime($eventdetail['end_date'])).'</span> <span class="sub_title">Timing: '.date("h:i A", strtotime($eventdetail['end_time'])).'</span></td>
                  </tr>
                </table>
                </div>                
                </div>                
                ';
                
                $echo .=  '<br /><br /><br /><br />';
                
                
                }
                 
                
            }
                
            
        }        
        
        $this->view->printticket   =   $echo;
        
        
    }


}




