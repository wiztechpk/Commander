//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var MembersReportWindow;

var membersreportdatastore;
var membersfilterreportdatastore;

var resultsPanel;
var filterPanel;
var chartPanel;
var BChart;

var BChart1;
var chartPanel1;
function ShowMembersReport()
{ 
    
    membersreportdatastore = new Ext.data.JsonStore({		 
		autoDestroy   : true,
		storeId       : 'membersreportdatastore',
		proxy         : {
			type     : 'ajax',
			url      : '/admin/reports/membersreportdata',
			reader   : {
				type        : 'json',
				root        : 'result',
				idProperty  : 'month'
			}
		},
		fields: [{name: 'month'},{name: 'data'}]     
	});
    
    membersreportdatastore.load();
    
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
                        ShowMembersFilterReport(startdate,enddate);                        
                        
                        
                    }
                }
            }            
        ]
    });
    
    
	BChart = Ext.create('Ext.chart.Chart', {
        id:'BChart',
        width: 800,
        height: 400,
        animate: true,        
        shadow: true,
        store: membersreportdatastore,        
        axes: [
        {
            type: 'Numeric',
            position: 'left',
            fields: ['data'],
            label: {
                renderer: Ext.util.Format.numberRenderer(0)
            },
            title: 'Number of Members',
            grid: true,            
    
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
                this.setTitle(storeItem.get('month') + ': ' + storeItem.get('data') + ' members');
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
        id      : 'chartPanel',
        width   : 800,
        height  : 400,
        items   :[BChart]
    });
    
    resultsPanel = Ext.create('Ext.panel.Panel', {        
        id          : 'resultsPanel',
        width       : 800,
        height      : 600,
        frame       : true,        
        layout: {
            type    : 'vbox',       // Arrange child items vertically
            align   : 'stretch',    // Each takes up full width
            padding : 5
        },
        items       : [
            filterPanel, 
            {xtype: 'splitter'},
            chartPanel
        ]
    });
    
      
    
	MembersReportWindow = Ext.create('Ext.Window', {
        width       : 900,
        height      : 600,
        hidden      : false,
        maximizable : true,
        title       : 'Members Report',       
        layout      : 'fit',        
        items       :
        [
               resultsPanel
        
        ]
        
    });
    
	MembersReportWindow.show();
    //membersreportdatastore.load();   
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function ShowMembersFilterReport(startdate,enddate)
{     
    
    membersfilterreportdatastore = new Ext.data.JsonStore({	 
		autoDestroy         : true,
		storeId             : 'membersfilterreportdatastore',
		proxy               :    {
			type            : 'ajax',
			url             : '/admin/reports/membersfilterreportdata/?startdate='+startdate+'&enddate='+enddate+' ',
			reader          : {
				type        : 'json',
				root        : 'result',
				idProperty  : 'date'
			}
		},
		fields: [{name: 'date'},{name: 'data'}]     
	});
    membersfilterreportdatastore.load();
        

	BChart1 = Ext.create('Ext.chart.Chart', {
        id:'BChart1',
        width: 800,
        height: 400,
        animate: true,
        store: membersfilterreportdatastore,
        axes: [
        {
            type: 'Numeric',
            position: 'left',
            fields: ['data'],
            label: {
                renderer: Ext.util.Format.numberRenderer(0)
            },
            title: 'Number of Members',
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
	
	
    chartPanle1 = Ext.create('Ext.panel.Panel', {        
        id : 'chartPanel1',
        width   :   800,
        height  :   400,       
        items:
        [BChart1]
        
        
        
    });
  resultsPanel.remove(chartPanel);  
  resultsPanel.add(chartPanle1);
  resultsPanel.doLayout();
  
}