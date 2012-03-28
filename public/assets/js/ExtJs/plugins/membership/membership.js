//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
AddMembershipPlansForm = Ext.create('Ext.form.Panel', {
    activeRecord    :   null,
    iconCls         :   'icon-user',
    frame           :   true,
    title           :   'Add Membership Plan',
    id              :   'AddMembershipPlans',    
    bodyPadding     :   10,
    fieldDefaults   :   {
        anchor      :   '100%',
        labelAlign  :   'right'
    },
    items   : [            
            {
                fieldLabel  :   'Title',
                name        :   'title',
                allowBlank  :   false
                
            }, {
                fieldLabel  :   'No Of Events',
                name        :   'number',
                allowBlank  :   false
                
            }, {
                fieldLabel  :   'Price',
                name        :   'price',
                allowBlank  :   false                
            }, {

                xtype: 'combo',
                store: [
                       ['Active','Active'],
                       ['Inactive','Inactive']
                ],
                mode: 'local',
                fieldLabel: 'Status',
                name: 'status', 
                id: 'status',                
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
                        url:'/admin/MembershipPlan/create',
                        submitEmptyText: false,
                        waitMsg: 'Saving Data...',
                        
                        success: function(form, action) {
                           Ext.Msg.alert('Success', action.result.msg);
                           
                           //AddEditEventWindow.hide();
                           //Ext.getCmp('eventsgrid').getStore().reload();
                           //Ext.getCmp('eventsgrid').eventsstore.reload();
                           //MembershipPlanstore.load();
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
EditMembershipPlansForm = Ext.create('Ext.form.Panel', {   
    activeRecord    :   null,
    iconCls         :   'icon-user',
    frame           :   true,
    title           :   'Edit MembershipPlan',
    id              :   'EditMembershipPlan',    
    bodyPadding     :   5,
    fieldDefaults   :   {
        anchor      :   '100%',
        labelAlign  :   'right'
    },
    items   : [            
            {
                xtype   :   'hidden',
                name    :   'id',
                id      :   'id'                
            }, {
                fieldLabel: 'Title',
                name: 'title',
                allowBlank: false,
                
            }, {
                fieldLabel: 'No Of Events',
                name: 'number',
                allowBlank: false,
                
            }, {
                fieldLabel: 'Price',
                name: 'price',
                allowBlank: false,                
            }, {

                xtype: 'combo',
                store: [
                       ['Active','Active'],
                       ['Inactive','Inactive']
                ],
                mode: 'local',
                fieldLabel: 'Status',
                name: 'status', 
                id: 'status',                
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
                        url:'/admin/MembershipPlan/update',
                        submitEmptyText: false,
                        waitMsg: 'Saving Data...',
                        
                        success: function(form, action) {
                           Ext.Msg.alert('Success', action.result.msg);
                           
                           //AddEditEventWindow.hide();
                           //Ext.getCmp('eventsgrid').getStore().reload();
                           //Ext.getCmp('MembershipPlangrid').MembershipPlanstore.reload();
                           //MembershipPlanstore.load();
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
Ext.define('MembershipPlansGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.MembershipPlansgrid',

    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],

    initComponent: function(){

        this.editing = Ext.create('Ext.grid.plugin.CellEditing');

        Ext.apply(this, {
            iconCls: 'icon-grid',
            id: 'MembershipPlansgrid',
            frame: true,
            plugins: [this.editing],
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
                ]
            }],
            columns: [{
                text: 'ID',
                width: 40,
                sortable: true,
                dataIndex: 'id'
            }, {
                header: 'Title',                
                sortable: true,
                dataIndex: 'title',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Number',
                flex: 1,
                sortable: true,
                dataIndex: 'number',
                field: {
                    type: 'textfield'
                }            
            }, {
                header: 'Price',
                flex: 1,
                sortable: true,
                dataIndex: 'price',
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
                    ['Active','Active'],
                    ['Inactive','Inactive']
                ],
                lazyRender: true,
                listClass: 'x-combo-list-small'
            }

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
        
        showAddMembershipPlans();        
        
    },
    
    onEditClick: function(){       
        
        //showEditEvents();
        var sel = this.getView().getSelectionModel().getSelection()[0];
        if (typeof(sel) != 'undefined') {            
            
            EditMembershipPlansForm.loadRecord(sel);            
            showEditMembershipPlans();         
        }        
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ext.define('MembershipPlansModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    },  'title', 'number', 'price', 'status'],
    validations: [{
        type: 'length',
        field: 'title',
        min: 1
    }, {
        type: 'length',
        field: 'number',
        min: 1
    }, {
        type: 'length',
        field: 'price',
        min: 1
    }, {
        type: 'length',
        field: 'status',
        min: 1
    }]
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ext.require([
    'Ext.data.*',
    'Ext.tip.QuickTipManager',
    'Ext.window.MessageBox'
]);