<?php

class Zend_View_Helper_MyEvents extends Zend_View_Helper_Abstract 
{
    public  $filter;
    public function MyEvents ($filter)
    {        
             
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();             
                
                
        $sql           =   "SELECT *,(SELECT IFNULL(SUM(total_quantity),0) FROM orders o WHERE o.eid=e.id ) AS ticket_sold FROM `events` e  WHERE e.status = 'Active' AND e.coordinator = '".Zend_Auth::getInstance()->getIdentity()->id."'";
        $result        =   $dbAdapter->fetchAll($sql);
        if(!empty($result))
        {
            
            echo '<div id="eventLongBar">';
            
            echo '<div id="eventName">Event name</div>';      
            echo '<div id="eventDate">Date</div>';
            echo '<div id="eventStatus">Status</div>';
            echo '<div id="eventSold">Sold</div>';
            echo '<div id="eventActions">Actions</div>';
            echo '<div style="clear:both;"></div>';
            
            foreach($result as $key=>$value)
            {            
                
                echo '<div class="eventbar" id="myevent'.$value['id'].'" onmouseover="ShowMyEventHoverBar('.$value['id'].')" onmouseout="HideMyEventHoverBar('.$value['id'].')" >';
                echo '<div class="eventUnderName">'.truncate(trim($result[$key]['title']), 100, '...' , false, false).'</div>';
                echo '<div class="eventUnderDate">'.$result[$key]['start_date'].'</div>';
                echo '<div class="eventUnderStatus">'.$result[$key]['event_status'].'</div>';
                echo '<div class="eventUnderSold">'.$result[$key]['ticket_sold'].'</div>';
                echo '
                      <div class="eventUnderActions" id="action'.$value['id'].'" style="display:none">
                      <div class="sep">&nbsp;</div>
                      <div><div id="user"><p><a class="press-it-btn" href="/eventattende?eid='.$result[$key]['id'].'" alt="Event Attendee" title="Event Attendee"></a></p></div></div>
                      <div class="sep">&nbsp;</div>
                      <div><div id="tag-ticket"><p><a class="press-it-btn" href="/eventtickets?eid='.$result[$key]['id'].'" alt="Event Tickets" title="Event Tickets"></a></p></div></div>
                      <div class="sep">&nbsp;</div>
                      <div><div id="adminuser"><p><a class="press-it-btn" href="/invite/?eid='.$result[$key]['id'].'" alt="Event Invite" title="Event Invite"></a></p></div></div>
                      <div class="sep">&nbsp;</div>
                      <div><div id="event-srch"><p><a class="press-it-btn" href="/eventdetail/?id='.$result[$key]['id'].'" alt="Event Preview" title="Event Preview" ></a></p></div></div>
                      <div class="sep">&nbsp;</div>
                      <div><div id="event-setting"><p><a class="press-it-btn" href="/editevent?eid='.$result[$key]['id'].'" alt="Event Edit" title="Event Edit"></a></p></div></div>
                      <div class="sep">&nbsp;</div>
                     ';
                        
                    if(trim($result[$key]['event_status'])== 'Published')
                    {                
                        echo   '<div><div id="announce" class="publish_events"><p><a class="press-it-btn" id="publish_events" data="'.$result[$key]['id'].'" href="/publishevent?eid='.$result[$key]['id'].'&amp;event_status=Draft" alt="Event Draft" title="Event Draft"></a></p></div></div>';
                                          
                    }
                    else
                    {                
                        echo '<div><div id="announce" class="publish_events"><p><a class="press-it-btn" id="publish_events" data="'.$result[$key]['id'].'" href="/publishevent?eid='.$result[$key]['id'].'&amp;event_status=Published" alt="Event Publish" title="Event Publish"></a></p></div></div>';                
                    }          
                echo '<div><div id="dustbin"><p><a class="press-it-btn" id="delete_events" data="'.$result[$key]['id'].'" alt="Event Delete" title="Event Delete"></a></p></div></div>
                      </div> ';
                echo '</div>';
                echo '<div style="clear:both;"></div>';
            }       
            
            echo '</div>';
        }
        else
        {
            echo '<div style="text-align: center;">There are no records</div>';    
            
        }
        
         
        
    }
}




?>