//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var CoOrdinatorsReportWindow;

var resultsPanel;
var filterPanel;
var chartPanel;
var BChart;
function ShowCoOrdinatorsReport()
{ 
    
    var coordinatorsreportdatastore = new Ext.data.JsonStore({		 
		autoDestroy   :true,
		storeId: 'coordinatorsreportdatastore',
		proxy: {
			type: 'ajax',
			url: '/admin/reports/coordinatorsreportdata',
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
    
    coordinatorsreportdatastore.load();
    
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
                        ShowCoOrdinatorsFilterReport(startdate,enddate);                        
                        
                        
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
        store: coordinatorsreportdatastore,
        axes: [
        {
            type: 'Numeric',
            position: 'left',
            fields: ['data'],
            minimum: 0,
            grid: true,
            
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            title: 'Number of Co Ordinators',
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
                this.setTitle(storeItem.get('month') + ': ' + storeItem.get('data') + ' CoOrdinators');
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
        items:
        [BChart]
        
        
        
    });
    
    resultsPanel = Ext.create('Ext.panel.Panel', {        
        id          :   'resultsPanel',
        width       :   900,
        height      :   500,
        bodyPadding :   5,    
        items       :   [
            filterPanel,{
            xtype: 'splitter'   // A splitter between the two child items
            }, chartPanel 
        ]
    });
    
      
    
	CoOrdinatorsReportWindow = Ext.create('Ext.Window', {
        width: 900,
        height: 600,
        hidden: false,
        maximizable: true,
        title: 'Co Ordinators Report',
       
        layout: 'fit',        
        items:
        [
               resultsPanel
        
        ]
        
    });
    
	CoOrdinatorsReportWindow.show();
    //coordinatorsreportdatastore.load();   
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ShowCoOrdinatorsFilterReport(startdate,enddate)
{        
    alert(startdate+" "+enddate);
    var coordinatorsfilterreportdata = new Ext.data.JsonStore({
		// store configs 
		autoDestroy: true,
		storeId: 'coordinatorsfilterreportdata',
		proxy: {
			type: 'ajax',
			url: '/admin/reports/coordinatorsfilterreportdata/?startdate='+startdate+'&enddate='+enddate+' ',
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
    coordinatorsfilterreportdata.load();
    console.log(coordinatorsfilterreportdata)
    
    var BChart1 = Ext.create('Ext.chart.Chart', {
        id      :   'BChart1',
        width   :   900,
        height  :   400,
        animate :   true,        
        shadow  :   true,
        store   :   coordinatorsfilterreportdata,
        axes: [
        {
            type: 'Numeric',
            position: 'left',
            fields: ['data'],
            minimum: 0,
            grid: true,
            
            label: {
                renderer: Ext.util.Format.numberRenderer('0,0')
            },
            title: 'Number of Co Ordinators',
            grid: true,
            
            //roundToDecimal: false
    
        }, {
            type: 'Category',
            position: 'bottom',
            fields: ['date'],
            title: 'Date'
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
                this.setTitle(storeItem.get('date') + ': ' + storeItem.get('data') + ' CoOrdinators');
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
	
	
    var chartPanel1 = Ext.create('Ext.panel.Panel', {
        id : 'chartPanel1', 
        width   :   900,
        height  :   500,       
        items:
        [BChart1]       
        
    });
    
        
  resultsPanel.remove(chartPanel)  
  resultsPanel.add(chartPanel1);
  //resultsPanel.add(panel2);
    
  resultsPanel.doLayout();
  //CoOrdinatorsReportWindow.doLayout();
  
    
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
	CoOrdinatorsReportWindow = Ext.create('Ext.Window', {
        width: 800,
        height: 600,
        hidden: false,
        maximizable: true,
        title: 'CoOrdinators Report',
       
        layout: 'fit',        
        items:
        [
               resultsPanel
        
        ]
        
    });
    
	CoOrdinatorsReportWindow.show();
    */
}