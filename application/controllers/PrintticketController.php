<?php

class PrintticketController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
        
        
        $result         =   $dbAdapter->fetchRow('SELECT * FROM `orders` o INNER JOIN `orders_tickets` ot ON o.id=ot.oid INNER JOIN `orders_detail` od ON ot.id=od.otid WHERE o.id = '.$_REQUEST['oid'].' AND od.id = '.$_REQUEST['odid'].' ');
        $sql            =   "SELECT * FROM `events` e INNER JOIN  `tickets` t ON e.id=t.pid  WHERE e.id = '".$result['eid']."' AND t.id = '".$result['tid']."' ";      
        $eventdetail1   =   $dbAdapter->fetchRow($sql);    
            
        $echo           =   "";
        foreach($result AS $value1)
        {
            $echo           =   '';            
            
            $echo .= '<div style="float:left;"><input type="button" name="print" value="Print Tickets" onClick="window.print()"></div><br /><br />';
            // Only the text to draw is required
            $barcodeOptions = array('text' => '95638521');        
            // No required options
            $rendererOptions = array();        
            // Draw the barcode in a new image,
            $imageResource = Zend_Barcode::draw(
                'code39', 'image', $barcodeOptions, $rendererOptions
            );        
            imagejpeg($imageResource, 'barcode/barcode.jpg', 100);       
            
            
            //print_r($eventdetail1[ticket_title]);die;
                   
            $echo .= '
                            
            <div class="ticket_bg">
            <div class="event_title">'.$eventdetail1['ticket_title'].'</div>
            <div class="barcode"><img src="/assets/images/barcode.jpg" /></div>
            <div class="bottom_margin"><table width="500" border="0">
              <tr>
                <td width="290"></td>
                <td width="270" align="right"><span class="title1">'.date("F j, Y", strtotime($eventdetail1['start_date'])).'</span> <span class="sub_title">Timing: '.date("h:i A", strtotime($eventdetail1['start_time'])).'</span><br />
                  <span class="title1">'.date("F j, Y", strtotime($eventdetail1['end_date'])).'</span> <span class="sub_title">Timing: '.date("h:i A", strtotime($eventdetail1['end_time'])).'</span></td>
              </tr>
            </table>
            </div>                
            </div>                
            ';
            
            $echo .=  '<br /><br /><br /><br />';
            
        }        
        
        
        //echo $echo;die;
               
                
        
        $this->view->printticket1   =   $echo;
    }


}

