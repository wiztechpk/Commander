function showEventTicketsListing(eid)
{
	Ext.define('EventTicketsForm', {
		extend: 'Ext.form.Panel',
		alias: 'widget.eventticketsform',

		requires: ['Ext.form.field.Text'],

		initComponent: function ()
		{
			this.addEvents('create');
			Ext.apply(this, {
				activeRecord: null,
				iconCls: 'icon-user',
				frame: true,
				title: 'Tickets',
				defaultType: 'textfield',
				bodyPadding: 5,
				fieldDefaults: {
					anchor: '100%',
					labelAlign: 'right'
				},
				items: [
                {
                    xtype   :   'hidden',
                    name    :   'eid',
                    id      :   'eid',
                    dataIndex:  'eid'                
                }, {
                    xtype   :   'hidden',
                    name    :   'id',
                    id      :   'id',
                    dataIndex:  'id'                
                }, {
					fieldLabel: 'Ticket Title',
					name: 'ticket_title',
					allowBlank: false
				}, {
					fieldLabel: 'Ticket Quantity',
					name: 'ticket_quantity',
					allowBlank: false
				}, {
					fieldLabel: 'Ticket Price',
					name: 'ticket_price',
					allowBlank: false
				}, {

					xtype: 'combo',
					store: [
						['Active', 'Active'],
						['Inactive', 'Inactive']
					],
					mode: 'local',
					fieldLabel: 'Status',
					name: 'ticket_status',
					displayField: 'status',
					valueField: 'id'
				}],
				dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'bottom',
					ui: 'footer',
					items: ['->', {
						iconCls: 'icon-save',
						itemId: 'save',
						text: 'Save',
						disabled: true,
						scope: this,
						handler: this.onSave
					}, {
						iconCls: 'icon-user-add',
						text: 'Create',
						scope: this,
						handler: this.onCreate
					}, {
						iconCls: 'icon-reset',
						text: 'Reset',
						scope: this,
						handler: this.onReset
					}]
				}]
			});
			this.callParent();
		},

		setActiveRecord: function (record)
		{
			this.activeRecord = record;
			if (record)
			{
				this.down('#save').enable();
				this.getForm().loadRecord(record);
			}
			else
			{
				this.down('#save').disable();
				this.getForm().reset();
			}
		},

		onSave: function ()
		{
			var active = this.activeRecord,
				form = this.getForm();

			if (!active)
			{
				return;
			}
			if (form.isValid())
			{
				form.updateRecord(active);
				this.onReset();
			}
		},

		onCreate: function ()
		{

			var form = this.getForm();

			if (form.isValid())
			{
				this.fireEvent('create', this, form.getValues());
				form.reset();
			}

		},

		onReset: function ()
		{
			this.setActiveRecord(null);
			this.getForm().reset();
		}
	});

	Ext.define('EventTicketsGrid', {
		extend: 'Ext.grid.Panel',
		alias: 'widget.eventticketsgrid',

		requires: ['Ext.grid.plugin.CellEditing', 'Ext.form.field.Text', 'Ext.toolbar.TextItem'],

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
						iconCls: 'icon-add',
						text: 'Add',
						scope: this,
						handler: this.onAddClick
					}, {
						iconCls: 'icon-delete',
						text: 'Delete',
						disabled: true,
						itemId: 'delete',
						scope: this,
						handler: this.onDeleteClick
					}, '->', {
						iconCls: 'icon-export',
						text: 'Export',
						itemId: 'export',
						scope: this,
						handler: this.onExportClick
					}]
				}],
				columns: [
				{
					text: 'ID',
					width: 40,
					sortable: true,
					dataIndex: 'id'
				}, {
					header: 'Ticket Title',
					flex: 1,
					sortable: true,
					dataIndex: 'ticket_title',
					field: {
						type: 'textfield'
					}
				}, {
					header: 'Ticket Quantity',
					width: 100,
					sortable: true,
					dataIndex: 'ticket_quantity',
					field: {
						type: 'textfield'
					}
				}, {
					header: 'Ticket Sold',
					width: 100,
					sortable: true,
					dataIndex: 'ticket_sold',
					field: {
						type: 'textfield'
					}
				}, {
					header: 'Ticket Price',
					width: 100,
					sortable: true,
					dataIndex: 'ticket_price',
					field: {
						type: 'textfield'
					}
				}, {
					xtype: 'actioncolumn',
					width: 100,
					items: [
					{
						icon: '/assets/images/attendee_list.png',
						// Use a URL in the icon config
						width: 16,
						height: 16,
						align: 'right',
						margin: '5 5 5 5',
						tooltip: 'Event Attende',
						handler: function (grid, rowIndex, colIndex)
						{
							var row = grid.getStore().getAt(rowIndex);
							var eid = row.get('eid');
							var tid = row.get('tid');
							showEventAttendeesListing(eid, tid);

						}
					}, {
						icon: '/assets/images/group_invitation_icon.png',
						// Use a URL in the icon config
						tooltip: 'View Ticket',
						handler: function (grid, rowIndex, colIndex)
						{
							var row = grid.getStore().getAt(rowIndex);
							showViewTicket();

							//alert("Sell " + row.get('id'));
						}
					}, {
						icon: '/assets/images/group_invitation_icon.png',
						// Use a URL in the icon config
						tooltip: 'Sell Tickets',
						handler: function (grid, rowIndex, colIndex)
						{
							var row = grid.getStore().getAt(rowIndex);
							showSellTickets();

							//alert("Sell " + row.get('id'));
						}
					}]
				}]
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
				url: '/admin/tickets/exportexcel',
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

			var rec = new EventTicketsModel(
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

	Ext.define('EventTicketsModel', {
		extend: 'Ext.data.Model',
		fields: [
		{
			name: 'id',
			type: 'int',
			useNull: true
		}, 'tid', 'eid', 'ticket_title', 'ticket_quantity', 'ticket_sold', 'ticket_price_type', 'ticket_start_sale_date', 'ticket_start_sale_time', 'ticket_end_sale_date', 'ticket_end_sale_time', 'ticket_min_order', 'ticket_max_order', 'ticket_price', 'ticket_status'],
		validations: [
		{
			type: 'length',
			field: 'ticket_title',
			min: 1
		}, {
			type: 'length',
			field: 'ticket_quantity',
			min: 1
		}, {
			type: 'length',
			field: 'ticket_price',
			min: 1
		}, {
			type: 'length',
			field: 'ticket_status',
			min: 1
		}]
	});



	var EventTicketsStore = Ext.create('Ext.data.Store', {
		model: 'EventTicketsModel',
		autoLoad: true,
		autoSync: true,
		proxy: {
			type: 'ajax',
			api: {
				read: '/admin/restfull/eventticketsview/?eid=' + eid,
				create: '/admin/restfull/eventticketscreate/',
				update: '/admin/restfull/eventticketsupdate/',
				destroy: '/admin/restfull/eventticketsdestroy/'
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


	var EventEventTicketsTabs = new Ext.TabPanel(
	{
		id: 'ticketscentertabs',
		region: 'center',
		activeTab: 0,
		margins: '5 5 5 5',
		resizeTabs: true,
		// turn on tab resizing
		minTabWidth: 115,
		items: [
		{
			itemId: 'eventticketsgrid',
			xtype: 'eventticketsgrid',
			title: 'Tickets List',
			flex: 1,
			store: EventTicketsStore,
			listeners: {
				selectionchange: function (selModel, selected)
				{
					tabs.child('#form').setActiveRecord(selected[0] || null);
				}
			}
		}, {
			itemId: 'eventticketsform',
			xtype: 'eventticketsform',
			margins: '0 0 0 0',
			listeners: {
				create: function (form, data)
				{
					EventTicketsStore.insert(0, data);
				}
			}
		}]
	});





	EventTicketsListing = Ext.create('widget.window', {
		title: 'Tickets List',
		closable: true,
		closeAction: 'destroy',

		//animateTarget: this,
		width: 600,
		height: 350,
		layout: 'border',
		bodyStyle: 'padding: 5px;',
		items: [EventEventTicketsTabs]
	});







	EventTicketsListing.show();
}