$(function() {
	/*
	number of fieldsets
	*/
	var fieldsetCount = $('#formElem').children().length;
	
	/*
	current position of fieldset / navigation link
	*/
	var current 	= 1;
    
	/*
	sum and save the widths of each one of the fieldsets
	set the final sum as the total width of the steps element
	*/
	var stepsWidth	= 0;
    var widths 		= new Array();
	$('#steps .step').each(function(i){
        var $step 		= $(this);
		widths[i]  		= stepsWidth;
        stepsWidth	 	+= $step.width();
    });
	$('#steps').width(stepsWidth);
	
	/*
	to avoid problems in IE, focus the first input of the form
	*/
	//$('#formElem').children(':first').find(':input:first').focus();	
	
    //$('.back_buttons').hide();
	
    /*
	show the navigation bar
	*/
	$('#event_container').show();    
	
	/*
	when clicking on a navigation link 
	the form slides to the corresponding fieldset
	*/    
    
    $('#event_container ul li a,#num_wrapper ul li a').bind('click',function(e){
		var $this	= $(this);
		var prev	= current;           
        
        
        //if(validateStep(prev) > 0 )
        //{
            
            if($this.parent().attr('class') == "one" || $this.parent().attr('class')=="detail")
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
            
            
            if($this.parent().attr('class') == "two" || $this.parent().attr('class')=="date")
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
            
            if($this.parent().attr('class') == "three" || $this.parent().attr('class')=="ticket")
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
            
            if($this.parent().attr('class') == "four" || $this.parent().attr('class')=="create")
            {
                //return false;
                $(".detail_select").attr('class','detail');
                $(".one_select").attr('class','one');
                
                $(".date_select").attr('class','date');
                $(".two_select").attr('class','two');
                
                $(".ticket_select").attr('class','ticket');
                $(".three_select").attr('class','three');
                
                $(".create").attr('class','create_select');
                $(".four").attr('class','four_select');  
                
                if($('#formElem').data('errors')){
        			alert('Please correct the errors in the Form');
        			return false;
        		}
                else
                {
                    var hasError  =   false;
                    if($('#title').val()=="")
                    {                
                        hasError = true;			
                        $.colorbox({html:"Please Provide Event Title",fixed:true});
                        $('#steps').stop().animate({
                            marginLeft: '-' + widths[0] + 'px'
                        },1200,function(){
                				
                		});
                        //$(window).scrollTop(50);   
                        return false;                                 
                                    
                    }
                    
                    $("#description").val(CKEDITOR.instances.description.getData());
            
                    var dataString = $('#formElem').serializeArray();                   
                                 
                                              
                          
                    $.ajax({
                    type	: "POST",
                    cache	: false,
                    url		: "/createevent/process",		
                    data    : dataString,
                    dataType: "json",
                    success : function(data)
                    {   			
                        
                        if(!data.error)
                        {
                            
                            $(".detail_select").attr('class','detail');
                            $(".one_select").attr('class','one');
                        
                            $(".date_select").attr('class','date');
                            $(".two_select").attr('class','two');
                        
                            $(".ticket_select").attr('class','ticket');
                            $(".three_select").attr('class','three');
                        
                            $(".create").attr('class','create_select');
                            $(".four").attr('class','four_select');
                            
                            document.location.href = '/eventdetail/?id='+data.data;
                           
                            
                        }
                        else
                        {
                            alert(data.message);
                            
                        }                                
                    }
                    });
                 
        
        
        
        
        
               
        
        
                    
                }          
            }       
                                
    	    if($this.parent().attr('class') == "efour" || $this.parent().attr('class')=="edit_event")
            {
                //return false;
                $(".detail_select").attr('class','detail');
                $(".one_select").attr('class','one');
                
                $(".date_select").attr('class','date');
                $(".two_select").attr('class','two');
                
                $(".ticket_select").attr('class','ticket');
                $(".three_select").attr('class','three');
                
                $(".edit_event").attr('class','edit_event_select');
                $(".efour").attr('class','efour_select');  
                
                if($('#formElem').data('errors')){
        			alert('Please correct the errors in the Form');
        			return false;
        		}
                else
                {
                    var hasError  =   false;
                    if($('#title').val()=="")
                    {                
                        hasError = true;			
                        $.colorbox({html:"Please Provide Event Title",fixed:true});
                        $('#steps').stop().animate({
                            marginLeft: '-' + widths[0] + 'px'
                        },1200,function(){
                				
                		});
                        //$(window).scrollTop(50);   
                        return false;                                 
                                    
                    }
                    
                    $("#description").val(CKEDITOR.instances.description.getData());
            
                    var dataString = $('#formElem').serializeArray();        
                    
                    $.ajax({
                    type	: "POST",
                    cache	: false,
                    url		: "/editevent/process",		
                    data    : dataString,
                    dataType: "json",
                    success : function(data)
                    {   			
                        
                        if(!data.error)
                        {
                            
                            $(".detail_select").attr('class','detail');
                            $(".one_select").attr('class','one');
                        
                            $(".date_select").attr('class','date');
                            $(".two_select").attr('class','two');
                        
                            $(".ticket_select").attr('class','ticket');
                            $(".three_select").attr('class','three');
                        
                            $(".create").attr('class','create_select');
                            $(".four").attr('class','four_select');
                            
                            document.location.href = '/eventdetail/?id='+data.data;
                            
                            
                        }
                        else
                        {
                            alert(data.message);
                            
                        }                                
                    }
                    });      
        
                    
                }          
            }   
    		/*
    		we store the position of the link
    		in the current variable	
    		*/
    		current = $this.parent().index() + 1;
    		/*
    		animate / slide to the next or to the corresponding
    		fieldset. The order of the links in the navigation
    		is the order of the fieldsets.
    		Also, after sliding, we trigger the focus on the first 
    		input element of the new fieldset
    		If we clicked on the last link (confirmation), then we validate
    		all the fieldsets, otherwise we validate the previous one
    		before the form slided
    		*/        
            
            
                $('#steps').stop().animate({
                    marginLeft: '-' + widths[current-1] + 'px'
                },1200,function(){
                    
        		});
                //$(window).scrollTop(50);
                e.preventDefault();
        //}               
                      
                                                
        
    });
	
	/*
	clicking on the tab (on the last input of each fieldset), makes the form
	slide to the next step
	*/
	$('#formElem > fieldset').each(function(){
		var $fieldset = $(this);
		$fieldset.children(':last').find(':input').keydown(function(e){
			if (e.which == 9){
				$('#navigation li:nth-child(' + (parseInt(current)+1) + ') a').click();
				/* force the blur for validation */
				$(this).blur();
				e.preventDefault();
			}
		});
	});
	   
    
    
	/*
	validates errors on all the fieldsets
	records if the Form has errors in $('#formElem').data()
	*/
	function validateSteps(){
		var FormErrors = false;
		for(var i = 1; i < fieldsetCount; ++i){
			var error = validateStep(i);
			if(error == -1)
				FormErrors = true;
		}
		$('#formElem').data('errors',FormErrors);	
	}
	
	/*
	validates one fieldset
	and returns -1 if errors found, or 1 if not
	*/
	function validateStep(step){
		if(step == fieldsetCount) return;
		
		var error = 1;
		var hasError = false;    
        
        if(step==1)
        {
            if($('#title').val()=="")
            {                
                hasError = true;
				//$('#title').css('background-color','#FFEDEF');
                //alert('Please Provide Event Title');
                $.colorbox({html:"Please Provide Event Title",fixed:true});

                return false;
            }
            
            if($('#event_logo').val()=="")
            {                
                hasError = true;
				//$('#title').css('background-color','#FFEDEF');
                //alert('Please Provide Event Logo');
                $.colorbox({html:"Please Provide Event Logo",fixed:true});
                return false;
            }    
            
        }
        if(step==3)
        {
            if($('#start_date').val()=="")
            {
                hasError = true;
				//$('#title').css('background-color','#FFEDEF');
                //alert('Please Provide Event Start Date');
                $.colorbox({html:"Please Provide Start Date",fixed:true});
                return false;
            }
            
            if($('#end_date').val()=="")
            {
                hasError = true;
				//$('#title').css('background-color','#FFEDEF');
                //alert('Please Provide Event End Date');
                $.colorbox({html:"Please Provide Event End Date",fixed:true});
                return false;
            }
            
            if($('#country').val()=="")
            {
                hasError = true;
				//$('#title').css('background-color','#FFEDEF');
                //alert('Please Provide Event Country');
                $.colorbox({html:"Please Provide Event Country",fixed:true});
                return false;
            }
            if($('#category').val()=="")
            {
                hasError = true;
				//$('#title').css('background-color','#FFEDEF');
                //alert('Please Provide Event Category');
                $.colorbox({html:"Please Provide Event Category",fixed:true});
                return false;
            }            
            
        }
        if(step==5)
        {
            
            if($('#event_tickets').html()=="")
            {
                hasError = true;
				//$('#title').css('background-color','#FFEDEF');
                //alert('Please Create atleast one ticket');
                $.colorbox({html:"Please Create atleast one ticket",fixed:true});
                return false;
            }    
            
        }
        if(step==7)
        {
             
            
        }        
        
        if(hasError){
			error = -1;
			valclass = 'error';
		}
        
        return error;
        
	}
	
	/*
	if there are errors don't allow the user to submit
	*/
	$('#create_event').bind('click',function(){
	    
		var hasError  =   false;
        if($('#title').val()=="")
        {                
            hasError = true;			
            $.colorbox({html:"Please Provide Event Title",fixed:true});
            $('#steps').stop().animate({
                marginLeft: '-' + widths[0] + 'px'
            },1200,function(){
    				
    		});
            //$(window).scrollTop(50);   
            return false;
                     
                        
        }       
        
        
            $("#description").val(CKEDITOR.instances.description.getData());
            
            var dataString = $('#formElem').serializeArray(); 
                                 
                  
            $.ajax({
            type	: "POST",
            cache	: false,
            url		: "/createevent/process",		
            data    : dataString,
            dataType: "json",
            success : function(data)
            {   			
                
                if(!data.error)
                {
                    
                    $(".detail_select").attr('class','detail');
                    $(".one_select").attr('class','one');
                
                    $(".date_select").attr('class','date');
                    $(".two_select").attr('class','two');
                
                    $(".ticket_select").attr('class','ticket');
                    $(".three_select").attr('class','three');
                
                    $(".create").attr('class','create_select');
                    $(".four").attr('class','four_select');
                    
                    document.location.href = '/eventdetail/?id='+data.data;                    
                    
                }
                else
                {
                    alert(data.message);
                    
                }                                
            }
            });
            
        
	});
    
    $('#edit_event').bind('click',function(){
	    
		if($('#formElem').data('errors')){
			alert('Please correct the errors in the Form');
			return false;
		}
        else
        {
            //$('#formElem').submit();
                        
            $("#description").val(CKEDITOR.instances.description.getData());
            
            var dataString = $('#formElem').serializeArray();        
            
            $.ajax({
            type	: "POST",
            cache	: false,
            url		: "/editevent/process",		
            data    : dataString,
            dataType: "json",
            success : function(data)
            {   			
                
                if(!data.error)
                {
                    
                    $(".detail_select").attr('class','detail');
                    $(".one_select").attr('class','one');
                
                    $(".date_select").attr('class','date');
                    $(".two_select").attr('class','two');
                
                    $(".ticket_select").attr('class','ticket');
                    $(".three_select").attr('class','three');
                
                    $(".create").attr('class','create_select');
                    $(".four").attr('class','four_select');
                    
                    document.location.href = '/eventdetail/?id='+data.data;
                    
                    
                }
                else
                {
                    alert(data.message);
                    
                }                                
            }
            });
            
        }        
       
	});
    
    
    $('#cancel_event').bind('click',function(){
	    document.location.href = '/myevents/';
		
	});
});