///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showBillingInvoiceDetailsListing(tid)
{

	Ext.define('BillingInvoiceDetailsGrid', {
		extend: 'Ext.grid.Panel',
		alias: 'widget.BillingInvoiceDetailsgrid',

		requires: [
			'Ext.grid.plugin.CellEditing',
			'Ext.form.field.Text',
			'Ext.toolbar.TextItem'
			],

		initComponent: function ()
		{

			this.editing = Ext.create('Ext.grid.plugin.CellEditing');

			Ext.apply(this, {
				iconCls: 'icon-grid',
				frame: true,
				plugins: [this.editing],
				dockedItems: [
				{
					xtype: 'toolbar',
					items: [
					{
						iconCls: 'icon-export',
						text: 'Export',
						itemId: 'export',
						scope: this,
						handler: this.onExportClick}]}],
				columns: [
				{
					text: 'ID',
					width: 40,
					sortable: true,
					dataIndex: 'tid'}, {
					header: 'Ticket Title',
					flex: 1,
					sortable: true,
					dataIndex: 'ticket_title',
					field: {
						type: 'textfield'
					}}, {
					header: 'Ticket Price',
					flex: 1,
					sortable: true,
					dataIndex: 'ticket_price',
					field: {
						type: 'textfield'
					}}, {
					header: 'Ticket Quantity',
					width: 100,
					sortable: true,
					dataIndex: 'ticket_quantity',
					field: {
						type: 'textfield'
					}}, {
					header: 'Total Amount',
					width: 100,
					sortable: true,
					dataIndex: 'ticket_total_amount',
					field: {
						type: 'textfield'
					}}, {
					header: 'Order Date',
					width: 100,
					sortable: true,
					dataIndex: 'order_date',
					field: {
						type: 'textfield'
					}}]
			});
			this.callParent();
			this.getSelectionModel().on('selectionchange', this.onSelectChange, this);
		}		
		
	});

	Ext.define('BillingInvoiceDetailsModel', {
		extend: 'Ext.data.Model',
		fields: [
		{
			name: 'tid',
			type: 'int',
			useNull: true}, 'ticket_title', 'ticket_price', 'ticket_quantity', 'ticket_total_amount', 'order_date'],
		validations: [
		{
			type: 'length',
			field: 'ticket_title',
			min: 1}]
	});



	BillingInvoiceDetailsStore = Ext.create('Ext.data.Store', {
		model: 'BillingInvoiceDetailsModel',
		autoLoad: true,
		autoSync: true,
		proxy: {
			type: 'ajax',
			api: {
				read:       '/admin/restfull/invoicedetailsview/?tid=' + tid ,
				create:     '/admin/restfull/invoicedetailscreate/',
				update:     '/admin/restfull/invoicedetailsupdate/',
				destroy:    '/admin/restfull/invoicedetailsdestroy/'
			},
			reader: {
				type: 'json',
				successProperty: 'success',
				root: 'data',
				messageProperty: 'message'
			},
			writer: {
				type: 'json',
				writeAllFields: false,
				root: 'data'
			},
			listeners: {
				exception: function (proxy, response, operation)
				{
					Ext.MessageBox.show(
					{
						title: 'REMOTE EXCEPTION',
						msg: operation.getError(),
						icon: Ext.MessageBox.ERROR,
						buttons: Ext.Msg.OK
					});
				}
			}
		},
		listeners: {
			write: function (proxy, operation)
			{
				if (operation.action == 'destroy')
				{
					tabs.child('#form').setActiveRecord(null);
				}
				Ext.example.msg(operation.action, operation.resultSet.message);
			}
		}
	});


	BillingInvoiceDetailsListingWindow = Ext.create('widget.window', {
		title: 'BillingInvoice Detail',
		width: 800,
		height: 400,
		closable: true,
		closeAction: 'hide',
		layout: 'fit',
		border: false,
		resizable: true,
		modal: true,
		items: [
		{
			itemId: 'BillingInvoiceDetailsgrid',
			xtype: 'BillingInvoiceDetailsgrid',
			title: 'BillingInvoice Detail',
			flex: 1,
			store: BillingInvoiceDetailsStore,
			listeners: {
				selectionchange: function (selModel, selected)
				{
					tabs.child('#form').setActiveRecord(selected[0] || null);
				}
			}}

		]
	});

	BillingInvoiceDetailsListingWindow.show();

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////