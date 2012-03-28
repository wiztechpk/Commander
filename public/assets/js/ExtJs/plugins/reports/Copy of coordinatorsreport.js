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

        /*
        animate: true,
        shadow: true,
        theme: 'Category1',
        legend: {
            position: 'right'
        },

        store: coordinatorsreportdatastore,
        */
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
    
    /*
    var CoOrdinatorsfilterreportdata = new Ext.data.JsonStore({
		// store configs 
		autoDestroy: true,
		storeId: 'CoOrdinatorsfilterreportdata',
		proxy: {
			type: 'ajax',
			url: '/admin/reports/CoOrdinatorsfilterreportdata/?startdate='+startdate+'&enddate='+enddate+' ',
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
    CoOrdinatorsfilterreportdata.load();    
    
    
    var pieChart = Ext.create('Ext.chart.Chart', {
        width: 100,
        height: 100,
        animate: false,
        store: CoOrdinatorsfilterreportdata,
        shadow: false,
        insetPadding: 0,
        theme: 'Base:gradients',
        series: [{
            type: 'pie',
            field: 'data',
            showInLegend: false,
            label: {
                field: 'month',
                display: 'rotate',
                contrast: true,
                font: '9px Arial'
            }
        }]
    });
        
    var grid = Ext.create('Ext.grid.Panel', {
        store: CoOrdinatorsfilterreportdata,
        height: 130,
        columns: [
            {
                text   : 'month',
                dataIndex: 'month'
            },
            {
                text   : 'data',
                dataIndex: 'data'
            }
        ]
    });
    
    var panel1 = Ext.create('widget.panel', {
        width: 800,
        height: 400,
        title: 'Line Chart',
        
        layout: 'fit',
        items: [{
            xtype: 'chart',
            animate: true,
            shadow: true,
            store: CoOrdinatorsfilterreportdata,
            axes: [{
                type: 'Numeric',
                position: 'left',
                fields: ['data'],
                title: false,
                grid: true
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['month'],
                title: false
            }],
            series: [{
                type: 'line',
                axis: 'left',
                gutter: 80,
                xField: 'month',
                yField: ['data'],
                tips: {
                    trackMouse: true,
                    width: 580,
                    height: 170,
                    layout: 'fit',
                    items: {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [pieChart, grid]
                    },
                    renderer: function(klass, item) {                        
                        
                        this.setTitle("Information for " + storeItem.get('name'));
                        //pieStore.loadData(data);
                        //gridStore.loadData(data);
                    }
                }
            }]
        }]
    });
    
    */
    
    
    var coordinatorsfilterreportdata = new Ext.data.JsonStore({
		// store configs 
		autoDestroy: true,
		storeId: 'CoOrdinatorsfilterreportdata',
		proxy: {
			type: 'ajax',
			url: '/admin/reports/coordinatorsfilterreportdata/?startdate='+startdate+'&enddate='+enddate+' ',
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
    coordinatorsfilterreportdata.load();
    
    
    
    var panel2 = Ext.create('widget.panel', {
        width: 600,
        height: 400,        
        //renderTo: Ext.getBody(),
        layout: 'fit',
        items: {
            xtype: 'chart',
            animate: false,
            store: store1,
            insetPadding: 30,
            axes: [{
                type: 'Numeric',
                minimum: 0,
                position: 'left',
                fields: ['data1'],
                title: false,
                grid: true,
                label: {
                    renderer: Ext.util.Format.numberRenderer('0,0'),
                    font: '10px Arial'
                }
            }, {
                type: 'Category',
                position: 'bottom',
                fields: ['name'],
                title: false,
                label: {
                    font: '11px Arial',
                    renderer: function(name) {
                        return name.substr(0, 3);
                    }
                }
            }],
            series: [{
                type: 'line',
                axis: 'left',
                xField: 'name',
                yField: 'data1',
                tips: {
                    trackMouse: true,
                    width: 110,
                    height: 25,
                    renderer: function(storeItem, item) {
                        this.setTitle(storeItem.get('data2') + ' in ' + storeItem.get('name').substr(0, 3));
                    }
                },
                style: {
                    fill: '#38B8BF',
                    stroke: '#38B8BF',
                    'stroke-width': 3
                },
                markerConfig: {
                    type: 'circle',
                    size: 4,
                    radius: 4,
                    'stroke-width': 0,
                    fill: '#38B8BF',
                    stroke: '#38B8BF'
                }
            }]
        }
    });

    
    
    
    
      

	var BChart1 = Ext.create('Ext.chart.Chart', {
    renderTo: 'BChart',
    width: 900,
    height: 400,
    animate: true,
    store: coordinatorsfilterreportdata,
    axes: [
    {
        type: 'Numeric',
        position: 'left',
        fields: ['data'],
        label: {
            renderer: Ext.util.Format.numberRenderer(0)
        },
        title: 'Number of CoOrdinators',
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
        xField: 'month',
        yField: ['data']
    }]
});
	
	
    var chartPanle1 = Ext.create('Ext.panel.Panel', {        
        id : 'chartPanel1',
        width: 900,
        height: 400,
        //renderTo: 'chartPanel',
        //renderTo: Ext.getBody(),
        //renderTo:'resultsPanel',
        items:
        [BChart1]
        
        
        
    });
  resultsPanel.remove(chartPanel)  
  //resultsPanel.add(chartPanle1);
  resultsPanel.add(panel2);
    
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
/*
var CoOrdinatorsReportWindow;
function ShowCoOrdinatordReport()
{
	var CoOrdinatorsReportSore = new Ext.data.JsonStore({
		// store configs 
		autoDestroy: true,
		storeId: 'CoOrdinatorsReportSore',
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
	CoOrdinatorsReportSore.load();
	
	
	
	
	CoOrdinatorsReportWindow = Ext.create('Ext.Window', {
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
            store: CoOrdinatorsReportSore,
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
                  renderer: function(coordinatorsreportdatastore, item) {
                    this.setTitle(coordinatorsreportdatastore.get('month') + ': ' + coordinatorsreportdatastore.get('data') + ' ');
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
	CoOrdinatorsReportWindow.show();
}
*/