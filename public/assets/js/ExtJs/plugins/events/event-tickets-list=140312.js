var AddEventTicketsForm = Ext.create('Ext.form.Panel', {   
    activeRecord: null,
    iconCls: 'icon-user',
    frame: true,
    title: 'Add Event Tickets',
    id: 'addeventtickets',
    bodyPadding: 5,
    fieldDefaults: {
        anchor: '100%',
        labelAlign: 'right'
    },
    items   : [            
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
           } 
    ],
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var EditEventTicketsForm = Ext.create('Ext.form.Panel', {   
    activeRecord: null,
    iconCls: 'icon-user',
    frame: true,
    title: 'Edit Event Tickets',
    id: 'editeventtickets',
    
    bodyPadding: 5,
    fieldDefaults: {
        anchor: '100%',
        labelAlign: 'right'
    },
    items   : [            
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
           } 
    ],
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
Ext.define('TicketsListForm', {
        extend: 'Ext.form.Panel',
        alias: 'widget.ticketslistform',
    
        requires: ['Ext.form.field.Text'],
    
        initComponent: function(){
            this.addEvents('create');
            Ext.apply(this, {
                activeRecord: null,
                iconCls: 'icon-user',
                frame: true,
                title: 'Tickets',
                defaultType: 'textfield',
                bodyPadding: 5,
                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'right'
                },
                items: [{
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
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: ['->', {
                        iconCls: 'icon-save',
                        itemId: 'save',
                        text: 'Save',
                        disabled: true,
                        scope: this,
                        handler: this.onSave
                    }, {
                        iconCls: 'icon-user-add',
                        text: 'Create',
                        scope: this,
                        handler: this.onCreate
                    }, {
                        iconCls: 'icon-reset',
                        text: 'Reset',
                        scope: this,
                        handler: this.onReset
                    }]
                }]
            });
            this.callParent();
        },
    
        setActiveRecord: function(record){
            this.activeRecord = record;
            if (record) {
                this.down('#save').enable();
                this.getForm().loadRecord(record);
            } else {
                this.down('#save').disable();
                this.getForm().reset();
            }
        },
    
        onSave: function(){
            var active = this.activeRecord,
                form = this.getForm();
    
            if (!active) {
                return;
            }
            if (form.isValid()) {
                form.updateRecord(active);
                this.onReset();
            }
        },
    
        onCreate: function(){
            
            var form = this.getForm();      
    
            if (form.isValid()) {         
                this.fireEvent('create', this, form.getValues());                                
                form.reset();
            }
    
        },
    
        onReset: function(){
            this.setActiveRecord(null);
            this.getForm().reset();
        }
    });
    
    Ext.define('EventTicketsGrid', {
        extend: 'Ext.grid.Panel',
        alias: 'widget.eventticketsgrid',
    
        requires: [
            'Ext.grid.plugin.CellEditing',
            'Ext.form.field.Text',
            'Ext.toolbar.TextItem'
        ],
    
        initComponent: function(){
    
            this.editing = Ext.create('Ext.grid.plugin.CellEditing');
    
            Ext.apply(this, {
                iconCls: 'icon-grid',
                frame: true,
                plugins: [this.editing],  
                dockedItems: [{
                    xtype: 'toolbar',
                    items: [{
                        iconCls: 'icon-add',
                        text: 'Add',
                        scope: this,
                        handler: this.onAddClick
                    }, {
                        iconCls: 'icon-delete',
                        text: 'Delete',
                        disabled: true,
                        itemId: 'delete',
                        scope: this,
                        handler: this.onDeleteClick
                    },'->',
                    {
                        iconCls: 'icon-export',
                        text: 'Export',                    
                        itemId: 'export',
                        scope: this,
                        handler: this.onExportClick
                    }]
                }],          
                columns: [
                {
                    text: 'ID',
                    width: 40,
                    sortable: true,
                    dataIndex: 'id'
                }, {
                    header: 'Ticket Title',
                    flex: 1,
                    sortable: true,
                    dataIndex: 'ticket_title',
                    field: {
                        type: 'textfield'
                    }
                }, {
                    header: 'Ticket Quantity',
                    width: 100,
                    sortable: true,
                    dataIndex: 'ticket_quantity',
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
                    header: 'Ticket Price',
                    width: 100,
                    sortable: true,
                    dataIndex: 'ticket_price',
                    field: {
                        type: 'textfield'
                    }
                }, {
                    header: 'Status',
                    width: 100,
                    sortable: true,
                    dataIndex: 'ticket_status',
                    field: {
                    xtype: 'combobox',
                    typeAhead: true,
                    triggerAction: 'all',
                    selectOnTab: true,
                    store: [
                        ['Active','Active'],
                        ['Inactive','Inactive']
                    ],
                    lazyRender: true,
                    listClass: 'x-combo-list-small'
                    }
    
                }, {
                    xtype: 'actioncolumn',
                    width: 100,
                    items: [
                    {
                        icon   : '/assets/images/attendee_list.png',  // Use a URL in the icon config
                        width  : 16,
                        height : 16, 
                        align  : 'right',
                        margin : '5 5 5 5',
                        tooltip: 'Event Ticket Attende',
                        handler: function(grid, rowIndex, colIndex) {                                               
                            var row = grid.getStore().getAt(rowIndex);                            
                            var eid = row.get('eid');                 
                            var tid = row.get('id');        
                            showEventAttendeesListing(eid, tid);                   
                            
                        }
                    }, {
                        icon   : '/assets/images/group_invitation_icon.png',  // Use a URL in the icon config
                        tooltip: 'View Ticket',
                        handler: function(grid, rowIndex, colIndex) {                                               
                            var row = grid.getStore().getAt(rowIndex);
                            showViewTicket();
                            
                            //alert("Sell " + row.get('id'));
                        }
                    },{
                        icon   : '/assets/images/group_invitation_icon.png',  // Use a URL in the icon config
                        tooltip: 'Sell Tickets',
                        handler: function(grid, rowIndex, colIndex) {                                               
                            var row = grid.getStore().getAt(rowIndex);
                            showSellTickets();
                            
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
        },
    
        onExportClick: function(){
            //alert('asdasdasd');
            Ext.Ajax.request({
                url:'/admin/tickets/exportexcel',
                method:'POST',            
                success:function(response){
                    //obj = Ext.util.JSON.decode(response.responseText);
                    if(response.responseText)
                    {
                        var redirect = '/admin/tickets/download?file='+response.responseText;
                        window.location = redirect;    
                    }
                    else
                    {
                        Ext.Msg.alert('There seems to be a problem');
                    }
                    
                    
                    //alert(response.responseText);
                    //alert(response.responseText.toString());                
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
            
            var rec = new TicketsListModel({
                full_name: '',
                last_name: '',
                email: ''
            }), edit = this.editing;
    
            edit.cancelEdit();
            this.store.insert(0, rec);
            edit.startEditByPosition({
                row: 0,
                column: 1
            });
        }
    });
    
    Ext.define('EventTicketsModel', {
        extend: 'Ext.data.Model',
        fields: [
        {
            name: 'id',
            type: 'int',
            useNull: true
        }, 'eid', 'ticket_title', 'ticket_quantity', 'ticket_sold', 'ticket_price', 'ticket_status' ],
        validations: [{
            type: 'length',
            field: 'ticket_title',
            min: 1
        }, {
            type: 'length',
            field: 'ticket_quantity',
            min: 1
        }, {
            type: 'length',
            field: 'ticket_price',
            min: 1
        }, {
            type: 'length',
            field: 'ticket_status',
            min: 1
        }]
    });