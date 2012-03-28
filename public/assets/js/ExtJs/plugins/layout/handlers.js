///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var sel;
var coid;

var EventCategoriesStore;
var EventCategoriesListing;
var AddEventCategoriesForm
var AddEventCategoriesWindow;
var EditEventCategoriesForm
var EditEventCategoriesWindow;


var EventsStore;
var EventsListing;
var AddEventsForm
var AddEventsWindow;
var EditEventsForm
var EditEventsWindow;

var EventTicketsStore;
var EventTicketsListing;
var AddEventTicketsForm
var AddEventTicketsWindow;
var EditEventTicketsForm
var EditEventTicketsWindow;



var EventAttendeesStore;
var EventAttendeesListing;
var EventAttendeesListingWindow;


var MembershipPlansStore;
var MembershipPlansListing;
var AddMembershipPlansForm
var AddMembershipPlansWindow;
var EditMembershipPlansForm
var EditMembershipPlansWindow;

var CoordinatorsStore;
var CoordinatorsListing;
var AddCoordinatorsForm
var AddCoordinatorsWindow;
var EditCoordinatorsForm
var EditCoordinatorsWindow;

var OrgnizationsStore;
var OrgnizationsListing;
var AddOrgnizationForm
var AddOrgnizationWindow;
var EditOrgnizationForm
var EditOrgnizationWindow;

var SubCoordinatorsStore;
var SubCoordinatorsListing;
var AddSubCoordinatorForm
var AddSubCoordinatorWindow;
var EditSubCoordinatorForm
var EditSubCoordinatorWindow;


var MembersStore;
var MembersListing;
var AddMemberForm
var AddMemberWindow;
var EditMemberForm
var EditMemberWindow;


var BillingTransactionsListing;
var BillingTransactionsStore

var BillingInvoicesListing;
var BillingInvoicesStore

var BillingMembershipsListing;
var BillingMembershipsStore
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showEventCategoriesListing()
{
	if (!EventCategoriesListing)
	{		
		EventCategoriesStore = Ext.create('Ext.data.Store', {
			model        :   'EventCategoriesModel',
			autoLoad     :   true,
			autoSync     :   true,
			proxy: {
				type       :   'ajax',
				api: {
					read   :   '/admin/restfull/eventcategoriesview',
					create :   '/admin/restfull/eventcategoriescreate',
					update :   '/admin/restfull/eventcategoriesupdate',
					destroy:   '/admin/restfull/eventcategoriesdestroy'
				},
				reader: {
					type   : 'json',
					successProperty: 'success',
					root   : 'data',
					messageProperty: 'message'
				},
				writer: {
					type: 'json',
					writeAllFields: false,
					root: 'data'
				},
				listeners: {
					exception: function(proxy, response, operation){
						Ext.MessageBox.show({
							title: 'REMOTE EXCEPTION',
							msg: operation.getError(),
							icon: Ext.MessageBox.ERROR,
							buttons: Ext.Msg.OK
						});
					}
				}
			},
			listeners: {
				write: function(proxy, operation){
					if (operation.action == 'destroy') {
						//Ext.getCmp('centertabs').child('#form').setActiveRecord(null);
					}
					Ext.example.msg(operation.action, operation.resultSet.message);
				}
			}
		});      
        
       if(Ext.getCmp('eventcategoriesgrid'))
       {
            Ext.getCmp('centertabs').setActiveTab('eventcategoriesgrid');
        
       }
       else
       {
            Ext.getCmp('centertabs').add({		  
                xtype     : 'eventcategoriesgrid',
                itemId    : 'eventcategoriesgrid',
                id        : 'eventcategoriesgrid',
                closable  : true,
                title     : 'Event Categories List',
                flex      : 1,
                store     : EventCategoriesStore,                  
                listeners : {
                  selectionchange: function(selModel, selected) {
                	  //Ext.getCmp('centertabs').child('#form').setActiveRecord(selected[0] || null);
                  }
                }
            }).show(); //adds to original content but does not replace it
            Ext.getCmp('centertabs').setActiveTab('eventcategoriesgrid');
        
       }  
        
       Ext.getCmp('centertabs').doLayout();        
	}   	
}


function showAddEventCategories()
{
    AddEventCategoriesWindow = new Ext.Window({
        title       :   'Add Event Categories',           
        autoWidth   :   true, 
        autoHeight  :   true,
        closable    :   true,        
        closeAction :   'hide',
        layout      :   'fit',
        border      :   false,
        resizable   :   true,
        modal       :   true,   
        items       :   [AddEventCategoriesForm]
    });
               
    
    AddEventCategoriesWindow.show();
}

