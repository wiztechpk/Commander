//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
AddEventCategoriesForm = Ext.create('Ext.form.Panel', {   
    activeRecord    :   null,
    iconCls         :   'icon-user',
    frame           :   true,
    title           :   'Add Event Category',
    id              :   'AddEventCategories',
    defaultType     :   'textfield',
    bodyPadding     :   5,
    fieldDefaults   :   {
        anchor      :   '100%',
        labelAlign  :   'right'
    },
    items           :   [{
        fieldLabel  :       'Category Name',
        name        :       'category',
        allowBlank  :       false
        
    }],
    buttons: [
        {
            text   : 'Create',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit
                    ({
                        url:'/admin/eventcategories/create',
                        submitEmptyText: false,
                        waitMsg: 'Saving Data...',
                        
                        success: function(form, action) {
                           AddEventCategoriesWindow.hide();
                           EventCategoriesStore.load();  
                           form.reset();                         
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
EditEventCategoriesForm = Ext.create('Ext.form.Panel', {   
    activeRecord    :   null,
    iconCls         :   'icon-user',
    frame           :   true,
    title           :   'Edit Event Category',
    id              :   'EditEventCategories',
    defaultType     :   'textfield',
    bodyPadding     :   5,
    fieldDefaults   :   {
        anchor      :   '100%',
        labelAlign  :   'right'
    },
    items           :   [
    {
        xtype       :   'hidden',
        name        :   'id',
        id          :   'id'                
    }, {
        fieldLabel  :   'Category Name',
        name        :   'category',
        allowBlank  :   false
        
    }],
    buttons: [
        {
            text   : 'Save',
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit
                    ({
                        url:'/admin/eventcategories/update',
                        submitEmptyText: false,
                        waitMsg: 'Saving Data...',
                        
                        success: function(form, action) {                           
                           EditEventCategoriesWindow.hide();
                           EventCategoriesStore.load();
                           form.reset();                           
                        },
                 
                        failure: function(form, action) {
                           EditEventCategoriesWindow.hide();
                           //Ext.Msg.alert('Failure', action.result.msg);
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
Ext.define('EventCategoriesGrid', {
    extend  :   'Ext.grid.Panel',
    alias   :   'widget.eventcategoriesgrid',

    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],

    initComponent: function(){

        this.editing = Ext.create('Ext.grid.plugin.CellEditing');

        Ext.apply(this, {
            iconCls :   'icon-grid',
            id      :   'eventcategoriesgrid',
            name    :   'eventcategoriesgrid',
            frame   :   true,
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
                width: 100,
                sortable: true,
                dataIndex: 'id'
            }, {
                header: 'Category Name',
                width: 300,
                flex: 1 ,
                sortable: true,
                dataIndex: 'category',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Status',
                width: 300,
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

            }, {
                header: 'Date Created',
                width: 300,
                sortable: true,
                dataIndex: 'date_created',
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
    
    
    onExportClick: function(){        
        Ext.Ajax.request({
            url:'/admin/coordinators/exportexcel',
            method:'POST',            
            success:function(response){
                if(response.responseText)
                {
                    var redirect = '/admin/coordinators/download?file='+response.responseText;
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
        
        showAddEventCategories();        
        
    },
    
    onEditClick: function(){       
        
        //showEditEvents();
        var sel = this.getView().getSelectionModel().getSelection()[0];
        if (typeof(sel) != 'undefined') {            
            
            EditEventCategoriesForm.loadRecord(sel);            
            showEditEventCategories();         
        }        
    }
});

Ext.define('EventCategoriesModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'parent_id', 'category', 'status', 'date_created'],
    validations: [{
        type: 'length',
        field: 'category',
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