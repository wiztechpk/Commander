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
var EventsReportWindow;

var resultsPanel;
var filterPanel;
var chartPanel;
var BChart;
function ShowEventsReport()
{ 
    
    var eventsreportdatastore = new Ext.data.JsonStore({
		// store configs 
		autoDestroy: true,
		storeId: 'eventsreportdatastore',
		proxy: {
			type: 'ajax',
			url: '/admin/reports/eventsreportdata',
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
    eventsreportdatastore.load();
    
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
            name: 'coordinator',
            title: 'Select Co Ordinator',
            store: coordinatorsstore,
            autoShow: true,
            displayField: 'name',
            valueField: 'id',
            triggerAction: 'all',
            id: 'coordinator'
                                           
        }),
        {
            xtype: 'datefield',
            id: 'start_date',
            name: 'start_date',
            format: 'd-m-Y',
            fieldLabel: 'Start date',
            allowBlank: false,
        }, {
            xtype: 'datefield',
            id: 'end_date',
            name: 'end_date',
            format: 'd-m-Y',
            fieldLabel: 'End date',
            allowBlank: false,
        }        
        ],
        buttons: [
            {
                text   : 'Go',
                handler: function() {
                    var form = this.up('form').getForm();
                    if (form.isValid()) {
                        
                        var startdate = Ext.Date.format(Ext.getCmp("filterPanel").getForm().findField("start_date").getValue(),'d-m-Y');                        
                        var enddate   = Ext.Date.format(Ext.getCmp("filterPanel").getForm().findField("end_date").getValue(),'d-m-Y');                                              
                        ShowEventsFilterReport(startdate,enddate);                        
                        
                        
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
        store: eventsreportdatastore,

        /*
        animate: true,
        shadow: true,
        theme: 'Category1',
        legend: {
            position: 'right'
        },

        store: Eventsreportdatastore,
        */
        axes: [
        {
            type: 'Numeric',
            position: 'left',
            fields: ['data'],
            label: {
                renderer: Ext.util.Format.numberRenderer(0)
            },
            title: 'Number of Events',
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
                this.setTitle(storeItem.get('month') + ': ' + storeItem.get('data') + ' Events');
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
    
      
    
	EventsReportWindow = Ext.create('Ext.Window', {
        width: 900,
        height: 600,
        hidden: false,
        maximizable: true,
        title: 'Events Report',
       
        layout: 'fit',        
        items:
        [
               resultsPanel
        
        ]
        
    });
    
	EventsReportWindow.show();
    //Eventsreportdatastore.load();   
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ShowEventsFilterReport(startdate,enddate)
{ 
    
    var eventsfilterreportdata = new Ext.data.JsonStore({
		// store configs 
		autoDestroy: true,
		storeId: 'eventsfilterreportdata',
		proxy: {
			type: 'ajax',
			url: '/admin/reports/eventsfilterreportdata/?startdate='+startdate+'&enddate='+enddate+' ',
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
    eventsfilterreportdata.load();
         

	var BChart1 = Ext.create('Ext.chart.Chart', {
        id      :   'BChart1',
        width   :   900,
        height  :   400,
        animate :   true,        
        shadow  :   true,
        store: eventsfilterreportdata,
        axes: [
        {
            type: 'Numeric',
            position: 'left',
            fields: ['data'],
            label: {
                renderer: Ext.util.Format.numberRenderer(0)
            },
            title: 'Number of Events',
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
                this.setTitle(storeItem.get('name') + ': ' + storeItem.get('data') + ' views');
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
  //EventsReportWindow.doLayout();
  
    
    /*
    var resultsPanel = Ext.create('Ext.panel.Panel', {        
        frame    : true,
        renderTo: 'resultsPanel',        
        layout: {
            type: 'vbox',       // Arrange child items vertically
            align: 'stretch',    // Each takes up full width
            padding: 5
        },
        items: [filterPanel, {
            xtype: 'splitter'   // A splitter between the two child items
        }, chartPanle ]
    });
    */
      
    /*
	EventsReportWindow = Ext.create('Ext.Window', {
        width: 800,
        height: 600,
        hidden: false,
        maximizable: true,
        title: 'Events Report',
       
        layout: 'fit',        
        items:
        [
               resultsPanel
        
        ]
        
    });
    
	EventsReportWindow.show();
    */
}
/*
var EventsReportWindow;
function ShowCoOrdinatordReport()
{
	var EventsReportSore = new Ext.data.JsonStore({
		// store configs 
		autoDestroy: true,
		storeId: 'EventsReportSore',
		proxy: {
			type: 'ajax',
			url: '/admin/reports/Eventsreportdata',
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
	EventsReportSore.load();
	
	
	
	
	EventsReportWindow = Ext.create('Ext.Window', {
        width: 800,
        height: 600,
        hidden: false,
        maximizable: true,
        title: 'Co Ordinators Report',
        renderTo: Ext.getBody(),
        layout: 'fit',        
        items: {
            id: 'chartCmp',
            xtype: 'chart',
            style: 'background:#fff',
            animate: true,
            shadow: true,
            store: EventsReportSore,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['data'],
                label: {
                    renderer: Ext.util.Format.numberRenderer(0)
                },
                title: 'Number of Co Ordinators',
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
                  renderer: function(Eventsreportdatastore, item) {
                    this.setTitle(Eventsreportdatastore.get('month') + ': ' + Eventsreportdatastore.get('data') + ' ');
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
	EventsReportWindow.show();
}
*/