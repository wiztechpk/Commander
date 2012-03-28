//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var AddAdministratorForm = Ext.create('Ext.form.Panel', {   
    activeRecord: null,
    iconCls: 'icon-user',
    frame: true,
    title: 'Add Administrator',
    id: 'addadministrator',
    defaultType: 'textfield',
    bodyPadding: 5,
    fieldDefaults: {
        anchor: '100%',
        labelAlign: 'right'
    },
    items   : [            
                {
                    fieldLabel: 'First Name',
                    name: 'first_name',
                    allowBlank: false,
                    
                },{
                    fieldLabel: 'Last Name',
                    name: 'last_name',
                    allowBlank: false,
                    
                },{
                    fieldLabel: 'Email',
                    name: 'email',
                    allowBlank: false,
                    vtype: 'email'
                }, {
                    fieldLabel: 'Password',
                    name: 'password',
                    allowBlank: false
                }, 
                new Ext.form.ComboBox({
                    name : 'group',
                	id : 'group',
                	hiddenName : 'group',    
                    fieldLabel:'Select Group',
                    store: groups,
                    displayField:'group_name',
                    valueField:'group_id',
                    typeAhead: true,
                    mode: 'local',
                    triggerAction: 'all',
                    emptyText:'Select a group...',
                    selectOnFocus:true
                })
    
    ],
    buttons: [
        {
            text   : 'Create',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit
                    ({
                        url:'/admin/Invoices/create',
                        submitEmptyText: false,
                        waitMsg: 'Saving Data...',
                        
                        success: function(form, action) {
                           Ext.Msg.alert('Success', action.result.msg);
                           
                           //AddEditEventWindow.hide();
                           //Ext.getCmp('eventsgrid').getStore().reload();
                           //Ext.getCmp('eventsgrid').eventsstore.reload();
                           //membershipstore.load();
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
var EditAdministratorForm = Ext.create('Ext.form.Panel', {   
    activeRecord: null,
    iconCls: 'icon-user',
    frame: true,
    title: 'Edit Administrator',
    id: 'editadministrator',
    defaultType: 'textfield',
    bodyPadding: 5,
    fieldDefaults: {
        anchor: '100%',
        labelAlign: 'right'
    },
    items   : [            
            {
                xtype   :   'hidden',
                name    :   'id',
                id      :   'id'                
            }
            ,
            {
                fieldLabel: 'First Name',
                name: 'first_name',
                allowBlank: false,
                
            },{
                fieldLabel: 'Last Name',
                name: 'last_name',
                allowBlank: false,
                
            },{
                fieldLabel: 'Email',
                name: 'email',
                allowBlank: false,
                vtype: 'email'
            }, {
                fieldLabel: 'Password',
                name: 'password',
                allowBlank: false
            }, 
                new Ext.form.ComboBox({
                    name : 'group',
                	id : 'group',
                	hiddenName : 'group',    
                    fieldLabel:'Select Group',
                    store: groups,
                    displayField:'group_name',
                    valueField:'group_id',
                    typeAhead: true,
                    mode: 'local',
                    triggerAction: 'all',
                    emptyText:'Select a group...',
                    selectOnFocus:true
                })
            
    ],
    buttons: [
        {
            text   : 'Save',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit
                    ({
                        url:'/admin/Invoices/update',
                        submitEmptyText: false,
                        waitMsg: 'Saving Data...',
                        
                        success: function(form, action) {
                           Ext.Msg.alert('Success', action.result.msg);
                           
                           //AddEditEventWindow.hide();
                           //Ext.getCmp('eventsgrid').getStore().reload();
                           //Ext.getCmp('membershipgrid').membershipstore.reload();
                           //membershipstore.load();
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
Ext.define('BillingInvoicesGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.BillingInvoicesgrid',

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
            
            columns: [{
                text: 'ID',
                width: 40,
                sortable: true,
                dataIndex: 'id'
            }, {
                header: 'Member Name',
                width: 100,
                sortable: true,
                dataIndex: 'member_name',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Event Title',
                width: 100,
                sortable: true,
                dataIndex: 'title',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Event Date',
                width: 100,
                sortable: true,
                dataIndex: 'start_date',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'total_quantity',
                flex: 1,
                sortable: true,
                dataIndex: 'total_quantity',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'total_amount',
                flex: 1,
                sortable: true,
                dataIndex: 'total_amount',
                field: {
                    type: 'textfield'
                }
            }, {
                xtype: 'actioncolumn',
                width: 250,
                items: [
                {
                    icon   : '/assets/images/view_details.png',  // Use a URL in the icon config
                    width  : 16,
                    height : 16, 
                    align  : 'right',
                    margin : '5 5 5 5',
                    tooltip: 'View BillingInvoice Details',
                    handler: function(grid, rowIndex, colIndex) {                                               
                        var row = grid.getStore().getAt(rowIndex);
                        var tid = row.get('id');        
                        showBillingInvoiceDetailsListing(tid);                   
                        
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

   
    onDeleteClick: function(){
        var selection = this.getView().getSelectionModel().getSelection()[0];
        if (selection) {
            this.store.remove(selection);
        }
    },

    onAddClick: function(){
        
        showAddAdministrator();        
        
    },
    
    onEditClick: function(){       
        
        //showEditEvents();
        var sel = this.getView().getSelectionModel().getSelection()[0];
        if (typeof(sel) != 'undefined') {            
            
            EditAdministratorForm.loadRecord(sel);            
            showEditAdministrator();         
        }        
    }
});

Ext.define('BillingInvoicesModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'member_name', 'title', 'start_date', 'total_quantity', 'total_amount'],
    validations: [{
        type: 'length',
        field: 'title',
        min: 1
    }, {
        type: 'length',
        field: 'start_date',
        min: 1
    }, {
        type: 'length',
        field: 'total_quantity',
        min: 1
    }, {
        type: 'length',
        field: 'total_amount',
        min: 1
    }]
});

Ext.require([
    'Ext.data.*',
    'Ext.tip.QuickTipManager',
    'Ext.window.MessageBox'
]);