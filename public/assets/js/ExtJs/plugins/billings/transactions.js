///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
Ext.define('BillingTransactionsGrid', {
        extend: 'Ext.grid.Panel',
        alias: 'widget.BillingTransactionsgrid',

        requires: ['Ext.grid.plugin.CellEditing', 'Ext.form.field.Text', 'Ext.toolbar.TextItem'],

        initComponent: function ()
        {

                this.editing = Ext.create('Ext.grid.plugin.CellEditing');

                Ext.apply(this, {
                        iconCls: 'icon-grid',
                        frame: true,

                        columns: [
                        {
                                text: 'ID',
                                width: 40,
                                sortable: true,
                                dataIndex: 'id'
                        }, {
                                header: 'Event Title',
                                flex:   1,
                                sortable: true,
                                dataIndex: 'title',
                                field: {
                                        type: 'textfield'
                                }
                        }, {
                                header: 'Total Quantity',
                                width: 100,
                                sortable: true,
                                dataIndex: 'total_quantity',
                                field: {
                                        type: 'textfield'
                                }
                        }, {
                                header: 'Total Amount',
                                width: 100,
                                sortable: true,
                                dataIndex: 'total_amount',
                                field: {
                                        type: 'textfield'
                                }
                        }, {
                                header: 'Order Date',
                                width: 150,
                                sortable: true,
                                dataIndex: 'order_date',
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
                                    tooltip: 'View Transaction Details',
                                    handler: function(grid, rowIndex, colIndex) {                                               
                                        var row = grid.getStore().getAt(rowIndex);
                                        var tid = row.get('id');        
                                        showBillingTransactionDetailsListing(tid);                   
                                        
                                    }
                                }]
                        }]
                });
                this.callParent();
                this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
        }
        
});

Ext.define('BillingTransactionsModel', {
        extend: 'Ext.data.Model',
        fields: [
        {
                name: 'id',
                type: 'int',
                useNull: true
        }, 'title', 'start_date', 'oid', 'start_date', 'total_quantity', 'total_amount', 'order_date'],
        validations: [
        {
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

Ext.require(['Ext.data.*', 'Ext.tip.QuickTipManager', 'Ext.window.MessageBox']);