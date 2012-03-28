/* Javascript Functions   */
function checkQuantity(c) {
    var e = 1;
    legalChars = " 0123456789\t\r\n";
    nonZeroChars = "123456789";
    for (var f = 0; f < c.length; f++) {
        var k = c.charAt(f);
        if (legalChars.indexOf(k) == -1)
            return 0;
        if (nonZeroChars.indexOf(k) > -1)
            e = 2
    }
    return e
}
function checkAmount(c) {
    var e = 1;
    legalChars = " 0123456789.\t\r\n";
    nonZeroChars = "123456789";
    for (var f = 0; f < c.length; f++) {
        var k = c.charAt(f);
        if (legalChars.indexOf(k) == -1)
            return 0;
        if (nonZeroChars.indexOf(k) > -1)
            e = 2
    }
    return e
}

function validateform()
{
	var c = false,
		e = false,
		f = false;
       
	if (document.mgform) for (f = 0; f < document.mgform.length; f++)
	{
		if(f > 0)
        {
        var k = document.mgform.elements[f];
        
		if (k.name.substring(0, 6) == "quant_")
		{
			
            quantStatus = checkQuantity(k.value);
			if (quantStatus == 2) e = true;
			if (quantStatus == 0) c = true
		}
		if (k.name.substring(0, 4) == "amt_")
		{
			quantStatus = checkAmount(k.value);
			if (quantStatus == 2) e = true;
			if (quantStatus == 0) c = true
		}
        }
	}
    
    
    
	f = e == true && c == false;
	if (f == false)
	{
		display_error_msg("alert", "quantity", "event");
		return f
	}
	if (document.mgform.selecteddate && document.mgform.selecteddate.selectedIndex < 1)
	{
		display_error_msg("alert", "date", "event");
		return false
	}
    
    
    var tickets =   document.getElementsByName('tickets[]');
    
    
    for (var ii = 0; ii < tickets.length; ii++)
    {
                        
            if(document.getElementById('quant_' + tickets[ii].value + '').value > 0)
			{
			       
				if(document.getElementById('ticket_min_order_'+ eval(tickets[ii].value) + '').value > 0 || document.getElementById('ticket_max_order_'+ eval(tickets[ii].value) + '').value >0)
	            {
	                 
					if( ( document.getElementById('quant_' + eval(tickets[ii].value) + '').value  <   document.getElementById('ticket_min_order_'+ eval(tickets[ii].value) + '').value )   ||  (document.getElementById('quant_' + eval(tickets[ii].value) + '').value > document.getElementById('ticket_max_order_'+ eval(tickets[ii].value) + '').value )  )
	                {
	                    
                        alert("You can buy min " + document.getElementById('ticket_min_order_'+ eval(tickets[ii].value) + '').value + " or max "+document.getElementById('ticket_max_order_'+ eval(tickets[ii].value) + '').value + " tickets of  " + document.getElementById('ticket_title_'+ eval(tickets[ii].value) + '').value +" ");
	                    return false;
	                        
	                }
	                
	                
	            }
            
        
			}        

    }  
	return true;
}





function placeOrder(){ if(document.registrationForm.total_amount.value > 0 ){ document.registrationForm.action = "orderstart/review"; document.registrationForm.submit(); }else{ document.registrationForm.action = "/orderstart/process"; document.registrationForm.submit();}}

function payByEventbrite() { if(document.registrationForm.total_amount.value > 0 ){ document.registrationForm.action = "orderstart/review"; this.form.onsubmit(); return false; document.registrationForm.submit();  }else{ document.registrationForm.action = "/orderstart/process"; this.form.onsubmit(); return false; document.registrationForm.submit(); }}


function Hide(c){if(document.getElementById(c))if(document.getElementById(c).style.display!="none")document.getElementById(c).style.display="none"}

function Show(c,e){if(document.getElementById(c))if(document.getElementById(c).style.display=="none")if(typeof e!="undefined"&&e!="")document.getElementById(c).style.display=e;else document.getElementById(c).style.display="block"}

