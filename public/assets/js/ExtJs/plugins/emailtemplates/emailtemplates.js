//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var AddEmailTemplateForm = Ext.create('Ext.form.Panel', {   
    activeRecord: null,
    iconCls: 'icon-user',
    frame: true,
    title: 'Add EmailTemplate',
    id: 'addemailtemplate',
    defaultType: 'textfield',
    bodyPadding: 5,
    fieldDefaults: {
        anchor: '100%',
        labelAlign: 'right'
    },
    items   : [            
            {
                fieldLabel: 'Subject',
                name: 'subject',
                allowBlank: false,
                
            },{
                xtype: 'htmleditor',
				fieldLabel: 'Message',
                name: 'message',
                allowBlank: false,
                
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
                        url:'/admin/emailtemplates/create',
                        submitEmptyText: false,
                        waitMsg: 'Saving Data...',
                        
                        success: function(form, action) {
                           Ext.Msg.alert('Success', action.result.msg);
                                                      
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
var EditEmailTemplateForm = Ext.create('Ext.form.Panel', {   
    activeRecord: null,
    iconCls: 'icon-user',
    frame: true,
    title: 'Edit EmailTemplate',
    id: 'editemailtemplate',
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
            },{
                fieldLabel: 'Subject',
                name: 'subject',
                allowBlank: false,
                
            },{
                xtype: 'htmleditor',
				fieldLabel: 'Message',
                name: 'message',
                allowBlank: false,
                
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
                        url:'/admin/emailtemplates/update',
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
Ext.define('EmailTemplatesGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.emailtemplatesgrid',

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
                }]
            }],
            columns: [{
                text: 'ID',
                width: 40,
                sortable: true,
                dataIndex: 'id'
            }, {
                header: 'Subject',
                width: 250,
                sortable: true,
                dataIndex: 'subject',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Message',
                flex:   1,
                sortable: true,
                dataIndex: 'message',
                field: {
                    type: 'textfield'
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
        
        showAddEmailTemplate();        
        
    },
    
    onEditClick: function(){       
        
        //showEditEvents();
        var sel = this.getView().getSelectionModel().getSelection()[0];
        if (typeof(sel) != 'undefined') {            
            
            EditEmailTemplateForm.loadRecord(sel);            
            showEditEmailTemplate();         
        }        
    }
});

Ext.define('EmailTemplatesModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'subject', 'message'],
    validations: [{
        type: 'length',
        field: 'subject',
        min: 1
    }, {
        type: 'length',
        field: 'message',
        min: 1
    }]
});

Ext.require([
    'Ext.data.*',
    'Ext.tip.QuickTipManager',
    'Ext.window.MessageBox'
]);