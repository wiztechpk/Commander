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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
AddCoordinatorsForm = Ext.create('Ext.form.Panel', {   
    activeRecord    :   null,
    iconCls         :   'icon-user',
    frame           :   true,
    title           :   'Add Coordinator',
    id              :   'addcoordinator',
    defaultType     :   'textfield',
    bodyPadding     :   5,
    fieldDefaults   :   {
        anchor      :   '100%',
        labelAlign  :   'right'
    },
    items           : [            
    new Ext.form.ComboBox ({
        fieldLabel  :   'Membership',
        anchor      :   '100%',
        name        :   'membership_id',
        title       :   'Select Membership',
        store       :   membershipsstore,
        autoShow    :   true,
        displayField:   'title',
        valueField  :   'id',
        triggerAction:  'all',
        id          :   'membership_id'
                                       
    }),
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
    },{
        fieldLabel: 'Password',
        name: 'password',
        inputType: 'password',
        allowBlank: false        
    }, {

        xtype: 'combo',
        store: [
               ['Active','Active'],
               ['Inactive','Inactive']
        ],
        mode: 'local',
        fieldLabel: 'Status',
        name: 'status',                
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
                        url:'/admin/coordinators/create',
                        submitEmptyText: false,
                        waitMsg: 'Saving Data...',
                        
                        success: function(form, action) {
                           AddCoordinatorsWindow.hide();
                           CoordinatorsStore.load();  
                           form.reset();                           
                           //Ext.Msg.alert('Success', action.result.msg);                           
                        },
                 
                        failure: function(form, action) {
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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
EditCoordinatorsForm = Ext.create('Ext.form.Panel', {   
    activeRecord    :   null,
    iconCls         :   'icon-user',
    frame           :   true,
    title           :   'Edit Coordinator',
    id              :   'editcoordinator',
    defaultType     :   'textfield',
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
    },
    new Ext.form.ComboBox ({
        fieldLabel  :   'Membership',
        anchor      :   '100%',
        name        :   'membership_id',
        title       :   'Select Membership',
        store       :   membershipsstore,
        autoShow    :   true,
        displayField:   'title',
        valueField  :   'id',
        triggerAction:  'all',
        id          :   'membership_id'
                                       
    }),
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
    },{
        fieldLabel: 'Password',
        name: 'password',
        inputType: 'password',
        allowBlank: false        
    }, {

        xtype: 'combo',
        store: [
               ['Active','Active'],
               ['Inactive','Inactive']
        ],
        mode: 'local',
        fieldLabel: 'Status',
        name: 'status',                
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
                        url:'/admin/coordinators/update',
                        submitEmptyText: false,
                        waitMsg: 'Saving Data...',
                        
                        success: function(form, action) {
                           EditCoordinatorsWindow.hide();
                           CoordinatorsStore.load();  
                           form.reset();
                           //Ext.Msg.alert('Success', action.result.msg);                           
                        },
                 
                        failure: function(form, action) {
                           EditCoordinatorsWindow.hide();
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
Ext.define('CoordinatorsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.coordinatorsgrid',

    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],

    initComponent: function(){

        this.editing = Ext.create('Ext.grid.plugin.CellEditing');

        Ext.apply(this, {
            iconCls: 'icon-grid',
            id: 'coordinatorsgrid',
            name: 'coordinatorsgrid',
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
                header  :   'Membership',
                flex    :   1,     
                sortable:   true,
                dataIndex:  'membership',
                field: {
                xtype: 'combobox',
                typeAhead: true,
                triggerAction: 'all',
                selectOnTab: true,
                store: membershipsstore,
                displayField: 'title',
                valueField: 'id',
                name: 'membership',                       
                lazyRender: true,
                listClass: 'x-combo-list-small'
                }
            }, {
                header: 'First Name',
                width: 100,
                sortable: true,
                dataIndex: 'first_name',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Last Name',
                width: 100,
                sortable: true,
                dataIndex: 'last_name',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Email',
                flex: 1,
                sortable: true,
                dataIndex: 'email',
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

            }, {
                xtype: 'actioncolumn',
                width: 100,
                items: [
                {
                    icon   : '/assets/images/coins.png',  // Use a URL in the icon config
                    width  : 16,
                    height : 16, 
                    align  : 'right',
                    margin : '5 5 5 5',
                    tooltip: 'Coordinator Transactions',
                    handler: function(grid, rowIndex, colIndex) {                                               
                        var row = grid.getStore().getAt(rowIndex);
                        var sel = row.get('id');  
                        
                        showBillingTransactionsListing(sel);                   
                        
                    }
                }, {
                    icon   : '/assets/images/organizations.png',  // Use a URL in the icon config
                    width  : 16,
                    height : 16, 
                    align  : 'right',
                    margin : '5 5 5 5',
                    tooltip: 'Orgnizations',
                    handler: function(grid, rowIndex, colIndex) {                                               
                        var row     =   grid.getStore().getAt(rowIndex);
                        var coid    =   row.get('id');                                                              
                        showOrgnizationsListing(coid);
                        
                    }
                }, {
                    icon   : '/assets/images/subcoordinators.png',  // Use a URL in the icon config
                    width  : 16,
                    height : 16, 
                    align  : 'right',
                    margin : '5 5 5 5',
                    tooltip: 'Orgnizations',
                    handler: function(grid, rowIndex, colIndex) {                                               
                        var row = grid.getStore().getAt(rowIndex);
                        var sel = row.get('id');  
                        
                        showEventSubCoOrdinators(sel);                                                                                                
                        //showSubCoordinatorsListing(coid)                                         
                        //showOrgnizationsListing(sel);
                        
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
        
        showAddCoordinator();        
        
    },
    
    onEditClick: function(){       
        
        //showEditEvents();
        var sel = this.getView().getSelectionModel().getSelection()[0];
        if (typeof(sel) != 'undefined') {            
            
            EditCoordinatorsForm.loadRecord(sel);            
            showEditCoordinator();         
        }        
    }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ext.define('CoordinatorsPortalGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.coordinatorsportalgrid',

    requires: [
        'Ext.grid.plugin.CellEditing',
        'Ext.form.field.Text',
        'Ext.toolbar.TextItem'
    ],

    initComponent: function(){

        this.editing = Ext.create('Ext.grid.plugin.CellEditing');

        Ext.apply(this, {
            iconCls: 'icon-grid',
            id: 'coordinatorsportalgrid',
            name: 'coordinatorsportalgrid',
            frame: true,            
            columns: [{
                text: 'ID',
                width: 40,
                sortable: true,
                dataIndex: 'id'
            }, {
                header: 'First Name',
                width: 100,
                sortable: true,
                dataIndex: 'first_name',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Last Name',
                width: 100,
                sortable: true,
                dataIndex: 'last_name',
                field: {
                    type: 'textfield'
                }
            }, {
                header: 'Email',
                flex: 1,
                sortable: true,
                dataIndex: 'email',
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
        
        showAddCoordinator();        
        
    },
    
    onEditClick: function(){       
        
        //showEditEvents();
        var sel = this.getView().getSelectionModel().getSelection()[0];
        if (typeof(sel) != 'undefined') {            
            
            EditCoordinatorForm.loadRecord(sel);            
            showEditCoordinator();         
        }        
    }
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ext.define('CoordinatorsModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'membership', 'membership_id', 'first_name', 'last_name', 'email', 'status','organization_name'],
    validations: [{
        type: 'length',
        field: 'first_name',
        min: 1
    }, {
        type: 'length',
        field: 'last_name',
        min: 1
    }, {
        type: 'email',
        field: 'email',
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