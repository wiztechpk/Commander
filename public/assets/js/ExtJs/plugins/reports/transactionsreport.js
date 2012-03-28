//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var coordinatorsstore = new Ext.data.JsonStore({
    // store configs 
    autoDestroy: true,
    storeId: 'coordinators',

    proxy: {
        type: 'ajax',
        url: '/admin/coordinators/view',
        reader: {
            type: 'json',
            root: 'data',
            idProperty: 'id'
        }
    },

    //alternatively, a Ext.data.Model name can be given (see Ext.data.Store for an example)
    fields: ['id', 'first_name', 'last_name','name' ]
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var eventscoordinatorsstore = new Ext.data.JsonStore({
    // store configs 
    autoDestroy: true,
    storeId: 'eventscoordinatorsstore',

    proxy: {
        type: 'ajax',
        url: '/admin/events/eventscoordinators/',
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
var TransactionsReportWindow;

var resultsPanel;
var filterPanel;
var chartPanel;
var BChart;



function ShowTransactionsReport()
{ 
    
    var transactionsreportdatastore = new Ext.data.JsonStore({
		// store configs 
		autoDestroy: true,
		storeId: 'transactionsreportdatastore',
		proxy: {
			type: 'ajax',
			url: '/admin/reports/transactionsreportdata',
			reader: {
				type: 'json',
				root: 'result',
				idProperty: 'month'
			}
		},    
		//alternatively, a Ext.data.Model name can be given (see Ext.data.Store for an example)
		fields: [
				{name: 'month'},
				{name: 'data'}				
		]     
	});
    transactionsreportdatastore.load();
    
    filterPanel = Ext.create('Ext.form.Panel', { 
        frame: true,        
        id: 'filterPanel',
        defaultType: 'textfield',
        bodyPadding: 5,
        fieldDefaults: {
            anchor: '100%',
            labelAlign: 'right'
        },
        items   : [            
        new Ext.form.ComboBox ({
            fieldLabel  :   'Co-Ordinators',
            anchor      :   '100%',
            name        :   'coordinator',
            hiddenName  :   'coordinator',
            hiddenValue :   '0',
            id          :   'coordinator',
            title       :   'Select Co Ordinator',
            store       :   coordinatorsstore,
            autoShow    :   true,
            displayField:   'name',
            valueField  :   'id',
            triggerAction:  'all',                          
            listeners: {
                select: function() {                                        
                    selected    =   this.value;
                                        
                    if(selected > 0)
                    {                        
                        Ext.getCmp('event_id').store.load({params: {coordinator: selected}});                                               
                    }                   
                    
                }
            }         
            
                                           
        }),
        new Ext.form.ComboBox ({            
            fieldLabel  :   'Events',
            anchor      :   '100%',
            name: 'event_id',
            id: 'event_id',
            title: 'Select Event',
            store: eventscoordinatorsstore,
            autoShow: true,
            displayField: 'title',
            valueField: 'id',
            triggerAction: 'all',                                                           
        }),
        {
            xtype: 'datefield',
            id: 'start_date',
            name: 'start_date',
            format: 'd-m-Y',
            fieldLabel: 'Start date',
            
        }, {
            xtype: 'datefield',
            id: 'end_date',
            name: 'end_date',
            format: 'd-m-Y',
            fieldLabel: 'End date',
            
        }        
        ],
        buttons: [
            {
                text   : 'Go',
                handler: function() {
                    var form = this.up('form').getForm();
                    if (form.isValid()) {
                        
                        if(Ext.getCmp("filterPanel").getForm().findField("coordinator").getValue())
                        {
                            var coordinator =   Ext.getCmp("filterPanel").getForm().findField("coordinator").getValue();    
                        }
                        else
                        {
                            var coordinator =   ""
                        }
                        
                        
                        if(Ext.getCmp("filterPanel").getForm().findField("event_id").getValue())
                        {
                            var event_id    =   Ext.getCmp("filterPanel").getForm().findField("event_id").getValue();   
                        }
                        else
                        {
                            var event_id    =   "";
                        }
                        
                        if(Ext.getCmp("filterPanel").getForm().findField("start_date").getValue())
                        {
                            var startdate   =   Ext.Date.format(Ext.getCmp("filterPanel").getForm().findField("start_date").getValue(),'d-m-Y');   
                        }
                        else
                        {
                            var startdate   =   "";
                        }
                        
                        if(Ext.getCmp("filterPanel").getForm().findField("end_date").getValue())
                        {
                            var enddate   =   Ext.Date.format(Ext.getCmp("filterPanel").getForm().findField("end_date").getValue(),'d-m-Y');   
                        }
                        else
                        {
                            var enddate   =   "";
                        }                                                                       
                        
                                                                      
                        ShowTransactionsFilterReport(coordinator, event_id, startdate, enddate);                        
                        
                        
                    }
                }
            }            
        ]
    });
    
    
	BChart = Ext.create('Ext.chart.Chart', {
        id:'BChart',
        width: 900,
        height: 400,
        animate: true,        
        shadow: true,
        store: transactionsreportdatastore,

        /*
        animate: true,
        shadow: true,
        theme: 'Category1',
        legend: {
            position: 'right'
        },

        store: Transactionsreportdatastore,
        */
        axes: [
        {
            type: 'Numeric',
            position: 'left',
            fields: ['data'],
            label: {
                renderer: Ext.util.Format.numberRenderer(0)
            },
            title: 'Number of Transactions',
            grid: true,
            
            //roundToDecimal: false
    
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['month'],
            title: 'Month of the Year'
        }
        ],
        series: [{
            type: 'column',
            axis: 'left',
            highlight: true,
            tips: {
              trackMouse: true,
              width: 140,
              height: 28,
              renderer: function(storeItem, item) {
                this.setTitle(storeItem.get('month') + ': ' + storeItem.get('data') + ' Transactions');
              }
            },
            label: {
              display: 'insideEnd',
                field: 'data',
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'horizontal',
                color: '#333',
                'text-anchor': 'middle'
            },
            xField: 'month',
            yField: ['data']
        }]
    });
	
	
    chartPanel = Ext.create('Ext.panel.Panel', {
        id : 'chartPanel',
        width: 900,
        height: 400,
        items:
        [BChart]
        
        
        
    });
    
    resultsPanel = Ext.create('Ext.panel.Panel', {        
        id : 'resultsPanel',
        width: 900,
        height: 500,
        frame    : true,        
        layout: {
            type: 'vbox',       // Arrange child items vertically
            align: 'stretch',    // Each takes up full width
            padding: 5
        },
        items: [filterPanel, {
            xtype: 'splitter'   // A splitter between the two child items
        }, chartPanel ]
    });
    
      
    
	TransactionsReportWindow = Ext.create('Ext.Window', {
        width: 900,
        height: 600,
        hidden: false,
        maximizable: true,
        title: 'Transactions Report',
       
        layout: 'fit',        
        items:
        [
               resultsPanel
        
        ]
        
    });
    
	TransactionsReportWindow.show();
    //Transactionsreportdatastore.load();   
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ShowTransactionsFilterReport(coordinator, event_id, startdate, enddate)
{    
    
    
    var transactionsfilterreportdata = new Ext.data.JsonStore({
		// store configs 
		autoDestroy: true,
		storeId: 'transactionsfilterreportdata',
		proxy: {
			type: 'ajax',
			url: '/admin/reports/transactionsfilterreportdata/?coordinator='+coordinator+'&event_id='+event_id+'&startdate='+startdate+'&enddate='+enddate+' ',
			reader: {
				type: 'json',
				root: 'result',
				idProperty: 'date'
			}
		},    
		//alternatively, a Ext.data.Model name can be given (see Ext.data.Store for an example)
		fields: [
				{name: 'date'},
				{name: 'data'}				
		]     
	});
    transactionsfilterreportdata.load();
        

	var BChart1 = Ext.create('Ext.chart.Chart', {
        id      :   'BChart1',
        width   :   900,
        height  :   400,
        animate :   true,        
        shadow  :   true,
        store   :   transactionsfilterreportdata,
        axes: [
        {
            type: 'Numeric',
            position: 'left',
            fields: ['data'],
            label: {
                renderer: Ext.util.Format.numberRenderer(0)
            },
            title: 'Number of Transactions',
            grid: true,
            
            //roundToDecimal: false
    
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['date'],
            title: 'Dates'
        }
        ],
        series: [{
            type: 'column',
            axis: 'left',
            highlight: true,
            tips: {
              trackMouse: true,
              width: 140,
              height: 28,
              renderer: function(storeItem, item) {
                this.setTitle(storeItem.get('date') + ': ' + storeItem.get('data') + ' views');
              }
            },
            label: {
              display: 'insideEnd',
                field: 'data',
                renderer: Ext.util.Format.numberRenderer('0'),
                orientation: 'horizontal',
                color: '#333',
                'text-anchor': 'middle'
            },
            xField: 'date',
            yField: ['data']
        }]
    });
	
	
    var chartPanle1 = Ext.create('Ext.panel.Panel', {        
        id : 'chartPanel1', 
        width   :   900,
        height  :   500,       
        items:
        [BChart1]
        
        
        
    });
    
    resultsPanel.remove(chartPanel)  
    resultsPanel.add(chartPanle1);
    //resultsPanel.add(panel2);
    
    resultsPanel.doLayout();
    //TransactionsReportWindow.doLayout();  
    
}

/*
var TransactionsReportWindow;
function ShowTransactionsReport()
{	
    var TransactionsReportSore = new Ext.data.JsonStore({
		// store configs 
		autoDestroy: true,
		storeId: 'TransactionsReportSore',
		proxy: {
			type: 'ajax',
			url: '/admin/reports/transactionsreportdata',
			reader: {
				type: 'json',
				root: 'result',
				idProperty: 'month'
			}
		},    
		//alternatively, a Ext.data.Model name can be given (see Ext.data.Store for an example)
		fields: [
				{name: 'month'},
				{name: 'data'}				
		]     
	});
	TransactionsReportSore.load();
	
    TransactionsReportWindow = Ext.create('Ext.Window', {
        width: 800,
        height: 600,
        hidden: false,
        maximizable: true,
        title: 'Transactions Report',
        renderTo: Ext.getBody(),
        layout: 'fit',        
        items: {
            id: 'chartCmp',
            xtype: 'chart',
            style: 'background:#fff',
            animate: true,
            shadow: true,
            store: TransactionsReportSore,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['data'],
                label: {
                    renderer: Ext.util.Format.numberRenderer(0)
                },
                title: 'Number of Transactions',
                grid: true,
                minimum: 0
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['month'],
                title: 'Month of the Year'
            }],
            series: [{
                type: 'column',
                axis: 'left',
                highlight: true,
                tips: {
                  trackMouse: true,
                  width: 140,
                  height: 28,
                  renderer: function(storeItem, item) {
                    this.setTitle(storeItem.get('month') + ': ' + storeItem.get('data') + ' ');
                  }
                },
                label: {
                  display: 'insideEnd',
                  'text-anchor': 'middle',
                    field: 'data',
                    renderer: Ext.util.Format.numberRenderer(0),
                    orientation: 'vertical',
                    color: '#333'
                },
                xField: 'month',
                yField: 'data'
            }]
        }
    });
	TransactionsReportWindow.show();
}*/