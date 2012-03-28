/*
var TicketListWindow;
function showEventTicketsList() {
        if (!TicketListWindow) {
            
            var myData = [
                [1  ,   'Event 1',    2,  '100$',     '9/1 12:00am'],                
                [2  ,   'Event 2',    5,  '200$',     '9/1 12:00am']
            ];            
           
                      
            
            
            if (!TicketListWindow) {
                TicketListWindow = Ext.create('widget.window', {
                    title: 'Event Tickets List',
                    closable: true,
                    closeAction: 'hide',
                    //animateTarget: this,
                    width: 600,
                    height: 350,
                    layout: 'border',
                    bodyStyle: 'padding: 5px;',
                    items: [{
                        region: 'center',
                        xtype: 'tabpanel',
                        items: [{
                                 // A common mistake when adding grids to a layout is creating a panel first,
                                 // then adding the grid to it.  GridPanel (xtype:'grid') is a Panel subclass,
                                 // so you can add it directly as an item into a container.  Typically you will
                                 // want to specify layout:'fit' on GridPanels so that they'll size along with
                                 // their container and take up the available space.
                                 
                                 xtype: 'grid',
                                 layout: 'fit',
                                 store: Ext.create('Ext.data.ArrayStore', {
                                     fields: [
                                        {name: 'id'},
                                        {name: 'event'},
                                        {name: 'number'},
                                        {name: 'price'},                                        
                                        {name: 'date_created', type: 'date', dateFormat: 'n/j h:ia'}
                                     ],
                                     data: myData
                                 }),
                                 columns: [
                                     {
                                         text     : 'ID',
                                         flex     : 1,
                                         sortable : false, 
                                         dataIndex: 'id'
                                     },
                                     {
                                         text     : 'Prgram', 
                                         
                                         sortable : true, 
                                          
                                         dataIndex: 'event'
                                     },
                                     {
                                         text     : 'Number', 
                                          
                                         sortable : true, 
                                          
                                         dataIndex: 'number'
                                     },
                                     {
                                         text     : 'Price', 
                                          
                                         sortable : true, 
                                          
                                         dataIndex: 'price'
                                     },                                     
                                     {
                                         text     : 'Date', 
                                          
                                         sortable : true, 
                                         renderer : Ext.util.Format.dateRenderer('m/d/Y'), 
                                         dataIndex: 'date_created'
                                     }
                                 ],
                                 stripeRows: true
                             }]
                    }]
                });
            }

            
            
            
        }
        TicketListWindow.show();
    }
*/    