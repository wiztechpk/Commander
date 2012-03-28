//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ext.define('BillingMembershipsGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.BillingMembershipsgrid',

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

Ext.define('BillingMembershipsModel', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'id',
        type: 'int',
        useNull: true
    }, 'title', 'start_date', 'total_quantity', 'total_amount'],
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