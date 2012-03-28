//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
AddOrgnizationForm = Ext.create('Ext.form.Panel', {   
    activeRecord: null,
    iconCls: 'icon-user',
    frame: true,
    title: 'Add Orgnization',
    id: 'addorganizations',
    name: 'addorganizations',
    defaultType: 'textfield',
    bodyPadding: 5,
    fieldDefaults: {
        anchor: '100%',
        labelAlign: 'right'
    },
    items :[
    {
        xtype: 'filefield',
        fieldLabel: 'Organization Logo',
        name: 'organization_logo',
        allowBlank: false,
        
    }, {
        fieldLabel: 'Organization Name',
        name: 'organization_name',
        allowBlank: false,
        
    }, {
        xtype: 'htmleditor',
        fieldLabel: 'Organization Description',
        name: 'organization_description',
        allowBlank: false                    
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
                        
                        url:'/admin/organizations/create',
                        submitEmptyText: false,
                        waitMsg: 'Saving Data...',
                        
                        success: function(form, action) {
                           AddOrgnizationWindow.hide();
                           OrgnizationsStore.load();  
                           form.reset();
                           //Ext.Msg.alert('Success', action.result.msg);                          
                           
                        },
                 
                        failure: function(form, action) { alert('eeeeeeeeeeeeeeeeeeee');
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
EditOrgnizationForm = Ext.create('Ext.form.Panel', {   
    activeRecord: null,
    iconCls: 'icon-user',
    frame: true,
    title: 'Edit Orgnization111',
    id: 'editorganizations',
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
    },
    {
        xtype   :   'hidden',
        name    :   'organization_logo_old',
        id      :   'organization_logo_old'                
    },
    {
        xtype: 'filefield',
        fieldLabel: 'Organization Logo',
        name: 'organization_logo',
        allowBlank: false,
        
    }, {
        fieldLabel: 'Organization Name',
        name: 'organization_name',
        allowBlank: false,
        
    }, {
        xtype: 'htmleditor',
        fieldLabel: 'Organization Description',
        name: 'organization_description',
        allowBlank: false                    
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
                        url:'/admin/organizations/update',
                        submitEmptyText: false,
                        waitMsg: 'Saving Data...',
                        
                        success: function(form, action) {
                           EditOrgnizationWindow.hide();
                           OrgnizationsStore.load();  
                           form.reset();
                           //Ext.Msg.alert('Success', action.result.msg);                           
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
Ext.define('OrgnizationsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.organizationsgrid',

    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],

    initComponent: function(){
        
        this.editing = Ext.create('Ext.grid.plugin.CellEditing');
        
        Ext.apply(this, {
            iconCls: 'icon-grid',
            id: 'organizationsgrid',
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
                },
                '->',
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
                dataIndex: 'id'
            }, {
                header: 'Orgnization Name',
                width: 200,
                sortable: true,
                dataIndex: 'organization_name',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Orgnization Description',
                width: 300,
                sortable: true,
                dataIndex: 'organization_description',
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
    
    
    onExportClick: function(){        
        Ext.Ajax.request({
            url:'/admin/organizations/exportexcel',
            method:'POST',            
            success:function(response){
                if(response.responseText)
                {
                    var redirect = '/admin/organizations/download?file='+response.responseText;
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
        showAddOrgnization();        
        
    },
    
    onEditClick: function(){       
        
        //showEditEvents();
        var sel = this.getView().getSelectionModel().getSelection()[0];
        if (typeof(sel) != 'undefined') {            
            console.log(sel);
            console.log(sel.store.data.items[0].data.organization_logo);
            EditOrgnizationForm.loadRecord(sel);
            Ext.getCmp('organization_logo_old').setValue(sel.store.data.items[0].data.organization_logo);     
                        
            showEditOrgnization();         
        }        
    }
});

Ext.define('OrgnizationsModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'coid', 'mid', 'organization_logo', 'organization_name', 'organization_description', 'show_facebook', 'facebook', 'show_twitter', 'twitter_type', 'twitter', 'status', 'date_created' ],
    validations: [{
        type: 'length',
        field: 'organization_name',
        min: 1
    }, {
        type: 'length',
        field: 'organization_description',
        min: 1
    }, {
        type: 'length',
        field: 'status',
        min: 1
    }]
});

Ext.require([
    'Ext.data.*',
    'Ext.tip.QuickTipManager',
    'Ext.window.MessageBox'
]);