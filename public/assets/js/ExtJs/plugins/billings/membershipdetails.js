///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showMembershipDetailsListing(tid)
{

	Ext.define('MembershipDetailsGrid', {
		extend: 'Ext.grid.Panel',
		alias: 'widget.MembershipDetailsgrid',

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
					header: 'Attende Name',
					width: 100,
					sortable: true,
					dataIndex: 'attende_name',
					field: {
						type: 'textfield'
					}}, {
					header: 'Attende Email',
					width: 100,
					sortable: true,
					dataIndex: 'attende_email',
					field: {
						type: 'textfield'
					}}, {
					header: 'Attende Cell phone',
					width: 100,
					sortable: true,
					dataIndex: 'attende_cell_phone',
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
		},

		onSelectChange: function (selModel, selections)
		{
			this.down('#delete').setDisabled(selections.length === 0);
		},

		onExportClick: function ()
		{
			//alert('asdasdasd');
			Ext.Ajax.request(
			{
				url: '/admin/MembershipDetails/exportexcel',
				method: 'POST',
				success: function (response)
				{
					//obj = Ext.util.JSON.decode(response.responseText);
					if (response.responseText)
					{
						var redirect = '/admin/tickets/download?file=' + response.responseText;
						window.location = redirect;
					}
					else
					{
						Ext.Msg.alert('There seems to be a problem');
					}


					//alert(response.responseText);
					//alert(response.responseText.toString());                
				},
				failure: function ()
				{
					Ext.Msg.alert('There seems to be a problem');
				}
			});

		},

		onDeleteClick: function ()
		{
			var selection = this.getView().getSelectionModel().getSelection()[0];
			if (selection)
			{
				this.store.remove(selection);
			}
		},

		onAddClick: function ()
		{

			var rec = new MembershipDetailsModel(
			{
				full_name: '',
				last_name: '',
				email: ''
			}),
				edit = this.editing;

			edit.cancelEdit();
			this.store.insert(0, rec);
			edit.startEditByPosition(
			{
				row: 0,
				column: 1
			});
		}
	});

	Ext.define('MembershipDetailsModel', {
		extend: 'Ext.data.Model',
		fields: [
		{
			name: 'tid',
			type: 'int',
			useNull: true}, 'oid', 'otid', 'odid', 'ticket_title', 'ticket_price', 'attende_name', 'attende_email', 'attende_cell_phone', 'order_date'],
		validations: [
		{
			type: 'length',
			field: 'ticket_title',
			min: 1}]
	});



	MembershipDetailsStore = Ext.create('Ext.data.Store', {
		model: 'MembershipDetailsModel',
		autoLoad: true,
		autoSync: true,
		proxy: {
			type: 'ajax',
			api: {
				read:       '/admin/restfull/Membershipdetailsview/?tid=' + tid ,
				create:     '/admin/restfull/Membershipdetailscreate/',
				update:     '/admin/restfull/Membershipdetailsupdate/',
				destroy:    '/admin/restfull/Membershipdetailsdestroy/'
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


	MembershipDetailsListingWindow = Ext.create('widget.window', {
		title: 'Event Attendees List',
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
			itemId: 'MembershipDetailsgrid',
			xtype: 'MembershipDetailsgrid',
			title: 'Event Attendees List',
			flex: 1,
			store: MembershipDetailsStore,
			listeners: {
				selectionchange: function (selModel, selected)
				{
					tabs.child('#form').setActiveRecord(selected[0] || null);
				}
			}}

		]
	});

	MembershipDetailsListingWindow.show();

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////