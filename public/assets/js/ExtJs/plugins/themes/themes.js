//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function showThemesListing()
{ 
    Ext.Loader.setConfig({enabled: true});
    
    Ext.Loader.setPath('Ext.ux.DataView', '../ux/DataView/');
    
    Ext.require([
        'Ext.data.*',
        'Ext.util.*',
        'Ext.view.View',
        'Ext.ux.DataView.DragSelector',
        'Ext.ux.DataView.LabelEditor'
    ]);

    var ThemesStore = Ext.create('Ext.data.Store', {        
        autoDestroy: true,
		storeId: 'themesdatastore',
        proxy: {
            type: 'ajax',
            url: '/admin/themes/getthemes',
            reader: {
                type: 'json',
                root: 'themes',
                idProperty: 'id'
            }
        },
        fields: [
				{name: 'id'},
				{name: 'title'},
                {name: 'image'},
                {name: 'image_url'},
                {name: 'thumb'},
                {name: 'thumb_url'},
                {name: 'default_checked'}				
		] 
    });  
        
    ThemesStore.load();

    resultsPanel = Ext.create('Ext.Panel', {
        id: 'themes-view',
        frame: true,
        collapsible: true,
        width: 535,
        items: Ext.create('Ext.view.View', {
            store: ThemesStore,
            tpl: [
                '<tpl for=".">',
                    '<div class="thumb-wrap" id="{image}">',
                    '<div class="thumb"><img src="{thumb_url}" title="{title}" width="100" height="100"></div>',                    
                    '<span ><input type="radio" name="set_deafult" value={id} {default_checked}>&nbsp;{title}</span>',
                    '</div>',
                '</tpl>',
                '<div class="x-clear"></div>'
            ],
            multiSelect: true,
            height: 310,
            trackOver: true,
            overItemCls: 'x-item-over',
            itemSelector: 'div.thumb-wrap',
            emptyText: 'No images to display',           
            plugins: [
                Ext.create('Ext.ux.DataView.DragSelector', {}),
                Ext.create('Ext.ux.DataView.LabelEditor', {dataIndex: 'title'})
            ],
            prepareData: function(data) {
                Ext.apply(data, {
                    shortName: Ext.util.Format.ellipsis(data.title, 15)                    
                });
                return data;
            },

            listeners: {
                selectionchange: function(dv, nodes ){
                    Ext.Ajax.request({
                        url: '/admin/themes/selecttheme',
                        params: {
                            id: dv.selected.items[0].data.id
                        },
                        success: function(response){                            
                            //console.log(dv.selected.items[0].data.id);                    
                            Ext.Msg.alert('Status', 'Theme has been selected');
                            //var text = response.responseText;
                            // process server response here
                        }
                    });

                    
                    
                }
            }
        })
    });
    
    MembersReportWindow = Ext.create('Ext.Window', {
        width: 900,
        height: 600,
        hidden: false,
        maximizable: true,
        title: 'Themes',       
        layout: 'fit',        
        items:
        [
               resultsPanel
        
        ]
        
    });
    
	MembersReportWindow.show();

}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
Ext.create('Ext.org.OrgPanel', {
        renderTo: Ext.getBody(),
        height: 490,
        width : 700
    });
*/    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////