function showEditEventCategories()
{
    EditEventCategoriesWindow = new Ext.Window({
        title       :   'Edit Event Categories',    
        autoWidth   :   true, 
        autoHeight  :   true,
        closable    :   true,        
        closeAction :   'hide',
        layout      :   'fit',
        border      :   false,
        resizable   :   true,
        modal       :   true,  
        items       :   [EditEventCategoriesForm]
    }); 
    
    EditEventCategoriesWindow.show(); 
    
    
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showEventsListing()
{
	if (!EventsListing)
	{		
		EventsStore = Ext.create('Ext.data.Store', {
			model: 'EventsModel',
			autoLoad: true,
			autoSync: true,
			proxy: {
				type: 'ajax',
				api: {
					read:      '/admin/restfull/eventsview',
					create:    '/admin/restfull/eventscreate',
					update:    '/admin/restfull/eventsupdate',
					destroy:   '/admin/restfull/eventsdestroy'
				},
				reader: {
					type: 'json',
					successProperty: 'success',
					root: 'data',
					messageProperty: 'message'
				},
				writer: {
					type: 'json',
					writeAllFields: false,
					root: 'data'
				},
				listeners: {
					exception: function(proxy, response, operation){
						Ext.MessageBox.show({
							title: 'REMOTE EXCEPTION',
							msg: operation.getError(),
							icon: Ext.MessageBox.ERROR,
							buttons: Ext.Msg.OK
						});
					}
				}
			},
			listeners: {
				write: function(proxy, operation){
					if (operation.action == 'destroy') {
						//Ext.getCmp('centertabs').child('#form').setActiveRecord(null);
					}
					Ext.example.msg(operation.action, operation.resultSet.message);
				}
			}
		});       
       
       if(Ext.getCmp('eventsgrid'))
       {
            Ext.getCmp('centertabs').setActiveTab('eventsgrid');
        
       }
       else
       {
            Ext.getCmp('centertabs').add({		  
                xtype     : 'eventsgrid',
                itemId    : 'eventsgrid',
                id        : 'eventsgrid',
                closable  : true,
                title     : 'Events List',
                flex      : 1,
                store     : EventsStore,                  
                listeners : {
                  selectionchange: function(selModel, selected) {
                	  //Ext.getCmp('centertabs').child('#form').setActiveRecord(selected[0] || null);
                  }
                }
            }).show(); //adds to original content but does not replace it
            Ext.getCmp('centertabs').setActiveTab('eventsgrid');
        
       }
             
       Ext.getCmp('centertabs').doLayout();               
               
	}   	
}


function showAddEvents()
{
    AddEventsWindow = new Ext.Window({
        title       :   'Add Event',        
        width       :   600,
        closable    :   true,        
        closeAction :   'hide',
        layout      :   'fit',
        border      :   false,
        resizable   :   true,
        modal       :   true, 
        items       :   [AddEventsForm]
    });
               
    
    AddEventsWindow.show();
}

function showEditEvents()
{
    EditEventsWindow = new Ext.Window({
        title       :   'Edit Event',
        width       :   600,
        closable    :   true,        
        closeAction :   'hide',
        layout      :   'fit',
        border      :   false,
        resizable   :   true,
        modal       :   true, 
        items       :   [EditEventsForm]
    }); 
    
    EditEventsWindow.show(); 
    
    
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showMembershipPlansListing()
{
	if (!MembershipPlansListing)
	{		
		var MembershipPlansStore = Ext.create('Ext.data.Store', {
            model       :   'MembershipPlansModel',
            autoLoad    :   true,
            autoSync    :   true,
            proxy: {
                type: 'ajax',
                api: {
                    read:       '/admin/restfull/membershipplansview',
                    create:     '/admin/restfull/membershipplanscreate',
                    update:     '/admin/restfull/membershipplansupdate',
                    destroy:    '/admin/restfull/membershipplansdestroy'
                },
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'data',
                    messageProperty: 'message'
                },
                writer: {
                    type: 'json',
                    writeAllFields: false,
                    root: 'data'
                },
                listeners: {
                    exception: function(proxy, response, operation){
                        Ext.MessageBox.show({
                            title: 'REMOTE EXCEPTION',
                            msg: operation.getError(),
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            },
            listeners: {
                write: function(proxy, operation){
                    
                    if (operation.action == 'destroy') {
                        //Ext.getCmp('centertabs').child('#form').setActiveRecord(null);
                    }
                    Ext.example.msg(operation.action, operation.resultSet.message);
                }
            }
        });       
        

        if(Ext.getCmp('MembershipPlansgrid'))
        {
            Ext.getCmp('centertabs').setActiveTab('MembershipPlansgrid');
        
        }
        else
        {
            Ext.getCmp('centertabs').add({		  
                xtype       : 'MembershipPlansgrid',
                itemId      : 'MembershipPlansgrid',
                id          : 'MembershipPlansgrid',
                closable    : true,
                title       : 'MembershipPlans List',
                flex        : 1,
                store       : MembershipPlansStore,                  
                listeners   : {
                  selectionchange: function(selModel, selected) {
                	  //Ext.getCmp('centertabs').child('#form').setActiveRecord(selected[0] || null);
                  }
                }
            }).show(); //adds to original content but does not replace it
            Ext.getCmp('centertabs').setActiveTab('MembershipPlansgrid');
        
        }  
        
        Ext.getCmp('centertabs').doLayout();       
            
               
	}   	
}

function showAddMembershipPlans()
{
    AddMembershipPlansWindow = new Ext.Window({
        title       :   'Add Membership Plan',    
        autoWidth   :   true, 
        autoHeight  :   true,
        closable    :   true,        
        closeAction :   'hide',
        layout      :   'fit',
        border      :   false,
        resizable   :   true,
        modal       :   true,    
        items: [AddMembershipPlansForm]
    });               
    
    AddMembershipPlansWindow.show();
}

function showEditMembershipPlans()
{
    EditMembershipPlansWindow = new Ext.Window({
        title       :   'Edit Membership Plan',    
        autoWidth   :   true, 
        autoHeight  :   true,
        closable    :   true,        
        closeAction :   'hide',
        layout      :   'fit',
        border      :   false,
        resizable   :   true,
        modal       :   true,   
        items: [EditMembershipPlansForm]
    }); 
    
    EditMembershipPlansWindow.show(); 
    
    
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showCoordinatorsListing()
{
	if (!CoordinatorsListing)
	{		
		CoordinatorsStore = Ext.create('Ext.data.Store', {
            model: 'CoordinatorsModel',
            autoLoad: true,
            autoSync: true,
            proxy: {
                type: 'ajax',
                api: {
                    read:       '/admin/restfull/coordinatorsview',
                    create:     '/admin/restfull/coordinatorscreate',
                    update:     '/admin/restfull/coordinatorsupdate',
                    destroy:    '/admin/restfull/coordinatorsdestroy'
                },
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'data',
                    messageProperty: 'message'
                },
                writer: {
                    type: 'json',
                    writeAllFields: false,
                    root: 'data'
                },
                listeners: {
                    exception: function(proxy, response, operation){
                        Ext.MessageBox.show({
                            title: 'REMOTE EXCEPTION',
                            msg: operation.getError(),
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            },
            listeners: {
                write: function(proxy, operation){
                    
                    if (operation.action == 'destroy') {
                        //Ext.getCmp('centertabs').child('#form').setActiveRecord(null);
                    }
                    Ext.example.msg(operation.action, operation.resultSet.message);
                }
            }
        });       
        
		if(Ext.getCmp('coordinatorsgrid'))
        {
            Ext.getCmp('centertabs').setActiveTab('coordinatorsgrid');
        
        }
        else
        {
            Ext.getCmp('centertabs').add({		  
                xtype: 'coordinatorsgrid',
                itemId: 'coordinatorsgrid',
                id: 'coordinatorsgrid',
                closable: true,
                title: 'Coordinators List',
                flex: 1,
                store: CoordinatorsStore,                  
                listeners: {
                  selectionchange: function(selModel, selected) {
                	  //Ext.getCmp('centertabs').child('#form').setActiveRecord(selected[0] || null);
                  }
                }
            }).show(); //adds to original content but does not replace it
            Ext.getCmp('centertabs').setActiveTab('coordinatorsgrid');
        
        }  
        
        Ext.getCmp('centertabs').doLayout();          
             
	}   	
}
function showAddCoordinator()
{
    AddCoordinatorsWindow = new Ext.Window({
        title       :   'Add Coordinator',    
        autoWidth   :   true, 
        autoHeight  :   true,
        closable    :   true,        
        closeAction :   'hide',
        layout      :   'fit',
        border      :   false,
        resizable   :   true,
        modal       :   true,   
        items       :   [AddCoordinatorsForm]
    });               
    
    AddCoordinatorsWindow.show();
}

function showEditCoordinator()
{
    EditCoordinatorsWindow = new Ext.Window({
        title       :   'Edit Coordinator',    
        autoWidth   :   true, 
        autoHeight  :   true,
        closable    :   true,        
        closeAction :   'hide',
        layout      :   'fit',
        border      :   false,
        resizable   :   true,
        modal       :   true,   
        items       :   [EditCoordinatorsForm]
    }); 
    
    EditCoordinatorsWindow.show(); 
    
    
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showOrgnizationsListing(coid)
{

    if (!OrgnizationsListing)
	{		
		OrgnizationsStore = Ext.create('Ext.data.Store', {
            model: 'OrgnizationsModel',
            autoLoad: true,
            autoSync: true,
            proxy: {
                type: 'ajax',
                api: {
                    read:       '/admin/restfull/organizationsview/?coid='+coid,
                    create:     '/admin/restfull/organizationscreate/?coid='+coid,
                    update:     '/admin/restfull/organizationsupdate/?coid='+coid,
                    destroy:    '/admin/restfull/organizationsdestroy/?coid='+coid
                },
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'data',
                    messageProperty: 'message'
                },
                writer: {
                    type: 'json',
                    writeAllFields: false,
                    root: 'data'
                },
                listeners: {
                    exception: function(proxy, response, operation){
                        Ext.MessageBox.show({
                            title: 'REMOTE EXCEPTION',
                            msg: operation.getError(),
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            },
            listeners: {
                write: function(proxy, operation){
                    
                    if (operation.action == 'destroy') {
                        //Ext.getCmp('centertabs').child('#form').setActiveRecord(null);
                    }
                    Ext.example.msg(operation.action, operation.resultSet.message);
                }
            }
        });       
        
		    
    var OrgnizationsListingTabs = new Ext.TabPanel({
        id: 'orgnizationscentertabs',
        region:'center',
        activeTab:0,
        margins: '5 5 5 5',
        resizeTabs:true, // turn on tab resizing
        minTabWidth: 115,
        items: [{
              itemId: 'grid',
			  xtype: 'organizationsgrid',
			  title: 'Orgnizations List',
			  flex: 1,
              closable: true,
			  store: OrgnizationsStore,
			  listeners: {
				  selectionchange: function(selModel, selected) {
					  //Ext.getCmp('centertabs').child('#form').setActiveRecord(selected[0] || null);
				  }
			  }
          }]
    });     
    
    OrgnizationsListingWindow = Ext.create('widget.window', {
        title: 'Orgnizations List',
        closable: true,
        closeAction: 'destroy',
        
        //animateTarget: this,
        width: 600,
        height: 350,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [OrgnizationsListingTabs,{
        xtype   :   'hidden',
        name    :   'coid',
        id      :   'coid',
        value   :   coid                
    }]
    });          
             
    OrgnizationsListingWindow.show();   
                
	}
    
    
       	
}

function showAddOrgnization()
{
    
    var AddOrgnizationWindow = new Ext.Window({
        title       :   'Add Orgnization',    
        autoWidth   :   true, 
        autoHeight  :   true,
        closable    :   true,        
        closeAction :   'hide',
        layout      :   'fit',
        border      :   false,
        resizable   :   true,
        modal       :   true,  
        items       :   [AddOrgnizationForm]
    });
    
    var coid = new Ext.form.Hidden({
        xtype   :   'hidden',
        name    :   'coid',
        id      :   'coid',
        value   :   Ext.getCmp('coid').value  
        });

    
    AddOrgnizationForm.add(coid);
               
    
    AddOrgnizationWindow.show();
}

function showEditOrgnization()
{
    var EditOrgnizationWindow = new Ext.Window({
        title       :   'Edit Orgnization',    
        autoWidth   :   true, 
        autoHeight  :   true,
        closable    :   true,        
        closeAction :   'hide',
        layout      :   'fit',
        border      :   false,
        resizable   :   true,
        modal       :   true,  
        items       :   [EditOrgnizationForm]
    }); 
    var coid = new Ext.form.Hidden({
        xtype   :   'hidden',
        name    :   'coid',
        id      :   'coid',
        value   :   Ext.getCmp('coid').value  
        });

    
    EditOrgnizationForm.add(coid);
    
    EditOrgnizationWindow.show(); 
    
    
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showSubCoordinatorsListing(coid)
{
	if (!SubCoordinatorsListing)
	{		
		var SubCoordinatorsStore = Ext.create('Ext.data.Store', {
            model   : 'SubCoordinatorsModel',
            autoLoad: true,
            autoSync: true,
            proxy: {
                type: 'ajax',
                api: {
                    read:       '/admin/restfull/subcoordinatorsview/?coid='+coid,
                    create:     '/admin/restfull/subcoordinatorscreate/?coid='+coid,
                    update:     '/admin/restfull/subcoordinatorsupdate/?coid='+coid,
                    destroy:    '/admin/restfull/subcoordinatorsdestroy/?coid='+coid
                },
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'data',
                    messageProperty: 'message'
                },
                writer: {
                    type: 'json',
                    writeAllFields: false,
                    root: 'data'
                },
                listeners: {
                    exception: function(proxy, response, operation){
                        Ext.MessageBox.show({
                            title: 'REMOTE EXCEPTION',
                            msg: operation.getError(),
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            },
            listeners: {
                write: function(proxy, operation){
                    
                    if (operation.action == 'destroy') {
                        Ext.getCmp('centertabs').child('#form').setActiveRecord(null);
                    }
                    Ext.example.msg(operation.action, operation.resultSet.message);
                }
            }
        });       
        
		if(Ext.getCmp('subcoordinatorsgrid'))
        {
            Ext.getCmp('centertabs').setActiveTab('subcoordinatorsgrid');
        
        }
        else
        {
            Ext.getCmp('centertabs').add({		  
                xtype: 'subcoordinatorsgrid',
                itemId: 'subcoordinatorsgrid',
                id: 'subcoordinatorsgrid',
                closable: true,
                title: 'SubCoordinators List',
                flex: 1,
                store: SubCoordinatorsStore,                  
                listeners: {
                  selectionchange: function(selModel, selected) {
                	  //Ext.getCmp('centertabs').child('#form').setActiveRecord(selected[0] || null);
                  }
                }
            }).show(); //adds to original content but does not replace it
            Ext.getCmp('centertabs').setActiveTab('subcoordinatorsgrid');
        
        }  
        
        Ext.getCmp('centertabs').doLayout(); 
                
             
	}   	
}

function showAddSubCoordinator(sel)
{
    AddSubCoordinatorWindow = new Ext.Window({
        title: 'Add Sub Coordinator',    
        width: 800,
        autoHeight: true,        
        closeAction: 'hide',
        layout: 'fit',
        border: false,
        resizable: true,
        modal: true,   
        items: [AddSubCoordinatorForm]
    });               
    
    AddSubCoordinatorWindow.show();
}

function showEditSubCoordinator(sel)
{
    EditSubCoordinatorWindow = new Ext.Window({
        title: 'Edit Sub Coordinator',    
        width: 800,
        autoHeight: true,
        closeAction: 'hide',
        layout: 'fit',
        border: false,
        resizable: true,
        modal: true,   
        items: [EditSubCoordinatorForm]
    }); 
    
    EditSubCoordinatorWindow.show(); 
    
    
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showMembersListing()
{
	if (!MembersListing)
	{		
		MembersStore = Ext.create('Ext.data.Store', {
            model: 'MembersModel',
            autoLoad: true,
            autoSync: true,
            proxy: {
                type: 'ajax',
                api: {
                    read:       '/admin/restfull/membersview',
                    create:     '/admin/restfull/memberscreate',
                    update:     '/admin/restfull/membersupdate',
                    destroy:    '/admin/restfull/membersdestroy'
                },
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'data',
                    messageProperty: 'message'
                },
                writer: {
                    type: 'json',
                    writeAllFields: false,
                    root: 'data'
                },
                listeners: {
                    exception: function(proxy, response, operation){
                        Ext.MessageBox.show({
                            title: 'REMOTE EXCEPTION',
                            msg: operation.getError(),
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            },
            listeners: {
                write: function(proxy, operation){
                    
                    if (operation.action == 'destroy') {
                        //Ext.getCmp('centertabs').child('#form').setActiveRecord(null);
                    }
                    Ext.example.msg(operation.action, operation.resultSet.message);
                }
            }
        });       
        
		if(Ext.getCmp('membersgrid'))
        {
            Ext.getCmp('centertabs').setActiveTab('membersgrid');
        
        }
        else
        {
            Ext.getCmp('centertabs').add({		  
                xtype: 'membersgrid',
                itemId: 'membersgrid',
                id: 'membersgrid',
                closable: true,
                title: 'Members List',
                flex: 1,
                store: MembersStore,                  
                listeners: {
                  selectionchange: function(selModel, selected) {
                	  //Ext.getCmp('centertabs').child('#form').setActiveRecord(selected[0] || null);
                  }
                }
            }).show(); //adds to original content but does not replace it
            Ext.getCmp('centertabs').setActiveTab('membersgrid');
        
        }  
        
        Ext.getCmp('centertabs').doLayout();        
               
	}   	
}

function showAddMember()
{
    AddMemberWindow = new Ext.Window({
        title       :   'Add Member',    
        autoWidth   :   true, 
        autoHeight  :   true,
        closable    :   true,        
        closeAction :   'hide',
        layout      :   'fit',
        border      :   false,
        resizable   :   true,
        modal       :   true,   
        items       :   [AddMemberForm]
    });               
    
    AddMemberWindow.show();
}

function showEditMember()
{
    EditMemberWindow = new Ext.Window({
        title       :   'Edit Member',    
        autoWidth   :   true, 
        autoHeight  :   true,
        closable    :   true,        
        closeAction :   'hide',
        layout      :   'fit',
        border      :   false,
        resizable   :   true,
        modal       :   true,   
        items       :   [EditMemberForm]
    }); 
    
    EditMemberWindow.show(); 
    
    
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var EmailTemplatesListing;
function showEmailTemplatesListing()
{
	if (!EmailTemplatesListing)
	{		
		var emailtemplatesstore = Ext.create('Ext.data.Store', {
            model: 'EmailTemplatesModel',
            autoLoad: true,
            autoSync: true,
            proxy: {
                type: 'ajax',
                api: {
                    read:       '/admin/restfull/emailtemplatesview',
                    create:     '/admin/restfull/emailtemplatescreate',
                    update:     '/admin/restfull/emailtemplatesupdate',
                    destroy:    '/admin/restfull/emailtemplatesdestroy'
                },
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'data',
                    messageProperty: 'message'
                },
                writer: {
                    type: 'json',
                    writeAllFields: false,
                    root: 'data'
                },
                listeners: {
                    exception: function(proxy, response, operation){
                        Ext.MessageBox.show({
                            title: 'REMOTE EXCEPTION',
                            msg: operation.getError(),
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            },
            listeners: {
                write: function(proxy, operation){
                    
                    if (operation.action == 'destroy') {
                        //Ext.getCmp('centertabs').child('#form').setActiveRecord(null);
                    }
                    Ext.example.msg(operation.action, operation.resultSet.message);
                }
            }
        });       
        
		if(Ext.getCmp('emailtemplatesgrid'))
        {
            Ext.getCmp('centertabs').setActiveTab('emailtemplatesgrid');
        
        }
        else
        {
            Ext.getCmp('centertabs').add({		  
                xtype: 'emailtemplatesgrid',
                itemId: 'emailtemplatesgrid',
                id: 'emailtemplatesgrid',
                closable: true,
                title: 'Email Templates List',
                flex: 1,
                store: emailtemplatesstore,                  
                listeners: {
                  selectionchange: function(selModel, selected) {
                	  //Ext.getCmp('centertabs').child('#form').setActiveRecord(selected[0] || null);
                  }
                }
            }).show(); //adds to original content but does not replace it
            Ext.getCmp('centertabs').setActiveTab('emailtemplatesgrid');
        
        }  
        
        Ext.getCmp('centertabs').doLayout();          
          
	}   	
}

function showAddEmailTemplate()
{
    var AddEmailTemplateWindow = new Ext.Window({
        title: 'Add Email Template',    
        width: 800,
        autoHeight: true,        
        closeAction: 'hide',
        layout: 'fit',
        border: false,
        resizable: true,
        modal: true,   
        items: [AddEmailTemplateForm]
    });               
    
    AddEmailTemplateWindow.show();
}

function showEditEmailTemplate()
{
    var EditEmailTemplateWindow = new Ext.Window({
        title: 'Edit EmailTemplate',    
        width: 800,
        autoHeight: true,
        closeAction: 'hide',
        layout: 'fit',
        border: false,
        resizable: true,
        modal: true,   
        items: [EditEmailTemplateForm]
    }); 
    
    EditEmailTemplateWindow.show(); 
    
    
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var AdministratorsListing;
function showAdministratorsListing()
{
	if (!AdministratorsListing)
	{		
		var administratorsstore = Ext.create('Ext.data.Store', {
            model: 'AdministratorsModel',
            autoLoad: true,
            autoSync: true,
            proxy: {
                type: 'ajax',
                api: {
                    read:       '/admin/restfull/administratorsview',
                    create:     '/admin/restfull/administratorscreate',
                    update:     '/admin/restfull/administratorsupdate',
                    destroy:    '/admin/restfull/administratorsdestroy'
                },
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'data',
                    messageProperty: 'message'
                },
                writer: {
                    type: 'json',
                    writeAllFields: false,
                    root: 'data'
                },
                listeners: {
                    exception: function(proxy, response, operation){
                        Ext.MessageBox.show({
                            title: 'REMOTE EXCEPTION',
                            msg: operation.getError(),
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            },
            listeners: {
                write: function(proxy, operation){
                    
                    if (operation.action == 'destroy') {
                        //Ext.getCmp('centertabs').child('#form').setActiveRecord(null);
                    }
                    Ext.example.msg(operation.action, operation.resultSet.message);
                }
            }
        });       
        
		if(Ext.getCmp('administratorsgrid'))
        {
            Ext.getCmp('centertabs').setActiveTab('administratorsgrid');
        
        }
        else
        {
            Ext.getCmp('centertabs').add({		  
                xtype: 'administratorsgrid',
                itemId: 'administratorsgrid',
                id: 'administratorsgrid',
                closable: true,
                title: 'Administrators List',
                flex: 1,
                store: administratorsstore,                  
                listeners: {
                  selectionchange: function(selModel, selected) {
                	  //Ext.getCmp('centertabs').child('#form').setActiveRecord(selected[0] || null);
                  }
                }
            }).show(); //adds to original content but does not replace it
            Ext.getCmp('centertabs').setActiveTab('emailtemplatesgrid');
        
        }  
        
        Ext.getCmp('centertabs').doLayout();        
             
	}   	
}

function showAddAdministrator()
{
    var AddAdministratorWindow = new Ext.Window({
        title: 'Add Administrator',    
        width: 800,
        autoHeight: true,        
        closeAction: 'hide',
        layout: 'fit',
        border: false,
        resizable: true,
        modal: true,   
        items: [AddAdministratorForm]
    });               
    
    AddAdministratorWindow.show();
}

function showEditAdministrator()
{
    var EditAdministratorWindow = new Ext.Window({
        title: 'Edit Administrator',    
        width: 800,
        autoHeight: true,
        closeAction: 'hide',
        layout: 'fit',
        border: false,
        resizable: true,
        modal: true,   
        items: [EditAdministratorForm]
    }); 
    
    EditAdministratorWindow.show(); 
    
    
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var AdministratorsGoupsListing;
function showAdministratorsGroupsListing()
{
	if (!AdministratorsGoupsListing)
	{		
		var administratorsgroupsstore = Ext.create('Ext.data.Store', {
            model: 'AdministratorsGroupsModel',
            autoLoad: true,
            autoSync: true,
            proxy: {
                type: 'ajax',
                api: {
                    read:       '/admin/restfull/viewadministratorsgroups',
                    create:     '/admin/restfull/createadministratorsgroups',
                    update:     '/admin/restfull/updateadministratorsgroups',
                    destroy:    '/admin/restfull/destroyadministratorsgroups'
                },
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'data',
                    messageProperty: 'message'
                },
                writer: {
                    type: 'json',
                    writeAllFields: false,
                    root: 'data'
                },
                listeners: {
                    exception: function(proxy, response, operation){
                        Ext.MessageBox.show({
                            title: 'REMOTE EXCEPTION',
                            msg: operation.getError(),
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            },
            listeners: {
                write: function(proxy, operation){
                    
                    if (operation.action == 'destroy') {
                        //Ext.getCmp('centertabs').child('#form').setActiveRecord(null);
                    }
                    Ext.example.msg(operation.action, operation.resultSet.message);
                }
            }
        });       
        
		if(Ext.getCmp('administratorsgroupsgrid'))
        {
            Ext.getCmp('centertabs').setActiveTab('administratorsgroupsgrid');
        
        }
        else
        {
            Ext.getCmp('centertabs').add({		  
                xtype: 'administratorsgroupsgrid',
                itemId: 'administratorsgroupsgrid',
                id: 'administratorsgroupsgrid',
                closable: true,
                title: 'AdministratorsGoups List',
                flex: 1,
                store: administratorsgroupsstore,                  
                listeners: {
                  selectionchange: function(selModel, selected) {
                	  //Ext.getCmp('centertabs').child('#form').setActiveRecord(selected[0] || null);
                  }
                }
            }).show(); //adds to original content but does not replace it
            Ext.getCmp('centertabs').setActiveTab('emailtemplatesgrid');
        
        }  
        
        Ext.getCmp('centertabs').doLayout();         
               
	}   	
}

function showAddAdministratorGroup()
{
    var AddAdministratorGroupWindow = new Ext.Window({
        title: 'Add Administrator Group',    
        width: 800,
        autoHeight: true,        
        closeAction: 'hide',
        layout: 'fit',
        border: false,
        resizable: true,
        modal: true,   
        items: [AddAdministratorGroupForm]
    });               
    
    AddAdministratorGroupWindow.show();
}

function showEditAdministratorGroup()
{
    var EditAdministratorGroupWindow = new Ext.Window({
        title: 'Edit Administrator Group',    
        width: 800,
        autoHeight: true,
        closeAction: 'hide',
        layout: 'fit',
        border: false,
        resizable: true,
        modal: true,   
        items: [EditAdministratorGroupForm]
    }); 
    
    EditAdministratorGroupWindow.show(); 
    
    
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var BillingsListing;
function showBillingsListing()
{
	if (!BillingsListing)
	{		
		var Billingsstore = Ext.create('Ext.data.Store', {
            model: 'BillingsModel',
            autoLoad: true,
            autoSync: true,
            proxy: {
                type: 'ajax',
                api: {
                    read:       '/admin/restfull/viewbillings',
                    create:     '/admin/restfull/createbillings',
                    update:     '/admin/restfull/updatebillings',
                    destroy:    '/admin/restfull/destroybillings'
                },
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'data',
                    messageProperty: 'message'
                },
                writer: {
                    type: 'json',
                    writeAllFields: false,
                    root: 'data'
                },
                listeners: {
                    exception: function(proxy, response, operation){
                        Ext.MessageBox.show({
                            title: 'REMOTE EXCEPTION',
                            msg: operation.getError(),
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            },
            listeners: {
                write: function(proxy, operation){
                    
                    if (operation.action == 'destroy') {
                        //Ext.getCmp('centertabs').child('#form').setActiveRecord(null);
                    }
                    Ext.example.msg(operation.action, operation.resultSet.message);
                }
            }
        });       
        
		if(Ext.getCmp('Billingsgrid'))
        {
            Ext.getCmp('centertabs').setActiveTab('Billingsgrid');
        
        }
        else
        {
            Ext.getCmp('centertabs').add({		  
                xtype: 'Billingsgrid',
                itemId: 'Billingsgrid',
                id: 'Billingsgrid',
                closable: true,
                title: 'Billings List',
                flex: 1,
                store: Billingsstore,                  
                listeners: {
                  selectionchange: function(selModel, selected) {
                	  //Ext.getCmp('centertabs').child('#form').setActiveRecord(selected[0] || null);
                  }
                }
            }).show(); //adds to original content but does not replace it
            Ext.getCmp('centertabs').setActiveTab('Billingsgrid');
        
        }  
        
        Ext.getCmp('centertabs').doLayout();         
               
	}   	
}

function showAddBillings()
{
    var AddBillingsWindow = new Ext.Window({
        title: 'Add Administrator Group',    
        width: 800,
        autoHeight: true,        
        closeAction: 'hide',
        layout: 'fit',
        border: false,
        resizable: true,
        modal: true,   
        items: [AddBillingsForm]
    });               
    
    AddBillingsWindow.show();
}

function showEditBillings()
{
    var EditBillingsWindow = new Ext.Window({
        title: 'Edit Administrator Group',    
        width: 800,
        autoHeight: true,
        closeAction: 'hide',
        layout: 'fit',
        border: false,
        resizable: true,
        modal: true,   
        items: [EditBillingsForm]
    }); 
    
    EditBillingsWindow.show(); 
    
    
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function showBillingTransactionsListing(eid)
{
	if (!BillingTransactionsListing)
	{		
		BillingTransactionsStore = Ext.create('Ext.data.Store', {
            model       : 'BillingTransactionsModel',
            autoLoad    : true,
            autoSync    : true,
            proxy: {
                type: 'ajax',
                api: {
                    read:       '/admin/restfull/viewtransactions/?eid='+eid,
                    create:     '/admin/restfull/createtransactions',
                    update:     '/admin/restfull/updatetransactions',
                    destroy:    '/admin/restfull/destroytransactions'
                },
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'data',
                    messageProperty: 'message'
                },
                writer: {
                    type: 'json',
                    writeAllFields: false,
                    root: 'data'
                },
                listeners: {
                    exception: function(proxy, response, operation){
                        Ext.MessageBox.show({
                            title: 'REMOTE EXCEPTION',
                            msg: operation.getError(),
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            },
            listeners: {
                write: function(proxy, operation){
                    
                    if (operation.action == 'destroy') {
                        //Ext.getCmp('centertabs').child('#form').setActiveRecord(null);
                    }
                    Ext.example.msg(operation.action, operation.resultSet.message);
                }
            }
        });       
        
		if(Ext.getCmp('BillingTransactionsgrid'))
        {
            Ext.getCmp('centertabs').setActiveTab('BillingTransactionsgrid');
        
        }
        else
        {
            Ext.getCmp('centertabs').add({		  
                xtype       :   'BillingTransactionsgrid',
                itemId      :   'BillingTransactionsgrid',
                id          :   'BillingTransactionsgrid',
                closable    :   true,
                title       :   'BillingTransactions List',
                flex        :   1,
                store       :   BillingTransactionsStore,                  
                listeners   :   {
                  selectionchange: function(selModel, selected) {
                	  //Ext.getCmp('centertabs').child('#form').setActiveRecord(selected[0] || null);
                  }
                }
            }).show(); //adds to original content but does not replace it
            Ext.getCmp('centertabs').setActiveTab('BillingTransactionsgrid');
        
        }  
        
        Ext.getCmp('centertabs').doLayout();         
               
	}   	
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showBillingInvoicesListing()
{
	if (!BillingInvoicesListing)
	{		
		BillingInvoicesStore = Ext.create('Ext.data.Store', {
            model: 'BillingInvoicesModel',
            autoLoad: true,
            autoSync: true,
            proxy: {
                type: 'ajax',
                api: {
                    read:       '/admin/restfull/viewinvoices',
                    create:     '/admin/restfull/createinvoices',
                    update:     '/admin/restfull/updateinvoices',
                    destroy:    '/admin/restfull/destroyinvoices'
                },
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'data',
                    messageProperty: 'message'
                },
                writer: {
                    type: 'json',
                    writeAllFields: false,
                    root: 'data'
                },
                listeners: {
                    exception: function(proxy, response, operation){
                        Ext.MessageBox.show({
                            title: 'REMOTE EXCEPTION',
                            msg: operation.getError(),
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            },
            listeners: {
                write: function(proxy, operation){
                    
                    if (operation.action == 'destroy') {
                        //Ext.getCmp('centertabs').child('#form').setActiveRecord(null);
                    }
                    Ext.example.msg(operation.action, operation.resultSet.message);
                }
            }
        });       
        
		if(Ext.getCmp('BillingInvoicesgrid'))
        {
            Ext.getCmp('centertabs').setActiveTab('BillingInvoicesgrid');
        
        }
        else
        {
            Ext.getCmp('centertabs').add({		  
                xtype: 'BillingInvoicesgrid',
                itemId: 'BillingInvoicesgrid',
                id: 'BillingInvoicesgrid',
                closable: true,
                title: 'BillingInvoices List',
                flex: 1,
                store: BillingInvoicesStore,                  
                listeners: {
                  selectionchange: function(selModel, selected) {
                	  //Ext.getCmp('centertabs').child('#form').setActiveRecord(selected[0] || null);
                  }
                }
            }).show(); //adds to original content but does not replace it
            Ext.getCmp('centertabs').setActiveTab('BillingInvoicesgrid');
        
        }  
        
        Ext.getCmp('centertabs').doLayout();         
               
	}   	
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showBillingMembershipsListing()
{
	if (!BillingMembershipsListing)
	{		
		BillingMembershipsStore = Ext.create('Ext.data.Store', {
            model: 'BillingMembershipsModel',
            autoLoad: true,
            autoSync: true,
            proxy: {
                type: 'ajax',
                api: {
                    read:       '/admin/restfull/viewinvoices',
                    create:     '/admin/restfull/createinvoices',
                    update:     '/admin/restfull/updateinvoices',
                    destroy:    '/admin/restfull/destroyinvoices'
                },
                reader: {
                    type: 'json',
                    successProperty: 'success',
                    root: 'data',
                    messageProperty: 'message'
                },
                writer: {
                    type: 'json',
                    writeAllFields: false,
                    root: 'data'
                },
                listeners: {
                    exception: function(proxy, response, operation){
                        Ext.MessageBox.show({
                            title: 'REMOTE EXCEPTION',
                            msg: operation.getError(),
                            icon: Ext.MessageBox.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            },
            listeners: {
                write: function(proxy, operation){
                    
                    if (operation.action == 'destroy') {
                        //Ext.getCmp('centertabs').child('#form').setActiveRecord(null);
                    }
                    Ext.example.msg(operation.action, operation.resultSet.message);
                }
            }
        });       
        
		if(Ext.getCmp('BillingMembershipsgrid'))
        {
            Ext.getCmp('centertabs').setActiveTab('BillingMembershipsgrid');
        
        }
        else
        {
            Ext.getCmp('centertabs').add({		  
                xtype: 'BillingMembershipsgrid',
                itemId: 'BillingMembershipsgrid',
                id: 'BillingMembershipsgrid',
                closable: true,
                title: 'BillingMemberships List',
                flex: 1,
                store: BillingMembershipsStore,                  
                listeners: {
                  selectionchange: function(selModel, selected) {
                	  //Ext.getCmp('centertabs').child('#form').setActiveRecord(selected[0] || null);
                  }
                }
            }).show(); //adds to original content but does not replace it
            Ext.getCmp('centertabs').setActiveTab('BillingMembershipsgrid');
        
        }  
        
        Ext.getCmp('centertabs').doLayout();         
               
	}   	
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
function showEventTicketsListing(eid)
{
	if (!EventTicketsListing)
	{	
	           
        EventTicketsStore = Ext.create('Ext.data.Store', {
			model        :   'EventTicketsModel',
			autoLoad     :   true,
			autoSync     :   true,
			proxy        :   {
				type     :   'ajax',
				api      :   {
					read   :    '/admin/restfull/eventticketsview',
					create :    '/admin/restfull/eventticketscreate',
					update :    '/admin/restfull/eventticketsupdate',
					destroy:    '/admin/restfull/eventticketsdestroy'
				},
				reader  : {
					type: 'json',
					successProperty: 'success',
					root: 'data',
					messageProperty: 'message'
				},
				writer  : {
					type: 'json',
					writeAllFields: false,
					root: 'data'
				},
				listeners: {
					exception: function(proxy, response, operation){
						Ext.MessageBox.show({
							title: 'REMOTE EXCEPTION',
							msg: operation.getError(),
							icon: Ext.MessageBox.ERROR,
							buttons: Ext.Msg.OK
						});
					}
				}
			},
			listeners: {
				write: function(proxy, operation){
					if (operation.action == 'destroy') {
						//Ext.getCmp('centertabs').child('#form').setActiveRecord(null);
					}
					Ext.example.msg(operation.action, operation.resultSet.message);
				}
			}
		});       
        
        var EventTicketsListingTabs = new Ext.TabPanel({
            id          :   'eventticketscentertabs',            
            activeTab   :   0,
            margins     :   '5 5 5 5',
            resizeTabs  :   true, // turn on tab resizing
            minTabWidth :   115,
            items: [{
                  itemId: 'eventticketsgrid',
                  xtype : 'eventticketsgrid',
                  title : 'Tickets List',
                  flex  : 1,
                  store : EventTicketsStore,
                  listeners: {
                      selectionchange: function(selModel, selected) {
                          //tabs.child('#form').setActiveRecord(selected[0] || null);
                      }
                  }
              }, {
                  itemId: 'form',
                  xtype: 'ticketslistform',                  
                  margins: '0 0 0 0',
                  listeners: {
                      create: function(form, data){
                          EventTicketsStore.insert(0, data);
                      }
                  }
              }]
        }); 
       
                  
        
        
        if (!EventTicketsListing) {
            EventTicketsListing = Ext.create('widget.window', {
                title: 'Event Tickets List',
                closable: true,
                closeAction: 'destroy',
                
                //animateTarget: this,
                width: 600,
                height: 350,
                layout: 'border',
                bodyStyle: 'padding: 5px;',
                items: [EventTicketsListingTabs]
            });
        }		
       
        EventTicketsListing.show();        
              
	}   	
}


function showAddEventTickets()
{
    var AddEventTicketsWindow = new Ext.Window({
        title       :   'Add Event Tickets',
        autoWidth   :   true, 
        autoHeight  :   true,
        closable    :   true,        
        closeAction :   'hide',
        layout      :   'fit',
        border      :   false,
        resizable   :   true,
        modal       :   true,
        items       :   [AddEventTicketsForm]
    });
               
    
    AddEventTicketsWindow.show();
}

function showEventTicketsEvents()
{
    var EditEventTicketsWindow = new Ext.Window({
        title: 'Edit Event Tickets',
        autoWidth   :   true, 
        autoHeight  :   true,
        closable    :   true,        
        closeAction :   'hide',
        layout      :   'fit',
        border      :   false,
        resizable   :   true,
        modal       :   true,
        items       :   [EditEventTicketsForm]
    }); 
    
    EditEventTicketsWindow.show(); 
    
    
}
*/