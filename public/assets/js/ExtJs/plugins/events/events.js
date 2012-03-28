var coordinatorsstore = new Ext.data.JsonStore({
    // store configs 
    autoDestroy: true,
    storeId: 'coordinators',

    proxy: {
        type: 'ajax',
        url: '/admin/coordinators/view',
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'id'
        }
    },

    //alternatively, a Ext.data.Model name can be given (see Ext.data.Store for an example)
    fields: ['id', 'first_name', 'last_name','name' ]
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var categoriesstore = new Ext.data.JsonStore({
    // store configs 
    autoDestroy: true,
    storeId: 'categoriesstore',

    proxy: {
        type: 'ajax',
        url: '/admin/eventcategories/view',
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'id'
        }
    },

    //alternatively, a Ext.data.Model name can be given (see Ext.data.Store for an example)
    fields: ['id', 'category' ]
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var membershipsstore = new Ext.data.JsonStore({
    // store configs 
    autoDestroy: true,
    storeId: 'memberships',

    proxy: {
        type: 'ajax',
        url: '/admin/membership/view',
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'id'
        }
    },

    //alternatively, a Ext.data.Model name can be given (see Ext.data.Store for an example)
    fields: ['id', 'title' ]
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
AddEventsForm = Ext.create('Ext.form.Panel', {   
    activeRecord    :   null,
    iconCls         :   'icon-user',
    frame           :   true,
    title           :   'Add Event',
    id              :   'addevent',
    
    bodyPadding     :   5,
    fieldDefaults   :   {
        anchor      :   '100%',
        labelAlign  :   'right'
    },
    items: [{
        layout:'column',
        border:false,
        items:[
        {
            columnWidth:1,
            border:false,
            layout: 'anchor',
            defaultType: 'textfield',
            items: [
            new Ext.form.ComboBox ({
                fieldLabel  :   'Category',
                anchor      :   '100%',
                name: 'category',
                title: 'Select Category',
                store: categoriesstore,
                autoShow: true,
                displayField: 'category',
                valueField: 'id',
                triggerAction: 'all',
                id: 'category'
                                               
            }),
            new Ext.form.ComboBox ({
                fieldLabel  :   'Co-Ordinators',
                anchor      :   '100%',
                name: 'coordinator',
                title: 'Select Co Ordinator',
                store: coordinatorsstore,
                autoShow: true,
                displayField: 'name',
                valueField: 'id',
                triggerAction: 'all',
                id: 'coordinator'
                                               
            }),
            {
                fieldLabel: 'Event Title',
                name: 'title',
                id: 'title',
                allowBlank: false                
            }
            ,
            {
                xtype: 'htmleditor',
                fieldLabel: 'Event Description',
                name: 'description',
                id: 'description',
                allowBlank: false                
            }
            ]
        }]
    },{
        xtype:'tabpanel',
        plain:true,
        activeTab: 0,
        height:235,
        defaults:{bodyStyle:'padding:10px'},
        items:[{
            title:'When',
            defaults: {width: 230},
            defaultType: 'textfield',

            items: [
            {
                xtype: 'datefield',
                format: 'Y-m-d',
                flex : 1,
                name : 'start_date',
                fieldLabel: 'Start Date',
                allowBlank: false
            },
            {
                xtype: 'timefield',
                name: 'start_time',
                fieldLabel: 'Start Time',
                minValue: '12:00 AM',
                maxValue: '11:59 PM'
            }
            ,
            {
                xtype: 'datefield',
                format: 'Y-m-d',
                flex : 1,
                name : 'end_date',
                fieldLabel: 'Event Date',
                allowBlank: false
            },
            {
                xtype: 'timefield',
                name: 'end_time',
                fieldLabel: 'End Time',
                minValue: '12:00 AM',
                maxValue: '11:59 PM',
                allowBlank: false,
                margins: '0'
            }]
        },{
            title:'Where',
            defaults: {width: 230},
            defaultType: 'textfield',

            items: [
            {
                xtype: 'textfield',
                flex : 1,
                name : 'venue',
                fieldLabel: 'Venue',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                flex : 1,
                name : 'address1',
                fieldLabel: 'Address 1',
                allowBlank: false,
                margins: '0'
            },
            {
                xtype: 'textfield',
                flex : 1,
                name : 'address2',
                fieldLabel: 'Address 2',
                allowBlank: false,
                margins: '0'
            },
            {
                xtype: 'textfield',
                flex : 1,
                name : 'city',
                fieldLabel: 'City',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                flex : 1,
                name : 'zip',
                fieldLabel: ' Zip Code',
                allowBlank: false,
                margins: '0'
            }]
        },{
            
            title: 'Tickets',
            defaults: {width: 230},
            defaultType: 'textfield',
            items: [
            {
                fieldLabel: 'Ticket Title',
                name: 'ticket_title',
                allowBlank: false                
            }, {
                fieldLabel: 'Ticket Quantity',
                name: 'ticket_quantity',
                allowBlank: false                
            }, {
                fieldLabel: 'Ticket Price',
                name: 'ticket_price',
                allowBlank: false                
            }, {                
                xtype: 'datefield',
                format: 'Y-m-d',
                flex : 1,
                name : 'ticket_start_sale_date',
                id : 'ticket_start_sale_date',
                fieldLabel: 'Ticket Start Date',
                allowBlank: false 
            }, {
                xtype: 'datefield',
                format: 'Y-m-d',
                flex : 1,
                name : 'ticket_end_sale_date',
                id : 'ticket_end_sale_date',
                fieldLabel: 'Ticket End Date',
                allowBlank: false
            }, {
                fieldLabel: 'Ticket Min Quantity',
                name: 'ticket_min_order',
                allowBlank: false                
            }, {
                fieldLabel: 'Ticket Max Quntity',
                name: 'ticket_max_order',
                allowBlank: false                
            }, {

                xtype: 'combo',
                store: [
                       ['Active','Active'],
                       ['Inactive','Inactive']
                ],
                mode: 'local',
                fieldLabel: 'Status',
                name: 'ticket_status',                
                displayField: 'status',
                valueField: 'id'
           }],
        }, {
            
            title: 'Sub CoOrdinators',
            defaults: {width: 230},
            defaultType: 'textfield',
            items:[/*{
            xtype: 'itemselector',
            name: 'itemselector',
            fieldLabel: 'ItemSelector',
            imagePath: '../ux/images/',
            multiselects: [{
                width: 250,
                height: 200,
                store: ds,
                displayField: 'text',
                valueField: 'value',
                title: 'Left'
            },{
                width: 250,
                height: 200,
                store: [['10','Ten']],
                tbar:[{
                    text: 'clear',
                    handler:function(){
                        isForm.getForm().findField('itemselector').reset();
                    }
                }],
                title: 'Right'
            }],
            listeners: {
                render: function(iSelector){
                    iSelector.fromMultiselect.fs.header.update(this.initialConfig.multiselects[0].title);
                    iSelector.toMultiselect.fs.header.update(this.initialConfig.multiselects[1].title);
                }
            }
        }*/],



        }]
    }],

    
    buttons: [
        {
            text   : 'Create',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit
                    ({
                        url:'/admin/events/create',
                        submitEmptyText: false,
                        waitMsg: 'Saving Data...',
                        
                        success: function(form, action) {
                           Ext.Msg.alert('Success', action.result.msg);
                           
                           //AddEditEventWindow.hide();
                           //Ext.getCmp('eventsgrid').getStore().reload();
                           //Ext.getCmp('eventsgrid').eventsstore.reload();
                           Eventssstore.load();
                        },
                 
                        failure: function(form, action) {
                           Ext.Msg.alert('Failure', action.result.msg);
                        }
                    });                    
                    
                }
            }
        },
        {
            text   : 'Reset',
            handler: function() {
                this.up('form').getForm().reset();
            }
        }        
    ]
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var EditEventsForm = Ext.create('Ext.form.Panel', {
    activeRecord    :   null,
    iconCls         :   'icon-user',
    frame           :   true,
    title           :   'Edit Event',
    id              :   'editevent',
    
    bodyPadding     :   5,
    fieldDefaults   :   {
        anchor      :   '100%',
        labelAlign  :   'right'
    },    
    
    items: [ 
        {
        layout:'column',
        border:false,
        items:[
        {
            columnWidth:1,
            border:false,
            layout: 'anchor',
            defaultType: 'textfield',
            items: [
            {
                xtype   :   'hidden',
                name    :   'id',
                id      :   'id'                
            },
            new Ext.form.ComboBox ({
                fieldLabel  :   'Category',
                anchor      :   '100%',
                name: 'category',
                title: 'Select Category',
                store: categoriesstore,
                autoShow: true,
                displayField: 'category',
                valueField: 'id',
                triggerAction: 'all',
                id: 'category'
                                               
            }),            
            new Ext.form.ComboBox ({
                fieldLabel  :   'Co-Ordinators',
                anchor      :   '100%',
                name: 'coordinator',
                title: 'Select Co Ordinator',
                store: coordinatorsstore,
                autoShow: true,
                displayField: 'name',
                valueField: 'id',
                triggerAction: 'all',
                id: 'coordinator'
                                               
            }),
            {
                fieldLabel: 'Event Title',
                name: 'title',
                id: 'title',
                allowBlank: false                
            }
            ,
            {
                xtype: 'htmleditor',
                fieldLabel: 'Event Description',
                name: 'description',
                id: 'description',
                allowBlank: false                
            }
            ]
        }]
    }, {
        xtype:'tabpanel',
        plain:true,
        activeTab: 0,
        height:235,
        defaults:{bodyStyle:'padding:10px'},
        items:[{
            title:'When',
            defaults: {width: 230},
            defaultType: 'textfield',

            items: [
            {
                xtype: 'datefield',
                format: 'Y-m-d',
                flex : 1,
                name : 'start_date',
                id : 'start_date',
                fieldLabel: 'Start Date',
                allowBlank: false
            },
            {
                xtype: 'timefield',
                name: 'start_time',
                id: 'start_time',
                fieldLabel: 'Start Time',
                minValue: '12:00 AM',
                maxValue: '11:59 PM'
            }
            ,
            {
                xtype: 'datefield',
                format: 'Y-m-d',
                flex : 1,
                name : 'end_date',
                fieldLabel: 'Event Date',
                allowBlank: false
            },
            {
                xtype: 'timefield',
                name: 'end_time',
                fieldLabel: 'End Time',
                minValue: '12:00 AM',
                maxValue: '11:59 PM',
                allowBlank: false,
                margins: '0'
            }]
        }, {
            title:'Where',
            defaults: {width: 230},
            defaultType: 'textfield',

            items: [
            {
                xtype: 'textfield',
                flex : 1,
                name : 'venue',
                fieldLabel: 'Venue',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                flex : 1,
                name : 'address1',
                fieldLabel: 'Address 1',
                allowBlank: false,
                margins: '0'
            },
            {
                xtype: 'textfield',
                flex : 1,
                name : 'address2',
                fieldLabel: 'Address 2',
                allowBlank: false,
                margins: '0'
            },
            {
                xtype: 'textfield',
                flex : 1,
                name : 'city',
                fieldLabel: 'City',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                flex : 1,
                name : 'zip',
                fieldLabel: ' Zip Code',
                allowBlank: false,
                margins: '0'
            }]
        }, {
            
            title: 'Tickets',
            defaults: {width: 230},
            defaultType: 'textfield',
            items: [
            {
                xtype   :   'hidden',
                name    :   'tid',
                id      :   'tid'                
            }
            ,
            {
                fieldLabel: 'Ticket Title',
                name: 'ticket_title',
                allowBlank: false                
            }, {
                fieldLabel: 'Ticket Quantity',
                name: 'ticket_quantity',
                allowBlank: false                
            }, {
                fieldLabel: 'Ticket Price',
                name: 'ticket_price',
                allowBlank: false                
            }, {                
                xtype: 'datefield',
                format: 'Y-m-d',
                flex : 1,
                name : 'ticket_start_sale_date',
                id : 'ticket_start_sale_date',
                fieldLabel: 'Ticket Start Date',
                allowBlank: false 
            }, {
                xtype: 'datefield',
                format: 'Y-m-d',
                flex : 1,
                name : 'ticket_end_sale_date',
                id : 'ticket_end_sale_date',
                fieldLabel: 'Ticket End Date',
                allowBlank: false
            }, {
                fieldLabel: 'Ticket Min Quantity',
                name: 'ticket_min_order',
                allowBlank: false                
            }, {
                fieldLabel: 'Ticket Max Quntity',
                name: 'ticket_max_order',
                allowBlank: false                
            }, {

                xtype: 'combo',
                store: [
                       ['Active','Active'],
                       ['Inactive','Inactive']
                ],
                mode: 'local',
                fieldLabel: 'Status',
                name: 'ticket_status',                
                displayField: 'status',
                valueField: 'id'
           }],
        }, {
            
            title: 'Sub CoOrdinators',
            defaults: {width: 230},
            defaultType: 'textfield',
            items: [/*            
            {
                fieldLabel: 'Ticket Title',
                name: 'ticket_title',
                allowBlank: false                
            }, {
                fieldLabel: 'Ticket Quantity',
                name: 'ticket_quantity',
                allowBlank: false                
            }, {
                fieldLabel: 'Ticket Price',
                name: 'ticket_price',
                allowBlank: false                
            }*/],
        }]
    }],   
    
    buttons: [
        {
            text   : 'Save',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit
                    ({
                        url:'/admin/events/update',
                        submitEmptyText: false,
                        waitMsg: 'Saving Data...',
                        
                        success: function(form, action) {
                           Ext.Msg.alert('Success', action.result.msg);
                           
                           AddEditEventWindow.hide();
                           //Ext.getCmp('eventsgrid').getStore().reload();
                           Ext.getCmp('eventsgrid').eventsstore.reload();
                           eventsstore.load();
                        },
                 
                        failure: function(form, action) {
                           Ext.Msg.alert('Failure', action.result.msg);
                        }
                    });
                    
                }
            }
        },
        {
            text   : 'Reset',
            handler: function() {
                this.up('form').getForm().reset();
            }
        }        
    ]
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ext.define('EventsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.eventsgrid',
    
    
    requires: [
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.ux.grid.FiltersFeature',
        'Ext.toolbar.Paging',    
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
        
        
    ],

    initComponent: function(){

        // configure whether filter query is encoded or not (initially)
        var encode = false;
        
        // configure whether filtering is performed locally or remotely (initially)
        var local = true;
    
        //this.editing = Ext.create('Ext.grid.plugin.CellEditing');
        var filters = {
        ftype: 'filters',
            // encode and local configuration options defined previously for easier reuse
            encode: encode, // json encode the filter query
            local: local,   // defaults to false (remote filtering)
            filters: [{
                type: 'numeric',
                dataIndex: 'id'
            }, {
                type: 'string',
                dataIndex: 'company',
                disabled: true
            }, {
                type: 'numeric',
                dataIndex: 'price'
            }, {
                type: 'date',
                dataIndex: 'date'
            }, {
                type: 'list',
                dataIndex: 'coordinator',
                options: ['Haseeb Memon', 'Taha Abbas'],
                phpMode: true
            }, {
                type: 'boolean',
                dataIndex: 'visible'
            }]
        };
    
        Ext.apply(this, {
            iconCls: 'icon-grid',
            id: 'eventsgrid',
            frame: true,
            //plugins: [this.editing],  
            dockedItems: [{
                xtype: 'toolbar',
                items: [
                {
                    iconCls: 'icon-add',
                    text: 'Add',
                    scope: this,
                    handler: this.onAddClick
                }
                ,'-',
                {
                    iconCls: 'icon-edit',
                    text: 'Edit',
                    disabled: true,
                    itemId: 'edit',
                    scope: this,
                    handler: this.onEditClick
                }
                ,
                {
                    iconCls: 'icon-delete',
                    text: 'Delete',
                    disabled: true,
                    itemId: 'delete',
                    scope: this,
                    handler: this.onDeleteClick
                }
                ,'->',
                {
                    iconCls: 'icon-export',
                    text: 'Export',                    
                    itemId: 'export',
                    scope: this,
                    handler: this.onExportClick
                }
                ]
            }],          
            columns: [{
                text: 'ID',
                width: 40,
                sortable: true,
                dataIndex: 'eid'
            }, {
                header: 'Category',
                width: 100,
                sortable: true,
                dataIndex: 'category',
                field: {
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: categoriesstore,
                displayField: 'category',
                valueField: 'id',
                name: 'category',                       
                lazyRender: true,
                listClass: 'x-combo-list-small'
                },
                filter: {
                    type: 'list',
                    options: ['small', 'medium', 'large', 'extra large']
                    //,phpMode: true
                }
            }, {
                header: 'Co-Ordinators',
                width: 100,
                sortable: true,
                dataIndex: 'coordinator',
                field: {
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: coordinatorsstore,
                displayField: 'name',
                valueField: 'id',
                name: 'coordinator',                       
                lazyRender: true,
                listClass: 'x-combo-list-small'
                }
            }, {
                header: 'Title',
                flex: 1,
                sortable: true,
                dataIndex: 'title',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Start Date',
                width: 100,
                sortable: true,
                dataIndex: 'start_date',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Ticket Sold',
                width: 100,
                sortable: true,
                dataIndex: 'ticket_sold',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Status',
                width: 100,
                sortable: true,
                dataIndex: 'status',
                field: {
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: [
                    ['Published','Published'],
                    ['Draft','Draft']
                ],
                lazyRender: true,
                listClass: 'x-combo-list-small'
                }

            }, {
                xtype: 'actioncolumn',
                width: 250,
                items: [
                {
                    icon   : '/assets/images/attendee_list.png',  // Use a URL in the icon config
                    width  : 16,
                    height : 16, 
                    align  : 'right',
                    margin : '5 5 5 5',
                    tooltip: 'View Event Attende',
                    handler: function(grid, rowIndex, colIndex) {                                               
                        var row = grid.getStore().getAt(rowIndex);
                        var eid = row.get('eid');                 
                        var tid = 0;                                
                        showEventAttendeesListing(eid,tid);                   
                        
                    }
                }, {
                    icon   : '/assets/images/ticket-icon.png',  // Use a URL in the icon config
                    width  : 16,
                    height : 16, 
                    align  : 'right',
                    margin : '5 5 5 5',
                    tooltip: 'View Event Tickets',
                    handler: function(grid, rowIndex, colIndex) {                                               
                        var row = grid.getStore().getAt(rowIndex);
                        var eid = row.get('eid');  
                        
                        showEventTicketsListing(eid);
                        
                        
                    }
                }, {
                    icon   : '/assets/images/coins.png',  // Use a URL in the icon config
                    width  : 16,
                    height : 16, 
                    align  : 'right',
                    margin : '5 5 5 5',
                    tooltip: 'View Event Transactions',
                    handler: function(grid, rowIndex, colIndex) {                                               
                        var row = grid.getStore().getAt(rowIndex);
                        var eid = row.get('eid');  
                        
                        showBillingTransactionsListing(eid);                   
                        
                    }
                }, {
                    icon   : '/assets/images/group_invitation_icon.png',  // Use a URL in the icon config
                    width  : 16,
                    height : 16, 
                    align  : 'right',
                    margin : '5 5 5 5',
                    tooltip: 'Inviter Coordinator',
                    handler: function(grid, rowIndex, colIndex) {                                               
                        var row = grid.getStore().getAt(rowIndex);
                        //showContactForm();
                        showEventSubCoOrdinators();
                        
                        //alert("Sell " + row.get('id'));
                    }
                }, {
                    icon   : '/assets/images/faq-email.png',  // Use a URL in the icon config
                    width  : 16,
                    height : 16, 
                    align  : 'right',
                    margin : '5 5 5 5',
                    tooltip: 'Event FAQ Emails',
                    handler: function(grid, rowIndex, colIndex) {                                               
                        var row = grid.getStore().getAt(rowIndex);
                        //showEventFAQEmails();
                        showEventQuestionsEmails()
                        
                        //alert("Sell " + row.get('id'));
                    }
                }]
            }]
        });
        this.callParent();
        this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
    },
    
    onSelectChange: function(selModel, selections){
        this.down('#delete').setDisabled(selections.length === 0);
        this.down('#edit').setDisabled(selections.length === 0);
    },

    onExportClick: function(){
        
        Ext.Ajax.request({
            url:'/admin/events/exportexcel',
            method:'POST',            
            success:function(response){                
                if(response.responseText)
                {
                    var redirect = '/admin/events/download?file='+response.responseText;
                    window.location = redirect;    
                }
                else
                {
                    Ext.Msg.alert('There seems to be a problem');
                }                             
            },
            failure:function(){
                Ext.Msg.alert('There seems to be a problem');
            }
        });
        
    },

    onDeleteClick: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.store.remove(selection);
        }
    },

    onAddClick: function(){
        
        showAddEvents();        
        
    },
    
    onEditClick: function(){       
        
        //showEditEvents();
        var sel = this.getView().getSelectionModel().getSelection()[0];
        if (typeof(sel) != 'undefined') {            
            
            EditEventsForm.loadRecord(sel);            
            showEditEvents();         
        }        
    }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ext.define('EventsPortalGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.eventsportalgrid',

    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],

    initComponent: function(){

        //this.editing = Ext.create('Ext.grid.plugin.CellEditing');

        Ext.apply(this, {
            iconCls: 'icon-grid',
            id: 'eventsportalgrid',
            frame: true,                      
            columns: [{
                text        :   'ID',
                width       :   40,
                sortable    :   true,
                dataIndex   :   'eid'
            }, {
                header      :   'Category',
                width       :   100,
                sortable    :   true,
                dataIndex   :   'category',
                field       :   {
                xtype       :   'combobox',
                typeAhead   :   true,
                triggerAction: 'all',
                selectOnTab :   true,
                store       :   categoriesstore,
                displayField:   'category',
                valueField  :   'id',
                name        :   'category',                       
                lazyRender  :   true,
                listClass   :   'x-combo-list-small'
                }
            }, {
                header: 'Co-Ordinators',
                width: 100,
                sortable: true,
                dataIndex: 'coordinator',
                field: {
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: coordinatorsstore,
                displayField: 'name',
                valueField: 'id',
                name: 'coordinator',                       
                lazyRender: true,
                listClass: 'x-combo-list-small'
                }
            }, {
                header: 'Title',
                flex: 1,
                sortable: true,
                dataIndex: 'title',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Status',
                width: 100,
                sortable: true,
                dataIndex: 'status',
                field: {
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: [
                    ['Published','Published'],
                    ['Draft','Draft']
                ],
                lazyRender: true,
                listClass: 'x-combo-list-small'
                }

            }]
        });
        this.callParent();        
    }  
    
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ext.define('EventsModel', {
    extend: 'Ext.data.Model',
    fields: ['eid', 'category', 'coordinator', 'coordinator_id', 'title', 'start_date', 'ticket_sold', 'status' ],
    validations: [
    {
        type: 'length',
        field: 'title',
        min: 1
    }]
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.state.*',
    'Ext.tip.QuickTipManager',
    'Ext.window.MessageBox'
    
]);