function CopyInfo(checked, ticket_id, no,lastticket_id,last_no)
{    
    
    
    if(checked)
    {
        document.getElementById('attendee_' + ticket_id + '_' + eval(no) + '_first_name').value    =   document.getElementById('attendee_' + lastticket_id + '_' + last_no + '_first_name').value;
        document.getElementById('attendee_' + ticket_id + '_' + eval(no) + '_last_name').value     =   document.getElementById('attendee_' + lastticket_id + '_' + last_no + '_last_name').value;
        document.getElementById('attendee_' + ticket_id + '_' + eval(no) + '_email_address').value =   document.getElementById('attendee_' + lastticket_id + '_' + last_no + '_email_address').value;
        document.getElementById('attendee_' + ticket_id + '_' + eval(no) + '_cell_phone').value    =   document.getElementById('attendee_' + lastticket_id + '_' + last_no + '_cell_phone').value;
        
        
    }
    else
    {
        document.getElementById('attendee_' + ticket_id + '_' + eval(no) + '_first_name').value    =   "";
        document.getElementById('attendee_' + ticket_id + '_' + eval(no) + '_last_name').value     =   "";
        document.getElementById('attendee_' + ticket_id + '_' + eval(no) + '_email_address').value =   "";
        document.getElementById('attendee_' + ticket_id + '_' + eval(no) + '_cell_phone').value    =   "";          
        
    }  
           
        
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function backSteps(step)
{        
    
    if(step == 1)
    {
        $(".detail").attr('class','detail_select');
        $(".one").attr('class','one_select');
        
        $(".date_select").attr('class','date');
        $(".two_select").attr('class','two');
        
        $(".ticket_select").attr('class','ticket');
        $(".three_select").attr('class','three');
        
        $(".create_select").attr('class','create');
        $(".four_select").attr('class','four');             
    }
            
    if(step == 3)
    {
        $(".detail_select").attr('class','detail');
        $(".one_select").attr('class','one');
        
        $(".date").attr('class','date_select');
        $(".two").attr('class','two_select');
        
        $(".ticket_select").attr('class','ticket');
        $(".three_select").attr('class','three');
        
        $(".create_select").attr('class','create');
        $(".four_select").attr('class','four');             
    } 
    
    if(step == 5)
    {
        $(".detail_select").attr('class','detail');
        $(".one_select").attr('class','one');
        
        $(".date_select").attr('class','date');
        $(".two_select").attr('class','two');
        
        $(".ticket").attr('class','ticket_select');
        $(".three").attr('class','three_select');
        
        $(".create_select").attr('class','create');
        $(".four_select").attr('class','four');            
    }            
    
    var stepsWidth	= 0;
    var widths 		= new Array();
	$('#steps .step').each(function(i){
        var $step 		= $(this);
		widths[i]  		= stepsWidth;
        stepsWidth	 	+= $step.width();
    });
	$('#steps').width(stepsWidth);
    
    
    
    current  = step;           
    
    $('#steps').stop().animate({
            marginLeft: '-' + widths[current-1] + 'px'
        },1200,function(){
			//if(current == fieldsetCount)
				//validateSteps();
			//else
				//validateStep(prev);
			//$('#formElem').children(':nth-child('+ parseInt(current) +')').find(':input:first').focus();	
		});
        //$(window).scrollTop(200);
        //e.preventDefault();
    
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function nextSteps(step)
{        
    if(step == 1)
    {
        $(".detail").attr('class','detail_select');
        $(".one").attr('class','one_select');
        
        $(".date_select").attr('class','date');
        $(".two_select").attr('class','two');
        
        $(".ticket_select").attr('class','ticket');
        $(".three_select").attr('class','three');
        
        $(".create_select").attr('class','create');
        $(".four_select").attr('class','four');             
    }
            
    if(step == 3)
    {
        $(".detail_select").attr('class','detail');
        $(".one_select").attr('class','one');
        
        $(".date").attr('class','date_select');
        $(".two").attr('class','two_select');
        
        $(".ticket_select").attr('class','ticket');
        $(".three_select").attr('class','three');
        
        $(".create_select").attr('class','create');
        $(".four_select").attr('class','four');             
    } 
    
    if(step == 5)
    {
        $(".detail_select").attr('class','detail');
        $(".one_select").attr('class','one');
        
        $(".date_select").attr('class','date');
        $(".two_select").attr('class','two');
        
        $(".ticket").attr('class','ticket_select');
        $(".three").attr('class','three_select');
        
        $(".create_select").attr('class','create');
        $(".four_select").attr('class','four');            
    }
    
    $('.back_buttons').show();
    
    var stepsWidth	= 0;
    var widths 		= new Array();
	$('#steps .step').each(function(i){
        var $step 		= $(this);
		widths[i]  		= stepsWidth;
        stepsWidth	 	+= $step.width();
    });
	$('#steps').width(stepsWidth);
    
    current  = step;
           
    
    $('#steps').stop().animate({
            marginLeft: '-' + widths[current-1] + 'px'
        },1200,function(){
			//if(current == fieldsetCount)
				//validateSteps();
			//else
				//validateStep(prev);
			//$('#formElem').children(':nth-child('+ parseInt(current) +')').find(':input:first').focus();	
		});
        //$(window).scrollTop(200);
        //e.preventDefault();
    
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function display_error_msg(mode, errKey, htmlForm, field1, field2, field3)
{
	var keyField1 = '$$$$';
	var keyField11 = '$ $ $ $';
	var keyField2 = '££££';
	var keyField3 = '§§§§';

	var keymessage = 'error_' + htmlForm + '_' + errKey;
	if (document.getElementById(keymessage))
	{
		var extMessage = document.getElementById(keymessage).innerHTML;
		if (field1)
		{
			extMessage = extMessage.replace(keyField1, field1);
			extMessage = extMessage.replace(keyField11, field1);
		}
		if (field2)
		{
			extMessage = extMessage.replace(keyField2, field2);
		}
		if (field3)
		{
			extMessage = extMessage.replace(keyField3, field3);
		}

		extMessage = extMessage.replace(/<br>/g, '\n');
		extMessage = extMessage.replace(/<BR>/g, '\n');
		//==========================================
		//== simple alert box or Confirm (yes/No) ==
		if (mode == 'alert' || mode == '')
		{
			alert(extMessage);
		}
		else
		{
			return confirm(extMessage);
		}
	}
}

function display_error_msg_div(errKey, htmlForm, divId, errData)
{
	var keymessage = 'error_' + htmlForm + '_' + errKey;
	var errValue = '';
	if (errData) errValue = '  [' + errData + ']';
	if (document.getElementById(keymessage))
	{
		document.getElementById(divId).style.display = 'block';
		document.getElementById(divId).innerHTML = document.getElementById(keymessage).innerHTML + errValue;
	}
}

function display_label_msg_div(valueKey, htmlForm, divId)
{
	var keymessage = 'data_' + htmlForm + '_' + valueKey;
	if (document.getElementById(keymessage))
	{
		document.getElementById(divId).innerHTML = document.getElementById(keymessage).innerHTML;
	}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ShowHoverBar(id)
{
    $('#bar'+id).removeClass('bar');
    
    $('#bar'+id).addClass('barhoverbg');
    
    $('#action'+id).show();
    
}

function HideHoverBar(id)
{
    $('#bar'+id).removeClass('barhoverbg');
    
    $('#bar'+id).addClass('bar');
    
    $('#action'+id).hide();
    
}


function ShowMyEventHoverBar(id)
{
    $('#myevent'+id).removeClass('eventbar');
    
    $('#myevent'+id).addClass('eventlongbar');
    
    $('#action'+id).show();
    
}

function HideMyEventHoverBar(id)
{
 
    $('#myevent'+id).removeClass('eventlongbar');
    
    $('#myevent'+id).addClass('eventbar');
    
    $('#action'+id).hide();
    
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function save_organization()
{    
    
    $(document).ready(function() {
        
        var hasError = false;
        if($('#organization_name').val()=="")
        {
            hasError = true;	
            $.colorbox({html:"Please Provide Organization Name",fixed:true});
            return false;
        }
        
        if($('#organization_description').val()=="")
        {            
            hasError = true;		
            $.colorbox({html:"Please Provide Organization Description",fixed:true});
            return false;
            
        }    
        
        if(hasError === false)
        {        
            
                
            $.ajax({
        		type	: "POST",
        		cache	: false,
        		url		: "/myprofile/process",
                data	: $('#organizer_form').serializeArray(),            
                dataType: "json",
        		success : function(data)
                {   
                    if(data.error===false)
                    {
                        $.colorbox({html:"Your Profile has been created",fixed:true});                    
                        document.location.href='/myprofile';
                        
                    }
        		}
        	});
            
            return false;
            
            
        }         
               
        
        
    });
	return false;
    
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function submitOrg(myoid)
{
    
    if(myoid)
    {
        document.location.href='/myprofile/index?oid='+myoid;
    }
    
	return false;
    
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function CreateTicket(tid)
{   
    $("#ticket_fields").show();   
    
}

function CancelTicket(eid)
{   
    
    $('#tid').val();    
    $('#ticket_title').val('');
    $('#ticket_quantity').val('');
    $('#ticket_price').val('');
    $('#ticket_start_sale_date').val('');
    $('#ticket_end_sale_date').val('');
    $('#ticket_min_order').val('');
    $('#ticket_max_order').val('');
    $('#ticket_description').val('');
    CKEDITOR.instances.ticket_description.setData('');
    
    
    
}


function SaveTicket(tid)
{       
    var hasError = false;
    if($('#ticket_title').val()=="")
    {
        hasError = true;	
        $.colorbox({html:"Please Provide Ticket Title",fixed:true});
        return false;
    }
    if($('#ticket_price_type').val()!="free")
    {
        if($('#ticket_price').val()=="")
        {
        hasError = true;		
        $.colorbox({html:"Please Provide Ticket Price",fixed:true});
        return false;
        }
    }    
    
    if(hasError === false)
    {
        
        $('#event_tickets').html("<img src='/static/images/loading-contact.gif' alt='loading...' title='loading...' />");
        
        
        
        if($('#ticket_start_sale_date').val()=="")
        {            
            ticket_start_sale_date = '0000-00-00';
            //ticket_start_sale_date = $('#start_date').val();
        }
        else
        {
            ticket_start_sale_date = $('#ticket_start_sale_date').val();
        }
        
        if($('#ticket_end_sale_date').val()=="")
        {            
            ticket_end_sale_date = '0000-00-00';
            //ticket_end_sale_date = $('#end_date').val();
        }
        else
        {
            ticket_end_sale_date = $('#ticket_end_sale_date').val();
        }        
        
        var ticket_description = CKEDITOR.instances.ticket_description.getData();    
        $.ajax({
        	type	: "POST",
        	cache	: false,
        	url		: "/createticket/process",
        	data	: { eid: $('#eid').val(), tid: $('#tid').val(), ticket_title: $('#ticket_title').val() , ticket_price_type: $('#ticket_price_type').val(), ticket_description: ticket_description, ticket_price : $('#ticket_price').val(), ticket_quantity: $('#ticket_quantity').val(), ticket_start_sale_date: ticket_start_sale_date, ticket_end_sale_date: ticket_end_sale_date, ticket_min_order: $('#ticket_min_order').val(), ticket_max_order: $('#ticket_max_order').val()  },
        	success : function(data) {
                LoadTickets (data);
                $('#tid').val('');
                $('#ticket_title').val('');
                $('#ticket_quantity').val('');
                $('#ticket_price').val('');
                $('#ticket_start_sale_date').val('');
                $('#ticket_end_sale_date').val('');
                $('#ticket_min_order').val('');
                $('#ticket_max_order').val('');              
                $('#ticket_description').val('');                        
                CKEDITOR.instances.ticket_description.setData('');          
        	}
        });
        
        return false;
        
        
    }
    
        
       
    
}

function LoadTickets(event_id)
{    
    
    $(document).ready(function() {
        
        $.ajax({
    		type	: "POST",
    		cache	: false,
    		url		: "/createticket/loadtickets",		
            data    : "event_id=" + event_id,
            dataType: "html",
    		success : function(data) {    	          
                
                $('#event_tickets').html(data);
                $('#ticket_fields').hide();  
                $('#event_tickets').show();               
                
                
    		}
    	});
    });
	return false;
    
}

function EditTicket(eid,tid) {

         
    $.ajax({
		type	: "POST",
		cache	: false,
		url		: "/editticket/",		
        data    : "tid=" + tid,
        dataType: "json",
		success : function(data) {    	          
            
            $('#ticket_title').val(data.ticket_title);
            $('#ticket_quantity').val(data.ticket_quantity);
            $('#ticket_price_type').val(data.ticket_price_type);
            $('#ticket_price').val(data.ticket_price);
            $('#ticket_start_sale_date').val(data.ticket_start_sale_date);
            $('#ticket_end_sale_date').val(data.ticket_end_sale_date);
            $('#ticket_min_order').val(data.ticket_min_order);
            $('#ticket_max_order').val(data.ticket_max_order);
            $('#ticket_description').val(data.ticket_description);                                    
            CKEDITOR.instances.ticket_description.setData(data.ticket_description);            
            $('#tid').val(data.id);
            LoadTickets (data.pid);               
            
            
		}
	});
    
    
        
    return false;
    
}

function PreviewTicket(eid,tid) {

    var output  =   '';    
    $.ajax({
		type	: "POST",
		cache	: false,
		url		: "/createticket/previewtickets/",		
        data    : "tid=" + tid,
        dataType: "json",
		success : function(data) {    	          
            
            output  =   'Ticket Title: '+data.ticket_title+'<br/>'+'Ticket Quantity: '+data.ticket_quantity+'<br/>'+'Ticket Price: '+data.ticket_price+'<br/>'+'Ticket Sale Start Date: '+data.ticket_start_sale_date+'<br/>'+'Ticket Sale End Date: '+data.ticket_end_sale_date+'<br/>'+'Ticket Min Quantity: '+data.ticket_min_order+'<br/>'+'Ticket Max Quantity: '+data.ticket_max_order+'<br/>'+'Ticket Description: '+data.ticket_description+'<br/>'
            $.colorbox({html:output,fixed:true});
            
            /*
            $('#ticket_title').val(data.ticket_title);
            $('#ticket_quantity').val(data.ticket_quantity);
            $('#ticket_price').val(data.ticket_price);
            $('#ticket_start_sale_date').val(data.ticket_start_sale_date);
            $('#ticket_end_sale_date').val(data.ticket_end_sale_date);
            $('#ticket_min_order').val(data.ticket_min_order);
            $('#ticket_max_order').val(data.ticket_max_order);
            $('#ticket_description').val(data.ticket_description);   
            CKEDITOR.instances.ticket_description.setData(data.ticket_description);                                
            */
            LoadTickets (data.pid);               
            
            
		}
	});
    
    
        
    return false;
    
}

function DeleteTicket(eid,tid) {
    
    
    answer = confirm('Are you sure you want to delete this ticket type?');
    
    if(answer)
    {        
        $('#event_tickets').html("<img src='/static/images/loading-contact.gif' alt='loading...' title='loading...' />");
        $.ajax({
    		type	: "POST",
    		cache	: false,
    		url		: "/createticket/deletetickets",		
            data    : "eid="+ eid +"&tid="+ tid,
            dataType: "html",
    		success : function(data) {    			
                if(data)
                {
                    LoadTickets(data);  
                    
                }
                
    		}
    	});
        
        return false;    
        
    }
    return false;

    
    
}

function editEventLogo()
{
    //$('#event_logo_file').css('display','none');
    //$('#event_logo_fileUploader').css('display','');
    //$('#event_logo_file').html('');
    //$('#event_logo_file').uploadify({});    
    //$('#event_logo_file').uploadify();
    //$('#event_logo_file').browse();
    $('#event_logo_file').trigger('click');
    //$('#event_logo_fileUploader').trigger('click');
    //var swf = window.getElementById("event_logo_fileUploader");
    //swf.myfunction(); 
    //$('#event_logo_file').fadeOut(300).delay(100).fadeIn(300, function(){$(this).focus().trigger("click")});
    //$('#event_logo_fileUploader').fadeOut(300).delay(100).fadeIn(300, function(){$(this).focus().trigger("click")});
}

function removeEventLogo()
{
    $('#event_logo_file').css('display','none');
    $('#event_logo_fileUploader').css('display','');
    $('#event_logo_file').html('');
    
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function LoadStates(country_code)
{    
    
    $(document).ready(function() {
        
        $.ajax({
    		type	: "POST",
    		cache	: false,
    		url		: "/createevent/getstates",		
            data    : "country_code=" + country_code,
            dataType: "html",
    		success : function(data) {
    		  $('#city').val('');
              $('#divstates').html(data);
              $('select#state').selectmenu({style:'dropdown',width: 220, menuWidth:220, maxHeight: 250 });
              
                
                               
                
                
    		}
    	});
    });
	return false;
    
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(function(){
    
   		//Corner Setting for IE8
   		$("#slideshow-wrapper").corner("8px");
		$("ul#slide-title").corner("bottom 8px");	
			   
   		//Twitter Jquery Setting
		$("#twitter").getTwitter({
			userName: "Indoneztheme",
			numTweets: 1,
			loaderText: "Loading tweets...",
			slideIn: true,
			slideDuration: 750
	}); 
		//Front Testimonials Setting    
    	$('.front-testimonials ul').cycle({
			timeout: 5000, 
			fx:      'fade', 
			pager:   '#pager', 
			pause:   true,	
			cleartypeNoBg: true, 
			pauseOnPagerHover: 0
    });
		//Slideshow Setting
		$('#slide-main').cycle({
			fx:     'fade',
			speed:  'slow',
			pause:   true,
			timeout: 6000,
			cleartypeNoBg:   true,
			pager:  '#slide-title',
			pagerAnchorBuilder: function(idx, slide) { 
				// return sel string for existing anchor
				return '#slide-title li:eq(' + (idx) + ') a';
		}			
	}); 
 });        
 
//Login Colorbox
$(document).ready(function(){				
	
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $("#autofill").click(function ()
    {
        if($('#autofill').prop('checked')) {
            
            $.ajax({
        		type	: "POST",
        		cache	: false,
        		url		: "/response/memberinfo",
                dataType: "json",
        		success : function(data) {    			
                    if(data)
                    {                                                
                        var firstEmptyField = $("#registrationForm").find(":input[value='']:visible").not("button").filter(":first");                        
                        var partsArray = firstEmptyField.attr('id').split('_');
                        
                                   
                        
                        document.getElementById('attendee_'+partsArray[1]+'_'+partsArray[2]+'_first_name').value    =   data.first_name;
                        document.getElementById('attendee_'+partsArray[1]+'_'+partsArray[2]+'_last_name').value     =   data.last_name;
                        document.getElementById('attendee_'+partsArray[1]+'_'+partsArray[2]+'_email_address').value =   data.email;
                        document.getElementById('attendee_'+partsArray[1]+'_'+partsArray[2]+'_cell_phone').value    =   data.cell_phone;                        
                        
                    }
                    
        		}
        	});
            
            
            
            
        } else {
            
            var firstEmptyField = $("#registrationForm").find(":input[value='']:visible").not("button").filter(":first");                        
            var partsArray = firstEmptyField.attr('id').split('_');
            
            document.getElementById('attendee_'+partsArray[1]+'_'+partsArray[2]+'_first_name').value    =   '';
            document.getElementById('attendee_'+partsArray[1]+'_'+partsArray[2]+'_last_name').value     =   '';
            document.getElementById('attendee_'+partsArray[1]+'_'+partsArray[2]+'_email_address').value =   '';
            document.getElementById('attendee_'+partsArray[1]+'_'+partsArray[2]+'_cell_phone').value    =   '';
             
            
            
            
            // something else when not
        }     
        
                             
        
    });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    $(".login").colorbox(
    {
        width:"400px" ,            
        onComplete:function()
        {
                         
            $("#submit_login").click(function ()
            {
                if($('#user_email').val()!="" && $('#user_password').val() != "")
                {
                    var dataString = $('#login').serializeArray();                      
                  
                      $.ajax({
                		type	: "POST",
                		cache	: false,
                		url		: "/login/process",		
                        data    : dataString,
                        dataType: "json",
                		success : function(data)
                        {   			
                            
                            if(!data.error)
                            {
                                self.parent.location = "/index";

                                //self.parent.location.reload();

                                //document.window.reload();
                                
                            }
                            else
                            {
                                alert(data.message);
                                
                            }                                
                		}
                	  });
                    
                }
                else
                {
                    alert('Please provide email and password');
                    return false;                       
                    
                }
                                     
            return false;       
            });
            
            $("#submit_register").click(function ()
            {
                document.location.href = '/signup'
                return false;       
            });
            
            $("#submit_forgotpassword").click(function ()
            {
                document.location.href = '/forgotpassword/'
                return false;       
            });                
        
        }
        
     });
     
    $("#submit_signup").click(function ()
    {
        
        if($('#user_first_name').val()!="" && $('#user_last_name').val()!="" &&  $('#user_email').val()!="" && $('#user_password').val() != "")
        {
            var dataString = $('#signup').serializeArray();                      
          
              $.ajax({
        		type	: "POST",
        		cache	: false,
        		url		: "/signup/process",		
                data    : dataString,
                dataType: "json",
        		success : function(data)
                {	
                    
                    if(!data.error)
                    {
                        
                        document.location.href = "/signup/thanks";                
                        
                    }
                    else
                    {
                        alert(data.message);
                        
                    }                                
        		}
        	  });
            
        }
        else
        {
            alert('Please provide all required fields');
            return false;                       
            
        }
                             
    return false;       
    });
    
    $("#submit_changepassword").click(function ()
    {
        if($('#oldpassword').val()!="" && $('#newpassword1').val()!="" && $('#newpassword2').val()!="")
        {
            var dataString = $('#changepasswordform').serializeArray();                      
          
              $.ajax({
        		type	: "POST",
        		cache	: false,
        		url		: "/password/process",		
                data    : dataString,
                dataType: "json",
        		success : function(response)
                {	                   
                    if(!response.error)
                    {
                        $.colorbox({html:response.message,fixed:true});
                        setTimeout(function() {
                          window.location.href = "/password/";
                        }, 5000);       
                        
                        
                    }
                    else
                    {
                        $.colorbox({html:response.message,fixed:true});            
                        
                    }
                                        
        		}
        	  });
            
        }
        else
        {
            alert('Please provide all form fields');
            return false;                       
            
        }
        //$('#changepasswordform').submit();
        
                             
        return false;       
    });
    
    $("#submit_forgotpassword").click(function ()
    {
        
        if($('#user_email').val()!="")
        {
            var dataString = $('#forgotpassword').serializeArray();                      
          
              $.ajax({
        		type	: "POST",
        		cache	: false,
        		url		: "/forgotpassword/process",		
                data    : dataString,
                dataType: "json",
        		success : function(data)
                {	
                    
                    if(!data.error)
                    {
                        
                        document.location.href = "/forgotpassword/thanks";                
                        
                    }
                    else
                    {
                        alert(data.message);
                        
                    }                                
        		}
        	  });
            
        }
        else
        {
            alert('Please provide your email address');
            return false;                       
            
        }
                             
    return false;       
    });
    
    $("#submit_invite").click(function ()
    {
        
        if($('#name').val()!="" && $('#email').val()!="" &&  $('#message').val()!="" )
        {
            var dataString = $('#invite').serializeArray();                      
          
              $.ajax({
        		type	: "POST",
        		cache	: false,
        		url		: "/invite/process",		
                data    : dataString,
                dataType: "json",
        		success : function(data)
                {	
                    
                    if(!data.error)
                    {
                        
                        document.location.href = "/invite/thanks";                
                        
                    }
                    else
                    {
                        alert(data.message);
                        
                    }                                
        		}
        	  });
            
        }
        else
        {
            alert('Please provide all required fields');
            return false;                       
            
        }
                             
    return false;       
    });
    
    $("#save_event").click(function ()
    {
        $('#formElem').submit();

        
                             
        return false;       
    });
    
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    $('#event_logo_file').uploadify({
      
    	'uploader'  : 'assets/js/jqueryuploadify/uploadify.swf',
    
    	'script'    : 'assets/js/jqueryuploadify/uploadify.php',
    
    	'cancelImg' : 'assets/js/jqueryuploadify/cancel.png',       
    
    	'folder'    : 'event_logos/',        
                
        'wmode'     : 'transparent',
                
    	
    	'fileExt'   : '*.jpg;*.jpeg;*.gif;*.png;*.bmp;',	
    	
    	'fileDesc'  : 'Image Files',
    	
    	'auto'      : true,
    	
    	'multi'     : false,
               
    	
    	'removeCompleted' : false,
    	
        'onOpen'      : function(event,ID,fileObj) {
            $("#event_logo_placeholder").css("display","");
            $("#event_logo_placeholder").html("<img src='/static/images/loading-contact.gif />");
            
        },
        
        'onProgress'  : function(event,ID,fileObj,data) {
        
            $("#event_logo_placeholder").css("display","");
            $("#event_logo_placeholder").html("<img src='/static/images/loading-contact.gif />");
            return false;
        },
    
    	'onComplete'  : function(event, ID, fileObj, response, data ) {    	
    	
    	file	=	 fileObj.name;
       
        $("#event_logo_placeholder").css("display","");
        $("#event_logo_placeholder").html("<img src='event_logos/"+file+"' width='100' height='100' /><br /><input type='hidden' name='event_logo' value='"+file+"' />");
        //$("#event_logo").css("width","100");
        //$("#event_logo").css("height","100");
        //$("#event_logo").css("float","left");
        //$("#event_logo").css("padding","0px");
        
        
        //$("#event_logo_fileUploader").css("display","none");
            							
    	//document.getElementById('submission_main_images').value = files;
    	
    	//document.getElementById('main').src = "js/jqueryuploadify/files/"+fileObj.name;   	
    	},
    	
    	'onCancel'    : function(event,ID,fileObj,data) {
    	    alert('ass');
    		//document.getElementById('submission_main_images').value = '';
            $("#event_logo").html("");
            //$("#event_logo_fileUploader").css("display","");
    						
    	}
    	
    });
    
    $('#event_logo_file').click(function() {
        /*
        if($('#event_logo_fileUploader').css('display')=="none")
        {
            $('#event_logo_file').css('display','none');
            $('#event_logo_fileUploader').css('display','');
        }
        else if($('#event_logo_fileUploader').css('display')=="")
        {
            $('#event_logo_file').css('display','');
            $('#event_logo_fileUploader').css('display','none');
        }
        $('#event_logo_file').uploadifyCancel($('.uploadifyQueueItem').first().attr('id').replace('event_logo_file',''))
        //$('#event_logo_file').uploadifyCancel($('.uploadifyQueueItem').first().attr('id').replace('event_logo_file',''))
        //$('#event_logo_file').uploadify({});    
        */    
    });
    
    
    
    $('#select_logo_right').hover(
        function() {        
        
            if($('#event_logo_file').css('display')=="block")
            { 
                
                $(this).append(
                '<div class="toolTipWrapper" style="padding:0px;margin:0px; width:20px;">'        
                	+ '<div class="toolTipMid">'
                	+ '<img src="/static/images/edit_event_logo.png" onclick="javascript:editEventLogo()"/> <br /><br /><img src="/static/images/delete_event_logo.png" onclick="javascript:removeEventLogo()"/>'	
                	+ '</div>'        	
                + '</div>'
                );
                
                $(".toolTipWrapper").css({
                  position:'relative',
                  top: -95  ,
                  left: 110
                });
                
                        
                //this.width = $(this).width();
                //$(this).find('.toolTipWrapper').css({left:this.width-22})
                $('.toolTipWrapper').fadeIn(300);        
                    
            }          
        },
        function() {
            
            $('.toolTipWrapper').fadeOut(100);
    		$('.toolTipWrapper').remove();   		

        }
    );
    
    
    
    
    $('#event_custom_theme_file').uploadify({
      
    	'uploader'  : 'assets/js/jqueryuploadify/uploadify.swf',
    
    	'script'    : 'assets/js/jqueryuploadify/uploadify.php',
    
    	'cancelImg' : 'assets/js/jqueryuploadify/cancel.png',       
    
    	'folder'    : 'event_logos/',        
                
        'wmode'     : 'transparent',
                
    	
    	'fileExt'   : '*.jpg;*.jpeg;*.gif;*.png;*.bmp;',	
    	
    	'fileDesc'  : 'Image Files',
    	
    	'auto'      : true,
    	
    	'multi'     : false,
               
    	
    	'removeCompleted' : false,
    	
    	'onComplete'  : function(event, ID, fileObj, response, data ) {    	
    	
    	file	=	 fileObj.name;       
       
        $("#event_custom_theme").addClass('miniColors-trigger');
        $("#event_custom_theme").html("<img src='event_logos/"+file+"' width='40' height='26' /><br /><input type='hidden' name='event_logo' value='"+file+"' />");
        
        $("#event_custom_theme img").css({            
            marginLeft:  10 ,
            marginTop:  5 
                
            
        });
        
        $("#event_custom_theme").append(
        '<div class="toolTipWrapper">'        
        	+ '<div class="toolTipMid">'
        	+ '<img src="/static/images/checked.png"/>'	
        	+ '</div>'        	
        + '</div>'
        );
        
        $(".toolTipWrapper").css({
          position:'relative',
          top: -30  ,
          left: 15
        });
        
        
           	
    	},
    	
    	'onCancel'    : function(event,ID,fileObj,data) {    	
    		
            $("#event_custom_theme_file").html("");            
    						
    	}
    	
    });
    
    
    $('#organization_logo_file').uploadify({
      
    	'uploader'  : '/assets/js/jqueryuploadify/uploadify.swf',
    
    	'script'    : '/assets/js/jqueryuploadify/uploadify.php',
    
    	'cancelImg' : '/assets/js/jqueryuploadify/cancel.png',       
    
    	'folder'    : 'organization_logos/',        
                
        'wmode'     : 'transparent',
                
    	
    	'fileExt'   : '*.jpg;*.jpeg;*.gif;*.png;*.bmp;',	
    	
    	'fileDesc'  : 'Image Files',
    	
    	'auto'      : true,
    	
    	'multi'     : false,
               
    	
    	'removeCompleted' : false,
    	
        'onOpen'      : function(event,ID,fileObj) {            
            $('#organization_logo').html("<img src='/static/images/loading-contact.gif' alt='loading...' title='loading...' />");
            
        }, 
       
    	
    	'onComplete'  : function(event, ID, fileObj, response, data ) {    	
    	
    	file	=	 fileObj.name;
        
        $("#organization_logo").html("<img src='organization_logos/"+file+"' width='100' height='100'/><br /><input type='hidden' name='event_logo' value='"+file+"' /> ");
        //$("#organization_logo").css("width","100");
        //$("#organization_logo").css("height","100");
        //$("#organization_logo").css("float","left");
        //$("#organization_logo").css("padding","0px");
          	
    	},
            	
    	'onCancel'    : function(event,ID,fileObj,data) {    		
            $("#organization_logo").html("");   						
    	}
    	
    });
    
    
    
    $("#start_date").datepicker({
		minDate: new Date(),        
        dateFormat: 'yy-mm-dd',
        onSelect: function(dateText) {
            
            var min = $(this).datepicker('getDate') || new Date(); // Selected date or today if none           
            min.setDate(min.getDate() + 1); // Add one date
            $('#end_date').datepicker('option', {minDate: min});
            
        }
	}); 
    
    
    $('#start_date_button_trigger').click(function() {
        $('#start_date').datepicker('show');            
    });
        
    $('#start_time').timepicker({
        showPeriodLabels: false        
    });
    
    $('#start_time_button_trigger').click(function() {
        $('#start_time').timepicker('show');            
    });
    
    $("#end_date").datepicker({
        //minDate: new Date(2013, 1 - 1, 1),
        //minDate: new Date($('#start_date').val()),
        minDate: '+1d',
        dateFormat: 'yy-mm-dd'
    });
    
    $('#end_date_button_trigger').click(function() {
        $('#end_date').datepicker('show');            
    });
        
    $('#end_time').timepicker({        
        showPeriodLabels: false
    });    
    
    $('#end_time_button_trigger').click(function() {
        $('#end_time').timepicker('show');            
    });
    
    
    $("#ticket_start_sale_date").datepicker({minDate: new Date(),  dateFormat: 'yy-mm-dd' });
    
    //$('#ticket_start_sale_time').timepicker({});
    $('#ticket_start_sale_time').blur(function() {
        var $el = $(this);
        var theDate = Date.parse($el.val());        
        if(theDate) {
            $el.val(theDate.toString("HH:mm"));
        } else {
            //it didn't appear to be a valid date/time, tell the user
        }
    });
    
    $("#ticket_end_sale_date").datepicker({minDate: '+1d', dateFormat: 'yy-mm-dd' });
    
    //$('#ticket_end_sale_time').timepicker({});
    $('#ticket_end_sale_time').blur(function() {
        var $el = $(this);
        var theDate = Date.parse($el.val());        
        if(theDate) {
            $el.val(theDate.toString("HH:mm"));
        } else {
            //it didn't appear to be a valid date/time, tell the user
        }
    });
    //$('#ticket_end_sale_time').timepicker('setDate', (new Date()) )
         
    

    $("#custom_color").miniColors({		
		change: function(hex, rgb) {
			//$("#console").prepend('HEX: ' + hex + ' (RGB: ' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ')<br />');
		}		
	});
    
    $( "#outer-hover" ).hover(
		function(){
			//console.log( "mouseEnter" );
            $('.inner').show();            
		},
		function(){
			//console.log( "mouseLeave" );
            $('.inner').hide();
		}
	);
    
        
    //ACCORDION BUTTON ACTION (ON CLICK DO THE FOLLOWING)
	$('.accordionButton').click(function() {

		//REMOVE THE ON CLASS FROM ALL BUTTONS
		$('.accordionButton').removeClass('on');
		  
		//NO MATTER WHAT WE CLOSE ALL OPEN SLIDES
	 	$('.accordionContent').slideUp('normal');
   
		//IF THE NEXT SLIDE WASN'T OPEN THEN OPEN IT
		if($(this).next().is(':hidden') == true) {
			
			//ADD THE ON CLASS TO THE BUTTON
			$(this).addClass('on');
			  
			//OPEN THE SLIDE
			$(this).next().slideDown('normal');
		 } 
		  
	 });
	  
	
	/*** REMOVE IF MOUSEOVER IS NOT REQUIRED ***/
	
	//ADDS THE .OVER CLASS FROM THE STYLESHEET ON MOUSEOVER 
	$('.accordionButton').mouseover(function() {
		$(this).addClass('over');
		
	//ON MOUSEOUT REMOVE THE OVER CLASS
	}).mouseout(function() {
		$(this).removeClass('over');										
	});
	
	/*** END REMOVE IF MOUSEOVER IS NOT REQUIRED ***/
	
	
	/********************************************************************************************************************
	CLOSES ALL S ON PAGE LOAD
	********************************************************************************************************************/	
	$('.accordionContent').hide();

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    
    $('.themes').click(function() {
        
        
        if($("#theme_"+this.id).attr('class')=="")
        {
            $(".color_selected").removeClass();
            
            $(".toolTipWrapper").removeClass();
            $('.toolTipWrapper').remove();
            $('.theme_selected').removeClass();
            /*
            $('#event_style').each(function(index) {            
                //console.log( "mouseLeave" );
                $(".event_style").removeClass("event_style liselected");
                $(".event_style").removeClass("liselected");
            });
            $("#event_style").children().removeClass("event_style liselected");
            $("#event_style").children().removeClass("liselected");
            $(".event_style").removeClass("event_style liselected");
                $(".event_style").removeClass("liselected");
            */
            
            $("#theme_"+this.id).css({
              position:'relative',
              top: 0  ,
              left: 0,          
            });
            
            var position = $("#theme_"+this.id).position();       
    
            $("#theme_"+this.id).css({
              position:'relative',
              top: -55  ,
              left: 45
            });
            
            $("#theme_"+this.id).addClass("theme_selected");
            
            $("#selected_theme").val(this.id);
            
            
            
        }
        else
        {
            $('.theme_selected').removeClass();
            $("#theme_"+this.id).removeClass("theme_selected");
            
            $("#selected_theme").val('');
            
        }
       
        
        //$("img").parent("#theme_"+this.id).removeClass("event_style");                
        //$("img").parent("#theme_"+this.id).addClass("theme_selected");
        
    });
    
    $('.colors').click(function() {
        
       
        
        if($("#color_"+this.id).attr('class')=="")
        {
           $('.theme_selected').removeClass();
            
           $('.color_selected').removeClass();
           $('.toolTipWrapper').remove();
           
           $("#color_"+this.id).css({
              position:'relative',
              top: 0  ,
              left: 0,          
            });
            
            var position = $("#theme_"+this.id).position();       
    
            $("#color_"+this.id).css({
              position:'relative',
              top: -30  ,
              left: 10  ,
              width: 40 ,
              height: 40
            });
            
            
           $("#color_"+this.id).addClass("color_selected"); 
           $("#selected_color").val(this.id); 
            
        }
        else
        {
            $("#selected_color").val('');
            $("#color_"+this.id).removeClass("color_selected");
            
        }        
        
    });
    /*
    $('#event_custom_theme').click(function() {
        
       
        
        if($("#color_"+this.id).attr('class')=="")
        {
           $(this).append(
            '<div class="toolTipWrapper">'        
            	+ '<div class="toolTipMid">'
            	+ '<img src="/static/images/dustbin_bt.png" onclick="javascript:removeEventLogo()"/>'	
            	+ '</div>'        	
            + '</div>'
            );
            
            $(".toolTipWrapper").css({
              position:'relative',
              top: -95  ,
              left: 110
            });
           
           
           $('.theme_selected').removeClass();
            
           $('.color_selected').removeClass();
           
           
           $("#color_"+this.id).css({
              position:'relative',
              top: 0  ,
              left: 0,          
            });
            
            var position = $("#theme_"+this.id).position();       
    
            $("#color_"+this.id).css({
              position:'relative',
              top: -30  ,
              left: 10  ,
              width: 40 ,
              height: 40
            });
            
            
           $("#color_"+this.id).addClass("color_selected"); 
           $("#selected_color").val(this.id); 
            
        }
        else
        {
            $("#selected_color").val('');
            $("#color_"+this.id).removeClass("color_selected");
            
        }        
        
    });
    */
    
    $('.themes').hover(
      function (evt){       
        
        
        var position = $("#theme_preview_hover"+this.id).position();       

        $("#theme_preview_hover"+this.id).css({
          position:'relative',
          top: -30,
          left: position.left
        });
       
        $("#theme_preview_hover"+this.id).show();        
        
      }, 
      function (evt) {        
        
        $("#theme_preview_hover"+this.id).hide();
        
        $("#theme_preview_hover"+this.id).css({
          position:'relative',
          top: 0,
          left: 0
        });
        
        //$(".theme_preview_hover"+this.id).hide();
        //$.colorbox.close();
        //$(this).find("span:last").remove();
      }
    );
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


$("#delete_events, #dustbin p > a").click(function() {
    
    var answer = confirm("Are you sure you wish to delete this event?");
    
    if(answer == true)
    {
        var eid = $(this).attr("data");
        var dataString = 'eid='+ eid ;
        var parent = $('#myevent'+eid);
        
        $.ajax({
        type: "POST",
        url:  "/deleteevent",
        data: dataString,
        cache: false,
        
        success: function(data)
        {
            if(data)
            {
                parent.fadeOut('slow', function() {parent.remove();});
            }
            else
            {
                parent.slideUp('slow', function() {parent.remove();});
            }
        }
        });
        
        return false;
        
    }
    else
    {
        return false;
        
    }
    
    /*
    return answer // answer is a boolean
  
    if (confirm("Are you sure you wish to delete this event?")) {
    var eid = $(this).attr("data");
    var dataString = 'eid='+ eid ;
    var parent = $('#myevent'+eid);
    
    $.ajax({
    type: "POST",
    url:  "/deleteevent",
    data: dataString,
    cache: false,
    
    success: function(data)
    {
        if(data)
        {
            parent.fadeOut('slow', function() {parent.remove();});
        }
        else
        {
            parent.slideUp('slow', function() {parent.remove();});
        }
    }
    });
    
    return false;
    }
    */
});
    
$("#recover_delete_events").click(function() {
    if (confirm("Are you sure you wish to recover this event?")) {
    var eid = $(this).attr("data");
    var dataString = 'eid='+ eid ;
    var parent = $('#myevent'+eid);
    
    $.ajax({
    type: "POST",
    url:  "/deletedevents/recover",
    data: dataString,
    cache: false,
    
    success: function(data)
    {
        if(data)
        {
            parent.fadeOut('slow', function() {parent.remove();});
        }
        else
        {
            parent.slideUp('slow', function() {parent.remove();});
        }
    }
    });
    
    return false;
    }
    else
    {
        return false;
    }
});    
    
    
    
    
$(".publish_events p a ").click(function() {
    if (confirm("Are you sure you wish to publish this event?")) {
    
    var eid = $(this).attr("data");
    var dataString = 'eid='+ eid ;
    var parent = $('#myevent'+eid);
    
    $.ajax({
    type: "POST",
    url:  $(this).attr("href"),
    data: dataString,
    cache: false,
    dataType: "json",
    success: function(response)
    {   
        if(!response.error)
        {
            $.colorbox({html:response.message,fixed:true});
            setTimeout(function() {
              window.location.href = "/myevents/";
            }, 5000);


            
            
        }
        else
        {
            $.colorbox({html:response.message,fixed:true});            
            
        }
        
    }
    });
    
    return false;
    }
});        
    
    
    
$("#title").tipTip({
    content: "Please Provide Event Title",
    maxWidth: "auto",
    edgeOffset: 10
});    
$("#start_date").tipTip({
    content: "Please Provide Event Start Date",
    maxWidth: "auto",
    edgeOffset: 10
});   
$("#start_time").tipTip({
    content: "Please Provide Event Start Time<br />(example: 09:00 am, 09:00 pm, 23:00)",
    maxWidth: "auto",
    edgeOffset: 10
});
$("#end_date").tipTip({
    content: "Please Provide Event End Date",
    maxWidth: "auto",
    edgeOffset: 10
});
$("#end_time").tipTip({
    content: "Please Provide Event End Time<br />(example: 09:00 am, 09:00 pm, 23:00)",
    maxWidth: "auto",
    edgeOffset: 10
});
    	            



$("#country").tipTip({
    content: "Please Provide Event Location Country",
    maxWidth: "auto",
    edgeOffset: 10
});
$("#state").tipTip({
    content: "Please Provide Event Location State",
    maxWidth: "auto",
    edgeOffset: 10
});
$("#city").tipTip({
    content: "Please Provide Event Location City",
    maxWidth: "auto",
    edgeOffset: 10
});
$("#postal_code").tipTip({
    content: "Please Provide Event Location Postal Code",
    maxWidth: "auto",
    edgeOffset: 10
});


$("#OrganizerMenu").tipTip({
    content: "Please Event coordinator can add his different organizations and can simply select the organization to show in the frontend which organization is hosting that event. If he don’t want to select the organization, it can be left blank. If you want to add organizations, you can add them from the My Profile section under My accounts.",
    maxWidth: "auto",
    edgeOffset: 10
});
$("#CategoriesMenu").tipTip({
    content: "Please Provide Event Category",
    maxWidth: "auto",
    edgeOffset: 10
});



$("#ticket_title").tipTip({
    content: "Provide Ticket Title",
    maxWidth: "auto",
    edgeOffset: 10
});
$("#ticket_price_type").tipTip({
    content: "Provide Ticket Price Type",
    maxWidth: "auto",
    edgeOffset: 10
});
$("#ticket_price").tipTip({
    content: "Provide Ticket Price",
    maxWidth: "auto",
    edgeOffset: 10
});    
$("#ticket_quantity").tipTip({
    content: "Provide Ticket Quantity",
    maxWidth: "auto",
    edgeOffset: 10
});
$("#ticket_start_sale_date").tipTip({
    content: "Provide Ticket Sale Start Date",
    maxWidth: "auto",
    edgeOffset: 10
});
$("#ticket_end_sale_date").tipTip({
    content: "Provide Ticket Sale End Date",
    maxWidth: "auto",
    edgeOffset: 10
});

$("#ticket_min_order").tipTip({
    content: "Provide Ticket Sale Minimun Quantity",
    maxWidth: "auto",
    edgeOffset: 10
});

$("#ticket_max_order").tipTip({
    content: "Provide Ticket Sale Maximun Quantity",
    maxWidth: "auto",
    edgeOffset: 10
});

$("#ticket_description").tipTip({
    content: "Provide Ticket Description",
    maxWidth: "auto",
    edgeOffset: 10
});

$('#scrollbar1').tinyscrollbar();    
    				


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('.prview_transaction').click(function() {    
    var tid = $(this).attr("data");    
    //console.log('prview_transaction in'+tid);
    
    $.ajax({
    type: "POST",
    url:  "/transactions/transactiondetail",
    data: "tid="+tid,
    cache: false,    
    success: function(data)
    {
        if(data)
        {
            //alert(data);
            $.colorbox({html:data, scrolling: false, onOpen: function(){$.fn.colorbox.resize()}});
            //document.location.href = '/myevents/';
        }
        else
        {
            //parent.slideUp('slow', function() {parent.remove();});
        }
    }
    });
        
});

$('.prview_ordertransaction').click(function() {    
    var tid = $(this).attr("data");    
    //console.log('prview_transaction in'+tid);
    
    $.ajax({
    type: "POST",
    url:  "/transactions/ordertransactiondetail",
    data: "tid="+tid,
    cache: false,    
    success: function(data)
    {
        if(data)
        {
            //alert(data);
            $.colorbox({html:data, scrolling: false, onOpen: function(){$.fn.colorbox.resize()}});
            //document.location.href = '/myevents/';
        }
        else
        {
            //parent.slideUp('slow', function() {parent.remove();});
        }
    }
    });
        
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$('#saving-account-button').click(function() {
        
        
    var ajax_loader =   "<img src='assets/images/ajax-loader.gif' alt='loading...' />"; 
    
    $.colorbox({html:ajax_loader,fixed:true});

    
    
    $.ajax({
		type	: "POST",
		cache	: false,
		url		: "/account/process",
		data	: $('#fieldform_addressform').serializeArray(),
		success : function(response) {
		    if(!response.error)
            {
                $.colorbox({html:response.message,fixed:true});
                setTimeout(function() {
                  window.location.href = "/account/";
                }, 5000);
    
    
                
                
            }
            else
            {
                $.colorbox({html:response.message,fixed:true});            
                
            }     
            
            
		}
	});

	return false;
    
});



});

//$('#mycarousel li img').bind('click',function(e){
	
 
// Background Slide Setting    
var scrollSpeed = 50; // speed in milliseconds	
var current = 0; // set the default position	
var direction = 'h'; // set the direction
function bgscroll(){
    current -= 1;  
    $('div#glow-bg').css("backgroundPosition", (direction == 'h') ? current+"px 0" : "0 " + current+"px");   
}
 setInterval("bgscroll()", scrollSpeed);